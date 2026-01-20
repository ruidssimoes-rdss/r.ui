import React, { useState, cloneElement, isValidElement } from 'react';
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';
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
  /** Icon or element to display on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Icon or element to display on the right side of the input */
  rightIcon?: React.ReactNode;
  /** Callback when left icon is pressed */
  onLeftIconPress?: () => void;
  /** Callback when right icon is pressed */
  onRightIconPress?: () => void;
}

const sizeStyles: Record<InputSize, { container: ViewStyle; input: TextStyle; iconSize: number; iconPadding: number }> = {
  sm: {
    container: { minHeight: 36 },
    input: {
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[3],
      fontSize: fontSizes.sm,
    },
    iconSize: 16,
    iconPadding: 8,
  },
  md: {
    container: { minHeight: 44 },
    input: {
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
      fontSize: fontSizes.base,
    },
    iconSize: 18,
    iconPadding: 10,
  },
  lg: {
    container: { minHeight: 52 },
    input: {
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[5],
      fontSize: fontSizes.lg,
    },
    iconSize: 20,
    iconPadding: 12,
  },
};

/**
 * Clones an icon element and applies the specified color and size
 */
function cloneIconWithColor(icon: React.ReactNode, color: string, size: number): React.ReactNode {
  if (!isValidElement(icon)) return icon;

  // Clone the icon with updated color and size props
  return cloneElement(icon as React.ReactElement<{ color?: string; size?: number; style?: object }>, {
    color,
    size,
    style: { ...(icon.props as { style?: object }).style },
  });
}

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
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const sizeStyle = sizeStyles[size];

  // Determine icon color based on state
  const iconColor = error
    ? colors.accent.red.DEFAULT
    : disabled
      ? colors.text.muted
      : colors.text.secondary;

  // Calculate input padding adjustments for icons
  const inputPaddingLeft = leftIcon ? sizeStyle.iconPadding + sizeStyle.iconSize + sizeStyle.iconPadding : sizeStyle.input.paddingHorizontal;
  const inputPaddingRight = rightIcon ? sizeStyle.iconPadding + sizeStyle.iconSize + sizeStyle.iconPadding : sizeStyle.input.paddingHorizontal;

  const renderIcon = (
    icon: React.ReactNode,
    onPress: (() => void) | undefined,
    position: 'left' | 'right'
  ) => {
    const iconElement = cloneIconWithColor(icon, iconColor, sizeStyle.iconSize);
    const positionStyle = position === 'left'
      ? { left: sizeStyle.iconPadding }
      : { right: sizeStyle.iconPadding };

    if (onPress && !disabled) {
      return (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.iconContainer,
            positionStyle,
            pressed && styles.iconPressed,
          ]}
          accessibilityRole="button"
          hitSlop={8}
        >
          {iconElement}
        </Pressable>
      );
    }

    return (
      <View style={[styles.iconContainer, positionStyle]}>
        {iconElement}
      </View>
    );
  };

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
        {leftIcon && renderIcon(leftIcon, onLeftIconPress, 'left')}
        <TextInput
          style={[
            styles.input,
            sizeStyle.input,
            { paddingLeft: inputPaddingLeft, paddingRight: inputPaddingRight },
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
        {rightIcon && renderIcon(rightIcon, onRightIconPress, 'right')}
      </View>
      {helperText && (
        <Text style={[styles.helperText, error && styles.helperTextError]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

// Built-in icon components for SearchInput and PasswordInput
function SearchIcon({ size = 18, color = colors.text.secondary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="11" cy="11" r="8" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Svg>
  );
}

function XIcon({ size = 18, color = colors.text.secondary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
}

function EyeIcon({ size = 18, color = colors.text.secondary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <Circle cx="12" cy="12" r="3" />
    </Svg>
  );
}

function EyeOffIcon({ size = 18, color = colors.text.secondary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <Line x1="1" y1="1" x2="23" y2="23" />
    </Svg>
  );
}

// SearchInput convenience component
export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'rightIcon' | 'onRightIconPress'> {
  /** Callback when clear button is pressed */
  onClear?: () => void;
}

export function SearchInput({
  value,
  onClear,
  size = 'md',
  ...props
}: SearchInputProps) {
  const sizeStyle = sizeStyles[size];

  return (
    <Input
      leftIcon={<SearchIcon size={sizeStyle.iconSize} />}
      rightIcon={value ? <XIcon size={sizeStyle.iconSize} /> : undefined}
      onRightIconPress={onClear}
      value={value}
      size={size}
      {...props}
    />
  );
}

// PasswordInput convenience component
export interface PasswordInputProps extends Omit<InputProps, 'rightIcon' | 'onRightIconPress' | 'secureTextEntry'> {}

export function PasswordInput({
  size = 'md',
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const sizeStyle = sizeStyles[size];

  return (
    <Input
      secureTextEntry={!visible}
      rightIcon={visible ? <EyeOffIcon size={sizeStyle.iconSize} /> : <EyeIcon size={sizeStyle.iconSize} />}
      onRightIconPress={() => setVisible(!visible)}
      size={size}
      {...props}
    />
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
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
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
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  iconPressed: {
    opacity: 0.6,
  },
});
