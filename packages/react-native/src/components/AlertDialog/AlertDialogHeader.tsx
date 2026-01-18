import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../tokens/spacing';

export interface AlertDialogHeaderProps {
  /** Header content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export function AlertDialogHeader({ children, style }: AlertDialogHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  header: {
    gap: spacing[2],
    marginBottom: spacing[4],
  },
});
