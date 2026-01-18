'use client';

import { useState } from 'react';

/**
 * Slider Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function SliderTrack({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  label,
}: {
  value: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    let newValue = value;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, value + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, value - step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }
    e.preventDefault();
    onChange?.(newValue);
  };

  return (
    <div className={`relative w-full ${disabled ? 'opacity-50' : ''}`}>
      <div
        role="slider"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label || 'Slider'}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        className="relative h-2 w-full cursor-pointer rounded-full bg-[var(--track-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--track-fill)] focus-visible:ring-offset-2"
        onClick={(e) => {
          if (disabled) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const newValue = Math.round((x / rect.width) * (max - min) + min);
          onChange?.(Math.min(max, Math.max(min, newValue)));
        }}
      >
        <div
          className="absolute h-full rounded-full bg-[var(--track-fill)] transition-all"
          style={{ width: `${percentage}%` }}
        />
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 -translate-x-1/2
            h-5 w-5 rounded-full bg-white shadow-md border border-[var(--component-border)]
            transition-transform hover:scale-110
            ${disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}
          `}
          style={{ left: `${percentage}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function SliderBasicPreview() {
  const [value, setValue] = useState(50);

  return (
    <div className="flex flex-col gap-2 w-full">
      <SliderTrack value={value} onChange={setValue} />
      <span className="text-sm text-[var(--component-text-muted)]">Value: {value}</span>
    </div>
  );
}

export function SliderWithLabelsPreview() {
  const [value, setValue] = useState(25);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-[var(--component-text)]">Volume</span>
        <span className="text-sm text-[var(--component-text-muted)]">{value}%</span>
      </div>
      <SliderTrack value={value} onChange={setValue} label="Volume" />
    </div>
  );
}

export function SliderRangePreview() {
  const [value, setValue] = useState(500);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-[var(--component-text)]">Price Range</span>
        <span className="text-sm text-[var(--component-text-muted)]">${value}</span>
      </div>
      <SliderTrack value={value} onChange={setValue} min={0} max={1000} step={50} label="Price Range" />
      <div className="flex justify-between text-xs text-[var(--component-text-muted)]">
        <span>$0</span>
        <span>$1000</span>
      </div>
    </div>
  );
}

export function SliderDisabledPreview() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <SliderTrack value={60} disabled />
      <span className="text-sm text-[var(--component-text-muted)]">Disabled</span>
    </div>
  );
}
