'use client';

import { useState } from 'react';

/**
 * Input Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const inputBaseStyles = `
  w-full rounded-lg border bg-[var(--input-bg)] border-[var(--input-border)]
  text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-[var(--switch-bg-checked)] focus:border-transparent
`;

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-3 text-base',
};

export function InputBasicPreview() {
  const [value, setValue] = useState('');

  return (
    <input
      type="email"
      placeholder="Enter your email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`${inputBaseStyles} ${sizeStyles.md}`}
    />
  );
}

export function InputWithLabelPreview() {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--component-text)]">Email</label>
      <input
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${inputBaseStyles} ${sizeStyles.md}`}
      />
      <span className="text-xs text-[var(--component-text-muted)]">We'll never share your email.</span>
    </div>
  );
}

export function InputErrorPreview() {
  const [value, setValue] = useState('invalid-email');

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--component-text)]">Email</label>
      <input
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${inputBaseStyles} ${sizeStyles.md} !border-red-500 focus:!ring-red-500`}
      />
      <span className="text-xs text-red-500">Please enter a valid email address</span>
    </div>
  );
}

export function InputSizesPreview() {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Small input"
        className={`${inputBaseStyles} ${sizeStyles.sm}`}
      />
      <input
        type="text"
        placeholder="Medium input (default)"
        className={`${inputBaseStyles} ${sizeStyles.md}`}
      />
      <input
        type="text"
        placeholder="Large input"
        className={`${inputBaseStyles} ${sizeStyles.lg}`}
      />
    </div>
  );
}

export function InputDisabledPreview() {
  return (
    <input
      type="text"
      placeholder="Disabled input"
      value="Can't edit this"
      disabled
      className={`${inputBaseStyles} ${sizeStyles.md} opacity-50 cursor-not-allowed`}
    />
  );
}
