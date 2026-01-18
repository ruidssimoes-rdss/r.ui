import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export interface ActionSheetHeaderProps {
  /** Header content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface ActionSheetTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface ActionSheetDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export function ActionSheetHeader({ children, style }: ActionSheetHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function ActionSheetTitle({ children, style }: ActionSheetTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function ActionSheetDescription({ children, style }: ActionSheetDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    marginBottom: spacing[2],
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: spacing[1],
  },
});
