import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useCalendar } from './CalendarContext';
import { CalendarDay } from './CalendarDay';
import { DAYS_SHORT, getCalendarDays } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface CalendarGridProps {
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function CalendarGrid({ style }: CalendarGridProps) {
  const { viewDate, weekStartsOn } = useCalendar();

  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();

  const days = getCalendarDays(year, month);

  // Reorder days of week based on weekStartsOn
  const orderedDays = weekStartsOn === 1
    ? [...DAYS_SHORT.slice(1), DAYS_SHORT[0]]
    : DAYS_SHORT;

  // Adjust days array for Monday start
  const adjustedDays = weekStartsOn === 1
    ? days.map((day, index) => {
        if (index < 7) {
          // Shift the first week
          const originalIndex = (index + 6) % 7;
          return days[originalIndex];
        }
        return day;
      })
    : days;

  // Recalculate for Monday start
  const calendarDays = React.useMemo(() => {
    if (weekStartsOn === 0) return days;

    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const result: (Date | null)[] = [];

    // Add empty slots
    for (let i = 0; i < adjustedFirstDay; i++) {
      result.push(null);
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
      result.push(new Date(year, month, day));
    }

    return result;
  }, [year, month, weekStartsOn, days]);

  return (
    <View style={[styles.grid, style]}>
      {/* Day headers */}
      <View style={styles.headerRow}>
        {orderedDays.map((day, index) => (
          <View key={`header-${index}`} style={styles.headerCell}>
            <Text style={styles.headerText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Days grid */}
      <View style={styles.daysGrid}>
        {calendarDays.map((date, index) => (
          <CalendarDay key={index} date={date} />
        ))}
      </View>
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  grid: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: spacing[2],
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  headerText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.text.muted,
    textTransform: 'uppercase',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
