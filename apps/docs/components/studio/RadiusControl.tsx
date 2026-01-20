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

      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Base</span>
        <input
          type="number"
          value={radius.base}
          onChange={(e) => setRadiusBase(Number(e.target.value))}
          className="w-14 px-2 py-1 text-xs bg-muted rounded border border-border text-center focus:outline-none focus:ring-2 focus:ring-ring"
          min={0}
          max={32}
        />
        <span className="text-xs text-muted-foreground">px</span>
        <input
          type="range"
          value={radius.base}
          onChange={(e) => setRadiusBase(Number(e.target.value))}
          className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-foreground"
          min={0}
          max={32}
        />
      </div>

      {/* Scale Preview - Compact */}
      <div className="flex items-end gap-2">
        {radius.scale.map((multiplier, i) => {
          const value = Math.round(radius.base * multiplier);
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className="w-6 h-6 bg-foreground"
                style={{ borderRadius: value }}
              />
              <span className="text-[10px] text-muted-foreground">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
