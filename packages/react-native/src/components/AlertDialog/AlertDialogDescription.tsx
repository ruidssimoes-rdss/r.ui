import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';

export interface AlertDialogDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export function AlertDialogDescription({ children, style }: AlertDialogDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
