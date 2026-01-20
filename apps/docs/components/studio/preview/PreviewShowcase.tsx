'use client';

import { PreviewMode } from '@/lib/studio/types';

interface PreviewShowcaseProps {
  mode: PreviewMode;
}

export function PreviewShowcase({ mode }: PreviewShowcaseProps) {
  const isDark = mode === 'dark';

  return (
    <div className="w-full space-y-6 p-6">
      {/* Buttons Section */}
      <section className="space-y-3">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Buttons
        </h4>
        <div className="flex flex-wrap gap-3">
          {/* Primary Button */}
          <button
            className="px-4 py-2 text-sm font-medium rounded-md transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: isDark ? '#18181b' : '#fafafa',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Primary
          </button>

          {/* Secondary Button */}
          <button
            className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
            style={{
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-foreground)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Secondary
          </button>

          {/* Outline Button */}
          <button
            className="px-4 py-2 text-sm font-medium rounded-md border transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-foreground)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Outline
          </button>

          {/* Accent Button */}
          <button
            className="px-4 py-2 text-sm font-medium rounded-md transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Accent
          </button>
        </div>
      </section>

      {/* Form Inputs Section */}
      <section className="space-y-3">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Form Inputs
        </h4>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Text input"
            className="px-3 py-2 text-sm border outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-foreground)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-md)',
            }}
          />
          <input
            type="text"
            placeholder="Disabled"
            disabled
            className="px-3 py-2 text-sm border cursor-not-allowed opacity-50"
            style={{
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-muted-foreground)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-md)',
            }}
          />
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-3">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Cards
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {/* Simple Card */}
          <div
            className="p-4 border"
            style={{
              backgroundColor: 'var(--color-card)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h5
              className="font-medium mb-1"
              style={{ color: 'var(--color-foreground)' }}
            >
              Card Title
            </h5>
            <p
              className="text-sm"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              This is a simple card with some description text.
            </p>
          </div>

          {/* Card with shadow */}
          <div
            className="p-4"
            style={{
              backgroundColor: 'var(--color-card)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <h5
              className="font-medium mb-1"
              style={{ color: 'var(--color-foreground)' }}
            >
              Elevated Card
            </h5>
            <p
              className="text-sm"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              This card uses shadow-md for elevation.
            </p>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="space-y-3">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Badges
        </h4>
        <div className="flex flex-wrap gap-2">
          <span
            className="px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-success)',
              color: '#ffffff',
              borderRadius: 'var(--radius-full)',
            }}
          >
            Success
          </span>
          <span
            className="px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-warning)',
              color: '#000000',
              borderRadius: 'var(--radius-full)',
            }}
          >
            Warning
          </span>
          <span
            className="px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-error)',
              color: '#ffffff',
              borderRadius: 'var(--radius-full)',
            }}
          >
            Error
          </span>
          <span
            className="px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: 'var(--color-info)',
              color: '#ffffff',
              borderRadius: 'var(--radius-full)',
            }}
          >
            Info
          </span>
          <span
            className="px-2 py-0.5 text-xs font-medium border"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-foreground)',
              borderColor: 'var(--color-border)',
              borderRadius: 'var(--radius-full)',
            }}
          >
            Outline
          </span>
        </div>
      </section>

      {/* Toggle / Switch */}
      <section className="space-y-3">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Switch & Checkbox
        </h4>
        <div className="flex items-center gap-6">
          {/* Switch */}
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-6 p-0.5 cursor-pointer"
              style={{
                backgroundColor: 'var(--color-accent)',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <div
                className="w-5 h-5 transform translate-x-4 transition-transform"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-full)',
                }}
              />
            </div>
            <span
              className="text-sm"
              style={{ color: 'var(--color-foreground)' }}
            >
              Enabled
            </span>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-accent)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span
              className="text-sm"
              style={{ color: 'var(--color-foreground)' }}
            >
              Checked
            </span>
          </div>
        </div>
      </section>

      {/* Avatar Section */}
      <section className="space-y-3">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Avatars
        </h4>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center text-sm font-medium"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#ffffff',
              borderRadius: 'var(--radius-full)',
            }}
          >
            JD
          </div>
          <div
            className="w-10 h-10 flex items-center justify-center text-sm font-medium"
            style={{
              backgroundColor: 'var(--color-success)',
              color: '#ffffff',
              borderRadius: 'var(--radius-full)',
            }}
          >
            AB
          </div>
          <div
            className="w-10 h-10 flex items-center justify-center text-sm font-medium"
            style={{
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-muted-foreground)',
              borderRadius: 'var(--radius-full)',
            }}
          >
            ?
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-3">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--color-muted-foreground)' }}
        >
          Typography
        </h4>
        <div style={{ color: 'var(--color-foreground)' }}>
          <h1 className="text-2xl font-bold mb-1">Heading 1</h1>
          <h2 className="text-xl font-semibold mb-1">Heading 2</h2>
          <h3 className="text-lg font-medium mb-1">Heading 3</h3>
          <p className="text-base mb-1">
            Body text with{' '}
            <a
              href="#"
              style={{ color: 'var(--color-accent)' }}
              className="underline"
            >
              a link
            </a>{' '}
            in it.
          </p>
          <p
            className="text-sm"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            Muted helper text
          </p>
        </div>
      </section>
    </div>
  );
}
