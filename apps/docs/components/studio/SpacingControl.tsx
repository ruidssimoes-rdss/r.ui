'use client';

import { useStudio } from '@/lib/studio/studio-context';

export function SpacingControl() {
  const { state, setSpacingBase } = useStudio();
  const { spacing } = state.tokens;

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Spacing
      </h3>

      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Base</span>
        <input
          type="number"
          value={spacing.base}
          onChange={(e) => setSpacingBase(Number(e.target.value))}
          className="w-14 px-2 py-1 text-xs bg-muted rounded border border-border text-center focus:outline-none focus:ring-2 focus:ring-ring"
          min={2}
          max={8}
        />
        <span className="text-xs text-muted-foreground">px</span>
        <input
          type="range"
          value={spacing.base}
          onChange={(e) => setSpacingBase(Number(e.target.value))}
          className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-foreground"
          min={2}
          max={8}
        />
      </div>

      {/* Scale Preview - Compact */}
      <div className="flex items-end gap-1">
        {spacing.scale.slice(0, 8).map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-2 bg-foreground rounded-sm"
              style={{ height: Math.min(value, 32) }}
            />
            <span className="text-[9px] text-muted-foreground">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
