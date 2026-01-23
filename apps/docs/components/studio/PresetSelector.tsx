'use client';

import { useState } from 'react';
import { presets, Preset } from '@/lib/studio/presets';

interface PresetSelectorProps {
  onSelect: (preset: Preset) => void;
  currentPresetId?: string;
}

// Preset color previews - shows key colors from each preset
function PresetPreview({ preset }: { preset: Preset }) {
  const primary = preset.tokens.colors.brand.find((c) => c.id === 'primary');
  const accent = preset.tokens.colors.brand.find((c) => c.id === 'accent');
  const bg = preset.tokens.colors.surface.background;
  const fg = preset.tokens.colors.surface.foreground;

  return (
    <div className="flex gap-0.5 mt-2">
      <div
        className="w-4 h-4 rounded-sm"
        style={{ backgroundColor: bg.dark }}
        title="Background"
      />
      <div
        className="w-4 h-4 rounded-sm"
        style={{ backgroundColor: fg.dark }}
        title="Foreground"
      />
      <div
        className="w-4 h-4 rounded-sm"
        style={{ backgroundColor: primary?.value.dark || '#3b82f6' }}
        title="Primary"
      />
      {accent && (
        <div
          className="w-4 h-4 rounded-sm"
          style={{ backgroundColor: accent.value.dark }}
          title="Accent"
        />
      )}
    </div>
  );
}

export function PresetSelector({ onSelect, currentPresetId }: PresetSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        Start from a preset
      </button>

      {isExpanded && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {presets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                onSelect(preset);
                setIsExpanded(false);
              }}
              className={`
                p-3 rounded-lg border text-left transition-all
                ${
                  currentPresetId === preset.id
                    ? 'border-[#18181B] bg-[#F4F4F5]'
                    : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB]'
                }
              `}
            >
              <div className="font-medium text-sm text-[#111827]">{preset.name}</div>
              <div className="text-xs text-[#6B7280] mt-1 line-clamp-2">
                {preset.description}
              </div>
              <PresetPreview preset={preset} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Compact version for toolbar
export function PresetDropdown({ onSelect, currentPresetId }: PresetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPreset = currentPresetId
    ? presets.find((p) => p.id === currentPresetId)
    : null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <span>{currentPreset ? currentPreset.name : 'Presets'}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-2 max-h-96 overflow-auto">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelect(preset);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full p-3 rounded-lg text-left transition-colors flex items-start gap-3
                    ${
                      currentPresetId === preset.id
                        ? 'bg-[#F4F4F5]'
                        : 'hover:bg-[#F9FAFB]'
                    }
                  `}
                >
                  <div className="flex-1">
                    <div className="font-medium text-sm text-[#111827]">
                      {preset.name}
                    </div>
                    <div className="text-xs text-[#6B7280] mt-0.5">
                      {preset.description}
                    </div>
                  </div>
                  <PresetPreview preset={preset} />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
