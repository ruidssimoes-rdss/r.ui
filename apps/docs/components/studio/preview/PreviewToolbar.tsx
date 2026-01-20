'use client';

import { useTokens } from '@/lib/studio/context';
import { PreviewDevice, PreviewMode } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

export function PreviewToolbar() {
  const { state, setPreviewMode, setPreviewDevice } = useTokens();
  const { previewMode, previewDevice } = state;

  const devices: { id: PreviewDevice; icon: React.ReactNode; label: string }[] = [
    {
      id: 'mobile',
      label: 'Mobile',
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
    },
    {
      id: 'tablet',
      label: 'Tablet',
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
    },
    {
      id: 'desktop',
      label: 'Desktop',
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <div className="h-10 border-b border-border/50 flex items-center justify-between px-4 bg-muted/20">
      <span className="text-xs font-medium text-muted-foreground">
        Live Preview
      </span>

      <div className="flex items-center gap-4">
        {/* Device Selector */}
        <div className="flex items-center gap-1 p-0.5 bg-muted rounded-md">
          {devices.map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setPreviewDevice(id)}
              className={cn(
                'p-1.5 rounded transition-colors',
                previewDevice === id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              title={label}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-1 p-0.5 bg-muted rounded-md">
          <button
            onClick={() => setPreviewMode('light')}
            className={cn(
              'p-1.5 rounded transition-colors',
              previewMode === 'light'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Light mode"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
          </button>
          <button
            onClick={() => setPreviewMode('dark')}
            className={cn(
              'p-1.5 rounded transition-colors',
              previewMode === 'dark'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title="Dark mode"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
