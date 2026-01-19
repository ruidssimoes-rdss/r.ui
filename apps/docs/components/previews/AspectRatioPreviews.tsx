'use client';

/**
 * AspectRatio Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function AspectRatioVideoPreview() {
  return (
    <div className="space-y-2 w-full max-w-md">
      <p className="text-xs text-[var(--component-text-muted)]">16:9 Video Container</p>
      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

export function AspectRatioSquarePreview() {
  return (
    <div className="space-y-2 w-full max-w-[200px]">
      <p className="text-xs text-[var(--component-text-muted)]">1:1 Square</p>
      <div className="aspect-square bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-semibold text-lg">1:1</span>
      </div>
    </div>
  );
}

export function AspectRatioImagePreview() {
  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <div className="aspect-square bg-[var(--component-bg-elevated)] rounded-lg border border-[var(--component-border)] flex items-center justify-center">
            <span className="text-xs text-[var(--component-text-muted)]">1:1</span>
          </div>
          <p className="text-xs text-center text-[var(--component-text-muted)]">Square</p>
        </div>
        <div className="space-y-1">
          <div className="aspect-[4/3] bg-[var(--component-bg-elevated)] rounded-lg border border-[var(--component-border)] flex items-center justify-center">
            <span className="text-xs text-[var(--component-text-muted)]">4:3</span>
          </div>
          <p className="text-xs text-center text-[var(--component-text-muted)]">Standard</p>
        </div>
        <div className="space-y-1">
          <div className="aspect-[3/4] bg-[var(--component-bg-elevated)] rounded-lg border border-[var(--component-border)] flex items-center justify-center">
            <span className="text-xs text-[var(--component-text-muted)]">3:4</span>
          </div>
          <p className="text-xs text-center text-[var(--component-text-muted)]">Portrait</p>
        </div>
      </div>
    </div>
  );
}
