'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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

  // Guide pages - two-column layout with sidebar (TOC handled by GuideLayout)
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

      {/* Two-column layout */}
      <div className="w-full px-6 lg:px-32 xl:px-48">
        <div className="flex pt-8 pb-12 gap-12">
          {/* Left Sidebar */}
          <Sidebar isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={closeMobileMenu} />

          {/* Main content - GuideLayout handles TOC internally */}
          <main className="flex-1 min-w-0 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
