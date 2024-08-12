import { FileEntry } from '@/types/file';
import fs from 'fs';
import path from 'path';

// Make sure the directory exists
const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');


export const readFile = async (
  formData: FormData,
  saveLocally?: boolean
): Promise<Record<string, FileEntry[]>> => {
  const files: Record<string, FileEntry[]> = {};
  console.log(formData);
  
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      const file = value;
      const buffer = Buffer.from(await file.arrayBuffer());

      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }

      const filePath = path.resolve(UPLOAD_DIR, file.name);

      if (saveLocally) {
        fs.writeFileSync(filePath, buffer);
      }

      if (!files[key]) {
        files[key] = [];
      }

      files[key].push({
        filepath: filePath,
        originalFilename: file.name,
        mimetype: file.type,
        size: buffer.length,
      } as FileEntry);
    }
  }

  return files;
};
