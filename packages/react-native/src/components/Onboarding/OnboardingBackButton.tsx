/**
 * r/ui OnboardingBackButton
 * Back button for onboarding navigation
 */

import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useOnboarding } from './OnboardingContext';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import type { OnboardingBackButtonProps } from './types';

// Arrow left icon
function ArrowLeftIcon({ color = colors.text.secondary }: { color?: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M19 12H5" />
      <Path d="m12 19-7-7 7-7" />
    </Svg>
  );
}

/**
 * OnboardingBackButton - Navigates to previous step
 *
 * @example
 * ```tsx
 * // Basic usage (hidden on first step by default)
 * <Onboarding.BackButton />
 *
 * // Custom label
 * <Onboarding.BackButton>Previous</Onboarding.BackButton>
 *
 * // Always visible
 * <Onboarding.BackButton hideOnFirst={false}>Back</Onboarding.BackButton>
 * ```
 */
export function OnboardingBackButton({
  children,
  hideOnFirst = true,
  variant = 'ghost',
  style,
  textStyle,
}: OnboardingBackButtonProps) {
  const { goToPrevious, isFirstStep } = useOnboarding();

  // Hide on first step if configured
  if (hideOnFirst && isFirstStep) {
    // Return empty view to maintain layout spacing
    return <View style={styles.placeholder} />;
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

  const iconColor = variant === 'solid' ? colors.text.inverse : colors.text.secondary;

  return (
    <Pressable
      onPress={goToPrevious}
      style={({ pressed }) => getContainerStyle(pressed)}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <View style={styles.content}>
        <ArrowLeftIcon color={iconColor} />
        {children ? (
          typeof children === 'string' ? (
            <Text style={getTextStyle()}>{children}</Text>
          ) : (
            children
          )
        ) : (
          <Text style={getTextStyle()}>Back</Text>
        )}
      </View>
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
      color: colors.text.secondary,
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.7,
  },
  placeholder: {
    minWidth: 80,
  },
});
