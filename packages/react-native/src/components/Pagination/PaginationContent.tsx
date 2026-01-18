import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../tokens/spacing';
import { PaginationContentProps } from './PaginationContext';

/**
 * PaginationContent - Container for pagination items with flex layout.
 */
export function PaginationContent({ children, style }: PaginationContentProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
});
