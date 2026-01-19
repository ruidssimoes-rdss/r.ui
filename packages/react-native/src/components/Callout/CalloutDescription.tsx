import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';

// ============================================================================
// Types
// ============================================================================

export interface CalloutDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional text styles */
  style?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function CalloutDescription({ children, style }: CalloutDescriptionProps) {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  description: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
