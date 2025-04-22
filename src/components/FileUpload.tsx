import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { PDFType, UploadedPDF } from '../types/pdf';

interface FileUploadProps {
  onFileAccepted: (pdf: UploadedPDF) => void;
  type: PDFType;
  multiple?: boolean;
  maxSize?: number; // File size in bytes
  acceptedFileTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileAccepted,
  type,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // Default 10MB
  acceptedFileTypes = ['application/pdf'],
}) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const uploadedPDF: UploadedPDF = {
          id: uuidv4(),
          file,
          type,
          status: 'pending',
          progress: 0,
        };
        onFileAccepted(uploadedPDF);
      });
    },
    [onFileAccepted, type]
  );

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const getUploadAreaStyles = () => {
    let className = 'border-2 border-dashed rounded-lg p-6 w-full text-center transition-colors duration-200';
    
    if (isDragActive && !isDragReject) {
      className += ' border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    } else if (isDragReject) {
      className += ' border-red-500 bg-red-50 dark:bg-red-900/20';
    } else {
      className += ' border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400';
    }
    
    return className;
  };

  return (
    <div className="w-full">
      <div {...getRootProps()} className={getUploadAreaStyles()}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <svg 
            className="w-12 h-12 text-gray-400 dark:text-gray-500" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          
          {isDragActive ? (
            <p className="text-lg font-medium text-blue-600 dark:text-blue-400">Drop the files here...</p>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {type === 'masterpiece' ? 'Upload Your Masterpiece' : 'Upload Reference PDFs'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag & drop {type === 'masterpiece' ? 'your document' : 'reference documents'} here, or click to select {multiple ? 'files' : 'a file'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                PDF only, {maxSize / (1024 * 1024)}MB maximum
              </p>
            </>
          )}
          
          {isDragReject && (
            <p className="text-sm text-red-500">
              File type not accepted or size limit exceeded
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload; 