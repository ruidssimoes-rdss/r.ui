'use client';

import { useStudio } from '@/lib/studio/studio-context';

export function RadiusControl() {
  const { state, setRadiusBase } = useStudio();
  const { radius } = state.tokens;

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Radius
      </h3>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Base</span>
          <input
            type="number"
            value={radius.base}
            onChange={(e) => setRadiusBase(Number(e.target.value))}
            className="w-16 px-2 py-1 text-sm bg-muted rounded border border-border text-center focus:outline-none focus:ring-2 focus:ring-ring"
            min={0}
            max={32}
          />
          <span className="text-sm text-muted-foreground">px</span>
        </div>

        {/* Slider */}
        <input
          type="range"
          value={radius.base}
          onChange={(e) => setRadiusBase(Number(e.target.value))}
          className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-foreground"
          min={0}
          max={32}
        />
      </div>

      {/* Scale Preview */}
      <div className="flex items-center gap-3">
        {radius.scale.map((multiplier, i) => {
          const value = Math.round(radius.base * multiplier);
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 bg-foreground"
                style={{ borderRadius: value }}
              />
              <span className="text-xs text-muted-foreground">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
