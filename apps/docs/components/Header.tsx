'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

/**
 * Header Component
 *
 * Minimal header - clean white with subtle bottom border.
 * No theme toggle.
 */
export function Header({ onMobileMenuToggle, isMobileMenuOpen }: { onMobileMenuToggle?: () => void; isMobileMenuOpen?: boolean }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

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
      <header className="sticky top-0 z-50 h-14 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-full max-w-[1200px] items-center px-4 md:px-6 lg:px-8">
          {/* Mobile: Left section */}
          <div className="flex items-center md:hidden">
            <button
              onClick={onMobileMenuToggle}
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Desktop: Left nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            <Link
              href="/docs"
              className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/docs/components/button"
              className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Components
            </Link>
          </div>

          {/* Center: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0
                       text-xl font-bold text-gray-900 tracking-tight"
          >
            r.ui
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 md:gap-2 ml-auto md:flex-1 md:justify-end">
            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 p-2 md:px-3 md:py-1.5 text-gray-400 text-sm hover:text-gray-600 transition-colors"
            >
              <SearchIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-medium text-gray-500">
                {isMac ? '⌘' : 'Ctrl'}K
              </kbd>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/ruidssimoes/r-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="GitHub repository"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
