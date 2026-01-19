'use client';

/**
 * Breadcrumb Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function ChevronIcon() {
  return (
    <svg className="w-4 h-4 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

export function BreadcrumbBasicPreview() {
  return (
    <nav className="flex items-center gap-1 text-sm">
      <a href="#" className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors">
        Home
      </a>
      <ChevronIcon />
      <a href="#" className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors">
        Products
      </a>
      <ChevronIcon />
      <span className="text-[var(--component-text)] font-medium">Electronics</span>
    </nav>
  );
}

export function BreadcrumbWithIconsPreview() {
  return (
    <nav className="flex items-center gap-1 text-sm">
      <a href="#" className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors">
        <HomeIcon />
      </a>
      <ChevronIcon />
      <a href="#" className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors">
        Components
      </a>
      <ChevronIcon />
      <a href="#" className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors">
        Navigation
      </a>
      <ChevronIcon />
      <span className="text-[var(--component-text)] font-medium">Breadcrumb</span>
    </nav>
  );
}

export function BreadcrumbCollapsedPreview() {
  return (
    <nav className="flex items-center gap-1 text-sm">
      <a href="#" className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors">
        <HomeIcon />
      </a>
      <ChevronIcon />
      <button className="px-1.5 py-0.5 rounded hover:bg-[var(--component-bg-elevated)] text-[var(--component-text-muted)]">
        ...
      </button>
      <ChevronIcon />
      <a href="#" className="text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors">
        Parent
      </a>
      <ChevronIcon />
      <span className="text-[var(--component-text)] font-medium">Current Page</span>
    </nav>
  );
}
