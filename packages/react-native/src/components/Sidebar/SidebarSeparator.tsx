import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export interface SidebarSeparatorProps {
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function SidebarSeparator({ style }: SidebarSeparatorProps) {
  return (
    <View style={[styles.separator, style]} accessibilityRole="none" />
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors.border.default,
    marginVertical: spacing[2],
    marginHorizontal: spacing[3],
  },
});
