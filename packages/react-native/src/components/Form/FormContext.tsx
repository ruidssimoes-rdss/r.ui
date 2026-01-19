import { createContext, useContext } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface FormFieldState {
  /** Unique field name */
  name: string;
  /** Field ID for accessibility */
  id: string;
  /** Whether the field has an error */
  hasError: boolean;
  /** Error message */
  errorMessage?: string;
  /** Whether the field is required */
  isRequired: boolean;
  /** Whether the field is disabled */
  isDisabled: boolean;
}

export interface FormFieldContextValue extends FormFieldState {
  /** Update field error state */
  setError: (message?: string) => void;
}

export interface FormContextValue {
  /** Form-level disabled state */
  disabled: boolean;
  /** Register a field with the form */
  registerField: (name: string, state: Partial<FormFieldState>) => void;
  /** Unregister a field */
  unregisterField: (name: string) => void;
  /** Get field state by name */
  getFieldState: (name: string) => FormFieldState | undefined;
  /** Set field error */
  setFieldError: (name: string, message?: string) => void;
}

// ============================================================================
// Contexts
// ============================================================================

export const FormContext = createContext<FormContextValue | null>(null);
export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

// ============================================================================
// Hooks
// ============================================================================

export function useForm(): FormContextValue | null {
  return useContext(FormContext);
}

export function useFormField(): FormFieldContextValue {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error(
      'Form field components must be used within a FormField. ' +
        'Wrap your component in <FormField> to fix this error.'
    );
  }
  return context;
}
