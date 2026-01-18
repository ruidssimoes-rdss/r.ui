/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './stories/**/*.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,jsx,ts,tsx}',
    '../../packages/react-native/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Background colors
        bg: {
          base: '#0a0a0a',
          raised: '#141414',
          surface: '#1a1a1a',
          elevated: '#242424',
          overlay: 'rgba(0, 0, 0, 0.6)',
        },
        // Text colors
        text: {
          primary: '#fafafa',
          secondary: '#a1a1a1',
          muted: '#6b6b6b',
          inverse: '#0a0a0a',
        },
        // Border colors
        border: {
          default: 'rgba(255, 255, 255, 0.1)',
          muted: 'rgba(255, 255, 255, 0.05)',
          strong: 'rgba(255, 255, 255, 0.2)',
        },
        // Accent colors
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
            light: '#fcd34d',
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
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
    },
  },
  plugins: [],
};
