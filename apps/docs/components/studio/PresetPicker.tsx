'use client';

import { useStudio } from '@/lib/studio/theme-context';
import { presets, PresetName } from '@/lib/studio/presets';

const presetMeta: Record<PresetName, { description: string; colors: string[] }> = {
  minimal: {
    description: 'Clean and understated',
    colors: ['#18181b', '#71717a', '#3b82f6'],
  },
  glassmorphic: {
    description: 'Blur and transparency',
    colors: ['#8b5cf6', '#6366f1', '#06b6d4'],
  },
  bold: {
    description: 'High contrast, strong colors',
    colors: ['#000000', '#ffffff', '#ff0080'],
  },
  soft: {
    description: 'Muted and rounded',
    colors: ['#64748b', '#94a3b8', '#f472b6'],
  },
  dark_pro: {
    description: 'Vibrant on dark',
    colors: ['#22d3ee', '#a78bfa', '#fbbf24'],
  },
};

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function PresetPicker() {
  const { state, applyPreset } = useStudio();

  return (
    <div className="grid grid-cols-1 gap-2">
      {(Object.keys(presets) as PresetName[]).map((name) => {
        const meta = presetMeta[name];
        const isActive = state.activePreset === name;

        return (
          <button
            key={name}
            onClick={() => applyPreset(name)}
            className={`group relative flex items-center gap-3 p-2.5 rounded-lg text-left transition-all duration-200 border ${
              isActive
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {/* Color swatches */}
            <div className="flex -space-x-1.5">
              {meta.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full ring-2 ring-white shadow-sm"
                  style={{ backgroundColor: color, zIndex: 3 - i }}
                />
              ))}
            </div>

            {/* Label */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium capitalize text-gray-900">
                {name.replace('_', ' ')}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {meta.description}
              </div>
            </div>

            {/* Active indicator */}
            {isActive && (
              <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-white">
                <CheckIcon size={10} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
