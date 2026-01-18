import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { SheetHeaderProps, SheetTitleProps, SheetDescriptionProps } from './SheetContext';

/**
 * SheetHeader - Container for sheet title and description.
 */
export function SheetHeader({ children, style }: SheetHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

/**
 * SheetTitle - Main title text for the sheet.
 */
export function SheetTitle({ children, style }: SheetTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

/**
 * SheetDescription - Secondary description text for the sheet.
 */
export function SheetDescription({ children, style }: SheetDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
