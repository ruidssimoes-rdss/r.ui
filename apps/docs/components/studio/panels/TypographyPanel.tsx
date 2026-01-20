'use client';

import { useTokens } from '@/lib/studio/context';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { TokenSelectRow } from '../shared/TokenSelectRow';

// Icons
function XIcon({ size = 12 }: { size?: number }) {
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
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
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

export function TypographyPanel() {
  const { state, updateFontFamily, updateFontSize, removeFontSize } = useTokens();
  const { typography } = state.tokens;

  const sansFamily = typography.families.find((f) => f.name === 'sans');
  const monoFamily = typography.families.find((f) => f.name === 'mono');

  return (
    <div className="h-full overflow-y-auto">
      <SectionLabel>Font Family</SectionLabel>

      <div className="space-y-1 px-1">
        {sansFamily && (
          <TokenSelectRow
            label="Sans"
            value={sansFamily.value}
            options={fontOptions.sans}
            onChange={(value) => updateFontFamily(sansFamily.id, value)}
          />
        )}
        {monoFamily && (
          <TokenSelectRow
            label="Mono"
            value={monoFamily.value}
            options={fontOptions.mono}
            onChange={(value) => updateFontFamily(monoFamily.id, value)}
          />
        )}
      </div>

      <SectionDivider />

      <SectionLabel>Type Scale</SectionLabel>

      <div className="px-3 py-2 space-y-2">
        {typography.sizes.map((size, index) => (
          <div
            key={size.name}
            className="flex items-center justify-between py-1.5 group"
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[#374151] min-w-[60px]"
                style={{ fontSize: Math.min(size.size, 24), lineHeight: size.lineHeight }}
              >
                Aa
              </span>
              <span className="text-xs text-[#9CA3AF] w-8">{size.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#6B7280]">{size.size}px</span>
              <span className="text-[10px] text-[#9CA3AF]">/ {size.lineHeight}</span>
              {typography.sizes.length > 1 && (
                <button
                  onClick={() => removeFontSize(index)}
                  className="p-1 opacity-0 group-hover:opacity-100 text-[#9CA3AF] hover:text-[#374151] transition-opacity"
                >
                  <XIcon size={10} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <SectionDivider />

      <SectionLabel>Font Weights</SectionLabel>

      <div className="px-3 py-2 flex flex-wrap gap-2">
        {typography.weights.map((weight) => (
          <div
            key={weight.name}
            className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md"
          >
            <span
              className="text-xs text-[#374151]"
              style={{ fontWeight: weight.value }}
            >
              {weight.name}
            </span>
            <span className="text-[10px] text-[#9CA3AF] ml-1">{weight.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
