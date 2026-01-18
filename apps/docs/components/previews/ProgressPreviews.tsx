'use client';

import { useState, useEffect } from 'react';

/**
 * Progress Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const variantFillStyles = {
  default: 'bg-[var(--track-fill)]',
  success: 'bg-[var(--track-fill-success)]',
  warning: 'bg-[var(--track-fill-warning)]',
  error: 'bg-[var(--track-fill-error)]',
};

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

function ProgressBar({
  value,
  variant = 'default',
  size = 'md',
}: {
  value: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <div className={`w-full bg-[var(--track-bg)] rounded-full overflow-hidden ${sizeStyles[size]}`}>
      <div
        className={`${variantFillStyles[variant]} ${sizeStyles[size]} rounded-full transition-all duration-300 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function ProgressBasicPreview() {
  return <ProgressBar value={60} />;
}

export function ProgressAnimatedPreview() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return <ProgressBar value={progress} />;
}

export function ProgressVariantsPreview() {
  return (
    <div className="flex flex-col gap-3">
      <ProgressBar value={25} variant="default" />
      <ProgressBar value={50} variant="success" />
      <ProgressBar value={75} variant="warning" />
      <ProgressBar value={90} variant="error" />
    </div>
  );
}

export function ProgressSizesPreview() {
  return (
    <div className="flex flex-col gap-3">
      <ProgressBar value={60} size="sm" />
      <ProgressBar value={60} size="md" />
      <ProgressBar value={60} size="lg" />
    </div>
  );
}
