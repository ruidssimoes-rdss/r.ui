'use client';

/**
 * Card Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const buttonStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] px-4 py-2 text-sm';

export function CardBasicPreview() {
  return (
    <div className="rounded-xl border border-[var(--component-border)] bg-[var(--component-bg)] p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-[var(--component-text)]">Card Title</h3>
      <p className="mt-2 text-sm text-[var(--component-text-muted)]">
        This is a basic card component with a title and description.
      </p>
    </div>
  );
}

export function CardWithHeaderPreview() {
  return (
    <div className="rounded-xl border border-[var(--component-border)] bg-[var(--component-bg)] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--component-border)]">
        <h3 className="text-lg font-semibold text-[var(--component-text)]">Notifications</h3>
        <p className="text-sm text-[var(--component-text-muted)]">You have 3 unread messages.</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
          <div>
            <p className="text-sm font-medium text-[var(--component-text)]">New comment on your post</p>
            <p className="text-xs text-[var(--component-text-muted)]">2 minutes ago</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
          <div>
            <p className="text-sm font-medium text-[var(--component-text)]">Your order has shipped</p>
            <p className="text-xs text-[var(--component-text-muted)]">1 hour ago</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 mt-2 rounded-full bg-amber-500" />
          <div>
            <p className="text-sm font-medium text-[var(--component-text)]">Payment reminder</p>
            <p className="text-xs text-[var(--component-text-muted)]">3 hours ago</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-[var(--component-border)] bg-[var(--component-bg-elevated)]">
        <button className="text-sm font-medium text-[var(--track-fill)] hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  );
}

export function CardWithImagePreview() {
  return (
    <div className="rounded-xl border border-[var(--component-border)] bg-[var(--component-bg)] shadow-sm overflow-hidden max-w-sm">
      <div className="h-40 bg-gradient-to-br from-[var(--track-fill)] to-purple-500" />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-[var(--component-text)]">Beautiful Sunset</h3>
        <p className="mt-2 text-sm text-[var(--component-text-muted)]">
          A stunning view of the sunset over the mountains.
        </p>
        <div className="mt-4 flex gap-2">
          <button className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}>
            View
          </button>
          <button className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export function CardInteractivePreview() {
  return (
    <button className="w-full text-left rounded-xl border border-[var(--component-border)] bg-[var(--component-bg)] p-6 shadow-sm transition-all hover:border-[var(--track-fill)] hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-[var(--track-fill)]/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-[var(--track-fill)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-[var(--component-text)]">Quick Start</h3>
          <p className="text-sm text-[var(--component-text-muted)]">Get up and running in minutes</p>
        </div>
        <svg className="w-5 h-5 ml-auto text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
