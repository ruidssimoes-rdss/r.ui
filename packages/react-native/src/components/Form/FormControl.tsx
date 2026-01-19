import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useFormField } from './FormContext';

// ============================================================================
// Types
// ============================================================================

export interface FormControlProps {
  /** The form control element (Input, Select, etc.) */
  children: React.ReactElement;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FormControl({ children, style }: FormControlProps) {
  const field = useFormField();

  // Clone the child and inject accessibility props
  const enhancedChild = React.cloneElement(children, {
    id: field.id,
    'aria-describedby': field.hasError
      ? `${field.id}-message`
      : undefined,
    'aria-invalid': field.hasError,
    'aria-required': field.isRequired,
    disabled: field.isDisabled || children.props.disabled,
    error: field.hasError || children.props.error,
  });

  return (
    <View style={[styles.control, style]}>
      {enhancedChild}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  control: {
    width: '100%',
  },
});
