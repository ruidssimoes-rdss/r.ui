import React, { createContext, useContext } from 'react';
import { TimeValue } from './utils';

export interface TimePickerContextValue {
  /** Whether the dropdown is open */
  open: boolean;
  /** Update open state */
  setOpen: (open: boolean) => void;
  /** Currently selected time */
  value: TimeValue | null;
  /** Callback when value changes */
  onValueChange: (time: TimeValue | null) => void;

  /** Whether to use 24-hour format */
  use24Hour: boolean;
  /** Minute interval (1, 5, 15, 30) */
  minuteInterval: number;

  /** Minimum selectable time */
  minTime?: TimeValue;
  /** Maximum selectable time */
  maxTime?: TimeValue;

  /** Whether the picker is disabled */
  disabled: boolean;
  /** Placeholder text */
  placeholder: string;
  /** Time format string */
  format: string;

  /** Trigger layout for positioning */
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  /** Update trigger layout */
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number } | null) => void;
}

const TimePickerContext = createContext<TimePickerContextValue | null>(null);

export function useTimePicker() {
  const context = useContext(TimePickerContext);
  if (!context) {
    throw new Error('TimePicker components must be used within a TimePicker');
  }
  return context;
}

export function useTimePickerContext() {
  return useContext(TimePickerContext);
}

export { TimePickerContext };
