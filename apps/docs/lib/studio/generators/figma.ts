import { TokenSystem } from '../types';

/**
 * Figma Variables JSON format
 * Reference: https://www.figma.com/plugin-docs/api/VariableCollection/
 */

interface FigmaVariable {
  name: string;
  type: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
  scopes: string[];
  valuesByMode: Record<string, unknown>;
}

interface FigmaVariableCollection {
  name: string;
  modes: { name: string; modeId: string }[];
  variables: FigmaVariable[];
}

interface FigmaExport {
  version: string;
  collections: FigmaVariableCollection[];
}

/**
 * Convert hex color to Figma RGBA format
 */
function hexToFigmaColor(hex: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: 1,
  };
}

/**
 * Generate Figma Variables JSON export
 */
export function generateFigmaVariables(tokens: TokenSystem): string {
  const lightModeId = 'light-mode';
  const darkModeId = 'dark-mode';

  // Helper to create color variable with light/dark modes
  const colorVar = (
    name: string,
    lightValue: string,
    darkValue?: string
  ): FigmaVariable => ({
    name,
    type: 'COLOR',
    scopes: ['ALL_SCOPES'],
    valuesByMode: {
      [lightModeId]: hexToFigmaColor(lightValue),
      [darkModeId]: hexToFigmaColor(darkValue || lightValue),
    },
  });

  // Helper to create number variable
  const numberVar = (name: string, value: number): FigmaVariable => ({
    name,
    type: 'FLOAT',
    scopes: ['ALL_SCOPES'],
    valuesByMode: {
      [lightModeId]: value,
      [darkModeId]: value,
    },
  });

  // Helper to create string variable
  const stringVar = (name: string, value: string): FigmaVariable => ({
    name,
    type: 'STRING',
    scopes: ['ALL_SCOPES'],
    valuesByMode: {
      [lightModeId]: value,
      [darkModeId]: value,
    },
  });

  // Build color variables
  const colorVariables: FigmaVariable[] = [];

  // Brand colors
  tokens.colors.brand.forEach((color) => {
    colorVariables.push(
      colorVar(`brand/${color.name}`, color.value.light, color.value.dark)
    );
  });

  // Semantic colors
  tokens.colors.semantic.forEach((color) => {
    colorVariables.push(
      colorVar(`semantic/${color.name}`, color.value.light, color.value.dark)
    );
  });

  // Neutral scale
  Object.entries(tokens.colors.neutral.scale).forEach(([key, value]) => {
    colorVariables.push(colorVar(`neutral/${key}`, value));
  });

  // Surface colors (these flip between light/dark modes)
  colorVariables.push(
    colorVar(
      'surface/background',
      tokens.colors.surface.background.light,
      tokens.colors.surface.background.dark
    )
  );
  colorVariables.push(
    colorVar(
      'surface/foreground',
      tokens.colors.surface.foreground.light,
      tokens.colors.surface.foreground.dark
    )
  );
  colorVariables.push(
    colorVar(
      'surface/card',
      tokens.colors.surface.card.light,
      tokens.colors.surface.card.dark
    )
  );
  colorVariables.push(
    colorVar(
      'surface/muted',
      tokens.colors.surface.muted.light,
      tokens.colors.surface.muted.dark
    )
  );
  colorVariables.push(
    colorVar(
      'surface/mutedForeground',
      tokens.colors.surface.mutedForeground.light,
      tokens.colors.surface.mutedForeground.dark
    )
  );
  colorVariables.push(
    colorVar(
      'surface/border',
      tokens.colors.surface.border.light,
      tokens.colors.surface.border.dark
    )
  );

  // Build spacing variables
  const spacingVariables: FigmaVariable[] = [
    numberVar('spacing/base-unit', tokens.spacing.baseUnit),
    ...tokens.spacing.scale.map((value, index) =>
      numberVar(`spacing/scale-${index}`, value)
    ),
  ];

  // Build radius variables
  const radiusVariables: FigmaVariable[] = [
    numberVar('radius/base', tokens.radius.base),
    ...tokens.radius.scale.map((r) => numberVar(`radius/${r.name}`, r.value)),
  ];

  // Build typography variables
  const typographyVariables: FigmaVariable[] = [
    // Font families
    ...tokens.typography.families.map((f) =>
      stringVar(`typography/font-${f.name}`, f.value)
    ),
    // Font sizes and line heights
    ...tokens.typography.sizes.flatMap((s) => [
      numberVar(`typography/size-${s.name}`, s.size),
      numberVar(`typography/line-height-${s.name}`, s.lineHeight),
    ]),
    // Font weights
    ...tokens.typography.weights.map((w) =>
      numberVar(`typography/weight-${w.name}`, w.value)
    ),
  ];

  // Build animation variables
  const animationVariables: FigmaVariable[] = [
    ...tokens.animations.durations.map((d) =>
      numberVar(`animation/duration-${d.name}`, d.value)
    ),
  ];

  // Assemble the export
  const figmaExport: FigmaExport = {
    version: '1.0',
    collections: [
      {
        name: 'Colors',
        modes: [
          { name: 'Light', modeId: lightModeId },
          { name: 'Dark', modeId: darkModeId },
        ],
        variables: colorVariables,
      },
      {
        name: 'Spacing',
        modes: [
          { name: 'Default', modeId: lightModeId },
          { name: 'Default', modeId: darkModeId },
        ],
        variables: spacingVariables,
      },
      {
        name: 'Radius',
        modes: [
          { name: 'Default', modeId: lightModeId },
          { name: 'Default', modeId: darkModeId },
        ],
        variables: radiusVariables,
      },
      {
        name: 'Typography',
        modes: [
          { name: 'Default', modeId: lightModeId },
          { name: 'Default', modeId: darkModeId },
        ],
        variables: typographyVariables,
      },
      {
        name: 'Animation',
        modes: [
          { name: 'Default', modeId: lightModeId },
          { name: 'Default', modeId: darkModeId },
        ],
        variables: animationVariables,
      },
    ],
  };

  return JSON.stringify(figmaExport, null, 2);
}

/**
 * Generate Figma Tokens Studio format (alternative format used by popular plugin)
 * Reference: https://tokens.studio/
 */
export function generateFigmaTokensStudio(tokens: TokenSystem): string {
  const tokensStudioFormat = {
    global: {
      colors: {
        brand: Object.fromEntries(
          tokens.colors.brand.map((c) => [
            c.name,
            {
              value: c.value.light,
              type: 'color',
              dark: { value: c.value.dark },
            },
          ])
        ),
        semantic: Object.fromEntries(
          tokens.colors.semantic.map((c) => [
            c.name,
            {
              value: c.value.light,
              type: 'color',
              dark: { value: c.value.dark },
            },
          ])
        ),
        neutral: Object.fromEntries(
          Object.entries(tokens.colors.neutral.scale).map(([key, value]) => [
            key,
            { value, type: 'color' },
          ])
        ),
        surface: {
          background: {
            value: tokens.colors.surface.background.light,
            type: 'color',
            dark: { value: tokens.colors.surface.background.dark },
          },
          foreground: {
            value: tokens.colors.surface.foreground.light,
            type: 'color',
            dark: { value: tokens.colors.surface.foreground.dark },
          },
          card: {
            value: tokens.colors.surface.card.light,
            type: 'color',
            dark: { value: tokens.colors.surface.card.dark },
          },
          muted: {
            value: tokens.colors.surface.muted.light,
            type: 'color',
            dark: { value: tokens.colors.surface.muted.dark },
          },
          mutedForeground: {
            value: tokens.colors.surface.mutedForeground.light,
            type: 'color',
            dark: { value: tokens.colors.surface.mutedForeground.dark },
          },
          border: {
            value: tokens.colors.surface.border.light,
            type: 'color',
            dark: { value: tokens.colors.surface.border.dark },
          },
        },
      },
      spacing: {
        baseUnit: { value: `${tokens.spacing.baseUnit}`, type: 'spacing' },
        ...Object.fromEntries(
          tokens.spacing.scale.map((value, index) => [
            `scale-${index}`,
            { value: `${value}`, type: 'spacing' },
          ])
        ),
      },
      borderRadius: {
        base: { value: `${tokens.radius.base}`, type: 'borderRadius' },
        ...Object.fromEntries(
          tokens.radius.scale.map((r) => [
            r.name,
            {
              value: r.value === 9999 ? '9999' : `${r.value}`,
              type: 'borderRadius',
            },
          ])
        ),
      },
      typography: {
        fontFamilies: Object.fromEntries(
          tokens.typography.families.map((f) => [
            f.name,
            { value: f.value, type: 'fontFamilies' },
          ])
        ),
        fontSizes: Object.fromEntries(
          tokens.typography.sizes.map((s) => [
            s.name,
            { value: `${s.size}`, type: 'fontSizes' },
          ])
        ),
        lineHeights: Object.fromEntries(
          tokens.typography.sizes.map((s) => [
            s.name,
            { value: `${s.lineHeight}`, type: 'lineHeights' },
          ])
        ),
        fontWeights: Object.fromEntries(
          tokens.typography.weights.map((w) => [
            w.name,
            { value: `${w.value}`, type: 'fontWeights' },
          ])
        ),
      },
      boxShadow: Object.fromEntries(
        tokens.shadows.scale.map((s) => [
          s.name,
          { value: s.value, type: 'boxShadow' },
        ])
      ),
      animation: {
        durations: Object.fromEntries(
          tokens.animations.durations.map((d) => [
            d.name,
            { value: `${d.value}`, type: 'duration' },
          ])
        ),
        easings: Object.fromEntries(
          tokens.animations.easings.map((e) => [
            e.name,
            { value: e.value, type: 'other' },
          ])
        ),
      },
    },
    $themes: [],
    $metadata: {
      tokenSetOrder: ['global'],
    },
  };

  return JSON.stringify(tokensStudioFormat, null, 2);
}
