/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode colors (default)
        bg: {
          base: 'var(--bg-base)',
          raised: 'var(--bg-raised)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          muted: 'var(--bg-muted)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          blue: 'var(--accent-blue)',
          green: 'var(--accent-green)',
          amber: 'var(--accent-amber)',
          red: 'var(--accent-red)',
          purple: 'var(--accent-purple)',
        },
        // Glass effect colors - enhanced for premium glassmorphism
        glass: {
          bg: 'var(--glass-bg)',
          'bg-subtle': 'var(--glass-bg-subtle)',
          'bg-strong': 'var(--glass-bg-strong)',
          'bg-hover': 'var(--glass-bg-hover)',
          border: 'var(--glass-border)',
          'border-hover': 'var(--glass-border-hover)',
          shine: 'var(--glass-shine)',
          'shine-strong': 'var(--glass-shine-strong)',
        },
        // Oatmeal mode specific colors
        oatmeal: {
          base: '#f5f0e8',
          surface: '#ebe5d9',
          elevated: '#faf8f4',
          muted: '#e0d9cb',
          text: {
            primary: '#3d3a34',
            secondary: '#6b665c',
            muted: '#9a9488',
          },
          accent: {
            amber: '#c9a66b',
            terracotta: '#b87849',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      backdropSaturate: {
        125: '1.25',
        150: '1.5',
        175: '1.75',
        200: '2',
      },
      boxShadow: {
        // Glass shadows
        'glass': 'var(--glass-shadow)',
        'glass-lg': 'var(--glass-shadow-lg)',
        'glass-subtle': 'var(--glass-shadow-subtle)',
        // Glow effects
        'glow-sm': '0 0 15px -3px var(--accent-blue)',
        'glow-md': '0 0 25px -5px var(--accent-blue)',
        'glow-lg': '0 0 40px -8px var(--accent-blue)',
        'glow-blue': 'var(--glow-blue)',
        'glow-purple': 'var(--glow-purple)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.25), 0 0 40px rgba(34, 197, 94, 0.1)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.25), 0 0 40px rgba(245, 158, 11, 0.1)',
        'inner-shine': 'inset 0 1px 0 0 var(--glass-shine)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in-from-top-2': 'slideInFromTop 0.2s ease-out',
        'float-up': 'floatUp 0.3s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'zoom-in-95': 'zoomIn95 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromTop: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn95: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-secondary)',
            a: {
              color: 'var(--accent-blue)',
              '&:hover': {
                color: 'var(--accent-blue)',
                opacity: '0.8',
              },
            },
            h1: { color: 'var(--text-primary)' },
            h2: { color: 'var(--text-primary)' },
            h3: { color: 'var(--text-primary)' },
            h4: { color: 'var(--text-primary)' },
            strong: { color: 'var(--text-primary)' },
            code: {
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-surface)',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--border-default)',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: 'var(--code-bg)',
              border: '1px solid var(--code-border)',
            },
            blockquote: {
              borderLeftColor: 'var(--border-strong)',
              color: 'var(--text-muted)',
            },
            hr: {
              borderColor: 'var(--border-default)',
            },
            'ul > li::marker': {
              color: 'var(--text-muted)',
            },
            'ol > li::marker': {
              color: 'var(--text-muted)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      addUtilities({
        // Legacy glass utilities (maintained for compatibility)
        '.glass': {
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
          border: '1px solid var(--glass-border)',
        },
        '.glass-subtle': {
          background: 'var(--glass-bg-subtle)',
          backdropFilter: 'blur(12px) saturate(150%)',
          '-webkit-backdrop-filter': 'blur(12px) saturate(150%)',
          border: '1px solid var(--glass-border)',
        },
        // Premium glass panel utilities
        '.glass-panel': {
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(20px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
          borderRadius: '16px',
        },
        '.glass-panel-subtle': {
          background: 'var(--glass-bg-subtle)',
          backdropFilter: 'blur(12px) saturate(150%)',
          '-webkit-backdrop-filter': 'blur(12px) saturate(150%)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow-subtle)',
          borderRadius: '12px',
        },
        '.glass-panel-strong': {
          background: 'var(--glass-bg-strong)',
          backdropFilter: 'blur(24px) saturate(200%)',
          '-webkit-backdrop-filter': 'blur(24px) saturate(200%)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow-lg)',
          borderRadius: '20px',
        },
        // Glass hover utility
        '.glass-hover': {
          transition: 'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            background: 'var(--glass-bg-hover)',
            borderColor: 'var(--glass-border-hover)',
          },
        },
        // Glass glow utilities
        '.glass-glow': {
          boxShadow: 'var(--glass-shadow), var(--glow-blue)',
          borderColor: 'var(--glow-accent-border)',
        },
        '.glass-glow-purple': {
          boxShadow: 'var(--glass-shadow), var(--glow-purple)',
          borderColor: 'rgba(168, 85, 247, 0.3)',
        },
        // Gradient text utility
        '.text-gradient': {
          backgroundImage: 'var(--gradient-text)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          color: 'transparent',
        },
        // Theme transition utility
        '.transition-theme': {
          transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
        },
        // Glass transition utility
        '.transition-glass': {
          transition: 'transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        },
      });
    },
  ],
};
