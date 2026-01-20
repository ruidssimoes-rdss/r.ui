'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useLint } from './LintContext';
import type { LintIssue } from '@/lib/linter/types';

// ========================================
// Resizable Split View
// ========================================

interface ResizableSplitProps {
  left: React.ReactNode;
  right: React.ReactNode;
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

  const gapSize = 20;

  return (
    <div ref={containerRef} className="flex h-full relative w-full gap-5">
      {/* Left panel */}
      <div
        className="h-full overflow-hidden rounded-lg flex-shrink-0"
        style={{ width: `calc(${ratio * 100}% - ${gapSize / 2}px)` }}
      >
        {left}
      </div>

      {/* Resize handle */}
      <div
        className={`
          absolute top-0 h-full cursor-col-resize z-10
          flex items-center justify-center
          -ml-2.5 w-5
        `}
        style={{ left: `calc(${ratio * 100}%)` }}
        onMouseDown={handleMouseDown}
      >
        <div
          className={`
            w-1 h-8 rounded-full transition-colors
            ${isDragging ? 'bg-blue-400' : 'bg-[#E5E7EB] hover:bg-[#D1D5DB]'}
          `}
        />
      </div>

      {/* Right panel */}
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
// Code Input Panel (Left)
// ========================================

function CodeInputPanel() {
  const { code, setCode, isSharedReport, handleEditSharedCode, sharedTimestamp } = useLint();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea and line numbers
  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const lineCount = code.split('\n').length || 1;
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#FAFAFA] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E5E7EB] bg-white">
        <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">
          {isSharedReport ? 'Code (read-only)' : 'Code Input'}
        </span>
        <span className="text-xs text-[#9CA3AF]">{lineCount} lines</span>
      </div>

      {/* Shared report banner */}
      {isSharedReport && sharedTimestamp && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#F3F4F6] border-b border-[#E5E7EB]">
          <span className="text-xs text-[#6B7280]">
            Shared report · {formatDate(sharedTimestamp)}
          </span>
          <button
            onClick={handleEditSharedCode}
            className="text-xs text-[#2563EB] hover:underline"
          >
            Edit this code
          </button>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="flex-shrink-0 w-12 overflow-hidden bg-[#F3F4F6] border-r border-[#E5E7EB] select-none"
        >
          <div className="py-4 text-right pr-3">
            {lines.map((num) => (
              <div key={num} className="text-xs font-mono text-[#9CA3AF] leading-5 h-5">
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          placeholder="// Paste your React Native code here..."
          readOnly={isSharedReport}
          className={`
            flex-1 p-4 bg-transparent font-mono text-sm text-[#1F2937] leading-5
            resize-none focus:outline-none placeholder:text-[#9CA3AF]
            ${isSharedReport ? 'cursor-default' : ''}
          `}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

// ========================================
// Lint Output Panel (Right)
// ========================================

function LintOutputPanel() {
  const { code, issues, outputViewMode, setOutputViewMode } = useLint();

  return (
    <div className="h-full flex flex-col bg-[#FAFAFA] rounded-lg overflow-hidden">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E5E7EB] bg-white">
        <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">
          Output
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setOutputViewMode('issues')}
            className={`
              px-2 py-1 text-xs rounded transition-colors
              ${outputViewMode === 'issues' ? 'bg-[#F3F4F6] text-[#111827] font-medium' : 'text-[#6B7280] hover:text-[#374151]'}
            `}
          >
            Issues
          </button>
          <button
            onClick={() => setOutputViewMode('fixed')}
            className={`
              px-2 py-1 text-xs rounded transition-colors
              ${outputViewMode === 'fixed' ? 'bg-[#F3F4F6] text-[#111827] font-medium' : 'text-[#6B7280] hover:text-[#374151]'}
            `}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {outputViewMode === 'issues' ? (
          <CodeWithIssues code={code} issues={issues} />
        ) : (
          <CodePreview code={code} />
        )}
      </div>
    </div>
  );
}

// ========================================
// Code with Issue Markers
// ========================================

interface CodeWithIssuesProps {
  code: string;
  issues: LintIssue[];
}

function CodeWithIssues({ code, issues }: CodeWithIssuesProps) {
  const lines = code.split('\n');

  // Group issues by line
  const issuesByLine: Record<number, LintIssue[]> = {};
  issues.forEach((issue) => {
    if (!issuesByLine[issue.line]) {
      issuesByLine[issue.line] = [];
    }
    issuesByLine[issue.line].push(issue);
  });

  if (!code.trim()) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-[#9CA3AF]">
        Enter code to see issues
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Line numbers with issue indicators */}
      <div className="flex-shrink-0 w-12 bg-[#F3F4F6] border-r border-[#E5E7EB]">
        <div className="py-4 text-right pr-2">
          {lines.map((_, index) => {
            const lineNum = index + 1;
            const lineIssues = issuesByLine[lineNum];
            const hasError = lineIssues?.some(i => i.severity === 'error');
            const hasWarning = lineIssues?.some(i => i.severity === 'warning');

            return (
              <div key={lineNum} className="relative flex items-center justify-end h-5 leading-5">
                {lineIssues && (
                  <div
                    className={`
                      w-1.5 h-1.5 rounded-full mr-1
                      ${hasError ? 'bg-red-500' : hasWarning ? 'bg-amber-500' : 'bg-blue-500'}
                    `}
                    title={lineIssues.map(i => i.message).join('\n')}
                  />
                )}
                <span className="text-xs font-mono text-[#9CA3AF]">{lineNum}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code with highlights */}
      <div className="flex-1 overflow-x-auto">
        <pre className="p-4 text-sm font-mono text-[#1F2937] leading-5">
          {lines.map((line, index) => {
            const lineNum = index + 1;
            const lineIssues = issuesByLine[lineNum];
            const hasError = lineIssues?.some(i => i.severity === 'error');
            const hasWarning = lineIssues?.some(i => i.severity === 'warning');

            return (
              <div
                key={lineNum}
                className={`
                  h-5 group relative
                  ${hasError ? 'bg-red-50' : hasWarning ? 'bg-amber-50' : ''}
                `}
              >
                <span className={`
                  ${hasError ? 'border-b-2 border-red-400' : hasWarning ? 'border-b-2 border-amber-400' : ''}
                `}>
                  {line || ' '}
                </span>

                {/* Tooltip on hover */}
                {lineIssues && lineIssues.length > 0 && (
                  <div className="absolute left-0 top-full z-10 hidden group-hover:block mt-1 max-w-md">
                    <div className="bg-[#1F2937] text-white text-xs rounded-md shadow-lg p-2 space-y-1">
                      {lineIssues.map((issue, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className={`
                            flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1
                            ${issue.severity === 'error' ? 'bg-red-400' : issue.severity === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}
                          `} />
                          <span>{issue.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

// ========================================
// Code Preview (Fixed version)
// ========================================

interface CodePreviewProps {
  code: string;
}

function CodePreview({ code }: CodePreviewProps) {
  const lines = code.split('\n');

  if (!code.trim()) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-[#9CA3AF]">
        Enter code to see preview
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Line numbers */}
      <div className="flex-shrink-0 w-12 bg-[#F3F4F6] border-r border-[#E5E7EB]">
        <div className="py-4 text-right pr-3">
          {lines.map((_, index) => (
            <div key={index + 1} className="text-xs font-mono text-[#9CA3AF] leading-5 h-5">
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-x-auto">
        <pre className="p-4 text-sm font-mono text-[#1F2937] leading-5">
          {lines.map((line, index) => (
            <div key={index} className="h-5">
              {line || ' '}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

// ========================================
// Main Components
// ========================================

export function LintSplitView() {
  const containerClass = "h-full border border-[#E5E7EB] rounded-lg p-5";

  return (
    <div className={containerClass}>
      <ResizableSplit
        left={<CodeInputPanel />}
        right={<LintOutputPanel />}
      />
    </div>
  );
}

// ========================================
// Mobile Split View (Stacked/Toggle)
// ========================================

export function LintSplitViewMobile() {
  const [mobileView, setMobileView] = useState<'input' | 'output'>('input');

  return (
    <div className="h-full flex flex-col">
      {/* Toggle buttons */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setMobileView('input')}
          className={`
            flex-1 py-2 text-sm font-medium transition-colors
            ${mobileView === 'input'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          Input
        </button>
        <button
          onClick={() => setMobileView('output')}
          className={`
            flex-1 py-2 text-sm font-medium transition-colors
            ${mobileView === 'output'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          Output
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {mobileView === 'input' ? (
          <CodeInputPanel />
        ) : (
          <LintOutputPanel />
        )}
      </div>
    </div>
  );
}
