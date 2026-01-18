import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { PaginationLinkProps } from './PaginationContext';

/**
 * PaginationLink - Clickable page number button.
 */
export function PaginationLink({
  page,
  isActive = false,
  onPress,
  disabled = false,
  style,
  textStyle,
}: PaginationLinkProps) {
  return (
    <Pressable
      onPress={() => onPress?.(page)}
      disabled={disabled || isActive}
      style={({ pressed }) => [
        styles.link,
        isActive && styles.linkActive,
        disabled && styles.linkDisabled,
        pressed && !isActive && styles.linkPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive, disabled }}
      accessibilityLabel={`Page ${page}`}
    >
      <Text
        style={[
          styles.linkText,
          isActive && styles.linkTextActive,
          disabled && styles.linkTextDisabled,
          textStyle,
        ]}
      >
        {page}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    minWidth: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingHorizontal: spacing[2],
  },
  linkActive: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  linkDisabled: {
    opacity: 0.5,
  },
  linkPressed: {
    backgroundColor: colors.bg.elevated,
  },
  linkText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
  },
  linkTextActive: {
    color: colors.white,
  },
  linkTextDisabled: {
    color: colors.text.muted,
  },
});
