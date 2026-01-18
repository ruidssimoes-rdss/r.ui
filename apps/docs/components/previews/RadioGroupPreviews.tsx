'use client';

import { useState } from 'react';

/**
 * RadioGroup Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

function RadioGroup({
  options,
  value,
  onChange,
  name,
}: {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
}) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`
            flex items-start gap-3 cursor-pointer
            ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="flex items-center h-5">
            <button
              type="button"
              role="radio"
              aria-checked={value === option.value}
              disabled={option.disabled}
              onClick={() => !option.disabled && onChange?.(option.value)}
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                ${value === option.value
                  ? 'border-[var(--track-fill)] bg-[var(--track-fill)]'
                  : 'border-[var(--checkbox-border)] bg-transparent hover:border-[var(--track-fill)]'
                }
                ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--track-fill)] focus-visible:ring-offset-2
              `}
            >
              {value === option.value && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </button>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--component-text)]">{option.label}</span>
            {option.description && (
              <span className="text-xs text-[var(--component-text-muted)]">{option.description}</span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

export function RadioGroupBasicPreview() {
  const [value, setValue] = useState('option1');

  return (
    <RadioGroup
      name="basic"
      value={value}
      onChange={setValue}
      options={[
        { value: 'option1', label: 'Default' },
        { value: 'option2', label: 'Comfortable' },
        { value: 'option3', label: 'Compact' },
      ]}
    />
  );
}

export function RadioGroupWithDescriptionsPreview() {
  const [value, setValue] = useState('card');

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[var(--component-text)]">Payment Method</label>
      <RadioGroup
        name="payment"
        value={value}
        onChange={setValue}
        options={[
          { value: 'card', label: 'Credit Card', description: 'Pay with Visa, Mastercard, or American Express' },
          { value: 'paypal', label: 'PayPal', description: 'Pay using your PayPal account' },
          { value: 'bank', label: 'Bank Transfer', description: 'Direct transfer from your bank account' },
        ]}
      />
    </div>
  );
}

export function RadioGroupDisabledPreview() {
  const [value, setValue] = useState('free');

  return (
    <RadioGroup
      name="plans"
      value={value}
      onChange={setValue}
      options={[
        { value: 'free', label: 'Free Plan', description: 'Basic features' },
        { value: 'pro', label: 'Pro Plan', description: 'Advanced features', disabled: true },
        { value: 'enterprise', label: 'Enterprise', description: 'Custom solutions', disabled: true },
      ]}
    />
  );
}

function RadioCard({
  options,
  value,
  onChange,
}: {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => !option.disabled && onChange?.(option.value)}
          disabled={option.disabled}
          className={`
            p-4 rounded-lg border text-left transition-all
            ${value === option.value
              ? 'border-[var(--track-fill)] bg-[var(--track-fill)]/5 ring-2 ring-[var(--track-fill)]'
              : 'border-[var(--component-border)] hover:border-[var(--component-border-muted)]'
            }
            ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div className="font-medium text-sm text-[var(--component-text)]">{option.label}</div>
          {option.description && (
            <div className="text-xs text-[var(--component-text-muted)] mt-1">{option.description}</div>
          )}
        </button>
      ))}
    </div>
  );
}

export function RadioGroupCardsPreview() {
  const [value, setValue] = useState('startup');

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[var(--component-text)]">Select a plan</label>
      <RadioCard
        value={value}
        onChange={setValue}
        options={[
          { value: 'startup', label: 'Startup', description: '$29/month' },
          { value: 'business', label: 'Business', description: '$99/month' },
          { value: 'enterprise', label: 'Enterprise', description: 'Custom pricing' },
        ]}
      />
    </div>
  );
}
