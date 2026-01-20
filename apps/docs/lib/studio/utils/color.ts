import chroma from 'chroma-js';
import { ColorScale } from '../types';

/**
 * Generate a full color scale (50-950) from a single base color
 * Uses perceptually uniform color manipulation
 */
export function generateColorScale(baseColor: string): ColorScale {
  try {
    const base = chroma(baseColor);

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
 * Validate if a string is a valid hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Lighten a color by an amount
 */
export function lightenColor(color: string, amount: number): string {
  try {
    return chroma(color).brighten(amount).hex();
  } catch {
    return color;
  }
}

/**
 * Darken a color by an amount
 */
export function darkenColor(color: string, amount: number): string {
  try {
    return chroma(color).darken(amount).hex();
  } catch {
    return color;
  }
}

/**
 * Mix two colors together
 */
export function mixColors(color1: string, color2: string, ratio = 0.5): string {
  try {
    return chroma.mix(color1, color2, ratio).hex();
  } catch {
    return color1;
  }
}

/**
 * Adjust saturation of a color
 */
export function saturate(color: string, amount: number): string {
  try {
    return chroma(color).saturate(amount).hex();
  } catch {
    return color;
  }
}

/**
 * Desaturate a color
 */
export function desaturate(color: string, amount: number): string {
  try {
    return chroma(color).desaturate(amount).hex();
  } catch {
    return color;
  }
}
