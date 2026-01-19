import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export interface EditorToolbarSeparatorProps {
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function EditorToolbarSeparator({ style }: EditorToolbarSeparatorProps) {
  return <View style={[styles.separator, style]} />;
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  separator: {
    width: 1,
    height: 20,
    backgroundColor: colors.border.default,
    marginHorizontal: spacing[1],
  },
});
