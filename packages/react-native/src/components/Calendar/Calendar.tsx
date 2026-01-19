import React, { useState, useCallback, useMemo } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { CalendarContext, CalendarMode, CalendarWeekStart } from './CalendarContext';
import { DateRange, normalizeRange, toggleDateInList } from './utils';

// ============================================================================
// Types
// ============================================================================

export type CalendarValue<M extends CalendarMode> = M extends 'single'
  ? Date | null
  : M extends 'range'
  ? DateRange
  : Date[];

export interface CalendarProps<M extends CalendarMode = 'single'> {
  /** Selection mode */
  mode?: M;
  /** Selected value (type depends on mode) */
  value?: CalendarValue<M>;
  /** Called when value changes */
  onValueChange?: (value: CalendarValue<M>) => void;
  /** Default value (uncontrolled) */
  defaultValue?: CalendarValue<M>;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Function to determine if a date should be disabled */
  disabledDates?: (date: Date) => boolean;
  /** Whether the calendar is disabled */
  disabled?: boolean;
  /** First day of the week (0 = Sunday, 1 = Monday) */
  weekStartsOn?: CalendarWeekStart;
  /** Calendar content (Header, Grid) */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function Calendar<M extends CalendarMode = 'single'>({
  mode = 'single' as M,
  value,
  onValueChange,
  defaultValue,
  minDate,
  maxDate,
  disabledDates,
  disabled = false,
  weekStartsOn = 0,
  children,
  style,
}: CalendarProps<M>) {
  // Initialize view date to today or first selected date
  const getInitialViewDate = (): Date => {
    if (value) {
      if (mode === 'single' && value instanceof Date) return value;
      if (mode === 'range' && (value as DateRange).start) return (value as DateRange).start!;
      if (mode === 'multiple' && Array.isArray(value) && value.length > 0) return value[0];
    }
    if (defaultValue) {
      if (mode === 'single' && defaultValue instanceof Date) return defaultValue;
      if (mode === 'range' && (defaultValue as DateRange).start) return (defaultValue as DateRange).start!;
      if (mode === 'multiple' && Array.isArray(defaultValue) && defaultValue.length > 0) return defaultValue[0];
    }
    return new Date();
  };

  const [viewDate, setViewDate] = useState<Date>(getInitialViewDate);

  // Internal state for uncontrolled usage
  const getDefaultValue = (): CalendarValue<M> => {
    if (defaultValue !== undefined) return defaultValue;
    if (mode === 'single') return null as CalendarValue<M>;
    if (mode === 'range') return { start: null, end: null } as CalendarValue<M>;
    return [] as CalendarValue<M>;
  };

  const [internalValue, setInternalValue] = useState<CalendarValue<M>>(getDefaultValue);

  // Controlled vs uncontrolled
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = useCallback((newValue: CalendarValue<M>) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }, [value, onValueChange]);

  // Handle date selection based on mode
  const [rangeSelecting, setRangeSelecting] = useState<'start' | 'end'>('start');

  const onSelect = useCallback((date: Date) => {
    if (disabled) return;

    if (mode === 'single') {
      handleValueChange(date as CalendarValue<M>);
    } else if (mode === 'range') {
      const currentRange = currentValue as DateRange;

      if (rangeSelecting === 'start') {
        handleValueChange({ start: date, end: null } as CalendarValue<M>);
        setRangeSelecting('end');
      } else {
        const newRange = normalizeRange({ start: currentRange.start, end: date });
        handleValueChange(newRange as CalendarValue<M>);
        setRangeSelecting('start');
      }
    } else if (mode === 'multiple') {
      const currentDates = currentValue as Date[];
      const newDates = toggleDateInList(date, currentDates);
      handleValueChange(newDates as CalendarValue<M>);
    }
  }, [mode, currentValue, rangeSelecting, disabled, handleValueChange]);

  const contextValue = useMemo(() => ({
    mode,
    viewDate,
    setViewDate,
    value: currentValue,
    onSelect,
    minDate,
    maxDate,
    disabledDates,
    disabled,
    weekStartsOn,
  }), [mode, viewDate, currentValue, onSelect, minDate, maxDate, disabledDates, disabled, weekStartsOn]);

  return (
    <CalendarContext.Provider value={contextValue}>
      <View style={[styles.calendar, style]}>
        {children}
      </View>
    </CalendarContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  calendar: {
    width: '100%',
  },
});
