import { TokenSystem } from '../types';

export function generateRUITheme(tokens: TokenSystem): string {
  const theme = {
    name: tokens.name,
    colors: {
      light: {
        // Brand colors
        ...Object.fromEntries(
          tokens.colors.brand.map((c) => [c.name, c.value.light])
        ),
        // Semantic colors
        ...Object.fromEntries(
          tokens.colors.semantic.map((c) => [c.name, c.value.light])
        ),
        // Surface colors
        background: tokens.colors.surface.background.light,
        foreground: tokens.colors.surface.foreground.light,
        card: tokens.colors.surface.card.light,
        muted: tokens.colors.surface.muted.light,
        mutedForeground: tokens.colors.surface.mutedForeground.light,
        border: tokens.colors.surface.border.light,
        // Neutral scale
        neutral: tokens.colors.neutral.scale,
      },
      dark: {
        // Brand colors
        ...Object.fromEntries(
          tokens.colors.brand.map((c) => [c.name, c.value.dark])
        ),
        // Semantic colors
        ...Object.fromEntries(
          tokens.colors.semantic.map((c) => [c.name, c.value.dark])
        ),
        // Surface colors
        background: tokens.colors.surface.background.dark,
        foreground: tokens.colors.surface.foreground.dark,
        card: tokens.colors.surface.card.dark,
        muted: tokens.colors.surface.muted.dark,
        mutedForeground: tokens.colors.surface.mutedForeground.dark,
        border: tokens.colors.surface.border.dark,
        // Neutral scale (same for both modes)
        neutral: tokens.colors.neutral.scale,
      },
    },
    typography: {
      fonts: Object.fromEntries(
        tokens.typography.families.map((f) => [f.name, f.value])
      ),
      sizes: Object.fromEntries(
        tokens.typography.sizes.map((s) => [
          s.name,
          { size: s.size, lineHeight: s.lineHeight },
        ])
      ),
      weights: Object.fromEntries(
        tokens.typography.weights.map((w) => [w.name, w.value])
      ),
    },
    spacing: {
      base: tokens.spacing.baseUnit,
      scale: tokens.spacing.scale,
    },
    radius: {
      base: tokens.radius.base,
      scale: Object.fromEntries(
        tokens.radius.scale.map((r) => [r.name, r.value])
      ),
    },
    shadows: Object.fromEntries(
      tokens.shadows.scale.map((s) => [s.name, s.value])
    ),
    animations: {
      durations: Object.fromEntries(
        tokens.animations.durations.map((d) => [d.name, d.value])
      ),
      easings: Object.fromEntries(
        tokens.animations.easings.map((e) => [e.name, e.value])
      ),
    },
  };

  return `// r/ui theme configuration
import { createTheme } from '@r-ui/react-native';

export const theme = createTheme(${JSON.stringify(theme, null, 2)});`;
}
