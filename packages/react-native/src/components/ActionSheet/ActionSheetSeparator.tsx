import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export interface ActionSheetSeparatorProps {
  /** Additional styles */
  style?: ViewStyle;
}

export function ActionSheetSeparator({ style }: ActionSheetSeparatorProps) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: spacing[2],
    backgroundColor: colors.bg.primary,
    marginVertical: spacing[1],
    marginHorizontal: -spacing[4],
  },
});
