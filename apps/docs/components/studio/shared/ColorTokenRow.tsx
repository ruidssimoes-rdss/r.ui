'use client';

import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';

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

interface ColorTokenRowProps {
  label: string;
  value: { light: string; dark: string };
  onChange: (value: { light: string; dark: string }) => void;
  onRemove?: () => void;
  presets?: string[];
}

export function ColorTokenRow({
  label,
  value,
  onChange,
  onRemove,
  presets = [],
}: ColorTokenRowProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentColor = value[mode];

  return (
    <div ref={ref} className="relative">
      {/* Row */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors text-left group',
          open ? 'bg-[#F3F4F6]' : 'hover:bg-[#F9FAFB]'
        )}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-[#9CA3AF]">{label}</span>
          <div className="flex items-center gap-2">
            {/* Color dot showing both modes */}
            <div className="relative w-4 h-4 rounded-full overflow-hidden border border-[#E5E7EB]">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${value.light} 50%, ${value.dark} 50%)`,
                }}
              />
            </div>
            <span className="text-sm font-mono text-[#374151]">{currentColor}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1 opacity-0 group-hover:opacity-100 text-[#9CA3AF] hover:text-[#374151] transition-opacity"
            >
              <XIcon size={12} />
            </button>
          )}
          <ChevronDownIcon
            size={14}
            className={cn(
              'text-[#9CA3AF] transition-transform',
              open && 'rotate-180'
            )}
          />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50">
          {/* Light/Dark Toggle */}
          <div className="flex gap-1 p-1 bg-[#F3F4F6] rounded-md mb-3">
            <button
              onClick={() => setMode('light')}
              className={cn(
                'flex-1 py-1.5 text-xs font-medium rounded transition-colors',
                mode === 'light'
                  ? 'bg-white text-[#18181B] shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#374151]'
              )}
            >
              Light
            </button>
            <button
              onClick={() => setMode('dark')}
              className={cn(
                'flex-1 py-1.5 text-xs font-medium rounded transition-colors',
                mode === 'dark'
                  ? 'bg-white text-[#18181B] shadow-sm'
                  : 'text-[#9CA3AF] hover:text-[#374151]'
              )}
            >
              Dark
            </button>
          </div>

          {/* Presets */}
          {presets.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => onChange({ ...value, [mode]: preset })}
                  className={cn(
                    'w-6 h-6 rounded-md border-2 transition-all',
                    currentColor === preset
                      ? 'border-[#18181B] scale-110'
                      : 'border-transparent hover:scale-105'
                  )}
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
          )}

          {/* Color Picker */}
          <div className="color-picker-wrapper">
            <HexColorPicker
              color={currentColor}
              onChange={(color) => onChange({ ...value, [mode]: color })}
              style={{ width: '100%' }}
            />
          </div>

          {/* Hex Input */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-[#9CA3AF]">Hex</span>
            <input
              type="text"
              value={currentColor}
              onChange={(e) => {
                const hex = e.target.value;
                if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
                  onChange({ ...value, [mode]: hex });
                }
              }}
              className="flex-1 px-2 py-1 text-xs font-mono bg-[#F3F4F6] rounded border-0 focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
