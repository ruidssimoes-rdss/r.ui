import type { Rule } from '../../types.js';
import * as t from '@babel/types';
import {
  getStyleProperties,
  getNumericStyleValue,
  getAttributeValue,
  RADIUS_SCALE,
  findNearestRadiusToken,
} from '../../utils.js';
import type { NodePath } from '@babel/traverse';

const RADIUS_PROPERTIES = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
];

// Map radius values to Tailwind classes
const RADIUS_TO_TAILWIND: Record<number, string> = {
  0: 'rounded-none',
  2: 'rounded-sm',
  4: 'rounded',
  6: 'rounded-md',
  8: 'rounded-lg',
  12: 'rounded-xl',
  16: 'rounded-2xl',
  24: 'rounded-3xl',
  9999: 'rounded-full',
};

/**
 * Detects border radius values outside the design system
 *
 * Bad:
 * <View style={{ borderRadius: 7 }}>
 *
 * Good:
 * <View className="rounded-md">  // 6px
 * <View className="rounded-lg">  // 8px
 */
export const inconsistentRadius: Rule = {
  name: 'design/inconsistent-radius',
  description: 'Use design system radius tokens',
  severity: 'info',
  category: 'design',

  create(context) {
    return {
      JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        // Check style prop for non-token radius values
        const styleProps = getStyleProperties(path.node);

        for (const prop of styleProps) {
          if (!t.isIdentifier(prop.key)) continue;

          const propName = prop.key.name;
          if (!RADIUS_PROPERTIES.includes(propName)) continue;

          const value = getNumericStyleValue(prop);
          if (value === null) continue;

          // Check if value is in the radius scale
          if (RADIUS_SCALE.includes(value)) continue;

          const nearest = findNearestRadiusToken(value);
          const tailwindClass = RADIUS_TO_TAILWIND[nearest] ?? `rounded-[${nearest}px]`;

          const loc = prop.loc ?? path.node.loc;
          const line = loc?.start.line ?? 0;
          const column = loc?.start.column ?? 0;

          context.report({
            rule: 'design/inconsistent-radius',
            severity: 'info',
            message: `Border radius ${value}px not in design scale`,
            line,
            column,
            code: `${propName}: ${value}`,
            fix: `Use ${tailwindClass} (${nearest}px) or nearest token`,
            docs: 'https://r-ui.dev/tokens/radius',
          });
        }

        // Check className for arbitrary radius values
        const className = getAttributeValue(path.node, 'className');
        if (!className) return;

        // Match patterns like rounded-[7px]
        const arbitraryRadiusRegex = /rounded(?:-[tblr]{1,2})?-\[(\d+)px\]/g;
        let match;

        while ((match = arbitraryRadiusRegex.exec(className)) !== null) {
          const value = parseInt(match[1], 10);

          if (RADIUS_SCALE.includes(value)) continue;

          const nearest = findNearestRadiusToken(value);
          const tailwindClass = RADIUS_TO_TAILWIND[nearest] ?? `rounded-[${nearest}px]`;

          const loc = path.node.loc;
          const line = loc?.start.line ?? 0;
          const column = loc?.start.column ?? 0;

          context.report({
            rule: 'design/inconsistent-radius',
            severity: 'info',
            message: `Arbitrary radius value ${value}px in className`,
            line,
            column,
            code: match[0],
            fix: `Use ${tailwindClass} (${nearest}px) instead`,
            docs: 'https://r-ui.dev/tokens/radius',
          });
        }
      },
    };
  },
};
