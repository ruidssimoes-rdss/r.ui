'use client';

import { useTokens } from '@/lib/studio/context';
import { PreviewMode, ColorScale } from '@/lib/studio/types';

interface PreviewColorsProps {
  mode: PreviewMode;
}

// Type-safe neutral scale keys
const NEUTRAL_KEYS: (keyof ColorScale)[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function PreviewColors({ mode }: PreviewColorsProps) {
  const { state } = useTokens();
  const { colors } = state.tokens;

  return (
    <div className="space-y-6">
      <h3
        className="text-sm font-medium"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        Color Palette
      </h3>

      {/* Brand Colors */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Brand Colors
        </p>
        <div className="grid grid-cols-3 gap-2">
          {colors.brand.map((color) => (
            <div key={color.id} className="space-y-1">
              <div
                className="h-12 rounded-[var(--radius-md)]"
                style={{ backgroundColor: color.value[mode] }}
                title={color.value[mode]}
              />
              <p
                className="text-[10px] font-medium truncate"
                style={{ color: 'var(--color-foreground)' }}
              >
                {color.name}
              </p>
              <p
                className="text-[10px] font-mono"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {color.value[mode]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic Colors */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Semantic Colors
        </p>
        <div className="grid grid-cols-4 gap-2">
          {colors.semantic.map((color) => (
            <div key={color.id} className="space-y-1">
              <div
                className="h-10 rounded-[var(--radius-sm)]"
                style={{ backgroundColor: color.value[mode] }}
                title={color.value[mode]}
              />
              <p
                className="text-[10px] font-medium truncate"
                style={{ color: 'var(--color-foreground)' }}
              >
                {color.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Neutral Scale */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Neutral Scale
        </p>
        <div className="flex gap-0.5">
          {NEUTRAL_KEYS.map((key) => (
            <div
              key={key}
              className="flex-1 h-10 first:rounded-l-[var(--radius-sm)] last:rounded-r-[var(--radius-sm)]"
              style={{ backgroundColor: colors.neutral.scale[key] }}
              title={`${key}: ${colors.neutral.scale[key]}`}
            />
          ))}
        </div>
        <div className="flex gap-0.5">
          {NEUTRAL_KEYS.map((key) => (
            <p
              key={key}
              className="flex-1 text-[9px] text-center"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              {key}
            </p>
          ))}
        </div>
      </div>

      {/* Surface Colors */}
      <div className="space-y-3">
        <p
          className="text-xs"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Surface Colors
        </p>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <div
              className="h-10 rounded-[var(--radius-sm)] border"
              style={{
                backgroundColor: colors.surface.background[mode],
                borderColor: 'var(--color-border)',
              }}
              title={colors.surface.background[mode]}
            />
            <p
              className="text-[10px] font-medium"
              style={{ color: 'var(--color-foreground)' }}
            >
              Background
            </p>
          </div>
          <div className="space-y-1">
            <div
              className="h-10 rounded-[var(--radius-sm)]"
              style={{ backgroundColor: colors.surface.foreground[mode] }}
              title={colors.surface.foreground[mode]}
            />
            <p
              className="text-[10px] font-medium"
              style={{ color: 'var(--color-foreground)' }}
            >
              Foreground
            </p>
          </div>
          <div className="space-y-1">
            <div
              className="h-10 rounded-[var(--radius-sm)] border"
              style={{
                backgroundColor: colors.surface.card[mode],
                borderColor: 'var(--color-border)',
              }}
              title={colors.surface.card[mode]}
            />
            <p
              className="text-[10px] font-medium"
              style={{ color: 'var(--color-foreground)' }}
            >
              Card
            </p>
          </div>
          <div className="space-y-1">
            <div
              className="h-10 rounded-[var(--radius-sm)]"
              style={{ backgroundColor: colors.surface.muted[mode] }}
              title={colors.surface.muted[mode]}
            />
            <p
              className="text-[10px] font-medium"
              style={{ color: 'var(--color-foreground)' }}
            >
              Muted
            </p>
          </div>
          <div className="space-y-1">
            <div
              className="h-10 rounded-[var(--radius-sm)]"
              style={{ backgroundColor: colors.surface.mutedForeground[mode] }}
              title={colors.surface.mutedForeground[mode]}
            />
            <p
              className="text-[10px] font-medium"
              style={{ color: 'var(--color-foreground)' }}
            >
              Muted FG
            </p>
          </div>
          <div className="space-y-1">
            <div
              className="h-10 rounded-[var(--radius-sm)]"
              style={{ backgroundColor: colors.surface.border[mode] }}
              title={colors.surface.border[mode]}
            />
            <p
              className="text-[10px] font-medium"
              style={{ color: 'var(--color-foreground)' }}
            >
              Border
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
