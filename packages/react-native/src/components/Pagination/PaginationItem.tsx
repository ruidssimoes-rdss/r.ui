import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PaginationItemProps } from './PaginationContext';

/**
 * PaginationItem - Generic wrapper for pagination elements.
 */
export function PaginationItem({ children, style }: PaginationItemProps) {
  return <View style={[styles.item, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  item: {},
});
