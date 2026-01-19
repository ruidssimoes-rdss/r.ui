import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useFileUpload, UploadedFile } from './FileUploadContext';
import { generateFileId } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface FileUploadDropzoneProps {
  /** Custom content inside dropzone */
  children?: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FileUploadDropzone({ children, style }: FileUploadDropzoneProps) {
  const { openPicker, addFiles, disabled, accept, multiple } = useFileUpload();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    const uploadedFiles: UploadedFile[] = Array.from(droppedFiles).map((file) => ({
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
  }, [disabled, addFiles]);

  const webDragProps = Platform.OS === 'web' ? {
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
  } : {};

  return (
    <Pressable
      onPress={openPicker}
      disabled={disabled}
      style={[
        styles.dropzone,
        isDragOver && styles.dropzoneDragOver,
        disabled && styles.dropzoneDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={multiple ? 'Click or drag files to upload' : 'Click or drag a file to upload'}
      {...webDragProps}
    >
      {children || (
        <View style={styles.defaultContent}>
          <View style={styles.iconContainer}>
            <UploadIcon />
          </View>
          <Text style={[styles.text, disabled && styles.textDisabled]}>
            {Platform.OS === 'web'
              ? 'Drag & drop files here, or click to browse'
              : 'Tap to select files'
            }
          </Text>
          {accept && (
            <Text style={styles.hint}>
              Accepted: {accept}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

// ============================================================================
// Upload Icon
// ============================================================================

function UploadIcon() {
  return (
    <View style={iconStyles.container}>
      <View style={iconStyles.arrow} />
      <View style={iconStyles.arrowHead} />
      <View style={iconStyles.line} />
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  dropzone: {
    borderWidth: 2,
    borderColor: colors.border.default,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    padding: spacing[8],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg.surface,
  },
  dropzoneDragOver: {
    borderColor: colors.accent.blue.DEFAULT,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  dropzoneDisabled: {
    opacity: 0.5,
    backgroundColor: colors.bg.elevated,
  },
  defaultContent: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing[3],
  },
  text: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  textDisabled: {
    color: colors.text.muted,
  },
  hint: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
    marginTop: spacing[2],
  },
});

const iconStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 2,
    height: 16,
    backgroundColor: colors.text.secondary,
    position: 'absolute',
    top: 6,
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.text.secondary,
    position: 'absolute',
    top: 2,
  },
  line: {
    width: 24,
    height: 2,
    backgroundColor: colors.text.secondary,
    position: 'absolute',
    bottom: 8,
    borderRadius: 1,
  },
});
