'use client';

import { useTokens } from '@/lib/studio/context';

export function ShadowsTab() {
  const { state, updateShadow } = useTokens();
  const { shadows } = state.tokens;

  return (
    <div className="space-y-6">
      {/* Shadow Scale */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Shadow Scale
        </h3>

        <div className="space-y-4">
          {shadows.scale.map((shadow, index) => (
            <div key={shadow.name} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium w-12">{shadow.name}</span>
                <div
                  className="w-16 h-16 bg-white rounded-lg flex-shrink-0"
                  style={{ boxShadow: shadow.value }}
                />
                <input
                  type="text"
                  value={shadow.value}
                  onChange={(e) => updateShadow(index, e.target.value)}
                  className="flex-1 px-2 py-1 text-xs font-mono bg-muted border border-border rounded"
                  placeholder="none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preview on Cards
        </h3>

        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg">
          {shadows.scale.slice(1).map((shadow) => (
            <div
              key={shadow.name}
              className="bg-white rounded-lg p-4 flex flex-col items-center justify-center h-24"
              style={{ boxShadow: shadow.value }}
            >
              <span className="text-xs font-medium text-gray-900">
                {shadow.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guide */}
      <section className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Usage Guide
        </h3>

        <div className="p-3 bg-muted/50 rounded-lg border border-border text-xs text-muted-foreground space-y-2">
          <p>
            <span className="font-medium text-foreground">sm:</span> Subtle
            depth for buttons, inputs
          </p>
          <p>
            <span className="font-medium text-foreground">md:</span> Cards,
            dropdowns, popovers
          </p>
          <p>
            <span className="font-medium text-foreground">lg:</span> Modals,
            dialogs
          </p>
          <p>
            <span className="font-medium text-foreground">xl:</span> Hero
            sections, large floating elements
          </p>
          <p>
            <span className="font-medium text-foreground">2xl:</span> Maximum
            elevation, dramatic effect
          </p>
        </div>
      </section>
    </div>
  );
}
