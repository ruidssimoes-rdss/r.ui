'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * Select Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
}: {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg border
          bg-[var(--input-bg)] border-[var(--input-border)] transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[var(--component-border-muted)]'}
          ${open ? 'ring-2 ring-[var(--track-fill)] border-transparent' : ''}
        `}
      >
        <span className={selectedOption ? 'text-[var(--input-text)]' : 'text-[var(--input-placeholder)]'}>
          {selectedOption?.label || placeholder}
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

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 py-1 rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] shadow-lg animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              disabled={option.disabled}
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className={`
                w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors
                ${option.disabled
                  ? 'text-[var(--component-text-muted)] cursor-not-allowed'
                  : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                }
                ${option.value === value ? 'bg-[var(--component-bg-elevated)]' : ''}
              `}
            >
              {option.label}
              {option.value === value && (
                <svg className="w-4 h-4 text-[var(--track-fill)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SelectBasicPreview() {
  const [value, setValue] = useState<string>();

  return (
    <div className="w-64">
      <Select
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'orange', label: 'Orange' },
          { value: 'grape', label: 'Grape' },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select a fruit"
      />
    </div>
  );
}

export function SelectWithLabelPreview() {
  const [value, setValue] = useState<string>('react');

  return (
    <div className="w-64 space-y-1.5">
      <label className="text-sm font-medium text-[var(--component-text)]">Framework</label>
      <Select
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'angular', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
        ]}
        value={value}
        onChange={setValue}
      />
      <p className="text-xs text-[var(--component-text-muted)]">Choose your preferred framework.</p>
    </div>
  );
}

export function SelectDisabledOptionsPreview() {
  const [value, setValue] = useState<string>();

  return (
    <div className="w-64">
      <Select
        options={[
          { value: 'free', label: 'Free Plan' },
          { value: 'pro', label: 'Pro Plan', disabled: true },
          { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select a plan"
      />
    </div>
  );
}

export function SelectDisabledPreview() {
  return (
    <div className="w-64">
      <Select
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
        value="option1"
        disabled
      />
    </div>
  );
}
