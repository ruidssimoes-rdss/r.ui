'use client';

/**
 * Grid Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function GridItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 rounded-lg bg-[var(--component-bg-elevated)] border border-[var(--component-border)] text-sm text-[var(--component-text)] text-center ${className}`}>
      {children}
    </div>
  );
}

export function GridBasicPreview() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-[var(--component-text-muted)]">3-column grid</p>
      <div className="grid grid-cols-3 gap-4">
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>
        <GridItem>6</GridItem>
      </div>
    </div>
  );
}

export function GridResponsivePreview() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-[var(--component-text-muted)]">Responsive: 1 col → 2 cols → 4 cols</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </div>
    </div>
  );
}

export function GridSpanPreview() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-[var(--component-text-muted)]">Grid with spanning items</p>
      <div className="grid grid-cols-4 gap-4">
        <GridItem className="col-span-2">Span 2</GridItem>
        <GridItem>1</GridItem>
        <GridItem>1</GridItem>
        <GridItem>1</GridItem>
        <GridItem className="col-span-3">Span 3</GridItem>
        <GridItem className="col-span-4">Span 4 (full width)</GridItem>
      </div>
    </div>
  );
}
