'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

/**
 * DatePicker Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const DAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

function formatDate(date: Date | null, format: string = 'MMM d, yyyy'): string {
  if (!date) return '';
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return format
    .replace('MMMM', MONTHS[month])
    .replace('MMM', MONTHS_SHORT[month])
    .replace('MM', String(month + 1).padStart(2, '0'))
    .replace('dd', String(day).padStart(2, '0'))
    .replace('d', String(day))
    .replace('yyyy', String(year));
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days: (Date | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
}

function getYearRange(currentYear: number, range: number = 10): number[] {
  const years: number[] = [];
  for (let year = currentYear - range; year <= currentYear + range; year++) {
    years.push(year);
  }
  return years;
}

interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: (date: Date) => boolean;
}

type ViewMode = 'calendar' | 'months' | 'years';

function DatePicker({
  value,
  onChange,
  placeholder = 'Select date...',
  disabled = false,
  format = 'MMM d, yyyy',
  minDate,
  maxDate,
  disabledDates,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const [view, setView] = useState<ViewMode>('calendar');
  const containerRef = useRef<HTMLDivElement>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      setView('calendar');
      setViewDate(value || new Date());
    }
  }, [open, value]);

  const isDateDisabled = (date: Date): boolean => {
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
  };

  const goToPrevMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(month - 1);
    setViewDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(month + 1);
    setViewDate(newDate);
  };

  const goToPrevYear = () => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year - 1);
    setViewDate(newDate);
  };

  const goToNextYear = () => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year + 1);
    setViewDate(newDate);
  };

  const goToPrevDecade = () => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year - 10);
    setViewDate(newDate);
  };

  const goToNextDecade = () => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year + 10);
    setViewDate(newDate);
  };

  const handlePrev = () => {
    if (view === 'years') goToPrevDecade();
    else if (view === 'months') goToPrevYear();
    else goToPrevMonth();
  };

  const handleNext = () => {
    if (view === 'years') goToNextDecade();
    else if (view === 'months') goToNextYear();
    else goToNextMonth();
  };

  const toggleView = () => {
    if (view === 'calendar') setView('months');
    else if (view === 'months') setView('years');
    else setView('calendar');
  };

  const getHeaderText = () => {
    if (view === 'years') return `${year - 10} – ${year + 10}`;
    if (view === 'months') return String(year);
    return `${MONTHS[month]} ${year}`;
  };

  const days = useMemo(() => getCalendarDays(year, month), [year, month]);
  const years = useMemo(() => getYearRange(year, 10), [year]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`
          w-full flex items-center px-3 py-2.5 text-sm rounded-lg border
          bg-[var(--input-bg)] border-[var(--input-border)] transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--component-border-muted)]'}
          ${open ? 'ring-2 ring-[var(--track-fill)] border-transparent' : ''}
        `}
      >
        <span className="mr-2">📅</span>
        <span className={`flex-1 text-left ${value ? 'text-[var(--input-text)]' : 'text-[var(--input-placeholder)]'}`}>
          {value ? formatDate(value, format) : placeholder}
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
        <div className="absolute top-full left-0 mt-1 z-50 rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] shadow-lg animate-in fade-in zoom-in-95 duration-150 overflow-hidden min-w-[280px]">
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-3 border-b border-[var(--component-border)]">
            <button
              type="button"
              onClick={handlePrev}
              className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[var(--component-bg-elevated)] text-[var(--component-text-muted)]"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={toggleView}
              className="px-3 py-1.5 rounded-md hover:bg-[var(--component-bg-elevated)] text-sm font-semibold text-[var(--component-text)]"
            >
              {getHeaderText()}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[var(--component-bg-elevated)] text-[var(--component-text-muted)]"
            >
              ▶
            </button>
          </div>

          {/* Content */}
          <div className="p-3">
            {/* Calendar View */}
            {view === 'calendar' && (
              <>
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 mb-2">
                  {DAYS_SHORT.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-[var(--component-text-muted)] py-2">
                      {day}
                    </div>
                  ))}
                </div>
                {/* Days Grid */}
                <div className="grid grid-cols-7">
                  {days.map((date, index) => {
                    if (!date) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const isSelected = isSameDay(date, value);
                    const isTodayDate = isToday(date);
                    const isDisabled = isDateDisabled(date);

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => {
                          if (!isDisabled) {
                            onChange?.(date);
                            setOpen(false);
                          }
                        }}
                        disabled={isDisabled}
                        className={`
                          aspect-square flex items-center justify-center text-sm rounded-full transition-colors
                          ${isSelected
                            ? 'bg-[var(--track-fill)] text-white'
                            : isDisabled
                            ? 'text-[var(--component-text-muted)] opacity-40 cursor-not-allowed'
                            : isTodayDate
                            ? 'border-2 border-[var(--component-border)] text-[var(--component-text)] font-semibold hover:bg-[var(--component-bg-elevated)]'
                            : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                          }
                        `}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Months View */}
            {view === 'months' && (
              <div className="grid grid-cols-4 gap-1">
                {MONTHS_SHORT.map((monthName, index) => {
                  const isSelected = month === index;
                  return (
                    <button
                      key={monthName}
                      type="button"
                      onClick={() => {
                        const newDate = new Date(viewDate);
                        newDate.setMonth(index);
                        setViewDate(newDate);
                        setView('calendar');
                      }}
                      className={`
                        py-3 text-sm font-medium rounded-md transition-colors
                        ${isSelected
                          ? 'bg-[var(--track-fill)] text-white'
                          : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                        }
                      `}
                    >
                      {monthName}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Years View */}
            {view === 'years' && (
              <div className="grid grid-cols-4 gap-1 max-h-[200px] overflow-auto">
                {years.map((y) => {
                  const isSelected = year === y;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => {
                        const newDate = new Date(viewDate);
                        newDate.setFullYear(y);
                        setViewDate(newDate);
                        setView('months');
                      }}
                      className={`
                        py-3 text-sm font-medium rounded-md transition-colors
                        ${isSelected
                          ? 'bg-[var(--track-fill)] text-white'
                          : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                        }
                      `}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Preview Components

export function DatePickerBasicPreview() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="w-64">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select date..."
      />
    </div>
  );
}

export function DatePickerWithDefaultPreview() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="w-64">
      <DatePicker
        value={date}
        onChange={setDate}
      />
    </div>
  );
}

export function DatePickerWithMinMaxPreview() {
  const [date, setDate] = useState<Date | null>(null);

  // Only allow dates in the current month
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return (
    <div className="w-64 space-y-2">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select date this month..."
        minDate={minDate}
        maxDate={maxDate}
      />
      <p className="text-xs text-[var(--component-text-muted)]">
        Only current month dates are selectable
      </p>
    </div>
  );
}

export function DatePickerNoWeekendsPreview() {
  const [date, setDate] = useState<Date | null>(null);

  // Disable weekends
  const disabledDates = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  return (
    <div className="w-64 space-y-2">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select weekday..."
        disabledDates={disabledDates}
      />
      <p className="text-xs text-[var(--component-text-muted)]">
        Weekends are disabled
      </p>
    </div>
  );
}

export function DatePickerDisabledPreview() {
  return (
    <div className="w-64">
      <DatePicker
        value={new Date()}
        disabled
      />
    </div>
  );
}

export function DatePickerCustomFormatPreview() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="w-64 space-y-2">
      <DatePicker
        value={date}
        onChange={setDate}
        format="dd/MM/yyyy"
      />
      <p className="text-xs text-[var(--component-text-muted)]">
        Format: dd/MM/yyyy
      </p>
    </div>
  );
}
