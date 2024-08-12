import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { listFilesInFolder } from '@/lib/s3Utils'; // Asegúrate de que esta función está definida para listar los archivos

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;

  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: userError?.message || 'User not found' }, { status: 404 });
    }

  
    const { data: billingInfo, error: billingError } = await supabase
      .from('billingInfo')
      .select('*')
      .eq('userId', userId)
      .single();

    if (billingError) {
      return NextResponse.json({ error: billingError.message }, { status: 500 });
    }

    // Get files in S3
    const imageUrls = await listFilesInFolder(userId);

    return NextResponse.json({
      user,
      billingInfo,
      images: imageUrls
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
