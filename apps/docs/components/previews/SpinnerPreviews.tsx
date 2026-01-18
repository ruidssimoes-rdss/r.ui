'use client';

/**
 * Spinner Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function Spinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <svg
      className={`animate-spin text-[var(--track-fill)] ${sizeStyles[size]} ${className || ''}`}
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
  );
}

export function SpinnerBasicPreview() {
  return <Spinner />;
}

export function SpinnerSizesPreview() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}

export function SpinnerColorsPreview() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="!text-[var(--component-text)]" />
      <Spinner className="!text-emerald-500" />
      <Spinner className="!text-amber-500" />
      <Spinner className="!text-red-500" />
    </div>
  );
}

export function SpinnerWithTextPreview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Spinner size="lg" />
      <span className="text-sm text-[var(--component-text-muted)]">Loading...</span>
    </div>
  );
}

export function SpinnerButtonPreview() {
  return (
    <button
      disabled
      className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all px-4 py-2 text-sm bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] opacity-70 cursor-not-allowed"
    >
      <Spinner size="sm" className="!text-[var(--btn-primary-text)]" />
      Processing...
    </button>
  );
}
