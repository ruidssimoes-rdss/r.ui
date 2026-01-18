'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePreviewOptional, type PreviewTheme } from './PreviewContext';
import { getBreadcrumbs } from '@/lib/navigation';

// ========================================
// Icons - 18px for minimal toolbar
// ========================================

function MobileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function TabletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function DesktopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function OatmealIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ========================================
// Minimal Toolbar Button Component
// ========================================

interface ToolbarButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}

function ToolbarButton({ children, active, onClick, disabled, title }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        flex items-center justify-center p-1.5 rounded
        transition-colors duration-150
        ${active
          ? 'text-[var(--docs-text)]'
          : 'text-[var(--docs-text-muted)] hover:text-[var(--docs-text)]'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );
}

// ========================================
// Thin Vertical Divider
// ========================================

function ToolbarDivider() {
  return (
    <div
      className="w-px h-4 mx-1"
      style={{ backgroundColor: 'var(--docs-text-muted)', opacity: 0.3 }}
    />
  );
}

// ========================================
// Minimal Inline Preview Toolbar
// ========================================

function InlinePreviewToolbar() {
  const preview = usePreviewOptional();

  if (!preview) return null;

  const {
    viewMode,
    previewTheme,
    showCode,
    setViewMode,
    setPreviewTheme,
    toggleShowCode,
  } = preview;

  const themes: { key: PreviewTheme; icon: React.ReactNode; label: string }[] = [
    { key: 'light', icon: <SunIcon />, label: 'Light' },
    { key: 'auto', icon: <MonitorIcon />, label: 'Auto (match site)' },
    { key: 'dark', icon: <MoonIcon />, label: 'Dark' },
    { key: 'oatmeal', icon: <OatmealIcon />, label: 'Oatmeal' },
  ];

  return (
    <div className="flex items-center">
      {/* Group 1: Viewport icons */}
      <ToolbarButton
        active={viewMode === 'mobile'}
        onClick={() => setViewMode('mobile')}
        title="Mobile view (375px)"
      >
        <MobileIcon />
      </ToolbarButton>
      <ToolbarButton
        active={viewMode === 'tablet'}
        onClick={() => setViewMode('tablet')}
        title="Tablet view (768px)"
      >
        <TabletIcon />
      </ToolbarButton>
      <ToolbarButton
        active={viewMode === 'desktop'}
        onClick={() => setViewMode('desktop')}
        title="Desktop view (full width)"
      >
        <DesktopIcon />
      </ToolbarButton>

      <ToolbarDivider />

      {/* Group 2: Theme icons */}
      {themes.map(({ key, icon, label }) => (
        <ToolbarButton
          key={key}
          active={previewTheme === key}
          onClick={() => setPreviewTheme(key)}
          title={label}
        >
          {icon}
        </ToolbarButton>
      ))}

      <ToolbarDivider />

      {/* Group 3: Action icons */}
      <ToolbarButton
        onClick={() => {}}
        title="Copy code"
      >
        <CopyIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {}}
        title="Download component"
      >
        <DownloadIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {}}
        title="Open in new tab"
      >
        <ExternalLinkIcon />
      </ToolbarButton>
      <ToolbarButton
        active={showCode}
        onClick={toggleShowCode}
        title="Toggle code view"
      >
        <CodeIcon />
      </ToolbarButton>
    </div>
  );
}

// ========================================
// Page Breadcrumbs (inline in header)
// ========================================

function PageBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  if (pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-[var(--docs-text-muted)]" aria-hidden="true">/</span>
              )}
              {isLast ? (
                <span className="text-[var(--docs-text)] font-semibold">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-[var(--docs-text-muted)] hover:text-[var(--docs-text-secondary)] transition-colors duration-150"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ========================================
// Main Component
// ========================================

interface ComponentPageHeaderProps {
  children: React.ReactNode;
  description?: string;
}

/**
 * ComponentPageHeader Component
 *
 * Minimal header for component pages.
 * ROW 1: Breadcrumbs (left) + minimal toolbar icons (right)
 * ROW 2: Description text (muted)
 */
export function ComponentPageHeader({ children, description }: ComponentPageHeaderProps) {
  return (
    <div className="mb-6">
      {/* ROW 1: Breadcrumbs LEFT, Toolbar RIGHT */}
      <div className="flex items-center justify-between gap-4">
        <PageBreadcrumbs />
        <InlinePreviewToolbar />
      </div>

      {/* ROW 2: Description */}
      {description && (
        <p className="mt-3 text-[var(--docs-text-muted)] text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
