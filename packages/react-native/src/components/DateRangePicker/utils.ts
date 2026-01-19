/**
 * DateRangePicker utility functions
 * Extends DatePicker utils with range-specific functionality
 */

// Re-export common date utilities from DatePicker
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

/**
 * Date range value type
 */
export interface DateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * Preset range option
 */
export interface PresetRange {
  label: string;
  value: DateRange;
}

/**
 * Check if a date is within a range (inclusive)
 */
export function isDateInRange(
  date: Date,
  start: Date | null,
  end: Date | null
): boolean {
  if (!start || !end) return false;

  const dateTime = normalizeDate(date).getTime();
  const startTime = normalizeDate(start).getTime();
  const endTime = normalizeDate(end).getTime();

  return dateTime >= startTime && dateTime <= endTime;
}

/**
 * Check if a date is the start of a range
 */
export function isRangeStart(
  date: Date,
  start: Date | null
): boolean {
  if (!start) return false;
  return (
    date.getFullYear() === start.getFullYear() &&
    date.getMonth() === start.getMonth() &&
    date.getDate() === start.getDate()
  );
}

/**
 * Check if a date is the end of a range
 */
export function isRangeEnd(
  date: Date,
  end: Date | null
): boolean {
  if (!end) return false;
  return (
    date.getFullYear() === end.getFullYear() &&
    date.getMonth() === end.getMonth() &&
    date.getDate() === end.getDate()
  );
}

/**
 * Normalize a date to midnight for comparison
 */
export function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Compare two dates (ignoring time)
 * Returns negative if a < b, positive if a > b, 0 if equal
 */
export function compareDates(a: Date, b: Date): number {
  const aTime = normalizeDate(a).getTime();
  const bTime = normalizeDate(b).getTime();
  return aTime - bTime;
}

/**
 * Ensure start <= end in a range
 */
export function normalizeRange(range: DateRange): DateRange {
  if (!range.start || !range.end) return range;

  if (compareDates(range.start, range.end) > 0) {
    return { start: range.end, end: range.start };
  }
  return range;
}

/**
 * Format a date range for display
 */
export function formatDateRange(
  range: DateRange,
  format: string = 'MMM d, yyyy'
): string {
  const { start, end } = range;

  if (!start && !end) return '';
  if (!start) return '';
  if (!end) return formatSingleDate(start, format);

  const startStr = formatSingleDate(start, format);
  const endStr = formatSingleDate(end, format);

  // Same date
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  ) {
    return startStr;
  }

  // Same month and year - compact format
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    return `${formatSingleDate(start, 'MMM d')} – ${end.getDate()}, ${end.getFullYear()}`;
  }

  // Same year - show month for both
  if (start.getFullYear() === end.getFullYear()) {
    return `${formatSingleDate(start, 'MMM d')} – ${formatSingleDate(end, 'MMM d')}, ${end.getFullYear()}`;
  }

  // Different years
  return `${startStr} – ${endStr}`;
}

/**
 * Helper to format a single date (reuses DatePicker formatDate logic)
 */
function formatSingleDate(date: Date, format: string): string {
  const MONTHS_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return format
    .replace('MMMM', MONTHS[month])
    .replace('MMM', MONTHS_SHORT[month])
    .replace('MM', String(month + 1).padStart(2, '0'))
    .replace('M', String(month + 1))
    .replace('dd', String(day).padStart(2, '0'))
    .replace('d', String(day))
    .replace('yyyy', String(year))
    .replace('yy', String(year).slice(-2));
}

/**
 * Get preset date ranges
 */
export function getPresetRanges(): PresetRange[] {
  const today = new Date();
  const startOfToday = normalizeDate(today);

  return [
    {
      label: 'Today',
      value: { start: startOfToday, end: startOfToday },
    },
    {
      label: 'Yesterday',
      value: {
        start: addDays(startOfToday, -1),
        end: addDays(startOfToday, -1),
      },
    },
    {
      label: 'Last 7 days',
      value: {
        start: addDays(startOfToday, -6),
        end: startOfToday,
      },
    },
    {
      label: 'Last 30 days',
      value: {
        start: addDays(startOfToday, -29),
        end: startOfToday,
      },
    },
    {
      label: 'This month',
      value: {
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: new Date(today.getFullYear(), today.getMonth() + 1, 0),
      },
    },
    {
      label: 'Last month',
      value: {
        start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        end: new Date(today.getFullYear(), today.getMonth(), 0),
      },
    },
  ];
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Get the number of days between two dates
 */
export function getDaysBetween(start: Date, end: Date): number {
  const startTime = normalizeDate(start).getTime();
  const endTime = normalizeDate(end).getTime();
  const diffTime = Math.abs(endTime - startTime);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
