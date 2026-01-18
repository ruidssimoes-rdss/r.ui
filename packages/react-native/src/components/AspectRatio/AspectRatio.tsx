import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';

export interface AspectRatioProps extends Omit<ViewProps, 'style'> {
  /** Aspect ratio as a number (e.g., 16/9, 4/3, 1) */
  ratio?: number;
  /** Container content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export function AspectRatio({
  ratio = 1,
  children,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={[styles.inner, { aspectRatio: ratio }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inner: {
    width: '100%',
    overflow: 'hidden',
  },
});
