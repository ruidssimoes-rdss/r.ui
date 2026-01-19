import React, { useState, useCallback, useEffect, useMemo, useId } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { FormFieldContext, useForm } from './FormContext';

// ============================================================================
// Types
// ============================================================================

export interface FormFieldProps {
  /** Unique field name */
  name: string;
  /** Field content (label, control, message) */
  children: React.ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FormField({
  name,
  children,
  required = false,
  disabled = false,
  error,
  style,
}: FormFieldProps) {
  const form = useForm();
  const generatedId = useId();
  const id = `field-${name}-${generatedId}`;

  const [internalError, setInternalError] = useState<string | undefined>(error);

  // Sync external error prop
  useEffect(() => {
    setInternalError(error);
  }, [error]);

  // Form-level disabled overrides field-level
  const isDisabled = form?.disabled || disabled;
  const hasError = !!internalError;

  // Register with form context if available
  useEffect(() => {
    if (form) {
      form.registerField(name, {
        id,
        hasError,
        errorMessage: internalError,
        isRequired: required,
        isDisabled,
      });
      return () => form.unregisterField(name);
    }
  }, [form, name, id, hasError, internalError, required, isDisabled]);

  const setError = useCallback((message?: string) => {
    setInternalError(message);
    if (form) {
      form.setFieldError(name, message);
    }
  }, [form, name]);

  const contextValue = useMemo(() => ({
    name,
    id,
    hasError,
    errorMessage: internalError,
    isRequired: required,
    isDisabled,
    setError,
  }), [name, id, hasError, internalError, required, isDisabled, setError]);

  return (
    <FormFieldContext.Provider value={contextValue}>
      <View style={[styles.field, style]}>
        {children}
      </View>
    </FormFieldContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  field: {
    width: '100%',
  },
});
