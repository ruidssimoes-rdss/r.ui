'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { TableOfContents } from './TableOfContents';
import { PreviewProvider } from './PreviewContext';

interface DocsLayoutProps {
  children: React.ReactNode;
}

/**
 * DocsLayout Component
 *
 * Minimal, clean layout with white canvas.
 * No glassmorphism, no shadows, no ambient glows.
 */
export function DocsLayout({ children }: DocsLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomepage = pathname === '/';
  const isComponentPage = pathname.startsWith('/docs/components/');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Homepage gets simple full-screen layout
  if (isHomepage) {
    return (
      <div className="min-h-screen bg-white">
        <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // Docs layout - clean three-column
  const content = (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

      {/* Three-column layout */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex pt-6 pb-8 gap-8">
          {/* Left Sidebar */}
          <Sidebar isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={closeMobileMenu} />

          {/* Main content - no floating panel, just clean white */}
          <main className="flex-1 min-w-0 py-6">
            {/* Breadcrumbs - only for non-component, non-introduction pages */}
            {!isComponentPage && pathname !== '/docs' && <Breadcrumbs />}
            {children}
          </main>

          {/* Right Table of Contents */}
          <TableOfContents />
        </div>
      </div>
    </div>
  );

  // Wrap component pages in PreviewProvider
  if (isComponentPage) {
    return <PreviewProvider>{content}</PreviewProvider>;
  }

  return content;
}
