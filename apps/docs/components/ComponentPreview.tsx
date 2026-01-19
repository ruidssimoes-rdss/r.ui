'use client';

import { ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';
import { usePreviewOptional, type ViewMode } from './PreviewContext';

interface ComponentPreviewProps {
  children: ReactNode;
  code?: string;
  live?: boolean;
}

/**
 * ComponentPreview Component
 *
 * Minimal preview area - white background, subtle border.
 * Centered content with consistent sizing.
 * No ambient glows or fancy effects.
 */
export function ComponentPreview({ children, code, live = true }: ComponentPreviewProps) {
  const preview = usePreviewOptional();

  const viewMode = preview?.viewMode ?? 'desktop';
  const zoom = preview?.zoom ?? 100;
  const showCode = preview?.showCode ?? false;

  // Viewport width classes
  const viewportWidths: Record<ViewMode, string> = {
    mobile: 'max-w-[375px]',
    tablet: 'max-w-[768px]',
    desktop: 'max-w-full',
  };

  return (
    <div className="mt-6">
      {/* Preview Area */}
      {!showCode && (
        <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white">
          {/* Preview content - centered */}
          <div
            className="flex items-center justify-center min-h-[200px] p-8"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center',
            }}
          >
            <div className={`w-full ${viewportWidths[viewMode]} mx-auto`}>
              {children}
            </div>
          </div>

          {/* Footer label */}
          {live && (
            <div className="px-4 py-2 text-[10px] text-gray-400 border-t border-gray-100">
              Live React Native components rendered via react-native-web
            </div>
          )}
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
