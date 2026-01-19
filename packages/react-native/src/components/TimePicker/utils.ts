/**
 * TimePicker utility functions and constants
 */

export interface TimeValue {
  hours: number;
  minutes: number;
}

/**
 * Parse a Date to TimeValue
 */
export function dateToTime(date: Date | null): TimeValue | null {
  if (!date) return null;
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
}

/**
 * Create a Date from TimeValue (using today's date)
 */
export function timeToDate(time: TimeValue | null): Date | null {
  if (!time) return null;
  const date = new Date();
  date.setHours(time.hours, time.minutes, 0, 0);
  return date;
}

/**
 * Convert 24-hour to 12-hour format
 */
export function to12Hour(hours: number): { hour: number; period: 'AM' | 'PM' } {
  const period: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';
  let hour = hours % 12;
  if (hour === 0) hour = 12;
  return { hour, period };
}

/**
 * Convert 12-hour to 24-hour format
 */
export function to24Hour(hour: number, period: 'AM' | 'PM'): number {
  if (period === 'AM') {
    return hour === 12 ? 0 : hour;
  }
  return hour === 12 ? 12 : hour + 12;
}

/**
 * Format time to string
 */
export function formatTime(
  time: TimeValue | null,
  format: string = 'h:mm a',
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

/**
 * Get hours array for 12-hour format (1-12)
 */
export function get12Hours(): number[] {
  return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
}

/**
 * Get hours array for 24-hour format (0-23)
 */
export function get24Hours(): number[] {
  return Array.from({ length: 24 }, (_, i) => i);
}

/**
 * Get minutes array based on interval
 */
export function getMinutes(interval: number = 1): number[] {
  const minutes: number[] = [];
  for (let i = 0; i < 60; i += interval) {
    minutes.push(i);
  }
  return minutes;
}

/**
 * Round minutes to nearest interval
 */
export function roundToInterval(minutes: number, interval: number): number {
  return Math.round(minutes / interval) * interval % 60;
}

/**
 * Compare two TimeValues
 */
export function compareTime(a: TimeValue, b: TimeValue): number {
  const aMinutes = a.hours * 60 + a.minutes;
  const bMinutes = b.hours * 60 + b.minutes;
  return aMinutes - bMinutes;
}

/**
 * Check if time is within min/max bounds
 */
export function isTimeDisabled(
  time: TimeValue,
  minTime?: TimeValue,
  maxTime?: TimeValue
): boolean {
  if (minTime && compareTime(time, minTime) < 0) return true;
  if (maxTime && compareTime(time, maxTime) > 0) return true;
  return false;
}

/**
 * Check if a specific hour is disabled (any minute in that hour is disabled)
 */
export function isHourDisabled(
  hour: number,
  minTime?: TimeValue,
  maxTime?: TimeValue,
  use24Hour: boolean = true
): boolean {
  // For 12-hour format, we need to check both AM and PM
  if (!use24Hour) {
    // Check if both AM and PM versions are disabled
    const amHour = hour === 12 ? 0 : hour;
    const pmHour = hour === 12 ? 12 : hour + 12;

    const amDisabled = isTimeDisabled({ hours: amHour, minutes: 0 }, minTime, maxTime) &&
                       isTimeDisabled({ hours: amHour, minutes: 59 }, minTime, maxTime);
    const pmDisabled = isTimeDisabled({ hours: pmHour, minutes: 0 }, minTime, maxTime) &&
                       isTimeDisabled({ hours: pmHour, minutes: 59 }, minTime, maxTime);

    return amDisabled && pmDisabled;
  }

  // For 24-hour format, check if the entire hour is disabled
  const hourStart: TimeValue = { hours: hour, minutes: 0 };
  const hourEnd: TimeValue = { hours: hour, minutes: 59 };

  return isTimeDisabled(hourStart, minTime, maxTime) &&
         isTimeDisabled(hourEnd, minTime, maxTime);
}

/**
 * Check if a specific minute is disabled for the given hour
 */
export function isMinuteDisabled(
  hour: number,
  minute: number,
  minTime?: TimeValue,
  maxTime?: TimeValue
): boolean {
  return isTimeDisabled({ hours: hour, minutes: minute }, minTime, maxTime);
}

export type TimeInterval = 1 | 5 | 15 | 30 | 60;

export interface TimeSlot {
  time: TimeValue;
  label: string;
  disabled: boolean;
}

/**
 * Generate time slots based on interval
 */
export function generateTimeSlots(
  interval: TimeInterval = 30,
  use24Hour: boolean = false,
  minTime?: TimeValue,
  maxTime?: TimeValue,
  disabledTimes?: (time: TimeValue) => boolean
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const totalMinutesInDay = 24 * 60;

  for (let minutes = 0; minutes < totalMinutesInDay; minutes += interval) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const time: TimeValue = { hours, minutes: mins };

    // Check if disabled by min/max bounds
    const isOutOfBounds = isTimeDisabled(time, minTime, maxTime);

    // Check if disabled by custom function
    const isCustomDisabled = disabledTimes ? disabledTimes(time) : false;

    // Format the label
    const label = formatTime(time, use24Hour ? 'HH:mm' : 'h:mm A', use24Hour);

    slots.push({
      time,
      label,
      disabled: isOutOfBounds || isCustomDisabled,
    });
  }

  return slots;
}

/**
 * Find the index of the slot closest to the given time
 */
export function findClosestSlotIndex(
  slots: TimeSlot[],
  time: TimeValue | null
): number {
  if (!time || slots.length === 0) {
    // Default to current time or first slot
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let closestIndex = 0;
    let closestDiff = Infinity;

    slots.forEach((slot, index) => {
      const slotMinutes = slot.time.hours * 60 + slot.time.minutes;
      const diff = Math.abs(slotMinutes - currentMinutes);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  const targetMinutes = time.hours * 60 + time.minutes;

  let closestIndex = 0;
  let closestDiff = Infinity;

  slots.forEach((slot, index) => {
    const slotMinutes = slot.time.hours * 60 + slot.time.minutes;
    const diff = Math.abs(slotMinutes - targetMinutes);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = index;
    }
  });

  return closestIndex;
}

/**
 * Check if two TimeValues are equal
 */
export function isTimeEqual(a: TimeValue | null, b: TimeValue | null): boolean {
  if (!a || !b) return a === b;
  return a.hours === b.hours && a.minutes === b.minutes;
}
