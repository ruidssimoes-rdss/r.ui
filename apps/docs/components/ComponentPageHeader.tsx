'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePreviewOptional } from './PreviewContext';
import { getBreadcrumbs } from '@/lib/navigation';

// ========================================
// Icons - 20px for better visibility
// ========================================

function MobileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function DesktopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

// ========================================
// Toolbar Button Component
// ========================================

interface ToolbarButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  title?: string;
}

function ToolbarButton({ children, active, onClick, title }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 transition-colors
        ${active
          ? 'text-gray-900'
          : 'text-gray-400 hover:text-gray-700'
        }`}
    >
      {children}
    </button>
  );
}

// ========================================
// Functional Toolbar
// ========================================

function InlinePreviewToolbar() {
  const preview = usePreviewOptional();

  if (!preview) return null;

  const {
    viewMode,
    showCode,
    setViewMode,
    toggleShowCode,
  } = preview;

  return (
    <div className="flex items-center gap-1">
      {/* Responsive toggle - mobile/desktop only */}
      <ToolbarButton
        active={viewMode === 'mobile'}
        onClick={() => setViewMode('mobile')}
        title="Mobile view"
      >
        <MobileIcon />
      </ToolbarButton>
      <ToolbarButton
        active={viewMode === 'desktop'}
        onClick={() => setViewMode('desktop')}
        title="Desktop view"
      >
        <DesktopIcon />
      </ToolbarButton>

      <div className="w-px h-4 mx-2 bg-gray-200" />

      {/* Copy code */}
      <ToolbarButton
        onClick={() => {
          const codeElements = document.querySelectorAll('pre code');
          if (codeElements.length > 0) {
            navigator.clipboard.writeText(codeElements[0].textContent || '');
          }
        }}
        title="Copy code"
      >
        <CopyIcon />
      </ToolbarButton>

      {/* Toggle code view */}
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
// Page Breadcrumbs
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
                <span className="text-gray-300" aria-hidden="true">/</span>
              )}
              {isLast ? (
                <span className="text-gray-900 font-semibold">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
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
 * ROW 1: Breadcrumbs (left) + functional toolbar (right)
 * No theme icons - only responsive toggle, copy, and code view.
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
        <p className="mt-3 text-gray-500 text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
