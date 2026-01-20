'use client';

import { useStudio } from '@/lib/studio/theme-context';
import { ComponentShowcase } from './ComponentShowcase';

// ========================================
// Icons
// ========================================

function SmartphoneIcon({ size = 16 }: { size?: number }) {
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
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}

function TabletIcon({ size = 16 }: { size?: number }) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}

function MonitorIcon({ size = 16 }: { size?: number }) {
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
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function SunIcon({ size = 16 }: { size?: number }) {
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

function MoonIcon({ size = 16 }: { size?: number }) {
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

// ========================================
// Viewport widths
// ========================================

type DeviceMode = 'mobile' | 'tablet' | 'desktop';

const viewportWidths: Record<DeviceMode, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
};

// ========================================
// Main Component
// ========================================

export function StudioPreview() {
  const { state, setDevice, setMode } = useStudio();
  const { device, mode } = state;

  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden border border-gray-200">
      {/* Preview Area - Dark background like PlaygroundPreview */}
      <div className="flex-1 bg-zinc-900 relative overflow-auto">
        {/* Dot Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Component Showcase */}
        <div className="relative z-10 flex items-center justify-center h-full p-8">
          <div
            className="transition-all duration-300"
            style={{
              width: viewportWidths[device],
              maxWidth: '100%',
            }}
          >
            <ComponentShowcase mode={mode} />
          </div>
        </div>
      </div>

      {/* Preview Controls - Bottom bar */}
      <div className="h-12 border-t border-gray-200 bg-white flex items-center justify-between px-4">
        {/* Device Toggle */}
        <div className="flex items-center gap-1">
          {[
            { key: 'mobile' as const, icon: SmartphoneIcon, label: 'Mobile (375px)' },
            { key: 'tablet' as const, icon: TabletIcon, label: 'Tablet (768px)' },
            { key: 'desktop' as const, icon: MonitorIcon, label: 'Desktop (100%)' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setDevice(key)}
              className={`p-2 rounded-md transition-colors ${
                device === key
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              title={label}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-1">
          {[
            { key: 'light' as const, icon: SunIcon, label: 'Light mode' },
            { key: 'dark' as const, icon: MoonIcon, label: 'Dark mode' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`p-2 rounded-md transition-colors ${
                mode === key
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              title={label}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
