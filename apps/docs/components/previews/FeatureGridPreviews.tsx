'use client';

/**
 * FeatureGrid Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 */

function FeatureIcon({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-emerald-500/10 text-emerald-500',
    purple: 'bg-purple-500/10 text-purple-500',
    amber: 'bg-amber-500/10 text-amber-500',
    red: 'bg-red-500/10 text-red-500',
  };

  return (
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color] || colorClasses.blue}`}>
      {children}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  variant = 'default',
  horizontal = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'default' | 'glass' | 'bordered';
  horizontal?: boolean;
}) {
  const variantClasses: Record<string, string> = {
    default: 'bg-[var(--component-bg)] border border-[var(--component-border)]',
    glass: 'bg-white/5 border border-white/10 backdrop-blur-md',
    bordered: 'bg-transparent border-2 border-[var(--component-border)]',
  };

  return (
    <div className={`p-5 rounded-xl ${variantClasses[variant]} ${horizontal ? 'flex items-start gap-4' : ''}`}>
      {icon}
      <div className={horizontal ? 'flex-1' : 'mt-3'}>
        <h3 className="text-lg font-semibold text-[var(--component-text)]">{title}</h3>
        <p className="mt-1 text-sm text-[var(--component-text-muted)]">{description}</p>
      </div>
    </div>
  );
}

export function FeatureGridBasicPreview() {
  return (
    <div className="w-full max-w-3xl grid grid-cols-3 gap-4">
      <FeatureCard
        icon={<FeatureIcon color="blue"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></FeatureIcon>}
        title="Fast"
        description="Optimized for performance on all platforms."
      />
      <FeatureCard
        icon={<FeatureIcon color="green"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></FeatureIcon>}
        title="Secure"
        description="Built with security best practices."
      />
      <FeatureCard
        icon={<FeatureIcon color="purple"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg></FeatureIcon>}
        title="Flexible"
        description="Customize every aspect of the design."
      />
    </div>
  );
}

export function FeatureGridTwoColumnsPreview() {
  return (
    <div className="w-full max-w-2xl grid grid-cols-2 gap-6">
      <FeatureCard
        icon={<FeatureIcon color="blue"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></FeatureIcon>}
        title="Cross-Platform"
        description="Write once, run everywhere. Your components work on iOS, Android, and Web."
      />
      <FeatureCard
        icon={<FeatureIcon color="amber"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg></FeatureIcon>}
        title="Themeable"
        description="Dark mode, light mode, or create your own theme with our token system."
      />
    </div>
  );
}

export function FeatureGridWithLinksPreview() {
  return (
    <div className="w-full max-w-3xl grid grid-cols-3 gap-4">
      {[
        { title: 'Documentation', description: 'Learn how to use our components', color: 'blue' },
        { title: 'Examples', description: 'See real-world implementations', color: 'green' },
        { title: 'API Reference', description: 'Detailed prop documentation', color: 'purple' },
      ].map((item, i) => (
        <button
          key={i}
          className="p-5 rounded-xl bg-[var(--component-bg)] border border-[var(--component-border)] text-left hover:border-[var(--track-fill)] transition-colors group"
        >
          <FeatureIcon color={item.color}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </FeatureIcon>
          <h3 className="mt-3 text-lg font-semibold text-[var(--component-text)] group-hover:text-[var(--track-fill)]">
            {item.title} →
          </h3>
          <p className="mt-1 text-sm text-[var(--component-text-muted)]">{item.description}</p>
        </button>
      ))}
    </div>
  );
}

export function FeatureGridGlassPreview() {
  return (
    <div
      className="w-full max-w-3xl p-8 rounded-2xl"
      style={{ background: 'linear-gradient(135deg, #1e3a5f, #4a2c6a)' }}
    >
      <div className="grid grid-cols-3 gap-4">
        <FeatureCard
          variant="glass"
          icon={<div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg></div>}
          title="Innovative"
          description="Cutting-edge technology"
        />
        <FeatureCard
          variant="glass"
          icon={<div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>}
          title="Real-time"
          description="Instant updates"
        />
        <FeatureCard
          variant="glass"
          icon={<div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>}
          title="Analytics"
          description="Track everything"
        />
      </div>
    </div>
  );
}

export function FeatureGridCenteredPreview() {
  return (
    <div className="w-full max-w-3xl grid grid-cols-3 gap-4">
      {[
        { icon: '🚀', title: 'Performance', description: 'Blazing fast rendering', color: 'blue' },
        { icon: '🎨', title: 'Design', description: 'Beautiful by default', color: 'purple' },
        { icon: '📱', title: 'Responsive', description: 'Works everywhere', color: 'green' },
      ].map((item, i) => (
        <div key={i} className="p-5 rounded-xl bg-[var(--component-bg)] border border-[var(--component-border)] text-center">
          <div className="text-3xl mb-3">{item.icon}</div>
          <h3 className="text-lg font-semibold text-[var(--component-text)]">{item.title}</h3>
          <p className="mt-1 text-sm text-[var(--component-text-muted)]">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function FeatureGridHorizontalPreview() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <FeatureCard
        horizontal
        icon={<FeatureIcon color="blue"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></FeatureIcon>}
        title="Customizable"
        description="Every component can be customized to match your brand. Use our token system for consistent styling."
      />
      <FeatureCard
        horizontal
        icon={<FeatureIcon color="green"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></FeatureIcon>}
        title="Accessible"
        description="Built with accessibility in mind. Screen reader support, keyboard navigation, and ARIA labels included."
      />
    </div>
  );
}
