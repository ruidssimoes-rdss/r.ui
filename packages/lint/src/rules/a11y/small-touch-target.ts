import type { Rule } from '../../types.js';
import * as t from '@babel/types';
import {
  getJSXElementName,
  isInteractiveComponent,
  hasOnPress,
  getStyleProperties,
  getNumericStyleValue,
  getAttributeValue,
  extractTailwindSize,
  MIN_TOUCH_TARGET,
} from '../../utils.js';
import type { NodePath } from '@babel/traverse';

/**
 * Detects touch targets smaller than 44x44px
 *
 * Bad:
 * <Pressable style={{ width: 24, height: 24 }}>
 * <Pressable className="w-6 h-6">
 *
 * Good:
 * <Pressable className="w-11 h-11">
 * <Pressable style={{ width: 44, height: 44 }}>
 */
export const smallTouchTarget: Rule = {
  name: 'a11y/small-touch-target',
  description: 'Touch targets must be at least 44x44px',
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

        let width: number | null = null;
        let height: number | null = null;

        // Check style prop
        const styleProps = getStyleProperties(path.node);
        for (const prop of styleProps) {
          if (t.isIdentifier(prop.key)) {
            if (prop.key.name === 'width') {
              width = getNumericStyleValue(prop);
            } else if (prop.key.name === 'height') {
              height = getNumericStyleValue(prop);
            }
          }
        }

        // Check className prop for Tailwind classes
        const className = getAttributeValue(path.node, 'className') ?? '';

        if (className) {
          const twWidth = extractTailwindSize(className, 'w');
          const twHeight = extractTailwindSize(className, 'h');

          if (twWidth !== null) width = twWidth;
          if (twHeight !== null) height = twHeight;

          // Also check size-* class (sets both width and height)
          const size = extractTailwindSize(className, 'size');
          if (size !== null) {
            width = size;
            height = size;
          }
        }

        // Only report if we found explicit small dimensions
        if (width === null && height === null) return;

        const isTooSmall =
          (width !== null && width < MIN_TOUCH_TARGET) ||
          (height !== null && height < MIN_TOUCH_TARGET);

        if (!isTooSmall) return;

        const loc = path.node.loc;
        const line = loc?.start.line ?? 0;
        const column = loc?.start.column ?? 0;

        const dimensions: string[] = [];
        if (width !== null && width < MIN_TOUCH_TARGET) {
          dimensions.push(`width: ${width}px`);
        }
        if (height !== null && height < MIN_TOUCH_TARGET) {
          dimensions.push(`height: ${height}px`);
        }

        context.report({
          rule: 'a11y/small-touch-target',
          severity: 'warning',
          message: `Touch target below ${MIN_TOUCH_TARGET}px minimum (${dimensions.join(', ')})`,
          line,
          column,
          code: context.getSource(path.node),
          fix: `Minimum touch target should be ${MIN_TOUCH_TARGET}x${MIN_TOUCH_TARGET}px (w-11 h-11 in Tailwind)`,
          docs: 'https://www.w3.org/WAI/WCAG21/Understanding/target-size.html (WCAG 2.5.5)',
        });
      },
    };
  },
};
