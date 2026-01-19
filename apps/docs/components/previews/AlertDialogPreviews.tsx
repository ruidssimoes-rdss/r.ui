'use client';

import { useState } from 'react';

/**
 * AlertDialog Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function AlertDialogBase({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[var(--component-bg)] rounded-xl border border-[var(--component-border)] shadow-xl max-w-md w-full mx-4 p-6">
        <h2 className="text-lg font-semibold text-[var(--component-text)]">{title}</h2>
        <p className="mt-2 text-sm text-[var(--component-text-muted)]">{description}</p>
        <div className="mt-6 flex justify-end gap-3">{children}</div>
      </div>
    </div>
  );
}

export function AlertDialogBasicPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-[var(--track-fill)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Show Alert Dialog
      </button>
      <AlertDialogBase
        open={open}
        onClose={() => setOpen(false)}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
      >
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-lg border border-[var(--component-border)] text-sm font-medium text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-lg bg-[var(--track-fill)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Continue
        </button>
      </AlertDialogBase>
    </>
  );
}

export function AlertDialogDestructivePreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
      >
        Delete Account
      </button>
      <AlertDialogBase
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Account"
        description="Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."
      >
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-lg border border-[var(--component-border)] text-sm font-medium text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Yes, delete account
        </button>
      </AlertDialogBase>
    </>
  );
}

export function AlertDialogWithInputPreview() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
      >
        Delete Project
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-[var(--component-bg)] rounded-xl border border-[var(--component-border)] shadow-xl max-w-md w-full mx-4 p-6">
            <h2 className="text-lg font-semibold text-[var(--component-text)]">Delete Project</h2>
            <p className="mt-2 text-sm text-[var(--component-text-muted)]">
              This action cannot be undone. Please type <span className="font-mono font-medium text-[var(--component-text)]">delete</span> to confirm.
            </p>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type 'delete' to confirm"
              className="mt-4 w-full px-3 py-2 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] text-[var(--component-text)] text-sm placeholder:text-[var(--component-text-muted)] focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  setValue('');
                }}
                className="px-4 py-2 rounded-lg border border-[var(--component-border)] text-sm font-medium text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setValue('');
                }}
                disabled={value !== 'delete'}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
