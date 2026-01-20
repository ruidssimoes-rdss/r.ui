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

// Icon components for previews
function SearchIconSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function XIconSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function MailIconSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIconSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIconSvg({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const inputWithIconStyles = `
  w-full rounded-lg border bg-[var(--input-bg)] border-[var(--input-border)]
  text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-[var(--switch-bg-checked)] focus:border-transparent
`;

export function InputWithLeftIconPreview() {
  const [value, setValue] = useState('');

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)]">
        <MailIconSvg className="w-[18px] h-[18px]" />
      </div>
      <input
        type="email"
        placeholder="Email address"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${inputWithIconStyles} ${sizeStyles.md} pl-10`}
      />
    </div>
  );
}

export function InputWithRightIconPreview() {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${inputWithIconStyles} ${sizeStyles.md} pr-10`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)] hover:text-[var(--input-text)] transition-colors"
      >
        {showPassword ? <EyeOffIconSvg className="w-[18px] h-[18px]" /> : <EyeIconSvg className="w-[18px] h-[18px]" />}
      </button>
    </div>
  );
}

export function InputWithBothIconsPreview() {
  const [value, setValue] = useState('');

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)]">
        <SearchIconSvg className="w-[18px] h-[18px]" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${inputWithIconStyles} ${sizeStyles.md} pl-10 pr-10`}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)] hover:text-[var(--input-text)] transition-colors"
        >
          <XIconSvg className="w-[18px] h-[18px]" />
        </button>
      )}
    </div>
  );
}

export function SearchInputPreview() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)]">
        <SearchIconSvg className="w-[18px] h-[18px]" />
      </div>
      <input
        type="text"
        placeholder="Search components..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`${inputWithIconStyles} ${sizeStyles.md} pl-10 pr-10`}
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)] hover:text-[var(--input-text)] transition-colors"
        >
          <XIconSvg className="w-[18px] h-[18px]" />
        </button>
      )}
    </div>
  );
}

export function PasswordInputPreview() {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--component-text)]">Password</label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputWithIconStyles} ${sizeStyles.md} pr-10`}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)] hover:text-[var(--input-text)] transition-colors"
        >
          {visible ? <EyeOffIconSvg className="w-[18px] h-[18px]" /> : <EyeIconSvg className="w-[18px] h-[18px]" />}
        </button>
      </div>
    </div>
  );
}

export function InputIconSizesPreview() {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)]">
          <SearchIconSvg className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder="Small with icon"
          className={`${inputWithIconStyles} ${sizeStyles.sm} pl-8`}
        />
      </div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)]">
          <SearchIconSvg className="w-[18px] h-[18px]" />
        </div>
        <input
          type="text"
          placeholder="Medium with icon (default)"
          className={`${inputWithIconStyles} ${sizeStyles.md} pl-10`}
        />
      </div>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)]">
          <SearchIconSvg className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Large with icon"
          className={`${inputWithIconStyles} ${sizeStyles.lg} pl-11`}
        />
      </div>
    </div>
  );
}

export function InputWithIconErrorPreview() {
  const [value, setValue] = useState('invalid-email');

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--component-text)]">Email</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">
          <MailIconSvg className="w-[18px] h-[18px]" />
        </div>
        <input
          type="email"
          placeholder="Email address"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${inputWithIconStyles} ${sizeStyles.md} pl-10 !border-red-500 focus:!ring-red-500`}
        />
      </div>
      <span className="text-xs text-red-500">Please enter a valid email address</span>
    </div>
  );
}
