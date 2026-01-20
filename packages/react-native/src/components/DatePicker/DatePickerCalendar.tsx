import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useDatePicker } from './DatePickerContext';
import {
  DAYS_SHORT,
  MONTHS_SHORT,
  getCalendarDays,
  isSameDay,
  isToday,
  isDateDisabled,
  getYearRange,
  setMonth,
  setYear,
} from './utils';

export interface DatePickerCalendarProps {
  /** Additional styles */
  style?: ViewStyle;
}

export function DatePickerCalendar({ style }: DatePickerCalendarProps) {
  const {
    viewDate,
    setViewDate,
    value,
    onValueChange,
    view,
    setView,
    minDate,
    maxDate,
    disabledDates,
  } = useDatePicker();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

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
                accessibilityRole="button"
                accessibilityLabel={`Select ${monthName}`}
                accessibilityState={{ selected: isSelected }}
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
                accessibilityRole="button"
                accessibilityLabel={`Select year ${y}`}
                accessibilityState={{ selected: isSelected }}
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

          const isSelected = isSameDay(date, value);
          const isTodayDate = isToday(date);
          const isDisabled = isDateDisabled(date, minDate, maxDate, disabledDates);

          return (
            <Pressable
              key={date.toISOString()}
              onPress={() => !isDisabled && onValueChange(date)}
              disabled={isDisabled}
              style={styles.dayCell}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected, disabled: isDisabled }}
              accessibilityLabel={date.toDateString()}
            >
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
  },
  dayInner: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
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
});
