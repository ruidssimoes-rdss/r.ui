/**
 * r/ui Onboarding Component Types
 * Premium, production-ready onboarding flow component
 */

import type { Animated, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType } from 'react-native';

// ============================================================================
// Animation Types
// ============================================================================

/** Animation styles for step transitions */
export type StepAnimation = 'fade' | 'slide' | 'scale' | 'none';

/** Animation styles for image elements */
export type ImageAnimation = 'zoom' | 'fade' | 'slide' | 'none';

/** Animation styles for text elements */
export type TextAnimation = 'slideUp' | 'slideDown' | 'fadeIn' | 'none';

/** Navigation direction for animation coordination */
export type NavigationDirection = 'forward' | 'backward';

// ============================================================================
// Component Props
// ============================================================================

/** Main Onboarding container props */
export interface OnboardingProps {
  /** Onboarding content (Steps, Dots, Actions, etc.) */
  children: React.ReactNode;

  // Callbacks
  /** Called when onboarding is completed (after last step) */
  onComplete: () => void;
  /** Called when step changes */
  onStepChange?: (step: number, stepId?: string) => void;
  /** Called when skip button is pressed */
  onSkip?: () => void;

  // Configuration
  /** Initial step index (default: 0) */
  initialStep?: number;
  /** Allow cycling back to start from last step (default: false) */
  loop?: boolean;
  /** Enable swipe gestures for navigation (default: true) */
  swipeEnabled?: boolean;
  /** Enable arrow key navigation on web (default: true) */
  keyboardEnabled?: boolean;

  // Styling
  /** Additional styles for root container */
  style?: ViewStyle;
  /** Additional styles for step content container */
  containerStyle?: ViewStyle;
}

/** Individual onboarding step props */
export interface OnboardingStepProps {
  /** Step content (Image, Title, Description, etc.) */
  children: React.ReactNode;
  /** Optional identifier for analytics/tracking */
  id?: string;
  /** Animation style for step transition (default: 'slide') */
  animation?: StepAnimation;
  /** Additional styles */
  style?: ViewStyle;
}

/** Image component props */
export interface OnboardingImageProps {
  /** Image source (local require or remote URI) */
  source: ImageSourcePropType;
  /** Parallax effect intensity (0-1, default: 0) */
  parallax?: number;
  /** Animation style for image appearance (default: 'fade') */
  animation?: ImageAnimation;
  /** Image resize mode (default: 'contain') */
  resizeMode?: 'cover' | 'contain' | 'center';
  /** Additional styles */
  style?: ImageStyle;
}

/** Title component props */
export interface OnboardingTitleProps {
  /** Title text content */
  children: React.ReactNode;
  /** Animation style for title appearance (default: 'slideUp') */
  animation?: TextAnimation;
  /** Animation delay in milliseconds (default: 50) */
  delay?: number;
  /** Additional styles */
  style?: TextStyle;
}

/** Description component props */
export interface OnboardingDescriptionProps {
  /** Description text content */
  children: React.ReactNode;
  /** Animation style for description appearance (default: 'fadeIn') */
  animation?: TextAnimation;
  /** Animation delay in milliseconds (default: 100) */
  delay?: number;
  /** Additional styles */
  style?: TextStyle;
}

/** Dots indicator props */
export interface OnboardingDotsProps {
  /** Dot style variant (default: 'dots') */
  variant?: 'dots' | 'pills' | 'numbers';
  /** Active dot color (default: accent blue) */
  activeColor?: string;
  /** Inactive dot color (default: border default) */
  inactiveColor?: string;
  /** Dot size (default: 'md') */
  size?: 'sm' | 'md' | 'lg';
  /** Additional styles */
  style?: ViewStyle;
}

/** Progress bar indicator props */
export interface OnboardingProgressProps {
  /** Progress bar style variant (default: 'bar') */
  variant?: 'bar' | 'segmented';
  /** Progress fill color (default: accent blue) */
  color?: string;
  /** Track background color (default: border default) */
  trackColor?: string;
  /** Bar height in pixels (default: 4) */
  height?: number;
  /** Enable smooth animated transitions (default: true) */
  animated?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

/** Actions container props */
export interface OnboardingActionsProps {
  /** Action buttons (Back, Skip, Next) */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

/** Base button props shared by all onboarding buttons */
interface OnboardingBaseButtonProps {
  /** Custom button content */
  children?: React.ReactNode;
  /** Button style variant (default: varies by button type) */
  variant?: 'solid' | 'outline' | 'ghost';
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

/** Next button props */
export interface OnboardingNextButtonProps extends OnboardingBaseButtonProps {
  /** Label for non-final steps (default: 'Next') */
  labelNext?: string;
  /** Label for final step (default: 'Get Started') */
  labelLast?: string;
}

/** Back button props */
export interface OnboardingBackButtonProps extends OnboardingBaseButtonProps {
  /** Hide when on first step (default: true) */
  hideOnFirst?: boolean;
}

/** Skip button props */
export interface OnboardingSkipButtonProps extends OnboardingBaseButtonProps {
  /** Hide when on last step (default: true) */
  hideOnLast?: boolean;
}

// ============================================================================
// Context Types
// ============================================================================

/** Step registration info stored in context */
export interface StepInfo {
  /** Step index in registration order */
  index: number;
  /** Optional step identifier */
  id?: string;
  /** Animation style for this step */
  animation: StepAnimation;
}

/** Onboarding context value provided to child components */
export interface OnboardingContextValue {
  // State
  /** Current step index (0-based) */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Whether current step is the first step */
  isFirstStep: boolean;
  /** Whether current step is the last step */
  isLastStep: boolean;
  /** Registered step information */
  steps: StepInfo[];

  // Navigation
  /** Navigate to next step (or complete if on last) */
  goToNext: () => void;
  /** Navigate to previous step */
  goToPrevious: () => void;
  /** Navigate to specific step by index */
  goToStep: (index: number) => void;
  /** Skip to end and call onComplete */
  skip: () => void;
  /** Mark onboarding as complete */
  complete: () => void;

  // Animation state
  /** Current navigation direction for coordinating animations */
  direction: NavigationDirection;
  /** Shared animation progress value (0-1) for coordinated animations */
  animationProgress: Animated.Value;
  /** Gesture translation value for parallax effects */
  gestureTranslation: Animated.Value;

  // Configuration
  /** Whether swipe gestures are enabled */
  swipeEnabled: boolean;

  // Step registration (internal use)
  /** Register a step component */
  registerStep: (id?: string, animation?: StepAnimation) => number;
  /** Unregister a step component */
  unregisterStep: (index: number) => void;
}
