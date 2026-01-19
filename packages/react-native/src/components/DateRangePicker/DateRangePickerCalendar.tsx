import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useDateRangePicker } from './DateRangePickerContext';
import {
  DAYS_SHORT,
  MONTHS_SHORT,
  getCalendarDays,
  isToday,
  isDateDisabled,
  getYearRange,
  setMonth,
  setYear,
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  compareDates,
  isSameDay,
} from './utils';

export interface DateRangePickerCalendarProps {
  /** Additional styles */
  style?: ViewStyle;
}

export function DateRangePickerCalendar({ style }: DateRangePickerCalendarProps) {
  const {
    viewDate,
    setViewDate,
    value,
    onValueChange,
    view,
    setView,
    selectionMode,
    setSelectionMode,
    hoveredDate,
    setHoveredDate,
    minDate,
    maxDate,
    disabledDates,
  } = useDateRangePicker();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Calculate preview range when hovering
  const getPreviewRange = () => {
    if (!hoveredDate) return { start: value.start, end: value.end };

    if (selectionMode === 'start') {
      // When selecting start, just show the hovered date
      return { start: hoveredDate, end: null };
    } else {
      // When selecting end, show range from start to hovered
      if (!value.start) return { start: hoveredDate, end: null };

      // Ensure start <= end
      if (compareDates(hoveredDate, value.start) < 0) {
        return { start: hoveredDate, end: value.start };
      }
      return { start: value.start, end: hoveredDate };
    }
  };

  const previewRange = getPreviewRange();

  const handleDatePress = (date: Date) => {
    if (selectionMode === 'start') {
      // Selecting start date
      onValueChange({ start: date, end: null });
      setSelectionMode('end');
    } else {
      // Selecting end date
      if (value.start) {
        // Ensure start <= end
        if (compareDates(date, value.start) < 0) {
          onValueChange({ start: date, end: value.start });
        } else {
          onValueChange({ start: value.start, end: date });
        }
      } else {
        onValueChange({ start: date, end: null });
      }
      setSelectionMode('start');
    }
  };

  // Month Picker View
  if (view === 'months') {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.grid}>
          {MONTHS_SHORT.map((monthName, index) => {
            const isSelected = month === index;

            return (
              <Pressable
                key={monthName}
                onPress={() => {
                  setViewDate(setMonth(viewDate, index));
                  setView('calendar');
                }}
                style={({ pressed }) => [
                  styles.monthYearCell,
                  isSelected && styles.cellSelected,
                  pressed && !isSelected && styles.cellPressed,
                ]}
              >
                <Text
                  style={[
                    styles.monthYearText,
                    isSelected && styles.textSelected,
                  ]}
                >
                  {monthName}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  // Year Picker View
  if (view === 'years') {
    const years = getYearRange(year, 10);

    return (
      <ScrollView style={[styles.scrollContainer, style]}>
        <View style={styles.grid}>
          {years.map((y) => {
            const isSelected = year === y;

            return (
              <Pressable
                key={y}
                onPress={() => {
                  setViewDate(setYear(viewDate, y));
                  setView('months');
                }}
                style={({ pressed }) => [
                  styles.monthYearCell,
                  isSelected && styles.cellSelected,
                  pressed && !isSelected && styles.cellPressed,
                ]}
              >
                <Text
                  style={[
                    styles.monthYearText,
                    isSelected && styles.textSelected,
                  ]}
                >
                  {y}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  // Calendar View
  const days = getCalendarDays(year, month);

  return (
    <View style={[styles.container, style]}>
      {/* Selection mode indicator */}
      <View style={styles.selectionIndicator}>
        <Text style={styles.selectionText}>
          {selectionMode === 'start'
            ? 'Select start date'
            : 'Select end date'}
        </Text>
      </View>

      {/* Weekday Headers */}
      <View style={styles.weekdayRow}>
        {DAYS_SHORT.map((day) => (
          <View key={day} style={styles.weekdayCell}>
            <Text style={styles.weekdayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Days Grid */}
      <View style={styles.daysGrid}>
        {days.map((date, index) => {
          if (!date) {
            // Empty cell
            return <View key={`empty-${index}`} style={styles.dayCell} />;
          }

          const isStart = isRangeStart(date, previewRange.start);
          const isEnd = isRangeEnd(date, previewRange.end);
          const isInRange =
            previewRange.start &&
            previewRange.end &&
            isDateInRange(date, previewRange.start, previewRange.end);
          const isTodayDate = isToday(date);
          const isDisabled = isDateDisabled(date, minDate, maxDate, disabledDates);
          const isSelected = isStart || isEnd;

          // Check if this is the first day of the week (for left rounding)
          const dayOfWeek = date.getDay();
          const isFirstOfWeek = dayOfWeek === 0;
          const isLastOfWeek = dayOfWeek === 6;

          // Check if this is the first or last day of the month
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const isFirstOfMonth = date.getDate() === 1;
          const isLastOfMonth = date.getDate() === daysInMonth;

          return (
            <Pressable
              key={date.toISOString()}
              onPress={() => !isDisabled && handleDatePress(date)}
              onPressIn={() => !isDisabled && setHoveredDate(date)}
              onPressOut={() => setHoveredDate(null)}
              disabled={isDisabled}
              style={styles.dayCell}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected, disabled: isDisabled }}
              accessibilityLabel={date.toDateString()}
            >
              {/* Range highlight background */}
              {isInRange && !isStart && !isEnd && (
                <View
                  style={[
                    styles.rangeHighlight,
                    (isFirstOfWeek || isFirstOfMonth) && styles.rangeHighlightLeft,
                    (isLastOfWeek || isLastOfMonth) && styles.rangeHighlightRight,
                  ]}
                />
              )}

              {/* Start/End range highlight half */}
              {isStart && isInRange && (
                <View style={[styles.rangeHighlight, styles.rangeHighlightRight]} />
              )}
              {isEnd && isInRange && (
                <View style={[styles.rangeHighlight, styles.rangeHighlightLeft]} />
              )}

              <View
                style={[
                  styles.dayInner,
                  isSelected && styles.daySelected,
                  !isSelected && isTodayDate && styles.dayToday,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    isSelected && styles.dayTextSelected,
                    isDisabled && styles.dayTextDisabled,
                    !isSelected && !isDisabled && isTodayDate && styles.dayTextToday,
                    isInRange && !isSelected && styles.dayTextInRange,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[3],
  },
  scrollContainer: {
    padding: spacing[3],
    maxHeight: 280,
  },
  selectionIndicator: {
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  selectionText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
  },
  // Month/Year Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthYearCell: {
    width: '25%',
    paddingVertical: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  cellSelected: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  cellPressed: {
    backgroundColor: colors.bg.surface,
  },
  monthYearText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
  },
  textSelected: {
    color: colors.white,
  },
  // Weekday Headers
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: spacing[2],
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  weekdayText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.text.muted,
  },
  // Days Grid
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  // Range highlight backgrounds
  rangeHighlight: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 0,
    right: 0,
    backgroundColor: colors.accent.blue.light,
  },
  rangeHighlightLeft: {
    left: 0,
    right: '50%',
    borderTopLeftRadius: radius.full,
    borderBottomLeftRadius: radius.full,
  },
  rangeHighlightRight: {
    left: '50%',
    right: 0,
    borderTopRightRadius: radius.full,
    borderBottomRightRadius: radius.full,
  },
  dayInner: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    zIndex: 1,
  },
  daySelected: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  dayToday: {
    borderWidth: 2,
    borderColor: colors.border.strong,
  },
  dayText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
  },
  dayTextSelected: {
    color: colors.white,
  },
  dayTextDisabled: {
    color: colors.text.muted,
    opacity: 0.5,
  },
  dayTextToday: {
    fontWeight: fontWeights.semibold,
  },
  dayTextInRange: {
    color: colors.accent.blue.DEFAULT,
  },
});
