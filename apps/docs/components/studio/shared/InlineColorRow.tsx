'use client';

import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';

// Icons
function ChevronDownIcon({ size = 12, className }: { size?: number; className?: string }) {
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

interface InlineColorRowProps {
  label: string;
  value: { light: string; dark: string };
  onChange: (value: { light: string; dark: string }) => void;
}

export function InlineColorRow({ label, value, onChange }: InlineColorRowProps) {
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between py-2 px-3 rounded-lg transition-colors',
          open ? 'bg-[#F3F4F6]' : 'hover:bg-[#F9FAFB]'
        )}
      >
        <span className="text-sm text-[#6B7280]">{label}</span>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full border border-[#E5E7EB]"
            style={{
              background: `linear-gradient(135deg, ${value.light} 50%, ${value.dark} 50%)`,
            }}
          />
          <span className="text-xs font-mono text-[#9CA3AF]">{value[mode]}</span>
          <ChevronDownIcon size={12} className="text-[#9CA3AF]" />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full right-0 mt-1 p-3 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 w-[220px]">
          {/* Light/Dark Toggle */}
          <div className="flex gap-1 p-1 bg-[#F3F4F6] rounded-md mb-3">
            <button
              onClick={() => setMode('light')}
              className={cn(
                'flex-1 py-1 text-[10px] font-medium rounded transition-colors',
                mode === 'light'
                  ? 'bg-white text-[#18181B] shadow-sm'
                  : 'text-[#9CA3AF]'
              )}
            >
              Light
            </button>
            <button
              onClick={() => setMode('dark')}
              className={cn(
                'flex-1 py-1 text-[10px] font-medium rounded transition-colors',
                mode === 'dark'
                  ? 'bg-white text-[#18181B] shadow-sm'
                  : 'text-[#9CA3AF]'
              )}
            >
              Dark
            </button>
          </div>

          <div className="color-picker-wrapper">
            <HexColorPicker
              color={value[mode]}
              onChange={(color) => onChange({ ...value, [mode]: color })}
              style={{ width: '100%' }}
            />
          </div>

          {/* Hex Input */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-[#9CA3AF]">Hex</span>
            <input
              type="text"
              value={value[mode]}
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
