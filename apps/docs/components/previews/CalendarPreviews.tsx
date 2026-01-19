'use client';

import { useState } from 'react';

/**
 * Calendar Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

interface CalendarProps {
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
}

function Calendar({ selected, onSelect, rangeStart, rangeEnd }: CalendarProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return selected.getDate() === day && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
  };

  const isToday = (day: number) => {
    return today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
  };

  const isInRange = (day: number) => {
    if (!rangeStart || !rangeEnd) return false;
    const date = new Date(viewYear, viewMonth, day);
    return date >= rangeStart && date <= rangeEnd;
  };

  const isRangeStart = (day: number) => {
    if (!rangeStart) return false;
    return rangeStart.getDate() === day && rangeStart.getMonth() === viewMonth && rangeStart.getFullYear() === viewYear;
  };

  const isRangeEnd = (day: number) => {
    if (!rangeEnd) return false;
    return rangeEnd.getDate() === day && rangeEnd.getMonth() === viewMonth && rangeEnd.getFullYear() === viewYear;
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="w-72 p-3 bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-medium text-[var(--component-text)]">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-[var(--component-text-muted)]">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            disabled={day === null}
            onClick={() => day && onSelect?.(new Date(viewYear, viewMonth, day))}
            className={`
              h-8 flex items-center justify-center text-sm rounded-md transition-colors
              ${day === null ? 'invisible' : ''}
              ${isSelected(day!) || isRangeStart(day!) || isRangeEnd(day!)
                ? 'bg-[var(--switch-bg-checked)] text-white'
                : isInRange(day!)
                  ? 'bg-[var(--switch-bg-checked)]/20 text-[var(--component-text)]'
                  : isToday(day!)
                    ? 'border border-[var(--switch-bg-checked)] text-[var(--component-text)]'
                    : 'text-[var(--component-text)] hover:bg-[var(--component-bg-hover)]'
              }
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CalendarBasicPreview() {
  const [selected, setSelected] = useState<Date | null>(null);

  return (
    <div className="space-y-2">
      <Calendar selected={selected} onSelect={setSelected} />
      {selected && (
        <p className="text-sm text-[var(--component-text-muted)]">
          Selected: {selected.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export function CalendarRangePreview() {
  const today = new Date();
  const rangeStart = new Date(today.getFullYear(), today.getMonth(), 10);
  const rangeEnd = new Date(today.getFullYear(), today.getMonth(), 20);

  return (
    <div className="space-y-2">
      <Calendar rangeStart={rangeStart} rangeEnd={rangeEnd} />
      <p className="text-sm text-[var(--component-text-muted)]">
        Range: {rangeStart.toLocaleDateString()} - {rangeEnd.toLocaleDateString()}
      </p>
    </div>
  );
}

export function CalendarMultiplePreview() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const toggleDate = (date: Date) => {
    setSelectedDates((prev) => {
      const exists = prev.some(
        (d) => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear()
      );
      if (exists) {
        return prev.filter(
          (d) => !(d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear())
        );
      }
      return [...prev, date];
    });
  };

  return (
    <div className="space-y-2">
      <Calendar
        onSelect={toggleDate}
        selected={selectedDates.length === 1 ? selectedDates[0] : null}
      />
      <p className="text-sm text-[var(--component-text-muted)]">
        {selectedDates.length} date(s) selected
      </p>
    </div>
  );
}
