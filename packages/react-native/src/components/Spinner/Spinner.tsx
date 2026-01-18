import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'default' | 'dots';

export interface SpinnerProps {
  /** Spinner size */
  size?: SpinnerSize;
  /** Spinner color */
  color?: string;
  /** Spinner variant */
  variant?: SpinnerVariant;
  /** Additional styles */
  style?: ViewStyle;
}

const sizeConfig: Record<SpinnerSize, { container: number; stroke: number; dot: number }> = {
  sm: { container: 16, stroke: 2, dot: 4 },
  md: { container: 24, stroke: 2.5, dot: 6 },
  lg: { container: 32, stroke: 3, dot: 8 },
};

export function Spinner({
  size = 'md',
  color = colors.text.primary,
  variant = 'default',
  style,
}: SpinnerProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dotAnims = useRef([
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
  ]).current;

  const config = sizeConfig[size];

  useEffect(() => {
    if (variant === 'default') {
      const animation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 750,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animation.start();
      return () => animation.stop();
    } else {
      const createDotAnimation = (anim: Animated.Value, delay: number) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        );

      const animations = dotAnims.map((anim, i) => createDotAnimation(anim, i * 150));
      animations.forEach((a) => a.start());
      return () => animations.forEach((a) => a.stop());
    }
  }, [variant]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (variant === 'dots') {
    return (
      <View style={[styles.dotsContainer, { gap: config.dot / 2 }, style]}>
        {dotAnims.map((anim, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                width: config.dot,
                height: config.dot,
                backgroundColor: color,
                opacity: anim,
              },
            ]}
          />
        ))}
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: config.container,
          height: config.container,
          transform: [{ rotate: spin }],
        },
        style,
      ]}
    >
      <View
        style={[
          styles.spinner,
          {
            width: config.container,
            height: config.container,
            borderWidth: config.stroke,
            borderColor: 'transparent',
            borderTopColor: color,
            borderRightColor: color,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    borderRadius: 9999,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    borderRadius: 9999,
  },
});
