'use client';

import { ReactNode } from 'react';
import { PlaygroundProvider, ComponentData, usePlayground } from './PlaygroundContext';
import { PlaygroundNav, PlaygroundNavMobile } from './PlaygroundNav';
import { PlaygroundSplit, PlaygroundSplitMobile } from './PlaygroundSplit';
import { PlaygroundDocs, PlaygroundDocsCompact } from './PlaygroundDocs';

// ========================================
// Types
// ========================================

interface PlaygroundLayoutProps {
  componentData: ComponentData;
  initialVariantId?: string;
  renderPreview: (variantId: string) => ReactNode;
}

// ========================================
// Inner Layout (uses context)
// ========================================

interface PlaygroundInnerProps {
  renderPreview: (variantId: string) => ReactNode;
}

function PlaygroundInner({ renderPreview }: PlaygroundInnerProps) {
  const { activeVariantId, componentData } = usePlayground();

  // Render the current preview
  const previewContent = renderPreview(activeVariantId);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-white">
      {/* Contained layout with max-width and horizontal padding */}
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 flex flex-col h-full">
        {/* Desktop: Single combined toolbar row */}
        <div className="hidden lg:block pt-6">
          <PlaygroundNav />
        </div>

        {/* Mobile/Tablet: Compact nav */}
        <div className="lg:hidden pt-4">
          <PlaygroundNavMobile />
        </div>

        {/* Main content area - fixed height that doesn't shift */}
        <div className="flex-1 min-h-0 pt-6">
          {/* Desktop: Split view - no border/frame */}
          <div className="hidden lg:flex h-full gap-1">
            <PlaygroundSplit previewContent={previewContent} />
          </div>

          {/* Mobile/Tablet: Stacked view */}
          <div className="lg:hidden h-full">
            <PlaygroundSplitMobile previewContent={previewContent} />
          </div>
        </div>

        {/* Documentation tabs - no top border */}
        <div className="hidden lg:block max-h-[40vh] overflow-auto">
          <PlaygroundDocs />
        </div>

        {/* Mobile: Compact docs */}
        <div className="lg:hidden">
          <PlaygroundDocsCompact />
        </div>
      </div>
    </div>
  );
}

// ========================================
// Main Component
// ========================================

export function PlaygroundLayout({
  componentData,
  initialVariantId,
  renderPreview,
}: PlaygroundLayoutProps) {
  return (
    <PlaygroundProvider
      initialData={componentData}
      initialVariantId={initialVariantId}
    >
      <PlaygroundInner renderPreview={renderPreview} />
    </PlaygroundProvider>
  );
}

// ========================================
// Export for convenience
// ========================================

export { PlaygroundProvider, usePlayground } from './PlaygroundContext';
export type { ComponentData, ComponentVariant, PropTable, PropDefinition } from './PlaygroundContext';
