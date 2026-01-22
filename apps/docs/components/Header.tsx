'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SearchModal } from './SearchModal';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

/**
 * Header Component
 *
 * Centered nav layout with:
 * - Logo absolute left (using Pixelify Sans)
 * - Nav links centered
 * - Search absolute right
 *
 * Uses hy-* color palette, 4px/8px grid spacing
 */
export function Header({ onMobileMenuToggle, isMobileMenuOpen }: { onMobileMenuToggle?: () => void; isMobileMenuOpen?: boolean }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes('mac'));

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-hy-100 bg-white" role="banner">
        <nav className="relative flex items-center justify-center h-full max-w-6xl mx-auto px-6 lg:px-8" aria-label="Main navigation">
          {/* Mobile: Menu button - absolute left */}
          <div className="absolute left-6 lg:left-8 flex items-center md:hidden">
            <button
              onClick={onMobileMenuToggle}
              className="p-2 text-hy-500 hover:text-hy-900 hover:bg-hy-50 rounded-lg transition-colors landing-focus-ring"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Logo - absolute left on desktop */}
          <Link
            href="/"
            className="absolute left-6 lg:left-8 hidden md:block font-pixelify text-sm leading-5 text-hy-800 hover:text-hy-900 transition-colors landing-focus-ring rounded"
            aria-label="Hyena home"
          >
            hyena
          </Link>

          {/* Mobile: Logo - centered */}
          <Link
            href="/"
            className="md:hidden font-pixelify text-sm leading-5 text-hy-800"
            aria-label="Hyena home"
          >
            hyena
          </Link>

          {/* Nav Links - Centered (desktop only) */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/docs"
              className="px-3 py-2 text-sm font-medium text-hy-600 hover:text-hy-900 hover:bg-hy-50 rounded-lg transition-colors"
            >
              docs
            </Link>
            <Link
              href={isHomepage ? '#components' : '/docs/components'}
              className="px-3 py-2 text-sm font-medium text-hy-600 hover:text-hy-900 hover:bg-hy-50 rounded-lg transition-colors"
            >
              components
            </Link>
            <Link
              href={isHomepage ? '#tools' : '/tools'}
              className="px-3 py-2 text-sm font-medium text-hy-600 hover:text-hy-900 hover:bg-hy-50 rounded-lg transition-colors"
            >
              tools
            </Link>
          </div>

          {/* Right: Search & GitHub - absolute right */}
          <div className="absolute right-6 lg:right-8 flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-hy-400 hover:text-hy-600 hover:bg-hy-50 rounded-lg transition-colors landing-focus-ring"
              aria-label="Open search dialog, keyboard shortcut Command plus K"
            >
              <SearchIcon />
              <span className="hidden lg:inline text-sm">search</span>
              <kbd className="hidden lg:inline-flex items-center px-1 py-0.5 rounded bg-hy-100 text-[10px] font-medium text-hy-500">
                {isMac ? '⌘' : 'Ctrl'}K
              </kbd>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/hyena-studio/hyena"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-hy-400 hover:text-hy-600 hover:bg-hy-50 rounded-lg transition-colors landing-focus-ring"
              aria-label="GitHub repository"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
