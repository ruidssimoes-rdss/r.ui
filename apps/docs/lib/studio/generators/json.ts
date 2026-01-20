import { TokenSystem } from '../types';

/**
 * Generate W3C Design Tokens Community Group format
 * https://design-tokens.github.io/community-group/format/
 */
export function generateJSON(tokens: TokenSystem): string {
  const designTokens = {
    $schema:
      'https://design-tokens.github.io/community-group/format/draft-1.json',
    name: tokens.name,

    color: {
      brand: Object.fromEntries(
        tokens.colors.brand.map((c) => [
          c.name,
          {
            $type: 'color',
            $value: c.value.light,
            $description: c.description,
            dark: { $value: c.value.dark },
          },
        ])
      ),
      semantic: Object.fromEntries(
        tokens.colors.semantic.map((c) => [
          c.name,
          {
            $type: 'color',
            $value: c.value.light,
            dark: { $value: c.value.dark },
          },
        ])
      ),
      neutral: Object.fromEntries(
        Object.entries(tokens.colors.neutral.scale).map(([key, value]) => [
          key,
          { $type: 'color', $value: value },
        ])
      ),
      surface: Object.fromEntries(
        Object.entries(tokens.colors.surface).map(([name, value]) => [
          name,
          {
            $type: 'color',
            $value: value.light,
            dark: { $value: value.dark },
          },
        ])
      ),
    },

    typography: {
      fontFamily: Object.fromEntries(
        tokens.typography.families.map((f) => [
          f.name,
          { $type: 'fontFamily', $value: f.value },
        ])
      ),
      fontSize: Object.fromEntries(
        tokens.typography.sizes.map((s) => [
          s.name,
          {
            $type: 'dimension',
            $value: `${s.size}px`,
            lineHeight: s.lineHeight,
          },
        ])
      ),
      fontWeight: Object.fromEntries(
        tokens.typography.weights.map((w) => [
          w.name,
          { $type: 'fontWeight', $value: w.value },
        ])
      ),
    },

    spacing: {
      base: {
        $type: 'dimension',
        $value: `${tokens.spacing.baseUnit}px`,
      },
      scale: Object.fromEntries(
        tokens.spacing.scale.map((v, i) => [
          String(i),
          { $type: 'dimension', $value: `${v}px` },
        ])
      ),
    },

    borderRadius: {
      base: {
        $type: 'dimension',
        $value: `${tokens.radius.base}px`,
      },
      scale: Object.fromEntries(
        tokens.radius.scale.map((r) => [
          r.name,
          {
            $type: 'dimension',
            $value: r.value === 9999 ? '9999px' : `${r.value}px`,
          },
        ])
      ),
    },

    shadow: Object.fromEntries(
      tokens.shadows.scale.map((s) => [
        s.name,
        { $type: 'shadow', $value: s.value },
      ])
    ),

    animation: {
      duration: Object.fromEntries(
        tokens.animations.durations.map((d) => [
          d.name,
          { $type: 'duration', $value: `${d.value}ms` },
        ])
      ),
      easing: Object.fromEntries(
        tokens.animations.easings.map((e) => [
          e.name,
          { $type: 'cubicBezier', $value: e.value },
        ])
      ),
    },
  };

  return JSON.stringify(designTokens, null, 2);
}
