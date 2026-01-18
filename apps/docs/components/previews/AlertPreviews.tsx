'use client';

/**
 * Alert Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface AlertProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  title?: string;
  children: React.ReactNode;
}

const variantStyles = {
  default: {
    container: 'bg-[var(--component-bg-elevated)] border-[var(--component-border)]',
    icon: 'text-[var(--component-text)]',
    title: 'text-[var(--component-text)]',
  },
  success: {
    container: 'bg-emerald-500/10 border-emerald-500/20',
    icon: 'text-emerald-500',
    title: 'text-emerald-600 dark:text-emerald-400',
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
  info: {
    container: 'bg-blue-500/10 border-blue-500/20',
    icon: 'text-blue-500',
    title: 'text-blue-600 dark:text-blue-400',
  },
};

const icons = {
  default: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function Alert({ variant = 'default', title, children }: AlertProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${styles.container}`}>
      <div className={`flex-shrink-0 ${styles.icon}`}>{icons[variant]}</div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`text-sm font-medium ${styles.title}`}>{title}</h4>
        )}
        <p className={`text-sm text-[var(--component-text-muted)] ${title ? 'mt-1' : ''}`}>
          {children}
        </p>
      </div>
    </div>
  );
}

export function AlertBasicPreview() {
  return (
    <Alert title="Heads up!">
      You can add components to your app using the CLI.
    </Alert>
  );
}

export function AlertVariantsPreview() {
  return (
    <div className="flex flex-col gap-3">
      <Alert variant="default" title="Note">
        This is a default alert for general information.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your session is about to expire in 5 minutes.
      </Alert>
      <Alert variant="error" title="Error">
        There was a problem processing your request.
      </Alert>
      <Alert variant="info" title="Info">
        A new software update is available.
      </Alert>
    </div>
  );
}

export function AlertWithoutTitlePreview() {
  return (
    <div className="flex flex-col gap-3">
      <Alert variant="success">Your profile has been updated.</Alert>
      <Alert variant="error">Failed to load data. Please try again.</Alert>
    </div>
  );
}
