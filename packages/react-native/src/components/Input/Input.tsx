import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Input label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChangeText?: (text: string) => void;
  /** Disable the input */
  disabled?: boolean;
  /** Show error state */
  error?: boolean;
  /** Error or helper text */
  helperText?: string;
  /** Input size */
  size?: InputSize;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional input styles */
  inputStyle?: TextStyle;
}

const sizeStyles: Record<InputSize, { container: ViewStyle; input: TextStyle }> = {
  sm: {
    container: { minHeight: 36 },
    input: {
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[3],
      fontSize: fontSizes.sm,
    },
  },
  md: {
    container: { minHeight: 44 },
    input: {
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
      fontSize: fontSizes.base,
    },
  },
  lg: {
    container: { minHeight: 52 },
    input: {
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[5],
      fontSize: fontSizes.lg,
    },
  },
};

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  disabled = false,
  error = false,
  helperText,
  size = 'md',
  style,
  inputStyle,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const sizeStyle = sizeStyles[size];

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          sizeStyle.container,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          disabled && styles.inputContainerDisabled,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            sizeStyle.input,
            disabled && styles.inputDisabled,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {helperText && (
        <Text style={[styles.helperText, error && styles.helperTextError]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  labelDisabled: {
    color: colors.text.muted,
  },
  inputContainer: {
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.md,
  },
  inputContainerFocused: {
    borderColor: colors.accent.blue.DEFAULT,
  },
  inputContainerError: {
    borderColor: colors.accent.red.DEFAULT,
  },
  inputContainerDisabled: {
    backgroundColor: colors.bg.elevated,
    borderColor: colors.border.muted,
  },
  input: {
    fontFamily: fontFamilies.sans,
    color: colors.text.primary,
    flex: 1,
  },
  inputDisabled: {
    color: colors.text.muted,
  },
  helperText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  helperTextError: {
    color: colors.accent.red.DEFAULT,
  },
});
