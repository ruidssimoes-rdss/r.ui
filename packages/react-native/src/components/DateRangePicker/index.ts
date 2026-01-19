export { DateRangePicker } from './DateRangePicker';
export type { DateRangePickerProps } from './DateRangePicker';

export {
  DateRangePickerContext,
  useDateRangePicker,
  useDateRangePickerContext,
} from './DateRangePickerContext';
export type {
  DateRangePickerContextValue,
  DateRangePickerView,
  SelectionMode,
} from './DateRangePickerContext';

export { DateRangePickerTrigger } from './DateRangePickerTrigger';
export type { DateRangePickerTriggerProps } from './DateRangePickerTrigger';

export { DateRangePickerContent } from './DateRangePickerContent';
export type { DateRangePickerContentProps } from './DateRangePickerContent';

export { DateRangePickerHeader } from './DateRangePickerHeader';
export type { DateRangePickerHeaderProps } from './DateRangePickerHeader';

export { DateRangePickerCalendar } from './DateRangePickerCalendar';
export type { DateRangePickerCalendarProps } from './DateRangePickerCalendar';

export { DateRangePickerPresets } from './DateRangePickerPresets';
export type { DateRangePickerPresetsProps } from './DateRangePickerPresets';

export {
  // Re-export common date utils
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
  // Date range specific utils
  isDateInRange,
  isRangeStart,
  isRangeEnd,
  normalizeDate,
  compareDates,
  normalizeRange,
  formatDateRange,
  getPresetRanges,
  addDays,
  getDaysBetween,
} from './utils';

export type { DateRange, PresetRange } from './utils';
