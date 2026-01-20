'use client';

import { useStudio } from '@/lib/studio/studio-context';
import { ComponentShowcase } from './ComponentShowcase';
import { cn } from '@/lib/utils';

export function StudioPreview() {
  const { state } = useStudio();
  const { tokens, previewMode, previewDevice } = state;

  // Generate CSS variables from tokens
  const cssVariables = tokens.colors.reduce(
    (acc, color) => {
      acc[`--color-${color.name}`] = color.value;
      return acc;
    },
    {} as Record<string, string>
  );

  cssVariables['--radius-base'] = `${tokens.radius.base}px`;
  cssVariables['--spacing-base'] = `${tokens.spacing.base}px`;

  return (
    <div
      className={cn(
        'rounded-lg border border-border/50 overflow-hidden transition-colors',
        previewMode === 'light' ? 'bg-white' : 'bg-[#0a0a0a]'
      )}
      style={cssVariables as React.CSSProperties}
    >
      {/* Preview Container */}
      <div
        className={cn(
          'min-h-[400px] p-8 flex items-center justify-center transition-all',
          previewDevice === 'mobile' && 'max-w-[375px] mx-auto',
          previewDevice === 'tablet' && 'max-w-[768px] mx-auto'
        )}
      >
        <ComponentShowcase mode={previewMode} />
      </div>
    </div>
  );
}
