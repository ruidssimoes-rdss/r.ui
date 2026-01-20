'use client';

import { useState } from 'react';
import { TokenSidebar } from './TokenSidebar';
import { TokenPreview } from './TokenPreview';
import { TokenExport } from './TokenExport';
import { ValidationPanel } from './ValidationPanel';
import { ExportModal } from './ExportModal';
import { useTokens } from '@/lib/studio/context';
import Link from 'next/link';

export function TokenBuilder() {
  const { reset, validationErrors } = useTokens();
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border/50 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span className="text-sm">Back</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="font-semibold">r/ui Token Builder</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            Reset
          </button>
          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      </header>

      {/* Main Content - Split View */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Token Editor */}
        <div className="w-[45%] min-w-[400px] border-r border-border/50 flex flex-col">
          <TokenSidebar />
        </div>

        {/* Right: Preview + Export */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Preview */}
          <div className="flex-1 min-h-0">
            <TokenPreview />
          </div>

          {/* Export Preview */}
          <div className="h-[280px] border-t border-border/50 flex-shrink-0">
            <TokenExport />
          </div>

          {/* Validation Warnings */}
          {validationErrors.length > 0 && (
            <ValidationPanel errors={validationErrors} />
          )}
        </div>
      </div>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}
