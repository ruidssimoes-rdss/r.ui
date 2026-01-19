import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useDateRangePicker } from './DateRangePickerContext';
import { MONTHS, addMonths } from './utils';

export interface DateRangePickerHeaderProps {
  /** Additional styles */
  style?: ViewStyle;
}

export function DateRangePickerHeader({ style }: DateRangePickerHeaderProps) {
  const { viewDate, setViewDate, view, setView } = useDateRangePicker();

  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();

  const goToPrevMonth = () => {
    setViewDate(addMonths(viewDate, -1));
  };

  const goToNextMonth = () => {
    setViewDate(addMonths(viewDate, 1));
  };

  const goToPrevYear = () => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year - 1);
    setViewDate(newDate);
  };

  const goToNextYear = () => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year + 1);
    setViewDate(newDate);
  };

  const goToPrevDecade = () => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year - 10);
    setViewDate(newDate);
  };

  const goToNextDecade = () => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year + 10);
    setViewDate(newDate);
  };

  const toggleView = () => {
    if (view === 'calendar') {
      setView('months');
    } else if (view === 'months') {
      setView('years');
    } else {
      setView('calendar');
    }
  };

  const handlePrev = () => {
    if (view === 'years') {
      goToPrevDecade();
    } else if (view === 'months') {
      goToPrevYear();
    } else {
      goToPrevMonth();
    }
  };

  const handleNext = () => {
    if (view === 'years') {
      goToNextDecade();
    } else if (view === 'months') {
      goToNextYear();
    } else {
      goToNextMonth();
    }
  };

  const getHeaderText = () => {
    if (view === 'years') {
      return `${year - 10} – ${year + 10}`;
    } else if (view === 'months') {
      return String(year);
    }
    return `${MONTHS[month]} ${year}`;
  };

  return (
    <View style={[styles.container, style]}>
      {/* Previous Button */}
      <Pressable
        onPress={handlePrev}
        style={({ pressed }) => [
          styles.navButton,
          pressed && styles.navButtonPressed,
        ]}
        accessibilityLabel={
          view === 'years'
            ? 'Previous decade'
            : view === 'months'
            ? 'Previous year'
            : 'Previous month'
        }
      >
        <Text style={styles.navButtonText}>◀</Text>
      </Pressable>

      {/* Month/Year Display (clickable to change view) */}
      <Pressable
        onPress={toggleView}
        style={({ pressed }) => [
          styles.titleButton,
          pressed && styles.titleButtonPressed,
        ]}
        accessibilityLabel="Change view"
      >
        <Text style={styles.titleText}>{getHeaderText()}</Text>
      </Pressable>

      {/* Next Button */}
      <Pressable
        onPress={handleNext}
        style={({ pressed }) => [
          styles.navButton,
          pressed && styles.navButtonPressed,
        ]}
        accessibilityLabel={
          view === 'years'
            ? 'Next decade'
            : view === 'months'
            ? 'Next year'
            : 'Next month'
        }
      >
        <Text style={styles.navButtonText}>▶</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.muted,
  },
  navButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  navButtonPressed: {
    backgroundColor: colors.bg.surface,
  },
  navButtonText: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
  titleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.md,
  },
  titleButtonPressed: {
    backgroundColor: colors.bg.surface,
  },
  titleText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.text.primary,
  },
});
