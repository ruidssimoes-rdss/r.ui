'use client';

/**
 * Button Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal) since react-native-web
 * doesn't resolve CSS variables in StyleSheet objects.
 */

const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] active:opacity-90';
const sizeStyles = {
  sm: 'px-3 py-2 text-[13px]',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-4 text-base',
};

export function ButtonVariantsPreview() {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
        onClick={() => console.log('Primary pressed!')}
      >
        Primary
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
        onClick={() => console.log('Secondary pressed!')}
      >
        Secondary
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-transparent text-[var(--btn-ghost-text)]`}
        onClick={() => console.log('Ghost pressed!')}
      >
        Ghost
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-destructive-bg)] text-[var(--btn-destructive-text)]`}
        onClick={() => console.log('Destructive pressed!')}
      >
        Destructive
      </button>
    </div>
  );
}

export function ButtonSizesPreview() {
  return (
    <div className="flex flex-row gap-3 items-center">
      <button
        className={`${baseStyles} ${sizeStyles.sm} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Small
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Medium
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.lg} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
      >
        Large
      </button>
    </div>
  );
}

export function ButtonLoadingPreview() {
  return (
    <div className="flex flex-row gap-3">
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] opacity-50 cursor-not-allowed`}
        disabled
      >
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Loading...
      </button>
    </div>
  );
}

export function ButtonDisabledPreview() {
  return (
    <div className="flex flex-row gap-3">
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] opacity-50 cursor-not-allowed`}
        disabled
      >
        Disabled
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)] opacity-50 cursor-not-allowed`}
        disabled
      >
        Disabled
      </button>
    </div>
  );
}
