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

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Base</span>
          <input
            type="number"
            value={spacing.base}
            onChange={(e) => setSpacingBase(Number(e.target.value))}
            className="w-16 px-2 py-1 text-sm bg-muted rounded border border-border text-center focus:outline-none focus:ring-2 focus:ring-ring"
            min={2}
            max={8}
          />
          <span className="text-sm text-muted-foreground">px</span>
        </div>

        {/* Slider */}
        <input
          type="range"
          value={spacing.base}
          onChange={(e) => setSpacingBase(Number(e.target.value))}
          className="flex-1 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-foreground"
          min={2}
          max={8}
        />
      </div>

      {/* Scale Preview */}
      <div className="flex items-end gap-1">
        {spacing.scale.slice(0, 8).map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-3 bg-foreground rounded-full"
              style={{ height: value }}
            />
            <span className="text-[10px] text-muted-foreground">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
