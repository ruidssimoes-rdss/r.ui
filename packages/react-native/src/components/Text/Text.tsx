import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
} from '../../tokens/typography';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'labelSmall'
  | 'code';

export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export type TextColor = 'primary' | 'secondary' | 'muted' | 'inverse' | 'inherit';

export type TextAlign = 'left' | 'center' | 'right';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  /** Text content */
  children: React.ReactNode;
  /** Typography variant */
  variant?: TextVariant;
  /** Font weight override */
  weight?: TextWeight;
  /** Text color */
  color?: TextColor;
  /** Text alignment */
  align?: TextAlign;
  /** Additional styles */
  style?: TextStyle;
}

const variantStyles: Record<TextVariant, TextStyle> = {
  h1: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes['4xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes['2xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.xl * lineHeights.tight,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.normal,
    lineHeight: fontSizes.base * lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: fontSizes.sm * lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.sm * lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  labelSmall: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.xs * lineHeights.normal,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  },
  code: {
    fontFamily: fontFamilies.mono,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: fontSizes.sm * lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },
};

const colorStyles: Record<Exclude<TextColor, 'inherit'>, TextStyle> = {
  primary: { color: colors.text.primary },
  secondary: { color: colors.text.secondary },
  muted: { color: colors.text.muted },
  inverse: { color: colors.text.inverse },
};

const alignStyles: Record<TextAlign, TextStyle> = {
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
};

const weightStyles: Record<TextWeight, TextStyle> = {
  normal: { fontWeight: fontWeights.normal },
  medium: { fontWeight: fontWeights.medium },
  semibold: { fontWeight: fontWeights.semibold },
  bold: { fontWeight: fontWeights.bold },
};

export function Text({
  children,
  variant = 'body',
  weight,
  color = 'primary',
  align,
  style,
  ...props
}: TextProps) {
  return (
    <RNText
      style={[
        variantStyles[variant],
        color !== 'inherit' && colorStyles[color],
        align && alignStyles[align],
        weight && weightStyles[weight],
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Convenience components for common use cases
export function Heading({
  level = 1,
  ...props
}: Omit<TextProps, 'variant'> & { level?: 1 | 2 | 3 | 4 }) {
  const variants: Record<1 | 2 | 3 | 4, TextVariant> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
  };
  return <Text variant={variants[level]} {...props} />;
}

export function Code(props: Omit<TextProps, 'variant'>) {
  return <Text variant="code" {...props} />;
}

export function Label(props: Omit<TextProps, 'variant'>) {
  return <Text variant="label" {...props} />;
}
