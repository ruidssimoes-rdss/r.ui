'use client';

/**
 * Label Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function LabelBasicPreview() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--component-text)]">
        Email address
      </label>
      <p className="text-xs text-[var(--component-text-muted)]">
        Labels provide accessible names for form controls.
      </p>
    </div>
  );
}

export function LabelWithInputPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-[var(--component-text)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full px-3 py-2 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)] focus:border-transparent"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-[var(--component-text)]">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)] focus:border-transparent"
        />
      </div>
    </div>
  );
}

export function LabelRequiredPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium text-[var(--component-text)]">
          Full name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          required
          className="w-full px-3 py-2 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)] focus:border-transparent"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="company" className="text-sm font-medium text-[var(--component-text)]">
          Company <span className="text-[var(--component-text-muted)]">(optional)</span>
        </label>
        <input
          id="company"
          type="text"
          placeholder="Acme Inc."
          className="w-full px-3 py-2 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--track-fill)] focus:border-transparent"
        />
      </div>
    </div>
  );
}
