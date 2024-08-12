import { ShareIcon } from '@/utils/ShareIcon';
import { TashIcon } from '@/utils/TashIcon';
import { useState } from 'react';

interface FileUploadProps {
  name: string;
  files: File[];
  setFieldValue: (field: string, value: any) => void;
}

const FileUpload = ({ name, files, setFieldValue }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFieldValue(name, Array.from(selectedFiles));
    }
  };

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFieldValue(name, newFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      setFieldValue(name, Array.from(droppedFiles));
    }
  };

  const handleDivClick = () => {
    const inputElement = document.getElementById(name) as HTMLInputElement;
    inputElement?.click();
  };

  return (
    <div
      className={`mt-4 rounded-md p-3 ${isDragOver ? 'bg-gray-700' : 'bg-[#272A33]'} cursor-pointer border-gray-600`}
      onClick={handleDivClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3 className="text-[#9396A5] font-[20px] mb-2">Carga hasta 4 imágenes para tu perfil</h3>

      <div className="text-[16px] font-normal text-[#FFFFFF] h-full w-full bg-transparent text-sm outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 disabled:border-0 flex gap-3 items-center">
        <ShareIcon />
        <div className='flex flex-col'>
          <span className='text-[16px] font-medium'>Haz clic o arrastra los archivos a esta área para cargarlo</span>
          <span className='text-[#9396A5] text-[14px]'>JPG, PNG, Tiff, hasta 2 mb</span>
        </div>
      </div>

      <input
        id={name}
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {files.length > 0 && (
        <ul className="mt-4">
          {files.map((file, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <span className="text-[#FFFFFF] text-[12px]">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500"
              >
                <TashIcon/>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
