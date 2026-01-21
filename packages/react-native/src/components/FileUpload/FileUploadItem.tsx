import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useFileUpload, UploadedFile } from './FileUploadContext';
import { formatFileSize, getFileIconType } from './utils';
import { TOUCH_TARGET, getHitSlop } from '../../utils/platform';

const REMOVE_BUTTON_SIZE = 32;

// ============================================================================
// Types
// ============================================================================

export interface FileUploadItemProps {
  /** File to display */
  file: UploadedFile;
  /** Show preview thumbnail for images */
  showPreview?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FileUploadItem({ file, showPreview = true, style }: FileUploadItemProps) {
  const { removeFile, disabled } = useFileUpload();

  const handleRemove = () => {
    if (!disabled) {
      removeFile(file.id);
    }
  };

  const isImage = file.type.startsWith('image/');
  const iconType = getFileIconType(file.name);

  return (
    <View style={[styles.item, file.status === 'error' && styles.itemError, style]}>
      {/* Preview or Icon */}
      <View style={styles.preview}>
        {showPreview && isImage && file.previewUrl ? (
          <Image
            source={{ uri: file.previewUrl }}
            style={styles.thumbnail}
            accessible
            accessibilityLabel={`Preview of ${file.name}`}
          />
        ) : (
          <FileIcon type={iconType} />
        )}
      </View>

      {/* File Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {file.name}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.size}>{formatFileSize(file.size)}</Text>
          {file.status === 'uploading' && (
            <Text style={styles.progress}>{Math.round(file.progress)}%</Text>
          )}
          {file.status === 'error' && (
            <Text style={styles.error}>{file.error || 'Upload failed'}</Text>
          )}
        </View>

        {/* Progress Bar */}
        {file.status === 'uploading' && (
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${file.progress}%` }]} />
          </View>
        )}
      </View>

      {/* Remove Button */}
      <Pressable
        onPress={handleRemove}
        disabled={disabled}
        style={[styles.removeButton, disabled && styles.removeButtonDisabled]}
        hitSlop={getHitSlop(REMOVE_BUTTON_SIZE)}
        accessibilityLabel={`Remove ${file.name}`}
        accessibilityRole="button"
      >
        <CloseIcon />
      </Pressable>
    </View>
  );
}

// ============================================================================
// File Icon Component
// ============================================================================

function FileIcon({ type }: { type: string }) {
  const iconColors: Record<string, string> = {
    image: colors.accent.green.DEFAULT,
    pdf: colors.accent.red.DEFAULT,
    document: colors.accent.blue.DEFAULT,
    spreadsheet: colors.accent.green.DEFAULT,
    archive: colors.accent.yellow.DEFAULT,
    video: colors.accent.purple.DEFAULT,
    audio: colors.accent.pink.DEFAULT,
    code: colors.accent.cyan.DEFAULT,
    generic: colors.text.secondary,
  };

  return (
    <View style={[iconStyles.container, { backgroundColor: iconColors[type] || colors.text.secondary }]}>
      <View style={iconStyles.fold} />
      <Text style={iconStyles.extension}>
        {type === 'generic' ? 'FILE' : type.substring(0, 3).toUpperCase()}
      </Text>
    </View>
  );
}

function CloseIcon() {
  return (
    <View style={closeIconStyles.container}>
      <View style={closeIconStyles.x1} />
      <View style={closeIconStyles.x2} />
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  itemError: {
    borderColor: colors.accent.red.DEFAULT,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  preview: {
    marginRight: spacing[3],
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.bg.elevated,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
    marginBottom: 2,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  size: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
  },
  progress: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.accent.blue.DEFAULT,
  },
  error: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.accent.red.DEFAULT,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.border.default,
    borderRadius: 2,
    marginTop: spacing[2],
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: 2,
  },
  removeButton: {
    padding: spacing[2],
    marginLeft: spacing[2],
    minWidth: REMOVE_BUTTON_SIZE,
    minHeight: REMOVE_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonDisabled: {
    opacity: 0.5,
  },
});

const iconStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fold: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomLeftRadius: 4,
  },
  extension: {
    fontFamily: fontFamilies.mono,
    fontSize: 8,
    color: 'white',
    fontWeight: '600',
  },
});

const closeIconStyles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  x1: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  x2: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
});
