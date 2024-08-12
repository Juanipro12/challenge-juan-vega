import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { readFile } from '@/lib/fileUtils';
import { uploadFileToS3 } from '@/lib/s3Utils';
import { validateDocumentNumber, validatePhoneNumber } from '@/lib/validation';
import { parseFields } from '@/lib/parseFields';
import fs from 'fs';


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // parse data 
    const fields = parseFields(formData);

    const {
      firstName,
      lastName,
      documentType,
      documentNumber,
      email,
      phoneNumber,
      billingInfo
    } = fields;
    
    // Validations
    if (!validateDocumentNumber(documentNumber as string, documentType as string)) {
      return NextResponse.json({ error: 'Invalid document number' }, { status: 400 });
    }
    if (!validatePhoneNumber(phoneNumber as string)) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }
    
    // Check if the e-mail already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // See required fields
    if (!billingInfo) {
      return NextResponse.json({ error: 'Billing information is required' }, { status: 400 });
    }

    const {
      firstName: billingFirstName,
      lastName: billingLastName,
      documentType: billingDocumentType,
      documentNumber: billingDocumentNumber,
      email: billingEmail,
      phoneNumber: billingPhoneNumber
    } = billingInfo as Record<string, string>;

    // Validations billing
    if (!validateDocumentNumber(billingDocumentNumber, billingDocumentType)) {
      return NextResponse.json({ error: 'Invalid billing document number' }, { status: 400 });
    }
    if (!validatePhoneNumber(billingPhoneNumber)) {
      return NextResponse.json({ error: 'Invalid billing phone number' }, { status: 400 });
    }

    // Create user in Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert([
        {
          firstName: firstName as string,
          lastName: lastName as string,
          documentType: documentType as string,
          documentNumber: documentNumber as string,
          email: email as string,
          phoneNumber: phoneNumber as string
        }
      ])
      .select('id')
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: userError?.message || 'User creation failed' }, { status: 500 });
    }

    // Add billing information
    const { error: billingError } = await supabase
      .from('billingInfo')
      .insert([
        {
          userId: user.id,
          firstName: billingFirstName,
          lastName: billingLastName,
          documentType: billingDocumentType,
          documentNumber: billingDocumentNumber,
          email: billingEmail,
          phoneNumber: billingPhoneNumber
        }
      ]);

    if (billingError) {
      return NextResponse.json({ error: billingError.message }, { status: 500 });
    }

     // Parse files
     const files  = await readFile(formData, true);
    
     
     const fileEntries = files['file'] || []; 
 
     if (fileEntries.length > 4) {
       return NextResponse.json({ error: 'You can only upload up to 4 images' }, { status: 400 });
     }
 
     const imagePromises = fileEntries.map(async (file: any) => {
       const { filepath, originalFilename } = file;
       const fileKey = `${user.id}/${Date.now()}_${originalFilename}`
       try {
         const s3Result = await uploadFileToS3({
           filepath,
           fileKey,
           mimetype: file.mimetype
         });
 
         const { error: imageError } = await supabase
           .from('images')
           .insert([
             {
               userId: user.id,
               imageKey: s3Result.key
             }
           ]);
 
         if (imageError) {
           console.error('Error inserting image:', imageError.message);
         }
         fs.unlink(filepath, (err) => {
          if (err) {
            console.error(`Error deleting local file ${filepath}:`, err);
          } else {
            console.log(`Local file ${filepath} deleted successfully.`);
          }
        });
       } catch (error) {
         console.error('Error uploading to S3:', error);
       }
     });
 
     await Promise.all(imagePromises); 

    return NextResponse.json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
