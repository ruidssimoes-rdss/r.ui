'use client';

import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { TokenSliderRow } from '../shared/TokenSliderRow';
import { cn } from '@/lib/utils';

export function RadiusPanel() {
  const { state, updateRadiusBase } = useTokens();
  const { radius } = state.tokens;

  return (
    <div className="h-full overflow-y-auto">
      <SectionLabel>Border Radius</SectionLabel>

      <div className="px-1">
        <TokenSliderRow
          label="Base"
          value={radius.base}
          min={0}
          max={24}
          onChange={updateRadiusBase}
        />
      </div>

      <SectionDivider />

      <SectionLabel>Scale Preview</SectionLabel>

      {/* Preview */}
      <div className="px-3 py-4">
        <div className="flex items-end justify-center gap-3">
          {radius.scale.slice(1, -1).map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 bg-[#18181B]"
                style={{ borderRadius: r.value === 9999 ? '50%' : r.value }}
              />
              <span className="text-[10px] text-[#9CA3AF]">{r.name}</span>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      <SectionLabel>Values</SectionLabel>

      <div className="px-3 py-2 space-y-1.5">
        {radius.scale.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-1"
          >
            <span className="text-xs text-[#6B7280]">{item.name}</span>
            <span className="text-xs font-mono text-[#374151]">
              {item.value === 9999 ? '9999px' : `${item.value}px`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
