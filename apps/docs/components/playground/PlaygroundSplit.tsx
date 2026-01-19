'use client';

import { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { usePlayground } from './PlaygroundContext';
import { PlaygroundPreview } from './PlaygroundPreview';
import { PlaygroundCode } from './PlaygroundCode';

// ========================================
// Resizable Split View
// ========================================

interface ResizableSplitProps {
  left: ReactNode;
  right: ReactNode;
  defaultRatio?: number;
  minLeftWidth?: number;
  minRightWidth?: number;
}

function ResizableSplit({
  left,
  right,
  defaultRatio = 0.5,
  minLeftWidth = 300,
  minRightWidth = 300,
}: ResizableSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(defaultRatio);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newRatio = (e.clientX - rect.left) / rect.width;

    // Calculate min ratios based on pixel constraints
    const minLeftRatio = minLeftWidth / rect.width;
    const minRightRatio = minRightWidth / rect.width;
    const maxRatio = 1 - minRightRatio;

    setRatio(Math.min(Math.max(newRatio, minLeftRatio), maxRatio));
  }, [isDragging, minLeftWidth, minRightWidth]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Account for gap (1rem = 16px) and resize handle (4px)
  const gapSize = 20; // 16px gap + 4px handle

  return (
    <div ref={containerRef} className="flex h-full relative w-full">
      {/* Left panel - Preview */}
      <div
        className="h-full overflow-hidden rounded-lg flex-shrink-0"
        style={{ width: `calc(${ratio * 100}% - ${gapSize / 2}px)` }}
      >
        {left}
      </div>

      {/* Resize handle - subtle */}
      <div
        className={`
          w-5 h-full cursor-col-resize relative group flex-shrink-0
          flex items-center justify-center
        `}
        onMouseDown={handleMouseDown}
      >
        {/* Visual indicator */}
        <div
          className={`
            w-1 h-8 rounded-full transition-colors
            ${isDragging ? 'bg-blue-400' : 'bg-gray-200 group-hover:bg-gray-300'}
          `}
        />
      </div>

      {/* Right panel - Code */}
      <div
        className="h-full overflow-hidden rounded-lg flex-shrink-0"
        style={{ width: `calc(${(1 - ratio) * 100}% - ${gapSize / 2}px)` }}
      >
        {right}
      </div>
    </div>
  );
}

// ========================================
// Main Component
// ========================================

interface PlaygroundSplitProps {
  previewContent: ReactNode;
}

export function PlaygroundSplit({ previewContent }: PlaygroundSplitProps) {
  const { viewMode } = usePlayground();

  // Preview only
  if (viewMode === 'preview') {
    return (
      <div className="h-full rounded-lg overflow-hidden">
        <PlaygroundPreview>{previewContent}</PlaygroundPreview>
      </div>
    );
  }

  // Code only
  if (viewMode === 'code') {
    return (
      <div className="h-full rounded-lg overflow-hidden">
        <PlaygroundCode />
      </div>
    );
  }

  // Split view (default)
  return (
    <ResizableSplit
      left={<PlaygroundPreview>{previewContent}</PlaygroundPreview>}
      right={<PlaygroundCode />}
    />
  );
}

// ========================================
// Mobile Split (Stacked)
// ========================================

export function PlaygroundSplitMobile({ previewContent }: PlaygroundSplitProps) {
  const { viewMode, setViewMode } = usePlayground();
  const [mobileView, setMobileView] = useState<'preview' | 'code'>('preview');

  // On mobile, split becomes a toggle
  const activeView = viewMode === 'split' ? mobileView : viewMode === 'preview' ? 'preview' : 'code';

  return (
    <div className="h-full flex flex-col">
      {/* Toggle buttons */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => {
            setMobileView('preview');
            if (viewMode !== 'split') setViewMode('preview');
          }}
          className={`
            flex-1 py-2 text-sm font-medium transition-colors
            ${activeView === 'preview'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          Preview
        </button>
        <button
          onClick={() => {
            setMobileView('code');
            if (viewMode !== 'split') setViewMode('code');
          }}
          className={`
            flex-1 py-2 text-sm font-medium transition-colors
            ${activeView === 'code'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          Code
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'preview' ? (
          <PlaygroundPreview>{previewContent}</PlaygroundPreview>
        ) : (
          <PlaygroundCode />
        )}
      </div>
    </div>
  );
}
