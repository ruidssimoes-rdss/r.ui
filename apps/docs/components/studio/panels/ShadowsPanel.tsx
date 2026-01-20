'use client';

import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { AddButton } from '../shared/AddButton';
import { cn } from '@/lib/utils';

export function ShadowsPanel() {
  const { state, updateShadow } = useTokens();
  const { shadows } = state.tokens;

  return (
    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Box Shadows Section */}
      <SectionLabel>Box Shadows</SectionLabel>

      <div className="px-6 pb-2">
        <p className="text-xs text-[#6B7280] mb-4">
          Shadow definitions for elevation
        </p>
      </div>

      {/* Preview Area */}
      <div className="px-6">
        <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg">
          <div className="flex justify-center gap-6">
            {shadows.scale.map((shadow) => (
              <div key={shadow.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 bg-white rounded-lg"
                  style={{ boxShadow: shadow.value }}
                />
                <span className="text-[11px] text-[#6B7280]">{shadow.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Values Section */}
      <SectionLabel>Values</SectionLabel>

      <div className="px-6 space-y-3 pb-6">
        {shadows.scale.map((shadow, index) => (
          <div key={shadow.name} className="flex items-center gap-4">
            <span className="text-sm text-[#374151] w-12">{shadow.name}</span>
            <div className="flex-1">
              <input
                type="text"
                value={shadow.value}
                onChange={(e) => updateShadow(index, e.target.value)}
                className={cn(
                  'w-full h-9 px-2.5 rounded-lg border border-[#E5E5E5] bg-white',
                  'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
                  'hover:border-[#D4D4D4] focus:border-[#D4D4D4] focus:ring-1 focus:ring-[#E5E5E5] focus:outline-none',
                  'text-xs font-mono text-[#374151]'
                )}
                placeholder="none"
              />
            </div>
          </div>
        ))}
      </div>

      <AddButton onClick={() => {}}>Add shadow</AddButton>
    </div>
  );
}
