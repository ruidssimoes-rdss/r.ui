'use client';

import Link from 'next/link';

/**
 * Homepage v8 - Grid-Based Minimal Design (jonasemmertsen.com inspired)
 *
 * Visible 12-column grid system with faint lines.
 * Asymmetric layout - nothing centered.
 * Typography as hero - big serif headline.
 * Single accent color (orange) for links only.
 * Warm gray background.
 * Scattered component cards at different grid positions.
 */

// Grid Lines Component - renders visible vertical grid lines
function GridLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="max-w-[1400px] mx-auto h-full px-10 grid grid-cols-12 gap-5">
        {Array.from({ length: 13 }).map((_, i) => (
          <div
            key={i}
            className="h-full border-l border-[#e5e5e5]"
            style={{ gridColumn: i + 1 }}
          />
        ))}
      </div>
    </div>
  );
}

// Component Card - dark card showing component preview
function ComponentCard({
  name,
  category,
  children,
  className = '',
}: {
  name: string;
  category: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Labels */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#666]">{name}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#999]">{category}</span>
      </div>
      {/* Dark card */}
      <div className="bg-[#1a1a1a] rounded-lg p-6">
        {children}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-[#f5f5f3] min-h-screen relative">
      {/* Visible Grid Lines */}
      <GridLines />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-10">

        {/* Hero Section */}
        <section className="pt-32 pb-40">
          <div className="grid grid-cols-12 gap-5">

            {/* Left anchor - CTA */}
            <div className="col-span-2 pt-4">
              <Link
                href="/docs/installation"
                className="text-[11px] uppercase tracking-[0.2em] text-[#e85a2a] hover:underline block mb-2"
              >
                Get Started
              </Link>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#e85a2a] block">
                npx hyena init
              </span>
            </div>

            {/* Headline - offset to right */}
            <div className="col-span-8 col-start-4">
              <h1 className="font-serif text-[72px] md:text-[96px] leading-[0.95] text-[#1a1a1a] tracking-[-0.02em]">
                Universal components for React Native.
              </h1>
              <p className="mt-8 text-lg text-[#666] max-w-xl">
                Build once, ship everywhere. Production-ready components for iOS, Android, and Web.
              </p>
            </div>

          </div>
        </section>

        {/* Component Grid - Scattered Layout */}
        <section className="pb-40">
          <div className="grid grid-cols-12 gap-5">

            {/* Card 1 - Button (columns 7-10, row 1) */}
            <ComponentCard
              name="Button"
              category="Inputs"
              className="col-span-4 col-start-7"
            >
              <div className="space-y-3">
                <button className="w-full px-4 py-2.5 bg-white text-[#1a1a1a] text-sm rounded-lg font-medium">
                  Primary Button
                </button>
                <button className="w-full px-4 py-2.5 bg-transparent border border-white/20 text-white text-sm rounded-lg">
                  Secondary
                </button>
                <button className="w-full px-4 py-2.5 text-white/60 text-sm">
                  Ghost Button
                </button>
              </div>
            </ComponentCard>

            {/* Card 2 - Card (columns 1-3, row 2) */}
            <ComponentCard
              name="Card"
              category="Layout"
              className="col-span-3 col-start-1 mt-24"
            >
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-white text-sm font-medium">Card Title</div>
                <div className="text-white/50 text-xs mt-1">Supporting description text for this card component.</div>
                <button className="mt-4 text-[#e85a2a] text-xs">Learn more →</button>
              </div>
            </ComponentCard>

            {/* Card 3 - Toast (columns 9-12, row 2) */}
            <ComponentCard
              name="Toast"
              category="Feedback"
              className="col-span-4 col-start-9 mt-16"
            >
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm">Saved successfully</div>
                  <div className="text-white/40 text-xs">Your changes have been saved.</div>
                </div>
              </div>
            </ComponentCard>

            {/* Card 4 - Switch (columns 4-6, row 3) */}
            <ComponentCard
              name="Switch"
              category="Inputs"
              className="col-span-3 col-start-4 mt-20"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Notifications</span>
                  <div className="w-11 h-6 bg-[#e85a2a] rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Dark mode</span>
                  <div className="w-11 h-6 bg-white/20 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </ComponentCard>

            {/* Card 5 - Modal (columns 1-4, row 4) */}
            <ComponentCard
              name="Modal"
              category="Overlay"
              className="col-span-4 col-start-1 mt-16"
            >
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <div className="text-white font-medium">Confirm Action</div>
                <div className="text-white/50 text-sm mt-2">Are you sure you want to continue? This action cannot be undone.</div>
                <div className="flex gap-3 mt-5">
                  <button className="flex-1 px-4 py-2 bg-white/10 text-white text-sm rounded-lg">Cancel</button>
                  <button className="flex-1 px-4 py-2 bg-white text-[#1a1a1a] text-sm rounded-lg font-medium">Confirm</button>
                </div>
              </div>
            </ComponentCard>

            {/* Card 6 - Tabs (columns 8-11, row 4) */}
            <ComponentCard
              name="Tabs"
              category="Navigation"
              className="col-span-4 col-start-8 mt-32"
            >
              <div>
                <div className="flex border-b border-white/10">
                  <button className="px-4 py-2 text-white text-sm border-b-2 border-[#e85a2a]">Overview</button>
                  <button className="px-4 py-2 text-white/40 text-sm">Features</button>
                  <button className="px-4 py-2 text-white/40 text-sm">API</button>
                </div>
                <div className="pt-4 text-white/60 text-sm">
                  Tab content appears here. Switch between tabs to see different content.
                </div>
              </div>
            </ComponentCard>

            {/* Card 7 - Input (columns 5-8, row 5) */}
            <ComponentCard
              name="Input"
              category="Inputs"
              className="col-span-4 col-start-5 mt-20"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wider block mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30"
                    readOnly
                  />
                </div>
              </div>
            </ComponentCard>

            {/* Card 8 - Progress (columns 10-12, row 5) */}
            <ComponentCard
              name="Progress"
              category="Feedback"
              className="col-span-3 col-start-10 mt-8"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-white/50 mb-2">
                    <span>Uploading...</span>
                    <span>75%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full">
                    <div className="h-1.5 bg-[#e85a2a] rounded-full w-3/4" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/50 mb-2">
                    <span>Processing</span>
                    <span>40%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full">
                    <div className="h-1.5 bg-white/40 rounded-full w-2/5" />
                  </div>
                </div>
              </div>
            </ComponentCard>

          </div>
        </section>

        {/* Install Section */}
        <section className="pb-32">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-4 col-start-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#666] mb-4">Install</p>
              <code className="text-[#1a1a1a] font-mono text-lg">
                npm install @hyena-studio/react-native
              </code>
            </div>
            <div className="col-span-4 col-start-8 flex items-end">
              <Link
                href="/docs"
                className="text-[11px] uppercase tracking-[0.2em] text-[#e85a2a] hover:underline"
              >
                Read the documentation →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-[#e5e5e5]">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-2">
              <span className="text-[#1a1a1a] font-semibold">hyena</span>
            </div>
            <div className="col-span-6 col-start-7 flex items-center justify-end gap-8">
              <Link href="/docs" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors">
                Docs
              </Link>
              <Link href="/docs/components" className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors">
                Components
              </Link>
              <a
                href="https://github.com/ruidssimoes-rdss/hyena"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                GitHub
              </a>
              <span className="text-sm text-[#999]">
                Built by{' '}
                <a
                  href="https://github.com/ruidssimoes-rdss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e85a2a] hover:underline"
                >
                  Rui Simões
                </a>
              </span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
