'use client';

import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { TokenSliderRow } from '../shared/TokenSliderRow';

export function SpacingPanel() {
  const { state, updateSpacingBase } = useTokens();
  const { spacing } = state.tokens;

  return (
    <div className="h-full overflow-y-auto">
      <SectionLabel>Base Unit</SectionLabel>

      <div className="px-1">
        <TokenSliderRow
          label="Base"
          value={spacing.baseUnit}
          min={1}
          max={16}
          onChange={updateSpacingBase}
        />
      </div>

      <SectionDivider />

      <SectionLabel>Scale Preview</SectionLabel>

      <div className="px-3 py-2 space-y-2">
        {spacing.scale.slice(0, 10).map((value, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-[10px] text-[#9CA3AF] w-4 text-right">{index}</span>
            <div
              className="h-3 bg-[#18181B] rounded-sm transition-all"
              style={{ width: Math.max(value, 2) }}
            />
            <span className="text-xs font-mono text-[#6B7280]">{value}px</span>
          </div>
        ))}
      </div>

      <SectionDivider />

      <SectionLabel>Usage Reference</SectionLabel>

      <div className="px-3 py-2 space-y-1.5">
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-[#6B7280]">Tight</span>
          <span className="text-xs font-mono text-[#374151]">
            spacing-1 ({spacing.scale[1]}px)
          </span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-[#6B7280]">Small</span>
          <span className="text-xs font-mono text-[#374151]">
            spacing-2 ({spacing.scale[2]}px)
          </span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-[#6B7280]">Medium</span>
          <span className="text-xs font-mono text-[#374151]">
            spacing-4 ({spacing.scale[4]}px)
          </span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-[#6B7280]">Large</span>
          <span className="text-xs font-mono text-[#374151]">
            spacing-6 ({spacing.scale[6]}px)
          </span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-xs text-[#6B7280]">Section</span>
          <span className="text-xs font-mono text-[#374151]">
            spacing-8 ({spacing.scale[8]}px)
          </span>
        </div>
      </div>
    </div>
  );
}
