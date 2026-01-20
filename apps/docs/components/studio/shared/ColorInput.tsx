'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';

// Utility functions for color conversion
function hexToRgba(hex: string): { r: number; g: number; b: number; a: number } {
  // Handle 8-digit hex (with alpha)
  const match8 = hex.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
  if (match8) {
    return {
      r: parseInt(match8[1], 16),
      g: parseInt(match8[2], 16),
      b: parseInt(match8[3], 16),
      a: parseInt(match8[4], 16) / 255,
    };
  }
  // Handle 6-digit hex
  const match6 = hex.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
  if (match6) {
    return {
      r: parseInt(match6[1], 16),
      g: parseInt(match6[2], 16),
      b: parseInt(match6[3], 16),
      a: 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  if (a < 1) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a * 255)}`;
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getHexWithoutAlpha(hex: string): string {
  const { r, g, b } = hexToRgba(hex);
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

interface ColorInputProps {
  label: string | React.ReactNode;
  value: { light: string; dark: string };
  onChange: (value: { light: string; dark: string }) => void;
}

export function ColorInput({ label, value, onChange }: ColorInputProps) {
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
  const rgba = useMemo(() => hexToRgba(currentColor), [currentColor]);
  const opacityPercent = Math.round(rgba.a * 100);
  const hexWithoutAlpha = useMemo(() => getHexWithoutAlpha(currentColor), [currentColor]);

  const handleColorChange = (hex: string) => {
    // Preserve opacity when color changes
    const newHex = rgba.a < 1 ? hex + Math.round(rgba.a * 255).toString(16).padStart(2, '0') : hex;
    onChange({ ...value, [mode]: newHex });
  };

  const handleOpacityChange = (opacity: number) => {
    const newHex = rgbaToHex(rgba.r, rgba.g, rgba.b, opacity / 100);
    onChange({ ...value, [mode]: newHex });
  };

  const displayHex = currentColor.length === 9 ? currentColor.slice(0, 7) : currentColor;

  return (
    <div ref={ref} className="relative flex flex-col gap-1.5">
      {/* Label */}
      <span className="text-[11px] text-[#9CA3AF]">{label}</span>

      {/* Input */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'h-9 flex items-center gap-2 px-2.5 py-2 rounded-lg border border-[#E5E5E5] bg-white transition-colors',
          'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
          'hover:border-[#D4D4D4]',
          open && 'border-[#D4D4D4] ring-1 ring-[#E5E5E5]'
        )}
      >
        {/* Color Circle with gradient split and transparency pattern */}
        <div className="relative w-4 h-4 rounded-full overflow-hidden border border-[#E5E7EB] flex-shrink-0">
          {/* Transparency checkerboard pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
              backgroundSize: '6px 6px',
              backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${value.light} 50%, ${value.dark} 50%)`,
            }}
          />
        </div>

        {/* Hex Value */}
        <span className="text-sm font-mono text-[#374151]">{displayHex}</span>
        {opacityPercent < 100 && (
          <span className="text-[10px] text-[#9CA3AF]">{opacityPercent}%</span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 w-[220px]">
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

          {/* Color Picker */}
          <div className="color-picker-wrapper">
            <HexColorPicker
              color={hexWithoutAlpha}
              onChange={handleColorChange}
              style={{ width: '100%' }}
            />
          </div>

          {/* Opacity Slider */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wide">Opacity</span>
              <span className="text-xs font-mono text-[#374151]">{opacityPercent}%</span>
            </div>
            <div className="relative h-3 rounded-full overflow-hidden">
              {/* Transparency checkerboard background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
                }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, transparent, ${hexWithoutAlpha})`,
                }}
              />
              {/* Slider input */}
              <input
                type="range"
                min="0"
                max="100"
                value={opacityPercent}
                onChange={(e) => handleOpacityChange(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {/* Slider thumb indicator */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border border-[#D4D4D4] shadow-sm pointer-events-none"
                style={{ left: `calc(${opacityPercent}% - 6px)` }}
              />
            </div>
          </div>

          {/* Hex Input */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-[#9CA3AF]">Hex</span>
            <input
              type="text"
              value={currentColor}
              onChange={(e) => {
                const hex = e.target.value;
                // Accept 6 or 8 digit hex codes
                if (/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(hex)) {
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
