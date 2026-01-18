'use client';

import { useState } from 'react';

/**
 * Toast Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const buttonStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] px-4 py-2 text-sm';

interface Toast {
  id: number;
  title: string;
  description?: string;
  variant: 'default' | 'success' | 'error';
}

const variantStyles = {
  default: 'bg-[var(--component-bg)] border-[var(--component-border)]',
  success: 'bg-[var(--component-bg)] border-emerald-500/30',
  error: 'bg-[var(--component-bg)] border-red-500/30',
};

const iconStyles = {
  default: null,
  success: (
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
      <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  ),
  error: (
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
      <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  ),
};

function ToastComponent({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-lg border shadow-lg
        animate-in slide-in-from-top-2 fade-in duration-200
        ${variantStyles[toast.variant]}
      `}
    >
      {iconStyles[toast.variant]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--component-text)]">{toast.title}</p>
        {toast.description && (
          <p className="text-sm text-[var(--component-text-muted)] mt-0.5">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="flex-shrink-0 text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastBasicPreview() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = () => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title: 'Event has been created', variant: 'default' }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div className="relative">
      <button
        onClick={addToast}
        className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Show Toast
      </button>

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onDismiss={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </div>
  );
}

export function ToastVariantsPreview() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (variant: Toast['variant'], title: string, description?: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addToast('default', 'Settings updated', 'Your preferences have been saved.')}
          className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
        >
          Default
        </button>
        <button
          onClick={() => addToast('success', 'Success!', 'Your changes have been saved.')}
          className={`${buttonStyles} bg-emerald-500 text-white`}
        >
          Success
        </button>
        <button
          onClick={() => addToast('error', 'Error', 'Something went wrong. Please try again.')}
          className={`${buttonStyles} bg-[var(--btn-destructive-bg)] text-[var(--btn-destructive-text)]`}
        >
          Error
        </button>
      </div>

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            toast={toast}
            onDismiss={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </div>
  );
}

export function ToastStaticPreview() {
  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${variantStyles.default}`}>
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--component-text)]">Scheduled: Catch up</p>
          <p className="text-sm text-[var(--component-text-muted)] mt-0.5">Friday, February 10, 2024 at 5:57 PM</p>
        </div>
      </div>
      <div className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${variantStyles.success}`}>
        {iconStyles.success}
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--component-text)]">Message sent</p>
        </div>
      </div>
      <div className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${variantStyles.error}`}>
        {iconStyles.error}
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--component-text)]">Failed to send</p>
          <p className="text-sm text-[var(--component-text-muted)] mt-0.5">Please check your connection.</p>
        </div>
      </div>
    </div>
  );
}
