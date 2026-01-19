'use client';

import { useState } from 'react';

/**
 * Navbar Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface NavLinkProps {
  children: React.ReactNode;
  active?: boolean;
}

function NavLink({ children, active }: NavLinkProps) {
  return (
    <button
      className={`
        px-3 py-2 text-sm font-medium transition-colors
        ${active
          ? 'text-[var(--component-text)]'
          : 'text-[var(--component-text-muted)] hover:text-[var(--component-text)]'
        }
      `}
    >
      {children}
    </button>
  );
}

export function NavbarBasicPreview() {
  return (
    <nav className="w-full flex items-center justify-between px-4 h-14 bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg">
      <div className="font-bold text-[var(--component-text)]">ACME</div>
      <div className="flex items-center gap-1">
        <NavLink active>Features</NavLink>
        <NavLink>Pricing</NavLink>
        <NavLink>About</NavLink>
      </div>
      <NavLink>Login</NavLink>
    </nav>
  );
}

export function NavbarWithMobileMenuPreview() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full">
      <nav className="w-full flex items-center justify-between px-4 h-14 bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg">
        <div className="font-bold text-[var(--component-text)]">ACME</div>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-1">
          <NavLink active>Features</NavLink>
          <NavLink>Pricing</NavLink>
          <NavLink>About</NavLink>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div className="hidden sm:block">
          <NavLink>Login</NavLink>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden mt-2 p-2 bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg">
          <div className="flex flex-col">
            <NavLink active>Features</NavLink>
            <NavLink>Pricing</NavLink>
            <NavLink>About</NavLink>
            <div className="border-t border-[var(--component-border)] my-2" />
            <NavLink>Login</NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export function NavbarBorderedPreview() {
  return (
    <nav className="w-full flex items-center justify-between px-4 h-14 bg-[var(--component-bg-elevated)] border-b-2 border-[var(--component-border)]">
      <div className="font-bold text-[var(--component-text)]">ACME</div>
      <div className="flex items-center gap-1">
        <NavLink>Documentation</NavLink>
        <NavLink>GitHub</NavLink>
      </div>
    </nav>
  );
}

export function NavbarBlurredPreview() {
  return (
    <div className="relative w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg overflow-hidden">
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 h-14 bg-[var(--component-bg-elevated)]/80 backdrop-blur-md border-b border-[var(--component-border)]">
        <div className="font-bold text-[var(--component-text)]">ACME</div>
        <div className="flex items-center gap-1">
          <NavLink active>Features</NavLink>
          <NavLink>Pricing</NavLink>
        </div>
      </nav>
      <div className="absolute bottom-4 left-4 right-4 text-sm text-[var(--component-text-muted)]">
        Blur effect on scroll
      </div>
    </div>
  );
}
