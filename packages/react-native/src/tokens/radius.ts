/**
 * r.ui Border Radius Tokens
 */

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;

// Alias for more explicit naming
export const borderRadius = radius;

export type Radius = typeof radius;
export type BorderRadius = typeof borderRadius;
