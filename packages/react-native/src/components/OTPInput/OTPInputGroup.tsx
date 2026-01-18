import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../tokens/spacing';

export interface OTPInputGroupProps {
  /** Slot components */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * OTPInputGroup - Container for grouping OTP slots (e.g., 3 + 3 with separator).
 */
export function OTPInputGroup({ children, style }: OTPInputGroupProps) {
  return <View style={[styles.group, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
});
