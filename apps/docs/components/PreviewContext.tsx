'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useTheme } from 'next-themes';

// ========================================
// Types
// ========================================

export type ViewMode = 'mobile' | 'tablet' | 'desktop';
export type PreviewTheme = 'dark' | 'light' | 'oatmeal' | 'auto';

interface PreviewSettings {
  viewMode: ViewMode;
  previewTheme: PreviewTheme;
  zoom: number;
  showCode: boolean;
}

interface PreviewContextValue extends PreviewSettings {
  // Computed value: resolves 'auto' to actual theme
  resolvedTheme: 'dark' | 'light' | 'oatmeal';
  // Setters
  setViewMode: (mode: ViewMode) => void;
  setPreviewTheme: (theme: PreviewTheme) => void;
  setZoom: (zoom: number) => void;
  setShowCode: (show: boolean) => void;
  toggleShowCode: () => void;
  // Convenience methods
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

// ========================================
// Context
// ========================================

const PreviewContext = createContext<PreviewContextValue | null>(null);

// ========================================
// Provider
// ========================================

interface PreviewProviderProps {
  children: ReactNode;
}

export function PreviewProvider({ children }: PreviewProviderProps) {
  const { resolvedTheme: siteTheme } = useTheme();

  // State
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('auto');
  const [zoom, setZoom] = useState(100);
  const [showCode, setShowCode] = useState(false);

  // Resolve 'auto' theme to actual site theme
  const resolvedTheme = previewTheme === 'auto'
    ? (siteTheme as 'dark' | 'light' | 'oatmeal') || 'oatmeal'
    : previewTheme;

  // Convenience methods
  const toggleShowCode = useCallback(() => {
    setShowCode(prev => !prev);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom(z => Math.min(z + 25, 200));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(z => Math.max(z - 25, 50));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(100);
  }, []);

  // Keyboard shortcuts (page-level)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if focused on input elements
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Cmd/Ctrl + K: Toggle code view
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleShowCode();
        return;
      }

      // Without modifiers
      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        switch (e.key) {
          case '1':
            setViewMode('mobile');
            break;
          case '2':
            setViewMode('tablet');
            break;
          case '3':
            setViewMode('desktop');
            break;
          case 'd':
          case 'D':
            setPreviewTheme('dark');
            break;
          case 'l':
          case 'L':
            setPreviewTheme('light');
            break;
          case 'o':
          case 'O':
            setPreviewTheme('oatmeal');
            break;
          case 'a':
          case 'A':
            setPreviewTheme('auto');
            break;
          case '+':
          case '=':
            zoomIn();
            break;
          case '-':
            zoomOut();
            break;
          case '0':
            resetZoom();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleShowCode, zoomIn, zoomOut, resetZoom]);

  const value: PreviewContextValue = {
    viewMode,
    previewTheme,
    zoom,
    showCode,
    resolvedTheme,
    setViewMode,
    setPreviewTheme,
    setZoom,
    setShowCode,
    toggleShowCode,
    zoomIn,
    zoomOut,
    resetZoom,
  };

  return (
    <PreviewContext.Provider value={value}>
      {children}
    </PreviewContext.Provider>
  );
}

// ========================================
// Hook
// ========================================

export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
}

// ========================================
// Optional hook that doesn't throw
// ========================================

export function usePreviewOptional() {
  return useContext(PreviewContext);
}
