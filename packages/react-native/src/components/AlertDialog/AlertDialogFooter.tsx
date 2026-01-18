import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../tokens/spacing';

export interface AlertDialogFooterProps {
  /** Footer content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export function AlertDialogFooter({ children, style }: AlertDialogFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing[3],
    marginTop: spacing[6],
  },
});
