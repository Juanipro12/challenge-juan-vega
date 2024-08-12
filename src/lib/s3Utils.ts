import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import { s3Client } from './s3Client';
import { UploadFileToS3Args } from '@/types/s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Function to upload a file to S3
export const uploadFileToS3 = async ({ filepath, fileKey, mimetype }: UploadFileToS3Args) => {
  const fileStream = fs.createReadStream(filepath);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
    Body: fileStream,
    ContentType: mimetype,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    return { key: fileKey };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};


export const listFilesInFolder = async (userId: string) => {
  const prefix = `${userId}/`; 

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Prefix: prefix,
    });

    const data = await s3Client.send(command);
    
    const files = data.Contents || [];

   
    const fileUrls = await Promise.all(files.map(async (file) => {
      if (file.Key) {
    
        const getObjectCommand = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: file.Key,
        });

        const url = await getSignedUrl(s3Client, getObjectCommand); 
        return { key: file.Key, url };
      }
      return null;
    }));
    
    return fileUrls.filter(file => file !== null);
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};