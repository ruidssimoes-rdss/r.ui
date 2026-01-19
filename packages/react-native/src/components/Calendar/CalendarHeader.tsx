import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useCalendar } from './CalendarContext';
import { MONTHS, addMonths } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface CalendarHeaderProps {
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function CalendarHeader({ style }: CalendarHeaderProps) {
  const { viewDate, setViewDate, disabled } = useCalendar();

  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();

  const goToPreviousMonth = () => {
    if (!disabled) {
      setViewDate(addMonths(viewDate, -1));
    }
  };

  const goToNextMonth = () => {
    if (!disabled) {
      setViewDate(addMonths(viewDate, 1));
    }
  };

  return (
    <View style={[styles.header, style]}>
      <Pressable
        onPress={goToPreviousMonth}
        disabled={disabled}
        style={({ pressed }) => [
          styles.navButton,
          pressed && styles.navButtonPressed,
          disabled && styles.navButtonDisabled,
        ]}
        accessibilityLabel="Previous month"
        accessibilityRole="button"
      >
        <ChevronLeft />
      </Pressable>

      <Text style={[styles.title, disabled && styles.titleDisabled]}>
        {MONTHS[month]} {year}
      </Text>

      <Pressable
        onPress={goToNextMonth}
        disabled={disabled}
        style={({ pressed }) => [
          styles.navButton,
          pressed && styles.navButtonPressed,
          disabled && styles.navButtonDisabled,
        ]}
        accessibilityLabel="Next month"
        accessibilityRole="button"
      >
        <ChevronRight />
      </Pressable>
    </View>
  );
}

// ============================================================================
// Icons
// ============================================================================

function ChevronLeft() {
  return (
    <View style={iconStyles.container}>
      <View style={[iconStyles.chevron, iconStyles.chevronLeft]} />
    </View>
  );
}

function ChevronRight() {
  return (
    <View style={iconStyles.container}>
      <View style={[iconStyles.chevron, iconStyles.chevronRight]} />
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[4],
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  navButtonPressed: {
    backgroundColor: colors.bg.elevated,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.text.primary,
  },
  titleDisabled: {
    color: colors.text.muted,
  },
});

const iconStyles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.text.secondary,
  },
  chevronLeft: {
    transform: [{ rotate: '-135deg' }, { translateX: 2 }],
  },
  chevronRight: {
    transform: [{ rotate: '45deg' }, { translateX: -2 }],
  },
});
