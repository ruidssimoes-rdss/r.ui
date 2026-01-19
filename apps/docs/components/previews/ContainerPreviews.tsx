'use client';

/**
 * Container Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function ContainerBasicPreview() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl px-4 py-6 border border-dashed border-[var(--component-border)] rounded-lg">
        <p className="text-center text-sm text-[var(--component-text-muted)]">
          Centered container with max-width
        </p>
        <div className="mt-4 p-4 bg-[var(--component-bg-elevated)] rounded-lg">
          <p className="text-[var(--component-text)]">Content inside the container</p>
        </div>
      </div>
    </div>
  );
}

export function ContainerSizesPreview() {
  return (
    <div className="space-y-4 w-full">
      <div className="mx-auto max-w-sm px-4 py-3 border border-dashed border-[var(--component-border)] rounded-lg">
        <p className="text-center text-xs text-[var(--component-text-muted)]">sm (max-w-sm)</p>
      </div>
      <div className="mx-auto max-w-md px-4 py-3 border border-dashed border-[var(--component-border)] rounded-lg">
        <p className="text-center text-xs text-[var(--component-text-muted)]">md (max-w-md)</p>
      </div>
      <div className="mx-auto max-w-lg px-4 py-3 border border-dashed border-[var(--component-border)] rounded-lg">
        <p className="text-center text-xs text-[var(--component-text-muted)]">lg (max-w-lg)</p>
      </div>
      <div className="mx-auto max-w-xl px-4 py-3 border border-dashed border-[var(--component-border)] rounded-lg">
        <p className="text-center text-xs text-[var(--component-text-muted)]">xl (max-w-xl)</p>
      </div>
    </div>
  );
}

export function ContainerWithPaddingPreview() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-2xl border border-dashed border-[var(--component-border)] rounded-lg overflow-hidden">
        <div className="px-8 py-6 bg-[var(--component-bg)]">
          <h3 className="font-semibold text-[var(--component-text)]">Container with padding</h3>
          <p className="mt-2 text-sm text-[var(--component-text-muted)]">
            Horizontal padding ensures content doesn&apos;t touch the edges on smaller screens.
          </p>
        </div>
      </div>
    </div>
  );
}
