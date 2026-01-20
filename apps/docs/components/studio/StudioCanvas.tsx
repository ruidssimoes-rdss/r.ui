'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useStudio } from '@/lib/studio/theme-context';
import { TokenPanel } from './TokenPanel';
import { LivePreview } from './LivePreview';
import { PreviewControls } from './PreviewControls';
import { ExportModal } from './ExportModal';
import Link from 'next/link';

function RotateCcwIcon({ size = 16 }: { size?: number }) {
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
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function DownloadIcon({ size = 16 }: { size?: number }) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function ArrowLeftIcon({ size = 16 }: { size?: number }) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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

function GrainIcon({ size = 16 }: { size?: number }) {
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
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 12V2" />
      <path d="M12 12l7-7" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const themes = [
  { name: 'dark', label: 'Dark', icon: MoonIcon },
  { name: 'light', label: 'Light', icon: SunIcon },
  { name: 'oatmeal', label: 'Oatmeal', icon: GrainIcon },
] as const;

function StudioThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-24 h-8 studio-glass-subtle rounded-lg animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-1 studio-glass-subtle rounded-lg p-1">
      {themes.map(({ name, label, icon: Icon }) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          className={`p-1.5 rounded-md transition-all duration-200 ${
            theme === name
              ? 'bg-[var(--studio-primary)] text-white shadow-lg shadow-[var(--studio-primary)]/30'
              : 'text-[var(--studio-text-muted)] hover:text-[var(--studio-text)] hover:bg-white/5'
          }`}
          title={label}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}

export function StudioCanvas() {
  const { state, reset } = useStudio();
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="studio-root h-screen flex flex-col relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[var(--studio-void)] transition-colors duration-300">
        <div className="studio-orb studio-orb-1" />
        <div className="studio-orb studio-orb-2" />
        <div className="studio-orb studio-orb-3" />
        <div className="studio-noise absolute inset-0" />
      </div>

      {/* Header */}
      <header className="relative z-10 h-14 studio-glass flex items-center justify-between px-5">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--studio-text-muted)] hover:text-[var(--studio-text)] transition-colors"
          >
            <ArrowLeftIcon size={16} />
            <span className="text-sm">Back</span>
          </Link>

          <div className="w-px h-5 bg-[var(--studio-glass-border)]" />

          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[var(--studio-text)]">r/ui</span>
            <span className="text-sm text-[var(--studio-text-dimmed)]">Studio</span>
          </div>

          {state.activePreset && (
            <span className="studio-glass-subtle px-2.5 py-1 rounded-md text-xs text-[var(--studio-text-muted)]">
              {state.activePreset}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <StudioThemeToggle />

          <div className="w-px h-5 bg-[var(--studio-glass-border)]" />

          <button
            onClick={reset}
            className="studio-btn studio-btn-ghost"
          >
            <RotateCcwIcon size={14} />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setExportOpen(true)}
            className="studio-btn studio-btn-primary"
          >
            <DownloadIcon size={14} />
            <span>Export Theme</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Panel - Token Editors */}
        <aside className="w-80 studio-glass-strong rounded-xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <TokenPanel />
          </div>
        </aside>

        {/* Right Panel - Preview */}
        <main className="flex-1 flex flex-col gap-4 min-w-0">
          {/* Preview Controls */}
          <div className="studio-glass rounded-xl px-4 py-3 flex items-center justify-center">
            <PreviewControls />
          </div>

          {/* Live Preview */}
          <div className="flex-1 studio-glass rounded-xl overflow-hidden relative">
            {/* Inner ambient glow */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
            </div>
            <div className="relative h-full overflow-auto p-6">
              <LivePreview />
            </div>
          </div>
        </main>
      </div>

      {/* Export Modal */}
      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
