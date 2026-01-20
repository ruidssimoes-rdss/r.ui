/**
 * Generate a spacing scale based on a base unit
 */
export function generateSpacingScale(baseUnit: number): number[] {
  // Standard multipliers for spacing
  const multipliers = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];
  return multipliers.map((m) => m * baseUnit);
}

/**
 * Generate a radius scale based on a base radius
 */
export function generateRadiusScale(
  base: number
): { name: string; value: number }[] {
  return [
    { name: 'none', value: 0 },
    { name: 'sm', value: Math.round(base * 0.5) },
    { name: 'md', value: base },
    { name: 'lg', value: Math.round(base * 1.5) },
    { name: 'xl', value: base * 2 },
    { name: '2xl', value: base * 3 },
    { name: 'full', value: 9999 },
  ];
}

/**
 * Generate a typography size scale
 */
export function generateTypographyScale(
  baseSize: number
): { name: string; size: number; lineHeight: number }[] {
  // Using a modular scale (minor third: 1.2)
  const ratio = 1.2;

  return [
    {
      name: 'xs',
      size: Math.round(baseSize / (ratio * ratio)),
      lineHeight: 1.5,
    },
    { name: 'sm', size: Math.round(baseSize / ratio), lineHeight: 1.5 },
    { name: 'base', size: baseSize, lineHeight: 1.5 },
    { name: 'lg', size: Math.round(baseSize * ratio), lineHeight: 1.6 },
    {
      name: 'xl',
      size: Math.round(baseSize * ratio * ratio),
      lineHeight: 1.6,
    },
    {
      name: '2xl',
      size: Math.round(baseSize * Math.pow(ratio, 3)),
      lineHeight: 1.4,
    },
    {
      name: '3xl',
      size: Math.round(baseSize * Math.pow(ratio, 4)),
      lineHeight: 1.3,
    },
    {
      name: '4xl',
      size: Math.round(baseSize * Math.pow(ratio, 5)),
      lineHeight: 1.2,
    },
    {
      name: '5xl',
      size: Math.round(baseSize * Math.pow(ratio, 6)),
      lineHeight: 1.1,
    },
  ];
}

/**
 * Generate shadow scale
 */
export function generateShadowScale(): { name: string; value: string }[] {
  return [
    { name: 'none', value: 'none' },
    { name: 'sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
    {
      name: 'md',
      value:
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    {
      name: 'lg',
      value:
        '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    {
      name: 'xl',
      value:
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    },
    { name: '2xl', value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
  ];
}
