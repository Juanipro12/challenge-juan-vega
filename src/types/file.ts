import formidable from "formidable";

export interface FileEntry extends formidable.File {
    filepath: string;
  }
  