'use client';

import { usePreviewOptional, type PreviewTheme } from './PreviewContext';

// ========================================
// Icons - Larger size (20px) for better visibility
// ========================================

function MobileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function TabletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
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

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function OatmealIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12a4 4 0 0 1 8 0" />
    </svg>
  );
}

function AutoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function ZoomOutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function ZoomInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
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

// ========================================
// Toolbar Button Component
// Enhanced for better visibility and contrast
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
        flex items-center justify-center w-9 h-9 rounded-lg
        transition-all duration-200
        ${active
          ? 'bg-[var(--toolbar-active-bg)] text-[var(--toolbar-active-text)] shadow-sm'
          : 'text-[var(--toolbar-text)] hover:text-[var(--toolbar-hover-text)] hover:bg-[var(--toolbar-hover-bg)]'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );
}

// ========================================
// Inline Preview Toolbar (theme-aware with improved contrast)
// ========================================

function InlinePreviewToolbar() {
  const preview = usePreviewOptional();

  if (!preview) return null;

  const {
    viewMode,
    previewTheme,
    zoom,
    showCode,
    setViewMode,
    setPreviewTheme,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleShowCode,
  } = preview;

  const themes: { key: PreviewTheme; icon: React.ReactNode; label: string }[] = [
    { key: 'auto', icon: <AutoIcon className="w-5 h-5" />, label: 'Auto (match site)' },
    { key: 'dark', icon: <MoonIcon className="w-5 h-5" />, label: 'Dark' },
    { key: 'light', icon: <SunIcon className="w-5 h-5" />, label: 'Light' },
    { key: 'oatmeal', icon: <OatmealIcon className="w-5 h-5" />, label: 'Oatmeal' },
  ];

  return (
    <div
      className="flex items-center gap-3 flex-wrap p-2 rounded-xl backdrop-blur-sm transition-colors duration-200"
      style={{
        background: 'var(--toolbar-bg)',
        border: '1px solid var(--toolbar-border)',
      }}
    >
      {/* Viewport Toggles */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--toolbar-group-bg)]">
        <ToolbarButton
          active={viewMode === 'mobile'}
          onClick={() => setViewMode('mobile')}
          title="Mobile view (375px) - Press 1"
        >
          <MobileIcon className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          active={viewMode === 'tablet'}
          onClick={() => setViewMode('tablet')}
          title="Tablet view (768px) - Press 2"
        >
          <TabletIcon className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          active={viewMode === 'desktop'}
          onClick={() => setViewMode('desktop')}
          title="Desktop view (full width) - Press 3"
        >
          <DesktopIcon className="w-5 h-5" />
        </ToolbarButton>
      </div>

      {/* Divider */}
      <div className="w-px h-7 bg-[var(--toolbar-divider)]" />

      {/* Theme Selector */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--toolbar-group-bg)]">
        {themes.map(({ key, icon, label }) => (
          <ToolbarButton
            key={key}
            active={previewTheme === key}
            onClick={() => setPreviewTheme(key)}
            title={`${label} - Press ${key === 'auto' ? 'A' : key[0].toUpperCase()}`}
          >
            {icon}
          </ToolbarButton>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-7 bg-[var(--toolbar-divider)]" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={zoomOut}
          disabled={zoom <= 50}
          title="Zoom out - Press -"
        >
          <ZoomOutIcon className="w-5 h-5" />
        </ToolbarButton>

        <button
          onClick={resetZoom}
          className="px-2 py-1.5 text-sm font-mono rounded-lg transition-all duration-200 min-w-[52px] text-center
                     text-[var(--toolbar-text)] hover:text-[var(--toolbar-hover-text)] hover:bg-[var(--toolbar-hover-bg)]"
          title="Reset zoom - Press 0"
        >
          {zoom}%
        </button>

        <ToolbarButton
          onClick={zoomIn}
          disabled={zoom >= 200}
          title="Zoom in - Press +"
        >
          <ZoomInIcon className="w-5 h-5" />
        </ToolbarButton>
      </div>

      {/* Divider */}
      <div className="w-px h-7 bg-[var(--toolbar-divider)]" />

      {/* Code Toggle */}
      <ToolbarButton
        active={showCode}
        onClick={toggleShowCode}
        title="Toggle code view (Cmd+K)"
      >
        <CodeIcon className="w-5 h-5" />
      </ToolbarButton>
    </div>
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
 * coss.com-inspired clean header for component pages.
 * Shows title, optional description, and integrated preview toolbar.
 * Toolbar controls apply to all ComponentPreview instances on the page.
 */
export function ComponentPageHeader({ children, description }: ComponentPageHeaderProps) {
  return (
    <div className="mb-8">
      {/* Title and Description */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-[var(--docs-text)]">
          {children}
        </h1>
        {description && (
          <p className="mt-2 text-[var(--docs-text-secondary)]">
            {description}
          </p>
        )}
      </div>

      {/* Integrated Preview Toolbar */}
      <InlinePreviewToolbar />
    </div>
  );
}
