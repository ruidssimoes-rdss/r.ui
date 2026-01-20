'use client';

import { cn } from '@/lib/utils';

interface TokenInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  suffix?: string;
  className?: string;
}

export function TokenInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  suffix,
  className,
}: TokenInputProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <label className="text-xs text-muted-foreground">{label}</label>
      <div className="flex items-center gap-1">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-2 py-1.5 text-xs bg-muted rounded border border-border"
        />
        {suffix && (
          <span className="text-xs text-muted-foreground">{suffix}</span>
        )}
      </div>
    </div>
  );
}
