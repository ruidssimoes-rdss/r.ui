import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export interface SidebarFooterProps {
  /** Footer content (user info, settings) */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function SidebarFooter({ children, style }: SidebarFooterProps) {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  footer: {
    marginTop: 'auto',
    padding: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
});
