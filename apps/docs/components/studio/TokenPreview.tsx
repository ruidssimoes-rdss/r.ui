'use client';

import { useTokens } from '@/lib/studio/context';
import { PreviewToolbar } from './preview/PreviewToolbar';
import { PreviewShowcase } from './preview/PreviewShowcase';
import { TokenSystem, PreviewMode } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

function generateCSSVariables(
  tokens: TokenSystem,
  mode: PreviewMode
): React.CSSProperties {
  const vars: Record<string, string> = {};

  // Brand colors
  tokens.colors.brand.forEach((c) => {
    vars[`--color-${c.name}`] = c.value[mode];
  });

  // Semantic colors
  tokens.colors.semantic.forEach((c) => {
    vars[`--color-${c.name}`] = c.value[mode];
  });

  // Surface colors
  Object.entries(tokens.colors.surface).forEach(([name, value]) => {
    const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    vars[`--color-${kebabName}`] = value[mode];
  });

  // Neutrals
  Object.entries(tokens.colors.neutral.scale).forEach(([key, value]) => {
    vars[`--color-neutral-${key}`] = value;
  });

  // Radius
  vars['--radius-base'] = `${tokens.radius.base}px`;
  tokens.radius.scale.forEach((r) => {
    vars[`--radius-${r.name}`] =
      r.value === 9999 ? '9999px' : `${r.value}px`;
  });

  // Typography
  tokens.typography.families.forEach((f) => {
    vars[`--font-${f.name}`] = f.value;
  });

  // Shadows
  tokens.shadows.scale.forEach((s) => {
    vars[`--shadow-${s.name}`] = s.value;
  });

  return vars as React.CSSProperties;
}

export function TokenPreview() {
  const { state } = useTokens();
  const { previewMode, previewDevice } = state;

  // Generate CSS variables from tokens
  const cssVariables = generateCSSVariables(state.tokens, previewMode);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <PreviewToolbar />

      {/* Preview Area */}
      <div
        className={cn(
          'flex-1 overflow-auto transition-colors',
          previewMode === 'light' ? 'bg-white' : 'bg-[#09090b]'
        )}
        style={cssVariables}
      >
        <div
          className={cn(
            'min-h-full flex items-start justify-center',
            previewDevice === 'mobile' && 'max-w-[375px] mx-auto',
            previewDevice === 'tablet' && 'max-w-[768px] mx-auto'
          )}
        >
          <PreviewShowcase mode={previewMode} />
        </div>
      </div>
    </div>
  );
}
