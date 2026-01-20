'use client';

import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { TokenSliderRow } from '../shared/TokenSliderRow';
import { AddButton } from '../shared/AddButton';
import { cn } from '@/lib/utils';

// Spacing scale names
const spacingNames = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'];

export function SpacingPanel() {
  const { state, updateSpacingBase } = useTokens();
  const { spacing } = state.tokens;

  // Max bar width for visual preview
  const maxBarWidth = 200;

  return (
    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Spacing Scale Section */}
      <SectionLabel>Spacing Scale</SectionLabel>

      <div className="px-6 pb-2">
        <p className="text-xs text-[#6B7280] mb-3">
          Base unit for calculating spacing
        </p>
        <TokenSliderRow
          label="Base"
          value={spacing.baseUnit}
          min={1}
          max={16}
          onChange={updateSpacingBase}
        />
      </div>

      <SectionDivider />

      {/* Scale Section */}
      <SectionLabel>Scale</SectionLabel>

      <div className="px-6 space-y-2 pb-6">
        {spacing.scale.map((value, index) => {
          const name = spacingNames[index] || String(index);
          const barWidth = Math.min(value, maxBarWidth);

          return (
            <div key={index} className="flex items-center gap-4">
              {/* Name */}
              <span className="text-sm text-[#374151] w-8 text-right font-mono">
                {name}
              </span>

              {/* Visual Bar Container */}
              <div
                className={cn(
                  'flex-1 h-6 rounded-md border border-[#E5E7EB] bg-white overflow-hidden',
                  'flex items-center'
                )}
              >
                {value > 0 && (
                  <div
                    className="h-full bg-[#3B82F6] rounded-sm transition-all"
                    style={{ width: barWidth }}
                  />
                )}
              </div>

              {/* Value */}
              <span className="text-sm font-mono text-[#374151] w-12 text-right">
                {value}px
              </span>
            </div>
          );
        })}
      </div>

      <AddButton onClick={() => {}}>Add spacing</AddButton>
    </div>
  );
}
