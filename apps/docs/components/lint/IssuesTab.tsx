'use client';

import * as React from 'react';
import { useLint } from './LintContext';
import type { LintIssue } from '@/lib/linter/types';
import { ruleExplanations } from '@/lib/linter/rule-explanations';
import { applyFix, applyAllFixes } from '@/lib/linter/fixes';

// ========================================
// Icons
// ========================================

function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-red-500">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-amber-500">
      <path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-blue-500">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ========================================
// Issue Row Component
// ========================================

interface IssueRowProps {
  issue: LintIssue;
  code: string;
  onFix: (issue: LintIssue) => void;
}

function IssueRow({ issue, code, onFix }: IssueRowProps) {
  const [expanded, setExpanded] = React.useState(false);

  const explanation = ruleExplanations[issue.rule];
  const fixResult = applyFix(code, issue);
  const isFixable = fixResult.canFix;

  const SeverityIcon = issue.severity === 'error' ? ErrorIcon :
    issue.severity === 'warning' ? WarningIcon : InfoIcon;

  return (
    <div className="border-b border-[#E5E7EB] last:border-b-0">
      <div className="px-4 py-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <SeverityIcon />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-[#111827]">{issue.rule}</span>
                <span className="text-xs text-[#9CA3AF]">Line {issue.line}</span>
              </div>
              <p className="text-sm text-[#6B7280] mt-0.5">{issue.message}</p>
            </div>
          </div>
          {isFixable && (
            <button
              onClick={() => onFix(issue)}
              className="flex-shrink-0 px-2.5 py-1 text-xs font-medium text-white bg-[#2563EB] rounded hover:bg-[#1D4ED8] transition-colors"
            >
              Fix
            </button>
          )}
        </div>

        {/* Code snippet */}
        {issue.code && (
          <pre className="mt-2 ml-7 text-xs bg-[#F9FAFB] p-2 rounded border border-[#E5E7EB] overflow-x-auto">
            <code className="text-[#374151]">{issue.code}</code>
          </pre>
        )}

        {/* Fix suggestion */}
        {issue.fix && (
          <p className="mt-2 ml-7 text-xs text-[#6B7280]">
            <span className="font-medium">Fix:</span> {issue.fix}
          </p>
        )}

        {/* Learn more toggle */}
        {explanation && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 ml-7 flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#374151] transition-colors"
          >
            <span>Why this matters?</span>
            <ChevronDownIcon className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}

        {/* Expanded explanation */}
        {expanded && explanation && (
          <div className="mt-2 ml-7 pt-2 border-t border-[#E5E7EB] text-sm space-y-1">
            <p>
              <span className="text-[#6B7280]">Why: </span>
              <span className="text-[#374151]">{explanation.why}</span>
            </p>
            <p>
              <span className="text-[#6B7280]">Impact: </span>
              <span className="text-[#374151]">{explanation.impact}</span>
            </p>
            <a
              href={explanation.learnMore}
              target={explanation.learnMore.startsWith('http') ? '_blank' : undefined}
              rel={explanation.learnMore.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-block text-xs text-[#2563EB] hover:underline"
            >
              Learn more →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ========================================
// Main Component
// ========================================

export function IssuesTab() {
  const { code, issues, errors, warnings, infos, handleCodeChangeFromFix } = useLint();

  const fixableIssues = issues.filter((issue) => {
    const result = applyFix(code, issue);
    return result.canFix;
  });

  const handleFixAll = () => {
    const fixedCode = applyAllFixes(code, issues);
    handleCodeChangeFromFix(fixedCode);
  };

  const handleFixIssue = (issue: LintIssue) => {
    const result = applyFix(code, issue);
    if (result.canFix && result.fixedCode) {
      handleCodeChangeFromFix(result.fixedCode);
    }
  };

  // Empty state - no code
  if (!code.trim()) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-[#6B7280]">
          Paste code in the editor to see lint results.
        </p>
      </div>
    );
  }

  // Empty state - no issues
  if (issues.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="flex justify-center mb-3">
          <CheckIcon />
        </div>
        <p className="text-sm font-medium text-[#111827]">No issues found!</p>
        <p className="text-sm text-[#6B7280] mt-1">Your code passed all checks.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[#374151] font-medium">{issues.length} issue{issues.length !== 1 ? 's' : ''} found</span>
          <span className="text-[#6B7280]">
            {errors.length > 0 && <span className="text-red-600">{errors.length} error{errors.length !== 1 ? 's' : ''}</span>}
            {errors.length > 0 && warnings.length > 0 && ' · '}
            {warnings.length > 0 && <span className="text-amber-600">{warnings.length} warning{warnings.length !== 1 ? 's' : ''}</span>}
            {(errors.length > 0 || warnings.length > 0) && infos.length > 0 && ' · '}
            {infos.length > 0 && <span className="text-blue-600">{infos.length} info</span>}
          </span>
        </div>
        {fixableIssues.length > 0 && (
          <button
            onClick={handleFixAll}
            className="px-3 py-1.5 text-xs font-medium text-white bg-[#2563EB] rounded hover:bg-[#1D4ED8] transition-colors"
          >
            Fix All ({fixableIssues.length})
          </button>
        )}
      </div>

      {/* Issues list */}
      <div>
        {issues.map((issue, index) => (
          <IssueRow
            key={index}
            issue={issue}
            code={code}
            onFix={handleFixIssue}
          />
        ))}
      </div>
    </div>
  );
}
