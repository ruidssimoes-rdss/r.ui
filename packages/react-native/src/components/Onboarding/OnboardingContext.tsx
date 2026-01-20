/**
 * r/ui Onboarding Context
 * Provides shared state and navigation for onboarding components
 */

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Animated } from 'react-native';
import type {
  OnboardingContextValue,
  StepInfo,
  StepAnimation,
  NavigationDirection,
} from './types';

// ============================================================================
// Context
// ============================================================================

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access onboarding context.
 * Must be used within an Onboarding component.
 *
 * @example
 * ```tsx
 * function CustomNavigation() {
 *   const { currentStep, totalSteps, goToNext, goToPrevious } = useOnboarding();
 *
 *   return (
 *     <View>
 *       <Text>Step {currentStep + 1} of {totalSteps}</Text>
 *       <Button onPress={goToPrevious}>Back</Button>
 *       <Button onPress={goToNext}>Next</Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useOnboarding(): OnboardingContextValue {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      'Onboarding components must be used within an Onboarding. ' +
        'Wrap your component in <Onboarding> to fix this error.'
    );
  }
  return context;
}

// ============================================================================
// Provider Props
// ============================================================================

interface OnboardingProviderProps {
  children: React.ReactNode;
  initialStep: number;
  loop: boolean;
  swipeEnabled: boolean;
  onComplete: () => void;
  onStepChange?: (step: number, stepId?: string) => void;
  onSkip?: () => void;
}

// ============================================================================
// Provider Component
// ============================================================================

export function OnboardingProvider({
  children,
  initialStep,
  loop,
  swipeEnabled,
  onComplete,
  onStepChange,
  onSkip,
}: OnboardingProviderProps) {
  // State
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState<NavigationDirection>('forward');
  const [steps, setSteps] = useState<StepInfo[]>([]);

  // Animation values
  const animationProgress = useRef(new Animated.Value(1)).current;
  const gestureTranslation = useRef(new Animated.Value(0)).current;

  // Step counter for registration order
  const stepCounter = useRef(0);

  // Derived state
  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  // Step registration
  const registerStep = useCallback((id?: string, animation: StepAnimation = 'slide'): number => {
    const index = stepCounter.current;
    stepCounter.current += 1;

    setSteps((prev) => {
      // Check if already registered (strict mode double-mount)
      if (prev.some((s) => s.index === index)) {
        return prev;
      }
      return [...prev, { index, id, animation }].sort((a, b) => a.index - b.index);
    });

    return index;
  }, []);

  const unregisterStep = useCallback((index: number) => {
    setSteps((prev) => prev.filter((s) => s.index !== index));
  }, []);

  // Navigation
  const goToStep = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSteps) {
        return;
      }

      const newDirection: NavigationDirection = index > currentStep ? 'forward' : 'backward';
      setDirection(newDirection);
      setCurrentStep(index);

      const stepInfo = steps[index];
      onStepChange?.(index, stepInfo?.id);
    },
    [currentStep, totalSteps, steps, onStepChange]
  );

  const goToNext = useCallback(() => {
    if (isLastStep) {
      if (loop) {
        goToStep(0);
      } else {
        onComplete();
      }
    } else {
      goToStep(currentStep + 1);
    }
  }, [currentStep, isLastStep, loop, goToStep, onComplete]);

  const goToPrevious = useCallback(() => {
    if (isFirstStep) {
      if (loop) {
        goToStep(totalSteps - 1);
      }
      // If not looping and on first step, do nothing
    } else {
      goToStep(currentStep - 1);
    }
  }, [currentStep, isFirstStep, loop, totalSteps, goToStep]);

  const skip = useCallback(() => {
    onSkip?.();
    onComplete();
  }, [onSkip, onComplete]);

  const complete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Context value
  const value = useMemo<OnboardingContextValue>(
    () => ({
      // State
      currentStep,
      totalSteps,
      isFirstStep,
      isLastStep,
      steps,

      // Navigation
      goToNext,
      goToPrevious,
      goToStep,
      skip,
      complete,

      // Animation state
      direction,
      animationProgress,
      gestureTranslation,

      // Configuration
      swipeEnabled,

      // Step registration
      registerStep,
      unregisterStep,
    }),
    [
      currentStep,
      totalSteps,
      isFirstStep,
      isLastStep,
      steps,
      goToNext,
      goToPrevious,
      goToStep,
      skip,
      complete,
      direction,
      animationProgress,
      gestureTranslation,
      swipeEnabled,
      registerStep,
      unregisterStep,
    ]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}
