'use client';

import * as React from 'react';
import type { LintIssue } from '@/lib/linter/types';

interface LintResultsProps {
  issues: LintIssue[];
  score: number;
}

export function LintResults({ issues, score }: LintResultsProps) {
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');
  const infos = issues.filter((i) => i.severity === 'info');

  const scoreColor =
    score >= 90
      ? 'text-green-500'
      : score >= 70
        ? 'text-yellow-500'
        : 'text-red-500';

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-800/50">
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-900 dark:text-gray-100">Results</span>
          <div className="flex items-center gap-3 text-sm">
            {errors.length > 0 && (
              <span className="text-red-500">
                {errors.length} error{errors.length !== 1 ? 's' : ''}
              </span>
            )}
            {warnings.length > 0 && (
              <span className="text-yellow-500">
                {warnings.length} warning{warnings.length !== 1 ? 's' : ''}
              </span>
            )}
            {infos.length > 0 && (
              <span className="text-blue-500">
                {infos.length} info
              </span>
            )}
            {issues.length === 0 && (
              <span className="text-green-500">No issues found!</span>
            )}
          </div>
        </div>
        <div className={`text-2xl font-bold ${scoreColor}`}>{score}/100</div>
      </div>

      {/* Issues List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {issues.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">✅</div>
            <p>Your code looks great! No issues detected.</p>
          </div>
        ) : (
          issues.map((issue, index) => <LintIssueCard key={index} issue={issue} />)
        )}
      </div>
    </div>
  );
}

function LintIssueCard({ issue }: { issue: LintIssue }) {
  const severityConfig = {
    error: {
      icon: '🔴',
      color: 'text-red-500',
      bg: 'bg-red-500/5 dark:bg-red-500/10',
    },
    warning: {
      icon: '🟡',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/5 dark:bg-yellow-500/10',
    },
    info: {
      icon: '🔵',
      color: 'text-blue-500',
      bg: 'bg-blue-500/5 dark:bg-blue-500/10',
    },
  };

  const config = severityConfig[issue.severity];

  return (
    <div className={`p-4 ${config.bg}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`font-medium ${config.color}`}>
              {issue.severity.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{issue.rule}</span>
            <span className="text-sm text-gray-400 dark:text-gray-500">
              (Line {issue.line})
            </span>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{issue.message}</p>

          {issue.code && (
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 rounded p-2 mb-2 overflow-x-auto">
              <code className="text-gray-800 dark:text-gray-200">{issue.code}</code>
            </pre>
          )}

          {issue.fix && (
            <p className="text-sm text-green-600 dark:text-green-400">💡 Fix: {issue.fix}</p>
          )}

          {issue.docs && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">📚 {issue.docs}</p>
          )}
        </div>
      </div>
    </div>
  );
}
