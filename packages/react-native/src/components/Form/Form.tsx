import React, { useState, useCallback, useMemo } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { FormContext, FormFieldState } from './FormContext';

// ============================================================================
// Types
// ============================================================================

export interface FormProps {
  /** Form content */
  children: React.ReactNode;
  /** Disable all form fields */
  disabled?: boolean;
  /** Handle form submission */
  onSubmit?: () => void;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function Form({
  children,
  disabled = false,
  onSubmit,
  style,
}: FormProps) {
  const [fields, setFields] = useState<Record<string, FormFieldState>>({});

  const registerField = useCallback((name: string, state: Partial<FormFieldState>) => {
    setFields((prev) => ({
      ...prev,
      [name]: {
        name,
        id: state.id || `field-${name}`,
        hasError: state.hasError || false,
        errorMessage: state.errorMessage,
        isRequired: state.isRequired || false,
        isDisabled: state.isDisabled || false,
        ...state,
      } as FormFieldState,
    }));
  }, []);

  const unregisterField = useCallback((name: string) => {
    setFields((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const getFieldState = useCallback((name: string) => {
    return fields[name];
  }, [fields]);

  const setFieldError = useCallback((name: string, message?: string) => {
    setFields((prev) => {
      if (!prev[name]) return prev;
      return {
        ...prev,
        [name]: {
          ...prev[name],
          hasError: !!message,
          errorMessage: message,
        },
      };
    });
  }, []);

  const contextValue = useMemo(() => ({
    disabled,
    registerField,
    unregisterField,
    getFieldState,
    setFieldError,
  }), [disabled, registerField, unregisterField, getFieldState, setFieldError]);

  return (
    <FormContext.Provider value={contextValue}>
      <View style={[styles.form, style]} accessibilityRole="none">
        {children}
      </View>
    </FormContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
});
