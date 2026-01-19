'use client';

import { ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';
import { usePreviewOptional, type ViewMode } from './PreviewContext';

interface ComponentPreviewProps {
  children: ReactNode;
  code?: string;
}

/**
 * ComponentPreview Component
 *
 * Minimal preview area - white background, subtle border.
 * Centered content with consistent sizing.
 * No ambient glows or fancy effects.
 */
export function ComponentPreview({ children, code }: ComponentPreviewProps) {
  const preview = usePreviewOptional();

  const viewMode = preview?.viewMode ?? 'desktop';
  const zoom = preview?.zoom ?? 100;
  const showCode = preview?.showCode ?? false;

  // Viewport widths for responsive preview
  const viewportWidths: Record<ViewMode, string> = {
    mobile: '375px',
    tablet: '768px',
    desktop: '100%',
  };

  return (
    <div className="mt-6">
      {/* Preview Area */}
      {!showCode && (
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
          {/* Preview content - centered horizontally and vertically */}
          <div className="flex items-center justify-center min-h-[200px] p-8">
            <div
              className="transition-all duration-300 flex items-center justify-center mx-auto"
              style={{
                width: viewportWidths[viewMode],
                maxWidth: viewMode === 'desktop' ? '100%' : viewportWidths[viewMode],
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center center',
              }}
            >
              {children}
            </div>
          </div>
        </div>
      )}

      {/* Code View */}
      {showCode && code && (
        <div className="rounded-lg overflow-hidden">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
