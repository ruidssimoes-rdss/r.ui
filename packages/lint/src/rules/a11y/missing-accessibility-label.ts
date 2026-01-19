import type { Rule } from '../../types.js';
import {
  getJSXElementName,
  hasAttribute,
  isInteractiveComponent,
  hasOnlyIconChildren,
  hasOnPress,
} from '../../utils.js';
import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';

/**
 * Detects icon-only buttons/pressables without accessibilityLabel
 *
 * Bad:
 * <Pressable onPress={handleClose}>
 *   <Icon name="close" />
 * </Pressable>
 *
 * Good:
 * <Pressable onPress={handleClose} accessibilityLabel="Close">
 *   <Icon name="close" />
 * </Pressable>
 */
export const missingAccessibilityLabel: Rule = {
  name: 'a11y/missing-accessibility-label',
  description: 'Icon-only interactive elements must have an accessibilityLabel',
  severity: 'error',
  category: 'a11y',

  create(context) {
    return {
      JSXElement(path: NodePath<t.JSXElement>) {
        const openingElement = path.node.openingElement;
        const elementName = getJSXElementName(openingElement);

        // Only check interactive components
        if (!isInteractiveComponent(elementName)) return;

        // Must have onPress handler
        if (!hasOnPress(openingElement)) return;

        // Check if it only contains icon children
        if (!hasOnlyIconChildren(path)) return;

        // Check for accessibilityLabel or aria-label
        if (
          hasAttribute(openingElement, 'accessibilityLabel') ||
          hasAttribute(openingElement, 'aria-label') ||
          hasAttribute(openingElement, 'accessible')
        ) {
          return;
        }

        const loc = openingElement.loc;
        const line = loc?.start.line ?? 0;
        const column = loc?.start.column ?? 0;

        context.report({
          rule: 'a11y/missing-accessibility-label',
          severity: 'error',
          message: 'Icon-only pressable missing accessibilityLabel',
          line,
          column,
          code: context.getSource(path.node),
          fix: 'Add accessibilityLabel="<descriptive label>"',
          docs: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html (WCAG 4.1.2)',
        });
      },
    };
  },
};
