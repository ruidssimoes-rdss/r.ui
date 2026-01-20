'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { ExportDropdown } from './ExportDropdown';
import { cn } from '@/lib/utils';

// Icons
function MobileIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function StudioToolbar() {
  const { state, setPreviewDevice, setPreviewMode } = useTokens();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Copy functionality will be handled by parent or context
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-11 border-b border-[#E5E7EB] flex items-center justify-between px-3 bg-white">
      {/* Left: Device & Theme */}
      <div className="flex items-center">
        {/* Device Toggle */}
        <div className="flex items-center">
          {[
            { key: 'mobile' as const, icon: <MobileIcon />, label: 'Mobile (375px)' },
            { key: 'tablet' as const, icon: <TabletIcon />, label: 'Tablet (768px)' },
            { key: 'desktop' as const, icon: <DesktopIcon />, label: 'Desktop (100%)' },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setPreviewDevice(key)}
              className={cn(
                'p-2 transition-colors',
                state.previewDevice === key
                  ? 'text-[#18181B]'
                  : 'text-[#9CA3AF] hover:text-[#374151]'
              )}
              title={label}
            >
              {icon}
            </button>
          ))}
        </div>

        <div className="w-px h-4 bg-[#E5E7EB] mx-1" />

        {/* Theme Toggle */}
        <div className="flex items-center">
          <button
            onClick={() => setPreviewMode('light')}
            className={cn(
              'p-2 transition-colors',
              state.previewMode === 'light'
                ? 'text-[#18181B]'
                : 'text-[#9CA3AF] hover:text-[#374151]'
            )}
            title="Light mode"
          >
            <SunIcon />
          </button>
          <button
            onClick={() => setPreviewMode('dark')}
            className={cn(
              'p-2 transition-colors',
              state.previewMode === 'dark'
                ? 'text-[#18181B]'
                : 'text-[#9CA3AF] hover:text-[#374151]'
            )}
            title="Dark mode"
          >
            <MoonIcon />
          </button>
        </div>
      </div>

      {/* Right: Export Format & Copy */}
      <div className="flex items-center gap-1">
        <ExportDropdown />
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1.5 text-xs text-[#9CA3AF] hover:text-[#374151] transition-colors"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
}
