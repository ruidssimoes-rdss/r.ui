'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/theme-context';
import { StudioPreview } from './StudioPreview';
import { StudioControls } from './StudioControls';
import { StudioExport } from './StudioExport';
import Link from 'next/link';

// ========================================
// Icons
// ========================================

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

// ========================================
// Main Component
// ========================================

export function StudioCanvas() {
  const { state, reset } = useStudio();
  const [showExport, setShowExport] = useState(false);

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-white">
      {/* Contained layout - matches playground padding */}
      <div className="w-full mx-auto px-4 lg:px-[120px] flex flex-col">
        {/* Sub-header - 48px height, 40px top padding */}
        <div className="pt-10 pb-4">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon size={16} />
                <span className="text-sm">Back</span>
              </Link>

              <div className="h-4 w-px bg-gray-200" />

              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">r/ui Studio</span>
                {state.activePreset && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {state.activePreset}
                  </span>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <RotateCcwIcon size={14} />
                <span>Reset</span>
              </button>

              <button
                onClick={() => setShowExport(!showExport)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors"
              >
                <DownloadIcon size={14} />
                <span>Export Theme</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Split View */}
        <div className="flex gap-5 h-[500px] lg:h-[520px]">
          {/* Left: Preview (60%) */}
          <div className="flex-[3] min-w-0">
            <StudioPreview />
          </div>

          {/* Right: Controls (40%) */}
          <div className="flex-[2] min-w-0">
            <StudioControls />
          </div>
        </div>

        {/* Export Section - Below split view */}
        <div className="pt-6 pb-8">
          <StudioExport expanded={showExport} onToggle={() => setShowExport(!showExport)} />
        </div>
      </div>
    </div>
  );
}
