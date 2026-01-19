/**
 * Calendar utility functions and constants
 * Reuses utilities from DatePicker
 */

// Re-export from DatePicker
export {
  DAYS,
  DAYS_SHORT,
  MONTHS,
  MONTHS_SHORT,
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  isToday,
  formatDate,
  addMonths,
  setMonth,
  setYear,
  isDateDisabled,
  getCalendarDays,
  getYearRange,
} from '../DatePicker/utils';

// ============================================================================
// Date Range Types
// ============================================================================

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

// ============================================================================
// Date Range Utilities
// ============================================================================

/**
 * Check if a date is within a range (inclusive)
 */
export function isDateInRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;

  const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const startTime = new Date(range.start.getFullYear(), range.start.getMonth(), range.start.getDate()).getTime();
  const endTime = new Date(range.end.getFullYear(), range.end.getMonth(), range.end.getDate()).getTime();

  return dateTime >= startTime && dateTime <= endTime;
}

/**
 * Check if a date is the start of a range
 */
export function isRangeStart(date: Date, range: DateRange): boolean {
  if (!range.start) return false;
  return (
    date.getFullYear() === range.start.getFullYear() &&
    date.getMonth() === range.start.getMonth() &&
    date.getDate() === range.start.getDate()
  );
}

/**
 * Check if a date is the end of a range
 */
export function isRangeEnd(date: Date, range: DateRange): boolean {
  if (!range.end) return false;
  return (
    date.getFullYear() === range.end.getFullYear() &&
    date.getMonth() === range.end.getMonth() &&
    date.getDate() === range.end.getDate()
  );
}

/**
 * Normalize a date range so start is before end
 */
export function normalizeRange(range: DateRange): DateRange {
  if (!range.start || !range.end) return range;

  const startTime = range.start.getTime();
  const endTime = range.end.getTime();

  if (startTime > endTime) {
    return { start: range.end, end: range.start };
  }
  return range;
}

/**
 * Check if a date is in a list of dates
 */
export function isDateInList(date: Date, dates: Date[]): boolean {
  return dates.some(
    (d) =>
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
  );
}

/**
 * Add or remove a date from a list
 */
export function toggleDateInList(date: Date, dates: Date[]): Date[] {
  const index = dates.findIndex(
    (d) =>
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
  );

  if (index >= 0) {
    return [...dates.slice(0, index), ...dates.slice(index + 1)];
  }
  return [...dates, date];
}
