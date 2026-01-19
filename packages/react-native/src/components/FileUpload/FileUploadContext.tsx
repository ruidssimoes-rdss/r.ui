import { createContext, useContext } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface UploadedFile {
  /** Unique identifier */
  id: string;
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** MIME type */
  type: string;
  /** Upload progress (0-100) */
  progress: number;
  /** Upload status */
  status: 'pending' | 'uploading' | 'complete' | 'error';
  /** Error message if status is 'error' */
  error?: string;
  /** Preview URL for images */
  previewUrl?: string;
  /** Original file object (web) */
  file?: File;
  /** File URI (React Native) */
  uri?: string;
}

export interface FileUploadContextValue {
  /** Currently uploaded files */
  files: UploadedFile[];
  /** Add files */
  addFiles: (files: UploadedFile[]) => void;
  /** Remove a file by ID */
  removeFile: (id: string) => void;
  /** Update file progress */
  updateFileProgress: (id: string, progress: number) => void;
  /** Update file status */
  updateFileStatus: (id: string, status: UploadedFile['status'], error?: string) => void;
  /** Accepted file types */
  accept?: string;
  /** Max file size in bytes */
  maxSize?: number;
  /** Max number of files */
  maxFiles?: number;
  /** Whether multiple files are allowed */
  multiple: boolean;
  /** Whether the upload is disabled */
  disabled: boolean;
  /** Open file picker */
  openPicker: () => void;
}

// ============================================================================
// Context
// ============================================================================

export const FileUploadContext = createContext<FileUploadContextValue | null>(null);

// ============================================================================
// Hook
// ============================================================================

export function useFileUpload(): FileUploadContextValue {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error(
      'FileUpload components must be used within a FileUpload. ' +
        'Wrap your component in <FileUpload> to fix this error.'
    );
  }
  return context;
}
