import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { useFormField } from './FormContext';

// ============================================================================
// Types
// ============================================================================

export interface FormDescriptionProps {
  /** Helper text content */
  children: React.ReactNode;
  /** Additional text styles */
  style?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FormDescription({ children, style }: FormDescriptionProps) {
  const field = useFormField();

  return (
    <Text
      style={[
        styles.description,
        field.isDisabled && styles.descriptionDisabled,
        style,
      ]}
      nativeID={`${field.id}-description`}
    >
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
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  descriptionDisabled: {
    color: colors.text.muted,
  },
});
