'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { cn } from '@/lib/utils';

// Icons
function PlayIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export function MotionPanel() {
  const { state, updateDuration, updateEasing } = useTokens();
  const { animations } = state.tokens;
  const [playing, setPlaying] = useState<string | null>(null);

  const playAnimation = (name: string) => {
    setPlaying(name);
    setTimeout(() => setPlaying(null), 1000);
  };

  return (
    <div className="h-full overflow-y-auto">
      <SectionLabel>Durations</SectionLabel>

      <div className="px-3 py-2 space-y-2">
        {animations.durations.map((duration, index) => (
          <div
            key={duration.name}
            className="flex items-center gap-3 py-1.5"
          >
            <span className="text-xs text-[#6B7280] w-14">{duration.name}</span>
            <input
              type="range"
              value={duration.value}
              onChange={(e) => updateDuration(index, Number(e.target.value))}
              className={cn(
                'flex-1 h-1 bg-[#E5E7EB] rounded-full appearance-none cursor-pointer',
                '[&::-webkit-slider-thumb]:appearance-none',
                '[&::-webkit-slider-thumb]:w-3',
                '[&::-webkit-slider-thumb]:h-3',
                '[&::-webkit-slider-thumb]:rounded-full',
                '[&::-webkit-slider-thumb]:bg-[#18181B]'
              )}
              min={0}
              max={1000}
            />
            <span className="text-xs font-mono text-[#374151] w-12 text-right">
              {duration.value}ms
            </span>
          </div>
        ))}
      </div>

      <SectionDivider />

      <SectionLabel>Easings</SectionLabel>

      <div className="px-3 py-2 space-y-2">
        {animations.easings.map((easing, index) => (
          <div
            key={easing.name}
            className="flex items-center gap-3 py-1.5"
          >
            <span className="text-xs text-[#6B7280] w-20">{easing.name}</span>
            <input
              type="text"
              value={easing.value}
              onChange={(e) => updateEasing(index, e.target.value)}
              className="flex-1 px-2 py-1 text-[10px] font-mono bg-[#F9FAFB] border border-[#E5E7EB] rounded focus:border-[#9CA3AF] focus:outline-none"
            />
            <button
              onClick={() => playAnimation(easing.name)}
              className="p-1.5 text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F3F4F6] rounded transition-colors"
            >
              <PlayIcon size={10} />
            </button>
          </div>
        ))}
      </div>

      <SectionDivider />

      <SectionLabel>Preview</SectionLabel>

      <div className="px-3 py-4 space-y-3">
        {animations.easings.map((easing) => (
          <div key={easing.name} className="flex items-center gap-3">
            <span className="text-[10px] text-[#9CA3AF] w-16">{easing.name}</span>
            <div className="flex-1 h-6 bg-[#F9FAFB] rounded-md relative overflow-hidden border border-[#E5E7EB]">
              <div
                className="absolute top-1 bottom-1 left-1 w-4 bg-[#18181B] rounded"
                style={{
                  transition:
                    playing === easing.name
                      ? `transform ${animations.durations[1]?.value || 200}ms ${easing.value}`
                      : 'none',
                  transform:
                    playing === easing.name
                      ? 'translateX(calc(100% + 220px))'
                      : 'translateX(0)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
