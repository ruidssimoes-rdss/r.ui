import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export interface SidebarHeaderProps {
  /** Header content (logo, title) */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function SidebarHeader({ children, style }: SidebarHeaderProps) {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  header: {
    padding: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
});
