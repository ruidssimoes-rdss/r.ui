'use client';

import { useState } from 'react';

/**
 * Pagination Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function ChevronLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function PaginationBasicPreview() {
  const [page, setPage] = useState(3);

  return (
    <nav className="flex items-center gap-1">
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
        className="p-2 rounded-lg hover:bg-[var(--component-bg-elevated)] text-[var(--component-text-muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeftIcon />
      </button>
      {[1, 2, 3, 4, 5].map(p => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? 'bg-[var(--track-fill)] text-white'
              : 'hover:bg-[var(--component-bg-elevated)] text-[var(--component-text)]'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage(p => Math.min(5, p + 1))}
        disabled={page === 5}
        className="p-2 rounded-lg hover:bg-[var(--component-bg-elevated)] text-[var(--component-text-muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}

export function PaginationWithEllipsisPreview() {
  const [page, setPage] = useState(5);

  return (
    <nav className="flex items-center gap-1">
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        className="p-2 rounded-lg hover:bg-[var(--component-bg-elevated)] text-[var(--component-text-muted)] transition-colors"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={() => setPage(1)}
        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
          1 === page
            ? 'bg-[var(--track-fill)] text-white'
            : 'hover:bg-[var(--component-bg-elevated)] text-[var(--component-text)]'
        }`}
      >
        1
      </button>
      <span className="px-2 text-[var(--component-text-muted)]">...</span>
      {[4, 5, 6].map(p => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
            p === page
              ? 'bg-[var(--track-fill)] text-white'
              : 'hover:bg-[var(--component-bg-elevated)] text-[var(--component-text)]'
          }`}
        >
          {p}
        </button>
      ))}
      <span className="px-2 text-[var(--component-text-muted)]">...</span>
      <button
        onClick={() => setPage(20)}
        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
          20 === page
            ? 'bg-[var(--track-fill)] text-white'
            : 'hover:bg-[var(--component-bg-elevated)] text-[var(--component-text)]'
        }`}
      >
        20
      </button>
      <button
        onClick={() => setPage(p => Math.min(20, p + 1))}
        className="p-2 rounded-lg hover:bg-[var(--component-bg-elevated)] text-[var(--component-text-muted)] transition-colors"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}

export function PaginationCompactPreview() {
  const [page, setPage] = useState(3);

  return (
    <nav className="flex items-center gap-2">
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[var(--component-bg-elevated)] text-[var(--component-text)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeftIcon />
        Previous
      </button>
      <span className="text-sm text-[var(--component-text-muted)]">
        Page {page} of 10
      </span>
      <button
        onClick={() => setPage(p => Math.min(10, p + 1))}
        disabled={page === 10}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[var(--component-bg-elevated)] text-[var(--component-text)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
