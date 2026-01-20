'use client';

import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { AddButton } from '../shared/AddButton';
import { cn } from '@/lib/utils';

// Icons
function ChevronDownIcon({ size = 12 }: { size?: number }) {
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
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const fontOptions = {
  sans: [
    { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
    { value: 'system-ui, -apple-system, sans-serif', label: 'System UI' },
    { value: '"SF Pro Display", system-ui, sans-serif', label: 'SF Pro' },
    { value: 'Geist, system-ui, sans-serif', label: 'Geist' },
    { value: '"Plus Jakarta Sans", system-ui, sans-serif', label: 'Plus Jakarta Sans' },
  ],
  mono: [
    { value: '"JetBrains Mono", monospace', label: 'JetBrains Mono' },
    { value: '"Fira Code", monospace', label: 'Fira Code' },
    { value: '"SF Mono", monospace', label: 'SF Mono' },
    { value: 'Consolas, monospace', label: 'Consolas' },
    { value: '"Source Code Pro", monospace', label: 'Source Code Pro' },
  ],
};

// Font Family Card Component (matches ColorInput style)
function FontFamilyCard({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] text-[#9CA3AF]">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full h-9 px-2.5 pr-8 rounded-lg border border-[#E5E5E5] bg-white appearance-none',
            'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
            'hover:border-[#D4D4D4] focus:border-[#D4D4D4] focus:ring-1 focus:ring-[#E5E5E5] focus:outline-none',
            'text-sm text-[#374151]'
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#9CA3AF]">
          <ChevronDownIcon size={14} />
        </div>
      </div>
    </div>
  );
}

export function TypographyPanel() {
  const { state, updateFontFamily } = useTokens();
  const { typography } = state.tokens;

  const sansFamily = typography.families.find((f) => f.name === 'sans');
  const monoFamily = typography.families.find((f) => f.name === 'mono');

  return (
    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Font Family Section */}
      <SectionLabel>Font Family</SectionLabel>

      <div className="grid grid-cols-2 gap-3 px-6">
        {sansFamily && (
          <FontFamilyCard
            label="Sans"
            value={sansFamily.value}
            options={fontOptions.sans}
            onChange={(value) => updateFontFamily(sansFamily.id, value)}
          />
        )}
        {monoFamily && (
          <FontFamilyCard
            label="Mono"
            value={monoFamily.value}
            options={fontOptions.mono}
            onChange={(value) => updateFontFamily(monoFamily.id, value)}
          />
        )}
      </div>

      <SectionDivider />

      {/* Type Scale Section */}
      <SectionLabel>Type Scale</SectionLabel>

      <div className="px-6">
        <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {typography.sizes.map((size) => (
            <div
              key={size.name}
              className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 border border-[#E5E7EB] rounded-lg bg-white"
            >
              <span
                className="text-[#374151] font-medium"
                style={{ fontSize: Math.min(size.size, 20) }}
              >
                Aa
              </span>
              <span className="text-[10px] text-[#9CA3AF] mt-1">{size.name}</span>
              <span className="text-[10px] font-mono text-[#6B7280]">{size.size}px</span>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* Font Weights Section */}
      <SectionLabel>Font Weights</SectionLabel>

      <div className="grid grid-cols-3 gap-3 px-6">
        {typography.weights.map((weight) => (
          <div key={weight.name} className="flex flex-col gap-1.5">
            <span className="text-[11px] text-[#9CA3AF]">{weight.name}</span>
            <div
              className={cn(
                'h-9 flex items-center justify-center px-2.5 rounded-lg border border-[#E5E5E5] bg-white',
                'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
              )}
            >
              <span className="text-sm font-mono text-[#374151]">{weight.value}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionDivider />

      {/* Line Heights Section */}
      <SectionLabel>Line Heights</SectionLabel>

      <div className="grid grid-cols-3 gap-3 px-6 pb-6">
        {[
          { name: 'Tight', value: 1.25 },
          { name: 'Normal', value: 1.5 },
          { name: 'Relaxed', value: 1.75 },
        ].map((lh) => (
          <div key={lh.name} className="flex flex-col gap-1.5">
            <span className="text-[11px] text-[#9CA3AF]">{lh.name}</span>
            <div
              className={cn(
                'h-9 flex items-center justify-center px-2.5 rounded-lg border border-[#E5E5E5] bg-white',
                'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
              )}
            >
              <span className="text-sm font-mono text-[#374151]">{lh.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
