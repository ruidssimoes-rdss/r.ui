import { StudioTokens } from './types';
import { generateColorScale } from './color-utils';

export const defaultTokens: StudioTokens = {
  colors: [
    {
      id: 'color-brand',
      name: 'brand',
      value: '#3b82f6',
      scale: generateColorScale('#3b82f6'),
    },
    {
      id: 'color-text',
      name: 'text',
      value: '#1a1a1a',
      scale: generateColorScale('#1a1a1a'),
    },
    {
      id: 'color-background',
      name: 'background',
      value: '#ffffff',
      scale: generateColorScale('#ffffff'),
    },
    {
      id: 'color-accent',
      name: 'accent',
      value: '#8b5cf6',
      scale: generateColorScale('#8b5cf6'),
    },
    {
      id: 'color-success',
      name: 'success',
      value: '#22c55e',
      scale: generateColorScale('#22c55e'),
    },
    {
      id: 'color-error',
      name: 'error',
      value: '#ef4444',
      scale: generateColorScale('#ef4444'),
    },
  ],
  radius: {
    base: 8,
    scale: [0.5, 1, 1.5, 2, 4], // → 4, 8, 12, 16, 32
  },
  spacing: {
    base: 4,
    scale: [4, 8, 12, 16, 20, 24, 32, 48, 64],
  },
};
