'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * TimePicker Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface TimeValue {
  hours: number;
  minutes: number;
}

function to12Hour(hours: number): { hour: number; period: 'AM' | 'PM' } {
  const period: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';
  let hour = hours % 12;
  if (hour === 0) hour = 12;
  return { hour, period };
}

function to24Hour(hour: number, period: 'AM' | 'PM'): number {
  if (period === 'AM') {
    return hour === 12 ? 0 : hour;
  }
  return hour === 12 ? 12 : hour + 12;
}

function formatTime(
  time: TimeValue | null | undefined,
  format: string = 'h:mm A',
  use24Hour: boolean = false
): string {
  if (!time) return '';

  const { hours, minutes } = time;
  const { hour: hour12, period } = to12Hour(hours);

  return format
    .replace('HH', String(hours).padStart(2, '0'))
    .replace('H', String(hours))
    .replace('hh', String(hour12).padStart(2, '0'))
    .replace('h', String(hour12))
    .replace('mm', String(minutes).padStart(2, '0'))
    .replace('m', String(minutes))
    .replace('a', period.toLowerCase())
    .replace('A', period);
}

function get12Hours(): number[] {
  return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
}

function get24Hours(): number[] {
  return Array.from({ length: 24 }, (_, i) => i);
}

function getMinutes(interval: number = 1): number[] {
  const minutes: number[] = [];
  for (let i = 0; i < 60; i += interval) {
    minutes.push(i);
  }
  return minutes;
}

function compareTime(a: TimeValue, b: TimeValue): number {
  const aMinutes = a.hours * 60 + a.minutes;
  const bMinutes = b.hours * 60 + b.minutes;
  return aMinutes - bMinutes;
}

function isTimeDisabled(
  time: TimeValue,
  minTime?: TimeValue,
  maxTime?: TimeValue
): boolean {
  if (minTime && compareTime(time, minTime) < 0) return true;
  if (maxTime && compareTime(time, maxTime) > 0) return true;
  return false;
}

interface TimePickerProps {
  value?: TimeValue | null;
  onChange?: (time: TimeValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  format?: string;
  use24Hour?: boolean;
  minuteInterval?: number;
  minTime?: TimeValue;
  maxTime?: TimeValue;
}

function TimePicker({
  value,
  onChange,
  placeholder = 'Select time...',
  disabled = false,
  format,
  use24Hour = false,
  minuteInterval = 1,
  minTime,
  maxTime,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const timeFormat = format || (use24Hour ? 'HH:mm' : 'h:mm A');

  // Local state for wheel selections
  const [selectedHour, setSelectedHour] = useState<number>(() => {
    if (!value) return use24Hour ? 9 : 9;
    return use24Hour ? value.hours : to12Hour(value.hours).hour;
  });

  const [selectedMinute, setSelectedMinute] = useState<number>(() => {
    if (!value) return 0;
    return value.minutes;
  });

  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(() => {
    if (!value) return 'AM';
    return to12Hour(value.hours).period;
  });

  const hours = use24Hour ? get24Hours() : get12Hours();
  const minutes = getMinutes(minuteInterval);

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

  // Update local state when value changes
  useEffect(() => {
    if (value) {
      if (use24Hour) {
        setSelectedHour(value.hours);
      } else {
        const { hour, period } = to12Hour(value.hours);
        setSelectedHour(hour);
        setSelectedPeriod(period);
      }
      setSelectedMinute(value.minutes);
    }
  }, [value, use24Hour]);

  // Reset state when opening
  useEffect(() => {
    if (open && value) {
      if (use24Hour) {
        setSelectedHour(value.hours);
      } else {
        const { hour, period } = to12Hour(value.hours);
        setSelectedHour(hour);
        setSelectedPeriod(period);
      }
      setSelectedMinute(value.minutes);
    }
  }, [open, value, use24Hour]);

  const handleConfirm = () => {
    let hours24: number;
    if (use24Hour) {
      hours24 = selectedHour;
    } else {
      hours24 = to24Hour(selectedHour, selectedPeriod);
    }

    const newValue: TimeValue = {
      hours: hours24,
      minutes: selectedMinute,
    };

    onChange?.(newValue);
    setOpen(false);
  };

  const get24HourValue = (): number => {
    if (use24Hour) return selectedHour;
    return to24Hour(selectedHour, selectedPeriod);
  };

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
        <span className="mr-2">🕐</span>
        <span className={`flex-1 text-left ${value ? 'text-[var(--input-text)]' : 'text-[var(--input-placeholder)]'}`}>
          {value ? formatTime(value, timeFormat, use24Hour) : placeholder}
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
          <div className="p-4">
            {/* Wheels Container */}
            <div className="flex items-center justify-center gap-2">
              {/* Hour Wheel */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-[var(--component-text-muted)] mb-2">Hour</span>
                <div className="h-[220px] overflow-auto scrollbar-thin">
                  <div className="flex flex-col gap-1">
                    {hours.map((hour) => {
                      const isSelected = selectedHour === hour;

                      return (
                        <button
                          key={hour}
                          type="button"
                          onClick={() => setSelectedHour(hour)}
                          className={`
                            w-14 h-11 flex items-center justify-center text-lg font-medium rounded-md transition-colors
                            ${isSelected
                              ? 'bg-[var(--track-fill)] text-white'
                              : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                            }
                          `}
                        >
                          {use24Hour ? String(hour).padStart(2, '0') : hour}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Separator */}
              <span className="text-xl font-semibold text-[var(--component-text)] mt-6">:</span>

              {/* Minute Wheel */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-[var(--component-text-muted)] mb-2">Min</span>
                <div className="h-[220px] overflow-auto scrollbar-thin">
                  <div className="flex flex-col gap-1">
                    {minutes.map((minute) => {
                      const isSelected = selectedMinute === minute;
                      const isDisabled = isTimeDisabled(
                        { hours: get24HourValue(), minutes: minute },
                        minTime,
                        maxTime
                      );

                      return (
                        <button
                          key={minute}
                          type="button"
                          onClick={() => !isDisabled && setSelectedMinute(minute)}
                          disabled={isDisabled}
                          className={`
                            w-14 h-11 flex items-center justify-center text-lg font-medium rounded-md transition-colors
                            ${isSelected
                              ? 'bg-[var(--track-fill)] text-white'
                              : isDisabled
                              ? 'text-[var(--component-text-muted)] opacity-40 cursor-not-allowed'
                              : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                            }
                          `}
                        >
                          {String(minute).padStart(2, '0')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* AM/PM (only for 12-hour format) */}
              {!use24Hour && (
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-[var(--component-text-muted)] mb-2">&nbsp;</span>
                  <div className="flex flex-col gap-2 mt-16">
                    {(['AM', 'PM'] as const).map((period) => {
                      const isSelected = selectedPeriod === period;

                      return (
                        <button
                          key={period}
                          type="button"
                          onClick={() => setSelectedPeriod(period)}
                          className={`
                            px-3 py-2 text-sm font-medium rounded-md transition-colors
                            ${isSelected
                              ? 'bg-[var(--track-fill)] text-white'
                              : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                            }
                          `}
                        >
                          {period}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full mt-4 py-3 rounded-md bg-[var(--track-fill)] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Preview Components

export function TimePickerBasicPreview() {
  const [time, setTime] = useState<TimeValue | null>(null);

  return (
    <div className="w-64 min-h-[380px]">
      <TimePicker
        value={time}
        onChange={setTime}
        placeholder="Select time..."
      />
    </div>
  );
}

export function TimePickerWithDefaultPreview() {
  const [time, setTime] = useState<TimeValue | null>({ hours: 14, minutes: 30 });

  return (
    <div className="w-64 min-h-[380px]">
      <TimePicker
        value={time}
        onChange={setTime}
      />
    </div>
  );
}

export function TimePicker24HourPreview() {
  const [time, setTime] = useState<TimeValue | null>({ hours: 14, minutes: 30 });

  return (
    <div className="w-64 space-y-2 min-h-[380px]">
      <TimePicker
        value={time}
        onChange={setTime}
        use24Hour
      />
      <p className="text-xs text-[var(--component-text-muted)]">
        24-hour format
      </p>
    </div>
  );
}

export function TimePickerWithIntervalPreview() {
  const [time, setTime] = useState<TimeValue | null>(null);

  return (
    <div className="w-64 space-y-2 min-h-[380px]">
      <TimePicker
        value={time}
        onChange={setTime}
        minuteInterval={15}
        placeholder="Select time..."
      />
      <p className="text-xs text-[var(--component-text-muted)]">
        15-minute intervals
      </p>
    </div>
  );
}

export function TimePickerWithMinMaxPreview() {
  const [time, setTime] = useState<TimeValue | null>(null);

  return (
    <div className="w-64 space-y-2 min-h-[380px]">
      <TimePicker
        value={time}
        onChange={setTime}
        minTime={{ hours: 9, minutes: 0 }}
        maxTime={{ hours: 17, minutes: 0 }}
        placeholder="Business hours only..."
      />
      <p className="text-xs text-[var(--component-text-muted)]">
        9:00 AM - 5:00 PM only
      </p>
    </div>
  );
}

export function TimePickerDisabledPreview() {
  return (
    <div className="w-64">
      <TimePicker
        value={{ hours: 10, minutes: 30 }}
        disabled
      />
    </div>
  );
}

export function TimePickerCustomFormatPreview() {
  const [time, setTime] = useState<TimeValue | null>({ hours: 14, minutes: 30 });

  return (
    <div className="w-64 space-y-2 min-h-[380px]">
      <TimePicker
        value={time}
        onChange={setTime}
        format="HH:mm"
        use24Hour
      />
      <p className="text-xs text-[var(--component-text-muted)]">
        Format: HH:mm
      </p>
    </div>
  );
}
