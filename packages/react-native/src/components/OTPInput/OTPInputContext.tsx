import React, { createContext, useContext, RefObject } from 'react';
import { TextInput } from 'react-native';

export interface OTPInputContextValue {
  /** Array of digit values */
  values: string[];
  /** Currently focused slot index */
  focusedIndex: number;
  /** Set the focused index */
  setFocusedIndex: (index: number) => void;
  /** Handle input for a specific slot */
  handleInput: (index: number, value: string) => void;
  /** Handle backspace for a specific slot */
  handleBackspace: (index: number) => void;
  /** Total number of slots */
  length: number;
  /** Whether the input is disabled */
  disabled: boolean;
  /** Whether the input is in error state */
  error: boolean;
  /** Refs for each input slot */
  inputRefs: RefObject<(TextInput | null)[]>;
  /** Focus a specific slot */
  focusSlot: (index: number) => void;
}

const OTPInputContext = createContext<OTPInputContextValue | null>(null);

export function useOTPInput(): OTPInputContextValue {
  const context = useContext(OTPInputContext);
  if (!context) {
    throw new Error('useOTPInput must be used within an OTPInput');
  }
  return context;
}

export { OTPInputContext };
