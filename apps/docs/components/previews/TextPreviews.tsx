'use client';

/**
 * Text Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function TextBasicPreview() {
  return (
    <div className="space-y-2">
      <p className="text-[var(--component-text)]">
        The quick brown fox jumps over the lazy dog. This is a basic text component
        that renders readable body text with proper line height and spacing.
      </p>
    </div>
  );
}

export function TextSizesPreview() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-[var(--component-text)]">Extra Small (xs) - 12px</p>
      <p className="text-sm text-[var(--component-text)]">Small (sm) - 14px</p>
      <p className="text-base text-[var(--component-text)]">Base - 16px</p>
      <p className="text-lg text-[var(--component-text)]">Large (lg) - 18px</p>
      <p className="text-xl text-[var(--component-text)]">Extra Large (xl) - 20px</p>
      <p className="text-2xl text-[var(--component-text)]">2XL - 24px</p>
    </div>
  );
}

export function TextWeightsPreview() {
  return (
    <div className="space-y-3">
      <p className="font-normal text-[var(--component-text)]">Normal weight (400)</p>
      <p className="font-medium text-[var(--component-text)]">Medium weight (500)</p>
      <p className="font-semibold text-[var(--component-text)]">Semibold weight (600)</p>
      <p className="font-bold text-[var(--component-text)]">Bold weight (700)</p>
    </div>
  );
}

export function TextColorsPreview() {
  return (
    <div className="space-y-3">
      <p className="text-[var(--component-text)]">Default text color</p>
      <p className="text-[var(--component-text-muted)]">Muted text color</p>
      <p className="text-[var(--track-fill)]">Primary/accent color</p>
      <p className="text-emerald-600">Success color</p>
      <p className="text-amber-600">Warning color</p>
      <p className="text-red-600">Error/destructive color</p>
    </div>
  );
}
