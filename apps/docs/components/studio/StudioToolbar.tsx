'use client';

import { useStudio } from '@/lib/studio/studio-context';
import { cn } from '@/lib/utils';

function MonitorIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function TabletIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function SmartphoneIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function SunIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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

function MoonIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function EyeIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CodeIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function StudioToolbar() {
  const { state, setPreviewDevice, setPreviewMode, setViewMode } = useStudio();

  const devices = [
    { key: 'mobile' as const, icon: SmartphoneIcon },
    { key: 'tablet' as const, icon: TabletIcon },
    { key: 'desktop' as const, icon: MonitorIcon },
  ];

  const themes = [
    { key: 'light' as const, icon: SunIcon },
    { key: 'dark' as const, icon: MoonIcon },
  ];

  return (
    <div className="h-12 border-b border-border/50 flex items-center justify-between px-4 bg-muted/30">
      {/* Left: Device & Theme */}
      <div className="flex items-center gap-2">
        {/* Device */}
        <div className="flex items-center gap-0.5 bg-background rounded-md p-0.5">
          {devices.map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setPreviewDevice(key)}
              className={cn(
                'p-1.5 rounded transition-colors',
                state.previewDevice === key
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label={`Preview on ${key}`}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-border/50" />

        {/* Theme */}
        <div className="flex items-center gap-0.5 bg-background rounded-md p-0.5">
          {themes.map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setPreviewMode(key)}
              className={cn(
                'p-1.5 rounded transition-colors',
                state.previewMode === key
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-label={`${key} mode`}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* Right: View Toggle */}
      <div className="flex items-center gap-0.5 bg-background rounded-md p-0.5">
        <button
          onClick={() => setViewMode('preview')}
          className={cn(
            'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors',
            state.viewMode === 'preview'
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <EyeIcon size={12} />
          Preview
        </button>
        <button
          onClick={() => setViewMode('code')}
          className={cn(
            'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors',
            state.viewMode === 'code'
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <CodeIcon size={12} />
          Code
        </button>
      </div>
    </div>
  );
}
