'use client';

import { useState } from 'react';

type ThemeName = 'dark' | 'light' | 'oatmeal' | 'glass';

interface ThemeColors {
  bg: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  buttonBg: string;
  buttonText: string;
  accent: string;
}

const themes: Record<ThemeName, ThemeColors> = {
  dark: {
    bg: '#0a0a0a',
    surface: '#141414',
    border: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    textMuted: 'rgba(255, 255, 255, 0.6)',
    buttonBg: '#ffffff',
    buttonText: '#0a0a0a',
    accent: '#3b82f6',
  },
  light: {
    bg: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    text: '#111827',
    textMuted: '#6b7280',
    buttonBg: '#111827',
    buttonText: '#ffffff',
    accent: '#3b82f6',
  },
  oatmeal: {
    bg: '#f5f0e8',
    surface: '#ebe5d9',
    border: 'rgba(139, 119, 92, 0.2)',
    text: '#3d3a34',
    textMuted: '#6b665c',
    buttonBg: '#3d3a34',
    buttonText: '#f5f0e8',
    accent: '#c9a66b',
  },
  glass: {
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    surface: 'rgba(255, 255, 255, 0.65)',
    border: 'rgba(255, 255, 255, 0.3)',
    text: '#1f2937',
    textMuted: '#4b5563',
    buttonBg: 'rgba(17, 24, 39, 0.85)',
    buttonText: '#ffffff',
    accent: '#3b82f6',
  },
};

interface ThemePreviewProps {
  theme: ThemeName;
}

function ThemePreview({ theme }: ThemePreviewProps) {
  const colors = themes[theme];
  const isGlass = theme === 'glass';

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: colors.bg,
        padding: '2rem',
        minHeight: '280px',
      }}
    >
      {/* Card */}
      <div
        className={`rounded-xl p-5 ${isGlass ? 'backdrop-blur-xl' : ''}`}
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          boxShadow: isGlass
            ? '0 8px 32px rgba(0, 0, 0, 0.1)'
            : theme === 'dark'
            ? '0 4px 6px rgba(0, 0, 0, 0.3)'
            : '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{
              background: colors.accent,
              color: '#fff',
            }}
          >
            H
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-0.5" style={{ color: colors.text }}>
              Hyena Components
            </h4>
            <p className="text-sm" style={{ color: colors.textMuted }}>
              Beautiful by default
            </p>
          </div>
        </div>

        <p className="text-sm mb-4" style={{ color: colors.textMuted }}>
          Every component adapts perfectly to your chosen theme. Switch seamlessly between dark, light, oatmeal, and glass modes.
        </p>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-transform active:scale-95"
            style={{
              background: colors.buttonBg,
              color: colors.buttonText,
            }}
          >
            Primary
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-transform active:scale-95"
            style={{
              background: 'transparent',
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            Secondary
          </button>
        </div>
      </div>
    </div>
  );
}

export function ThemeShowcase() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>('dark');

  const themeNames: ThemeName[] = ['dark', 'light', 'oatmeal', 'glass'];

  return (
    <section className="py-20 px-6 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            One component. Four vibes.
          </h2>
          <p className="text-lg text-gray-500">
            Switch themes instantly. Every component adapts beautifully.
          </p>
        </div>

        {/* Theme Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-lg bg-gray-100">
            {themeNames.map((theme) => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all capitalize ${
                  activeTheme === theme
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Preview */}
        <div className="transition-all duration-300">
          <ThemePreview theme={activeTheme} />
        </div>
      </div>
    </section>
  );
}
