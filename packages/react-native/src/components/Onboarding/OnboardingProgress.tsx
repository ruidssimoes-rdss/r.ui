/**
 * r/ui OnboardingProgress
 * Progress bar indicator for onboarding steps
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useOnboarding } from './OnboardingContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { animations } from '../../tokens/animations';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import type { OnboardingProgressProps } from './types';

/**
 * OnboardingProgress - Progress bar indicator
 *
 * @example
 * ```tsx
 * // Basic progress bar
 * <Onboarding.Progress />
 *
 * // Segmented progress with custom colors
 * <Onboarding.Progress
 *   variant="segmented"
 *   color="#22c55e"
 *   height={6}
 * />
 * ```
 */
export function OnboardingProgress({
  variant = 'bar',
  color = colors.accent.blue.DEFAULT,
  trackColor = colors.border.default,
  height = 4,
  animated = true,
  style,
}: OnboardingProgressProps) {
  const { currentStep, totalSteps } = useOnboarding();
  const reducedMotion = useReducedMotion();

  // Calculate progress (0 to 1)
  const progress = totalSteps > 0 ? (currentStep + 1) / totalSteps : 0;

  // Animation value for smooth progress
  const animatedProgress = useRef(new Animated.Value(progress)).current;

  // Animate progress changes
  useEffect(() => {
    const shouldAnimate = animated && !reducedMotion;

    if (shouldAnimate) {
      Animated.spring(animatedProgress, {
        toValue: progress,
        ...animations.spring.snappy,
        useNativeDriver: false, // width percentage can't use native driver
      }).start();
    } else {
      animatedProgress.setValue(progress);
    }
  }, [progress, animated, reducedMotion, animatedProgress]);

  if (variant === 'segmented') {
    return (
      <View
        style={[styles.container, style]}
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: 0,
          max: totalSteps,
          now: currentStep + 1,
        }}
        accessibilityLabel={`Step ${currentStep + 1} of ${totalSteps}`}
      >
        <View style={[styles.segmentedContainer, { gap: spacing[1] }]}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <SegmentedBar
              key={index}
              isActive={index <= currentStep}
              color={color}
              trackColor={trackColor}
              height={height}
              animated={animated && !reducedMotion}
            />
          ))}
        </View>
      </View>
    );
  }

  // Continuous progress bar
  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(progress * 100),
      }}
      accessibilityLabel={`Progress: ${Math.round(progress * 100)}%`}
    >
      <View
        style={[
          styles.track,
          {
            height,
            borderRadius: height / 2,
            backgroundColor: trackColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              borderRadius: height / 2,
              backgroundColor: color,
              width: animatedProgress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

// ============================================================================
// Segmented Bar Component
// ============================================================================

interface SegmentedBarProps {
  isActive: boolean;
  color: string;
  trackColor: string;
  height: number;
  animated: boolean;
}

function SegmentedBar({
  isActive,
  color,
  trackColor,
  height,
  animated,
}: SegmentedBarProps) {
  const scale = useRef(new Animated.Value(isActive ? 1 : 1)).current;
  const backgroundColor = useRef(
    new Animated.Value(isActive ? 1 : 0)
  ).current;

  useEffect(() => {
    if (animated) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: isActive ? 1.02 : 1,
          ...animations.spring.snappy,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundColor, {
          toValue: isActive ? 1 : 0,
          duration: animations.duration.fast,
          useNativeDriver: false, // backgroundColor can't use native driver
        }),
      ]).start();
    } else {
      scale.setValue(1);
      backgroundColor.setValue(isActive ? 1 : 0);
    }
  }, [isActive, animated, scale, backgroundColor]);

  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [trackColor, color],
  });

  return (
    <Animated.View
      style={[
        styles.segment,
        {
          height,
          borderRadius: height / 2,
          backgroundColor: interpolatedColor,
          transform: [{ scaleY: scale }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  segmentedContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  segment: {
    flex: 1,
  },
});
