'use client';

import { useTokens } from '@/lib/studio/context';
import { cn } from '@/lib/utils';

export function SpacingTab() {
  const { state, updateSpacingBase } = useTokens();
  const { spacing } = state.tokens;

  return (
    <div className="space-y-6">
      {/* Base Unit */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Base Unit
        </h3>

        <div className="flex items-center gap-3">
          <input
            type="number"
            value={spacing.baseUnit}
            onChange={(e) => updateSpacingBase(Number(e.target.value))}
            className="w-20 px-3 py-1.5 text-sm bg-muted rounded border border-border text-center"
            min={1}
            max={16}
          />
          <span className="text-sm text-muted-foreground">px</span>
          <input
            type="range"
            value={spacing.baseUnit}
            onChange={(e) => updateSpacingBase(Number(e.target.value))}
            className={cn(
              'flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-4',
              '[&::-webkit-slider-thumb]:h-4',
              '[&::-webkit-slider-thumb]:rounded-full',
              '[&::-webkit-slider-thumb]:bg-foreground',
              '[&::-webkit-slider-thumb]:cursor-pointer'
            )}
            min={1}
            max={16}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          The base unit multiplied by scale factors generates your spacing
          system.
        </p>
      </section>

      {/* Scale Preview */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Scale
        </h3>

        <div className="space-y-2">
          {spacing.scale.map((value, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-6 text-right">
                {index}
              </span>
              <div
                className="h-4 bg-foreground rounded-sm transition-all"
                style={{ width: Math.min(value, 200) }}
              />
              <span className="text-xs text-muted-foreground">{value}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Reference */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Usage Reference
        </h3>

        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tight:</span>
              <span className="font-mono">spacing-1 ({spacing.scale[1]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Small:</span>
              <span className="font-mono">spacing-2 ({spacing.scale[2]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Medium:</span>
              <span className="font-mono">spacing-4 ({spacing.scale[4]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Large:</span>
              <span className="font-mono">spacing-6 ({spacing.scale[6]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Section:</span>
              <span className="font-mono">spacing-8 ({spacing.scale[8]}px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Page:</span>
              <span className="font-mono">spacing-12 ({spacing.scale[12]}px)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
