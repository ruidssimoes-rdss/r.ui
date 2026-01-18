'use client';

import { useState } from 'react';

/**
 * Switch Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function SwitchTrack({ checked, disabled, onClick }: { checked: boolean; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
        transition-colors duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--switch-bg-checked)] focus-visible:ring-offset-2
        ${checked ? 'bg-[var(--switch-bg-checked)]' : 'bg-[var(--switch-bg)]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full bg-[var(--switch-thumb)] shadow-lg
          ring-0 transition duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}

export function SwitchBasicPreview() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-row items-center gap-3">
      <SwitchTrack checked={checked} onClick={() => setChecked(!checked)} />
      <span className="text-sm text-[var(--component-text-muted)]">
        {checked ? 'On' : 'Off'}
      </span>
    </div>
  );
}

export function SwitchWithLabelPreview() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[var(--component-text)]">Push Notifications</span>
          <span className="text-xs text-[var(--component-text-muted)]">Receive push notifications on your device</span>
        </div>
        <SwitchTrack checked={notifications} onClick={() => setNotifications(!notifications)} />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[var(--component-text)]">Marketing Emails</span>
          <span className="text-xs text-[var(--component-text-muted)]">Receive emails about new products and features</span>
        </div>
        <SwitchTrack checked={marketing} onClick={() => setMarketing(!marketing)} />
      </div>
    </div>
  );
}

export function SwitchDisabledPreview() {
  return (
    <div className="flex flex-row gap-4">
      <SwitchTrack checked={false} disabled />
      <SwitchTrack checked={true} disabled />
    </div>
  );
}
