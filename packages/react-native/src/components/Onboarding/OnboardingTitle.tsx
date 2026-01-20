/**
 * r/ui OnboardingTitle
 * Animated title component for onboarding steps
 */

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useOnboarding } from './OnboardingContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { animations } from '../../tokens/animations';
import { colors } from '../../tokens/colors';
import { textStyles } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import type { OnboardingTitleProps } from './types';

/**
 * OnboardingTitle - Animated title for onboarding steps
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Onboarding.Title>Welcome to AppName</Onboarding.Title>
 *
 * // With custom animation
 * <Onboarding.Title animation="slideDown" delay={100}>
 *   Get Started
 * </Onboarding.Title>
 * ```
 */
export function OnboardingTitle({
  children,
  animation = 'slideUp',
  delay = 50,
  style,
}: OnboardingTitleProps) {
  const { currentStep } = useOnboarding();
  const reducedMotion = useReducedMotion();

  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Animate on mount and step change
  useEffect(() => {
    const effectiveAnimation = reducedMotion ? 'none' : animation;
    const effectiveDelay = reducedMotion ? 0 : delay;
    const duration = animations.duration.normal;

    // Reset values
    opacity.setValue(0);
    translateY.setValue(0);

    const animationList: Animated.CompositeAnimation[] = [];

    // Always fade in
    animationList.push(
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    );

    // Add slide animation if specified
    switch (effectiveAnimation) {
      case 'slideUp':
        translateY.setValue(20);
        animationList.push(
          Animated.spring(translateY, {
            toValue: 0,
            ...animations.spring.snappy,
            useNativeDriver: true,
          })
        );
        break;

      case 'slideDown':
        translateY.setValue(-20);
        animationList.push(
          Animated.spring(translateY, {
            toValue: 0,
            ...animations.spring.snappy,
            useNativeDriver: true,
          })
        );
        break;

      case 'fadeIn':
      case 'none':
      default:
        break;
    }

    // Start with delay
    const timeout = setTimeout(() => {
      Animated.parallel(animationList).start();
    }, effectiveDelay);

    return () => clearTimeout(timeout);
  }, [currentStep, animation, delay, reducedMotion, opacity, translateY]);

  return (
    <Animated.Text
      style={[
        styles.title,
        {
          opacity,
          transform: [{ translateY }],
        },
        style,
      ]}
      accessibilityRole="header"
    >
      {children}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
});
