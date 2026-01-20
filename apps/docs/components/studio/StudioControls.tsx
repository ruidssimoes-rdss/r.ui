'use client';

import { useTokens } from '@/lib/studio/context';
import { ColorsPanel } from './panels/ColorsPanel';
import { TypographyPanel } from './panels/TypographyPanel';
import { SpacingPanel } from './panels/SpacingPanel';
import { RadiusPanel } from './panels/RadiusPanel';
import { ShadowsPanel } from './panels/ShadowsPanel';
import { MotionPanel } from './panels/MotionPanel';

export function StudioControls() {
  const { state } = useTokens();

  const renderPanel = () => {
    switch (state.activeTab) {
      case 'colors':
        return <ColorsPanel />;
      case 'typography':
        return <TypographyPanel />;
      case 'spacing':
        return <SpacingPanel />;
      case 'radius':
        return <RadiusPanel />;
      case 'shadows':
        return <ShadowsPanel />;
      case 'animations':
        return <MotionPanel />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Panel Content */}
      <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {renderPanel()}
      </div>
    </div>
  );
}
