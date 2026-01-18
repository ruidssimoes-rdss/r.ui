import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { PaginationEllipsisProps } from './PaginationContext';

/**
 * PaginationEllipsis - Indicator for skipped page numbers.
 */
export function PaginationEllipsis({ style }: PaginationEllipsisProps) {
  return (
    <View style={[styles.ellipsis, style]} accessibilityLabel="More pages">
      <Text style={styles.ellipsisText}>...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ellipsis: {
    minWidth: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipsisText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.muted,
    letterSpacing: 2,
  },
});
