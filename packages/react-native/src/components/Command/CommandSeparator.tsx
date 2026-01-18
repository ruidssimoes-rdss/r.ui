import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export interface CommandSeparatorProps {
  /** Additional styles */
  style?: ViewStyle;
}

export function CommandSeparator({ style }: CommandSeparatorProps) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors.border.default,
    marginVertical: spacing[2],
    marginHorizontal: spacing[2],
  },
});
