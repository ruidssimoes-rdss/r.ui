'use client';

import { useState, useEffect } from 'react';
import { useTokens } from '@/lib/studio/context';
import { StudioToolbar } from './StudioToolbar';
import { StudioPreview } from './StudioPreview';
import { StudioControls } from './StudioControls';
import { ExportModal } from './ExportModal';
import Link from 'next/link';

// Icons
function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function RotateCcwIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.17"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

export function TokenBuilder() {
  const { reset } = useTokens();
  const [exportOpen, setExportOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes('mac'));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Site Header */}
      <header className="h-14 flex-shrink-0 border-b border-[#E5E7EB] bg-white">
        <div className="h-full flex items-center justify-between px-48">
          {/* Left Nav Links */}
          <nav className="flex items-center gap-1">
            <Link
              href="/docs"
              className="px-3 py-1.5 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/docs/components"
              className="px-3 py-1.5 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              Components
            </Link>
            <Link
              href="/tools"
              className="px-3 py-1.5 text-sm font-medium text-[#111827] transition-colors"
            >
              Tools
            </Link>
          </nav>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-xl">
              <span className="font-space-mono font-normal text-[#111827]">r/</span>
              <span className="font-script text-[#111827]" style={{ fontSize: '1.15em' }}>ui</span>
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
              <SearchIcon />
              <span className="text-sm">Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-menlo text-[#6B7280] bg-[#F3F4F6] rounded">
                {isMac ? '⌘' : 'Ctrl'}K
              </kbd>
            </button>
            <a
              href="https://github.com/ruidssimoes/r-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Playground Container */}
        <div className="flex-1 flex flex-col px-[200px] py-6 overflow-hidden">
          <div className="flex-1 border border-[#E5E7EB] rounded-lg overflow-hidden bg-white flex flex-col">
            {/* Toolbar - spans full width with left icons and right icons */}
            <StudioToolbar />

            {/* Split View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Preview Panel - ~65% */}
              <div className="flex-[1.8] border-r border-[#E5E7EB] overflow-hidden flex flex-col">
                <StudioPreview />
                {/* Bottom Action Buttons */}
                <div className="flex-shrink-0 px-6 py-4 border-t border-[#E5E7EB] bg-white flex items-center gap-3">
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
                  >
                    <RotateCcwIcon />
                    Reset
                  </button>
                  <button
                    onClick={() => setExportOpen(true)}
                    className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-[#18181B] text-white rounded-md hover:bg-[#27272A] transition-colors"
                  >
                    <DownloadIcon />
                    Export
                  </button>
                </div>
              </div>

              {/* Token Editor Panel - ~35% */}
              <div className="flex-1 max-w-[641px] overflow-hidden">
                <StudioControls />
              </div>
            </div>
          </div>
        </div>
      </main>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
