'use client';

import { useTokens } from '@/lib/studio/context';
import { ColorTokenRow } from '../shared/ColorTokenRow';
import { InlineColorRow } from '../shared/InlineColorRow';
import { NeutralScaleSelector } from '../shared/NeutralScaleSelector';
import { SectionLabel } from '../shared/SectionLabel';
import { SectionDivider } from '../shared/SectionDivider';
import { AddButton } from '../shared/AddButton';

const colorPresets = [
  '#18181b',
  '#27272a',
  '#3f3f46',
  '#52525b',
  '#71717a',
  '#3b82f6',
  '#2563eb',
  '#1d4ed8',
  '#60a5fa',
  '#93c5fd',
  '#22c55e',
  '#16a34a',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
];

export function ColorsPanel() {
  const {
    state,
    updateBrandColor,
    addBrandColor,
    removeBrandColor,
    updateSemanticColor,
    updateNeutralBase,
    updateSurfaceColor,
  } = useTokens();

  const { colors } = state.tokens;

  return (
    <div className="h-full overflow-y-auto">
      {/* Brand Colors */}
      <SectionLabel>Brand Colors</SectionLabel>

      <div className="space-y-1 px-1">
        {colors.brand.map((color) => (
          <ColorTokenRow
            key={color.id}
            label={color.name}
            value={color.value}
            onChange={(value) => updateBrandColor(color.id, value)}
            onRemove={colors.brand.length > 1 ? () => removeBrandColor(color.id) : undefined}
            presets={colorPresets}
          />
        ))}
      </div>

      <AddButton onClick={addBrandColor}>Add color</AddButton>

      <SectionDivider />

      {/* Semantic Colors */}
      <SectionLabel>Semantic</SectionLabel>

      <div className="space-y-0.5 px-1">
        {colors.semantic.map((color) => (
          <InlineColorRow
            key={color.id}
            label={color.name}
            value={color.value}
            onChange={(value) => updateSemanticColor(color.id, value)}
          />
        ))}
      </div>

      <SectionDivider />

      {/* Neutral Scale */}
      <div className="px-1">
        <NeutralScaleSelector value={colors.neutral} onChange={updateNeutralBase} />
      </div>

      <SectionDivider />

      {/* Surface Colors */}
      <SectionLabel>Surface</SectionLabel>

      <div className="space-y-0.5 px-1 pb-4">
        {Object.entries(colors.surface).map(([name, value]) => (
          <InlineColorRow
            key={name}
            label={name}
            value={value as { light: string; dark: string }}
            onChange={(newValue) =>
              updateSurfaceColor(name as keyof typeof colors.surface, newValue)
            }
          />
        ))}
      </div>
    </div>
  );
}
