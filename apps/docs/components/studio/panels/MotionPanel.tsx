'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { AddButton } from '../shared/AddButton';
import { cn } from '@/lib/utils';

export function MotionPanel() {
  const { state, updateDuration, updateEasing } = useTokens();
  const { animations } = state.tokens;
  const [animationKey, setAnimationKey] = useState(0);

  // Auto-restart animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((k) => k + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Durations Section */}
      <SectionLabel>Durations</SectionLabel>

      <div className="px-6 pb-2">
        <p className="text-xs text-[#6B7280] mb-3">
          Animation timing values
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 px-6">
        {animations.durations.slice(0, 3).map((duration, index) => (
          <div key={duration.name} className="flex flex-col gap-1.5">
            <span className="text-[11px] text-[#9CA3AF]">{duration.name}</span>
            <div
              className={cn(
                'h-9 flex items-center justify-center px-2.5 rounded-lg border border-[#E5E5E5] bg-white',
                'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
              )}
            >
              <span className="text-sm font-mono text-[#374151]">{duration.value}ms</span>
            </div>
          </div>
        ))}
      </div>
      {animations.durations.length > 3 && (
        <div className="grid grid-cols-3 gap-3 px-6 mt-3">
          {animations.durations.slice(3).map((duration, index) => (
            <div key={duration.name} className="flex flex-col gap-1.5">
              <span className="text-[11px] text-[#9CA3AF]">{duration.name}</span>
              <div
                className={cn(
                  'h-9 flex items-center justify-center px-2.5 rounded-lg border border-[#E5E5E5] bg-white',
                  'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                )}
              >
                <span className="text-sm font-mono text-[#374151]">{duration.value}ms</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddButton onClick={() => {}}>Add duration</AddButton>

      <SectionDivider />

      {/* Easings Section */}
      <SectionLabel>Easings</SectionLabel>

      <div className="px-6 pb-2">
        <p className="text-xs text-[#6B7280] mb-3">
          Timing functions for animations
        </p>
      </div>

      {/* Easing Preview Area */}
      <div className="px-6">
        <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg space-y-3">
          {animations.easings.map((easing) => (
            <div key={`${easing.name}-${animationKey}`} className="flex items-center gap-3">
              {/* Animated dot with track */}
              <div className="flex-1 h-4 relative">
                {/* Track */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#E5E7EB]" />
                {/* Dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#3B82F6] rounded-full"
                  style={{
                    animation: `slideRight 2s ${easing.value} infinite`,
                  }}
                />
              </div>
              {/* Label */}
              <span className="text-[11px] text-[#6B7280] w-20">{easing.name}</span>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Values Section */}
      <SectionLabel>Values</SectionLabel>

      <div className="px-6 space-y-3 pb-6">
        {animations.easings.map((easing, index) => (
          <div key={easing.name} className="flex items-center gap-4">
            <span className="text-sm text-[#374151] w-20">{easing.name}</span>
            <div className="flex-1">
              <input
                type="text"
                value={easing.value}
                onChange={(e) => updateEasing(index, e.target.value)}
                className={cn(
                  'w-full h-9 px-2.5 rounded-lg border border-[#E5E5E5] bg-white',
                  'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
                  'hover:border-[#D4D4D4] focus:border-[#D4D4D4] focus:ring-1 focus:ring-[#E5E5E5] focus:outline-none',
                  'text-xs font-mono text-[#374151]'
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <AddButton onClick={() => {}}>Add easing</AddButton>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes slideRight {
          0% {
            left: 0;
          }
          50% {
            left: calc(100% - 8px);
          }
          100% {
            left: 0;
          }
        }
      `}</style>
    </div>
  );
}
