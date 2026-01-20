'use client';

import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { TokenSliderRow } from '../shared/TokenSliderRow';
import { AddButton } from '../shared/AddButton';
import { cn } from '@/lib/utils';

export function RadiusPanel() {
  const { state, updateRadiusBase, updateRadiusValue } = useTokens();
  const { radius } = state.tokens;

  return (
    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Border Radius Section */}
      <SectionLabel>Border Radius</SectionLabel>

      <div className="px-6 pb-2">
        <p className="text-xs text-[#6B7280] mb-3">
          Base radius for calculating scale
        </p>
        <TokenSliderRow
          label="Base"
          value={radius.base}
          min={0}
          max={24}
          onChange={updateRadiusBase}
        />
      </div>

      <SectionDivider />

      {/* Scale Preview Section */}
      <SectionLabel>Scale</SectionLabel>

      <div className="px-6">
        <div className="grid grid-cols-5 gap-3">
          {radius.scale.slice(0, 5).map((r) => (
            <div
              key={r.name}
              className="flex flex-col items-center gap-2 p-3 border border-[#E5E7EB] rounded-lg bg-white"
            >
              <div
                className="w-10 h-10 border-2 border-[#D4D4D8] bg-[#F4F4F5]"
                style={{ borderRadius: r.value === 9999 ? '50%' : r.value }}
              />
              <span className="text-[10px] text-[#9CA3AF]">{r.name}</span>
              <span className="text-[10px] font-mono text-[#6B7280]">
                {r.value === 9999 ? '9999px' : `${r.value}px`}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-3 mt-3">
          {radius.scale.slice(5).map((r) => (
            <div
              key={r.name}
              className="flex flex-col items-center gap-2 p-3 border border-[#E5E7EB] rounded-lg bg-white"
            >
              <div
                className="w-10 h-10 border-2 border-[#D4D4D8] bg-[#F4F4F5]"
                style={{ borderRadius: r.value === 9999 ? '50%' : r.value }}
              />
              <span className="text-[10px] text-[#9CA3AF]">{r.name}</span>
              <span className="text-[10px] font-mono text-[#6B7280]">
                {r.value === 9999 ? '9999px' : `${r.value}px`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Values Section */}
      <SectionLabel>Values</SectionLabel>

      <div className="px-6 space-y-3 pb-6">
        {radius.scale.map((item, index) => (
          <div key={item.name} className="flex items-center gap-4">
            <span className="text-sm text-[#374151] w-12">{item.name}</span>
            <div className="flex-1">
              <input
                type="text"
                value={item.value === 9999 ? '9999px' : `${item.value}px`}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace('px', ''));
                  if (!isNaN(val)) {
                    updateRadiusValue(index, val);
                  }
                }}
                className={cn(
                  'w-full h-9 px-2.5 rounded-lg border border-[#E5E5E5] bg-white',
                  'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
                  'hover:border-[#D4D4D4] focus:border-[#D4D4D4] focus:ring-1 focus:ring-[#E5E5E5] focus:outline-none',
                  'text-sm font-mono text-[#374151]'
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <AddButton onClick={() => {}}>Add radius</AddButton>
    </div>
  );
}
