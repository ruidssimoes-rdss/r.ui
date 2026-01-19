'use client';

import { useState } from 'react';

/**
 * Callout Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

type CalloutVariant = 'info' | 'warning' | 'error' | 'success' | 'tip';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<CalloutVariant, { container: string; icon: string; title: string }> = {
  info: {
    container: 'bg-blue-500/10 border-blue-500/20',
    icon: 'text-blue-500',
    title: 'text-blue-600 dark:text-blue-400',
  },
  warning: {
    container: 'bg-amber-500/10 border-amber-500/20',
    icon: 'text-amber-500',
    title: 'text-amber-600 dark:text-amber-400',
  },
  error: {
    container: 'bg-red-500/10 border-red-500/20',
    icon: 'text-red-500',
    title: 'text-red-600 dark:text-red-400',
  },
  success: {
    container: 'bg-emerald-500/10 border-emerald-500/20',
    icon: 'text-emerald-500',
    title: 'text-emerald-600 dark:text-emerald-400',
  },
  tip: {
    container: 'bg-purple-500/10 border-purple-500/20',
    icon: 'text-purple-500',
    title: 'text-purple-600 dark:text-purple-400',
  },
};

const icons: Record<CalloutVariant, React.ReactNode> = {
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  tip: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

function Callout({ variant = 'info', title, children, dismissible, onDismiss }: CalloutProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${styles.container}`}>
      <div className={`flex-shrink-0 ${styles.icon}`}>{icons[variant]}</div>
      <div className="flex-1 min-w-0">
        {title && <h4 className={`text-sm font-medium ${styles.title}`}>{title}</h4>}
        <p className={`text-sm text-[var(--component-text-muted)] ${title ? 'mt-1' : ''}`}>{children}</p>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function CalloutVariantsPreview() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <Callout variant="info" title="Information">
        This is an informational callout.
      </Callout>
      <Callout variant="warning" title="Warning">
        This action may have consequences.
      </Callout>
      <Callout variant="error" title="Error">
        Something went wrong.
      </Callout>
      <Callout variant="success" title="Success">
        Operation completed successfully.
      </Callout>
      <Callout variant="tip" title="Tip">
        Here's a helpful tip for you.
      </Callout>
    </div>
  );
}

export function CalloutDismissiblePreview() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="px-4 py-2 text-sm font-medium text-[var(--component-text)] bg-[var(--component-bg-elevated)] border border-[var(--component-border)] hover:bg-[var(--component-bg-hover)] rounded-lg transition-colors"
      >
        Show Callout
      </button>
    );
  }

  return (
    <div className="w-full max-w-md">
      <Callout variant="info" title="Dismissible Callout" dismissible onDismiss={() => setVisible(false)}>
        Click the X to dismiss this callout.
      </Callout>
    </div>
  );
}

export function CalloutWithoutIconPreview() {
  return (
    <div className="w-full max-w-md p-4 rounded-lg border bg-blue-500/10 border-blue-500/20">
      <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400">Note</h4>
      <p className="mt-1 text-sm text-[var(--component-text-muted)]">
        This callout doesn't have an icon, keeping it minimal.
      </p>
    </div>
  );
}
