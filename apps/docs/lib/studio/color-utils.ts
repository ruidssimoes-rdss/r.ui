import chroma from 'chroma-js';

import { ColorScale } from './types';

/**
 * Generate a full color scale from a single color
 * Uses perceptually uniform color manipulation
 */
export function generateColorScale(baseColor: string): ColorScale {
  try {
    const base = chroma(baseColor);

    // Generate lighter shades (50-400)
    // Generate darker shades (600-950)
    // 500 is closest to the input color

    return {
      50: base.brighten(2.5).desaturate(0.5).hex(),
      100: base.brighten(2).desaturate(0.3).hex(),
      200: base.brighten(1.5).desaturate(0.2).hex(),
      300: base.brighten(1).desaturate(0.1).hex(),
      400: base.brighten(0.5).hex(),
      500: base.hex(),
      600: base.darken(0.5).hex(),
      700: base.darken(1).hex(),
      800: base.darken(1.5).hex(),
      900: base.darken(2).hex(),
      950: base.darken(2.5).saturate(0.2).hex(),
    };
  } catch {
    // Return neutral scale if color is invalid
    return {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    };
  }
}

/**
 * Check WCAG contrast ratio between two colors
 * Returns 'AAA' | 'AA' | 'FAIL'
 */
export function checkContrast(
  foreground: string,
  background: string
): {
  ratio: number;
  level: 'AAA' | 'AA' | 'FAIL';
} {
  try {
    const ratio = chroma.contrast(foreground, background);

    let level: 'AAA' | 'AA' | 'FAIL' = 'FAIL';
    if (ratio >= 7) level = 'AAA';
    else if (ratio >= 4.5) level = 'AA';

    return { ratio, level };
  } catch {
    return { ratio: 0, level: 'FAIL' };
  }
}

/**
 * Get a readable text color (black or white) for a given background
 */
export function getContrastText(background: string): string {
  try {
    const luminance = chroma(background).luminance();
    return luminance > 0.5 ? '#000000' : '#ffffff';
  } catch {
    return '#000000';
  }
}

/**
 * Generate semantic colors based on a primary color
 */
export function generateSemanticColors(
  _primary: string,
  mode: 'light' | 'dark'
) {
  if (mode === 'dark') {
    return {
      background: '#09090b',
      foreground: '#fafafa',
      muted: '#27272a',
      mutedForeground: '#a1a1aa',
      border: '#27272a',
    };
  }

  return {
    background: '#ffffff',
    foreground: '#09090b',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    border: '#e4e4e7',
  };
}

/**
 * Validate if a string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Lighten a color by a percentage
 */
export function lightenColor(color: string, amount: number): string {
  try {
    return chroma(color).brighten(amount).hex();
  } catch {
    return color;
  }
}

/**
 * Darken a color by a percentage
 */
export function darkenColor(color: string, amount: number): string {
  try {
    return chroma(color).darken(amount).hex();
  } catch {
    return color;
  }
}
