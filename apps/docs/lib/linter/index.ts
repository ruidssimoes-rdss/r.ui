import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import type { LintIssue } from './types';
import type { JSXOpeningElement, JSXAttribute, Node } from '@babel/types';

export async function lintCode(
  code: string,
  enabledRules: string[]
): Promise<{ issues: LintIssue[]; score: number }> {
  const issues: LintIssue[] = [];

  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true,
    });

    traverse(ast, {
      JSXOpeningElement(path) {
        const node = path.node as JSXOpeningElement;
        const elementName = getElementName(node.name);
        const attributes = getAttributes(node.attributes);
        const line = node.loc?.start.line || 1;
        const codeSnippet = code.split('\n')[line - 1]?.trim() || '';

        // Rule: missing-accessibility-label
        if (enabledRules.includes('missing-accessibility-label')) {
          if (
            (elementName === 'Pressable' || elementName === 'TouchableOpacity') &&
            !attributes.accessibilityLabel &&
            hasOnlyIconChild(path, code)
          ) {
            issues.push({
              rule: 'missing-accessibility-label',
              severity: 'error',
              message: 'Icon-only pressable missing accessibilityLabel',
              line,
              column: node.loc?.start.column || 0,
              code: codeSnippet,
              fix: 'Add accessibilityLabel="Description"',
              docs: 'WCAG 4.1.2',
            });
          }
        }

        // Rule: missing-accessibility-role
        if (enabledRules.includes('missing-accessibility-role')) {
          if (
            (elementName === 'Pressable' ||
              elementName === 'TouchableOpacity' ||
              elementName === 'TouchableHighlight') &&
            (attributes.onPress || attributes.onPressIn || attributes.onPressOut) &&
            !attributes.accessibilityRole
          ) {
            issues.push({
              rule: 'missing-accessibility-role',
              severity: 'warning',
              message: 'Interactive element missing accessibilityRole',
              line,
              column: node.loc?.start.column || 0,
              code: codeSnippet,
              fix: 'Add accessibilityRole="button"',
            });
          }
        }

        // Rule: touchable-missing-feedback
        if (enabledRules.includes('touchable-missing-feedback')) {
          if (elementName === 'TouchableWithoutFeedback') {
            issues.push({
              rule: 'touchable-missing-feedback',
              severity: 'warning',
              message: 'TouchableWithoutFeedback provides no visual feedback',
              line,
              column: node.loc?.start.column || 0,
              code: codeSnippet,
              fix: 'Use Pressable or TouchableOpacity instead',
            });
          }
        }

        // Rule: image-missing-alt
        if (enabledRules.includes('image-missing-alt')) {
          if (
            elementName === 'Image' &&
            !attributes.accessible &&
            !attributes.accessibilityLabel
          ) {
            issues.push({
              rule: 'image-missing-alt',
              severity: 'error',
              message: 'Image missing accessibility description',
              line,
              column: node.loc?.start.column || 0,
              code: codeSnippet,
              fix: 'Add accessible={true} accessibilityLabel="Description"',
              docs: 'WCAG 1.1.1',
            });
          }
        }

        // Rule: small-touch-target
        if (enabledRules.includes('small-touch-target')) {
          const className = typeof attributes.className === 'string' ? attributes.className : '';
          const widthMatch = className.match(/\bw-(\d+)\b/);
          const heightMatch = className.match(/\bh-(\d+)\b/);

          if (widthMatch || heightMatch) {
            const width = widthMatch ? parseInt(widthMatch[1]) * 4 : 44;
            const height = heightMatch ? parseInt(heightMatch[1]) * 4 : 44;
            if (width < 44 || height < 44) {
              issues.push({
                rule: 'small-touch-target',
                severity: 'warning',
                message: `Touch target is ${Math.min(width, height)}px, minimum recommended is 44px`,
                line,
                column: node.loc?.start.column || 0,
                code: codeSnippet,
                fix: 'Use minimum w-11 h-11 (44px) for touch targets',
                docs: 'WCAG 2.5.5',
              });
            }
          }
        }
      },

      JSXAttribute(path) {
        const node = path.node as JSXAttribute;
        if (typeof node.name.name !== 'string') return;

        const name = node.name.name;
        const line = node.loc?.start.line || 1;
        const codeSnippet = code.split('\n')[line - 1]?.trim() || '';

        // Rule: hardcoded-color
        if (enabledRules.includes('hardcoded-color')) {
          if (name === 'style' && node.value) {
            const styleStr = code.substring(node.value.start || 0, node.value.end || 0);
            const hexMatch = styleStr.match(/#[0-9a-fA-F]{3,6}/);
            const rgbMatch = styleStr.match(/rgb\(/);

            if (hexMatch || rgbMatch) {
              issues.push({
                rule: 'hardcoded-color',
                severity: 'warning',
                message: `Hardcoded color value detected: ${hexMatch?.[0] || 'rgb(...)'}`,
                line,
                column: node.loc?.start.column || 0,
                code: codeSnippet,
                fix: 'Use design token from colors.ts or NativeWind class',
              });
            }
          }
        }

        // Rule: hardcoded-spacing
        if (enabledRules.includes('hardcoded-spacing')) {
          if (name === 'style' && node.value) {
            const styleStr = code.substring(node.value.start || 0, node.value.end || 0);
            const spacingMatches = styleStr.matchAll(
              /(padding|margin|paddingHorizontal|paddingVertical|marginHorizontal|marginVertical|paddingTop|paddingBottom|paddingLeft|paddingRight|marginTop|marginBottom|marginLeft|marginRight|gap):\s*(\d+)/g
            );

            for (const match of spacingMatches) {
              const value = parseInt(match[2]);
              const validSpacing = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
              if (!validSpacing.includes(value)) {
                issues.push({
                  rule: 'hardcoded-spacing',
                  severity: 'info',
                  message: `Spacing value ${value} is not in the design scale`,
                  line,
                  column: node.loc?.start.column || 0,
                  code: codeSnippet,
                  fix: `Use nearest token: ${findNearest(value, validSpacing)}px`,
                });
                break;
              }
            }
          }
        }

        // Rule: inconsistent-radius
        if (enabledRules.includes('inconsistent-radius')) {
          if (name === 'style' && node.value) {
            const styleStr = code.substring(node.value.start || 0, node.value.end || 0);
            const radiusMatch = styleStr.match(/borderRadius:\s*(\d+)/);

            if (radiusMatch) {
              const value = parseInt(radiusMatch[1]);
              const validRadius = [0, 2, 4, 6, 8, 12, 16, 24, 9999];
              if (!validRadius.includes(value)) {
                issues.push({
                  rule: 'inconsistent-radius',
                  severity: 'info',
                  message: `Border radius ${value}px is not in the design scale`,
                  line,
                  column: node.loc?.start.column || 0,
                  code: codeSnippet,
                  fix: `Use nearest token: ${findNearest(value, validRadius)}px`,
                });
              }
            }
          }
        }

        // Rule: non-token-font-size
        if (enabledRules.includes('non-token-font-size')) {
          if (name === 'style' && node.value) {
            const styleStr = code.substring(node.value.start || 0, node.value.end || 0);
            const fontMatch = styleStr.match(/fontSize:\s*(\d+)/);

            if (fontMatch) {
              const value = parseInt(fontMatch[1]);
              const validSizes = [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60];
              if (!validSizes.includes(value)) {
                issues.push({
                  rule: 'non-token-font-size',
                  severity: 'info',
                  message: `Font size ${value}px is not in the typography scale`,
                  line,
                  column: node.loc?.start.column || 0,
                  code: codeSnippet,
                  fix: `Use nearest token: ${findNearest(value, validSizes)}px`,
                });
              }
            }
          }
        }

        // Rule: missing-dark-mode
        if (enabledRules.includes('missing-dark-mode')) {
          if (name === 'className' && node.value && node.value.type === 'StringLiteral') {
            const classValue = node.value.value;
            const lightModeColors = [
              'bg-white',
              'bg-gray-',
              'bg-slate-',
              'text-gray-',
              'text-slate-',
              'border-gray-',
              'border-slate-',
            ];
            const hasLightMode = lightModeColors.some((c) => classValue.includes(c));
            const hasDarkMode = classValue.includes('dark:');

            if (hasLightMode && !hasDarkMode) {
              issues.push({
                rule: 'missing-dark-mode',
                severity: 'warning',
                message: 'Light mode colors without dark mode variants',
                line,
                column: node.loc?.start.column || 0,
                code: codeSnippet,
                fix: 'Add dark: variants for color classes',
              });
            }
          }
        }
      },
    });
  } catch (error) {
    console.error('Parse error:', error);
  }

  // Calculate score
  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  const infoCount = issues.filter((i) => i.severity === 'info').length;

  const score = Math.max(0, 100 - errorCount * 15 - warningCount * 5 - infoCount * 2);

  return { issues, score };
}

// Helper functions
function getElementName(node: Node): string {
  if (node.type === 'JSXIdentifier') return node.name;
  if (node.type === 'JSXMemberExpression') {
    return `${getElementName(node.object)}.${node.property.name}`;
  }
  return '';
}

function getAttributes(attrs: (Node | null)[]): Record<string, string | boolean> {
  const result: Record<string, string | boolean> = {};
  for (const attr of attrs) {
    if (attr?.type === 'JSXAttribute' && attr.name?.type === 'JSXIdentifier') {
      const name = attr.name.name;
      if (attr.value?.type === 'StringLiteral') {
        result[name] = attr.value.value;
      } else {
        result[name] = true;
      }
    }
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasOnlyIconChild(path: any, code: string): boolean {
  const parent = path.parent;
  if (parent?.children?.length === 1) {
    const child = parent.children[0];
    if (child.type === 'JSXElement') {
      const childName = getElementName(child.openingElement.name);
      return childName === 'Icon' || childName.includes('Icon');
    }
  }
  // Also check if the next line contains an Icon element
  const startLine = path.node.loc?.start.line || 1;
  const lines = code.split('\n');
  const nextLine = lines[startLine]?.trim() || '';
  if (nextLine.includes('<Icon') || nextLine.includes('Icon ')) {
    return true;
  }
  return false;
}

function findNearest(value: number, scale: number[]): number {
  return scale.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}
