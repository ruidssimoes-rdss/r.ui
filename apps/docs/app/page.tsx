'use client';

import {
  Hero,
  PlatformBadges,
  ComponentGallery,
  FeatureGrid,
  ThemeShowcase,
  CodeExample,
  WhyHyena,
  Footer,
} from '../components/home';

/**
 * Homepage - Portfolio-Worthy Showcase
 *
 * Premium homepage showcasing Hyena as "shadcn/ui for React Native".
 * Features live component demos, theme showcase, and clear value proposition.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Platform Badges */}
      <PlatformBadges />

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* Live Component Gallery */}
      <ComponentGallery />

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Theme Showcase */}
      <ThemeShowcase />

      {/* Code Example */}
      <CodeExample />

      {/* Why Hyena */}
      <WhyHyena />

      {/* Footer */}
      <Footer />
    </main>
  );
}
