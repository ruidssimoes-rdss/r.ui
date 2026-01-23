import { TokenSystem } from './types';
import { generateColorScale } from './utils/color';

export interface Preset {
  id: string;
  name: string;
  description: string;
  tokens: TokenSystem;
}

export const presets: Preset[] = [
  // ============================================
  // MINIMAL DARK
  // ============================================
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    description: 'Clean dark theme with subtle accents. Linear/Vercel inspired.',
    tokens: {
      name: 'Minimal Dark',
      colors: {
        brand: [
          {
            id: 'primary',
            name: 'primary',
            value: { light: '#fafafa', dark: '#fafafa' },
            description: 'Primary brand color',
          },
          {
            id: 'secondary',
            name: 'secondary',
            value: { light: '#a1a1aa', dark: '#71717a' },
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
          { id: 'success', name: 'success', value: { light: '#22c55e', dark: '#4ade80' } },
          { id: 'warning', name: 'warning', value: { light: '#f59e0b', dark: '#fbbf24' } },
          { id: 'error', name: 'error', value: { light: '#ef4444', dark: '#f87171' } },
          { id: 'info', name: 'info', value: { light: '#3b82f6', dark: '#60a5fa' } },
        ],
        neutral: {
          baseColor: '#71717a',
          scale: {
            50: '#fafafa',
            100: '#f4f4f5',
            200: '#e4e4e7',
            300: '#d4d4d8',
            400: '#a1a1aa',
            500: '#71717a',
            600: '#52525b',
            700: '#3f3f46',
            800: '#27272a',
            900: '#18181b',
            950: '#09090b',
          },
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
          { id: 'sans', name: 'sans', value: 'Inter, system-ui, -apple-system, sans-serif' },
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
        base: 6,
        scale: [
          { name: 'none', value: 0 },
          { name: 'sm', value: 4 },
          { name: 'md', value: 6 },
          { name: 'lg', value: 8 },
          { name: 'xl', value: 12 },
          { name: '2xl', value: 16 },
          { name: 'full', value: 9999 },
        ],
      },
      shadows: {
        scale: [
          { name: 'none', value: 'none' },
          { name: 'sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
          { name: 'md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
          { name: 'lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
          { name: 'xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
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
    },
  },

  // ============================================
  // MINIMAL LIGHT
  // ============================================
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Clean white theme with gray neutrals. Professional and crisp.',
    tokens: {
      name: 'Minimal Light',
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
            value: { light: '#18181b', dark: '#fafafa' },
            description: 'Accent color for highlights',
          },
        ],
        semantic: [
          { id: 'success', name: 'success', value: { light: '#16a34a', dark: '#22c55e' } },
          { id: 'warning', name: 'warning', value: { light: '#d97706', dark: '#f59e0b' } },
          { id: 'error', name: 'error', value: { light: '#dc2626', dark: '#ef4444' } },
          { id: 'info', name: 'info', value: { light: '#2563eb', dark: '#3b82f6' } },
        ],
        neutral: {
          baseColor: '#737373',
          scale: {
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
          },
        },
        surface: {
          background: { light: '#ffffff', dark: '#0a0a0a' },
          foreground: { light: '#171717', dark: '#fafafa' },
          card: { light: '#ffffff', dark: '#171717' },
          muted: { light: '#f5f5f5', dark: '#262626' },
          mutedForeground: { light: '#737373', dark: '#a3a3a3' },
          border: { light: '#e5e5e5', dark: '#262626' },
        },
      },
      typography: {
        families: [
          { id: 'sans', name: 'sans', value: 'Inter, system-ui, -apple-system, sans-serif' },
          { id: 'mono', name: 'mono', value: 'SF Mono, Menlo, monospace' },
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
          { name: 'md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
          { name: 'lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
          { name: 'xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
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
    },
  },

  // ============================================
  // SAAS DASHBOARD
  // ============================================
  {
    id: 'saas-dashboard',
    name: 'SaaS Dashboard',
    description: 'Enterprise-friendly blues and grays. Perfect for B2B apps.',
    tokens: {
      name: 'SaaS Dashboard',
      colors: {
        brand: [
          {
            id: 'primary',
            name: 'primary',
            value: { light: '#2563eb', dark: '#3b82f6' },
            description: 'Primary brand color',
          },
          {
            id: 'secondary',
            name: 'secondary',
            value: { light: '#64748b', dark: '#94a3b8' },
            description: 'Secondary brand color',
          },
          {
            id: 'accent',
            name: 'accent',
            value: { light: '#0ea5e9', dark: '#38bdf8' },
            description: 'Accent color for highlights',
          },
        ],
        semantic: [
          { id: 'success', name: 'success', value: { light: '#059669', dark: '#10b981' } },
          { id: 'warning', name: 'warning', value: { light: '#d97706', dark: '#f59e0b' } },
          { id: 'error', name: 'error', value: { light: '#dc2626', dark: '#ef4444' } },
          { id: 'info', name: 'info', value: { light: '#2563eb', dark: '#3b82f6' } },
        ],
        neutral: {
          baseColor: '#64748b',
          scale: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          },
        },
        surface: {
          background: { light: '#f8fafc', dark: '#020617' },
          foreground: { light: '#0f172a', dark: '#f8fafc' },
          card: { light: '#ffffff', dark: '#0f172a' },
          muted: { light: '#f1f5f9', dark: '#1e293b' },
          mutedForeground: { light: '#64748b', dark: '#94a3b8' },
          border: { light: '#e2e8f0', dark: '#1e293b' },
        },
      },
      typography: {
        families: [
          { id: 'sans', name: 'sans', value: 'Inter, system-ui, -apple-system, sans-serif' },
          { id: 'mono', name: 'mono', value: 'Fira Code, JetBrains Mono, monospace' },
        ],
        sizes: [
          { name: 'xs', size: 12, lineHeight: 1.5 },
          { name: 'sm', size: 14, lineHeight: 1.5 },
          { name: 'base', size: 15, lineHeight: 1.6 },
          { name: 'lg', size: 17, lineHeight: 1.6 },
          { name: 'xl', size: 19, lineHeight: 1.5 },
          { name: '2xl', size: 23, lineHeight: 1.4 },
          { name: '3xl', size: 28, lineHeight: 1.3 },
          { name: '4xl', size: 34, lineHeight: 1.2 },
          { name: '5xl', size: 44, lineHeight: 1.1 },
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
          { name: '2xl', value: 20 },
          { name: 'full', value: 9999 },
        ],
      },
      shadows: {
        scale: [
          { name: 'none', value: 'none' },
          { name: 'sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
          { name: 'md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
          { name: 'lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
          { name: 'xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
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
    },
  },

  // ============================================
  // WARM & FRIENDLY
  // ============================================
  {
    id: 'warm-friendly',
    name: 'Warm & Friendly',
    description: 'Warm neutrals with orange accents. Approachable and inviting.',
    tokens: {
      name: 'Warm & Friendly',
      colors: {
        brand: [
          {
            id: 'primary',
            name: 'primary',
            value: { light: '#ea580c', dark: '#f97316' },
            description: 'Primary brand color',
          },
          {
            id: 'secondary',
            name: 'secondary',
            value: { light: '#78716c', dark: '#a8a29e' },
            description: 'Secondary brand color',
          },
          {
            id: 'accent',
            name: 'accent',
            value: { light: '#f59e0b', dark: '#fbbf24' },
            description: 'Accent color for highlights',
          },
        ],
        semantic: [
          { id: 'success', name: 'success', value: { light: '#16a34a', dark: '#22c55e' } },
          { id: 'warning', name: 'warning', value: { light: '#ca8a04', dark: '#eab308' } },
          { id: 'error', name: 'error', value: { light: '#dc2626', dark: '#ef4444' } },
          { id: 'info', name: 'info', value: { light: '#0284c7', dark: '#0ea5e9' } },
        ],
        neutral: {
          baseColor: '#78716c',
          scale: {
            50: '#fafaf9',
            100: '#f5f5f4',
            200: '#e7e5e4',
            300: '#d6d3d1',
            400: '#a8a29e',
            500: '#78716c',
            600: '#57534e',
            700: '#44403c',
            800: '#292524',
            900: '#1c1917',
            950: '#0c0a09',
          },
        },
        surface: {
          background: { light: '#fffbf5', dark: '#0c0a09' },
          foreground: { light: '#1c1917', dark: '#fafaf9' },
          card: { light: '#ffffff', dark: '#1c1917' },
          muted: { light: '#f5f5f4', dark: '#292524' },
          mutedForeground: { light: '#78716c', dark: '#a8a29e' },
          border: { light: '#e7e5e4', dark: '#292524' },
        },
      },
      typography: {
        families: [
          { id: 'sans', name: 'sans', value: 'DM Sans, system-ui, -apple-system, sans-serif' },
          { id: 'mono', name: 'mono', value: 'JetBrains Mono, Menlo, monospace' },
        ],
        sizes: [
          { name: 'xs', size: 12, lineHeight: 1.5 },
          { name: 'sm', size: 14, lineHeight: 1.5 },
          { name: 'base', size: 16, lineHeight: 1.6 },
          { name: 'lg', size: 18, lineHeight: 1.6 },
          { name: 'xl', size: 20, lineHeight: 1.5 },
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
        base: 12,
        scale: [
          { name: 'none', value: 0 },
          { name: 'sm', value: 6 },
          { name: 'md', value: 12 },
          { name: 'lg', value: 16 },
          { name: 'xl', value: 20 },
          { name: '2xl', value: 28 },
          { name: 'full', value: 9999 },
        ],
      },
      shadows: {
        scale: [
          { name: 'none', value: 'none' },
          { name: 'sm', value: '0 1px 3px 0 rgb(0 0 0 / 0.04)' },
          { name: 'md', value: '0 4px 8px -2px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)' },
          { name: 'lg', value: '0 12px 20px -4px rgb(0 0 0 / 0.08), 0 4px 8px -4px rgb(0 0 0 / 0.04)' },
          { name: 'xl', value: '0 20px 30px -8px rgb(0 0 0 / 0.1), 0 8px 12px -6px rgb(0 0 0 / 0.06)' },
          { name: '2xl', value: '0 28px 50px -16px rgb(0 0 0 / 0.18)' },
        ],
      },
      animations: {
        durations: [
          { name: 'fast', value: 120 },
          { name: 'normal', value: 220 },
          { name: 'slow', value: 350 },
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
    },
  },

  // ============================================
  // GLASSMORPHIC
  // ============================================
  {
    id: 'glassmorphic',
    name: 'Glassmorphic',
    description: 'Dark with glass blur effects. Teal/cyan accents.',
    tokens: {
      name: 'Glassmorphic',
      colors: {
        brand: [
          {
            id: 'primary',
            name: 'primary',
            value: { light: '#0d9488', dark: '#14b8a6' },
            description: 'Primary brand color',
          },
          {
            id: 'secondary',
            name: 'secondary',
            value: { light: '#6b7280', dark: '#9ca3af' },
            description: 'Secondary brand color',
          },
          {
            id: 'accent',
            name: 'accent',
            value: { light: '#8b5cf6', dark: '#a78bfa' },
            description: 'Accent color for highlights',
          },
        ],
        semantic: [
          { id: 'success', name: 'success', value: { light: '#10b981', dark: '#34d399' } },
          { id: 'warning', name: 'warning', value: { light: '#f59e0b', dark: '#fbbf24' } },
          { id: 'error', name: 'error', value: { light: '#ef4444', dark: '#f87171' } },
          { id: 'info', name: 'info', value: { light: '#06b6d4', dark: '#22d3ee' } },
        ],
        neutral: {
          baseColor: '#6b7280',
          scale: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
            950: '#030712',
          },
        },
        surface: {
          background: { light: '#f9fafb', dark: '#030712' },
          foreground: { light: '#111827', dark: '#f9fafb' },
          card: { light: 'rgba(255, 255, 255, 0.8)', dark: 'rgba(17, 24, 39, 0.6)' },
          muted: { light: 'rgba(243, 244, 246, 0.8)', dark: 'rgba(31, 41, 55, 0.5)' },
          mutedForeground: { light: '#6b7280', dark: '#9ca3af' },
          border: { light: 'rgba(229, 231, 235, 0.5)', dark: 'rgba(75, 85, 99, 0.3)' },
        },
      },
      typography: {
        families: [
          { id: 'sans', name: 'sans', value: 'Inter, system-ui, -apple-system, sans-serif' },
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
        base: 16,
        scale: [
          { name: 'none', value: 0 },
          { name: 'sm', value: 8 },
          { name: 'md', value: 16 },
          { name: 'lg', value: 20 },
          { name: 'xl', value: 24 },
          { name: '2xl', value: 32 },
          { name: 'full', value: 9999 },
        ],
      },
      shadows: {
        scale: [
          { name: 'none', value: 'none' },
          { name: 'sm', value: '0 2px 8px -2px rgb(0 0 0 / 0.15), 0 0 1px rgb(0 0 0 / 0.1)' },
          { name: 'md', value: '0 8px 16px -4px rgb(0 0 0 / 0.2), 0 0 1px rgb(0 0 0 / 0.1)' },
          { name: 'lg', value: '0 16px 32px -8px rgb(0 0 0 / 0.25), 0 0 1px rgb(0 0 0 / 0.1)' },
          { name: 'xl', value: '0 24px 48px -12px rgb(0 0 0 / 0.3), 0 0 1px rgb(0 0 0 / 0.1)' },
          { name: '2xl', value: '0 32px 64px -16px rgb(0 0 0 / 0.35), 0 0 1px rgb(0 0 0 / 0.1)' },
        ],
      },
      animations: {
        durations: [
          { name: 'fast', value: 150 },
          { name: 'normal', value: 250 },
          { name: 'slow', value: 400 },
          { name: 'slower', value: 600 },
        ],
        easings: [
          { name: 'linear', value: 'linear' },
          { name: 'ease', value: 'ease' },
          { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
          { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
          { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
        ],
      },
    },
  },

  // ============================================
  // BRUTALIST
  // ============================================
  {
    id: 'brutalist',
    name: 'Brutalist',
    description: 'High contrast black and white. Sharp edges, no radius.',
    tokens: {
      name: 'Brutalist',
      colors: {
        brand: [
          {
            id: 'primary',
            name: 'primary',
            value: { light: '#000000', dark: '#ffffff' },
            description: 'Primary brand color',
          },
          {
            id: 'secondary',
            name: 'secondary',
            value: { light: '#404040', dark: '#c0c0c0' },
            description: 'Secondary brand color',
          },
          {
            id: 'accent',
            name: 'accent',
            value: { light: '#ff0000', dark: '#ff3333' },
            description: 'Accent color for highlights',
          },
        ],
        semantic: [
          { id: 'success', name: 'success', value: { light: '#008000', dark: '#00cc00' } },
          { id: 'warning', name: 'warning', value: { light: '#cc7700', dark: '#ffaa00' } },
          { id: 'error', name: 'error', value: { light: '#cc0000', dark: '#ff3333' } },
          { id: 'info', name: 'info', value: { light: '#0000cc', dark: '#3333ff' } },
        ],
        neutral: {
          baseColor: '#808080',
          scale: {
            50: '#ffffff',
            100: '#f0f0f0',
            200: '#e0e0e0',
            300: '#c0c0c0',
            400: '#a0a0a0',
            500: '#808080',
            600: '#606060',
            700: '#404040',
            800: '#202020',
            900: '#101010',
            950: '#000000',
          },
        },
        surface: {
          background: { light: '#ffffff', dark: '#000000' },
          foreground: { light: '#000000', dark: '#ffffff' },
          card: { light: '#ffffff', dark: '#000000' },
          muted: { light: '#f0f0f0', dark: '#101010' },
          mutedForeground: { light: '#606060', dark: '#a0a0a0' },
          border: { light: '#000000', dark: '#ffffff' },
        },
      },
      typography: {
        families: [
          { id: 'sans', name: 'sans', value: 'Arial, Helvetica, sans-serif' },
          { id: 'mono', name: 'mono', value: 'Courier New, Courier, monospace' },
        ],
        sizes: [
          { name: 'xs', size: 11, lineHeight: 1.4 },
          { name: 'sm', size: 13, lineHeight: 1.4 },
          { name: 'base', size: 16, lineHeight: 1.4 },
          { name: 'lg', size: 19, lineHeight: 1.4 },
          { name: 'xl', size: 22, lineHeight: 1.3 },
          { name: '2xl', size: 28, lineHeight: 1.2 },
          { name: '3xl', size: 36, lineHeight: 1.1 },
          { name: '4xl', size: 48, lineHeight: 1.0 },
          { name: '5xl', size: 64, lineHeight: 1.0 },
        ],
        weights: [
          { name: 'normal', value: 400 },
          { name: 'medium', value: 500 },
          { name: 'semibold', value: 700 },
          { name: 'bold', value: 900 },
        ],
      },
      spacing: {
        baseUnit: 8,
        scale: [0, 8, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192],
      },
      radius: {
        base: 0,
        scale: [
          { name: 'none', value: 0 },
          { name: 'sm', value: 0 },
          { name: 'md', value: 0 },
          { name: 'lg', value: 0 },
          { name: 'xl', value: 0 },
          { name: '2xl', value: 0 },
          { name: 'full', value: 0 },
        ],
      },
      shadows: {
        scale: [
          { name: 'none', value: 'none' },
          { name: 'sm', value: '2px 2px 0 0 currentColor' },
          { name: 'md', value: '4px 4px 0 0 currentColor' },
          { name: 'lg', value: '6px 6px 0 0 currentColor' },
          { name: 'xl', value: '8px 8px 0 0 currentColor' },
          { name: '2xl', value: '12px 12px 0 0 currentColor' },
        ],
      },
      animations: {
        durations: [
          { name: 'fast', value: 0 },
          { name: 'normal', value: 0 },
          { name: 'slow', value: 0 },
          { name: 'slower', value: 0 },
        ],
        easings: [
          { name: 'linear', value: 'linear' },
          { name: 'ease', value: 'linear' },
          { name: 'ease-in', value: 'linear' },
          { name: 'ease-out', value: 'linear' },
          { name: 'ease-in-out', value: 'linear' },
        ],
      },
    },
  },

  // ============================================
  // STARTUP FRESH
  // ============================================
  {
    id: 'startup-fresh',
    name: 'Startup Fresh',
    description: 'Bright and playful. Gradient-friendly with bold colors.',
    tokens: {
      name: 'Startup Fresh',
      colors: {
        brand: [
          {
            id: 'primary',
            name: 'primary',
            value: { light: '#7c3aed', dark: '#8b5cf6' },
            description: 'Primary brand color',
          },
          {
            id: 'secondary',
            name: 'secondary',
            value: { light: '#ec4899', dark: '#f472b6' },
            description: 'Secondary brand color',
          },
          {
            id: 'accent',
            name: 'accent',
            value: { light: '#06b6d4', dark: '#22d3ee' },
            description: 'Accent color for highlights',
          },
        ],
        semantic: [
          { id: 'success', name: 'success', value: { light: '#10b981', dark: '#34d399' } },
          { id: 'warning', name: 'warning', value: { light: '#f59e0b', dark: '#fbbf24' } },
          { id: 'error', name: 'error', value: { light: '#ef4444', dark: '#f87171' } },
          { id: 'info', name: 'info', value: { light: '#3b82f6', dark: '#60a5fa' } },
        ],
        neutral: {
          baseColor: '#6b7280',
          scale: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
            950: '#030712',
          },
        },
        surface: {
          background: { light: '#fdfcff', dark: '#0f0a1a' },
          foreground: { light: '#111827', dark: '#f9fafb' },
          card: { light: '#ffffff', dark: '#1a1225' },
          muted: { light: '#f5f3ff', dark: '#2d1f4a' },
          mutedForeground: { light: '#6b7280', dark: '#9ca3af' },
          border: { light: '#e5e7eb', dark: '#3d2d5a' },
        },
      },
      typography: {
        families: [
          { id: 'sans', name: 'sans', value: 'Plus Jakarta Sans, system-ui, -apple-system, sans-serif' },
          { id: 'mono', name: 'mono', value: 'JetBrains Mono, Menlo, monospace' },
        ],
        sizes: [
          { name: 'xs', size: 12, lineHeight: 1.5 },
          { name: 'sm', size: 14, lineHeight: 1.5 },
          { name: 'base', size: 16, lineHeight: 1.6 },
          { name: 'lg', size: 18, lineHeight: 1.6 },
          { name: 'xl', size: 20, lineHeight: 1.5 },
          { name: '2xl', size: 24, lineHeight: 1.4 },
          { name: '3xl', size: 32, lineHeight: 1.3 },
          { name: '4xl', size: 40, lineHeight: 1.2 },
          { name: '5xl', size: 52, lineHeight: 1.1 },
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
        base: 16,
        scale: [
          { name: 'none', value: 0 },
          { name: 'sm', value: 8 },
          { name: 'md', value: 16 },
          { name: 'lg', value: 20 },
          { name: 'xl', value: 24 },
          { name: '2xl', value: 32 },
          { name: 'full', value: 9999 },
        ],
      },
      shadows: {
        scale: [
          { name: 'none', value: 'none' },
          { name: 'sm', value: '0 2px 4px -1px rgba(124, 58, 237, 0.1), 0 1px 2px -1px rgba(124, 58, 237, 0.06)' },
          { name: 'md', value: '0 6px 12px -2px rgba(124, 58, 237, 0.12), 0 3px 6px -2px rgba(124, 58, 237, 0.08)' },
          { name: 'lg', value: '0 12px 24px -4px rgba(124, 58, 237, 0.15), 0 6px 12px -4px rgba(124, 58, 237, 0.1)' },
          { name: 'xl', value: '0 20px 40px -8px rgba(124, 58, 237, 0.2), 0 10px 20px -8px rgba(124, 58, 237, 0.12)' },
          { name: '2xl', value: '0 32px 64px -12px rgba(124, 58, 237, 0.25)' },
        ],
      },
      animations: {
        durations: [
          { name: 'fast', value: 150 },
          { name: 'normal', value: 250 },
          { name: 'slow', value: 400 },
          { name: 'slower', value: 600 },
        ],
        easings: [
          { name: 'linear', value: 'linear' },
          { name: 'ease', value: 'ease' },
          { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
          { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
          { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
        ],
      },
    },
  },

  // ============================================
  // EDITORIAL
  // ============================================
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Newspaper inspired. Serif typography, high contrast.',
    tokens: {
      name: 'Editorial',
      colors: {
        brand: [
          {
            id: 'primary',
            name: 'primary',
            value: { light: '#1a1a1a', dark: '#fafafa' },
            description: 'Primary brand color',
          },
          {
            id: 'secondary',
            name: 'secondary',
            value: { light: '#666666', dark: '#999999' },
            description: 'Secondary brand color',
          },
          {
            id: 'accent',
            name: 'accent',
            value: { light: '#b91c1c', dark: '#dc2626' },
            description: 'Accent color for highlights',
          },
        ],
        semantic: [
          { id: 'success', name: 'success', value: { light: '#166534', dark: '#22c55e' } },
          { id: 'warning', name: 'warning', value: { light: '#a16207', dark: '#facc15' } },
          { id: 'error', name: 'error', value: { light: '#b91c1c', dark: '#ef4444' } },
          { id: 'info', name: 'info', value: { light: '#1e40af', dark: '#60a5fa' } },
        ],
        neutral: {
          baseColor: '#666666',
          scale: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#dddddd',
            400: '#aaaaaa',
            500: '#666666',
            600: '#555555',
            700: '#444444',
            800: '#333333',
            900: '#1a1a1a',
            950: '#0a0a0a',
          },
        },
        surface: {
          background: { light: '#faf9f7', dark: '#0a0a0a' },
          foreground: { light: '#1a1a1a', dark: '#fafafa' },
          card: { light: '#ffffff', dark: '#1a1a1a' },
          muted: { light: '#f5f5f5', dark: '#262626' },
          mutedForeground: { light: '#666666', dark: '#999999' },
          border: { light: '#dddddd', dark: '#333333' },
        },
      },
      typography: {
        families: [
          { id: 'sans', name: 'sans', value: 'Playfair Display, Georgia, serif' },
          { id: 'mono', name: 'mono', value: 'IBM Plex Mono, Menlo, monospace' },
        ],
        sizes: [
          { name: 'xs', size: 11, lineHeight: 1.5 },
          { name: 'sm', size: 13, lineHeight: 1.6 },
          { name: 'base', size: 17, lineHeight: 1.7 },
          { name: 'lg', size: 20, lineHeight: 1.7 },
          { name: 'xl', size: 24, lineHeight: 1.5 },
          { name: '2xl', size: 30, lineHeight: 1.4 },
          { name: '3xl', size: 40, lineHeight: 1.2 },
          { name: '4xl', size: 52, lineHeight: 1.1 },
          { name: '5xl', size: 72, lineHeight: 1.0 },
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
        base: 2,
        scale: [
          { name: 'none', value: 0 },
          { name: 'sm', value: 2 },
          { name: 'md', value: 4 },
          { name: 'lg', value: 6 },
          { name: 'xl', value: 8 },
          { name: '2xl', value: 12 },
          { name: 'full', value: 9999 },
        ],
      },
      shadows: {
        scale: [
          { name: 'none', value: 'none' },
          { name: 'sm', value: '0 1px 2px 0 rgb(0 0 0 / 0.04)' },
          { name: 'md', value: '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)' },
          { name: 'lg', value: '0 4px 8px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)' },
          { name: 'xl', value: '0 8px 16px -4px rgb(0 0 0 / 0.1), 0 4px 8px -4px rgb(0 0 0 / 0.05)' },
          { name: '2xl', value: '0 16px 32px -8px rgb(0 0 0 / 0.15)' },
        ],
      },
      animations: {
        durations: [
          { name: 'fast', value: 100 },
          { name: 'normal', value: 200 },
          { name: 'slow', value: 300 },
          { name: 'slower', value: 450 },
        ],
        easings: [
          { name: 'linear', value: 'linear' },
          { name: 'ease', value: 'ease' },
          { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
          { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
          { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
        ],
      },
    },
  },
];

export function getPresetById(id: string): Preset | undefined {
  return presets.find((p) => p.id === id);
}

export function getPresetNames(): { id: string; name: string }[] {
  return presets.map((p) => ({ id: p.id, name: p.name }));
}
