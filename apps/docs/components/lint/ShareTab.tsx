'use client';

import * as React from 'react';
import { useLint } from './LintContext';

// ========================================
// Icons
// ========================================

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

// ========================================
// Main Component
// ========================================

export function ShareTab() {
  const { code, issues, score, errors, warnings, infos, handleShare, copyFeedback } = useLint();
  const [urlCopied, setUrlCopied] = React.useState(false);

  const handleCopyUrl = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = currentUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    }
  };

  // No results yet
  if (score === null) {
    return (
      <div className="py-12 text-center px-4">
        <div className="flex justify-center mb-3">
          <LinkIcon />
        </div>
        <p className="text-sm font-medium text-[#111827]">Nothing to share yet</p>
        <p className="text-sm text-[#6B7280] mt-1">
          Paste code and run the linter to generate a shareable report.
        </p>
      </div>
    );
  }

  // Generate report preview
  const scoreColor = score >= 90 ? 'text-green-600' : score >= 70 ? 'text-amber-600' : 'text-red-600';
  const scoreBg = score >= 90 ? 'bg-green-50' : score >= 70 ? 'bg-amber-50' : 'bg-red-50';

  return (
    <div className="space-y-6 px-4">
      {/* Header */}
      <div>
        <h3 className="text-sm font-medium text-[#111827] mb-2">Share your lint report</h3>
        <p className="text-sm text-[#6B7280]">
          Generate a shareable link to this lint report. Anyone with the link can view the results.
        </p>
      </div>

      {/* Report Preview */}
      <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">
            Report Preview
          </span>
        </div>
        <div className="p-4 space-y-4">
          {/* Score */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B7280]">Score</span>
            <span className={`text-lg font-bold ${scoreColor}`}>{score}/100</span>
          </div>

          {/* Issues breakdown */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B7280]">Issues</span>
            <div className="flex items-center gap-3 text-sm">
              {errors.length > 0 && (
                <span className="text-red-600">{errors.length} error{errors.length !== 1 ? 's' : ''}</span>
              )}
              {warnings.length > 0 && (
                <span className="text-amber-600">{warnings.length} warning{warnings.length !== 1 ? 's' : ''}</span>
              )}
              {infos.length > 0 && (
                <span className="text-blue-600">{infos.length} info</span>
              )}
              {issues.length === 0 && (
                <span className="text-green-600">No issues</span>
              )}
            </div>
          </div>

          {/* Code preview */}
          <div>
            <span className="text-sm text-[#6B7280] block mb-2">Code snippet</span>
            <pre className="text-xs bg-[#F9FAFB] border border-[#E5E7EB] rounded-md p-3 overflow-x-auto max-h-32">
              <code className="text-[#374151]">
                {code.split('\n').slice(0, 5).join('\n')}
                {code.split('\n').length > 5 && '\n...'}
              </code>
            </pre>
          </div>

          {/* Top issues */}
          {issues.length > 0 && (
            <div>
              <span className="text-sm text-[#6B7280] block mb-2">
                Top issues ({Math.min(3, issues.length)} of {issues.length})
              </span>
              <ul className="space-y-1">
                {issues.slice(0, 3).map((issue, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs">
                    <span className={`
                      w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0
                      ${issue.severity === 'error' ? 'bg-red-500' : issue.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}
                    `} />
                    <span className="text-[#374151]">{issue.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Share Actions */}
      <div className="space-y-3">
        {/* Generate/Copy Link Button */}
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition-colors"
        >
          {copyFeedback ? (
            <>
              <CheckIcon />
              Link Copied!
            </>
          ) : (
            <>
              <LinkIcon />
              Generate & Copy Link
            </>
          )}
        </button>

        {/* Current URL (if already shared) */}
        {window.location.search.includes('report=') && (
          <div className="space-y-2">
            <span className="text-xs text-[#6B7280] block">Current shareable URL:</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 px-3 py-2 text-xs font-mono bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-[#374151] truncate"
              />
              <button
                onClick={handleCopyUrl}
                className="flex-shrink-0 px-3 py-2 text-xs font-medium text-[#374151] bg-white border border-[#E5E7EB] rounded-md hover:bg-[#F9FAFB] transition-colors"
              >
                {urlCopied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Note */}
      <p className="text-xs text-[#9CA3AF]">
        Shared links include the code, issues, and score. Links are valid indefinitely.
      </p>
    </div>
  );
}
