'use client';

import { useState } from 'react';

/**
 * HoverCard Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function HoverCardBasicPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="text-[var(--track-fill)] hover:underline cursor-pointer"
      >
        @r-ui
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-4 w-64 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10">
          <div className="space-y-2">
            <h4 className="font-semibold text-[var(--component-text)]">r/ui Components</h4>
            <p className="text-sm text-[var(--component-text-muted)]">
              A universal React Native component library for building beautiful apps.
            </p>
            <div className="flex gap-4 text-sm">
              <span className="text-[var(--component-text-muted)]">
                <span className="font-medium text-[var(--component-text)]">48</span> components
              </span>
              <span className="text-[var(--component-text-muted)]">
                <span className="font-medium text-[var(--component-text)]">3</span> themes
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HoverCardUserPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex items-center gap-2 text-[var(--track-fill)] hover:underline cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
          JD
        </div>
        <span>@johndoe</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 p-4 w-72 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-[var(--component-text)]">John Doe</h4>
              <p className="text-sm text-[var(--component-text-muted)]">@johndoe</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-[var(--component-text)]">
            Software engineer passionate about building great user experiences. Working on @r-ui.
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            <span className="text-[var(--component-text-muted)]">
              <span className="font-medium text-[var(--component-text)]">128</span> following
            </span>
            <span className="text-[var(--component-text-muted)]">
              <span className="font-medium text-[var(--component-text)]">2.4K</span> followers
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function HoverCardLinkPreview() {
  const [open, setOpen] = useState(false);

  return (
    <p className="text-[var(--component-text)]">
      Check out the{' '}
      <span
        className="relative inline-block"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <a href="#" className="text-[var(--track-fill)] hover:underline">
          documentation
        </a>
        {open && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-4 w-80 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--component-bg-elevated)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--track-fill)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--component-text)]">r/ui Documentation</h4>
                  <p className="text-xs text-[var(--component-text-muted)]">docs.r-ui.dev</p>
                </div>
              </div>
              <p className="text-sm text-[var(--component-text-muted)]">
                Comprehensive guides, API references, and examples for all r/ui components.
              </p>
            </div>
          </div>
        )}
      </span>{' '}
      for more information.
    </p>
  );
}
