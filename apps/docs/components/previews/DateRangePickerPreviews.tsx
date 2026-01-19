'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * DateRangePicker Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface PresetRange {
  label: string;
  value: DateRange;
}

const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDateRange(range: DateRange, format: string = 'MMM d, yyyy'): string {
  const { start, end } = range;
  if (!start && !end) return '';
  if (!start) return '';
  if (!end) return formatSingleDate(start, format);

  const startStr = formatSingleDate(start, format);
  const endStr = formatSingleDate(end, format);

  if (isSameDay(start, end)) return startStr;

  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${formatSingleDate(start, 'MMM d')} – ${end.getDate()}, ${end.getFullYear()}`;
  }

  if (start.getFullYear() === end.getFullYear()) {
    return `${formatSingleDate(start, 'MMM d')} – ${formatSingleDate(end, 'MMM d')}, ${end.getFullYear()}`;
  }

  return `${startStr} – ${endStr}`;
}

function formatSingleDate(date: Date, format: string): string {
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

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day));
  return days;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getPresetRanges(): PresetRange[] {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return [
    { label: 'Today', value: { start: startOfToday, end: startOfToday } },
    { label: 'Yesterday', value: { start: addDays(startOfToday, -1), end: addDays(startOfToday, -1) } },
    { label: 'Last 7 days', value: { start: addDays(startOfToday, -6), end: startOfToday } },
    { label: 'Last 30 days', value: { start: addDays(startOfToday, -29), end: startOfToday } },
    { label: 'This month', value: { start: new Date(today.getFullYear(), today.getMonth(), 1), end: new Date(today.getFullYear(), today.getMonth() + 1, 0) } },
    { label: 'Last month', value: { start: new Date(today.getFullYear(), today.getMonth() - 1, 1), end: new Date(today.getFullYear(), today.getMonth(), 0) } },
  ];
}

function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const dateTime = date.getTime();
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return dateTime >= startTime && dateTime <= endTime;
}

function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date, disabledDates?: (date: Date) => boolean): boolean {
  if (minDate) {
    const minCompare = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    const dateCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (dateCompare < minCompare) return true;
  }
  if (maxDate) {
    const maxCompare = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    const dateCompare = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (dateCompare > maxCompare) return true;
  }
  if (disabledDates && disabledDates(date)) return true;
  return false;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: (date: Date) => boolean;
  showPresets?: boolean;
}

function DateRangePickerComponent({
  value,
  onChange,
  placeholder = 'Select dates...',
  disabled = false,
  minDate,
  maxDate,
  disabledDates,
  showPresets = true,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value.start || new Date());
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleOpen = () => {
    if (disabled) return;
    setOpen(!open);
    if (!open) {
      setViewDate(value.start || new Date());
      setSelectionMode(value.start && value.end ? 'start' : 'start');
    }
  };

  const handleDateClick = (date: Date) => {
    if (selectionMode === 'start') {
      onChange({ start: date, end: null });
      setSelectionMode('end');
    } else {
      if (value.start) {
        if (date < value.start) {
          onChange({ start: date, end: value.start });
        } else {
          onChange({ start: value.start, end: date });
        }
      } else {
        onChange({ start: date, end: null });
      }
      setSelectionMode('start');
      // Don't close on first date selection, close on second
      if (value.start) setOpen(false);
    }
  };

  const handlePresetClick = (preset: PresetRange) => {
    onChange(preset.value);
    setOpen(false);
  };

  const goToPrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const hasValue = value.start !== null;
  const displayText = hasValue ? formatDateRange(value) : placeholder;
  const days = getCalendarDays(viewDate.getFullYear(), viewDate.getMonth());
  const presets = getPresetRanges();

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        disabled={disabled}
        className={`
          w-full flex items-center px-3 py-2.5 text-sm rounded-lg border
          bg-[var(--input-bg)] border-[var(--input-border)] transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--component-border-muted)]'}
          ${open ? 'ring-2 ring-[var(--track-fill)] border-transparent' : ''}
        `}
      >
        <span className="mr-2">📅</span>
        <span className={`flex-1 text-left ${hasValue ? 'text-[var(--input-text)]' : 'text-[var(--input-placeholder)]'}`}>
          {displayText}
        </span>
        <svg
          className={`w-4 h-4 text-[var(--component-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] shadow-lg animate-in fade-in zoom-in-95 duration-150 overflow-hidden flex">
          {/* Calendar */}
          <div className="p-4">
            {/* Selection mode indicator */}
            <div className="text-center text-xs text-[var(--component-text-muted)] mb-2">
              {selectionMode === 'start' ? 'Select start date' : 'Select end date'}
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={goToPrevMonth}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--component-bg-elevated)] text-[var(--component-text-muted)]"
              >
                ◀
              </button>
              <span className="text-sm font-semibold text-[var(--component-text)]">
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </span>
              <button
                type="button"
                onClick={goToNextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[var(--component-bg-elevated)] text-[var(--component-text-muted)]"
              >
                ▶
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS_SHORT.map((day) => (
                <div key={day} className="w-10 h-8 flex items-center justify-center text-xs font-medium text-[var(--component-text-muted)]">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="w-10 h-10" />;
                }

                const isStart = isSameDay(date, value.start);
                const isEnd = isSameDay(date, value.end);
                const isInRange = value.start && value.end && isDateInRange(date, value.start, value.end);
                const isToday = isSameDay(date, new Date());
                const isDisabledDate = isDateDisabled(date, minDate, maxDate, disabledDates);
                const isSelected = isStart || isEnd;

                return (
                  <div key={date.toISOString()} className="relative w-10 h-10 flex items-center justify-center">
                    {/* Range highlight */}
                    {isInRange && !isStart && !isEnd && (
                      <div className="absolute inset-y-1 inset-x-0 bg-[var(--track-fill)]/20" />
                    )}
                    {isStart && isInRange && (
                      <div className="absolute inset-y-1 left-1/2 right-0 bg-[var(--track-fill)]/20" />
                    )}
                    {isEnd && isInRange && (
                      <div className="absolute inset-y-1 left-0 right-1/2 bg-[var(--track-fill)]/20" />
                    )}

                    <button
                      type="button"
                      onClick={() => !isDisabledDate && handleDateClick(date)}
                      disabled={isDisabledDate}
                      className={`
                        relative w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors z-10
                        ${isSelected ? 'bg-[var(--track-fill)] text-white' : ''}
                        ${!isSelected && isToday ? 'border-2 border-[var(--component-border)]' : ''}
                        ${!isSelected && !isDisabledDate ? 'hover:bg-[var(--component-bg-elevated)] text-[var(--component-text)]' : ''}
                        ${isDisabledDate ? 'text-[var(--component-text-muted)] opacity-40 cursor-not-allowed' : ''}
                        ${isInRange && !isSelected ? 'text-[var(--track-fill)]' : ''}
                      `}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Presets */}
          {showPresets && (
            <div className="p-4 border-l border-[var(--component-border)] min-w-[140px]">
              <div className="text-xs font-medium text-[var(--component-text-muted)] uppercase tracking-wide mb-2">
                Presets
              </div>
              <div className="flex flex-col gap-1">
                {presets.map((preset, index) => {
                  const isPresetSelected = value.start && value.end && preset.value.start && preset.value.end &&
                    isSameDay(value.start, preset.value.start) && isSameDay(value.end, preset.value.end);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={`
                        py-2 px-3 rounded-md text-sm text-left transition-colors
                        ${isPresetSelected
                          ? 'bg-[var(--track-fill)] text-white font-medium'
                          : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                        }
                      `}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Preview Components

export function DateRangePickerBasicPreview() {
  const [value, setValue] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="w-80 min-h-[420px]">
      <DateRangePickerComponent
        value={value}
        onChange={setValue}
        placeholder="Select date range..."
      />
    </div>
  );
}

export function DateRangePickerWithDefaultPreview() {
  const today = new Date();
  const [value, setValue] = useState<DateRange>({
    start: addDays(today, -7),
    end: today,
  });

  return (
    <div className="w-80 min-h-[420px]">
      <DateRangePickerComponent
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export function DateRangePickerWithPresetsPreview() {
  const [value, setValue] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="w-96 min-h-[420px]">
      <DateRangePickerComponent
        value={value}
        onChange={setValue}
        showPresets={true}
      />
    </div>
  );
}

export function DateRangePickerNoPresetsPreview() {
  const [value, setValue] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="w-72 min-h-[420px]">
      <DateRangePickerComponent
        value={value}
        onChange={setValue}
        showPresets={false}
      />
    </div>
  );
}

export function DateRangePickerWithMinMaxPreview() {
  const today = new Date();
  const minDate = addDays(today, -30);
  const maxDate = addDays(today, 30);
  const [value, setValue] = useState<DateRange>({ start: null, end: null });

  return (
    <div className="w-80 space-y-2 min-h-[420px]">
      <DateRangePickerComponent
        value={value}
        onChange={setValue}
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Select within ±30 days"
      />
      <p className="text-xs text-[var(--component-text-muted)]">
        Dates outside ±30 days from today are disabled
      </p>
    </div>
  );
}

export function DateRangePickerDisabledPreview() {
  const today = new Date();
  return (
    <div className="w-80">
      <DateRangePickerComponent
        value={{ start: addDays(today, -7), end: today }}
        onChange={() => {}}
        disabled
      />
    </div>
  );
}

export function DateRangePickerNoWeekendsPreview() {
  const [value, setValue] = useState<DateRange>({ start: null, end: null });

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className="w-80 space-y-2 min-h-[420px]">
      <DateRangePickerComponent
        value={value}
        onChange={setValue}
        disabledDates={isWeekend}
        placeholder="Select weekdays only..."
      />
      <p className="text-xs text-[var(--component-text-muted)]">
        Weekends are disabled
      </p>
    </div>
  );
}
