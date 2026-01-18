import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';

export interface AlertDialogTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export function AlertDialogTitle({ children, style }: AlertDialogTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
