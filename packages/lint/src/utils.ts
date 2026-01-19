import * as t from '@babel/types';
import type { NodePath } from '@babel/traverse';

// Design token scales
export const SPACING_SCALE = [0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 96];
export const RADIUS_SCALE = [0, 2, 4, 6, 8, 12, 16, 24, 9999];
export const FONT_SIZE_SCALE = [10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128];
export const MIN_TOUCH_TARGET = 44;

// Tailwind spacing class to px mapping
export const TAILWIND_SPACING: Record<string, number> = {
  '0': 0, '0.5': 2, '1': 4, '1.5': 6, '2': 8, '2.5': 10, '3': 12, '3.5': 14,
  '4': 16, '5': 20, '6': 24, '7': 28, '8': 32, '9': 36, '10': 40, '11': 44,
  '12': 48, '14': 56, '16': 64, '20': 80, '24': 96, '28': 112, '32': 128,
  '36': 144, '40': 160, '44': 176, '48': 192, '52': 208, '56': 224, '60': 240,
  '64': 256, '72': 288, '80': 320, '96': 384,
};

// Light mode colors that need dark mode variants
export const LIGHT_MODE_COLORS = [
  'white', 'black', 'gray-50', 'gray-100', 'gray-200', 'gray-800', 'gray-900',
  'slate-50', 'slate-100', 'slate-200', 'slate-800', 'slate-900',
  'zinc-50', 'zinc-100', 'zinc-200', 'zinc-800', 'zinc-900',
  'neutral-50', 'neutral-100', 'neutral-200', 'neutral-800', 'neutral-900',
];

// Interactive component names
export const INTERACTIVE_COMPONENTS = [
  'Pressable', 'TouchableOpacity', 'TouchableHighlight', 'TouchableNativeFeedback',
  'TouchableWithoutFeedback', 'Button', 'Link', 'IconButton',
];

// Icon-only component indicators
export const ICON_COMPONENTS = ['Icon', 'Ionicons', 'MaterialIcons', 'FontAwesome', 'Feather', 'AntDesign'];

/**
 * Check if a JSX element is an interactive component
 */
export function isInteractiveComponent(elementName: string): boolean {
  return INTERACTIVE_COMPONENTS.includes(elementName);
}

/**
 * Check if a JSX element is an icon component
 */
export function isIconComponent(elementName: string): boolean {
  return ICON_COMPONENTS.some(icon => elementName.includes(icon) || elementName === 'Icon');
}

/**
 * Get the name of a JSX element
 */
export function getJSXElementName(node: t.JSXOpeningElement): string {
  if (t.isJSXIdentifier(node.name)) {
    return node.name.name;
  }
  if (t.isJSXMemberExpression(node.name)) {
    return `${getJSXMemberExpressionName(node.name)}`;
  }
  return '';
}

function getJSXMemberExpressionName(node: t.JSXMemberExpression): string {
  const object = t.isJSXIdentifier(node.object)
    ? node.object.name
    : getJSXMemberExpressionName(node.object as t.JSXMemberExpression);
  return `${object}.${node.property.name}`;
}

/**
 * Check if a JSX element has a specific attribute
 */
export function hasAttribute(node: t.JSXOpeningElement, attrName: string): boolean {
  return node.attributes.some(attr =>
    t.isJSXAttribute(attr) &&
    t.isJSXIdentifier(attr.name) &&
    attr.name.name === attrName
  );
}

/**
 * Get the value of a JSX attribute
 */
export function getAttributeValue(node: t.JSXOpeningElement, attrName: string): string | null {
  const attr = node.attributes.find(attr =>
    t.isJSXAttribute(attr) &&
    t.isJSXIdentifier(attr.name) &&
    attr.name.name === attrName
  );

  if (!attr || !t.isJSXAttribute(attr)) return null;

  if (t.isStringLiteral(attr.value)) {
    return attr.value.value;
  }
  if (t.isJSXExpressionContainer(attr.value) && t.isStringLiteral(attr.value.expression)) {
    return attr.value.expression.value;
  }
  return null;
}

/**
 * Check if a JSX element has the onPress prop
 */
export function hasOnPress(node: t.JSXOpeningElement): boolean {
  return hasAttribute(node, 'onPress') ||
         hasAttribute(node, 'onPressIn') ||
         hasAttribute(node, 'onPressOut') ||
         hasAttribute(node, 'onLongPress');
}

/**
 * Get style object properties from a JSX attribute
 */
export function getStyleProperties(node: t.JSXOpeningElement): t.ObjectProperty[] {
  const styleAttr = node.attributes.find(attr =>
    t.isJSXAttribute(attr) &&
    t.isJSXIdentifier(attr.name) &&
    attr.name.name === 'style'
  );

  if (!styleAttr || !t.isJSXAttribute(styleAttr)) return [];

  if (t.isJSXExpressionContainer(styleAttr.value)) {
    const expr = styleAttr.value.expression;
    if (t.isObjectExpression(expr)) {
      return expr.properties.filter((p): p is t.ObjectProperty => t.isObjectProperty(p));
    }
    if (t.isArrayExpression(expr)) {
      return expr.elements
        .filter((e): e is t.ObjectExpression => t.isObjectExpression(e))
        .flatMap(obj => obj.properties.filter((p): p is t.ObjectProperty => t.isObjectProperty(p)));
    }
  }

  return [];
}

/**
 * Get a numeric value from a style property
 */
export function getNumericStyleValue(prop: t.ObjectProperty): number | null {
  if (t.isNumericLiteral(prop.value)) {
    return prop.value.value;
  }
  return null;
}

/**
 * Get a string value from a style property
 */
export function getStringStyleValue(prop: t.ObjectProperty): string | null {
  if (t.isStringLiteral(prop.value)) {
    return prop.value.value;
  }
  return null;
}

/**
 * Check if a value is a hex color
 */
export function isHexColor(value: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value);
}

/**
 * Check if a value is an RGB/RGBA color
 */
export function isRgbColor(value: string): boolean {
  return /^rgba?\s*\([\d\s,.%]+\)$/i.test(value);
}

/**
 * Check if a className contains an arbitrary color value
 */
export function hasArbitraryColor(className: string): boolean {
  return /(?:text|bg|border|fill|stroke)-\[#[0-9A-Fa-f]+\]/.test(className) ||
         /(?:text|bg|border|fill|stroke)-\[rgb/.test(className);
}

/**
 * Extract size from Tailwind class (e.g., w-8 -> 32, h-11 -> 44)
 */
export function extractTailwindSize(className: string, prefix: string): number | null {
  const regex = new RegExp(`${prefix}-(\\d+(?:\\.\\d+)?|\\[\\d+px\\])`);
  const match = className.match(regex);

  if (!match) return null;

  const value = match[1];

  // Handle arbitrary values like [24px]
  if (value.startsWith('[') && value.endsWith(']')) {
    const px = value.slice(1, -1).replace('px', '');
    return parseInt(px, 10);
  }

  // Handle scale values
  return TAILWIND_SPACING[value] ?? null;
}

/**
 * Find the nearest spacing token to a given value
 */
export function findNearestSpacingToken(value: number): number {
  return SPACING_SCALE.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Find the nearest radius token to a given value
 */
export function findNearestRadiusToken(value: number): number {
  return RADIUS_SCALE.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Find the nearest font size token to a given value
 */
export function findNearestFontSizeToken(value: number): number {
  return FONT_SIZE_SCALE.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

/**
 * Convert spacing value to Tailwind class
 */
export function spacingToTailwindClass(value: number): string {
  const entries = Object.entries(TAILWIND_SPACING);
  const match = entries.find(([_, v]) => v === value);
  return match ? match[0] : String(value / 4);
}

/**
 * Get all children of a JSX element
 */
export function getJSXChildren(path: NodePath<t.JSXElement>): t.JSXElement[] {
  const children: t.JSXElement[] = [];

  path.node.children.forEach(child => {
    if (t.isJSXElement(child)) {
      children.push(child);
    }
  });

  return children;
}

/**
 * Check if JSX element only contains icon children (no text)
 */
export function hasOnlyIconChildren(path: NodePath<t.JSXElement>): boolean {
  const children = path.node.children.filter(child =>
    !t.isJSXText(child) || child.value.trim() !== ''
  );

  if (children.length === 0) return false;

  return children.every(child => {
    if (t.isJSXElement(child)) {
      const name = getJSXElementName(child.openingElement);
      return isIconComponent(name);
    }
    return false;
  });
}

/**
 * Check if a className has a dark mode variant
 */
export function hasDarkModeVariant(className: string, colorClass: string): boolean {
  // Check for dark: prefix variant of the color
  const darkRegex = new RegExp(`dark:(?:bg|text|border)-`);
  return darkRegex.test(className);
}

/**
 * Extract color classes that need dark mode variants
 */
export function extractLightModeColorClasses(className: string): string[] {
  const colorClasses: string[] = [];
  const parts = className.split(/\s+/);

  for (const part of parts) {
    // Skip if it's already a dark mode class
    if (part.startsWith('dark:')) continue;

    // Check for light mode colors
    for (const color of LIGHT_MODE_COLORS) {
      if (part.includes(`-${color}`) || part === `bg-${color}` || part === `text-${color}`) {
        colorClasses.push(part);
        break;
      }
    }
  }

  return colorClasses;
}

/**
 * Calculate a score based on issues found
 */
export function calculateScore(errors: number, warnings: number, infos: number): number {
  const deductions = (errors * 10) + (warnings * 3) + (infos * 1);
  return Math.max(0, Math.min(100, 100 - deductions));
}
