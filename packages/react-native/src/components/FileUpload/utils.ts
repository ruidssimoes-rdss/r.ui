// ============================================================================
// File Size Formatting
// ============================================================================

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${units[i]}`;
}

// ============================================================================
// File Type Validation
// ============================================================================

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFileType(
  file: { name: string; type?: string },
  accept?: string
): FileValidationResult {
  if (!accept) {
    return { valid: true };
  }

  const acceptedTypes = accept.split(',').map((type) => type.trim().toLowerCase());
  const fileName = file.name.toLowerCase();
  const fileType = file.type?.toLowerCase() || '';

  for (const acceptedType of acceptedTypes) {
    // Check for exact MIME type match
    if (acceptedType === fileType) {
      return { valid: true };
    }

    // Check for wildcard MIME types (e.g., "image/*")
    if (acceptedType.endsWith('/*')) {
      const category = acceptedType.slice(0, -2);
      if (fileType.startsWith(category + '/')) {
        return { valid: true };
      }
    }

    // Check for file extension (e.g., ".pdf")
    if (acceptedType.startsWith('.')) {
      if (fileName.endsWith(acceptedType)) {
        return { valid: true };
      }
    }
  }

  return {
    valid: false,
    error: `File type not accepted. Accepted types: ${accept}`,
  };
}

export function validateFileSize(
  file: { size: number },
  maxSize?: number
): FileValidationResult {
  if (!maxSize) {
    return { valid: true };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${formatFileSize(maxSize)}`,
    };
  }

  return { valid: true };
}

// ============================================================================
// File Extension to Icon Mapping
// ============================================================================

export type FileIconType = 'image' | 'pdf' | 'document' | 'spreadsheet' | 'archive' | 'video' | 'audio' | 'code' | 'generic';

export function getFileIconType(fileName: string): FileIconType {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico'];
  const pdfExtensions = ['pdf'];
  const documentExtensions = ['doc', 'docx', 'txt', 'rtf', 'odt'];
  const spreadsheetExtensions = ['xls', 'xlsx', 'csv', 'ods'];
  const archiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'mkv', 'webm'];
  const audioExtensions = ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'];
  const codeExtensions = ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'h', 'css', 'html', 'json', 'xml'];

  if (imageExtensions.includes(extension)) return 'image';
  if (pdfExtensions.includes(extension)) return 'pdf';
  if (documentExtensions.includes(extension)) return 'document';
  if (spreadsheetExtensions.includes(extension)) return 'spreadsheet';
  if (archiveExtensions.includes(extension)) return 'archive';
  if (videoExtensions.includes(extension)) return 'video';
  if (audioExtensions.includes(extension)) return 'audio';
  if (codeExtensions.includes(extension)) return 'code';

  return 'generic';
}

// ============================================================================
// Generate Unique ID
// ============================================================================

export function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
