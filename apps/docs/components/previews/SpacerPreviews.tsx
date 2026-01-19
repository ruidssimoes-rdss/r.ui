'use client';

/**
 * Spacer Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function ContentBlock({ label }: { label: string }) {
  return (
    <div className="p-3 rounded-lg bg-[var(--component-bg-elevated)] border border-[var(--component-border)] text-sm text-[var(--component-text)]">
      {label}
    </div>
  );
}

export function SpacerVerticalPreview() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-[var(--component-text-muted)]">Vertical spacing between elements</p>
      <div>
        <ContentBlock label="Header" />
        <div className="h-4 bg-[var(--track-fill)]/20 border-y border-dashed border-[var(--track-fill)]" />
        <ContentBlock label="Content" />
        <div className="h-8 bg-[var(--track-fill)]/20 border-y border-dashed border-[var(--track-fill)]" />
        <ContentBlock label="Footer" />
      </div>
    </div>
  );
}

export function SpacerHorizontalPreview() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-[var(--component-text-muted)]">Horizontal spacing between elements</p>
      <div className="flex items-center">
        <ContentBlock label="Left" />
        <div className="w-4 h-8 bg-[var(--track-fill)]/20 border-x border-dashed border-[var(--track-fill)]" />
        <ContentBlock label="Center" />
        <div className="w-8 h-8 bg-[var(--track-fill)]/20 border-x border-dashed border-[var(--track-fill)]" />
        <ContentBlock label="Right" />
      </div>
    </div>
  );
}

export function SpacerSizesPreview() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-[var(--component-text-muted)]">Different spacing sizes</p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--component-text-muted)] w-16">4px:</span>
          <div className="h-1 w-full bg-[var(--track-fill)]/30 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--component-text-muted)] w-16">8px:</span>
          <div className="h-2 w-full bg-[var(--track-fill)]/30 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--component-text-muted)] w-16">16px:</span>
          <div className="h-4 w-full bg-[var(--track-fill)]/30 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--component-text-muted)] w-16">24px:</span>
          <div className="h-6 w-full bg-[var(--track-fill)]/30 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--component-text-muted)] w-16">32px:</span>
          <div className="h-8 w-full bg-[var(--track-fill)]/30 rounded" />
        </div>
      </div>
    </div>
  );
}
