import type { Rule } from '../../types.js';
import * as t from '@babel/types';
import {
  getStyleProperties,
  getNumericStyleValue,
  getAttributeValue,
  SPACING_SCALE,
  findNearestSpacingToken,
  spacingToTailwindClass,
} from '../../utils.js';
import type { NodePath } from '@babel/traverse';

const SPACING_PROPERTIES = [
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'paddingVertical',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'gap',
  'rowGap',
  'columnGap',
];

/**
 * Detects hardcoded spacing values not in the design token scale
 *
 * Bad:
 * <View style={{ padding: 17 }}>
 * <View className="p-[17px]">
 *
 * Good:
 * <View className="p-4">  // 16px
 * <View style={{ padding: 16 }}>
 */
export const hardcodedSpacing: Rule = {
  name: 'design/hardcoded-spacing',
  description: 'Use spacing scale tokens instead of arbitrary values',
  severity: 'info',
  category: 'design',

  create(context) {
    return {
      JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        // Check style prop for non-token spacing values
        const styleProps = getStyleProperties(path.node);

        for (const prop of styleProps) {
          if (!t.isIdentifier(prop.key)) continue;

          const propName = prop.key.name;
          if (!SPACING_PROPERTIES.includes(propName)) continue;

          const value = getNumericStyleValue(prop);
          if (value === null) continue;

          // Check if value is in the spacing scale
          if (SPACING_SCALE.includes(value)) continue;

          const nearest = findNearestSpacingToken(value);
          const loc = prop.loc ?? path.node.loc;
          const line = loc?.start.line ?? 0;
          const column = loc?.start.column ?? 0;

          // Generate suggestion
          const tailwindClass = spacingToTailwindClass(nearest);
          let prefix = 'p';
          if (propName.includes('margin')) prefix = 'm';
          else if (propName.includes('gap')) prefix = 'gap';

          if (propName.includes('Top')) prefix += 't';
          else if (propName.includes('Bottom')) prefix += 'b';
          else if (propName.includes('Left')) prefix += 'l';
          else if (propName.includes('Right')) prefix += 'r';
          else if (propName.includes('Horizontal')) prefix += 'x';
          else if (propName.includes('Vertical')) prefix += 'y';

          context.report({
            rule: 'design/hardcoded-spacing',
            severity: 'info',
            message: `Spacing value ${value}px not in design scale`,
            line,
            column,
            code: `${propName}: ${value}`,
            fix: `Use ${prefix}-${tailwindClass} (${nearest}px) or nearest token`,
            docs: 'https://r-ui.dev/tokens/spacing',
          });
        }

        // Check className for arbitrary spacing values
        const className = getAttributeValue(path.node, 'className');
        if (!className) return;

        // Match patterns like p-[17px], m-[23px], gap-[11px]
        const arbitrarySpacingRegex = /(?:p|m|gap|pt|pb|pl|pr|px|py|mt|mb|ml|mr|mx|my)-\[(\d+)px\]/g;
        let match;

        while ((match = arbitrarySpacingRegex.exec(className)) !== null) {
          const value = parseInt(match[1], 10);

          if (SPACING_SCALE.includes(value)) continue;

          const nearest = findNearestSpacingToken(value);
          const tailwindClass = spacingToTailwindClass(nearest);

          const loc = path.node.loc;
          const line = loc?.start.line ?? 0;
          const column = loc?.start.column ?? 0;

          context.report({
            rule: 'design/hardcoded-spacing',
            severity: 'info',
            message: `Arbitrary spacing value ${value}px in className`,
            line,
            column,
            code: match[0],
            fix: `Use ${match[0].split('-')[0]}-${tailwindClass} (${nearest}px) instead`,
            docs: 'https://r-ui.dev/tokens/spacing',
          });
        }
      },
    };
  },
};
