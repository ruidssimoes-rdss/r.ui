/**
 * r/ui Onboarding
 * Premium onboarding flow component with gesture support
 */

import React, { useRef, useEffect, Children, isValidElement } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  Platform,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { OnboardingProvider, useOnboarding } from './OnboardingContext';
import { OnboardingStep } from './OnboardingStep';
import { OnboardingImage } from './OnboardingImage';
import { OnboardingTitle } from './OnboardingTitle';
import { OnboardingDescription } from './OnboardingDescription';
import { OnboardingDots } from './OnboardingDots';
import { OnboardingProgress } from './OnboardingProgress';
import { OnboardingActions } from './OnboardingActions';
import { OnboardingNextButton } from './OnboardingNextButton';
import { OnboardingBackButton } from './OnboardingBackButton';
import { OnboardingSkipButton } from './OnboardingSkipButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { colors } from '../../tokens/colors';
import { animations } from '../../tokens/animations';
import type { OnboardingProps } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Gesture thresholds
const SWIPE_THRESHOLD = 50; // Minimum distance to trigger swipe
const VELOCITY_THRESHOLD = 0.3; // Minimum velocity to trigger swipe

/**
 * Onboarding - Premium onboarding flow component
 *
 * A compound component for building beautiful, animated onboarding experiences.
 * Supports swipe gestures, keyboard navigation (web), and multiple animation styles.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Onboarding onComplete={() => navigation.navigate('Home')}>
 *   <Onboarding.Step>
 *     <Onboarding.Image source={require('./welcome.png')} />
 *     <Onboarding.Title>Welcome</Onboarding.Title>
 *     <Onboarding.Description>Get started with our app</Onboarding.Description>
 *   </Onboarding.Step>
 *
 *   <Onboarding.Step>
 *     <Onboarding.Image source={require('./features.png')} />
 *     <Onboarding.Title>Features</Onboarding.Title>
 *     <Onboarding.Description>Discover what you can do</Onboarding.Description>
 *   </Onboarding.Step>
 *
 *   <Onboarding.Dots />
 *   <Onboarding.Actions>
 *     <Onboarding.SkipButton />
 *     <Onboarding.NextButton />
 *   </Onboarding.Actions>
 * </Onboarding>
 * ```
 */
function OnboardingRoot({
  children,
  onComplete,
  onStepChange,
  onSkip,
  initialStep = 0,
  loop = false,
  swipeEnabled = true,
  keyboardEnabled = true,
  style,
  containerStyle,
}: OnboardingProps) {
  return (
    <OnboardingProvider
      initialStep={initialStep}
      loop={loop}
      swipeEnabled={swipeEnabled}
      onComplete={onComplete}
      onStepChange={onStepChange}
      onSkip={onSkip}
    >
      <OnboardingContent
        keyboardEnabled={keyboardEnabled}
        style={style}
        containerStyle={containerStyle}
      >
        {children}
      </OnboardingContent>
    </OnboardingProvider>
  );
}

// ============================================================================
// Internal Content Component with Gesture Handling
// ============================================================================

interface OnboardingContentProps {
  children: React.ReactNode;
  keyboardEnabled: boolean;
  style?: OnboardingProps['style'];
  containerStyle?: OnboardingProps['containerStyle'];
}

function OnboardingContent({
  children,
  keyboardEnabled,
  style,
  containerStyle,
}: OnboardingContentProps) {
  const {
    goToNext,
    goToPrevious,
    isFirstStep,
    isLastStep,
    swipeEnabled,
    gestureTranslation,
    totalSteps,
  } = useOnboarding();
  const reducedMotion = useReducedMotion();

  // Track if gesture was handled to prevent navigation
  const gestureHandled = useRef(false);

  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        // Only respond to horizontal movements if swipe is enabled
        if (!swipeEnabled) return false;

        const { dx, dy } = gestureState;
        // Require horizontal movement to be greater than vertical
        return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
      },
      onPanResponderGrant: () => {
        gestureHandled.current = false;
      },
      onPanResponderMove: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const { dx } = gestureState;

        // Apply resistance at edges
        let translation = dx;
        if ((isFirstStep && dx > 0) || (isLastStep && dx < 0)) {
          translation = dx * 0.3; // Resistance factor
        }

        gestureTranslation.setValue(translation);
      },
      onPanResponderRelease: (
        _: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const { dx, vx } = gestureState;

        // Check if swipe exceeds threshold
        const shouldNavigate =
          Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(vx) > VELOCITY_THRESHOLD;

        if (shouldNavigate) {
          if (dx > SWIPE_THRESHOLD || vx > VELOCITY_THRESHOLD) {
            // Swipe right - go to previous
            if (!isFirstStep) {
              gestureHandled.current = true;
              goToPrevious();
            }
          } else if (dx < -SWIPE_THRESHOLD || vx < -VELOCITY_THRESHOLD) {
            // Swipe left - go to next
            if (!isLastStep) {
              gestureHandled.current = true;
              goToNext();
            }
          }
        }

        // Reset gesture translation with spring animation
        if (!reducedMotion) {
          Animated.spring(gestureTranslation, {
            toValue: 0,
            ...animations.spring.snappy,
            useNativeDriver: true,
          }).start();
        } else {
          gestureTranslation.setValue(0);
        }
      },
      onPanResponderTerminate: () => {
        // Reset on termination
        if (!reducedMotion) {
          Animated.spring(gestureTranslation, {
            toValue: 0,
            ...animations.spring.snappy,
            useNativeDriver: true,
          }).start();
        } else {
          gestureTranslation.setValue(0);
        }
      },
    })
  ).current;

  // Keyboard navigation for web
  useEffect(() => {
    if (Platform.OS !== 'web' || !keyboardEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardEnabled, goToNext, goToPrevious]);

  // Separate steps from other children (dots, progress, actions)
  const { steps, otherChildren } = React.useMemo(() => {
    const stepComponents: React.ReactNode[] = [];
    const other: React.ReactNode[] = [];

    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === OnboardingStep) {
        stepComponents.push(child);
      } else {
        other.push(child);
      }
    });

    return { steps: stepComponents, otherChildren: other };
  }, [children]);

  return (
    <View
      style={[styles.root, style]}
      accessibilityRole="none"
      accessibilityLabel={`Onboarding: ${totalSteps} steps`}
    >
      {/* Step content area with gestures */}
      <View
        style={[styles.container, containerStyle]}
        {...panResponder.panHandlers}
      >
        {steps}
      </View>

      {/* Persistent UI (dots, progress, actions) */}
      {otherChildren}
    </View>
  );
}

// ============================================================================
// Compound Component Assembly
// ============================================================================

/**
 * Onboarding compound component with all sub-components attached.
 *
 * Available sub-components:
 * - `Onboarding.Step` - Individual step container
 * - `Onboarding.Image` - Image with optional parallax
 * - `Onboarding.Title` - Animated title text
 * - `Onboarding.Description` - Animated description text
 * - `Onboarding.Dots` - Step indicator dots
 * - `Onboarding.Progress` - Progress bar indicator
 * - `Onboarding.Actions` - Action buttons container
 * - `Onboarding.NextButton` - Next/Continue button
 * - `Onboarding.BackButton` - Back button
 * - `Onboarding.SkipButton` - Skip button
 */
export const Onboarding = Object.assign(OnboardingRoot, {
  Step: OnboardingStep,
  Image: OnboardingImage,
  Title: OnboardingTitle,
  Description: OnboardingDescription,
  Dots: OnboardingDots,
  Progress: OnboardingProgress,
  Actions: OnboardingActions,
  NextButton: OnboardingNextButton,
  BackButton: OnboardingBackButton,
  SkipButton: OnboardingSkipButton,
});

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base,
  },
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
});
