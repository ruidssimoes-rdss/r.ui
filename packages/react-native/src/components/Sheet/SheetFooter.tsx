import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../tokens/spacing';
import { SheetFooterProps } from './SheetContext';

/**
 * SheetFooter - Container for sheet action buttons.
 */
export function SheetFooter({ children, style }: SheetFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing[2],
    marginTop: spacing[4],
  },
});
