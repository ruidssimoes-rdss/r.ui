'use client';

import { useState } from 'react';

/**
 * Sheet Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const buttonStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] px-4 py-2 text-sm';

function Sheet({
  open,
  onClose,
  side = 'right',
  children,
}: {
  open: boolean;
  onClose: () => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  children: React.ReactNode;
}) {
  if (!open) return null;

  const sideStyles = {
    left: 'inset-y-0 left-0 h-full w-80 animate-in slide-in-from-left',
    right: 'inset-y-0 right-0 h-full w-80 animate-in slide-in-from-right',
    top: 'inset-x-0 top-0 w-full h-auto max-h-[80vh] animate-in slide-in-from-top',
    bottom: 'inset-x-0 bottom-0 w-full h-auto max-h-[80vh] animate-in slide-in-from-bottom rounded-t-xl',
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      {/* Sheet content */}
      <div
        className={`
          absolute bg-[var(--component-bg)] border-[var(--component-border)] shadow-xl
          ${side === 'left' || side === 'right' ? 'border-l border-r' : 'border-t border-b'}
          ${sideStyles[side]}
          duration-300
        `}
      >
        {children}
      </div>
    </div>
  );
}

export function SheetBasicPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Open Sheet
      </button>

      <Sheet open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[var(--component-border)]">
            <h3 className="text-lg font-semibold text-[var(--component-text)]">Sheet Title</h3>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors"
            >
              <svg className="w-5 h-5 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <p className="text-sm text-[var(--component-text-muted)]">
              This is a sheet component that slides in from the side. It's great for navigation menus, filters, or any secondary content.
            </p>
          </div>
        </div>
      </Sheet>
    </>
  );
}

export function SheetBottomPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Open Bottom Sheet
      </button>

      <Sheet open={open} onClose={() => setOpen(false)} side="bottom">
        <div className="p-4">
          {/* Handle */}
          <div className="w-12 h-1.5 rounded-full bg-[var(--component-border)] mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-[var(--component-text)] mb-2">Share</h3>
          <p className="text-sm text-[var(--component-text-muted)] mb-4">
            Choose how you want to share this content.
          </p>

          <div className="grid grid-cols-4 gap-4 mb-4">
            {['Copy Link', 'Email', 'Twitter', 'Facebook'].map((item) => (
              <button
                key={item}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[var(--component-bg-elevated)] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--component-bg-elevated)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--component-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <span className="text-xs text-[var(--component-text)]">{item}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen(false)}
            className={`w-full ${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
          >
            Cancel
          </button>
        </div>
      </Sheet>
    </>
  );
}

export function SheetWithFormPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Add New Item
      </button>

      <Sheet open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[var(--component-border)]">
            <h3 className="text-lg font-semibold text-[var(--component-text)]">Add New Item</h3>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors"
            >
              <svg className="w-5 h-5 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-auto space-y-4">
            <div>
              <label className="text-sm font-medium text-[var(--component-text)]">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--component-text)]">Description</label>
              <textarea
                placeholder="Enter description"
                rows={3}
                className="mt-1 w-full px-3 py-2 text-sm rounded-lg border bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)] resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[var(--component-text)]">Category</label>
              <select className="mt-1 w-full px-3 py-2 text-sm rounded-lg border bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)]">
                <option>Select category</option>
                <option>Design</option>
                <option>Development</option>
                <option>Marketing</option>
              </select>
            </div>
          </div>

          <div className="p-4 border-t border-[var(--component-border)] flex gap-2">
            <button
              onClick={() => setOpen(false)}
              className={`flex-1 ${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className={`flex-1 ${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
            >
              Save
            </button>
          </div>
        </div>
      </Sheet>
    </>
  );
}
