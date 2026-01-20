/**
 * r/ui OnboardingImage
 * Image component with parallax and animation support
 */

import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import { useOnboarding } from './OnboardingContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { animations } from '../../tokens/animations';
import { spacing } from '../../tokens/spacing';
import type { OnboardingImageProps } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * OnboardingImage - Image component with optional parallax effect
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Onboarding.Image source={require('./welcome.png')} />
 *
 * // With parallax effect
 * <Onboarding.Image
 *   source={require('./features.png')}
 *   parallax={0.3}
 *   animation="zoom"
 * />
 * ```
 */
export function OnboardingImage({
  source,
  parallax = 0,
  animation = 'fade',
  resizeMode = 'contain',
  style,
}: OnboardingImageProps) {
  const { gestureTranslation, currentStep, direction } = useOnboarding();
  const reducedMotion = useReducedMotion();

  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Animate on mount and step change
  useEffect(() => {
    const effectiveAnimation = reducedMotion ? 'none' : animation;
    const duration = reducedMotion ? 0 : animations.duration.normal;
    const springConfig = animations.spring.gentle;

    // Reset values before animating
    opacity.setValue(0);

    const animationList: Animated.CompositeAnimation[] = [];

    // Always fade in
    animationList.push(
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    );

    switch (effectiveAnimation) {
      case 'zoom':
        scale.setValue(0.85);
        animationList.push(
          Animated.spring(scale, {
            toValue: 1,
            ...springConfig,
            useNativeDriver: true,
          })
        );
        break;

      case 'slide':
        translateY.setValue(direction === 'forward' ? 30 : -30);
        animationList.push(
          Animated.spring(translateY, {
            toValue: 0,
            ...springConfig,
            useNativeDriver: true,
          })
        );
        break;

      case 'fade':
      case 'none':
      default:
        scale.setValue(1);
        translateY.setValue(0);
        break;
    }

    Animated.parallel(animationList).start();
  }, [currentStep, animation, reducedMotion, direction, opacity, scale, translateY]);

  // Calculate parallax translation from gesture
  const effectiveParallax = reducedMotion ? 0 : parallax;
  const parallaxTranslate = gestureTranslation.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: [
      SCREEN_WIDTH * effectiveParallax,
      0,
      -SCREEN_WIDTH * effectiveParallax,
    ],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageWrapper,
          {
            opacity,
            transform: [
              { translateX: effectiveParallax > 0 ? parallaxTranslate : 0 },
              { translateY },
              { scale },
            ],
          },
        ]}
      >
        <Image
          source={source}
          style={[styles.image, style]}
          resizeMode={resizeMode}
          accessibilityRole="image"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxHeight: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: spacing[6],
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
