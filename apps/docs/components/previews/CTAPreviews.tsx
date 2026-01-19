'use client';

/**
 * CTA Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 */

function CTAButton({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90';
  const variantClasses = variant === 'primary'
    ? 'bg-white text-gray-900 hover:bg-gray-100'
    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20';

  return <button className={`${baseClasses} ${variantClasses}`}>{children}</button>;
}

export function CTABannerPreview() {
  return (
    <div
      className="w-full max-w-2xl rounded-2xl p-12 text-center"
      style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
    >
      <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
      <p className="mt-3 text-lg text-white/80 max-w-md mx-auto">
        Join thousands of developers building beautiful apps with r/ui.
      </p>
      <div className="mt-8 flex gap-3 justify-center">
        <CTAButton variant="primary">Start Free Trial</CTAButton>
        <CTAButton variant="secondary">View Pricing</CTAButton>
      </div>
    </div>
  );
}

export function CTACardPreview() {
  return (
    <div className="w-full max-w-lg p-8 rounded-xl bg-[var(--component-bg)] border border-[var(--component-border)] text-center">
      <h2 className="text-2xl font-bold text-[var(--component-text)]">
        Upgrade to Pro
      </h2>
      <p className="mt-2 text-[var(--component-text-muted)]">
        Get access to all premium components and priority support.
      </p>
      <div className="mt-6 flex gap-3 justify-center">
        <button className="px-6 py-3 rounded-lg font-medium text-sm bg-[var(--track-fill)] text-white hover:opacity-90 transition-opacity">
          Upgrade Now
        </button>
        <button className="px-6 py-3 rounded-lg font-medium text-sm bg-[var(--component-bg)] border border-[var(--component-border)] text-[var(--component-text)] hover:bg-[var(--track-fill)]/5 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}

export function CTAInlinePreview() {
  return (
    <div className="w-full max-w-2xl p-4 rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-2xl">🎉</span>
        <div>
          <p className="font-medium text-[var(--component-text)]">New components available!</p>
          <p className="text-sm text-[var(--component-text-muted)]">Check out our latest additions.</p>
        </div>
      </div>
      <button className="px-4 py-2 rounded-lg font-medium text-sm bg-[var(--track-fill)] text-white hover:opacity-90 transition-opacity">
        Explore
      </button>
    </div>
  );
}

export function CTAWithImagePreview() {
  return (
    <div
      className="w-full max-w-2xl rounded-2xl overflow-hidden relative"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative p-12 text-center">
        <h2 className="text-3xl font-bold text-white">Transform your workflow</h2>
        <p className="mt-3 text-lg text-white/80 max-w-md mx-auto">
          Build faster with our comprehensive component library.
        </p>
        <div className="mt-8">
          <CTAButton variant="primary">Get Started</CTAButton>
        </div>
      </div>
    </div>
  );
}

export function CTAGradientPreview() {
  return (
    <div
      className="w-full max-w-2xl rounded-2xl p-12 text-center"
      style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}
    >
      <h2 className="text-3xl font-bold text-white">Limited time offer</h2>
      <p className="mt-3 text-lg text-white/90 max-w-md mx-auto">
        Get 50% off your first year when you sign up today.
      </p>
      <div className="mt-8">
        <button className="px-8 py-4 rounded-lg font-semibold bg-white text-gray-900 hover:bg-gray-100 transition-colors">
          Claim Your Discount
        </button>
      </div>
    </div>
  );
}

export function CTAMinimalPreview() {
  return (
    <div className="w-full max-w-lg text-center py-8">
      <h2 className="text-2xl font-bold text-[var(--component-text)]">
        Start building today
      </h2>
      <div className="mt-6">
        <button className="px-8 py-3 rounded-lg font-medium bg-[var(--track-fill)] text-white hover:opacity-90 transition-opacity">
          Get Started →
        </button>
      </div>
    </div>
  );
}
