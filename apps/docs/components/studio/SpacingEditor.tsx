'use client';

import { useStudio } from '@/lib/studio/theme-context';

export function SpacingEditor() {
  const { state, setBaseUnit } = useStudio();
  const { spacing } = state.theme;

  return (
    <div className="space-y-3">
      {/* Base unit selector */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500">Base Unit</div>
        <div className="flex gap-2">
          {[2, 4, 8].map((unit) => (
            <button
              key={unit}
              onClick={() => setBaseUnit(unit)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                spacing.baseUnit === unit
                  ? 'border-gray-900 bg-gray-50 text-gray-900'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {unit}px
            </button>
          ))}
        </div>
      </div>

      {/* Scale visualization */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500">Scale Preview</div>
        <div className="p-3 rounded-lg border border-gray-200 bg-white space-y-2">
          {spacing.scale.slice(1, 7).map((value, i) => (
            <div key={i} className="flex items-center gap-3">
              <code className="text-[10px] text-gray-400 w-5 text-right font-mono">
                {value}
              </code>
              <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gray-900"
                  style={{ width: `${Math.min(value * 2, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
