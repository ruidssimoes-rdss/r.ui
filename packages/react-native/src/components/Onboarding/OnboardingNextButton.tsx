/**
 * r/ui OnboardingNextButton
 * Next/Continue button for onboarding navigation
 */

import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useOnboarding } from './OnboardingContext';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import type { OnboardingNextButtonProps } from './types';

// Arrow right icon
function ArrowRightIcon({ color = colors.text.inverse }: { color?: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M5 12h14" />
      <Path d="m12 5 7 7-7 7" />
    </Svg>
  );
}

/**
 * OnboardingNextButton - Advances to next step or completes onboarding
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Onboarding.NextButton />
 *
 * // Custom labels
 * <Onboarding.NextButton
 *   labelNext="Continue"
 *   labelLast="Get Started"
 * />
 *
 * // Custom content
 * <Onboarding.NextButton>
 *   <Text>Let's Go!</Text>
 * </Onboarding.NextButton>
 * ```
 */
export function OnboardingNextButton({
  children,
  labelNext = 'Next',
  labelLast = 'Get Started',
  variant = 'solid',
  style,
  textStyle,
}: OnboardingNextButtonProps) {
  const { goToNext, isLastStep } = useOnboarding();

  const label = isLastStep ? labelLast : labelNext;

  const getContainerStyle = (pressed: boolean) => {
    const variantStyle = VARIANT_STYLES[variant];
    return [
      styles.container,
      variantStyle.container,
      pressed && styles.pressed,
      style,
    ];
  };

  const getTextStyle = () => {
    const variantStyle = VARIANT_STYLES[variant];
    return [styles.text, variantStyle.text, textStyle];
  };

  return (
    <Pressable
      onPress={goToNext}
      style={({ pressed }) => getContainerStyle(pressed)}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {children ? (
        children
      ) : (
        <View style={styles.content}>
          <Text style={getTextStyle()}>{label}</Text>
          {!isLastStep && (
            <ArrowRightIcon
              color={variant === 'solid' ? colors.text.inverse : colors.text.primary}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

// Variant styles
const VARIANT_STYLES = {
  solid: {
    container: {
      backgroundColor: colors.text.primary,
    },
    text: {
      color: colors.text.inverse,
    },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border.strong,
    },
    text: {
      color: colors.text.primary,
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
    },
    text: {
      color: colors.text.primary,
    },
  },
} as const;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    borderRadius: radius.md,
    minWidth: 120,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
