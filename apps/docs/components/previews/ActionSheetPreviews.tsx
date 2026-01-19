'use client';

import { useState } from 'react';

/**
 * ActionSheet Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function ActionSheetBase({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[var(--component-bg)] rounded-t-2xl border-t border-x border-[var(--component-border)] w-full max-w-md mx-4 mb-0 p-2 pb-6 animate-slide-up">
        <div className="w-12 h-1 bg-[var(--component-border)] rounded-full mx-auto mb-4" />
        {children}
      </div>
    </div>
  );
}

export function ActionSheetBasicPreview() {
  const [open, setOpen] = useState(false);

  const actions = [
    { label: 'Share', icon: '↗' },
    { label: 'Add to Favorites', icon: '★' },
    { label: 'Download', icon: '↓' },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-[var(--track-fill)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Show Actions
      </button>
      <ActionSheetBase open={open} onClose={() => setOpen(false)}>
        <div className="space-y-1">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
            >
              <span className="text-lg">{action.icon}</span>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </ActionSheetBase>
    </>
  );
}

export function ActionSheetDestructivePreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg border border-[var(--component-border)] text-[var(--component-text)] text-sm font-medium hover:bg-[var(--component-bg-elevated)] transition-colors"
      >
        More Options
      </button>
      <ActionSheetBase open={open} onClose={() => setOpen(false)}>
        <div className="space-y-1">
          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
          >
            <span className="text-lg">✏️</span>
            <span className="text-sm font-medium">Edit</span>
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
          >
            <span className="text-lg">📋</span>
            <span className="text-sm font-medium">Duplicate</span>
          </button>
          <div className="my-2 h-px bg-[var(--component-border)]" />
          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <span className="text-lg">🗑️</span>
            <span className="text-sm font-medium">Delete</span>
          </button>
        </div>
      </ActionSheetBase>
    </>
  );
}

export function ActionSheetWithCancelPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-[var(--track-fill)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Share Photo
      </button>
      <ActionSheetBase open={open} onClose={() => setOpen(false)}>
        <div className="space-y-1">
          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
          >
            <span className="text-lg">💬</span>
            <span className="text-sm font-medium">Message</span>
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
          >
            <span className="text-lg">📧</span>
            <span className="text-sm font-medium">Email</span>
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
          >
            <span className="text-lg">🔗</span>
            <span className="text-sm font-medium">Copy Link</span>
          </button>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="w-full mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-[var(--track-fill)] bg-[var(--component-bg-elevated)] hover:opacity-80 transition-opacity"
        >
          Cancel
        </button>
      </ActionSheetBase>
    </>
  );
}
