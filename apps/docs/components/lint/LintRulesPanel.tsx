'use client';

import * as React from 'react';

const RULES = {
  accessibility: [
    {
      id: 'missing-accessibility-label',
      name: 'Missing Accessibility Label',
      severity: 'error',
    },
    {
      id: 'missing-accessibility-role',
      name: 'Missing Accessibility Role',
      severity: 'warning',
    },
    {
      id: 'touchable-missing-feedback',
      name: 'Touchable Missing Feedback',
      severity: 'warning',
    },
    { id: 'image-missing-alt', name: 'Image Missing Alt', severity: 'error' },
    { id: 'small-touch-target', name: 'Small Touch Target', severity: 'warning' },
  ],
  design: [
    { id: 'hardcoded-color', name: 'Hardcoded Color', severity: 'warning' },
    { id: 'hardcoded-spacing', name: 'Hardcoded Spacing', severity: 'info' },
    { id: 'inconsistent-radius', name: 'Inconsistent Radius', severity: 'info' },
    { id: 'missing-dark-mode', name: 'Missing Dark Mode', severity: 'warning' },
    { id: 'non-token-font-size', name: 'Non-Token Font Size', severity: 'info' },
  ],
};

interface LintRulesPanelProps {
  enabledRules: string[];
  onToggleRule: (rule: string) => void;
}

export function LintRulesPanel({ enabledRules, onToggleRule }: LintRulesPanelProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50/50 dark:bg-gray-900/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors text-left"
      >
        <span className="font-medium text-gray-900 dark:text-gray-100">
          Rules Configuration
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {enabledRules.length}/10 enabled
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="p-4 grid md:grid-cols-2 gap-6 border-t border-gray-200 dark:border-gray-800">
          {/* Accessibility Rules */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <span>♿</span> Accessibility
            </h3>
            <div className="space-y-2">
              {RULES.accessibility.map((rule) => (
                <RuleCheckbox
                  key={rule.id}
                  rule={rule}
                  checked={enabledRules.includes(rule.id)}
                  onChange={() => onToggleRule(rule.id)}
                />
              ))}
            </div>
          </div>

          {/* Design Rules */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <span>🎨</span> Design System
            </h3>
            <div className="space-y-2">
              {RULES.design.map((rule) => (
                <RuleCheckbox
                  key={rule.id}
                  rule={rule}
                  checked={enabledRules.includes(rule.id)}
                  onChange={() => onToggleRule(rule.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RuleCheckbox({
  rule,
  checked,
  onChange,
}: {
  rule: { id: string; name: string; severity: string };
  checked: boolean;
  onChange: () => void;
}) {
  const severityColor =
    {
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-blue-500',
    }[rule.severity] || 'text-gray-500';

  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
      />
      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
        {rule.name}
      </span>
      <span className={`text-xs ${severityColor}`}>({rule.severity})</span>
    </label>
  );
}
