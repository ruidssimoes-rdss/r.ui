'use client';

import { StudioHeader } from './StudioHeader';
import { StudioToolbar } from './StudioToolbar';
import { StudioPreview } from './StudioPreview';
import { StudioCodeView } from './StudioCodeView';
import { StudioTokens } from './StudioTokens';
import { useStudio } from '@/lib/studio/studio-context';

export function StudioPage() {
  const { state } = useStudio();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sub-header */}
      <StudioHeader />

      {/* Main content */}
      <div className="flex-1 px-4 lg:px-8 py-6 space-y-6">
        {/* Toolbar (at TOP of preview) */}
        <StudioToolbar />

        {/* Preview or Code View */}
        <div className="min-h-[400px]">
          {state.viewMode === 'preview' ? (
            <StudioPreview />
          ) : (
            <StudioCodeView />
          )}
        </div>

        {/* Design Tokens */}
        <StudioTokens />
      </div>
    </div>
  );
}
