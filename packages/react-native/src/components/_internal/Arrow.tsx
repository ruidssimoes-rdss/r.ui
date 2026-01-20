import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';

export type ArrowSide = 'top' | 'bottom' | 'left' | 'right';

export interface ArrowProps {
  /** Side the arrow points to (opposite of overlay position) */
  side: ArrowSide;
  /** Arrow size in pixels */
  size?: number;
  /** Arrow color */
  color?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export function Arrow({
  side,
  size = 8,
  color = colors.bg.elevated,
  style,
}: ArrowProps) {
  const rotation = {
    top: '180deg',
    bottom: '0deg',
    left: '90deg',
    right: '-90deg',
  }[side];

  return (
    <View
      style={[
        styles.arrow,
        {
          borderLeftWidth: size,
          borderRightWidth: size,
          borderBottomWidth: size,
          borderBottomColor: color,
          transform: [{ rotate: rotation }],
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  arrow: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
