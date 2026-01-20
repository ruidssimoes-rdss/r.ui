/**
 * r/ui OnboardingSkipButton
 * Skip button to complete onboarding early
 */

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useOnboarding } from './OnboardingContext';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import type { OnboardingSkipButtonProps } from './types';

/**
 * OnboardingSkipButton - Skips to end of onboarding
 *
 * @example
 * ```tsx
 * // Basic usage (hidden on last step by default)
 * <Onboarding.SkipButton />
 *
 * // Custom label
 * <Onboarding.SkipButton>Skip intro</Onboarding.SkipButton>
 *
 * // Always visible
 * <Onboarding.SkipButton hideOnLast={false}>Skip</Onboarding.SkipButton>
 * ```
 */
export function OnboardingSkipButton({
  children,
  hideOnLast = true,
  variant = 'ghost',
  style,
  textStyle,
}: OnboardingSkipButtonProps) {
  const { skip, isLastStep } = useOnboarding();

  // Hide on last step if configured
  if (hideOnLast && isLastStep) {
    return null;
  }

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
      onPress={skip}
      style={({ pressed }) => getContainerStyle(pressed)}
      accessibilityRole="button"
      accessibilityLabel="Skip onboarding"
    >
      {children ? (
        typeof children === 'string' ? (
          <Text style={getTextStyle()}>{children}</Text>
        ) : (
          children
        )
      ) : (
        <Text style={getTextStyle()}>Skip</Text>
      )}
    </Pressable>
  );
}

// Variant styles
const VARIANT_STYLES = {
  solid: {
    container: {
      backgroundColor: colors.bg.surface,
    },
    text: {
      color: colors.text.primary,
    },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border.default,
    },
    text: {
      color: colors.text.secondary,
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
    },
    text: {
      color: colors.text.muted,
    },
  },
} as const;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.md,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.7,
  },
});
