import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends Omit<ViewProps, 'style'> {
  /** Separator orientation */
  orientation?: SeparatorOrientation;
  /** Whether this is purely decorative (affects accessibility) */
  decorative?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

export function Separator({
  orientation = 'horizontal',
  decorative = true,
  style,
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <View
      style={[
        styles.base,
        isHorizontal ? styles.horizontal : styles.vertical,
        style,
      ]}
      accessibilityRole={decorative ? 'none' : 'separator'}
      accessible={!decorative}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.border.default,
  },
  horizontal: {
    height: 1,
    width: '100%',
    marginVertical: spacing[2],
  },
  vertical: {
    width: 1,
    height: '100%',
    marginHorizontal: spacing[2],
  },
});
