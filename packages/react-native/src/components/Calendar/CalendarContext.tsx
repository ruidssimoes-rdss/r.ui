import { createContext, useContext } from 'react';
import { DateRange } from './utils';

// ============================================================================
// Types
// ============================================================================

export type CalendarMode = 'single' | 'range' | 'multiple';
export type CalendarWeekStart = 0 | 1; // 0 = Sunday, 1 = Monday

export interface CalendarContextValue {
  /** Selection mode */
  mode: CalendarMode;
  /** Currently viewed month/year */
  viewDate: Date;
  /** Set the view date */
  setViewDate: (date: Date) => void;
  /** Selected value (depends on mode) */
  value: Date | DateRange | Date[] | null;
  /** Handle date selection */
  onSelect: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Function to determine if a date should be disabled */
  disabledDates?: (date: Date) => boolean;
  /** Whether the calendar is disabled */
  disabled: boolean;
  /** First day of the week (0 = Sunday, 1 = Monday) */
  weekStartsOn: CalendarWeekStart;
}

// ============================================================================
// Context
// ============================================================================

export const CalendarContext = createContext<CalendarContextValue | null>(null);

// ============================================================================
// Hook
// ============================================================================

export function useCalendar(): CalendarContextValue {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'Calendar components must be used within a Calendar. ' +
        'Wrap your component in <Calendar> to fix this error.'
    );
  }
  return context;
}
