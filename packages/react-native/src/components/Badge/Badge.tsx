import React from 'react';
import { View, Text, ViewProps, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends Omit<ViewProps, 'style'> {
  /** Badge content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

const sizeStyles: Record<BadgeSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: { paddingVertical: spacing[1], paddingHorizontal: spacing[2] },
    text: { fontSize: 11 },
  },
  md: {
    container: { paddingVertical: spacing[1], paddingHorizontal: spacing[3] },
    text: { fontSize: 12 },
  },
};

const variantStyles: Record<BadgeVariant, { container: ViewStyle; text: TextStyle }> = {
  default: {
    container: {
      backgroundColor: colors.accent.blue.DEFAULT,
    },
    text: {
      color: colors.white,
    },
  },
  secondary: {
    container: {
      backgroundColor: colors.bg.elevated,
    },
    text: {
      color: colors.text.primary,
    },
  },
  success: {
    container: {
      backgroundColor: colors.accent.green.DEFAULT,
    },
    text: {
      color: colors.white,
    },
  },
  warning: {
    container: {
      backgroundColor: colors.accent.amber.DEFAULT,
    },
    text: {
      color: colors.black,
    },
  },
  error: {
    container: {
      backgroundColor: colors.accent.red.DEFAULT,
    },
    text: {
      color: colors.white,
    },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border.default,
    },
    text: {
      color: colors.text.primary,
    },
  },
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
  ...props
}: BadgeProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <View
      style={[styles.base, sizeStyle.container, variantStyle.container, style]}
      {...props}
    >
      <Text style={[styles.text, sizeStyle.text, variantStyle.text, textStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
  },
  text: {
    fontWeight: '600',
  },
});
