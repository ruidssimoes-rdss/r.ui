'use client';

import { useState } from 'react';

/**
 * Textarea Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const textareaBaseStyles = `
  w-full rounded-lg border bg-[var(--input-bg)] border-[var(--input-border)]
  text-[var(--input-text)] placeholder:text-[var(--input-placeholder)]
  transition-colors duration-200 resize-none
  focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)] focus:border-transparent
`;

export function TextareaBasicPreview() {
  const [value, setValue] = useState('');

  return (
    <textarea
      placeholder="Type your message here..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={4}
      className={`${textareaBaseStyles} px-3 py-2 text-sm`}
    />
  );
}

export function TextareaWithLabelPreview() {
  const [value, setValue] = useState('');
  const maxLength = 200;

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-[var(--component-text)]">Bio</label>
      <textarea
        placeholder="Tell us about yourself..."
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
        rows={4}
        className={`${textareaBaseStyles} px-3 py-2 text-sm`}
      />
      <div className="flex justify-between">
        <span className="text-xs text-[var(--component-text-muted)]">Write a short bio about yourself.</span>
        <span className={`text-xs ${value.length >= maxLength ? 'text-red-500' : 'text-[var(--component-text-muted)]'}`}>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

export function TextareaDisabledPreview() {
  return (
    <textarea
      placeholder="Disabled textarea"
      value="This textarea is disabled and cannot be edited."
      disabled
      rows={3}
      className={`${textareaBaseStyles} px-3 py-2 text-sm opacity-50 cursor-not-allowed`}
    />
  );
}

export function TextareaErrorPreview() {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-[var(--component-text)]">Feedback</label>
      <textarea
        placeholder="Your feedback..."
        defaultValue="x"
        rows={3}
        className={`${textareaBaseStyles} px-3 py-2 text-sm !border-red-500 focus:!ring-red-500`}
      />
      <span className="text-xs text-red-500">Feedback must be at least 10 characters.</span>
    </div>
  );
}
