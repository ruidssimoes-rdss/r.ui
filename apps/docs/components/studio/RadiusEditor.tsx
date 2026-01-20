'use client';

import { useStudio } from '@/lib/studio/theme-context';

const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;

function CheckIcon({ size = 10 }: { size?: number }) {
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

export function RadiusEditor() {
  const { state, setDefaultRadius } = useStudio();
  const { radius } = state.theme;

  return (
    <div className="space-y-3">
      {/* Visual radius picker */}
      <div className="grid grid-cols-3 gap-2">
        {radiusOptions.map((key) => {
          const value = radius[key];
          const isSelected = radius.default === key;

          return (
            <button
              key={key}
              onClick={() => setDefaultRadius(key)}
              className={`relative p-2.5 rounded-lg flex flex-col items-center gap-2 transition-all duration-200 border ${
                isSelected
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {/* Visual preview */}
              <div
                className="w-9 h-9 bg-gray-900"
                style={{ borderRadius: key === 'full' ? '50%' : value }}
              />

              <div className="text-center">
                <div className="text-xs font-medium text-gray-900">{key}</div>
                <div className="text-[10px] text-gray-500">
                  {key === 'full' ? '50%' : `${value}px`}
                </div>
              </div>

              {/* Selected check */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-gray-900 flex items-center justify-center text-white">
                  <CheckIcon size={8} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Current selection display */}
      <div className="flex items-center justify-between px-2.5 py-2 rounded-md bg-gray-100 text-xs">
        <span className="text-gray-500">Default</span>
        <code className="font-mono text-gray-700">
          {radius.default} ({radius[radius.default]}px)
        </code>
      </div>
    </div>
  );
}
