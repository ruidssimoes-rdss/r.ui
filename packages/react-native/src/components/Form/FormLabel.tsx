import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { useFormField } from './FormContext';

// ============================================================================
// Types
// ============================================================================

export interface FormLabelProps {
  /** Label text */
  children: React.ReactNode;
  /** Additional text styles */
  style?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FormLabel({ children, style }: FormLabelProps) {
  const field = useFormField();

  return (
    <Text
      style={[
        styles.label,
        field.hasError && styles.labelError,
        field.isDisabled && styles.labelDisabled,
        style,
      ]}
      nativeID={`${field.id}-label`}
      accessibilityRole="text"
    >
      {children}
      {field.isRequired && (
        <Text style={styles.required}> *</Text>
      )}
    </Text>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  labelError: {
    color: colors.accent.red.DEFAULT,
  },
  labelDisabled: {
    color: colors.text.muted,
  },
  required: {
    color: colors.accent.red.DEFAULT,
  },
});
