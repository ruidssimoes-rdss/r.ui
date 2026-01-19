'use client';

/**
 * Hero Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 */

function HeroBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full bg-[var(--track-fill)]/10 text-[var(--track-fill)] ${className}`}>
      {children}
    </span>
  );
}

function HeroButton({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium text-sm transition-opacity hover:opacity-90';
  const variantClasses = variant === 'primary'
    ? 'bg-[var(--track-fill)] text-white'
    : 'bg-[var(--component-bg)] border border-[var(--component-border)] text-[var(--component-text)]';

  return (
    <button className={`${baseClasses} ${variantClasses}`}>
      {children}
    </button>
  );
}

export function HeroCenteredPreview() {
  return (
    <div className="w-full max-w-2xl text-center py-16 px-6">
      <HeroBadge>New Release</HeroBadge>
      <h1 className="mt-4 text-4xl font-bold text-[var(--component-text)]">
        Build beautiful apps faster
      </h1>
      <p className="mt-4 text-lg text-[var(--component-text-muted)] max-w-lg mx-auto">
        A comprehensive UI library for React Native that works seamlessly across iOS, Android, and Web.
      </p>
      <div className="mt-8 flex gap-3 justify-center">
        <HeroButton variant="primary">Get Started</HeroButton>
        <HeroButton variant="secondary">View Components</HeroButton>
      </div>
    </div>
  );
}

export function HeroSplitPreview() {
  return (
    <div className="w-full max-w-3xl flex items-center gap-8 py-8 px-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-[var(--component-text)]">
          Design with confidence
        </h1>
        <p className="mt-3 text-[var(--component-text-muted)]">
          Production-ready components that adapt to your brand and work on every platform.
        </p>
        <div className="mt-6 flex gap-3">
          <HeroButton variant="primary">Start Building</HeroButton>
        </div>
      </div>
      <div className="flex-1 aspect-square bg-gradient-to-br from-[var(--track-fill)] to-purple-500 rounded-2xl" />
    </div>
  );
}

export function HeroBackgroundImagePreview() {
  return (
    <div
      className="w-full max-w-2xl rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(168, 85, 247, 0.9))',
      }}
    >
      <div className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-white">
          Ship faster, ship better
        </h1>
        <p className="mt-4 text-lg text-white/80 max-w-lg mx-auto">
          Join thousands of developers building with r/ui components.
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <button className="px-6 py-3 rounded-lg font-medium text-sm bg-white text-gray-900 hover:bg-gray-100 transition-colors">
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}

export function HeroGradientTextPreview() {
  return (
    <div className="w-full max-w-2xl text-center py-16 px-6">
      <h1
        className="text-4xl font-bold"
        style={{
          backgroundImage: 'linear-gradient(90deg, #3b82f6, #a855f7, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        The future of UI development
      </h1>
      <p className="mt-4 text-lg text-[var(--component-text-muted)] max-w-lg mx-auto">
        Beautiful, accessible, and performant components for modern applications.
      </p>
      <div className="mt-8">
        <HeroButton variant="primary">Explore Components</HeroButton>
      </div>
    </div>
  );
}

export function HeroMinimalPreview() {
  return (
    <div className="w-full max-w-xl text-center py-12 px-6">
      <h1 className="text-3xl font-bold text-[var(--component-text)]">
        Simple, powerful, beautiful.
      </h1>
      <div className="mt-6">
        <HeroButton variant="primary">Learn More</HeroButton>
      </div>
    </div>
  );
}

export function HeroWithBadgePreview() {
  return (
    <div className="w-full max-w-2xl text-center py-16 px-6">
      <HeroBadge className="bg-emerald-500/10 text-emerald-500">
        Version 2.0 is here
      </HeroBadge>
      <h1 className="mt-4 text-4xl font-bold text-[var(--component-text)]">
        Introducing the next generation
      </h1>
      <p className="mt-4 text-lg text-[var(--component-text-muted)] max-w-lg mx-auto">
        Completely rewritten from the ground up with performance and accessibility in mind.
      </p>
      <div className="mt-8 flex gap-3 justify-center">
        <HeroButton variant="primary">Upgrade Now</HeroButton>
        <HeroButton variant="secondary">Read Changelog</HeroButton>
      </div>
    </div>
  );
}
