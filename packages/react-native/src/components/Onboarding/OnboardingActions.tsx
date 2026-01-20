/**
 * r/ui OnboardingActions
 * Container for onboarding action buttons
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../tokens/spacing';
import type { OnboardingActionsProps } from './types';

/**
 * OnboardingActions - Container for navigation buttons
 *
 * @example
 * ```tsx
 * <Onboarding.Actions>
 *   <Onboarding.SkipButton />
 *   <Onboarding.NextButton />
 * </Onboarding.Actions>
 *
 * // With back button
 * <Onboarding.Actions>
 *   <Onboarding.BackButton />
 *   <Onboarding.SkipButton />
 *   <Onboarding.NextButton />
 * </Onboarding.Actions>
 * ```
 */
export function OnboardingActions({
  children,
  style,
}: OnboardingActionsProps) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    gap: spacing[3],
  },
});
