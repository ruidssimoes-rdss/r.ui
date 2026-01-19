import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { useFormField } from './FormContext';

// ============================================================================
// Types
// ============================================================================

export interface FormMessageProps {
  /** Custom message (overrides error message from context) */
  children?: React.ReactNode;
  /** Additional text styles */
  style?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FormMessage({ children, style }: FormMessageProps) {
  const field = useFormField();

  // Show either custom children or the error message from context
  const message = children ?? field.errorMessage;

  // Don't render if there's no message
  if (!message) {
    return null;
  }

  return (
    <Text
      style={[
        styles.message,
        field.hasError && styles.messageError,
        style,
      ]}
      nativeID={`${field.id}-message`}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {message}
    </Text>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  message: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  messageError: {
    color: colors.accent.red.DEFAULT,
  },
});
