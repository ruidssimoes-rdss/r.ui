import React, { useState, useCallback, useMemo } from 'react';
import {
  DateRangePickerContext,
  DateRangePickerContextValue,
  DateRangePickerView,
  SelectionMode,
} from './DateRangePickerContext';
import { DateRange, PresetRange, getPresetRanges, normalizeRange } from './utils';

export interface DateRangePickerProps {
  /** DateRangePicker content */
  children: React.ReactNode;
  /** Controlled value */
  value?: DateRange;
  /** Callback when value changes */
  onValueChange?: (range: DateRange) => void;
  /** Default value (uncontrolled) */
  defaultValue?: DateRange;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disable the picker */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Date format string */
  format?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Custom function to disable dates */
  disabledDates?: (date: Date) => boolean;
  /** Custom preset ranges (set to false to hide presets) */
  presets?: PresetRange[] | false;
}

const DEFAULT_RANGE: DateRange = { start: null, end: null };

export function DateRangePicker({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue = DEFAULT_RANGE,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  placeholder = 'Select dates...',
  format = 'MMM d, yyyy',
  minDate,
  maxDate,
  disabledDates,
  presets,
}: DateRangePickerProps) {
  const [internalValue, setInternalValue] = useState<DateRange>(defaultValue);
  const [internalOpen, setInternalOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(
    defaultValue.start || new Date()
  );
  const [view, setView] = useState<DateRangePickerView>('calendar');
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('start');
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const isOpenControlled = controlledOpen !== undefined;
  const open = isOpenControlled ? controlledOpen : internalOpen;

  // Determine presets
  const showPresets = presets !== false;
  const presetRanges = presets === false
    ? undefined
    : presets || getPresetRanges();

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (isOpenControlled) {
        onOpenChange?.(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
      if (newOpen) {
        // Reset view to calendar and set viewDate to start date or today
        setView('calendar');
        setViewDate(value.start || new Date());
        // Reset selection mode based on current value
        setSelectionMode(value.start && value.end ? 'start' : 'start');
        setHoveredDate(null);
      }
    },
    [isOpenControlled, onOpenChange, value]
  );

  const handleValueChange = useCallback(
    (newRange: DateRange) => {
      const normalized = normalizeRange(newRange);

      if (!isControlled) {
        setInternalValue(normalized);
      }
      onValueChange?.(normalized);

      // Close picker when both dates are selected
      if (normalized.start && normalized.end) {
        setOpen(false);
      }
    },
    [isControlled, onValueChange, setOpen]
  );

  const contextValue = useMemo<DateRangePickerContextValue>(
    () => ({
      open,
      setOpen,
      value,
      onValueChange: handleValueChange,
      selectionMode,
      setSelectionMode,
      hoveredDate,
      setHoveredDate,
      viewDate,
      setViewDate,
      view,
      setView,
      minDate,
      maxDate,
      disabledDates,
      disabled,
      placeholder,
      format,
      presets: presetRanges,
      showPresets,
      triggerLayout,
      setTriggerLayout,
    }),
    [
      open,
      setOpen,
      value,
      handleValueChange,
      selectionMode,
      hoveredDate,
      viewDate,
      view,
      minDate,
      maxDate,
      disabledDates,
      disabled,
      placeholder,
      format,
      presetRanges,
      showPresets,
      triggerLayout,
    ]
  );

  return (
    <DateRangePickerContext.Provider value={contextValue}>
      {children}
    </DateRangePickerContext.Provider>
  );
}
