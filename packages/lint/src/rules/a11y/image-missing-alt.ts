import type { Rule } from '../../types.js';
import { getJSXElementName, hasAttribute } from '../../utils.js';
import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';

/**
 * Detects Image components without accessible props
 *
 * Bad:
 * <Image source={logoImage} />
 *
 * Good:
 * <Image source={logoImage} accessible accessibilityLabel="Company logo" />
 */
export const imageMissingAlt: Rule = {
  name: 'a11y/image-missing-alt',
  description: 'Images must have accessible label for screen readers',
  severity: 'error',
  category: 'a11y',

  create(context) {
    return {
      JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        const elementName = getJSXElementName(path.node);

        // Check for Image components
        if (elementName !== 'Image' && elementName !== 'FastImage') return;

        // Check for accessibility props
        const hasAccessibleLabel =
          hasAttribute(path.node, 'accessibilityLabel') ||
          hasAttribute(path.node, 'aria-label') ||
          hasAttribute(path.node, 'alt');

        // Also check if it's marked as decorative
        const isDecorative =
          hasAttribute(path.node, 'accessibilityElementsHidden') ||
          hasAttribute(path.node, 'importantForAccessibility');

        if (hasAccessibleLabel || isDecorative) return;

        const loc = path.node.loc;
        const line = loc?.start.line ?? 0;
        const column = loc?.start.column ?? 0;

        context.report({
          rule: 'a11y/image-missing-alt',
          severity: 'error',
          message: 'Image missing accessible label',
          line,
          column,
          code: context.getSource(path.node),
          fix: 'Add accessible accessibilityLabel="<description>" or mark as decorative with accessibilityElementsHidden={true}',
          docs: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html (WCAG 1.1.1)',
        });
      },
    };
  },
};
