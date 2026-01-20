'use client';

import { useState, useRef, useEffect } from 'react';
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

function CheckIcon({ size = 14, className }: { size?: number; className?: string }) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

interface Option {
  value: string;
  label: string;
}

interface TokenSelectRowProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export function TokenSelectRow({ label, value, options, onChange }: TokenSelectRowProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

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
          'w-full flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors text-left',
          open ? 'bg-[#F3F4F6]' : 'hover:bg-[#F9FAFB]'
        )}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-[#9CA3AF]">{label}</span>
          <span className="text-sm font-medium text-[#374151]">{selectedOption?.label}</span>
        </div>
        <ChevronDownIcon
          size={14}
          className={cn(
            'text-[#9CA3AF] transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 py-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 max-h-[200px] overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 transition-colors text-left',
                value === option.value ? 'bg-[#F3F4F6]' : 'hover:bg-[#F9FAFB]'
              )}
            >
              <span className="text-sm text-[#374151]">{option.label}</span>
              {value === option.value && (
                <CheckIcon size={14} className="text-[#18181B]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
