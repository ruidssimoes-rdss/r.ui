/**
 * Hyena Color Tokens
 * Dark mode first color system
 */

export const colors = {
  // Background hierarchy (5 levels)
  bg: {
    base: '#050505',
    raised: '#0a0a0a',
    surface: '#141414',
    elevated: '#1f1f1f',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },

  // Text hierarchy
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.6)',
    muted: 'rgba(255, 255, 255, 0.4)',
    inverse: '#0a0a0a',
  },

  // Border colors
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    muted: 'rgba(255, 255, 255, 0.06)',
    strong: 'rgba(255, 255, 255, 0.2)',
  },

  // Accent colors with light/DEFAULT/dark variants
  accent: {
    blue: {
      light: '#60a5fa',
      DEFAULT: '#3b82f6',
      dark: '#2563eb',
    },
    green: {
      light: '#4ade80',
      DEFAULT: '#22c55e',
      dark: '#16a34a',
    },
    amber: {
      light: '#fbbf24',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
    },
    red: {
      light: '#f87171',
      DEFAULT: '#ef4444',
      dark: '#dc2626',
    },
    purple: {
      light: '#c084fc',
      DEFAULT: '#a855f7',
      dark: '#9333ea',
    },
    yellow: {
      light: '#fde047',
      DEFAULT: '#eab308',
      dark: '#ca8a04',
    },
    pink: {
      light: '#f472b6',
      DEFAULT: '#ec4899',
      dark: '#db2777',
    },
    cyan: {
      light: '#22d3ee',
      DEFAULT: '#06b6d4',
      dark: '#0891b2',
    },
  },

  // Semantic colors
  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Common utility colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type Colors = typeof colors;
