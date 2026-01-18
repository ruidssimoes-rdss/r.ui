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
 * - Entire three-column layout (left sidebar + main + right TOC) wrapped as ONE centered unit
 * - max-w-[1400px] with equal side margins on wide screens
 * - Left sidebar is part of the layout flow, NOT fixed to viewport edge
 * - Proper horizontal padding (px-4 mobile, px-6 tablet, px-12 desktop)
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
    <div className="min-h-screen bg-[var(--page-bg)] relative overflow-hidden">
      {/* Ambient glow orbs - creates depth and premium floating feel */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-3xl opacity-60"
          style={{ background: 'var(--docs-orb-1)' }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full blur-3xl opacity-50"
          style={{ background: 'var(--docs-orb-2)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-3xl opacity-30"
          style={{ background: 'var(--docs-orb-3)' }}
        />
      </div>

      {/* Fixed Header */}
      <Header onMobileMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />

      {/*
        Three-column layout wrapper - centered as ONE unit
        The entire structure (sidebar + content + TOC) is centered together
        max-w-[1400px] ensures the full layout stays contained
        px-4/px-6/px-12 for responsive horizontal padding
      */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex pt-4 md:pt-6 pb-8 gap-6 lg:gap-8">
          {/* Left Sidebar - part of layout flow, not fixed to viewport */}
          <Sidebar isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={closeMobileMenu} />

          {/* Main content in floating panel with deep glassmorphism */}
          <main className="flex-1 min-w-0">
            <FloatingPanel className="relative overflow-hidden p-6 md:p-8 lg:p-10">
              {/* Breadcrumbs */}
              <Breadcrumbs />
              {children}
            </FloatingPanel>
          </main>

          {/* Right Table of Contents - theme-aware */}
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
