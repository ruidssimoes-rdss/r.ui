'use client';

import { useState, useRef } from 'react';

/**
 * FileUpload Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface UploadedFile {
  id: string;
  name: string;
  size: number;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const UploadIcon = () => (
  <svg className="w-10 h-10 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export function FileUploadBasicPreview() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).slice(2),
      name: file.name,
      size: file.size,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-3 w-full max-w-sm">
      <div
        className={`
          flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer
          transition-colors duration-200
          ${isDragging
            ? 'border-[var(--switch-bg-checked)] bg-[var(--switch-bg-checked)]/5'
            : 'border-[var(--component-border)] hover:border-[var(--component-border-hover)]'
          }
        `}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <UploadIcon />
        <p className="mt-2 text-sm text-[var(--component-text)]">Drag files here or click to browse</p>
        <p className="text-xs text-[var(--component-text-muted)]">PNG, JPG, PDF up to 10MB</p>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.id} className="flex items-center gap-3 p-3 bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg">
              <FileIcon />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--component-text)] truncate">{file.name}</p>
                <p className="text-xs text-[var(--component-text-muted)]">{formatFileSize(file.size)}</p>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="p-1 text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FileUploadWithTriggerPreview() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).slice(2),
      name: file.name,
      size: file.size,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <div className="space-y-3 w-full max-w-sm">
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 text-sm font-medium text-[var(--component-text)] bg-[var(--component-bg-elevated)] border border-[var(--component-border)] hover:bg-[var(--component-bg-hover)] rounded-lg transition-colors"
      >
        Choose Files
      </button>
      {files.length > 0 && (
        <p className="text-sm text-[var(--component-text-muted)]">{files.length} file(s) selected</p>
      )}
    </div>
  );
}

export function FileUploadDisabledPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[var(--component-border)] rounded-lg opacity-50 cursor-not-allowed">
        <UploadIcon />
        <p className="mt-2 text-sm text-[var(--component-text)]">Upload is disabled</p>
      </div>
    </div>
  );
}
