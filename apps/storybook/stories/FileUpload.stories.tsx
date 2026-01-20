import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadItem,
  UploadedFile,
  formatFileSize,
} from '@r-ui/react-native';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A file upload component with drag-and-drop support. Features file type validation, size limits, progress tracking, and image previews.',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disable the file upload',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple files',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

// ============================================================================
// Helper Functions
// ============================================================================

const createMockFile = (
  name: string,
  size: number,
  type: string,
  status: UploadedFile['status'] = 'complete',
  progress: number = 100,
  error?: string
): UploadedFile => ({
  id: `file-${Math.random().toString(36).substr(2, 9)}`,
  name,
  size,
  type,
  progress,
  status,
  error,
  previewUrl: type.startsWith('image/') ? `https://picsum.photos/seed/${name}/200/200` : undefined,
});

const simulateUpload = (
  files: UploadedFile[],
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>
) => {
  files.forEach((file) => {
    if (file.status === 'pending') {
      // Start upload
      setFiles((prev: UploadedFile[]) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: 'uploading' as const, progress: 0 } : f
        )
      );

      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev: UploadedFile[]) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: 'complete' as const, progress: 100 } : f
            )
          );
        } else {
          setFiles((prev: UploadedFile[]) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, progress: Math.min(progress, 99) } : f
            )
          );
        }
      }, 200);
    }
  });
};

// ============================================================================
// Story: Default
// ============================================================================
function DefaultFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  return (
    <View style={styles.container}>
      <FileUpload value={files} onValueChange={setFiles} multiple>
        <FileUploadDropzone />
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} />}
        </FileUploadList>
      </FileUpload>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultFileUpload />,
};

// ============================================================================
// Story: WithLabel
// ============================================================================
function WithLabelFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Attachments</Text>
        <FileUpload value={files} onValueChange={setFiles} multiple>
          <FileUploadDropzone />
          <FileUploadList>
            {(file) => <FileUploadItem key={file.id} file={file} />}
          </FileUploadList>
        </FileUpload>
        <Text style={styles.helperText}>
          Drag and drop files or click to browse
        </Text>
      </View>
    </View>
  );
}

export const WithLabel: Story = {
  render: () => <WithLabelFileUpload />,
};

// ============================================================================
// Story: Controlled
// ============================================================================
function ControlledFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([
    createMockFile('document.pdf', 1024 * 1024 * 2, 'application/pdf'),
    createMockFile('image.jpg', 1024 * 512, 'image/jpeg'),
  ]);

  const addSampleFile = () => {
    const sampleFiles = [
      { name: 'report.docx', type: 'application/docx', size: 1024 * 256 },
      { name: 'photo.png', type: 'image/png', size: 1024 * 1024 },
      { name: 'data.xlsx', type: 'application/xlsx', size: 1024 * 128 },
    ];
    const sample = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
    const newFile = createMockFile(sample.name, sample.size, sample.type, 'pending', 0);
    setFiles((prev) => [...prev, newFile]);
  };

  const clearAll = () => setFiles([]);

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  return (
    <View style={styles.controlledContainer}>
      <Text style={styles.formTitle}>Controlled FileUpload</Text>

      <View style={styles.quickSelect}>
        <Text style={styles.quickSelectLabel}>Actions:</Text>
        <View style={styles.quickSelectButtons}>
          <Pressable style={styles.quickSelectButton} onPress={addSampleFile}>
            <Text style={styles.quickSelectButtonText}>Add Sample File</Text>
          </Pressable>
          <Pressable style={styles.clearButton} onPress={clearAll}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </Pressable>
        </View>
      </View>

      <FileUpload value={files} onValueChange={setFiles} multiple>
        <FileUploadDropzone />
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} />}
        </FileUploadList>
      </FileUpload>

      <View style={styles.statsRow}>
        <Text style={styles.statsText}>
          Files: {files.length}
        </Text>
        <Text style={styles.statsText}>
          Total size: {formatFileSize(files.reduce((acc, f) => acc + f.size, 0))}
        </Text>
      </View>
    </View>
  );
}

export const Controlled: Story = {
  render: () => <ControlledFileUpload />,
};

// ============================================================================
// Story: Disabled
// ============================================================================
export const Disabled: Story = {
  render: () => {
    const files = [
      createMockFile('locked-file.pdf', 1024 * 1024, 'application/pdf'),
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Documents (Disabled)</Text>
        <FileUpload value={files} disabled>
          <FileUploadDropzone />
          <FileUploadList>
            {(file) => <FileUploadItem key={file.id} file={file} />}
          </FileUploadList>
        </FileUpload>
        <Text style={styles.hint}>This upload area is disabled</Text>
      </View>
    );
  },
};

// ============================================================================
// Story: ErrorState
// ============================================================================
function ErrorStateFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const hasError = submitted && files.length === 0;

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Document Submission</Text>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, hasError && styles.labelError]}>
          Documents <Text style={styles.required}>*</Text>
        </Text>
        <View style={[styles.uploadWrapper, hasError && styles.uploadWrapperError]}>
          <FileUpload
            value={files}
            onValueChange={(newFiles) => {
              setFiles(newFiles);
              if (newFiles.length > 0) setSubmitted(false);
            }}
            multiple
          >
            <FileUploadDropzone />
            <FileUploadList>
              {(file) => <FileUploadItem key={file.id} file={file} />}
            </FileUploadList>
          </FileUpload>
        </View>
        {hasError && (
          <Text style={styles.errorText}>Please upload at least one document</Text>
        )}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Documents</Text>
      </Pressable>
    </View>
  );
}

export const ErrorState: Story = {
  render: () => <ErrorStateFileUpload />,
};

// ============================================================================
// Story: SingleFile
// ============================================================================
function SingleFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Picture</Text>
      <FileUpload
        value={files}
        onValueChange={setFiles}
        multiple={false}
        accept="image/*"
      >
        <FileUploadDropzone>
          <View style={styles.customDropzoneContent}>
            <Text style={styles.customDropzoneIcon}>📷</Text>
            <Text style={styles.customDropzoneText}>
              Click to upload profile picture
            </Text>
            <Text style={styles.customDropzoneHint}>
              JPG, PNG or GIF (max 5MB)
            </Text>
          </View>
        </FileUploadDropzone>
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} />}
        </FileUploadList>
      </FileUpload>
    </View>
  );
}

export const SingleFile: Story = {
  render: () => <SingleFileUpload />,
};

// ============================================================================
// Story: MultipleFiles
// ============================================================================
function MultipleFilesUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Project Files</Text>
      <FileUpload
        value={files}
        onValueChange={setFiles}
        multiple
        maxFiles={5}
      >
        <FileUploadDropzone>
          <View style={styles.customDropzoneContent}>
            <Text style={styles.customDropzoneIcon}>📁</Text>
            <Text style={styles.customDropzoneText}>
              Upload project files
            </Text>
            <Text style={styles.customDropzoneHint}>
              Maximum 5 files
            </Text>
          </View>
        </FileUploadDropzone>
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} />}
        </FileUploadList>
      </FileUpload>
      <Text style={styles.helperText}>
        {files.length}/5 files uploaded
      </Text>
    </View>
  );
}

export const MultipleFiles: Story = {
  render: () => <MultipleFilesUpload />,
};

// ============================================================================
// Story: ImagesOnly
// ============================================================================
function ImagesOnlyUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gallery Images</Text>
      <FileUpload
        value={files}
        onValueChange={setFiles}
        accept="image/*"
        multiple
        maxFiles={10}
        onError={(file, error) => {
          console.log(`Error with ${file.name}: ${error}`);
        }}
      >
        <FileUploadDropzone>
          <View style={styles.customDropzoneContent}>
            <Text style={styles.customDropzoneIcon}>🖼️</Text>
            <Text style={styles.customDropzoneText}>
              Upload images
            </Text>
            <Text style={styles.customDropzoneHint}>
              PNG, JPG, GIF, WebP only
            </Text>
          </View>
        </FileUploadDropzone>
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} showPreview />}
        </FileUploadList>
      </FileUpload>
    </View>
  );
}

export const ImagesOnly: Story = {
  render: () => <ImagesOnlyUpload />,
};

// ============================================================================
// Story: PDFsOnly
// ============================================================================
function PDFsOnlyUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>PDF Documents</Text>
      <FileUpload
        value={files}
        onValueChange={setFiles}
        accept=".pdf,application/pdf"
        multiple
        onError={(file, error) => {
          console.log(`Error with ${file.name}: ${error}`);
        }}
      >
        <FileUploadDropzone>
          <View style={styles.customDropzoneContent}>
            <Text style={styles.customDropzoneIcon}>📄</Text>
            <Text style={styles.customDropzoneText}>
              Upload PDF documents
            </Text>
            <Text style={styles.customDropzoneHint}>
              PDF files only
            </Text>
          </View>
        </FileUploadDropzone>
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} />}
        </FileUploadList>
      </FileUpload>
    </View>
  );
}

export const PDFsOnly: Story = {
  render: () => <PDFsOnlyUpload />,
};

// ============================================================================
// Story: MaxFileSizeValidation
// ============================================================================
function MaxFileSizeUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const maxSize = 1024 * 1024 * 5; // 5MB

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  const handleError = (file: UploadedFile, error: string) => {
    setErrors((prev) => [...prev, `${file.name}: ${error}`]);
    setTimeout(() => {
      setErrors((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Documents (Max 5MB per file)</Text>
      <FileUpload
        value={files}
        onValueChange={setFiles}
        maxSize={maxSize}
        multiple
        onError={handleError}
      >
        <FileUploadDropzone />
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} />}
        </FileUploadList>
      </FileUpload>

      {errors.length > 0 && (
        <View style={styles.errorsContainer}>
          {errors.map((error, index) => (
            <Text key={index} style={styles.errorItem}>
              {error}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.helperText}>
        Maximum file size: {formatFileSize(maxSize)}
      </Text>
    </View>
  );
}

export const MaxFileSizeValidation: Story = {
  render: () => <MaxFileSizeUpload />,
};

// ============================================================================
// Story: UploadProgressSimulation
// ============================================================================
function UploadProgressUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([
    createMockFile('uploading-file.zip', 1024 * 1024 * 10, 'application/zip', 'uploading', 45),
    createMockFile('completed-file.pdf', 1024 * 256, 'application/pdf', 'complete', 100),
    createMockFile('pending-file.docx', 1024 * 512, 'application/docx', 'pending', 0),
  ]);

  const startUpload = () => {
    setFiles((prev) =>
      prev.map((f) =>
        f.status === 'pending' ? { ...f, status: 'uploading', progress: 0 } : f
      )
    );

    // Simulate progress for uploading files
    const interval = setInterval(() => {
      setFiles((prev) => {
        const updated = prev.map((f) => {
          if (f.status === 'uploading' && f.progress < 100) {
            const newProgress = Math.min(f.progress + Math.random() * 15, 100);
            return {
              ...f,
              progress: newProgress,
              status: newProgress >= 100 ? 'complete' : 'uploading',
            } as UploadedFile;
          }
          return f;
        });

        const allComplete = updated.every((f) => f.status === 'complete');
        if (allComplete) {
          clearInterval(interval);
        }

        return updated;
      });
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upload Progress Demo</Text>
      <FileUpload value={files} onValueChange={setFiles}>
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} />}
        </FileUploadList>
      </FileUpload>

      <Pressable style={styles.actionButton} onPress={startUpload}>
        <Text style={styles.actionButtonText}>Start Upload</Text>
      </Pressable>

      <View style={styles.progressLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#fbbf24' }]} />
          <Text style={styles.legendText}>Pending</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
          <Text style={styles.legendText}>Uploading</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#22c55e' }]} />
          <Text style={styles.legendText}>Complete</Text>
        </View>
      </View>
    </View>
  );
}

export const UploadProgressSimulation: Story = {
  render: () => <UploadProgressUpload />,
};

// ============================================================================
// Story: FileRejectedError
// ============================================================================
function FileRejectedUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([
    createMockFile('valid-image.jpg', 1024 * 512, 'image/jpeg', 'complete', 100),
    createMockFile('too-large.jpg', 1024 * 1024 * 20, 'image/jpeg', 'error', 0, 'File size exceeds 5MB limit'),
    createMockFile('invalid-type.exe', 1024 * 256, 'application/exe', 'error', 0, 'File type not allowed'),
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upload with Errors</Text>
      <FileUpload value={files} onValueChange={setFiles} accept="image/*">
        <FileUploadDropzone />
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} />}
        </FileUploadList>
      </FileUpload>
      <Text style={styles.helperText}>
        Shows error states for rejected files
      </Text>
    </View>
  );
}

export const FileRejectedError: Story = {
  render: () => <FileRejectedUpload />,
};

// ============================================================================
// Story: WithPreview
// ============================================================================
function WithPreviewUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      ...createMockFile('photo1.jpg', 1024 * 768, 'image/jpeg'),
      previewUrl: 'https://picsum.photos/seed/photo1/200/200',
    },
    {
      ...createMockFile('photo2.png', 1024 * 512, 'image/png'),
      previewUrl: 'https://picsum.photos/seed/photo2/200/200',
    },
    {
      ...createMockFile('document.pdf', 1024 * 256, 'application/pdf'),
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gallery with Previews</Text>
      <FileUpload value={files} onValueChange={setFiles} accept="image/*,.pdf" multiple>
        <FileUploadDropzone />
        <FileUploadList>
          {(file) => <FileUploadItem key={file.id} file={file} showPreview />}
        </FileUploadList>
      </FileUpload>
      <Text style={styles.helperText}>
        Image files show thumbnail previews
      </Text>
    </View>
  );
}

export const WithPreview: Story = {
  render: () => <WithPreviewUpload />,
};

// ============================================================================
// Story: AccessibilityDemo
// ============================================================================
function AccessibilityFileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    simulateUpload(files, setFiles);
  }, [files.length]);

  return (
    <View style={styles.container}>
      <View style={styles.accessibilityInfo}>
        <Text style={styles.accessibilityTitle}>Accessibility Features</Text>
        <Text style={styles.accessibilityText}>
          The file upload includes keyboard navigation, screen reader labels, and focus management.
        </Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text nativeID="upload-label" style={styles.label}>
          Upload Files
        </Text>
        <FileUpload value={files} onValueChange={setFiles} multiple>
          <FileUploadDropzone />
          <FileUploadList>
            {(file) => <FileUploadItem key={file.id} file={file} />}
          </FileUploadList>
        </FileUpload>
        <Text nativeID="upload-description" style={styles.helperText}>
          Press Enter or Space to open file browser
        </Text>
      </View>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>Keyboard Navigation</Text>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Tab</Text>
          <Text style={styles.instructionText}>Focus dropzone</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Enter/Space</Text>
          <Text style={styles.instructionText}>Open file browser</Text>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.keyBadge}>Delete</Text>
          <Text style={styles.instructionText}>Remove selected file</Text>
        </View>
      </View>
    </View>
  );
}

export const AccessibilityDemo: Story = {
  render: () => <AccessibilityFileUpload />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 400,
    padding: 24,
    gap: 16,
  },
  controlledContainer: {
    width: 450,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  formContainer: {
    width: 450,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  fieldContainer: {
    gap: 6,
  },
  uploadWrapper: {
    borderRadius: 8,
  },
  uploadWrapperError: {
    borderWidth: 2,
    borderColor: '#ef4444',
    borderRadius: 12,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  labelError: {
    color: '#ef4444',
  },
  required: {
    color: '#ef4444',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  hint: {
    fontSize: 12,
    color: '#999',
  },
  quickSelect: {
    gap: 8,
  },
  quickSelectLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  quickSelectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickSelectButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quickSelectButtonText: {
    fontSize: 13,
    color: '#333',
  },
  clearButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  clearButtonText: {
    fontSize: 13,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statsText: {
    fontSize: 12,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  customDropzoneContent: {
    alignItems: 'center',
    gap: 8,
  },
  customDropzoneIcon: {
    fontSize: 32,
  },
  customDropzoneText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  customDropzoneHint: {
    fontSize: 12,
    color: '#666',
  },
  errorsContainer: {
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },
  errorItem: {
    fontSize: 12,
    color: '#b91c1c',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  progressLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  accessibilityInfo: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  accessibilityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 4,
  },
  accessibilityText: {
    fontSize: 13,
    color: '#166534',
    lineHeight: 18,
  },
  instructionsBox: {
    backgroundColor: '#f0f7ff',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  keyBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#1e40af',
    minWidth: 80,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 13,
    color: '#1e40af',
  },
});
