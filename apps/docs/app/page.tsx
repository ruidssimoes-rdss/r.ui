'use client';

import {
  HeroSection,
  FlowSection,
  ConstellationSection,
  ThemeSection,
  CodeSection,
  FooterSection,
} from '../components/home-v2';

/**
 * Homepage v2 - Memorable & Unique
 *
 * A dark, atmospheric homepage that creates a memorable visual experience.
 * Features flowing light lines, platform constellation, and dramatic theme transitions.
 */
export default function HomePage() {
  return (
    <main className="homepage-root">
      {/* Hero - Atmospheric opening with platform constellation */}
      <HeroSection />

      {/* Flow - Horizontal showcase: Code → Component → Platforms */}
      <FlowSection />

      {/* Constellation - Components floating in space like stars */}
      <ConstellationSection />

      {/* Theme - Dramatic transformation between themes */}
      <ThemeSection />

      {/* Code - Cinematic terminal presentation */}
      <CodeSection />

      {/* Footer - Minimal and impactful */}
      <FooterSection />
    </main>
  );
}
