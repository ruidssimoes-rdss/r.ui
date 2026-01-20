'use client';

import * as React from 'react';
import type { LintIssue } from '@/lib/linter/types';
import { ruleExplanations } from '@/lib/linter/rule-explanations';

interface LintResultsProps {
  issues: LintIssue[];
  score: number;
}

export function LintResults({ issues, score }: LintResultsProps) {
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');
  const infos = issues.filter((i) => i.severity === 'info');

  const scoreColor = score >= 90 ? 'text-gray-500' : score >= 70 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 text-sm">
          {errors.length > 0 && (
            <span className="text-red-600 dark:text-red-500">
              {errors.length} error{errors.length !== 1 ? 's' : ''}
            </span>
          )}
          {warnings.length > 0 && (
            <span className="text-amber-600 dark:text-amber-500">
              {warnings.length} warning{warnings.length !== 1 ? 's' : ''}
            </span>
          )}
          {infos.length > 0 && <span className="text-gray-500">{infos.length} info</span>}
          {issues.length === 0 && <span className="text-gray-500">No issues found</span>}
        </div>
        <span className={`text-sm font-medium ${scoreColor}`}>{score}/100</span>
      </div>

      {/* Issues List */}
      {issues.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Your code passed all checks.
        </p>
      ) : (
        <div>
          {issues.map((issue, index) => (
            <LintIssueRow key={index} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}

function LintIssueRow({ issue }: { issue: LintIssue }) {
  const [expanded, setExpanded] = React.useState(false);

  const severityStyles = {
    error: {
      label: 'ERROR',
      textColor: 'text-red-600 dark:text-red-500',
    },
    warning: {
      label: 'WARN',
      textColor: 'text-amber-600 dark:text-amber-500',
    },
    info: {
      label: 'INFO',
      textColor: 'text-gray-500',
    },
  };

  const style = severityStyles[issue.severity];
  const explanation = ruleExplanations[issue.rule];

  return (
    <div className="py-3 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
      <div className="flex items-center gap-2 text-sm mb-1">
        <span className={`font-medium ${style.textColor}`}>{style.label}</span>
        <span className="text-gray-500 dark:text-gray-400">{issue.rule}</span>
        <span className="text-gray-400 dark:text-gray-500">Line {issue.line}</span>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{issue.message}</p>

      {issue.code && (
        <pre className="text-xs bg-gray-900 dark:bg-gray-950 text-gray-100 p-2 rounded-sm mb-2 overflow-x-auto">
          <code>{issue.code}</code>
        </pre>
      )}

      {(issue.fix || issue.docs) && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {issue.fix && <>Fix: {issue.fix}</>}
          {issue.fix && issue.docs && <> · </>}
          {issue.docs && <>{issue.docs}</>}
        </p>
      )}

      {explanation && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {expanded ? 'Hide explanation' : 'Why this matters?'}
          </button>

          {expanded && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-800 text-sm space-y-1">
              <p>
                <span className="text-gray-500 dark:text-gray-400">Why: </span>
                <span className="text-gray-700 dark:text-gray-300">{explanation.why}</span>
              </p>
              <p>
                <span className="text-gray-500 dark:text-gray-400">Impact: </span>
                <span className="text-gray-700 dark:text-gray-300">{explanation.impact}</span>
              </p>
              <a
                href={explanation.learnMore}
                target={explanation.learnMore.startsWith('http') ? '_blank' : undefined}
                rel={explanation.learnMore.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-block text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
              >
                Learn more →
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
