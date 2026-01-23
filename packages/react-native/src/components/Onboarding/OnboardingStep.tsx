/**
 * Hyena OnboardingStep
 * Individual step container with animated transitions
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { useOnboarding } from './OnboardingContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { animations } from '../../tokens/animations';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { GlassSurface } from '../GlassSurface';
import { useTheme, ThemeContextValue } from '../../themes/ThemeProvider';
import type { OnboardingStepProps, StepAnimation } from './types';

// Safe hook that returns null if ThemeProvider is not present
function useThemeOptional(): ThemeContextValue | null {
  try {
    return useTheme();
  } catch {
    return null;
  }
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * OnboardingStep - Container for individual onboarding step content
 *
 * @example
 * ```tsx
 * <Onboarding.Step id="welcome" animation="fade">
 *   <Onboarding.Image source={require('./welcome.png')} />
 *   <Onboarding.Title>Welcome</Onboarding.Title>
 *   <Onboarding.Description>Get started with our app</Onboarding.Description>
 * </Onboarding.Step>
 * ```
 */
export function OnboardingStep({
  children,
  id,
  animation = 'slide',
  style,
}: OnboardingStepProps) {
  const {
    currentStep,
    direction,
    registerStep,
    unregisterStep,
  } = useOnboarding();
  const reducedMotion = useReducedMotion();
  const themeContext = useThemeOptional();
  const isGlass = themeContext?.isGlass ?? false;

  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Register step and get index
  const stepIndex = useRef<number | null>(null);

  useEffect(() => {
    const index = registerStep(id, animation);
    stepIndex.current = index;

    return () => {
      if (stepIndex.current !== null) {
        unregisterStep(stepIndex.current);
      }
    };
  }, [id, animation, registerStep, unregisterStep]);

  // Determine if this step is active
  const isActive = stepIndex.current === currentStep;
  const isVisible = stepIndex.current !== null && Math.abs(stepIndex.current - currentStep) <= 1;

  // Animate step transitions
  useEffect(() => {
    if (stepIndex.current === null) return;

    const effectiveAnimation = reducedMotion ? 'none' : animation;
    const duration = reducedMotion ? 0 : animations.duration.normal;
    const springConfig = animations.spring.snappy;

    if (isActive) {
      // Entering animation
      const animations_list: Animated.CompositeAnimation[] = [];

      // Always animate opacity
      animations_list.push(
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        })
      );

      // Animation-specific entrance
      switch (effectiveAnimation) {
        case 'slide': {
          const fromX = direction === 'forward' ? SCREEN_WIDTH * 0.3 : -SCREEN_WIDTH * 0.3;
          translateX.setValue(fromX);
          animations_list.push(
            Animated.spring(translateX, {
              toValue: 0,
              ...springConfig,
              useNativeDriver: true,
            })
          );
          break;
        }
        case 'scale':
          scale.setValue(0.9);
          animations_list.push(
            Animated.spring(scale, {
              toValue: 1,
              ...springConfig,
              useNativeDriver: true,
            })
          );
          break;
        case 'fade':
        case 'none':
        default:
          translateX.setValue(0);
          scale.setValue(1);
          break;
      }

      Animated.parallel(animations_list).start();
    } else {
      // Exiting animation
      const toX =
        stepIndex.current < currentStep
          ? -SCREEN_WIDTH * 0.3
          : SCREEN_WIDTH * 0.3;

      const animations_list: Animated.CompositeAnimation[] = [
        Animated.timing(opacity, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ];

      if (effectiveAnimation === 'slide') {
        animations_list.push(
          Animated.timing(translateX, {
            toValue: toX,
            duration,
            useNativeDriver: true,
          })
        );
      } else if (effectiveAnimation === 'scale') {
        animations_list.push(
          Animated.timing(scale, {
            toValue: 0.9,
            duration,
            useNativeDriver: true,
          })
        );
      }

      Animated.parallel(animations_list).start();
    }
  }, [isActive, currentStep, direction, animation, reducedMotion, opacity, translateX, scale]);

  // Don't render if step not registered yet or too far from current
  if (stepIndex.current === null || !isVisible) {
    return null;
  }

  const animatedStyle = {
    opacity,
    transform: [{ translateX }, { scale }] as Animated.WithAnimatedValue<ViewStyle>['transform'],
  };

  // Glass mode rendering - wrap content in GlassSurface for hero effect
  if (isGlass) {
    return (
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          !isActive && styles.hidden,
          style,
        ]}
        pointerEvents={isActive ? 'auto' : 'none'}
        accessibilityElementsHidden={!isActive}
        importantForAccessibility={isActive ? 'yes' : 'no-hide-descendants'}
      >
        <GlassSurface
          intensity={20}
          borderRadius={radius.xl}
          shadow="lg"
          bordered
          style={styles.glassContent as ViewStyle}
        >
          {children}
        </GlassSurface>
      </Animated.View>
    );
  }

  // Default non-glass rendering
  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        !isActive && styles.hidden,
        style,
      ]}
      pointerEvents={isActive ? 'auto' : 'none'}
      accessibilityElementsHidden={!isActive}
      importantForAccessibility={isActive ? 'yes' : 'no-hide-descendants'}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: spacing[4],
  },
  hidden: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Glass mode styles
  glassContent: {
    flex: 1,
    padding: spacing[6],
    marginVertical: spacing[4],
  },
});
