'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { TableOfContents } from './TableOfContents';
import { FloatingPanel } from './FloatingPanel';
import { PreviewProvider } from './PreviewContext';

interface DocsLayoutProps {
  children: React.ReactNode;
}

/**
 * DocsLayout Component
 *
 * coss.com-inspired premium layout with floating panels and deep glassmorphism.
 * Homepage gets immersive full-screen layout.
 * Docs pages get sidebar + floating content panel.
 *
 * Key features:
 * - Entire three-column layout wrapped in centered max-width container (~1400px)
 * - Equal side margins on wide screens
 * - Proper horizontal padding (px-6 mobile, px-12 desktop)
 * - Deep glassmorphism floating panel for content area
 * - Theme-aware backgrounds throughout
 * - PreviewProvider for shared preview state across all component previews
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

  // Homepage gets immersive full-screen layout
  if (isHomepage) {
    return (
      <div className="min-h-screen bg-[var(--page-bg)]">
        {/* Fixed Header */}
        <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

        {/* Full-screen homepage - no sidebar, no constraints, no gap */}
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // Wrap component pages in PreviewProvider for shared state
  const content = (
    <div className="min-h-screen bg-[var(--page-bg)]">
      {/* Fixed Header */}
      <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

      {/*
        Three-column layout wrapper - centered as ONE unit
        max-w-[1400px] ensures the entire layout (sidebar + content + TOC) stays contained
        px-6 mobile, px-12 desktop for comfortable breathing room on edges
      */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex pt-4 md:pt-6 pb-8">
          {/* Sidebar - theme-aware background */}
          <Sidebar isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={closeMobileMenu} />

          {/* Main content area */}
          <div className="flex-1 md:ml-56 min-w-0">
            <div className="flex gap-6 lg:gap-8">
              {/* Main content in floating panel with deep glassmorphism */}
              <main className="flex-1 min-w-0">
                <FloatingPanel className="relative overflow-hidden p-6 md:p-8 lg:p-10">
                  {/* Breadcrumbs */}
                  <Breadcrumbs />
                  {children}
                </FloatingPanel>
              </main>

              {/* Table of Contents - theme-aware */}
              <TableOfContents />
            </div>
          </div>
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
