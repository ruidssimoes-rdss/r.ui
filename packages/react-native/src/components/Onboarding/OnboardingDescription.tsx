/**
 * r/ui OnboardingDescription
 * Animated description component for onboarding steps
 */

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useOnboarding } from './OnboardingContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { animations } from '../../tokens/animations';
import { colors } from '../../tokens/colors';
import { textStyles } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import type { OnboardingDescriptionProps } from './types';

/**
 * OnboardingDescription - Animated description for onboarding steps
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Onboarding.Description>
 *   Discover a better way to manage your tasks
 * </Onboarding.Description>
 *
 * // With custom animation
 * <Onboarding.Description animation="slideUp" delay={150}>
 *   Everything you need in one place
 * </Onboarding.Description>
 * ```
 */
export function OnboardingDescription({
  children,
  animation = 'fadeIn',
  delay = 100,
  style,
}: OnboardingDescriptionProps) {
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
        translateY.setValue(15);
        animationList.push(
          Animated.spring(translateY, {
            toValue: 0,
            ...animations.spring.gentle,
            useNativeDriver: true,
          })
        );
        break;

      case 'slideDown':
        translateY.setValue(-15);
        animationList.push(
          Animated.spring(translateY, {
            toValue: 0,
            ...animations.spring.gentle,
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
        styles.description,
        {
          opacity,
          transform: [{ translateY }],
        },
        style,
      ]}
    >
      {children}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  description: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[6],
    paddingHorizontal: spacing[4],
  },
});
