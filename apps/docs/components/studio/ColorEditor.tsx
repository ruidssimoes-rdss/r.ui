'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/theme-context';
import { checkContrast, getContrastText } from '@/lib/studio/color-utils';
import { HexColorPicker, HexColorInput } from 'react-colorful';

interface ColorRowProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

function ChevronDownIcon({ size = 14 }: { size?: number }) {
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

function ColorRow({ label, color, onChange }: ColorRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = getContrastText(color);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-2.5 rounded-lg flex items-center justify-between transition-all duration-200 border ${
          isOpen
            ? 'border-gray-900 bg-gray-50'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-md shadow-sm border border-gray-200"
            style={{ backgroundColor: color }}
          />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">{label}</div>
            <code className="text-xs text-gray-500">{color}</code>
          </div>
        </div>
        <ChevronDownIcon size={14} />
      </button>

      {isOpen && (
        <div className="p-3 rounded-lg border border-gray-200 bg-white space-y-3">
          {/* Color picker */}
          <div className="[&_.react-colorful]:w-full [&_.react-colorful]:h-[140px] [&_.react-colorful__saturation]:rounded-md [&_.react-colorful__hue]:rounded-full [&_.react-colorful__hue]:h-2.5 [&_.react-colorful__pointer]:w-4 [&_.react-colorful__pointer]:h-4">
            <HexColorPicker color={color} onChange={onChange} />
          </div>

          {/* Hex input */}
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-md border border-gray-200 bg-gray-50">
            <span className="text-xs text-gray-400">#</span>
            <HexColorInput
              color={color}
              onChange={onChange}
              className="flex-1 bg-transparent text-sm text-gray-900 outline-none font-mono"
              prefixed={false}
            />
          </div>

          {/* Quick color preview */}
          <div
            className="h-8 rounded-md flex items-center justify-center text-xs font-medium"
            style={{ backgroundColor: color, color: textColor }}
          >
            Preview Text
          </div>
        </div>
      )}
    </div>
  );
}

export function ColorEditor() {
  const { state, setPrimaryColor, setSecondaryColor, setAccentColor } = useStudio();
  const { colors } = state.theme;

  // Calculate contrast levels
  const primaryContrast = checkContrast(getContrastText(colors.primary), colors.primary);
  const accentContrast = checkContrast(getContrastText(colors.accent), colors.accent);

  return (
    <div className="space-y-2">
      <ColorRow label="Primary" color={colors.primary} onChange={setPrimaryColor} />
      <ColorRow label="Secondary" color={colors.secondary} onChange={setSecondaryColor} />
      <ColorRow label="Accent" color={colors.accent} onChange={setAccentColor} />

      {/* Contrast indicator - subtle badges */}
      <div className="pt-2">
        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-2">
          Contrast
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-gray-100 text-xs">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors.primary }}
            />
            <span className="text-gray-600">{primaryContrast.level}</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-gray-100 text-xs">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: colors.accent }}
            />
            <span className="text-gray-600">{accentContrast.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
