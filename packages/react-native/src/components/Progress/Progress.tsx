import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  ViewProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends Omit<ViewProps, 'style'> {
  /** Progress value (0-100) */
  value: number;
  /** Visual style variant */
  variant?: ProgressVariant;
  /** Progress bar size */
  size?: ProgressSize;
  /** Show value label */
  showValue?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

const sizeStyles: Record<ProgressSize, { track: ViewStyle; text: TextStyle }> = {
  sm: {
    track: { height: 4 },
    text: { fontSize: 11 },
  },
  md: {
    track: { height: 8 },
    text: { fontSize: 12 },
  },
  lg: {
    track: { height: 12 },
    text: { fontSize: 14 },
  },
};

const variantColors: Record<ProgressVariant, string> = {
  default: colors.accent.blue.DEFAULT,
  success: colors.accent.green.DEFAULT,
  warning: colors.accent.amber.DEFAULT,
  error: colors.accent.red.DEFAULT,
};

export function Progress({
  value,
  variant = 'default',
  size = 'md',
  showValue = false,
  style,
  ...props
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const sizeStyle = sizeStyles[size];
  const fillColor = variantColors[variant];

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: clampedValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [clampedValue, animatedWidth]);

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={[styles.track, sizeStyle.track]}>
        <Animated.View
          style={[
            styles.fill,
            sizeStyle.track,
            { backgroundColor: fillColor, width: widthInterpolation },
          ]}
        />
      </View>
      {showValue && (
        <Text style={[styles.value, sizeStyle.text]}>{Math.round(clampedValue)}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  track: {
    flex: 1,
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radius.full,
  },
  value: {
    color: colors.text.secondary,
    fontWeight: '500',
    minWidth: 36,
    textAlign: 'right',
  },
});
