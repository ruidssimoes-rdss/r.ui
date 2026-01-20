import { StudioTokens } from './types';

export function generateCSSExport(tokens: StudioTokens): string {
  const colorVars = tokens.colors
    .map((c) => {
      let output = `  /* ${c.name} */\n`;
      output += `  --color-${c.name}: ${c.value};\n`;
      if (c.scale) {
        Object.entries(c.scale).forEach(([key, value]) => {
          output += `  --color-${c.name}-${key}: ${value};\n`;
        });
      }
      return output;
    })
    .join('\n');

  const radiusVars = tokens.radius.scale
    .map((m, i) => `  --radius-${i}: ${Math.round(tokens.radius.base * m)}px;`)
    .join('\n');

  const spacingVars = tokens.spacing.scale
    .map((v, i) => `  --spacing-${i}: ${v}px;`)
    .join('\n');

  return `:root {
${colorVars}
  /* Radius */
  --radius-base: ${tokens.radius.base}px;
${radiusVars}

  /* Spacing */
  --spacing-base: ${tokens.spacing.base}px;
${spacingVars}
}`;
}

export function generateThemeExport(tokens: StudioTokens): string {
  const colorsObj = tokens.colors
    .map((c) => `    ${c.name}: '${c.value}',`)
    .join('\n');

  return `import { createTheme } from '@r-ui/react-native';

export const customTheme = createTheme({
  colors: {
${colorsObj}
  },

  radius: {
    base: ${tokens.radius.base},
  },

  spacing: {
    base: ${tokens.spacing.base},
  },
});`;
}

export function generateTailwindExport(tokens: StudioTokens): string {
  const colorsObj = tokens.colors.reduce(
    (acc, c) => {
      if (c.scale) {
        acc[c.name] = {
          DEFAULT: c.value,
          ...c.scale,
        };
      } else {
        acc[c.name] = c.value;
      }
      return acc;
    },
    {} as Record<string, unknown>
  );

  const radiusObj = tokens.radius.scale.reduce(
    (acc, m, i) => {
      acc[String(i)] = `${Math.round(tokens.radius.base * m)}px`;
      return acc;
    },
    { DEFAULT: `${tokens.radius.base}px` } as Record<string, string>
  );

  const spacingObj = tokens.spacing.scale.reduce(
    (acc, v, i) => {
      acc[String(i)] = `${v}px`;
      return acc;
    },
    {} as Record<string, string>
  );

  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colorsObj, null, 8).replace(/"/g, "'")},
      borderRadius: ${JSON.stringify(radiusObj, null, 8).replace(/"/g, "'")},
      spacing: ${JSON.stringify(spacingObj, null, 8).replace(/"/g, "'")},
    },
  },
};`;
}

export function generateJSONExport(tokens: StudioTokens): string {
  return JSON.stringify(tokens, null, 2);
}
