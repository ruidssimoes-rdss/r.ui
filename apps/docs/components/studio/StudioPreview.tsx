'use client';

import { useStudio } from '@/lib/studio/studio-context';
import { StudioToolbar } from './StudioToolbar';
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

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar at TOP of preview */}
      <StudioToolbar />

      {/* Preview Area */}
      <div
        className={cn(
          'flex-1 overflow-auto transition-colors',
          previewMode === 'light' ? 'bg-white' : 'bg-[#0a0a0a]'
        )}
        style={cssVariables as React.CSSProperties}
      >
        {/* Centered Container */}
        <div
          className={cn(
            'min-h-full p-8 flex items-start justify-center',
            previewDevice === 'mobile' && 'max-w-[375px] mx-auto',
            previewDevice === 'tablet' && 'max-w-[768px] mx-auto'
          )}
        >
          <ComponentShowcase mode={previewMode} />
        </div>
      </div>
    </div>
  );
}
