'use client';

import { PreviewMode } from '@/lib/studio/types';

interface PreviewAlertsProps {
  mode: PreviewMode;
}

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function CheckCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function AlertTriangleIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function XCircleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

export function PreviewAlerts({ mode }: PreviewAlertsProps) {
  return (
    <div className="space-y-6">
      <h3
        className="text-sm font-medium"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        Alerts
      </h3>

      <div className="space-y-3">
        {/* Info Alert */}
        <div
          className="p-4 rounded-[var(--radius-md)] flex gap-3"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-info) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-info) 30%, transparent)',
          }}
        >
          <div style={{ color: 'var(--color-info)' }}>
            <InfoIcon />
          </div>
          <div className="flex-1">
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--color-info)' }}
            >
              Information
            </p>
            <p
              className="text-sm mt-1 opacity-90"
              style={{ color: 'var(--color-info)' }}
            >
              This is an informational alert message.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        <div
          className="p-4 rounded-[var(--radius-md)] flex gap-3"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-success) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-success) 30%, transparent)',
          }}
        >
          <div style={{ color: 'var(--color-success)' }}>
            <CheckCircleIcon />
          </div>
          <div className="flex-1">
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--color-success)' }}
            >
              Success
            </p>
            <p
              className="text-sm mt-1 opacity-90"
              style={{ color: 'var(--color-success)' }}
            >
              Your changes have been saved successfully.
            </p>
          </div>
        </div>

        {/* Warning Alert */}
        <div
          className="p-4 rounded-[var(--radius-md)] flex gap-3"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-warning) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-warning) 30%, transparent)',
          }}
        >
          <div style={{ color: 'var(--color-warning)' }}>
            <AlertTriangleIcon />
          </div>
          <div className="flex-1">
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--color-warning)' }}
            >
              Warning
            </p>
            <p
              className="text-sm mt-1 opacity-90"
              style={{ color: 'var(--color-warning)' }}
            >
              Please review your information before continuing.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        <div
          className="p-4 rounded-[var(--radius-md)] flex gap-3"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)',
          }}
        >
          <div style={{ color: 'var(--color-error)' }}>
            <XCircleIcon />
          </div>
          <div className="flex-1">
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--color-error)' }}
            >
              Error
            </p>
            <p
              className="text-sm mt-1 opacity-90"
              style={{ color: 'var(--color-error)' }}
            >
              Something went wrong. Please try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
