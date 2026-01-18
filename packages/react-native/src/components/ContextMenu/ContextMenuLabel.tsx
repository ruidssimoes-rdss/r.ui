import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export interface ContextMenuLabelProps {
  /** Label text */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function ContextMenuLabel({ children, style, textStyle }: ContextMenuLabelProps) {
  return (
    <Text style={[styles.label, style, textStyle]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.muted,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
  },
});
