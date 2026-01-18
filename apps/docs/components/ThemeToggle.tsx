'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const themes = [
  { name: 'oatmeal', label: 'Oatmeal', icon: GrainIcon },
  { name: 'dark', label: 'Dark', icon: MoonIcon },
  { name: 'light', label: 'Light', icon: SunIcon },
];

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function GrainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 12V2" />
      <path d="M12 12l7-7" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * ThemeToggle Component
 *
 * Editorial design - icon button with dropdown.
 * Shows current theme icon, dropdown for dark/light/oatmeal.
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-theme-toggle]')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md bg-[var(--docs-sidebar-active)] animate-pulse" />
    );
  }

  const currentTheme = themes.find((t) => t.name === (theme === 'system' ? resolvedTheme : theme)) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative" data-theme-toggle>
      {/* Icon-only button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md
                   text-[var(--docs-text-secondary)] hover:text-[var(--docs-text)]
                   hover:bg-[var(--docs-sidebar-active)]
                   transition-colors duration-150"
        aria-label={`Theme: ${currentTheme.label}. Click to change.`}
        aria-expanded={isOpen}
      >
        <CurrentIcon className="w-5 h-5" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 py-1 min-w-[140px] rounded-lg
                     bg-[var(--docs-card)] border border-[var(--docs-border)]
                     shadow-lg z-50
                     animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {themes.map((t) => {
            const Icon = t.icon;
            const isActive = t.name === (theme === 'system' ? resolvedTheme : theme);
            return (
              <button
                key={t.name}
                onClick={() => {
                  setTheme(t.name);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-left
                           transition-colors duration-150
                           ${isActive
                             ? 'text-[var(--docs-text)] bg-[var(--docs-sidebar-active)]'
                             : 'text-[var(--docs-text-secondary)] hover:text-[var(--docs-text)] hover:bg-[var(--docs-sidebar-active)]'
                           }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
                {isActive && (
                  <svg
                    className="w-4 h-4 ml-auto text-[var(--docs-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
