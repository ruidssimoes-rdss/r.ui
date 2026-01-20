import chroma from 'chroma-js';
import { ColorValue, ValidationError, TokenSystem } from '../types';

/**
 * Check WCAG contrast ratio between two colors
 */
export function getContrastRatio(foreground: string, background: string): number {
  try {
    return chroma.contrast(foreground, background);
  } catch {
    return 0;
  }
}

/**
 * Get WCAG compliance level
 */
export function getContrastLevel(
  ratio: number
): 'AAA' | 'AA' | 'AA Large' | 'Fail' {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

/**
 * Check contrast between foreground and background in a specific mode
 */
export function checkContrast(
  foreground: ColorValue,
  background: ColorValue,
  mode: 'light' | 'dark'
): ValidationError | null {
  const fg = foreground[mode];
  const bg = background[mode];

  const ratio = getContrastRatio(fg, bg);

  if (ratio < 4.5) {
    return {
      type: ratio < 3 ? 'error' : 'warning',
      category: 'contrast',
      message: `${mode} mode: Contrast ratio is ${ratio.toFixed(2)}:1 (needs 4.5:1 for AA)`,
      suggestion: `Adjust ${mode} mode colors for better readability`,
    };
  }

  return null;
}

/**
 * Validate all contrast requirements for the token system
 */
export function validateAllContrasts(tokens: TokenSystem): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check foreground on background (both modes)
  const fgBgLight = checkContrast(
    tokens.colors.surface.foreground,
    tokens.colors.surface.background,
    'light'
  );
  const fgBgDark = checkContrast(
    tokens.colors.surface.foreground,
    tokens.colors.surface.background,
    'dark'
  );

  if (fgBgLight) errors.push(fgBgLight);
  if (fgBgDark) errors.push(fgBgDark);

  // Check mutedForeground on muted background
  const mutedLight = checkContrast(
    tokens.colors.surface.mutedForeground,
    tokens.colors.surface.muted,
    'light'
  );
  const mutedDark = checkContrast(
    tokens.colors.surface.mutedForeground,
    tokens.colors.surface.muted,
    'dark'
  );

  if (mutedLight) errors.push(mutedLight);
  if (mutedDark) errors.push(mutedDark);

  // Check brand colors on background
  tokens.colors.brand.forEach((color) => {
    const lightContrast = getContrastRatio(
      color.value.light,
      tokens.colors.surface.background.light
    );
    if (lightContrast < 4.5) {
      errors.push({
        type: 'warning',
        category: 'contrast',
        message: `"${color.name}" on light background: ${lightContrast.toFixed(2)}:1`,
        suggestion: 'Consider darkening this color for text use',
      });
    }

    const darkContrast = getContrastRatio(
      color.value.dark,
      tokens.colors.surface.background.dark
    );
    if (darkContrast < 4.5) {
      errors.push({
        type: 'warning',
        category: 'contrast',
        message: `"${color.name}" on dark background: ${darkContrast.toFixed(2)}:1`,
        suggestion: 'Consider lightening this color for text use',
      });
    }
  });

  // Check semantic colors on background
  tokens.colors.semantic.forEach((color) => {
    const lightContrast = getContrastRatio(
      color.value.light,
      tokens.colors.surface.background.light
    );
    if (lightContrast < 3) {
      errors.push({
        type: 'warning',
        category: 'contrast',
        message: `Semantic "${color.name}" may be hard to see on light background`,
        suggestion: 'Ensure sufficient contrast for status indicators',
      });
    }
  });

  return errors;
}

/**
 * Suggest a color adjustment to meet contrast requirements
 */
export function suggestContrastFix(
  foreground: string,
  background: string,
  targetRatio = 4.5
): string {
  try {
    const bgLuminance = chroma(background).luminance();
    let adjusted = chroma(foreground);

    // Try up to 20 iterations to find a suitable color
    for (let i = 0; i < 20; i++) {
      const ratio = chroma.contrast(adjusted.hex(), background);
      if (ratio >= targetRatio) {
        return adjusted.hex();
      }

      // If background is light, darken foreground; if dark, lighten it
      if (bgLuminance > 0.5) {
        adjusted = adjusted.darken(0.2);
      } else {
        adjusted = adjusted.brighten(0.2);
      }
    }

    return foreground;
  } catch {
    return foreground;
  }
}
