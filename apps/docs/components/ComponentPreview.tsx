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
 * Clean preview area that consumes settings from PreviewContext.
 * No embedded toolbar - controlled by page-level ComponentPageHeader.
 *
 * Features:
 * - Theme-aware backgrounds (auto matches site theme, or user override)
 * - Responsive viewport simulation
 * - Zoom controls
 * - Code view toggle
 *
 * Defaults to 'auto' theme which inherits from site theme.
 */
export function ComponentPreview({ children, code, live = true }: ComponentPreviewProps) {
  const preview = usePreviewOptional();

  // Fallback values if not in PreviewProvider context
  const viewMode = preview?.viewMode ?? 'desktop';
  const resolvedTheme = preview?.resolvedTheme ?? 'oatmeal';
  const zoom = preview?.zoom ?? 100;
  const showCode = preview?.showCode ?? false;

  // Viewport width classes
  const viewportWidths: Record<ViewMode, string> = {
    mobile: 'max-w-[375px]',
    tablet: 'max-w-[768px]',
    desktop: 'max-w-full',
  };

  // Footer text color based on theme
  const footerClasses = {
    dark: 'text-white/40 border-white/10',
    light: 'text-black/40 border-black/10',
    oatmeal: 'text-stone-500/60 border-stone-300/30',
  };

  return (
    <div className="mt-6">
      {/* Preview Area */}
      {!showCode && (
        <div className={`preview-area preview-area-${resolvedTheme} relative overflow-hidden rounded-xl`}>
          {/* Ambient glow orbs - theme dependent */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {resolvedTheme === 'dark' && (
              <>
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
              </>
            )}
            {resolvedTheme === 'light' && (
              <>
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-400/5 rounded-full blur-3xl" />
              </>
            )}
            {resolvedTheme === 'oatmeal' && (
              <>
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-400/10 rounded-full blur-3xl" />
              </>
            )}
          </div>

          {/* Preview content with zoom and viewport */}
          <div
            className="relative flex items-center justify-center min-h-[200px] p-8 overflow-auto"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className={`w-full ${viewportWidths[viewMode]} mx-auto preview-theme-${resolvedTheme}`}>
              {children}
            </div>
          </div>

          {/* Footer label */}
          {live && (
            <div className={`relative px-4 py-2 text-[10px] border-t ${footerClasses[resolvedTheme]}`}>
              Live React Native components rendered via react-native-web
            </div>
          )}
        </div>
      )}

      {/* Code View */}
      {showCode && code && (
        <div className="rounded-xl overflow-hidden animate-slideDown">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
