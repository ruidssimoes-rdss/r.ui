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
import { fontFamilies, fontSizes, fontWeights, lineHeights } from '../../tokens/typography';

export interface TextareaProps extends Omit<TextInputProps, 'style' | 'multiline'> {
  /** Textarea label */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChangeText?: (text: string) => void;
  /** Disable the textarea */
  disabled?: boolean;
  /** Show error state */
  error?: boolean;
  /** Error or helper text */
  helperText?: string;
  /** Number of visible rows */
  rows?: number;
  /** Maximum character count */
  maxLength?: number;
  /** Show character count */
  showCount?: boolean;
  /** Auto-grow height based on content */
  autoGrow?: boolean;
  /** Maximum rows when auto-growing */
  maxRows?: number;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional input styles */
  inputStyle?: TextStyle;
}

const LINE_HEIGHT = fontSizes.base * lineHeights.normal;
const PADDING_VERTICAL = spacing[3] * 2;

export function Textarea({
  label,
  placeholder,
  value,
  onChangeText,
  disabled = false,
  error = false,
  helperText,
  rows = 4,
  maxLength,
  showCount = false,
  autoGrow = false,
  maxRows = 10,
  style,
  inputStyle,
  ...props
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const minHeight = rows * LINE_HEIGHT + PADDING_VERTICAL;
  const maxHeight = maxRows * LINE_HEIGHT + PADDING_VERTICAL;

  const calculatedHeight = autoGrow
    ? Math.min(Math.max(contentHeight + PADDING_VERTICAL, minHeight), maxHeight)
    : minHeight;

  const characterCount = value?.length || 0;

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
          { minHeight: calculatedHeight },
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          disabled && styles.inputContainerDisabled,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            disabled && styles.inputDisabled,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          multiline
          textAlignVertical="top"
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onContentSizeChange={(e) => {
            if (autoGrow) {
              setContentHeight(e.nativeEvent.contentSize.height);
            }
          }}
          {...props}
        />
      </View>
      <View style={styles.footer}>
        {helperText && (
          <Text style={[styles.helperText, error && styles.helperTextError]}>
            {helperText}
          </Text>
        )}
        {(showCount || maxLength) && (
          <Text style={styles.charCount}>
            {characterCount}
            {maxLength && `/${maxLength}`}
          </Text>
        )}
      </View>
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
    fontSize: fontSizes.base,
    lineHeight: LINE_HEIGHT,
    color: colors.text.primary,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    flex: 1,
  },
  inputDisabled: {
    color: colors.text.muted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing[1],
  },
  helperText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    flex: 1,
  },
  helperTextError: {
    color: colors.accent.red.DEFAULT,
  },
  charCount: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
    marginLeft: spacing[2],
  },
});
