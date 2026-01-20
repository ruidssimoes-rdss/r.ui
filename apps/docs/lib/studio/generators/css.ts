import { TokenSystem } from '../types';

export function generateCSS(tokens: TokenSystem): string {
  const lines: string[] = [':root {'];

  // Brand colors (light mode)
  lines.push('  /* Brand Colors */');
  tokens.colors.brand.forEach((c) => {
    lines.push(`  --color-${c.name}: ${c.value.light};`);
  });

  // Semantic colors (light mode)
  lines.push('');
  lines.push('  /* Semantic Colors */');
  tokens.colors.semantic.forEach((c) => {
    lines.push(`  --color-${c.name}: ${c.value.light};`);
  });

  // Neutrals
  lines.push('');
  lines.push('  /* Neutrals */');
  Object.entries(tokens.colors.neutral.scale).forEach(([key, value]) => {
    lines.push(`  --color-neutral-${key}: ${value};`);
  });

  // Surfaces (light mode)
  lines.push('');
  lines.push('  /* Surfaces */');
  Object.entries(tokens.colors.surface).forEach(([name, value]) => {
    const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    lines.push(`  --color-${kebabName}: ${value.light};`);
  });

  // Typography
  lines.push('');
  lines.push('  /* Typography */');
  tokens.typography.families.forEach((f) => {
    lines.push(`  --font-${f.name}: ${f.value};`);
  });
  tokens.typography.sizes.forEach((s) => {
    lines.push(`  --font-size-${s.name}: ${s.size}px;`);
    lines.push(`  --line-height-${s.name}: ${s.lineHeight};`);
  });
  tokens.typography.weights.forEach((w) => {
    lines.push(`  --font-weight-${w.name}: ${w.value};`);
  });

  // Spacing
  lines.push('');
  lines.push('  /* Spacing */');
  tokens.spacing.scale.forEach((value, index) => {
    lines.push(`  --spacing-${index}: ${value}px;`);
  });

  // Radius
  lines.push('');
  lines.push('  /* Border Radius */');
  tokens.radius.scale.forEach((r) => {
    lines.push(
      `  --radius-${r.name}: ${r.value === 9999 ? '9999px' : r.value + 'px'};`
    );
  });

  // Shadows
  lines.push('');
  lines.push('  /* Shadows */');
  tokens.shadows.scale.forEach((s) => {
    lines.push(`  --shadow-${s.name}: ${s.value};`);
  });

  // Animations
  lines.push('');
  lines.push('  /* Animations */');
  tokens.animations.durations.forEach((d) => {
    lines.push(`  --duration-${d.name}: ${d.value}ms;`);
  });
  tokens.animations.easings.forEach((e) => {
    lines.push(`  --easing-${e.name}: ${e.value};`);
  });

  lines.push('}');

  // Dark mode
  lines.push('');
  lines.push('.dark {');

  // Brand colors (dark mode)
  lines.push('  /* Brand Colors */');
  tokens.colors.brand.forEach((c) => {
    lines.push(`  --color-${c.name}: ${c.value.dark};`);
  });

  // Semantic colors (dark mode)
  lines.push('');
  lines.push('  /* Semantic Colors */');
  tokens.colors.semantic.forEach((c) => {
    lines.push(`  --color-${c.name}: ${c.value.dark};`);
  });

  // Surfaces (dark mode)
  lines.push('');
  lines.push('  /* Surfaces */');
  Object.entries(tokens.colors.surface).forEach(([name, value]) => {
    const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    lines.push(`  --color-${kebabName}: ${value.dark};`);
  });

  lines.push('}');

  return lines.join('\n');
}
