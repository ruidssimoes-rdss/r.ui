import React from 'react';
import { View, StyleSheet, ViewStyle, AccessibilityRole } from 'react-native';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export interface SidebarNavProps {
  /** Navigation content */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function SidebarNav({ children, style }: SidebarNavProps) {
  return (
    <View style={[styles.nav, style]} accessibilityRole={'navigation' as AccessibilityRole}>
      {children}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    padding: spacing[2],
  },
});
