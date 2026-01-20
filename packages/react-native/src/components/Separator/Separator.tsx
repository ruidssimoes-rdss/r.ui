import React from 'react';
import { View, Text, StyleSheet, ViewStyle, ViewProps, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamilies, fontSizes } from '../../tokens/typography';

export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorLabelPosition = 'start' | 'center' | 'end';

export interface SeparatorProps extends Omit<ViewProps, 'style'> {
  /** Separator orientation */
  orientation?: SeparatorOrientation;
  /** Whether this is purely decorative (affects accessibility) */
  decorative?: boolean;
  /** Optional label text to display on the separator */
  label?: string;
  /** Position of the label (horizontal only) */
  labelPosition?: SeparatorLabelPosition;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional label styles */
  labelStyle?: TextStyle;
}

export function Separator({
  orientation = 'horizontal',
  decorative = true,
  label,
  labelPosition = 'center',
  style,
  labelStyle,
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === 'horizontal';

  // If there's a label, render the labeled variant (horizontal only)
  if (label && isHorizontal) {
    return (
      <View
        style={[styles.labelContainer, style]}
        accessibilityRole={decorative ? 'none' : 'separator'}
        accessible={!decorative}
        {...props}
      >
        <View
          style={[
            styles.line,
            labelPosition === 'start' ? styles.lineShort : styles.lineFlex,
          ]}
        />
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <View
          style={[
            styles.line,
            labelPosition === 'end' ? styles.lineShort : styles.lineFlex,
          ]}
        />
      </View>
    );
  }

  // Standard separator without label
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
  // Label variant styles
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: spacing[2],
  },
  line: {
    height: 1,
    backgroundColor: colors.border.default,
  },
  lineFlex: {
    flex: 1,
  },
  lineShort: {
    width: spacing[4],
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.muted,
    paddingHorizontal: spacing[3],
  },
});
