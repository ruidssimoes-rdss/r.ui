'use client';

import { PresetPicker } from './PresetPicker';
import { ColorEditor } from './ColorEditor';
import { RadiusEditor } from './RadiusEditor';
import { SpacingEditor } from './SpacingEditor';

export function StudioControls() {
  return (
    <div className="h-full rounded-lg border border-gray-200 bg-gray-50/50 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Presets */}
        <section>
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
            Presets
          </h3>
          <PresetPicker />
        </section>

        <div className="h-px bg-gray-200" />

        {/* Colors */}
        <section>
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
            Colors
          </h3>
          <ColorEditor />
        </section>

        <div className="h-px bg-gray-200" />

        {/* Radius */}
        <section>
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
            Border Radius
          </h3>
          <RadiusEditor />
        </section>

        <div className="h-px bg-gray-200" />

        {/* Spacing */}
        <section>
          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
            Spacing
          </h3>
          <SpacingEditor />
        </section>
      </div>
    </div>
  );
}
