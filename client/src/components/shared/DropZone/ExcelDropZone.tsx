import React, { FC } from 'react';
import { DropZone } from './DropZone';

interface Props {
  onFilesUpload(files: File[]): void;
  multiple: boolean;
}

export const ExcelDropZone: FC<Props> = ({ onFilesUpload, multiple }) => (
  <DropZone
    acceptFormat=".csv, application/vnd.ms-excel, text/csv"
    text="Glisser-déposer (drag and drop) ou cliquer ici pour téléverser un fichier Excel (.csv)"
    uploadFiles={onFilesUpload}
    multiple={multiple}
  />
);
