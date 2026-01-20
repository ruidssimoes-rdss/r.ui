'use client';

import { cn } from '@/lib/utils';

interface TokenSliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function TokenSliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  unit = 'px',
  onChange,
}: TokenSliderRowProps) {
  return (
    <div className="py-2.5 px-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-[#9CA3AF]">{label}</span>
        <span className="text-sm font-mono text-[#374151]">
          {value}
          {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          'w-full h-1.5 bg-[#E5E7EB] rounded-full appearance-none cursor-pointer',
          '[&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:h-4',
          '[&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:bg-[#18181B]',
          '[&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:transition-transform',
          '[&::-webkit-slider-thumb]:hover:scale-110'
        )}
      />
    </div>
  );
}
