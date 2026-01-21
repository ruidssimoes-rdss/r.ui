import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { PaginationPreviousProps, PaginationNextProps } from './PaginationContext';
import { TOUCH_TARGET } from '../../utils/platform';

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  const isLeft = direction === 'left';
  return (
    <View style={styles.chevronIcon}>
      <View style={[styles.chevronLine, isLeft ? styles.chevronLeft1 : styles.chevronRight1]} />
      <View style={[styles.chevronLine, isLeft ? styles.chevronLeft2 : styles.chevronRight2]} />
    </View>
  );
}

/**
 * PaginationPrevious - Navigate to the previous page.
 */
export function PaginationPrevious({ onPress, disabled = false, label, style }: PaginationPreviousProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.navButton,
        disabled && styles.navButtonDisabled,
        pressed && !disabled && styles.navButtonPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label || 'Previous page'}
      accessibilityState={{ disabled }}
    >
      <ChevronIcon direction="left" />
      {label && <Text style={[styles.navButtonText, disabled && styles.navButtonTextDisabled]}>{label}</Text>}
    </Pressable>
  );
}

/**
 * PaginationNext - Navigate to the next page.
 */
export function PaginationNext({ onPress, disabled = false, label, style }: PaginationNextProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.navButton,
        disabled && styles.navButtonDisabled,
        pressed && !disabled && styles.navButtonPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label || 'Next page'}
      accessibilityState={{ disabled }}
    >
      {label && <Text style={[styles.navButtonText, disabled && styles.navButtonTextDisabled]}>{label}</Text>}
      <ChevronIcon direction="right" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TOUCH_TARGET, // Platform-aware: 44pt iOS, 48dp Android, 36px Web
    paddingHorizontal: spacing[2],
    borderRadius: radius.md,
    gap: spacing[1],
  },
  navButtonDisabled: { opacity: 0.5 },
  navButtonPressed: { backgroundColor: colors.bg.elevated },
  navButtonText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
  },
  navButtonTextDisabled: { color: colors.text.muted },
  chevronIcon: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  chevronLine: {
    position: 'absolute',
    width: 7,
    height: 1.5,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
  },
  chevronLeft1: { transform: [{ rotate: '-45deg' }, { translateY: -2.5 }] },
  chevronLeft2: { transform: [{ rotate: '45deg' }, { translateY: 2.5 }] },
  chevronRight1: { transform: [{ rotate: '45deg' }, { translateY: -2.5 }] },
  chevronRight2: { transform: [{ rotate: '-45deg' }, { translateY: 2.5 }] },
});
