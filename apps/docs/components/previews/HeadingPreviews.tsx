'use client';

/**
 * Heading Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function HeadingBasicPreview() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--component-text)]">
        Page Title
      </h1>
      <p className="text-[var(--component-text-muted)]">
        This is a basic heading used for page titles and major sections.
      </p>
    </div>
  );
}

export function HeadingLevelsPreview() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight text-[var(--component-text)]">Heading 1</h1>
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--component-text)]">Heading 2</h2>
      <h3 className="text-2xl font-semibold text-[var(--component-text)]">Heading 3</h3>
      <h4 className="text-xl font-semibold text-[var(--component-text)]">Heading 4</h4>
      <h5 className="text-lg font-medium text-[var(--component-text)]">Heading 5</h5>
      <h6 className="text-base font-medium text-[var(--component-text)]">Heading 6</h6>
    </div>
  );
}

export function HeadingWithDescriptionPreview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--component-text)]">Dashboard</h2>
        <p className="text-sm text-[var(--component-text-muted)] mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your projects.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-[var(--component-text)]">Settings</h3>
        <p className="text-sm text-[var(--component-text-muted)] mt-1">
          Manage your account settings and preferences.
        </p>
      </div>
    </div>
  );
}
