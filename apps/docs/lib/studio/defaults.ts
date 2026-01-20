import { TokenSystem } from './types';
import { generateColorScale } from './utils/color';

export const defaultTokens: TokenSystem = {
  name: 'r/ui Default',

  colors: {
    brand: [
      {
        id: 'primary',
        name: 'primary',
        value: { light: '#18181b', dark: '#fafafa' },
        description: 'Primary brand color',
      },
      {
        id: 'secondary',
        name: 'secondary',
        value: { light: '#71717a', dark: '#a1a1aa' },
        description: 'Secondary brand color',
      },
      {
        id: 'accent',
        name: 'accent',
        value: { light: '#3b82f6', dark: '#60a5fa' },
        description: 'Accent color for highlights',
      },
    ],

    semantic: [
      {
        id: 'success',
        name: 'success',
        value: { light: '#22c55e', dark: '#4ade80' },
      },
      {
        id: 'warning',
        name: 'warning',
        value: { light: '#f59e0b', dark: '#fbbf24' },
      },
      {
        id: 'error',
        name: 'error',
        value: { light: '#ef4444', dark: '#f87171' },
      },
      {
        id: 'info',
        name: 'info',
        value: { light: '#3b82f6', dark: '#60a5fa' },
      },
    ],

    neutral: {
      baseColor: '#71717a',
      scale: generateColorScale('#71717a'),
    },

    surface: {
      background: { light: '#ffffff', dark: '#09090b' },
      foreground: { light: '#18181b', dark: '#fafafa' },
      card: { light: '#ffffff', dark: '#18181b' },
      muted: { light: '#f4f4f5', dark: '#27272a' },
      mutedForeground: { light: '#71717a', dark: '#a1a1aa' },
      border: { light: '#e4e4e7', dark: '#27272a' },
    },
  },

  typography: {
    families: [
      {
        id: 'sans',
        name: 'sans',
        value: 'Inter, system-ui, -apple-system, sans-serif',
      },
      { id: 'mono', name: 'mono', value: 'JetBrains Mono, Menlo, monospace' },
    ],
    sizes: [
      { name: 'xs', size: 12, lineHeight: 1.5 },
      { name: 'sm', size: 14, lineHeight: 1.5 },
      { name: 'base', size: 16, lineHeight: 1.5 },
      { name: 'lg', size: 18, lineHeight: 1.6 },
      { name: 'xl', size: 20, lineHeight: 1.6 },
      { name: '2xl', size: 24, lineHeight: 1.4 },
      { name: '3xl', size: 30, lineHeight: 1.3 },
      { name: '4xl', size: 36, lineHeight: 1.2 },
      { name: '5xl', size: 48, lineHeight: 1.1 },
    ],
    weights: [
      { name: 'normal', value: 400 },
      { name: 'medium', value: 500 },
      { name: 'semibold', value: 600 },
      { name: 'bold', value: 700 },
    ],
  },

  spacing: {
    baseUnit: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
  },

  radius: {
    base: 8,
    scale: [
      { name: 'none', value: 0 },
      { name: 'sm', value: 4 },
      { name: 'md', value: 8 },
      { name: 'lg', value: 12 },
      { name: 'xl', value: 16 },
      { name: '2xl', value: 24 },
      { name: 'full', value: 9999 },
    ],
  },

  shadows: {
    scale: [
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
    ],
  },

  animations: {
    durations: [
      { name: 'fast', value: 100 },
      { name: 'normal', value: 200 },
      { name: 'slow', value: 300 },
      { name: 'slower', value: 500 },
    ],
    easings: [
      { name: 'linear', value: 'linear' },
      { name: 'ease', value: 'ease' },
      { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
      { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
      { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    ],
  },
};
