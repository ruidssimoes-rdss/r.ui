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

function InfoIcon({ size = 12, className }: { size?: number; className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
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
  const [showTooltip, setShowTooltip] = useState(false);
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
      {/* Section Label with Info */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.5px] text-[#9CA3AF]">
            Neutral Scale
          </span>
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            >
              <InfoIcon size={12} />
            </button>
            {showTooltip && (
              <div className="absolute left-0 top-5 z-50 w-56 p-2.5 bg-[#18181B] text-white text-xs rounded-lg shadow-lg">
                <p className="leading-relaxed">
                  Neutral colors are used for text, backgrounds, borders, and UI chrome. Choose a preset that complements your brand colors.
                </p>
                <div
                  className="absolute -top-1 left-2 w-2 h-2 bg-[#18181B] rotate-45"
                />
              </div>
            )}
          </div>
        </div>
        <p className="text-[10px] text-[#9CA3AF] mt-1">
          Gray tones for text, borders & backgrounds
        </p>
      </div>

      {/* Dropdown Trigger */}
      <div className="px-6">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'w-full flex items-center justify-between py-2 transition-colors',
            'hover:opacity-80'
          )}
        >
          <span className="text-sm font-medium text-[#374151]">{currentPreset.name}</span>
          <ChevronDownIcon
            size={14}
            className={cn(
              'text-[#9CA3AF] transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>

        {/* Scale Preview Bar */}
        <div className="flex h-3.5 rounded overflow-hidden mt-3">
          {scaleValues.map((color, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[72px] left-6 right-6 py-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50">
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
