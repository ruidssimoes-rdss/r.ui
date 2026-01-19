import type { Rule } from '../../types.js';
import * as t from '@babel/types';
import {
  getStyleProperties,
  getStringStyleValue,
  isHexColor,
  isRgbColor,
  getAttributeValue,
  hasArbitraryColor,
} from '../../utils.js';
import type { NodePath } from '@babel/traverse';

const COLOR_PROPERTIES = [
  'color',
  'backgroundColor',
  'borderColor',
  'borderTopColor',
  'borderBottomColor',
  'borderLeftColor',
  'borderRightColor',
  'shadowColor',
  'tintColor',
  'overlayColor',
];

/**
 * Detects hardcoded color values instead of design tokens
 *
 * Bad:
 * <View style={{ backgroundColor: '#3b82f6' }}>
 * <Text className="text-[#ff0000]">
 *
 * Good:
 * <View className="bg-primary">
 * <Text className="text-error">
 */
export const hardcodedColor: Rule = {
  name: 'design/hardcoded-color',
  description: 'Use design tokens instead of hardcoded colors',
  severity: 'warning',
  category: 'design',

  create(context) {
    return {
      JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        // Check style prop for hardcoded colors
        const styleProps = getStyleProperties(path.node);

        for (const prop of styleProps) {
          if (!t.isIdentifier(prop.key)) continue;

          const propName = prop.key.name;
          if (!COLOR_PROPERTIES.includes(propName)) continue;

          const value = getStringStyleValue(prop);
          if (!value) continue;

          if (isHexColor(value) || isRgbColor(value)) {
            const loc = prop.loc ?? path.node.loc;
            const line = loc?.start.line ?? 0;
            const column = loc?.start.column ?? 0;

            // Suggest a token based on the property
            let suggestion = 'colors.<token>';
            if (propName === 'backgroundColor') {
              suggestion = 'bg-<token> (e.g., bg-primary, bg-secondary)';
            } else if (propName === 'color') {
              suggestion = 'text-<token> (e.g., text-primary, text-muted)';
            } else if (propName.includes('border')) {
              suggestion = 'border-<token> (e.g., border-primary, border-muted)';
            }

            context.report({
              rule: 'design/hardcoded-color',
              severity: 'warning',
              message: `Hardcoded color value: ${value}`,
              line,
              column,
              code: `${propName}: '${value}'`,
              fix: `Use design token: ${suggestion}`,
              docs: 'https://r-ui.dev/tokens/colors',
            });
          }
        }

        // Check className for arbitrary color values
        const className = getAttributeValue(path.node, 'className');
        if (className && hasArbitraryColor(className)) {
          const loc = path.node.loc;
          const line = loc?.start.line ?? 0;
          const column = loc?.start.column ?? 0;

          // Extract the arbitrary color
          const match = className.match(/(?:text|bg|border|fill|stroke)-\[(#[0-9A-Fa-f]+|rgb[^]]+)\]/);
          const color = match ? match[1] : 'arbitrary color';

          context.report({
            rule: 'design/hardcoded-color',
            severity: 'warning',
            message: `Hardcoded color in className: ${color}`,
            line,
            column,
            code: `className="${className}"`,
            fix: 'Use design token class (e.g., bg-primary, text-secondary)',
            docs: 'https://r-ui.dev/tokens/colors',
          });
        }
      },
    };
  },
};
