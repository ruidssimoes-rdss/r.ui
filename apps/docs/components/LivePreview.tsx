'use client';

import { ReactNode } from 'react';

interface LivePreviewProps {
  children: ReactNode;
  className?: string;
}

/**
 * LivePreview Component
 *
 * Wrapper for rendering React Native components via react-native-web.
 * Provides a consistent container for live interactive previews.
 */
export function LivePreview({ children, className }: LivePreviewProps) {
  return (
    <div
      className={`
        relative rounded-lg overflow-hidden
        bg-[var(--preview-bg)]
        ${className || ''}
      `}
    >
      {/* Subtle grid pattern - theme-aware */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(var(--docs-border) 1px, transparent 1px),
                           linear-gradient(90deg, var(--docs-border) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* This wrapper ensures RN components render correctly */}
      <div className="relative z-10 p-8 flex items-center justify-center min-h-[140px]">
        {children}
      </div>
    </div>
  );
}
