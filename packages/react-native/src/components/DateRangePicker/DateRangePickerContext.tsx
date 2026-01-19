import React, { createContext, useContext } from 'react';
import { DateRange, PresetRange } from './utils';

export type DateRangePickerView = 'calendar' | 'months' | 'years';

export type SelectionMode = 'start' | 'end';

export interface DateRangePickerContextValue {
  /** Whether the dropdown is open */
  open: boolean;
  /** Update open state */
  setOpen: (open: boolean) => void;

  /** Currently selected date range */
  value: DateRange;
  /** Callback when value changes */
  onValueChange: (range: DateRange) => void;

  /** Current selection mode */
  selectionMode: SelectionMode;
  /** Update selection mode */
  setSelectionMode: (mode: SelectionMode) => void;

  /** Date being hovered for preview */
  hoveredDate: Date | null;
  /** Update hovered date */
  setHoveredDate: (date: Date | null) => void;

  /** Current view date (for navigation) */
  viewDate: Date;
  /** Update view date */
  setViewDate: (date: Date) => void;

  /** Current view mode */
  view: DateRangePickerView;
  /** Update view mode */
  setView: (view: DateRangePickerView) => void;

  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Custom function to disable dates */
  disabledDates?: (date: Date) => boolean;

  /** Whether the picker is disabled */
  disabled: boolean;
  /** Placeholder text */
  placeholder: string;
  /** Date format string */
  format: string;

  /** Available preset ranges */
  presets?: PresetRange[];
  /** Whether to show presets */
  showPresets: boolean;

  /** Trigger layout for positioning */
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  /** Update trigger layout */
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number } | null) => void;
}

const DateRangePickerContext = createContext<DateRangePickerContextValue | null>(null);

export function useDateRangePicker() {
  const context = useContext(DateRangePickerContext);
  if (!context) {
    throw new Error('DateRangePicker components must be used within a DateRangePicker');
  }
  return context;
}

export function useDateRangePickerContext() {
  return useContext(DateRangePickerContext);
}

export { DateRangePickerContext };
