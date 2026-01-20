'use client';

import { cn } from '@/lib/utils';

interface TokenCardProps {
  label: string;
  value: string | number;
  unit?: string;
  onChange?: (value: string) => void;
  preview?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  monospace?: boolean;
  readOnly?: boolean;
}

export function TokenCard({
  label,
  value,
  unit,
  onChange,
  preview,
  className,
  inputClassName,
  monospace = true,
  readOnly = false,
}: TokenCardProps) {
  const displayValue = unit ? `${value}${unit}` : String(value);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {/* Label */}
      <span className="text-[11px] text-[#9CA3AF]">{label}</span>

      {/* Card */}
      <div
        className={cn(
          'h-9 flex items-center gap-2 px-2.5 py-2 rounded-lg border border-[#E5E5E5] bg-white',
          'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
          !readOnly && 'hover:border-[#D4D4D4]'
        )}
      >
        {/* Preview */}
        {preview && <div className="flex-shrink-0">{preview}</div>}

        {/* Value */}
        {onChange && !readOnly ? (
          <input
            type="text"
            value={displayValue}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'flex-1 bg-transparent border-0 outline-none text-sm text-[#374151]',
              monospace && 'font-mono',
              inputClassName
            )}
          />
        ) : (
          <span
            className={cn(
              'text-sm text-[#374151]',
              monospace && 'font-mono',
              inputClassName
            )}
          >
            {displayValue}
          </span>
        )}
      </div>
    </div>
  );
}

interface TokenCardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function TokenCardGrid({ children, columns = 3, className }: TokenCardGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={cn('grid gap-3 px-6', gridCols[columns], className)}>
      {children}
    </div>
  );
}
