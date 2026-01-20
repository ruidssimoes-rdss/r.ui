'use client';

import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ColorToken, ColorValue } from '@/lib/studio/types';
import { getContrastText } from '@/lib/studio/utils/color';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: ColorToken;
  onChange: (value: Partial<ColorValue>) => void;
  onRemove?: () => void;
  showBothModes?: boolean;
  compact?: boolean;
}

export function ColorPicker({
  color,
  onChange,
  onRemove,
  showBothModes = false,
  compact = false,
}: ColorPickerProps) {
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light');
  const [showPicker, setShowPicker] = useState(false);

  const currentColor = color.value[activeMode];

  return (
    <div className={cn('relative', compact ? 'space-y-1' : 'space-y-2')}>
      {/* Color Name */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'font-medium truncate',
            compact ? 'text-[10px]' : 'text-xs'
          )}
        >
          {color.name}
        </span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            ×
          </button>
        )}
      </div>

      {/* Color Swatches */}
      {showBothModes ? (
        <div className="flex gap-1">
          {/* Light Mode */}
          <button
            onClick={() => {
              setActiveMode('light');
              setShowPicker(true);
            }}
            className={cn(
              'flex-1 rounded border transition-all',
              compact ? 'h-8' : 'h-10',
              activeMode === 'light' && showPicker
                ? 'ring-2 ring-foreground ring-offset-1'
                : 'border-border'
            )}
            style={{ backgroundColor: color.value.light }}
            title={`Light: ${color.value.light}`}
          >
            <span
              className="text-[9px] font-mono"
              style={{ color: getContrastText(color.value.light) }}
            >
              L
            </span>
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => {
              setActiveMode('dark');
              setShowPicker(true);
            }}
            className={cn(
              'flex-1 rounded border transition-all',
              compact ? 'h-8' : 'h-10',
              activeMode === 'dark' && showPicker
                ? 'ring-2 ring-foreground ring-offset-1'
                : 'border-border'
            )}
            style={{ backgroundColor: color.value.dark }}
            title={`Dark: ${color.value.dark}`}
          >
            <span
              className="text-[9px] font-mono"
              style={{ color: getContrastText(color.value.dark) }}
            >
              D
            </span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowPicker(!showPicker)}
          className={cn(
            'w-full rounded border border-border transition-all',
            compact ? 'h-8' : 'h-10',
            showPicker && 'ring-2 ring-foreground ring-offset-1'
          )}
          style={{ backgroundColor: currentColor }}
        />
      )}

      {/* Color Picker Popover */}
      {showPicker && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowPicker(false)}
          />

          {/* Picker */}
          <div className="absolute left-0 top-full z-50 mt-2 p-3 bg-background border border-border rounded-lg shadow-lg">
            {showBothModes && (
              <div className="flex gap-1 mb-2">
                <button
                  onClick={() => setActiveMode('light')}
                  className={cn(
                    'flex-1 px-2 py-1 text-xs rounded',
                    activeMode === 'light'
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  Light
                </button>
                <button
                  onClick={() => setActiveMode('dark')}
                  className={cn(
                    'flex-1 px-2 py-1 text-xs rounded',
                    activeMode === 'dark'
                      ? 'bg-foreground text-background'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  Dark
                </button>
              </div>
            )}

            <HexColorPicker
              color={currentColor}
              onChange={(newColor) => onChange({ [activeMode]: newColor })}
            />

            <input
              type="text"
              value={currentColor}
              onChange={(e) => {
                const val = e.target.value;
                if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                  onChange({ [activeMode]: val });
                }
              }}
              className="w-full mt-2 px-2 py-1 text-xs font-mono bg-muted border border-border rounded"
            />
          </div>
        </>
      )}
    </div>
  );
}
