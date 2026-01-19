import type { Rule } from '../../types.js';
import {
  getJSXElementName,
  hasAttribute,
  isInteractiveComponent,
  hasOnPress,
} from '../../utils.js';
import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';

/**
 * Detects interactive elements without accessibilityRole
 *
 * Bad:
 * <Pressable onPress={handlePress}>
 *   <Text>Click me</Text>
 * </Pressable>
 *
 * Good:
 * <Pressable onPress={handlePress} accessibilityRole="button">
 *   <Text>Click me</Text>
 * </Pressable>
 */
export const missingAccessibilityRole: Rule = {
  name: 'a11y/missing-accessibility-role',
  description: 'Interactive elements should have an accessibilityRole',
  severity: 'warning',
  category: 'a11y',

  create(context) {
    return {
      JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        const elementName = getJSXElementName(path.node);

        // Only check interactive components
        if (!isInteractiveComponent(elementName)) return;

        // Must have onPress handler
        if (!hasOnPress(path.node)) return;

        // Check for accessibilityRole or role
        if (
          hasAttribute(path.node, 'accessibilityRole') ||
          hasAttribute(path.node, 'role')
        ) {
          return;
        }

        const loc = path.node.loc;
        const line = loc?.start.line ?? 0;
        const column = loc?.start.column ?? 0;

        // Suggest appropriate role based on component
        let suggestedRole = 'button';
        if (elementName.toLowerCase().includes('link')) {
          suggestedRole = 'link';
        }

        context.report({
          rule: 'a11y/missing-accessibility-role',
          severity: 'warning',
          message: `Interactive element <${elementName}> missing accessibilityRole`,
          line,
          column,
          code: context.getSource(path.node),
          fix: `Add accessibilityRole="${suggestedRole}"`,
          docs: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html (WCAG 4.1.2)',
        });
      },
    };
  },
};
