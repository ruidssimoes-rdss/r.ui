'use client';

import { useTokens } from '@/lib/studio/context';

export function TypographyTab() {
  const { state, updateFontFamily, updateFontSize, addFontSize, removeFontSize } =
    useTokens();
  const { typography } = state.tokens;

  return (
    <div className="space-y-6">
      {/* Font Families */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Font Families
        </h3>

        <div className="space-y-2">
          {typography.families.map((family) => (
            <div key={family.id} className="space-y-1">
              <label className="text-xs text-muted-foreground">
                {family.name}
              </label>
              <input
                type="text"
                value={family.value}
                onChange={(e) => updateFontFamily(family.id, e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-muted rounded border border-border"
                placeholder="Inter, system-ui, sans-serif"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Font Sizes */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Font Sizes
          </h3>
          <button
            onClick={addFontSize}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        </div>

        <div className="space-y-2">
          {typography.sizes.map((size, index) => (
            <div key={size.name} className="flex items-center gap-2">
              <input
                type="text"
                value={size.name}
                onChange={(e) =>
                  updateFontSize(index, { ...size, name: e.target.value })
                }
                className="w-16 px-2 py-1 text-xs bg-muted rounded border border-border"
              />
              <input
                type="number"
                value={size.size}
                onChange={(e) =>
                  updateFontSize(index, {
                    ...size,
                    size: Number(e.target.value),
                  })
                }
                className="w-14 px-2 py-1 text-xs bg-muted rounded border border-border text-center"
              />
              <span className="text-xs text-muted-foreground">px</span>
              <input
                type="number"
                value={size.lineHeight}
                onChange={(e) =>
                  updateFontSize(index, {
                    ...size,
                    lineHeight: Number(e.target.value),
                  })
                }
                className="w-14 px-2 py-1 text-xs bg-muted rounded border border-border text-center"
                step={0.1}
                min={1}
                max={3}
              />
              <span className="text-xs text-muted-foreground">lh</span>
              <div className="flex-1" />
              <span
                className="text-muted-foreground truncate max-w-[60px]"
                style={{ fontSize: size.size, lineHeight: size.lineHeight }}
              >
                Aa
              </span>
              <button
                onClick={() => removeFontSize(index)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Font Weights */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Font Weights
        </h3>

        <div className="flex flex-wrap gap-2">
          {typography.weights.map((weight) => (
            <div
              key={weight.name}
              className="px-3 py-1.5 bg-muted rounded border border-border"
            >
              <span className="text-xs" style={{ fontWeight: weight.value }}>
                {weight.name} ({weight.value})
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preview
        </h3>

        <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-2">
          {typography.sizes.slice(0, 5).map((size) => (
            <p
              key={size.name}
              style={{
                fontSize: size.size,
                lineHeight: size.lineHeight,
                fontFamily: typography.families[0]?.value,
              }}
              className="text-foreground truncate"
            >
              The quick brown fox jumps over the lazy dog
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
