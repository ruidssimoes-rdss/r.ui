'use client';

import { StudioHeader } from './StudioHeader';
import { StudioPreview } from './StudioPreview';
import { StudioCodeView } from './StudioCodeView';
import { StudioControls } from './StudioControls';
import { useStudio } from '@/lib/studio/studio-context';

export function StudioPage() {
  const { state } = useStudio();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <StudioHeader />

      {/* Main Content - SPLIT VIEW */}
      <div className="flex-1 flex min-h-0">
        {/* Left Panel - Preview/Code (60%) */}
        <div className="flex-[3] min-w-0 flex flex-col border-r border-border/50">
          {state.viewMode === 'preview' ? (
            <StudioPreview />
          ) : (
            <StudioCodeView />
          )}
        </div>

        {/* Right Panel - Controls (40%) */}
        <div className="flex-[2] min-w-0 overflow-y-auto">
          <StudioControls />
        </div>
      </div>
    </div>
  );
}
