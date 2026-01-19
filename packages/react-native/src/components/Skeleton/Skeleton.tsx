import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  ViewProps,
  StyleSheet,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps extends Omit<ViewProps, 'style'> {
  /** Width of the skeleton */
  width?: DimensionValue;
  /** Height of the skeleton */
  height?: DimensionValue;
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Enable shimmer animation */
  animate?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

const variantStyles: Record<SkeletonVariant, ViewStyle> = {
  text: {
    borderRadius: radius.sm,
    height: 16,
  },
  circular: {
    borderRadius: 9999,
  },
  rectangular: {
    borderRadius: radius.md,
  },
};

export function Skeleton({
  width = '100%',
  height,
  variant = 'text',
  animate = true,
  style,
  ...props
}: SkeletonProps) {
  const reducedMotion = useReducedMotion();
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  // Disable animation when user prefers reduced motion
  const shouldAnimate = animate && !reducedMotion;

  useEffect(() => {
    if (!shouldAnimate) {
      // Set to static opacity when not animating
      shimmerAnim.setValue(0.5);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [shouldAnimate, shimmerAnim]);

  const opacity = shouldAnimate
    ? shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
      })
    : 0.5;

  const variantStyle = variantStyles[variant];
  const circularSize = variant === 'circular' ? (height ?? 40) : undefined;

  return (
    <Animated.View
      style={[
        styles.base,
        variantStyle,
        {
          width: variant === 'circular' ? circularSize : width,
          height: height ?? variantStyle.height,
          opacity,
        },
        style,
      ]}
      accessibilityRole="none"
      accessibilityLabel="Loading content"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.bg.elevated,
  },
});
