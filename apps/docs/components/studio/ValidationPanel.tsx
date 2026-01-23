'use client';

import { useMemo, useState } from 'react';
import { TokenSystem, ValidationIssue, ValidationSeverity } from '@/lib/studio/types';
import {
  validateTokenSystem,
  getValidationSummary,
} from '@/lib/studio/utils/validation';

interface ValidationPanelProps {
  tokens: TokenSystem;
}

export function ValidationPanel({ tokens }: ValidationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<ValidationSeverity | 'all'>(
    'all'
  );

  const issues = useMemo(() => validateTokenSystem(tokens), [tokens]);
  const summary = useMemo(() => getValidationSummary(issues), [issues]);

  const filteredIssues = useMemo(() => {
    if (filterSeverity === 'all') return issues;
    return issues.filter((i) => i.severity === filterSeverity);
  }, [issues, filterSeverity]);

  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white">
      {/* Summary Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors"
      >
        <div className="flex items-center gap-3">
          <ShieldIcon className="w-5 h-5 text-[#6B7280]" />
          <span className="font-medium text-sm text-[#111827]">Validation</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Summary badges */}
          <div className="flex items-center gap-2">
            {summary.errors > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">
                {summary.errors} error{summary.errors !== 1 ? 's' : ''}
              </span>
            )}
            {summary.warnings > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
                {summary.warnings} warning{summary.warnings !== 1 ? 's' : ''}
              </span>
            )}
            {summary.errors === 0 && summary.warnings === 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
                All good!
              </span>
            )}
          </div>

          <ChevronIcon
            className={`w-4 h-4 text-[#6B7280] transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-[#E5E7EB]">
          {/* Filters */}
          {issues.length > 0 && (
            <div className="px-4 py-2 border-b border-[#E5E7EB] bg-[#F9FAFB] flex gap-2">
              <FilterButton
                active={filterSeverity === 'all'}
                onClick={() => setFilterSeverity('all')}
              >
                All ({summary.total})
              </FilterButton>
              <FilterButton
                active={filterSeverity === 'error'}
                onClick={() => setFilterSeverity('error')}
                className="text-red-600"
              >
                Errors ({summary.errors})
              </FilterButton>
              <FilterButton
                active={filterSeverity === 'warning'}
                onClick={() => setFilterSeverity('warning')}
                className="text-amber-600"
              >
                Warnings ({summary.warnings})
              </FilterButton>
              <FilterButton
                active={filterSeverity === 'info'}
                onClick={() => setFilterSeverity('info')}
                className="text-blue-600"
              >
                Info ({summary.info})
              </FilterButton>
            </div>
          )}

          {/* Issues List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredIssues.length === 0 ? (
              <div className="p-4 text-center text-sm text-[#6B7280]">
                {issues.length === 0
                  ? 'No issues found. Your token system looks good!'
                  : 'No issues match the current filter.'}
              </div>
            ) : (
              <div className="divide-y divide-[#E5E7EB]">
                {filteredIssues.map((issue) => (
                  <IssueItem key={issue.id} issue={issue} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function IssueItem({ issue }: { issue: ValidationIssue }) {
  const [showDetails, setShowDetails] = useState(false);

  const getSeverityStyles = (severity: ValidationSeverity) => {
    switch (severity) {
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-amber-500 bg-amber-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div
      className={`p-3 border-l-2 ${getSeverityStyles(issue.severity)} cursor-pointer hover:bg-opacity-70 transition-colors`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex-shrink-0">
          {issue.severity === 'error' && (
            <ErrorIcon className="w-4 h-4 text-red-500" />
          )}
          {issue.severity === 'warning' && (
            <WarningIcon className="w-4 h-4 text-amber-500" />
          )}
          {issue.severity === 'info' && (
            <InfoIcon className="w-4 h-4 text-blue-500" />
          )}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#111827]">{issue.title}</p>
          {showDetails && (
            <div className="mt-2 space-y-2">
              <p className="text-xs text-[#6B7280]">{issue.description}</p>
              {issue.suggestion && (
                <p className="text-xs text-[#374151]">
                  <span className="text-[#9CA3AF]">💡 </span>
                  {issue.suggestion}
                </p>
              )}
              {issue.affectedTokens && issue.affectedTokens.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {issue.affectedTokens.map((token) => (
                    <span
                      key={token}
                      className="px-1.5 py-0.5 text-[10px] bg-white border border-[#E5E7EB] rounded font-mono text-[#6B7280]"
                    >
                      {token}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <ChevronIcon
          className={`w-3.5 h-3.5 text-[#9CA3AF] flex-shrink-0 transition-transform ${
            showDetails ? 'rotate-180' : ''
          }`}
        />
      </div>
    </div>
  );
}

function FilterButton({
  children,
  active,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 text-xs rounded transition-colors ${
        active
          ? 'bg-[#18181B] text-white'
          : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB]'
      } ${className}`}
    >
      {children}
    </button>
  );
}

// Icons
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
