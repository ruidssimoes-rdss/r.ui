import React from 'react';
import { View, Text, ViewProps, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows } from '../../tokens/shadows';

export type CardVariant = 'elevated' | 'outlined' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<ViewProps, 'style'> {
  /** Card content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: CardVariant;
  /** Internal padding */
  padding?: CardPadding;
  /** Additional styles */
  style?: ViewStyle;
}

export interface CardHeaderProps extends Omit<ViewProps, 'style'> {
  /** Header content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface CardContentProps extends Omit<ViewProps, 'style'> {
  /** Content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface CardFooterProps extends Omit<ViewProps, 'style'> {
  /** Footer content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface CardTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface CardDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

const paddingStyles: Record<CardPadding, ViewStyle> = {
  none: { padding: 0 },
  sm: { padding: spacing[3] },
  md: { padding: spacing[4] },
  lg: { padding: spacing[6] },
};

const variantStyles: Record<CardVariant, ViewStyle> = {
  elevated: {
    backgroundColor: colors.bg.elevated,
    ...shadows.md,
  },
  outlined: {
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
};

export function Card({
  children,
  variant = 'elevated',
  padding = 'md',
  style,
  ...props
}: CardProps) {
  return (
    <View
      style={[styles.base, variantStyles[variant], paddingStyles[padding], style]}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, style, ...props }: CardHeaderProps) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

export function CardContent({ children, style, ...props }: CardContentProps) {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
}

export function CardFooter({ children, style, ...props }: CardFooterProps) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
}

export function CardTitle({ children, style }: CardTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function CardDescription({ children, style }: CardDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  header: {
    gap: spacing[1],
  },
  content: {
    paddingTop: spacing[4],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing[4],
    gap: spacing[2],
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
