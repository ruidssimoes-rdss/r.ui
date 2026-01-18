import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { View, StyleSheet, ViewStyle, TextInput } from 'react-native';
import { OTPInputContext, OTPInputContextValue } from './OTPInputContext';
import { OTPInputSlot } from './OTPInputSlot';
import { spacing } from '../../tokens/spacing';

export interface OTPInputProps {
  /** Number of digits (default: 6) */
  length?: number;
  /** Current value as string */
  value?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Callback when all digits are filled */
  onComplete?: (value: string) => void;
  /** Disable the input */
  disabled?: boolean;
  /** Show error state */
  error?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  /** Custom children (for grouped layout) */
  children?: React.ReactNode;
}

/**
 * OTPInput - A specialized input for verification codes with separate boxes for each digit.
 */
export function OTPInput({
  length = 6,
  value = '',
  onValueChange,
  onComplete,
  disabled = false,
  error = false,
  style,
  children,
}: OTPInputProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Convert string value to array of digits
  const values = useMemo(() => {
    const arr = value.split('').slice(0, length);
    while (arr.length < length) {
      arr.push('');
    }
    return arr;
  }, [value, length]);

  const focusSlot = useCallback((index: number) => {
    if (index >= 0 && index < length && inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  }, [length]);

  const handleInput = useCallback(
    (index: number, inputValue: string) => {
      if (disabled) return;

      // Handle paste (multiple characters)
      if (inputValue.length > 1) {
        const digits = inputValue.replace(/\D/g, '').slice(0, length);
        onValueChange?.(digits);

        // Focus the next empty slot or last slot
        const nextIndex = Math.min(digits.length, length - 1);
        setTimeout(() => focusSlot(nextIndex), 0);

        // Check if complete
        if (digits.length === length) {
          onComplete?.(digits);
        }
        return;
      }

      // Handle single character
      const digit = inputValue.replace(/\D/g, '');
      if (digit) {
        const newValues = [...values];
        newValues[index] = digit;
        const newValue = newValues.join('');
        onValueChange?.(newValue);

        // Auto-advance to next slot
        if (index < length - 1) {
          setTimeout(() => focusSlot(index + 1), 0);
        }

        // Check if complete
        if (newValues.every((v) => v !== '') && newValue.length === length) {
          onComplete?.(newValue);
        }
      }
    },
    [disabled, length, values, onValueChange, onComplete, focusSlot]
  );

  const handleBackspace = useCallback(
    (index: number) => {
      if (disabled) return;

      const newValues = [...values];

      if (values[index]) {
        // Clear current slot
        newValues[index] = '';
        onValueChange?.(newValues.join(''));
      } else if (index > 0) {
        // Move to previous slot and clear it
        newValues[index - 1] = '';
        onValueChange?.(newValues.join(''));
        setTimeout(() => focusSlot(index - 1), 0);
      }
    },
    [disabled, values, onValueChange, focusSlot]
  );

  // Auto-focus first empty slot on mount
  useEffect(() => {
    if (!disabled) {
      const firstEmptyIndex = values.findIndex((v) => v === '');
      if (firstEmptyIndex !== -1) {
        setTimeout(() => focusSlot(firstEmptyIndex), 100);
      }
    }
  }, []);

  const contextValue: OTPInputContextValue = useMemo(
    () => ({
      values,
      focusedIndex,
      setFocusedIndex,
      handleInput,
      handleBackspace,
      length,
      disabled,
      error,
      inputRefs,
      focusSlot,
    }),
    [values, focusedIndex, handleInput, handleBackspace, length, disabled, error, focusSlot]
  );

  // Default layout if no children provided
  const defaultChildren = useMemo(() => {
    return Array.from({ length }, (_, i) => <OTPInputSlot key={i} index={i} />);
  }, [length]);

  return (
    <OTPInputContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>
        {children || defaultChildren}
      </View>
    </OTPInputContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
});
