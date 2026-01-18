'use client';

/**
 * Badge Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const badgeBase = 'inline-flex items-center justify-center font-medium rounded-full transition-colors';

const variantStyles = {
  default: 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]',
  secondary: 'bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]',
  success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  error: 'bg-red-500/15 text-red-600 dark:text-red-400',
  outline: 'bg-transparent text-[var(--component-text)] border border-[var(--component-border)]',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
};

export function BadgeVariantsPreview() {
  return (
    <div className="flex flex-row gap-2 flex-wrap">
      <span className={`${badgeBase} ${sizeStyles.md} ${variantStyles.default}`}>Default</span>
      <span className={`${badgeBase} ${sizeStyles.md} ${variantStyles.secondary}`}>Secondary</span>
      <span className={`${badgeBase} ${sizeStyles.md} ${variantStyles.success}`}>Success</span>
      <span className={`${badgeBase} ${sizeStyles.md} ${variantStyles.warning}`}>Warning</span>
      <span className={`${badgeBase} ${sizeStyles.md} ${variantStyles.error}`}>Error</span>
      <span className={`${badgeBase} ${sizeStyles.md} ${variantStyles.outline}`}>Outline</span>
    </div>
  );
}

export function BadgeSizesPreview() {
  return (
    <div className="flex flex-row gap-2 items-center">
      <span className={`${badgeBase} ${sizeStyles.sm} ${variantStyles.default}`}>Small</span>
      <span className={`${badgeBase} ${sizeStyles.md} ${variantStyles.default}`}>Medium</span>
    </div>
  );
}
