import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

export interface ScrollAreaCornerProps {
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * ScrollAreaCorner - Corner piece when both vertical and horizontal scrollbars are visible.
 */
export function ScrollAreaCorner({ style }: ScrollAreaCornerProps) {
  return <View style={[styles.corner, style]} />;
}

const styles = StyleSheet.create({
  corner: {
    position: 'absolute',
    right: spacing[1],
    bottom: spacing[1],
    width: 6,
    height: 6,
    backgroundColor: colors.bg.surface,
  },
});
