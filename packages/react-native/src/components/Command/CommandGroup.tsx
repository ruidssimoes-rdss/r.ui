import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export interface CommandGroupProps {
  /** Group content (CommandItems) */
  children: React.ReactNode;
  /** Group heading */
  heading?: string;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional heading styles */
  headingStyle?: TextStyle;
}

export function CommandGroup({
  children,
  heading,
  style,
  headingStyle,
}: CommandGroupProps) {
  return (
    <View style={[styles.container, style]}>
      {heading && (
        <Text style={[styles.heading, headingStyle]}>{heading}</Text>
      )}
      <View style={styles.items}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[1],
  },
  heading: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.text.muted,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  items: {
    gap: spacing[1],
  },
});
