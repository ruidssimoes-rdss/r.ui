import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useCalendar } from './CalendarContext';
import {
  isSameDay,
  isToday,
  isDateDisabled,
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  isDateInList,
  DateRange,
} from './utils';
import { TOUCH_TARGET } from '../../utils/platform';

// ============================================================================
// Types
// ============================================================================

export interface CalendarDayProps {
  /** The date for this day cell (null for empty cells) */
  date: Date | null;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function CalendarDay({ date, style }: CalendarDayProps) {
  const {
    mode,
    value,
    onSelect,
    minDate,
    maxDate,
    disabledDates,
    disabled,
  } = useCalendar();

  // Empty cell
  if (!date) {
    return <Pressable style={[styles.day, style]} disabled />;
  }

  const isDisabled = disabled || isDateDisabled(date, minDate, maxDate, disabledDates);
  const today = isToday(date);

  // Determine selection state based on mode
  let isSelected = false;
  let isInRange = false;
  let isStart = false;
  let isEnd = false;

  if (mode === 'single' && value instanceof Date) {
    isSelected = isSameDay(date, value);
  } else if (mode === 'range' && value && typeof value === 'object' && 'start' in value) {
    const range = value as DateRange;
    isStart = isRangeStart(date, range);
    isEnd = isRangeEnd(date, range);
    isSelected = isStart || isEnd;
    isInRange = range.start && range.end ? isDateInRange(date, range) && !isStart && !isEnd : false;
  } else if (mode === 'multiple' && Array.isArray(value)) {
    isSelected = isDateInList(date, value);
  }

  const handlePress = () => {
    if (!isDisabled) {
      onSelect(date);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.day,
        today && styles.dayToday,
        isSelected && styles.daySelected,
        isInRange && styles.dayInRange,
        isStart && styles.dayRangeStart,
        isEnd && styles.dayRangeEnd,
        pressed && !isDisabled && styles.dayPressed,
        isDisabled && styles.dayDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${date.toDateString()}${isSelected ? ', selected' : ''}${today ? ', today' : ''}`}
      accessibilityState={{
        selected: isSelected,
        disabled: isDisabled,
      }}
    >
      <Text
        style={[
          styles.dayText,
          today && styles.dayTextToday,
          isSelected && styles.dayTextSelected,
          isInRange && styles.dayTextInRange,
          isDisabled && styles.dayTextDisabled,
        ]}
      >
        {date.getDate()}
      </Text>
    </Pressable>
  );
}

// ============================================================================
// Styles
// ============================================================================

const DAY_SIZE = `${100 / 7}%`;

const styles = StyleSheet.create({
  day: {
    width: DAY_SIZE,
    aspectRatio: 1,
    minHeight: Platform.select({ ios: 44, android: 48, default: 36 }),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  dayToday: {
    borderWidth: 1,
    borderColor: colors.accent.blue.DEFAULT,
  },
  daySelected: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  dayInRange: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderRadius: 0,
  },
  dayRangeStart: {
    borderTopLeftRadius: radius.full,
    borderBottomLeftRadius: radius.full,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  dayRangeEnd: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: radius.full,
    borderBottomRightRadius: radius.full,
  },
  dayPressed: {
    backgroundColor: colors.bg.elevated,
  },
  dayDisabled: {
    opacity: 0.4,
  },
  dayText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    color: colors.text.primary,
  },
  dayTextToday: {
    color: colors.accent.blue.DEFAULT,
    fontWeight: fontWeights.semibold,
  },
  dayTextSelected: {
    color: 'white',
    fontWeight: fontWeights.semibold,
  },
  dayTextInRange: {
    color: colors.accent.blue.DEFAULT,
  },
  dayTextDisabled: {
    color: colors.text.muted,
  },
});
