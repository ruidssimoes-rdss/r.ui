'use client';

import { useTokens } from '@/lib/studio/context';
import { PreviewMode } from '@/lib/studio/types';

interface PreviewTypographyProps {
  mode: PreviewMode;
}

export function PreviewTypography({ mode }: PreviewTypographyProps) {
  const { state } = useTokens();
  const { typography } = state.tokens;

  // Get font sizes in order
  const sizeOrder = ['5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'base', 'sm', 'xs'];
  const orderedSizes = sizeOrder
    .map((name) => typography.sizes.find((s) => s.name === name))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <h3
        className="text-sm font-medium"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        Typography Scale
      </h3>

      <div className="space-y-4">
        {orderedSizes.map((size) => {
          if (!size) return null;
          const isHeading = ['5xl', '4xl', '3xl', '2xl', 'xl'].includes(size.name);

          return (
            <div key={size.name}>
              <p
                className="text-[10px] mb-1"
                style={{ color: 'var(--color-muted-foreground)' }}
              >
                {size.name} · {size.size}px · {size.lineHeight}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: `${size.size}px`,
                  lineHeight: size.lineHeight,
                  color: 'var(--color-foreground)',
                  fontWeight: isHeading ? 600 : 400,
                }}
              >
                {isHeading ? getHeadingText(size.name) : getBodyText(size.name)}
              </p>
            </div>
          );
        })}

        {/* Monospace */}
        <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <p
            className="text-[10px] mb-2"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            Monospace
          </p>
          <code
            className="text-sm px-2 py-1 rounded"
            style={{
              fontFamily: 'var(--font-mono)',
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-foreground)',
            }}
          >
            const theme = createTheme(tokens);
          </code>
        </div>

        {/* Font Weights */}
        <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <p
            className="text-[10px] mb-3"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            Font Weights
          </p>
          <div className="flex flex-wrap gap-4">
            {typography.weights.map((weight) => (
              <span
                key={weight.name}
                className="text-sm"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: weight.value,
                  color: 'var(--color-foreground)',
                }}
              >
                {weight.name} ({weight.value})
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getHeadingText(size: string): string {
  switch (size) {
    case '5xl':
      return 'Display heading';
    case '4xl':
      return 'Page title';
    case '3xl':
      return 'Section heading';
    case '2xl':
      return 'Subsection';
    case 'xl':
      return 'Card title';
    default:
      return 'Heading';
  }
}

function getBodyText(size: string): string {
  switch (size) {
    case 'lg':
      return 'Lead paragraph text for introductions.';
    case 'base':
      return 'Body text for main content. This is the default size for most text.';
    case 'sm':
      return 'Secondary text, captions, and helper text.';
    case 'xs':
      return 'Fine print, labels, and metadata.';
    default:
      return 'Sample text';
  }
}
