'use client';

import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';

export function ShadowsPanel() {
  const { state, updateShadow } = useTokens();
  const { shadows } = state.tokens;

  return (
    <div className="h-full overflow-y-auto">
      <SectionLabel>Shadow Scale</SectionLabel>

      <div className="px-3 py-2 space-y-2">
        {shadows.scale.map((shadow, index) => (
          <div
            key={shadow.name}
            className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[#F9FAFB] transition-colors group"
          >
            <div
              className="w-10 h-10 bg-white rounded-lg flex-shrink-0 border border-[#F3F4F6]"
              style={{ boxShadow: shadow.value }}
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-[#374151] block">
                {shadow.name}
              </span>
              <input
                type="text"
                value={shadow.value}
                onChange={(e) => updateShadow(index, e.target.value)}
                className="w-full text-[10px] font-mono text-[#9CA3AF] bg-transparent border-0 focus:outline-none focus:text-[#374151] truncate"
                placeholder="none"
              />
            </div>
          </div>
        ))}
      </div>

      <SectionDivider />

      <SectionLabel>Preview</SectionLabel>

      <div className="px-3 py-4">
        <div className="grid grid-cols-3 gap-3 p-3 bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] rounded-lg">
          {shadows.scale.slice(1).map((shadow) => (
            <div
              key={shadow.name}
              className="bg-white rounded-lg p-3 flex items-center justify-center h-14"
              style={{ boxShadow: shadow.value }}
            >
              <span className="text-[10px] font-medium text-[#374151]">
                {shadow.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      <SectionLabel>Usage Guide</SectionLabel>

      <div className="px-3 py-2 space-y-1.5">
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-[#6B7280]">sm</span>
          <span className="text-[10px] text-[#9CA3AF]">Buttons, inputs</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-[#6B7280]">md</span>
          <span className="text-[10px] text-[#9CA3AF]">Cards, dropdowns</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-[#6B7280]">lg</span>
          <span className="text-[10px] text-[#9CA3AF]">Modals, dialogs</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-[#6B7280]">xl</span>
          <span className="text-[10px] text-[#9CA3AF]">Hero sections</span>
        </div>
      </div>
    </div>
  );
}
