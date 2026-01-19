'use client';

/**
 * Separator Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function Separator({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) {
  if (orientation === 'vertical') {
    return <div className="w-px h-full bg-[var(--component-border)]" />;
  }
  return <div className="h-px w-full bg-[var(--component-border)]" />;
}

export function SeparatorBasicPreview() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-[var(--component-text)]">r/ui Components</h4>
        <p className="text-sm text-[var(--component-text-muted)]">
          A universal React Native component library.
        </p>
      </div>
      <Separator />
      <div className="flex gap-4 text-sm">
        <span className="text-[var(--component-text-muted)]">Blog</span>
        <span className="text-[var(--component-text-muted)]">Docs</span>
        <span className="text-[var(--component-text-muted)]">Source</span>
      </div>
    </div>
  );
}

export function SeparatorVerticalPreview() {
  return (
    <div className="flex items-center h-5 gap-4 text-sm">
      <span className="text-[var(--component-text)]">Blog</span>
      <Separator orientation="vertical" />
      <span className="text-[var(--component-text)]">Docs</span>
      <Separator orientation="vertical" />
      <span className="text-[var(--component-text)]">Source</span>
    </div>
  );
}

export function SeparatorWithLabelPreview() {
  return (
    <div className="relative">
      <Separator />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-[var(--component-bg)] text-xs text-[var(--component-text-muted)]">
        OR
      </span>
    </div>
  );
}

export function SeparatorInCardPreview() {
  return (
    <div className="rounded-xl border border-[var(--component-border)] bg-[var(--component-bg)] overflow-hidden max-w-sm">
      <div className="p-4">
        <h4 className="font-medium text-[var(--component-text)]">Account Settings</h4>
        <p className="text-sm text-[var(--component-text-muted)]">Manage your account preferences</p>
      </div>
      <Separator />
      <div className="p-4 space-y-3">
        <button className="w-full text-left text-sm text-[var(--component-text)] hover:text-[var(--track-fill)] transition-colors">
          Profile
        </button>
        <button className="w-full text-left text-sm text-[var(--component-text)] hover:text-[var(--track-fill)] transition-colors">
          Notifications
        </button>
        <button className="w-full text-left text-sm text-[var(--component-text)] hover:text-[var(--track-fill)] transition-colors">
          Security
        </button>
      </div>
      <Separator />
      <div className="p-4">
        <button className="text-sm text-red-500 hover:underline">Delete Account</button>
      </div>
    </div>
  );
}
