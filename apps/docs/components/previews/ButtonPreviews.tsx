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
  'icon-sm': 'w-8 h-8 p-0',
  icon: 'w-10 h-10 p-0',
  'icon-lg': 'w-12 h-12 p-0',
};

// Simple icon components for demos
function XIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SettingsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function MenuIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ScissorsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}

function ClipboardIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

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

export function ButtonLinkPreview() {
  return (
    <div className="flex flex-row gap-4 items-center flex-wrap">
      <button
        className="inline-flex items-center justify-center font-semibold text-sm text-[var(--color-accent-blue)] hover:underline active:underline px-1 transition-all"
      >
        Learn more
      </button>
      <button
        className="inline-flex items-center justify-center font-semibold text-sm text-[var(--color-accent-blue)] hover:underline active:underline px-1 transition-all"
      >
        Documentation
        <ExternalLinkIcon />
      </button>
      <p className="text-[var(--color-text-secondary)] text-sm">
        Read our{' '}
        <button className="inline font-semibold text-[var(--color-accent-blue)] hover:underline active:underline">
          terms of service
        </button>{' '}
        for more details.
      </p>
    </div>
  );
}

export function ButtonSuccessPreview() {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[#22c55e] text-white`}
      >
        Confirm
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[#22c55e] text-white`}
      >
        Save Changes
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-[#22c55e] text-white`}
      >
        Complete Order
      </button>
    </div>
  );
}

export function ButtonOutlinePreview() {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)]`}
      >
        Outline
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)]`}
      >
        Cancel
      </button>
    </div>
  );
}

export function ButtonIconSizesPreview() {
  return (
    <div className="flex flex-row gap-4 items-center">
      <button
        className={`${baseStyles} ${sizeStyles['icon-sm']} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
        aria-label="Close"
      >
        <XIcon size={16} />
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.icon} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
        aria-label="Settings"
      >
        <SettingsIcon size={20} />
      </button>
      <button
        className={`${baseStyles} ${sizeStyles['icon-lg']} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}
        aria-label="Menu"
      >
        <MenuIcon size={24} />
      </button>
    </div>
  );
}

export function ButtonIconVariantsPreview() {
  return (
    <div className="flex flex-row gap-3 items-center flex-wrap">
      <button
        className={`${baseStyles} ${sizeStyles.icon} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}
        aria-label="Settings"
      >
        <SettingsIcon size={20} />
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.icon} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)]`}
        aria-label="Settings"
      >
        <SettingsIcon size={20} />
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.icon} bg-transparent text-[var(--btn-ghost-text)]`}
        aria-label="Close"
      >
        <XIcon size={20} />
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.icon} bg-[var(--btn-destructive-bg)] text-[var(--btn-destructive-text)]`}
        aria-label="Delete"
      >
        <XIcon size={20} />
      </button>
      <button
        className={`${baseStyles} ${sizeStyles.icon} bg-[#22c55e] text-white rounded-full`}
        aria-label="Confirm"
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
    </div>
  );
}

export function ButtonAsChildPreview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center flex-wrap">
        <a
          href="#"
          className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] no-underline`}
        >
          As Anchor Link
        </a>
        <a
          href="#"
          className="inline-flex items-center justify-center font-semibold text-sm text-[var(--color-accent-blue)] hover:underline px-1 no-underline"
        >
          External Link
          <ExternalLinkIcon />
        </a>
      </div>
      <p className="text-[var(--color-text-muted)] text-xs">
        The <code className="text-[var(--color-accent-blue)]">asChild</code> prop allows the Button to render as any element while keeping its styles.
        Useful for navigation links, router integrations, and custom wrappers.
      </p>
    </div>
  );
}

export function ButtonGroupPreview() {
  return (
    <div className="flex flex-col gap-6">
      {/* Spaced group */}
      <div>
        <p className="text-[var(--color-text-secondary)] text-xs mb-2">Spaced (default)</p>
        <div className="flex flex-row gap-2">
          <button
            className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)]`}
          >
            Left
          </button>
          <button
            className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)]`}
          >
            Center
          </button>
          <button
            className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)]`}
          >
            Right
          </button>
        </div>
      </div>

      {/* Attached group */}
      <div>
        <p className="text-[var(--color-text-secondary)] text-xs mb-2">Attached</p>
        <div className="flex flex-row">
          <button
            className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)] rounded-r-none border-r-0`}
          >
            <CopyIcon />
            <span className="ml-1">Copy</span>
          </button>
          <button
            className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)] rounded-none border-r-0`}
          >
            <ScissorsIcon />
            <span className="ml-1">Cut</span>
          </button>
          <button
            className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)] rounded-l-none`}
          >
            <ClipboardIcon />
            <span className="ml-1">Paste</span>
          </button>
        </div>
      </div>

      {/* Vertical attached */}
      <div>
        <p className="text-[var(--color-text-secondary)] text-xs mb-2">Vertical Attached</p>
        <div className="flex flex-col w-fit">
          <button
            className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)] rounded-b-none`}
          >
            Top
          </button>
          <button
            className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)] rounded-none border-t-0`}
          >
            Middle
          </button>
          <button
            className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)] rounded-t-none border-t-0`}
          >
            Bottom
          </button>
        </div>
      </div>
    </div>
  );
}

export function ButtonAllVariantsPreview() {
  return (
    <div className="flex flex-row gap-3 flex-wrap items-center">
      <button className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}>
        Primary
      </button>
      <button className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
        Secondary
      </button>
      <button className={`${baseStyles} ${sizeStyles.md} bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)]`}>
        Outline
      </button>
      <button className={`${baseStyles} ${sizeStyles.md} bg-transparent text-[var(--btn-ghost-text)]`}>
        Ghost
      </button>
      <button className={`${baseStyles} ${sizeStyles.md} bg-[var(--btn-destructive-bg)] text-[var(--btn-destructive-text)]`}>
        Destructive
      </button>
      <button className="inline-flex items-center font-semibold text-sm text-[var(--color-accent-blue)] hover:underline px-1">
        Link
      </button>
      <button className={`${baseStyles} ${sizeStyles.md} bg-[#22c55e] text-white`}>
        Success
      </button>
    </div>
  );
}
