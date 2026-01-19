import React, { useState, useCallback, useMemo } from 'react';
import {
  TimePickerContext,
  TimePickerContextValue,
} from './TimePickerContext';
import { TimeValue, dateToTime } from './utils';

export interface TimePickerProps {
  /** TimePicker content */
  children: React.ReactNode;
  /** Controlled value */
  value?: TimeValue | null;
  /** Callback when value changes */
  onValueChange?: (time: TimeValue | null) => void;
  /** Default value (uncontrolled) */
  defaultValue?: TimeValue | null;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disable the picker */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Time format string */
  format?: string;
  /** Use 24-hour format */
  use24Hour?: boolean;
  /** Minute interval (1, 5, 15, 30) */
  minuteInterval?: number;
  /** Minimum selectable time */
  minTime?: TimeValue;
  /** Maximum selectable time */
  maxTime?: TimeValue;
}

export function TimePicker({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue = null,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  placeholder = 'Select time...',
  format,
  use24Hour = false,
  minuteInterval = 1,
  minTime,
  maxTime,
}: TimePickerProps) {
  const [internalValue, setInternalValue] = useState<TimeValue | null>(defaultValue);
  const [internalOpen, setInternalOpen] = useState(false);
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

  // Default format based on 12/24 hour mode
  const timeFormat = format || (use24Hour ? 'HH:mm' : 'h:mm A');

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (isOpenControlled) {
        onOpenChange?.(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
    },
    [isOpenControlled, onOpenChange]
  );

  const handleValueChange = useCallback(
    (newValue: TimeValue | null) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      setOpen(false);
    },
    [isControlled, onValueChange, setOpen]
  );

  const contextValue = useMemo<TimePickerContextValue>(
    () => ({
      open,
      setOpen,
      value,
      onValueChange: handleValueChange,
      use24Hour,
      minuteInterval,
      minTime,
      maxTime,
      disabled,
      placeholder,
      format: timeFormat,
      triggerLayout,
      setTriggerLayout,
    }),
    [
      open,
      setOpen,
      value,
      handleValueChange,
      use24Hour,
      minuteInterval,
      minTime,
      maxTime,
      disabled,
      placeholder,
      timeFormat,
      triggerLayout,
    ]
  );

  return (
    <TimePickerContext.Provider value={contextValue}>
      {children}
    </TimePickerContext.Provider>
  );
}
