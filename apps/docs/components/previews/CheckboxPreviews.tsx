'use client';

import { useState } from 'react';

/**
 * Checkbox Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function CheckboxInput({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`
        h-5 w-5 shrink-0 rounded border-2 transition-colors duration-200
        flex items-center justify-center
        ${checked
          ? 'bg-[var(--checkbox-bg-checked)] border-[var(--checkbox-bg-checked)]'
          : 'bg-transparent border-[var(--checkbox-border)]'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[var(--checkbox-bg-checked)]'}
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--checkbox-bg-checked)] focus-visible:ring-offset-2
      `}
    >
      {checked && (
        <svg
          className="h-3 w-3 text-[var(--checkbox-check)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}

export function CheckboxBasicPreview() {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex flex-row items-center gap-2 cursor-pointer">
      <CheckboxInput checked={checked} onChange={setChecked} />
      <span className="text-sm text-[var(--component-text)]">Accept terms and conditions</span>
    </label>
  );
}

export function CheckboxWithLabelPreview() {
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-row items-center gap-2 cursor-pointer">
        <CheckboxInput checked={terms} onChange={setTerms} />
        <span className="text-sm text-[var(--component-text)]">I accept the terms and conditions</span>
      </label>
      <div className="flex flex-row items-start gap-2">
        <CheckboxInput checked={newsletter} onChange={setNewsletter} />
        <div className="flex flex-col">
          <span className="text-sm text-[var(--component-text)]">Subscribe to newsletter</span>
          <span className="text-xs text-[var(--component-text-muted)]">Receive weekly updates about new features</span>
        </div>
      </div>
    </div>
  );
}

export function CheckboxDisabledPreview() {
  return (
    <div className="flex flex-row gap-4">
      <CheckboxInput checked={false} disabled />
      <CheckboxInput checked={true} disabled />
    </div>
  );
}
