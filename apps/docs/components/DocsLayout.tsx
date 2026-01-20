'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';

interface DocsLayoutProps {
  children: React.ReactNode;
}

/**
 * DocsLayout Component
 *
 * Minimal, clean layout with white canvas.
 * Component pages use the new playground layout (full-width, no sidebar).
 * Guide pages use the traditional three-column layout.
 */
export function DocsLayout({ children }: DocsLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === '/';
  const isLintPage = pathname === '/lint';
  const isComponentsLanding = pathname === '/docs/components';
  const isComponentPage = pathname.startsWith('/docs/components/') && !isComponentsLanding;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isDocsLanding = pathname === '/docs';

  // Homepage and Lint page get simple full-screen layout
  if (isHomepage || isLintPage) {
    return (
      <div className="min-h-screen bg-white">
        <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // Docs landing page - full-width, no sidebars (premium landing experience)
  if (isDocsLanding) {
    return (
      <div className="min-h-screen bg-white">
        <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // Components landing page - full-width, no sidebars
  if (isComponentsLanding) {
    return (
      <div className="min-h-screen bg-white">
        <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // Individual component pages use playground layout (full-width, no sidebars at all)
  if (isComponentPage) {
    return (
      <div className="min-h-screen bg-white">
        <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // Guide pages - full-width layout (same as component pages, no sidebars)
  // GuideLayout handles its own navigation and TOC
  return (
    <div className="min-h-screen bg-white">
      <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
