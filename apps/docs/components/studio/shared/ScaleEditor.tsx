'use client';

import { cn } from '@/lib/utils';

interface ScaleEditorProps {
  values: number[];
  onChange: (values: number[]) => void;
  min?: number;
  max?: number;
  unit?: string;
  showPreview?: boolean;
}

export function ScaleEditor({
  values,
  onChange,
  min = 0,
  max = 200,
  unit = 'px',
  showPreview = true,
}: ScaleEditorProps) {
  const handleValueChange = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      {values.map((value, index) => (
        <div key={index} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-6">{index}</span>
          <input
            type="number"
            value={value}
            onChange={(e) => handleValueChange(index, Number(e.target.value))}
            className="w-16 px-2 py-1 text-xs bg-muted border border-border rounded text-center"
            min={min}
            max={max}
          />
          <span className="text-xs text-muted-foreground w-6">{unit}</span>
          {showPreview && (
            <div
              className="h-4 bg-foreground rounded-sm transition-all flex-shrink-0"
              style={{ width: Math.min(value, max) }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

interface BaseWithScaleProps {
  label: string;
  baseValue: number;
  onBaseChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

export function BaseWithScale({
  label,
  baseValue,
  onBaseChange,
  min = 1,
  max = 32,
  unit = 'px',
}: BaseWithScaleProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </h3>

      <div className="flex items-center gap-3">
        <input
          type="number"
          value={baseValue}
          onChange={(e) => onBaseChange(Number(e.target.value))}
          className="w-20 px-3 py-1.5 text-sm bg-muted rounded border border-border text-center"
          min={min}
          max={max}
        />
        <span className="text-sm text-muted-foreground">{unit}</span>
        <input
          type="range"
          value={baseValue}
          onChange={(e) => onBaseChange(Number(e.target.value))}
          className={cn(
            'flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:w-4',
            '[&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-foreground',
            '[&::-webkit-slider-thumb]:cursor-pointer'
          )}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
}
