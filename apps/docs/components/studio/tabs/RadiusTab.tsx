'use client';

import { useTokens } from '@/lib/studio/context';
import { cn } from '@/lib/utils';

export function RadiusTab() {
  const { state, updateRadiusBase, updateRadiusValue } = useTokens();
  const { radius } = state.tokens;

  return (
    <div className="space-y-6">
      {/* Base Radius */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Base Radius
        </h3>

        <div className="flex items-center gap-3">
          <input
            type="number"
            value={radius.base}
            onChange={(e) => updateRadiusBase(Number(e.target.value))}
            className="w-20 px-3 py-1.5 text-sm bg-muted rounded border border-border text-center"
            min={0}
            max={32}
          />
          <span className="text-sm text-muted-foreground">px</span>
          <input
            type="range"
            value={radius.base}
            onChange={(e) => updateRadiusBase(Number(e.target.value))}
            className={cn(
              'flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-4',
              '[&::-webkit-slider-thumb]:h-4',
              '[&::-webkit-slider-thumb]:rounded-full',
              '[&::-webkit-slider-thumb]:bg-foreground',
              '[&::-webkit-slider-thumb]:cursor-pointer'
            )}
            min={0}
            max={32}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Changing the base radius regenerates the entire scale proportionally.
        </p>
      </section>

      {/* Scale */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Scale
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {radius.scale.map((item, index) => (
            <div key={item.name} className="flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 bg-foreground transition-all"
                style={{
                  borderRadius:
                    item.value === 9999 ? '50%' : `${item.value}px`,
                }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
              {item.name !== 'full' ? (
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) =>
                    updateRadiusValue(index, Number(e.target.value))
                  }
                  className="w-12 px-1 py-0.5 text-[10px] bg-muted border border-border rounded text-center"
                  min={0}
                  max={100}
                />
              ) : (
                <span className="text-[10px] text-muted-foreground">9999px</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Preview Examples */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preview
        </h3>

        <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-4">
          {/* Buttons */}
          <div className="flex gap-2">
            {radius.scale.slice(1, 5).map((r) => (
              <div
                key={r.name}
                className="px-4 py-2 bg-foreground text-background text-xs"
                style={{ borderRadius: r.value }}
              >
                Button
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="flex gap-3">
            {radius.scale.slice(2, 6).map((r) => (
              <div
                key={r.name}
                className="flex-1 h-20 bg-background border border-border"
                style={{ borderRadius: r.value }}
              />
            ))}
          </div>

          {/* Inputs */}
          <div className="flex gap-2">
            {radius.scale.slice(1, 4).map((r) => (
              <input
                key={r.name}
                type="text"
                placeholder={r.name}
                className="flex-1 px-3 py-2 text-xs bg-background border border-border"
                style={{ borderRadius: r.value }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
