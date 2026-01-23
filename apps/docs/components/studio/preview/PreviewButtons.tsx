'use client';

import { PreviewMode } from '@/lib/studio/types';

interface PreviewButtonsProps {
  mode: PreviewMode;
}

export function PreviewButtons({ mode }: PreviewButtonsProps) {
  return (
    <div className="space-y-6">
      <h3
        className="text-sm font-medium"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        Button Variants
      </h3>

      {/* Primary variants */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Primary
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: mode === 'dark' ? '#18181b' : '#fafafa',
            }}
          >
            Default
          </button>
          <button
            className="px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: mode === 'dark' ? '#18181b' : '#fafafa',
              opacity: 0.7,
            }}
          >
            Hover
          </button>
          <button
            className="px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm cursor-not-allowed"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: mode === 'dark' ? '#18181b' : '#fafafa',
              opacity: 0.5,
            }}
          >
            Disabled
          </button>
        </div>
      </div>

      {/* Secondary/Outline variants */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Secondary
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm transition-colors"
            style={{
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-foreground)',
            }}
          >
            Secondary
          </button>
          <button
            className="px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-border)',
            }}
          >
            Outline
          </button>
          <button
            className="px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm transition-colors hover:bg-[var(--color-muted)]"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-foreground)',
            }}
          >
            Ghost
          </button>
        </div>
      </div>

      {/* Destructive */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Destructive
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-error)',
              color: '#fafafa',
            }}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-error)',
              border: '1px solid var(--color-error)',
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Sizes
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="px-3 py-1 rounded-[var(--radius-sm)] font-medium text-xs"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: mode === 'dark' ? '#18181b' : '#fafafa',
            }}
          >
            Small
          </button>
          <button
            className="px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: mode === 'dark' ? '#18181b' : '#fafafa',
            }}
          >
            Medium
          </button>
          <button
            className="px-6 py-3 rounded-[var(--radius-lg)] font-medium text-base"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: mode === 'dark' ? '#18181b' : '#fafafa',
            }}
          >
            Large
          </button>
        </div>
      </div>
    </div>
  );
}
