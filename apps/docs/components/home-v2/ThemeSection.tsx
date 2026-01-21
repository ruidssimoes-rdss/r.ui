'use client';

import { useState } from 'react';

type ThemeName = 'dark' | 'light' | 'oatmeal' | 'glass';

interface ThemeConfig {
  name: ThemeName;
  label: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  buttonBg: string;
  buttonText: string;
  sectionBg: string;
  backdrop?: string;
}

const themes: Record<ThemeName, ThemeConfig> = {
  dark: {
    name: 'dark',
    label: 'Dark',
    cardBg: 'bg-zinc-900',
    cardBorder: 'border-zinc-700',
    textPrimary: 'text-white',
    textSecondary: 'text-zinc-400',
    buttonBg: 'bg-white',
    buttonText: 'text-black',
    sectionBg: 'bg-zinc-950',
  },
  light: {
    name: 'light',
    label: 'Light',
    cardBg: 'bg-white',
    cardBorder: 'border-zinc-200',
    textPrimary: 'text-zinc-900',
    textSecondary: 'text-zinc-500',
    buttonBg: 'bg-zinc-900',
    buttonText: 'text-white',
    sectionBg: 'bg-zinc-50',
  },
  oatmeal: {
    name: 'oatmeal',
    label: 'Oatmeal',
    cardBg: 'bg-[#FAF8F5]',
    cardBorder: 'border-[#E8E4DD]',
    textPrimary: 'text-[#44403C]',
    textSecondary: 'text-[#78716C]',
    buttonBg: 'bg-[#44403C]',
    buttonText: 'text-white',
    sectionBg: 'bg-[#F5F0E8]',
  },
  glass: {
    name: 'glass',
    label: 'Glass',
    cardBg: 'bg-white/20',
    cardBorder: 'border-white/30',
    textPrimary: 'text-white',
    textSecondary: 'text-white/70',
    buttonBg: 'bg-white/30',
    buttonText: 'text-white',
    sectionBg: 'bg-gradient-to-br from-blue-900 via-purple-900 to-teal-800',
    backdrop: 'backdrop-blur-xl',
  },
};

function DemoCard({ theme }: { theme: ThemeConfig }) {
  return (
    <div
      className={`
        ${theme.cardBg} ${theme.cardBorder} ${theme.backdrop || ''}
        border rounded-2xl p-6 w-full max-w-sm transition-all duration-500
        shadow-2xl
      `}
    >
      <div className="mb-4">
        <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-1`}>
          Welcome back
        </h3>
        <p className={`text-sm ${theme.textSecondary}`}>
          Your dashboard is ready
        </p>
      </div>

      <p className={`text-sm ${theme.textSecondary} mb-6`}>
        You have 3 new notifications waiting for you.
      </p>

      <button
        className={`
          ${theme.buttonBg} ${theme.buttonText}
          px-4 py-2 rounded-lg font-medium text-sm
          transition-all hover:opacity-90
        `}
      >
        View Dashboard
      </button>
    </div>
  );
}

export function ThemeSection() {
  const [activeTheme, setActiveTheme] = useState<ThemeName>('dark');
  const theme = themes[activeTheme];

  return (
    <section
      className={`
        relative py-24 overflow-hidden transition-all duration-500
        ${theme.sectionBg}
      `}
    >
      {/* Background image for glass theme */}
      {activeTheme === 'glass' && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
      )}

      {/* Ambient glow for dark theme */}
      {activeTheme === 'dark' && (
        <div className="absolute inset-0">
          <div className="hp-noise absolute inset-0" />
          <div className="ambient-glow absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`
              text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500
              ${activeTheme === 'light' || activeTheme === 'oatmeal' ? 'text-zinc-900' : 'text-white'}
            `}
          >
            Four themes.
            <br />
            <span
              className={`
                transition-colors duration-500
                ${activeTheme === 'light' || activeTheme === 'oatmeal' ? 'text-zinc-400' : 'text-white/50'}
              `}
            >
              One component.
            </span>
          </h2>
        </div>

        {/* Card preview */}
        <div className="flex justify-center mb-12">
          <div className="theme-preview-transition">
            <DemoCard theme={theme} />
          </div>
        </div>

        {/* Theme selector */}
        <div className="flex justify-center gap-4">
          {(Object.keys(themes) as ThemeName[]).map((themeName) => (
            <button
              key={themeName}
              onClick={() => setActiveTheme(themeName)}
              className={`
                flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all
                ${activeTheme === themeName
                  ? activeTheme === 'light' || activeTheme === 'oatmeal'
                    ? 'bg-zinc-900/10'
                    : 'bg-white/10'
                  : 'hover:bg-white/5'
                }
              `}
            >
              {/* Theme dot */}
              <div
                className={`
                  w-4 h-4 rounded-full transition-all border-2
                  ${activeTheme === themeName ? 'scale-125' : 'scale-100'}
                  ${themeName === 'dark' ? 'bg-zinc-800 border-zinc-600' : ''}
                  ${themeName === 'light' ? 'bg-white border-zinc-300' : ''}
                  ${themeName === 'oatmeal' ? 'bg-[#F5F0E8] border-[#D4C8B8]' : ''}
                  ${themeName === 'glass' ? 'bg-gradient-to-br from-blue-400 to-purple-500 border-white/50' : ''}
                `}
              />
              <span
                className={`
                  text-xs font-medium transition-colors duration-500
                  ${activeTheme === 'light' || activeTheme === 'oatmeal'
                    ? activeTheme === themeName ? 'text-zinc-900' : 'text-zinc-500'
                    : activeTheme === themeName ? 'text-white' : 'text-white/50'
                  }
                `}
              >
                {themes[themeName].label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
