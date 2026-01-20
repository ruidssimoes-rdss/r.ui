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

export function StudioControls() {
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <>
      <div className="p-4 space-y-6">
        {/* Colors */}
        <ColorPalette />

        <div className="h-px bg-border/50" />

        {/* Radius */}
        <RadiusControl />

        <div className="h-px bg-border/50" />

        {/* Spacing */}
        <SpacingControl />

        <div className="h-px bg-border/50" />

        {/* Review Button */}
        <button
          onClick={() => setReviewOpen(true)}
          className="w-full py-2.5 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircleIcon size={16} />
          Review Theme
        </button>
      </div>

      <ReviewModal open={reviewOpen} onOpenChange={setReviewOpen} />
    </>
  );
}
