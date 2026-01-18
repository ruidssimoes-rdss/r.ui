/**
 * Homepage - Editorial / Modern SaaS Style
 *
 * Clean, confident, slightly playful design inspired by Brixel.ai, Codexon, Orren.
 * - Paper-like background with subtle grid
 * - Bold typography
 * - Diagonal stripe dividers
 * - Tilted product showcase cards
 * - Stats section
 */
export default function HomePage() {
  return (
    <div className="home-page">
      {/* Diagonal stripe divider */}
      <div className="diagonal-stripes" />

      {/* Hero Section */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-4xl mx-auto text-center">
        {/* Announcement badge */}
        <div className="flex justify-center mb-8 animate-editorial">
          <div className="pill-badge">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span>45 components available</span>
            <a
              href="/docs/overview"
              className="text-[var(--home-accent)] font-medium hover:underline"
            >
              Explore →
            </a>
          </div>
        </div>

        {/* Main headline */}
        <h1
          className="
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            font-medium tracking-tight
            text-[var(--home-text)]
            leading-[1.1]
            mb-6
            animate-editorial-delay-1
          "
        >
          Beautiful components
          <br />
          for React Native
        </h1>

        {/* Subtext */}
        <p
          className="
            text-base md:text-lg
            text-[var(--home-text-secondary)]
            max-w-2xl mx-auto
            mb-10
            animate-editorial-delay-2
          "
        >
          r.ui is a collection of beautifully designed, accessible components
          for React Native — built for developers creating mobile apps at any
          scale.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-editorial-delay-3">
          <a href="/docs/components/button" className="btn-primary">
            Get Started
          </a>
          <a href="/docs/overview" className="btn-secondary">
            Browse Components
          </a>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="px-6 md:px-8 py-8 md:py-12 max-w-5xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden showcase-gradient p-6 md:p-10">
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 dot-pattern opacity-30" />

          {/* Tilted cards */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* Card 1 - tilted left */}
            <div className="dark-card tilt-left p-5 md:p-6 w-full max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400">●</span>
                  <span className="text-sm text-gray-300">
                    Button variants: primary, secondary, ghost
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-gray-300">
                    Fully accessible with ARIA support
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">◆</span>
                  <span className="text-sm text-gray-300">
                    NativeWind + TypeScript
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 - tilted right */}
            <div className="dark-card tilt-right p-5 md:p-6 w-full max-w-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-gray-500"># Install</div>
                <div className="text-white">npx r-ui add button</div>
                <div className="text-gray-500 mt-4"># Use</div>
                <div className="text-cyan-400">
                  {'<Button variant="primary">'}
                </div>
                <div className="text-white pl-4">Get Started</div>
                <div className="text-cyan-400">{'</Button>'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagonal stripe divider */}
      <div className="diagonal-stripes" />

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">45+</div>
            <div className="stat-label">Components</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">190+</div>
            <div className="stat-label">Storybook Stories</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">3</div>
            <div className="stat-label">Theme Variants</div>
          </div>
        </div>
      </section>

      {/* Diagonal stripe divider */}
      <div className="diagonal-stripes" />

      {/* Features Section */}
      <section className="px-6 md:px-8 py-16 md:py-20 max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="pill-badge">
            <span className="w-2 h-2 bg-[var(--home-text)] rounded-full" />
            <span className="uppercase text-xs tracking-wider font-medium">
              Features
            </span>
          </span>
        </div>

        <h2
          className="
            text-3xl md:text-4xl lg:text-5xl
            font-medium tracking-tight
            text-[var(--home-text)]
            leading-[1.1]
            mb-6
          "
        >
          What you get
          <br />
          with r.ui
        </h2>

        <p className="text-base md:text-lg text-[var(--home-text-secondary)] mb-12 max-w-2xl">
          From buttons to dialogs to data tables — everything you need to build
          beautiful React Native apps, without starting from scratch.
        </p>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {[
            {
              title: 'Universal',
              desc: 'Works on iOS, Android, and Web via React Native Web',
            },
            {
              title: 'Accessible',
              desc: 'Built with accessibility in mind from the ground up',
            },
            {
              title: 'Themeable',
              desc: 'Dark, light, and oatmeal themes out of the box',
            },
            {
              title: 'TypeScript',
              desc: 'Full TypeScript support with exported types',
            },
            {
              title: 'NativeWind',
              desc: 'Styled with Tailwind CSS via NativeWind',
            },
            {
              title: 'Copy & Paste',
              desc: 'Own your code — no hidden dependencies',
            },
          ].map((feature, i) => (
            <div key={i} className="dashed-box p-5 md:p-6">
              <h3 className="text-base md:text-lg font-medium text-[var(--home-text)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--home-text-secondary)]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Diagonal stripe divider */}
      <div className="diagonal-stripes" />

      {/* Footer */}
      <footer className="px-6 md:px-8 py-10 md:py-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[var(--home-text-muted)]">
          <div>Built by Rui. Inspired by Raycast & shadcn/ui.</div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ruidssimoes/r-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--home-text)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com/ruidssimoes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--home-text)] transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
