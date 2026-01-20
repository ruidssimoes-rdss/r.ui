import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  ViewProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Easing,
  LayoutChangeEvent,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends Omit<ViewProps, 'style'> {
  /** Progress value (0-100) */
  value?: number;
  /** Visual style variant */
  variant?: ProgressVariant;
  /** Progress bar size */
  size?: ProgressSize;
  /** Show value label */
  showValue?: boolean;
  /** Indeterminate mode for unknown progress */
  indeterminate?: boolean;
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
  value = 0,
  variant = 'default',
  size = 'md',
  showValue = false,
  indeterminate = false,
  style,
  ...props
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const indeterminateAnim = useRef(new Animated.Value(0)).current;
  const [trackWidth, setTrackWidth] = useState(0);
  const sizeStyle = sizeStyles[size];
  const fillColor = variantColors[variant];

  // Determinate animation
  useEffect(() => {
    if (!indeterminate) {
      Animated.timing(animatedWidth, {
        toValue: clampedValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [clampedValue, animatedWidth, indeterminate]);

  // Indeterminate animation
  useEffect(() => {
    if (indeterminate) {
      const animation = Animated.loop(
        Animated.timing(indeterminateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
      return () => animation.stop();
    } else {
      indeterminateAnim.setValue(0);
    }
  }, [indeterminate, indeterminateAnim]);

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  // Indeterminate bar slides from left to right
  const translateX = indeterminateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-trackWidth * 0.4, trackWidth],
  });

  // Accessibility props
  const accessibilityProps = indeterminate
    ? {
        accessibilityRole: 'progressbar' as const,
        accessibilityState: { busy: true },
      }
    : {
        accessibilityRole: 'progressbar' as const,
        accessibilityValue: {
          min: 0,
          max: 100,
          now: clampedValue,
        },
      };

  return (
    <View style={[styles.container, style]} {...props} {...accessibilityProps}>
      <View style={[styles.track, sizeStyle.track]} onLayout={handleLayout}>
        {indeterminate ? (
          <Animated.View
            style={[
              styles.fill,
              styles.indeterminateFill,
              sizeStyle.track,
              {
                backgroundColor: fillColor,
                width: '40%',
                transform: [{ translateX }],
              },
            ]}
          />
        ) : (
          <Animated.View
            style={[
              styles.fill,
              sizeStyle.track,
              { backgroundColor: fillColor, width: widthInterpolation },
            ]}
          />
        )}
      </View>
      {showValue && !indeterminate && (
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
  indeterminateFill: {
    position: 'absolute',
    left: 0,
  },
  value: {
    color: colors.text.secondary,
    fontWeight: '500',
    minWidth: 36,
    textAlign: 'right',
  },
});
