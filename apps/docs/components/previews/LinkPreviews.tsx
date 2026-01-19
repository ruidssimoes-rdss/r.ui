'use client';

/**
 * Link Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function LinkBasicPreview() {
  return (
    <div className="space-y-4">
      <p className="text-[var(--component-text)]">
        Check out our <a href="#" className="text-[var(--track-fill)] hover:underline">documentation</a> for more details.
      </p>
      <p className="text-[var(--component-text)]">
        Read the <a href="#" className="text-[var(--track-fill)] hover:underline">getting started guide</a> to begin.
      </p>
    </div>
  );
}

export function LinkExternalPreview() {
  return (
    <div className="space-y-3">
      <a
        href="#"
        className="inline-flex items-center text-[var(--track-fill)] hover:underline"
      >
        View on GitHub
        <ExternalIcon />
      </a>
      <br />
      <a
        href="#"
        className="inline-flex items-center text-[var(--track-fill)] hover:underline"
      >
        Read the docs
        <ExternalIcon />
      </a>
      <br />
      <a
        href="#"
        className="inline-flex items-center text-[var(--track-fill)] hover:underline"
      >
        Join our Discord
        <ExternalIcon />
      </a>
    </div>
  );
}

export function LinkVariantsPreview() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs text-[var(--component-text-muted)]">Default (underline on hover)</p>
        <a href="#" className="text-[var(--track-fill)] hover:underline">
          Default link style
        </a>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-[var(--component-text-muted)]">Always underlined</p>
        <a href="#" className="text-[var(--track-fill)] underline hover:no-underline">
          Underlined link
        </a>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-[var(--component-text-muted)]">Subtle (muted color)</p>
        <a href="#" className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] hover:underline transition-colors">
          Subtle link style
        </a>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-[var(--component-text-muted)]">Button style</p>
        <a href="#" className="inline-block px-4 py-2 rounded-lg bg-[var(--track-fill)] text-white hover:opacity-90 transition-opacity">
          Button link
        </a>
      </div>
    </div>
  );
}
