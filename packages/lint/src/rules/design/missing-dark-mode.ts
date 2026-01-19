import type { Rule } from '../../types.js';
import {
  getAttributeValue,
  extractLightModeColorClasses,
  hasDarkModeVariant,
} from '../../utils.js';
import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';

/**
 * Detects colors without dark mode variants
 *
 * Bad:
 * <View className="bg-white">
 *
 * Good:
 * <View className="bg-white dark:bg-gray-900">
 */
export const missingDarkMode: Rule = {
  name: 'design/missing-dark-mode',
  description: 'Light mode colors should have dark mode variants',
  severity: 'warning',
  category: 'design',

  create(context) {
    return {
      JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        const className = getAttributeValue(path.node, 'className');
        if (!className) return;

        // Check if the className already has any dark: variants
        if (hasDarkModeVariant(className, '')) return;

        // Extract light mode color classes that need dark variants
        const lightModeClasses = extractLightModeColorClasses(className);

        if (lightModeClasses.length === 0) return;

        const loc = path.node.loc;
        const line = loc?.start.line ?? 0;
        const column = loc?.start.column ?? 0;

        // Generate dark mode suggestions
        const suggestions = lightModeClasses.map(cls => {
          if (cls.includes('white')) {
            return cls.replace('white', 'gray-900').replace(/^/, 'dark:');
          }
          if (cls.includes('black')) {
            return cls.replace('black', 'white').replace(/^/, 'dark:');
          }
          if (cls.includes('-50') || cls.includes('-100') || cls.includes('-200')) {
            const darkCls = cls.replace(/-(\d+)/, (_, num) => {
              const darkNum = 900 - parseInt(num, 10) + 50;
              return `-${Math.min(900, darkNum)}`;
            });
            return `dark:${darkCls}`;
          }
          if (cls.includes('-800') || cls.includes('-900')) {
            const darkCls = cls.replace(/-(\d+)/, (_, num) => {
              const darkNum = 950 - parseInt(num, 10);
              return `-${Math.max(50, darkNum)}`;
            });
            return `dark:${darkCls}`;
          }
          return `dark:${cls}`;
        });

        context.report({
          rule: 'design/missing-dark-mode',
          severity: 'warning',
          message: `Missing dark mode variant for: ${lightModeClasses.join(', ')}`,
          line,
          column,
          code: `className="${className}"`,
          fix: `Add dark mode variants: ${suggestions.join(' ')}`,
          docs: 'https://r-ui.dev/theming/dark-mode',
        });
      },
    };
  },
};
