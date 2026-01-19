import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export interface CalloutTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional text styles */
  style?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function CalloutTitle({ children, style }: CalloutTitleProps) {
  return (
    <Text style={[styles.title, style]} accessibilityRole="header">
      {children}
    </Text>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
});
