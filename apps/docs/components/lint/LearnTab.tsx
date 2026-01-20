'use client';

import * as React from 'react';
import { ruleExplanations } from '@/lib/linter/rule-explanations';

// ========================================
// Icons
// ========================================

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

// ========================================
// Example Code Blocks
// ========================================

const codeExamples: Record<string, { bad: string; good: string }> = {
  'missing-accessibility-label': {
    bad: `<Pressable onPress={handleClose}>
  <Icon name="close" />
</Pressable>`,
    good: `<Pressable
  onPress={handleClose}
  accessibilityLabel="Close dialog"
>
  <Icon name="close" />
</Pressable>`,
  },
  'missing-accessibility-role': {
    bad: `<Pressable onPress={handleSubmit}>
  <Text>Submit</Text>
</Pressable>`,
    good: `<Pressable
  onPress={handleSubmit}
  accessibilityRole="button"
>
  <Text>Submit</Text>
</Pressable>`,
  },
  'touchable-missing-feedback': {
    bad: `<TouchableWithoutFeedback onPress={doSomething}>
  <View><Text>Press me</Text></View>
</TouchableWithoutFeedback>`,
    good: `<Pressable onPress={doSomething}>
  <Text>Press me</Text>
</Pressable>

// Or with TouchableOpacity
<TouchableOpacity onPress={doSomething}>
  <Text>Press me</Text>
</TouchableOpacity>`,
  },
  'image-missing-alt': {
    bad: `<Image source={require('./logo.png')} />`,
    good: `<Image
  source={require('./logo.png')}
  accessible={true}
  accessibilityLabel="Company logo"
/>`,
  },
  'small-touch-target': {
    bad: `<Pressable className="w-6 h-6">
  <Icon name="menu" />
</Pressable>`,
    good: `<Pressable className="w-11 h-11">
  <Icon name="menu" />
</Pressable>`,
  },
  'hardcoded-color': {
    bad: `<View style={{ backgroundColor: '#3b82f6' }}>
  <Text style={{ color: '#ffffff' }}>Hello</Text>
</View>`,
    good: `// Using design tokens
<View className="bg-primary">
  <Text className="text-primary-foreground">Hello</Text>
</View>

// Or with theme colors
<View style={{ backgroundColor: colors.primary }}>
  <Text style={{ color: colors.primaryForeground }}>Hello</Text>
</View>`,
  },
  'hardcoded-spacing': {
    bad: `<View style={{ padding: 17, margin: 13 }}>
  <Text>Content</Text>
</View>`,
    good: `// Use standard spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
<View style={{ padding: 16, margin: 12 }}>
  <Text>Content</Text>
</View>

// Or with Tailwind classes
<View className="p-4 m-3">
  <Text>Content</Text>
</View>`,
  },
  'inconsistent-radius': {
    bad: `<View style={{ borderRadius: 7 }}>
  <Text>Card</Text>
</View>`,
    good: `// Use standard radius scale: 2, 4, 6, 8, 12, 16, 24
<View style={{ borderRadius: 8 }}>
  <Text>Card</Text>
</View>

// Or with Tailwind classes
<View className="rounded-lg">
  <Text>Card</Text>
</View>`,
  },
  'missing-dark-mode': {
    bad: `<View className="bg-white">
  <Text className="text-gray-900">Hello</Text>
</View>`,
    good: `<View className="bg-white dark:bg-gray-950">
  <Text className="text-gray-900 dark:text-gray-100">
    Hello
  </Text>
</View>`,
  },
  'non-token-font-size': {
    bad: `<Text style={{ fontSize: 13 }}>
  Some text
</Text>`,
    good: `// Use typography scale: 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60
<Text style={{ fontSize: 14 }}>
  Some text
</Text>

// Or with Tailwind classes
<Text className="text-sm">
  Some text
</Text>`,
  },
};

// ========================================
// Rule Card Component
// ========================================

interface RuleCardProps {
  ruleId: string;
}

function RuleCard({ ruleId }: RuleCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const explanation = ruleExplanations[ruleId];
  const examples = codeExamples[ruleId];

  if (!explanation) return null;

  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-[#F9FAFB] transition-colors text-left"
      >
        <span className="text-sm font-medium text-[#111827]">{explanation.title}</span>
        <ChevronDownIcon
          className={`text-[#6B7280] transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content */}
      {expanded && (
        <div className="px-4 py-4 border-t border-[#E5E7EB] bg-[#FAFAFA] space-y-4">
          {/* Why it matters */}
          <div>
            <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1">
              Why it matters
            </h4>
            <p className="text-sm text-[#374151]">{explanation.why}</p>
          </div>

          {/* Impact */}
          <div>
            <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1">
              Impact
            </h4>
            <p className="text-sm text-[#374151]">{explanation.impact}</p>
          </div>

          {/* Code examples */}
          {examples && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Bad example */}
              <div>
                <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Bad
                </h4>
                <pre className="text-xs bg-red-50 border border-red-200 rounded-md p-3 overflow-x-auto">
                  <code className="text-[#374151]">{examples.bad}</code>
                </pre>
              </div>

              {/* Good example */}
              <div>
                <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Good
                </h4>
                <pre className="text-xs bg-green-50 border border-green-200 rounded-md p-3 overflow-x-auto">
                  <code className="text-[#374151]">{examples.good}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Learn more link */}
          <a
            href={explanation.learnMore}
            target={explanation.learnMore.startsWith('http') ? '_blank' : undefined}
            rel={explanation.learnMore.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1 text-xs text-[#2563EB] hover:underline"
          >
            Learn more
            {explanation.learnMore.startsWith('http') && <ExternalLinkIcon />}
          </a>
        </div>
      )}
    </div>
  );
}

// ========================================
// Main Component
// ========================================

const accessibilityRules = [
  'missing-accessibility-label',
  'missing-accessibility-role',
  'touchable-missing-feedback',
  'image-missing-alt',
  'small-touch-target',
];

const designRules = [
  'hardcoded-color',
  'hardcoded-spacing',
  'inconsistent-radius',
  'missing-dark-mode',
  'non-token-font-size',
];

export function LearnTab() {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="px-4">
        <h3 className="text-sm font-medium text-[#111827] mb-2">Learn about linting rules</h3>
        <p className="text-sm text-[#6B7280]">
          Expand each rule to learn why it matters, its impact on users, and see code examples.
        </p>
      </div>

      {/* Accessibility Rules */}
      <div>
        <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide px-4 mb-2">
          Accessibility Rules
        </h4>
        <div className="space-y-2 px-4">
          {accessibilityRules.map((ruleId) => (
            <RuleCard key={ruleId} ruleId={ruleId} />
          ))}
        </div>
      </div>

      {/* Design Rules */}
      <div>
        <h4 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide px-4 mb-2">
          Design System Rules
        </h4>
        <div className="space-y-2 px-4">
          {designRules.map((ruleId) => (
            <RuleCard key={ruleId} ruleId={ruleId} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pt-4 border-t border-[#E5E7EB]">
        <p className="text-xs text-[#9CA3AF]">
          Based on WCAG 2.1 guidelines (4.1.2 Name, Role, Value · 1.1.1 Non-text Content · 2.5.5 Target Size)
          and r/ui design system principles.
        </p>
      </div>
    </div>
  );
}
