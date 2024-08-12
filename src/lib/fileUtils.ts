import { FileEntry } from '@/types/file';
import fs from 'fs';
import path, { join } from 'path';

// Use the /tmp directory for writable operations
const UPLOAD_DIR =  join('/tmp/');

// Ensure the directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

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

      const filePath = path.join(UPLOAD_DIR, file.name);

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
