'use client';

import { useState } from 'react';
import { ColorPalette } from './ColorPalette';
import { RadiusControl } from './RadiusControl';
import { SpacingControl } from './SpacingControl';
import { ReviewModal } from './ReviewModal';

function CheckCircleIcon({ size = 16 }: { size?: number }) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function StudioTokens() {
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <>
      <div className="rounded-lg border border-border/50 p-6 space-y-8 bg-card">
        {/* Colors */}
        <ColorPalette />

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Radius and Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RadiusControl />
          <SpacingControl />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Review Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setReviewOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-muted hover:bg-muted/80 rounded-lg transition-colors"
          >
            <CheckCircleIcon size={16} />
            Review Theme
          </button>
        </div>
      </div>

      <ReviewModal open={reviewOpen} onOpenChange={setReviewOpen} />
    </>
  );
}
