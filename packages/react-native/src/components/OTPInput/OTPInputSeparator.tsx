import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export interface OTPInputSeparatorProps {
  /** Separator character (default: "-") */
  children?: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

/**
 * OTPInputSeparator - Visual separator between OTP input groups.
 */
export function OTPInputSeparator({ children = '-', style }: OTPInputSeparatorProps) {
  return <Text style={[styles.separator, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  separator: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.text.muted,
    marginHorizontal: spacing[1],
  },
});
