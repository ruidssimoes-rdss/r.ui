import type { Rule } from '../types.js';

// Accessibility rules
import { missingAccessibilityLabel } from './a11y/missing-accessibility-label.js';
import { missingAccessibilityRole } from './a11y/missing-accessibility-role.js';
import { touchableMissingFeedback } from './a11y/touchable-missing-feedback.js';
import { imageMissingAlt } from './a11y/image-missing-alt.js';
import { smallTouchTarget } from './a11y/small-touch-target.js';

// Design rules
import { hardcodedColor } from './design/hardcoded-color.js';
import { hardcodedSpacing } from './design/hardcoded-spacing.js';
import { inconsistentRadius } from './design/inconsistent-radius.js';
import { missingDarkMode } from './design/missing-dark-mode.js';
import { nonTokenFontSize } from './design/non-token-font-size.js';

// Export individual rules
export {
  // A11y
  missingAccessibilityLabel,
  missingAccessibilityRole,
  touchableMissingFeedback,
  imageMissingAlt,
  smallTouchTarget,
  // Design
  hardcodedColor,
  hardcodedSpacing,
  inconsistentRadius,
  missingDarkMode,
  nonTokenFontSize,
};

// All rules array
export const allRules: Rule[] = [
  // Accessibility rules
  missingAccessibilityLabel,
  missingAccessibilityRole,
  touchableMissingFeedback,
  imageMissingAlt,
  smallTouchTarget,
  // Design rules
  hardcodedColor,
  hardcodedSpacing,
  inconsistentRadius,
  missingDarkMode,
  nonTokenFontSize,
];

// Rules grouped by category
export const rulesByCategory = {
  a11y: [
    missingAccessibilityLabel,
    missingAccessibilityRole,
    touchableMissingFeedback,
    imageMissingAlt,
    smallTouchTarget,
  ],
  design: [
    hardcodedColor,
    hardcodedSpacing,
    inconsistentRadius,
    missingDarkMode,
    nonTokenFontSize,
  ],
} as const;

// Rules map by name for easy lookup
export const rulesMap: Map<string, Rule> = new Map(
  allRules.map(rule => [rule.name, rule])
);

/**
 * Get rules filtered by name patterns
 */
export function getRulesByNames(names: string[]): Rule[] {
  const result: Rule[] = [];

  for (const name of names) {
    // Exact match
    const rule = rulesMap.get(name);
    if (rule) {
      result.push(rule);
      continue;
    }

    // Category match (e.g., "a11y/*" or just "a11y")
    if (name.endsWith('/*') || !name.includes('/')) {
      const category = name.replace('/*', '') as keyof typeof rulesByCategory;
      if (category in rulesByCategory) {
        result.push(...rulesByCategory[category]);
      }
    }
  }

  return result;
}

/**
 * Get rule documentation
 */
export function getRuleDocumentation(): Array<{
  name: string;
  description: string;
  severity: string;
  category: string;
}> {
  return allRules.map(rule => ({
    name: rule.name,
    description: rule.description,
    severity: rule.severity,
    category: rule.category,
  }));
}
