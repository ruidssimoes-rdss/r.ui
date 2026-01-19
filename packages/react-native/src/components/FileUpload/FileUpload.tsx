import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, ViewStyle, StyleSheet, Platform } from 'react-native';
import { FileUploadContext, UploadedFile } from './FileUploadContext';
import { validateFileType, validateFileSize, generateFileId } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface FileUploadProps {
  /** Current files (controlled) */
  value?: UploadedFile[];
  /** Called when files change */
  onValueChange?: (files: UploadedFile[]) => void;
  /** Accepted file types (e.g., "image/*,.pdf") */
  accept?: string;
  /** Max file size in bytes */
  maxSize?: number;
  /** Max number of files */
  maxFiles?: number;
  /** Allow multiple files */
  multiple?: boolean;
  /** Disable upload */
  disabled?: boolean;
  /** Called when a file fails validation */
  onError?: (file: UploadedFile, error: string) => void;
  /** Children components */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FileUpload({
  value,
  onValueChange,
  accept,
  maxSize,
  maxFiles = Infinity,
  multiple = false,
  disabled = false,
  onError,
  children,
  style,
}: FileUploadProps) {
  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Controlled vs uncontrolled
  const files = value ?? internalFiles;
  const setFiles = useCallback((newFiles: UploadedFile[] | ((prev: UploadedFile[]) => UploadedFile[])) => {
    const resolvedFiles = typeof newFiles === 'function' ? newFiles(files) : newFiles;
    if (value === undefined) {
      setInternalFiles(resolvedFiles);
    }
    onValueChange?.(resolvedFiles);
  }, [value, files, onValueChange]);

  const addFiles = useCallback((newFiles: UploadedFile[]) => {
    const validFiles: UploadedFile[] = [];

    for (const file of newFiles) {
      // Check max files limit
      if (files.length + validFiles.length >= maxFiles) {
        onError?.(file, `Maximum ${maxFiles} files allowed`);
        continue;
      }

      // Validate file type
      const typeValidation = validateFileType(file, accept);
      if (!typeValidation.valid) {
        onError?.(file, typeValidation.error!);
        continue;
      }

      // Validate file size
      const sizeValidation = validateFileSize(file, maxSize);
      if (!sizeValidation.valid) {
        onError?.(file, sizeValidation.error!);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setFiles((prev) => {
        if (multiple) {
          return [...prev, ...validFiles];
        }
        return validFiles.slice(0, 1);
      });
    }
  }, [files.length, maxFiles, accept, maxSize, multiple, onError, setFiles]);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, [setFiles]);

  const updateFileProgress = useCallback((id: string, progress: number) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, progress, status: progress < 100 ? 'uploading' : 'complete' } : f
      )
    );
  }, [setFiles]);

  const updateFileStatus = useCallback((id: string, status: UploadedFile['status'], error?: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status, error } : f
      )
    );
  }, [setFiles]);

  const openPicker = useCallback(() => {
    if (disabled) return;

    if (Platform.OS === 'web' && inputRef.current) {
      inputRef.current.click();
    }
    // For React Native, you would use document-picker or image-picker
    // This is a web-focused implementation
  }, [disabled]);

  const handleWebFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const uploadedFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      id: generateFileId(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'pending' as const,
      file,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    addFiles(uploadedFiles);

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [addFiles]);

  const contextValue = useMemo(() => ({
    files,
    addFiles,
    removeFile,
    updateFileProgress,
    updateFileStatus,
    accept,
    maxSize,
    maxFiles,
    multiple,
    disabled,
    openPicker,
  }), [files, addFiles, removeFile, updateFileProgress, updateFileStatus, accept, maxSize, maxFiles, multiple, disabled, openPicker]);

  return (
    <FileUploadContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>
        {children}
        {Platform.OS === 'web' && (
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleWebFileSelect}
            style={{ display: 'none' }}
            disabled={disabled}
          />
        )}
      </View>
    </FileUploadContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
