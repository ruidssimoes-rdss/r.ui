import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../tokens/spacing';
import { useFileUpload } from './FileUploadContext';

// ============================================================================
// Types
// ============================================================================

export interface FileUploadListProps {
  /** Custom render for each file item */
  children?: (file: any) => React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FileUploadList({ children, style }: FileUploadListProps) {
  const { files } = useFileUpload();

  if (files.length === 0) {
    return null;
  }

  return (
    <View style={[styles.list, style]}>
      {children
        ? files.map((file) => (
            <React.Fragment key={file.id}>
              {children(file)}
            </React.Fragment>
          ))
        : null
      }
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  list: {
    marginTop: spacing[3],
    gap: spacing[2],
  },
});
