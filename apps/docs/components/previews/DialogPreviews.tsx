'use client';

import { useState } from 'react';

/**
 * Dialog Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const buttonStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] px-4 py-2 text-sm';

function Dialog({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog content */}
      <div className="relative z-10 w-full max-w-md mx-4 p-6 rounded-xl bg-[var(--component-bg)] border border-[var(--component-border)] shadow-xl animate-in zoom-in-95 fade-in duration-200">
        {children}
      </div>
    </div>
  );
}

export function DialogBasicPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Open Dialog
      </button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--component-text)]">Dialog Title</h3>
            <p className="text-sm text-[var(--component-text-muted)] mt-1">
              This is a basic dialog with a title and description.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
            >
              Continue
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export function DialogWithFormPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Edit Profile
      </button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--component-text)]">Edit Profile</h3>
            <p className="text-sm text-[var(--component-text-muted)] mt-1">
              Make changes to your profile here.
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-[var(--component-text)]">Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--component-text)]">Email</label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setOpen(false)}
              className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export function DialogAlertPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${buttonStyles} bg-[var(--btn-destructive-bg)] text-[var(--btn-destructive-text)]`}
      >
        Delete Account
      </button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--component-text)]">Delete Account</h3>
              <p className="text-sm text-[var(--component-text-muted)] mt-1">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className={`${buttonStyles} bg-[var(--btn-destructive-bg)] text-[var(--btn-destructive-text)]`}
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

function XIconSvg({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function DialogWithClose({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog content */}
      <div className="relative z-10 w-full max-w-md mx-4 p-6 rounded-xl bg-[var(--component-bg)] border border-[var(--component-border)] shadow-xl animate-in zoom-in-95 fade-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md text-[var(--component-text-muted)] hover:text-[var(--component-text)] hover:bg-[var(--component-bg-hover)] transition-colors"
          aria-label="Close dialog"
        >
          <XIconSvg className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export function DialogWithCloseButtonPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Open Dialog with Close Button
      </button>

      <DialogWithClose open={open} onClose={() => setOpen(false)}>
        <div className="space-y-4 pr-8">
          <div>
            <h3 className="text-lg font-semibold text-[var(--component-text)]">Dialog with Close Button</h3>
            <p className="text-sm text-[var(--component-text-muted)] mt-1">
              Click the X in the corner to close this dialog. This provides a familiar pattern for users who expect a close button.
            </p>
          </div>
          <p className="text-sm text-[var(--component-text-muted)]">
            The close button is positioned in the top-right corner with proper spacing and hover states.
          </p>
        </div>
      </DialogWithClose>
    </>
  );
}

export function DialogCloseButtonComparisonPreview() {
  const [withoutX, setWithoutX] = useState(false);
  const [withX, setWithX] = useState(false);

  return (
    <div className="flex gap-3">
      <button
        onClick={() => setWithoutX(true)}
        className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
      >
        Without X
      </button>
      <button
        onClick={() => setWithX(true)}
        className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        With X
      </button>

      <Dialog open={withoutX} onClose={() => setWithoutX(false)}>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--component-text)]">No Close Button</h3>
            <p className="text-sm text-[var(--component-text-muted)] mt-1">
              This dialog requires clicking a button to close.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setWithoutX(false)}
              className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>

      <DialogWithClose open={withX} onClose={() => setWithX(false)}>
        <div className="space-y-4 pr-8">
          <div>
            <h3 className="text-lg font-semibold text-[var(--component-text)]">With Close Button</h3>
            <p className="text-sm text-[var(--component-text-muted)] mt-1">
              This dialog has a built-in X button in the corner.
            </p>
          </div>
        </div>
      </DialogWithClose>
    </div>
  );
}
