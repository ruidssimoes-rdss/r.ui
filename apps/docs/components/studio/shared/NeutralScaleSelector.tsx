'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { generateColorScale } from '@/lib/studio/utils/color';
import { ColorScale } from '@/lib/studio/types';

// Icons
function ChevronDownIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const neutralPresets = [
  { name: 'Slate', base: '#64748b' },
  { name: 'Gray', base: '#6b7280' },
  { name: 'Zinc', base: '#71717a' },
  { name: 'Neutral', base: '#737373' },
  { name: 'Stone', base: '#78716c' },
];

interface NeutralScaleSelectorProps {
  value: { baseColor: string; scale: ColorScale };
  onChange: (baseColor: string) => void;
}

export function NeutralScaleSelector({ value, onChange }: NeutralScaleSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentPreset =
    neutralPresets.find((p) => p.base === value.baseColor) || neutralPresets[2];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get scale values as array for preview
  const scaleValues = Object.values(value.scale);

  return (
    <div ref={ref} className="relative">
      {/* Selector */}
      <div className="space-y-2">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'w-full flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors',
            open ? 'bg-[#F3F4F6]' : 'hover:bg-[#F9FAFB]'
          )}
        >
          <div className="flex flex-col gap-0.5 text-left">
            <span className="text-[11px] text-[#9CA3AF]">Neutral Scale</span>
            <span className="text-sm font-medium text-[#374151]">{currentPreset.name}</span>
          </div>
          <ChevronDownIcon
            size={14}
            className={cn(
              'text-[#9CA3AF] transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>

        {/* Scale Preview Bar */}
        <div className="flex h-2 rounded-full overflow-hidden mx-3">
          {scaleValues.map((color, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 py-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50">
          {neutralPresets.map((preset) => {
            const presetScale = generateColorScale(preset.base);
            const presetScaleValues = Object.values(presetScale).slice(0, 5);

            return (
              <button
                key={preset.name}
                onClick={() => {
                  onChange(preset.base);
                  setOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 transition-colors',
                  currentPreset.name === preset.name
                    ? 'bg-[#F3F4F6]'
                    : 'hover:bg-[#F9FAFB]'
                )}
              >
                {/* Mini scale preview */}
                <div className="flex h-4 w-16 rounded overflow-hidden">
                  {presetScaleValues.map((color, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>

                <span className="flex-1 text-sm text-left text-[#374151]">
                  {preset.name}
                </span>

                {currentPreset.name === preset.name && (
                  <CheckIcon size={14} className="text-[#18181B]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
