'use client';

import { LintProvider } from './LintContext';
import { LintToolbar, LintToolbarMobile } from './LintToolbar';
import { LintSplitView, LintSplitViewMobile } from './LintSplitView';
import { LintTabs, LintTabsMobile } from './LintTabs';
import { LintTabContent } from './LintTabContent';

// ========================================
// Types
// ========================================

interface LintLayoutProps {
  initialReport?: string | null;
}

// ========================================
// Inner Layout (uses context)
// ========================================

function LintInner() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-white">
      {/* Contained layout - 320px side padding on desktop */}
      <div className="w-full mx-auto px-4 lg:px-[320px] flex flex-col">
        {/* Desktop: Single combined toolbar row - 60px top padding */}
        <div className="hidden lg:block pt-[60px]">
          <LintToolbar />
        </div>

        {/* Mobile/Tablet: Compact toolbar */}
        <div className="lg:hidden pt-4">
          <LintToolbarMobile />
        </div>

        {/* Main content area - fixed 450px height */}
        <div className="lg:h-[450px] lg:flex-shrink-0 mt-0">
          {/* Desktop: Split view with border */}
          <div className="hidden lg:block h-full">
            <LintSplitView />
          </div>

          {/* Mobile/Tablet: Stacked view */}
          <div className="lg:hidden h-[400px]">
            <LintSplitViewMobile />
          </div>
        </div>

        {/* Tabs section - 24px top padding */}
        <div className="hidden lg:block pt-6 pb-8">
          <LintTabs />
          <div className="pt-4">
            <LintTabContent />
          </div>
        </div>

        {/* Mobile: Compact tabs */}
        <div className="lg:hidden pt-4 pb-8">
          <LintTabsMobile />
          <div className="pt-4">
            <LintTabContent />
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Main Component
// ========================================

export function LintLayout({ initialReport }: LintLayoutProps) {
  return (
    <LintProvider initialReport={initialReport}>
      <LintInner />
    </LintProvider>
  );
}
