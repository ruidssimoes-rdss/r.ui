/**
 * r/ui OnboardingDots
 * Animated step indicator dots
 */

import React, { useEffect, useRef } from 'react';
import { View, Pressable, Animated, StyleSheet, Text } from 'react-native';
import { useOnboarding } from './OnboardingContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { animations } from '../../tokens/animations';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import type { OnboardingDotsProps } from './types';

// Size configurations
const SIZE_CONFIG = {
  sm: { dot: 6, pill: { width: 16, height: 6 }, gap: 6, fontSize: 10 },
  md: { dot: 8, pill: { width: 24, height: 8 }, gap: 8, fontSize: 12 },
  lg: { dot: 10, pill: { width: 32, height: 10 }, gap: 10, fontSize: 14 },
} as const;

/**
 * OnboardingDots - Animated step indicators
 *
 * @example
 * ```tsx
 * // Basic dots
 * <Onboarding.Dots />
 *
 * // Pills variant with custom colors
 * <Onboarding.Dots
 *   variant="pills"
 *   activeColor="#007AFF"
 *   size="lg"
 * />
 *
 * // Numbers variant
 * <Onboarding.Dots variant="numbers" />
 * ```
 */
export function OnboardingDots({
  variant = 'dots',
  activeColor = colors.accent.blue.DEFAULT,
  inactiveColor = colors.border.default,
  size = 'md',
  style,
}: OnboardingDotsProps) {
  const { currentStep, totalSteps, goToStep } = useOnboarding();
  const config = SIZE_CONFIG[size];

  return (
    <View
      style={[styles.container, { gap: config.gap }, style]}
      accessibilityRole="tablist"
      accessibilityLabel={`Step ${currentStep + 1} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <Dot
          key={index}
          index={index}
          isActive={index === currentStep}
          variant={variant}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          size={size}
          onPress={() => goToStep(index)}
        />
      ))}
    </View>
  );
}

// ============================================================================
// Dot Component
// ============================================================================

interface DotProps {
  index: number;
  isActive: boolean;
  variant: 'dots' | 'pills' | 'numbers';
  activeColor: string;
  inactiveColor: string;
  size: 'sm' | 'md' | 'lg';
  onPress: () => void;
}

function Dot({
  index,
  isActive,
  variant,
  activeColor,
  inactiveColor,
  size,
  onPress,
}: DotProps) {
  const reducedMotion = useReducedMotion();
  const config = SIZE_CONFIG[size];

  // Animation values
  const scale = useRef(new Animated.Value(isActive ? 1 : 1)).current;
  const opacity = useRef(new Animated.Value(isActive ? 1 : 0.5)).current;
  const width = useRef(
    new Animated.Value(
      variant === 'pills'
        ? isActive
          ? config.pill.width
          : config.pill.height
        : config.dot
    )
  ).current;

  // Animate on active state change
  useEffect(() => {
    const duration = reducedMotion ? 0 : animations.duration.fast;
    const springConfig = animations.spring.snappy;

    if (isActive) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1.2,
          ...springConfig,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        variant === 'pills'
          ? Animated.spring(width, {
              toValue: config.pill.width,
              ...springConfig,
              useNativeDriver: false, // width can't use native driver
            })
          : Animated.timing(width, {
              toValue: config.dot,
              duration: 0,
              useNativeDriver: false,
            }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          ...springConfig,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration,
          useNativeDriver: true,
        }),
        variant === 'pills'
          ? Animated.spring(width, {
              toValue: config.pill.height,
              ...springConfig,
              useNativeDriver: false,
            })
          : Animated.timing(width, {
              toValue: config.dot,
              duration: 0,
              useNativeDriver: false,
            }),
      ]).start();
    }
  }, [isActive, variant, reducedMotion, scale, opacity, width, config]);

  // Render number variant
  if (variant === 'numbers') {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
        accessibilityLabel={`Go to step ${index + 1}`}
        hitSlop={8}
      >
        <Animated.View
          style={[
            styles.numberContainer,
            {
              width: config.dot * 2.5,
              height: config.dot * 2.5,
              borderRadius: config.dot * 1.25,
              backgroundColor: isActive ? activeColor : 'transparent',
              borderWidth: isActive ? 0 : 1,
              borderColor: inactiveColor,
              transform: [{ scale }],
              opacity,
            },
          ]}
        >
          <Text
            style={[
              styles.numberText,
              {
                fontSize: config.fontSize,
                color: isActive ? colors.text.primary : colors.text.secondary,
              },
            ]}
          >
            {index + 1}
          </Text>
        </Animated.View>
      </Pressable>
    );
  }

  // Render dot or pill variant
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`Go to step ${index + 1}`}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.dot,
          {
            width: variant === 'pills' ? width : config.dot,
            height: variant === 'pills' ? config.pill.height : config.dot,
            borderRadius: variant === 'pills' ? config.pill.height / 2 : config.dot / 2,
            backgroundColor: isActive ? activeColor : inactiveColor,
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[4],
  },
  dot: {
    // Dimensions set dynamically
  },
  numberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontWeight: '600',
  },
});
