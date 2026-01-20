'use client';

import { useLint } from './LintContext';

// ========================================
// Rules Data
// ========================================

const RULES = {
  accessibility: [
    {
      id: 'missing-accessibility-label',
      name: 'Missing Accessibility Label',
      description: 'Icon-only buttons must have an accessibility label for screen readers.',
      severity: 'error',
    },
    {
      id: 'missing-accessibility-role',
      name: 'Missing Accessibility Role',
      description: 'Interactive elements should specify their role for assistive technology.',
      severity: 'warning',
    },
    {
      id: 'touchable-missing-feedback',
      name: 'Touchable Missing Feedback',
      description: 'TouchableWithoutFeedback provides no visual response when pressed.',
      severity: 'warning',
    },
    {
      id: 'image-missing-alt',
      name: 'Image Missing Alt',
      description: 'Images should have accessible descriptions for screen readers.',
      severity: 'error',
    },
    {
      id: 'small-touch-target',
      name: 'Small Touch Target',
      description: 'Touch targets smaller than 44px are hard to tap accurately.',
      severity: 'warning',
    },
  ],
  design: [
    {
      id: 'hardcoded-color',
      name: 'Hardcoded Color',
      description: 'Use design tokens instead of hardcoded color values.',
      severity: 'warning',
    },
    {
      id: 'hardcoded-spacing',
      name: 'Hardcoded Spacing',
      description: 'Spacing values should follow the design scale (4, 8, 12, 16...).',
      severity: 'info',
    },
    {
      id: 'inconsistent-radius',
      name: 'Inconsistent Radius',
      description: 'Border radius values should follow the design scale.',
      severity: 'info',
    },
    {
      id: 'missing-dark-mode',
      name: 'Missing Dark Mode',
      description: 'Light-only colors need dark: variants for proper dark mode support.',
      severity: 'warning',
    },
    {
      id: 'non-token-font-size',
      name: 'Non-Token Font Size',
      description: 'Font sizes should follow the typography scale.',
      severity: 'info',
    },
  ],
};

// ========================================
// Rule Checkbox Component
// ========================================

interface RuleCheckboxProps {
  rule: {
    id: string;
    name: string;
    description: string;
    severity: string;
  };
  checked: boolean;
  onChange: () => void;
}

function RuleCheckbox({ rule, checked, onChange }: RuleCheckboxProps) {
  const severityColors = {
    error: 'bg-red-100 text-red-700',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-blue-100 text-blue-700',
  };

  const severityColor = severityColors[rule.severity as keyof typeof severityColors] || severityColors.info;

  return (
    <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors cursor-pointer group">
      <div className="pt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-0"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-[#111827] group-hover:text-[#000]">
            {rule.name}
          </span>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${severityColor}`}>
            {rule.severity}
          </span>
        </div>
        <p className="text-xs text-[#6B7280] mt-0.5">{rule.description}</p>
      </div>
    </label>
  );
}

// ========================================
// Main Component
// ========================================

export function RulesTab() {
  const { enabledRules, toggleRule, allRules } = useLint();

  const enableAll = () => {
    allRules.forEach(rule => {
      if (!enabledRules.includes(rule)) {
        toggleRule(rule);
      }
    });
  };

  const disableAll = () => {
    enabledRules.forEach(rule => {
      toggleRule(rule);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#111827]">Rules Configuration</span>
          <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded-full">
            {enabledRules.length}/{allRules.length} enabled
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={enableAll}
            className="text-xs text-[#2563EB] hover:underline"
          >
            Enable all
          </button>
          <span className="text-[#D1D5DB]">·</span>
          <button
            onClick={disableAll}
            className="text-xs text-[#6B7280] hover:text-[#374151]"
          >
            Disable all
          </button>
        </div>
      </div>

      {/* Accessibility Rules */}
      <div>
        <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide px-4 mb-2">
          Accessibility Rules
        </h3>
        <div className="border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB]">
          {RULES.accessibility.map((rule) => (
            <RuleCheckbox
              key={rule.id}
              rule={rule}
              checked={enabledRules.includes(rule.id)}
              onChange={() => toggleRule(rule.id)}
            />
          ))}
        </div>
      </div>

      {/* Design Rules */}
      <div>
        <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide px-4 mb-2">
          Design System Rules
        </h3>
        <div className="border border-[#E5E7EB] rounded-lg divide-y divide-[#E5E7EB]">
          {RULES.design.map((rule) => (
            <RuleCheckbox
              key={rule.id}
              rule={rule}
              checked={enabledRules.includes(rule.id)}
              onChange={() => toggleRule(rule.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-[#9CA3AF] px-4">
        Rules are based on WCAG 2.1 guidelines and r/ui design system principles.
      </p>
    </div>
  );
}
