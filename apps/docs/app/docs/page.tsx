import Link from 'next/link';
import { navigation } from '../../lib/navigation';

export const metadata = {
  title: 'Documentation - r/ui',
  description: 'Build beautiful React Native apps with 52 production-ready components',
};

// ========================================
// Icons - Minimal, 20px, gray stroke
// ========================================

function UniversalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function AccessibleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v6" />
      <path d="M8 10l4 2 4-2" />
      <path d="M8 18l4-4 4 4" />
    </svg>
  );
}

function ThemeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.51 6 12 6z" />
      <path d="M7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.51 12 7 12z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ComponentsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="19" cy="12" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M12 2a10 10 0 0 0-8.5 15.5" />
      <path d="M12 2a10 10 0 0 1 8.5 15.5" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

// ========================================
// Feature Card Component
// ========================================

interface FeatureCardProps {
  icon: React.ComponentType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg border border-[#E5E7EB] hover:border-[#D1D5DB] transition-colors duration-150">
      <div className="text-[#6B7280] mb-3">
        <Icon />
      </div>
      <h3 className="text-[15px] font-semibold text-[#111827] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[#6B7280] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ========================================
// Explore Card Component
// ========================================

interface ExploreCardProps {
  icon: React.ComponentType;
  title: string;
  subtitle: string;
  href: string;
}

function ExploreCard({ icon: Icon, title, subtitle, href }: ExploreCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col p-6 rounded-lg border border-[#E5E7EB] hover:border-[#D1D5DB] transition-colors duration-150"
    >
      <div className="text-[#6B7280] group-hover:text-[#374151] mb-4 transition-colors duration-150">
        <Icon />
      </div>
      <h3 className="text-base font-semibold text-[#111827] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[#6B7280]">
        {subtitle}
      </p>
      <div className="mt-4 flex items-center text-sm font-medium text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors duration-150">
        Explore
        <span className="ml-1 group-hover:translate-x-0.5 transition-transform duration-150">
          <ArrowRightIcon />
        </span>
      </div>
    </Link>
  );
}

// ========================================
// Main Page Component
// ========================================

const features = [
  {
    icon: UniversalIcon,
    title: 'Universal',
    description: 'iOS, Android, and Web via React Native Web',
  },
  {
    icon: AccessibleIcon,
    title: 'Accessible',
    description: 'Built with accessibility from the ground up',
  },
  {
    icon: ThemeIcon,
    title: 'Themeable',
    description: 'Dark, Light, and Oatmeal themes included',
  },
  {
    icon: TypeScriptIcon,
    title: 'TypeScript',
    description: 'Full type support with exported types',
  },
  {
    icon: TailwindIcon,
    title: 'NativeWind',
    description: 'Styled with Tailwind via NativeWind',
  },
  {
    icon: CopyIcon,
    title: 'Copy & Paste',
    description: 'Own your code, no hidden dependencies',
  },
];

// Count total components from navigation
const totalComponents = navigation
  .filter((section) => section.title !== 'Guides')
  .reduce((acc, section) => acc + section.items.length, 0);

export default function DocsLandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] tracking-tight mb-4">
            Build beautiful React Native apps
          </h1>
          <p className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto mb-8">
            {totalComponents} production-ready components. Copy, paste, customize.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs/installation"
              className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium text-white bg-[#111827] hover:bg-[#1F2937] rounded-lg transition-colors duration-150"
            >
              Get Started
            </Link>
            <Link
              href="/docs/components"
              className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium text-[#374151] bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] rounded-lg transition-colors duration-150"
            >
              View Components
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 border-t border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 px-6 border-t border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl font-semibold text-[#111827] mb-8">
            Quick Start
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Terminal */}
            <div className="rounded-lg border border-[#E5E7EB] overflow-hidden">
              <div className="px-4 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <span className="text-xs font-medium text-[#6B7280]">Terminal</span>
              </div>
              <div className="p-4 bg-white">
                <code className="text-sm font-mono text-[#111827]">npx r-ui add button</code>
              </div>
            </div>
            {/* App.tsx */}
            <div className="rounded-lg border border-[#E5E7EB] overflow-hidden">
              <div className="px-4 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <span className="text-xs font-medium text-[#6B7280]">App.tsx</span>
              </div>
              <div className="p-4 bg-white overflow-x-auto">
                <pre className="text-sm font-mono text-[#111827] whitespace-pre">{`import { Button } from '@/components/ui/button'

export default function App() {
  return (
    <Button onPress={() => console.log('Pressed!')}>
      Get Started
    </Button>
  )
}`}</pre>
              </div>
            </div>
          </div>
          <Link
            href="/docs/installation"
            className="inline-flex items-center mt-6 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors duration-150"
          >
            Read the full installation guide
            <span className="ml-1">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-16 px-6 border-t border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl font-semibold text-[#111827] mb-8">
            Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ExploreCard
              icon={ComponentsIcon}
              title="Components"
              subtitle={`${totalComponents} components`}
              href="/docs/components"
            />
            <ExploreCard
              icon={PaletteIcon}
              title="Themes"
              subtitle="3 built-in themes"
              href="/docs/theming"
            />
            <ExploreCard
              icon={LayersIcon}
              title="Patterns"
              subtitle="Compound components"
              href="/docs/patterns"
            />
          </div>
        </div>
      </section>

      {/* Bottom padding */}
      <div className="h-16" />
    </div>
  );
}
