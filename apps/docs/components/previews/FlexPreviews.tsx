'use client';

/**
 * Flex Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 rounded-lg bg-[var(--component-bg-elevated)] border border-[var(--component-border)] text-sm text-[var(--component-text)]">
      {children}
    </div>
  );
}

export function FlexRowPreview() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-[var(--component-text-muted)]">flex-direction: row</p>
      <div className="flex flex-row gap-3">
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </div>
    </div>
  );
}

export function FlexColumnPreview() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-[var(--component-text-muted)]">flex-direction: column</p>
      <div className="flex flex-col gap-3 max-w-[200px]">
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </div>
    </div>
  );
}

export function FlexJustifyPreview() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs text-[var(--component-text-muted)]">justify-content: space-between</p>
        <div className="flex justify-between p-3 border border-dashed border-[var(--component-border)] rounded-lg">
          <Box>Start</Box>
          <Box>End</Box>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--component-text-muted)]">justify-content: center</p>
        <div className="flex justify-center p-3 border border-dashed border-[var(--component-border)] rounded-lg">
          <Box>Centered</Box>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--component-text-muted)]">justify-content: space-around</p>
        <div className="flex justify-around p-3 border border-dashed border-[var(--component-border)] rounded-lg">
          <Box>A</Box>
          <Box>B</Box>
          <Box>C</Box>
        </div>
      </div>
    </div>
  );
}

export function FlexGapPreview() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs text-[var(--component-text-muted)]">gap: 8px (gap-2)</p>
        <div className="flex gap-2">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--component-text-muted)]">gap: 16px (gap-4)</p>
        <div className="flex gap-4">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--component-text-muted)]">gap: 24px (gap-6)</p>
        <div className="flex gap-6">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </div>
      </div>
    </div>
  );
}
