import { TokenSystem } from '../types';

export function generateTailwind(tokens: TokenSystem): string {
  const config = {
    theme: {
      extend: {
        colors: {
          // Brand colors
          ...Object.fromEntries(
            tokens.colors.brand.map((c) => [
              c.name,
              {
                DEFAULT: `var(--color-${c.name})`,
                light: c.value.light,
                dark: c.value.dark,
              },
            ])
          ),
          // Semantic colors
          ...Object.fromEntries(
            tokens.colors.semantic.map((c) => [
              c.name,
              {
                DEFAULT: `var(--color-${c.name})`,
                light: c.value.light,
                dark: c.value.dark,
              },
            ])
          ),
          // Neutral scale
          neutral: tokens.colors.neutral.scale,
          // Surface colors
          background: `var(--color-background)`,
          foreground: `var(--color-foreground)`,
          card: `var(--color-card)`,
          muted: {
            DEFAULT: `var(--color-muted)`,
            foreground: `var(--color-muted-foreground)`,
          },
          border: `var(--color-border)`,
        },
        fontFamily: Object.fromEntries(
          tokens.typography.families.map((f) => [f.name, f.value.split(', ')])
        ),
        fontSize: Object.fromEntries(
          tokens.typography.sizes.map((s) => [
            s.name,
            [`${s.size}px`, { lineHeight: String(s.lineHeight) }],
          ])
        ),
        fontWeight: Object.fromEntries(
          tokens.typography.weights.map((w) => [w.name, String(w.value)])
        ),
        spacing: Object.fromEntries(
          tokens.spacing.scale.map((v, i) => [String(i), `${v}px`])
        ),
        borderRadius: Object.fromEntries(
          tokens.radius.scale.map((r) => [
            r.name,
            r.value === 9999 ? '9999px' : `${r.value}px`,
          ])
        ),
        boxShadow: Object.fromEntries(
          tokens.shadows.scale.map((s) => [s.name, s.value])
        ),
        transitionDuration: Object.fromEntries(
          tokens.animations.durations.map((d) => [d.name, `${d.value}ms`])
        ),
        transitionTimingFunction: Object.fromEntries(
          tokens.animations.easings.map((e) => [e.name, e.value])
        ),
      },
    },
  };

  return `// tailwind.config.js
import type { Config } from 'tailwindcss';

const config: Config = ${JSON.stringify(config, null, 2)};

export default config;`;
}
