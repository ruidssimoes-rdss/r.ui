'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/studio-context';
import { reviewTheme } from '@/lib/studio/review-utils';
import { ReviewResult } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

function XIcon({ size = 16 }: { size?: number }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckCircleIcon({ size = 20 }: { size?: number }) {
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

function AlertCircleIcon({ size = 16 }: { size?: number }) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function AlertTriangleIcon({ size = 16 }: { size?: number }) {
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
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function InfoIcon({ size = 16 }: { size?: number }) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewModal({ open, onOpenChange }: ReviewModalProps) {
  const { state } = useStudio();
  const [result, setResult] = useState<ReviewResult | null>(null);

  const handleReview = () => {
    const reviewResult = reviewTheme(state.tokens);
    setResult(reviewResult);
  };

  const handleClose = () => {
    setResult(null);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-xl border border-border shadow-2xl w-full max-w-lg p-6 mx-4">
        <h2 className="text-lg font-semibold mb-4">Theme Review</h2>

        {!result ? (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Check your theme for accessibility issues, contrast problems, and
              design consistency.
            </p>
            <button
              onClick={handleReview}
              className="w-full py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
            >
              Run Review
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Score */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div
                className={cn(
                  'text-5xl font-bold',
                  result.score >= 80
                    ? 'text-green-500'
                    : result.score >= 60
                      ? 'text-yellow-500'
                      : 'text-red-500'
                )}
              >
                {result.score}
              </div>
              <div className="text-muted-foreground">/ 100</div>
            </div>

            {/* Issues */}
            {result.issues.length === 0 ? (
              <div className="flex items-center gap-2 text-green-500">
                <CheckCircleIcon size={20} />
                <span>All checks passed!</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-auto">
                {result.issues.map((issue, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2 rounded bg-muted/50"
                  >
                    {issue.type === 'error' && (
                      <span className="text-red-500 mt-0.5">
                        <AlertCircleIcon size={16} />
                      </span>
                    )}
                    {issue.type === 'warning' && (
                      <span className="text-yellow-500 mt-0.5">
                        <AlertTriangleIcon size={16} />
                      </span>
                    )}
                    {issue.type === 'info' && (
                      <span className="text-blue-500 mt-0.5">
                        <InfoIcon size={16} />
                      </span>
                    )}
                    <div>
                      <div className="text-sm">{issue.message}</div>
                      {issue.suggestion && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {issue.suggestion}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setResult(null)}
              className="w-full py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              Review Again
            </button>
          </div>
        )}

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}
