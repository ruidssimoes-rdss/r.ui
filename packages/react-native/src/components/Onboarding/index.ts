/**
 * r/ui Onboarding Component
 * Premium onboarding flow for React Native apps
 */

// Main compound component
export { Onboarding } from './Onboarding';

// Context hook for custom implementations
export { useOnboarding } from './OnboardingContext';

// Individual components (for advanced usage)
export { OnboardingStep } from './OnboardingStep';
export { OnboardingImage } from './OnboardingImage';
export { OnboardingTitle } from './OnboardingTitle';
export { OnboardingDescription } from './OnboardingDescription';
export { OnboardingDots } from './OnboardingDots';
export { OnboardingProgress } from './OnboardingProgress';
export { OnboardingActions } from './OnboardingActions';
export { OnboardingNextButton } from './OnboardingNextButton';
export { OnboardingBackButton } from './OnboardingBackButton';
export { OnboardingSkipButton } from './OnboardingSkipButton';

// Types
export type {
  // Main props
  OnboardingProps,
  OnboardingStepProps,
  OnboardingImageProps,
  OnboardingTitleProps,
  OnboardingDescriptionProps,
  OnboardingDotsProps,
  OnboardingProgressProps,
  OnboardingActionsProps,
  OnboardingNextButtonProps,
  OnboardingBackButtonProps,
  OnboardingSkipButtonProps,
  // Animation types
  StepAnimation,
  ImageAnimation,
  TextAnimation,
  NavigationDirection,
  // Context types
  OnboardingContextValue,
  StepInfo,
} from './types';
