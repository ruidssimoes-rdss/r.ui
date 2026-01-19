import type { Rule } from '../../types.js';
import * as t from '@babel/types';
import {
  getStyleProperties,
  getNumericStyleValue,
  getAttributeValue,
  FONT_SIZE_SCALE,
  findNearestFontSizeToken,
} from '../../utils.js';
import type { NodePath } from '@babel/traverse';

// Map font sizes to Tailwind text classes
const FONT_SIZE_TO_TAILWIND: Record<number, string> = {
  10: 'text-[10px]',
  11: 'text-[11px]',
  12: 'text-xs',
  14: 'text-sm',
  16: 'text-base',
  18: 'text-lg',
  20: 'text-xl',
  24: 'text-2xl',
  30: 'text-3xl',
  36: 'text-4xl',
  48: 'text-5xl',
  60: 'text-6xl',
  72: 'text-7xl',
  96: 'text-8xl',
  128: 'text-9xl',
};

/**
 * Detects font sizes outside the typography scale
 *
 * Bad:
 * <Text style={{ fontSize: 17 }}>
 *
 * Good:
 * <Text className="text-base">  // 16px
 * <Text className="text-lg">    // 18px
 */
export const nonTokenFontSize: Rule = {
  name: 'design/non-token-font-size',
  description: 'Use typography scale tokens for font sizes',
  severity: 'info',
  category: 'design',

  create(context) {
    return {
      JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        // Check style prop for non-token font sizes
        const styleProps = getStyleProperties(path.node);

        for (const prop of styleProps) {
          if (!t.isIdentifier(prop.key)) continue;

          const propName = prop.key.name;
          if (propName !== 'fontSize') continue;

          const value = getNumericStyleValue(prop);
          if (value === null) continue;

          // Check if value is in the font size scale
          if (FONT_SIZE_SCALE.includes(value)) continue;

          const nearest = findNearestFontSizeToken(value);
          const tailwindClass = FONT_SIZE_TO_TAILWIND[nearest] ?? `text-[${nearest}px]`;

          const loc = prop.loc ?? path.node.loc;
          const line = loc?.start.line ?? 0;
          const column = loc?.start.column ?? 0;

          context.report({
            rule: 'design/non-token-font-size',
            severity: 'info',
            message: `Font size ${value}px not in typography scale`,
            line,
            column,
            code: `fontSize: ${value}`,
            fix: `Use ${tailwindClass} (${nearest}px) or nearest token`,
            docs: 'https://r-ui.dev/tokens/typography',
          });
        }

        // Check className for arbitrary font size values
        const className = getAttributeValue(path.node, 'className');
        if (!className) return;

        // Match patterns like text-[17px]
        const arbitraryFontSizeRegex = /text-\[(\d+)px\]/g;
        let match;

        while ((match = arbitraryFontSizeRegex.exec(className)) !== null) {
          const value = parseInt(match[1], 10);

          if (FONT_SIZE_SCALE.includes(value)) continue;

          const nearest = findNearestFontSizeToken(value);
          const tailwindClass = FONT_SIZE_TO_TAILWIND[nearest] ?? `text-[${nearest}px]`;

          const loc = path.node.loc;
          const line = loc?.start.line ?? 0;
          const column = loc?.start.column ?? 0;

          context.report({
            rule: 'design/non-token-font-size',
            severity: 'info',
            message: `Arbitrary font size ${value}px in className`,
            line,
            column,
            code: match[0],
            fix: `Use ${tailwindClass} (${nearest}px) instead`,
            docs: 'https://r-ui.dev/tokens/typography',
          });
        }
      },
    };
  },
};
