import Link from 'next/link';

export const metadata = {
  title: 'Introduction - r/ui',
  description: 'Welcome to r/ui - beautiful, accessible components for React Native',
};

// Feature icons - simple, minimal SVGs
function UniversalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function AccessibleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v6" />
      <path d="M8 10l4 2 4-2" />
      <path d="M8 18l4-4 4 4" />
    </svg>
  );
}

function ThemeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.51 6 12 6z" />
      <path d="M7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.51 12 7 12z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

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
    description: 'Dark, light, and oatmeal themes included',
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

export default function IntroductionPage() {
  return (
    <div className="max-w-3xl">
      {/* Page Title */}
      <h1 className="text-xl font-semibold tracking-tight text-[var(--docs-text)] mb-1">
        Introduction
      </h1>
      <p className="text-sm text-[var(--docs-text-secondary)] mb-8">
        Welcome to r/ui — beautifully designed, accessible components for React Native.
      </p>

      {/* What is r/ui */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--docs-text)] mb-2">
          What is r/ui?
        </h2>
        <p className="text-sm text-[var(--docs-text-secondary)] leading-relaxed">
          r/ui is a component library that provides building blocks for React Native applications.
          Components are designed to be copied into your project — you own the code, with no hidden dependencies.
        </p>
      </section>

      {/* Key Features */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--docs-text)] mb-3">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-2.5 p-2.5 rounded-md border border-[var(--docs-border)] bg-[var(--docs-card-bg)]"
            >
              <div className="flex-shrink-0 text-[var(--docs-text-muted)] mt-0.5">
                <feature.icon />
              </div>
              <div>
                <h3 className="text-xs font-medium text-[var(--docs-text)]">
                  {feature.title}
                </h3>
                <p className="text-xs text-[var(--docs-text-muted)]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--docs-text)] mb-3">
          Quick Start
        </h2>
        <div className="space-y-3">
          <div className="rounded-md border border-[var(--docs-code-border)] bg-[var(--docs-code-bg)] overflow-hidden">
            <div className="px-3 py-1.5 border-b border-[var(--docs-code-border)] text-xs text-[var(--docs-text-muted)]">
              Terminal
            </div>
            <div className="p-3 overflow-x-auto">
              <span className="text-xs font-mono text-[var(--docs-text)]">npx r-ui add button</span>
            </div>
          </div>
          <div className="rounded-md border border-[var(--docs-code-border)] bg-[var(--docs-code-bg)] overflow-hidden">
            <div className="px-3 py-1.5 border-b border-[var(--docs-code-border)] text-xs text-[var(--docs-text-muted)]">
              App.tsx
            </div>
            <div className="p-3 overflow-x-auto">
              <pre className="text-xs font-mono text-[var(--docs-text)] whitespace-pre">{`import { Button } from '@/components/ui/button'

export default function App() {
  return (
    <Button variant="primary" onPress={() => console.log('Pressed!')}>
      Get Started
    </Button>
  )
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-sm font-semibold text-[var(--docs-text)] mb-3">
          Next Steps
        </h2>
        <div className="flex flex-col gap-1.5">
          <Link
            href="/docs/installation"
            className="group flex items-center justify-between p-2.5 rounded-md border border-[var(--docs-border)] hover:border-[var(--docs-text-muted)] bg-[var(--docs-card-bg)] transition-colors"
          >
            <div>
              <span className="text-xs font-medium text-[var(--docs-text)] group-hover:text-[var(--docs-link)]">
                Installation
              </span>
              <span className="text-xs text-[var(--docs-text-muted)] ml-1.5">
                — Set up r/ui in your project
              </span>
            </div>
            <span className="text-xs text-[var(--docs-text-muted)] group-hover:text-[var(--docs-link)] transition-colors">
              →
            </span>
          </Link>
          <Link
            href="/docs/components/button"
            className="group flex items-center justify-between p-2.5 rounded-md border border-[var(--docs-border)] hover:border-[var(--docs-text-muted)] bg-[var(--docs-card-bg)] transition-colors"
          >
            <div>
              <span className="text-xs font-medium text-[var(--docs-text)] group-hover:text-[var(--docs-link)]">
                Button
              </span>
              <span className="text-xs text-[var(--docs-text-muted)] ml-1.5">
                — Start with a simple component
              </span>
            </div>
            <span className="text-xs text-[var(--docs-text-muted)] group-hover:text-[var(--docs-link)] transition-colors">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
