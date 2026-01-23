'use client';

import { PreviewMode } from '@/lib/studio/types';

interface PreviewBadgesProps {
  mode: PreviewMode;
}

export function PreviewBadges({ mode }: PreviewBadgesProps) {
  return (
    <div className="space-y-6">
      <h3
        className="text-sm font-medium"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        Badges & Tags
      </h3>

      {/* Default badges */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Variants
        </p>
        <div className="flex flex-wrap gap-2">
          <span
            className="px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: mode === 'dark' ? '#18181b' : '#fafafa',
            }}
          >
            Primary
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-foreground)',
            }}
          >
            Secondary
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-border)',
            }}
          >
            Outline
          </span>
        </div>
      </div>

      {/* Semantic badges */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Semantic
        </p>
        <div className="flex flex-wrap gap-2">
          <span
            className="px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-success) 20%, transparent)',
              color: 'var(--color-success)',
            }}
          >
            Success
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-warning) 20%, transparent)',
              color: 'var(--color-warning)',
            }}
          >
            Warning
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-error) 20%, transparent)',
              color: 'var(--color-error)',
            }}
          >
            Error
          </span>
          <span
            className="px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-info) 20%, transparent)',
              color: 'var(--color-info)',
            }}
          >
            Info
          </span>
        </div>
      </div>

      {/* Status indicators */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Status Indicators
        </p>
        <div className="flex flex-wrap gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-foreground)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-success)' }}
            />
            Active
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-foreground)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-warning)' }}
            />
            Pending
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full"
            style={{
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-muted-foreground)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-muted-foreground)' }}
            />
            Inactive
          </span>
        </div>
      </div>

      {/* Notification badges */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Notification Badges
        </p>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-muted)' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: 'var(--color-foreground)' }}
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <span
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full"
              style={{
                backgroundColor: 'var(--color-error)',
                color: '#ffffff',
              }}
            >
              3
            </span>
          </div>
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-muted)' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: 'var(--color-foreground)' }}
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: mode === 'dark' ? '#18181b' : '#fafafa',
              }}
            >
              12
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
