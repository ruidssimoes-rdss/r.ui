'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Homepage v5 - MercuryOS Aesthetic + Practical Messaging
 *
 * MercuryOS's calm, elegant aesthetic — light gray background,
 * floating UI cards, bold typography, generous whitespace.
 * Combined with Sort.to's practical hero structure.
 */

// Icons
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm install @hyena-studio/react-native');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#e5e5e5]">
      {/* SECTION 1: Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline - large, light weight */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1a1a1a] leading-tight">
            Universal React Native Components
          </h1>

          {/* Subheadline - smaller, muted */}
          <p className="mt-6 text-lg md:text-xl text-[#666666] max-w-xl mx-auto">
            Beautiful, accessible components for iOS, Android and Web. Copy, paste, ship.
          </p>

          {/* Single CTA */}
          <div className="mt-10">
            <Link
              href="/docs/installation"
              className="inline-flex items-center px-8 py-3 bg-[#1a1a1a] text-white rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDownIcon className="w-6 h-6 text-[#999] animate-bounce" />
        </div>
      </section>

      {/* SECTION 2: Floating Component Showcase */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Floating cards - staggered layout */}
          <div className="relative h-[500px] md:h-[600px]">

            {/* Card 1 - Button variants */}
            <div className="absolute top-0 left-0 md:left-12 bg-white rounded-2xl shadow-xl p-6 w-64">
              <div className="text-xs text-[#999] uppercase tracking-wide mb-4">Button</div>
              <div className="flex flex-col gap-3">
                <button className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg text-sm">Primary</button>
                <button className="px-4 py-2 bg-transparent border border-[#ddd] rounded-lg text-sm text-[#1a1a1a]">Outline</button>
                <button className="px-4 py-2 bg-[#f5f5f5] rounded-lg text-sm text-[#1a1a1a]">Secondary</button>
              </div>
            </div>

            {/* Card 2 - Card component */}
            <div className="absolute top-12 right-0 md:right-8 bg-white rounded-2xl shadow-xl p-6 w-72">
              <div className="text-xs text-[#999] uppercase tracking-wide mb-4">Card</div>
              <div className="border border-[#eee] rounded-xl p-4">
                <div className="font-medium text-[#1a1a1a]">Project Update</div>
                <div className="text-sm text-[#666] mt-1">Your deployment is complete.</div>
                <button className="mt-4 text-sm text-[#1a1a1a] font-medium">View Details →</button>
              </div>
            </div>

            {/* Card 3 - Dialog */}
            <div className="absolute bottom-24 left-8 md:left-24 bg-white rounded-2xl shadow-xl p-6 w-64">
              <div className="text-xs text-[#999] uppercase tracking-wide mb-4">Dialog</div>
              <div className="bg-[#fafafa] rounded-xl p-4 text-center">
                <div className="font-medium text-sm text-[#1a1a1a]">Confirm action?</div>
                <div className="text-xs text-[#666] mt-2">This cannot be undone.</div>
                <div className="flex gap-2 mt-4 justify-center">
                  <button className="px-3 py-1.5 text-xs border border-[#ddd] rounded-lg text-[#1a1a1a]">Cancel</button>
                  <button className="px-3 py-1.5 text-xs bg-[#1a1a1a] text-white rounded-lg">Confirm</button>
                </div>
              </div>
            </div>

            {/* Card 4 - Toast */}
            <div className="absolute bottom-8 right-12 md:right-32 bg-white rounded-2xl shadow-xl p-4 w-56">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1a1a1a]">Saved!</div>
                  <div className="text-xs text-[#666]">Changes saved successfully.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Vision Statement */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-[#1a1a1a] leading-relaxed">
            Hyena is a complete component library for React Native — designed to work seamlessly across iOS, Android, and Web from a single codebase.
          </p>
        </div>
      </section>

      {/* SECTION 4: Features (2x2 Grid with Separators) */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">

            {/* Feature 1 */}
            <div className="border-t border-[#ccc] pt-6">
              <h3 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-4">
                Universal.
              </h3>
              <p className="text-[#666] leading-relaxed">
                Write once, deploy to iOS, Android, and Web. Same components, native performance, consistent experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border-t border-[#ccc] pt-6">
              <h3 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-4">
                Accessible.
              </h3>
              <p className="text-[#666] leading-relaxed">
                WCAG compliant, screen reader tested, keyboard navigable. Built for everyone from the start.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border-t border-[#ccc] pt-6">
              <h3 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-4">
                Themeable.
              </h3>
              <p className="text-[#666] leading-relaxed">
                Four built-in themes: Dark, Light, Oatmeal, and Glass. Switch instantly, customize endlessly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border-t border-[#ccc] pt-6">
              <h3 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-4">
                Yours.
              </h3>
              <p className="text-[#666] leading-relaxed">
                No runtime dependencies. Copy the source into your project. Modify it, own it, ship it.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: Install */}
      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 inline-flex items-center gap-4">
            <code className="text-sm md:text-base font-mono text-[#1a1a1a]">
              npm install @hyena-studio/react-native
            </code>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
              aria-label={copied ? 'Copied' : 'Copy command'}
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 text-green-600" />
              ) : (
                <CopyIcon className="w-4 h-4 text-[#666]" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: Footer */}
      <footer className="py-16 px-6 border-t border-[#ccc]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-xl font-medium text-[#1a1a1a]">hyena</div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-[#666]">
            <Link href="/docs" className="hover:text-[#1a1a1a] transition-colors">
              Docs
            </Link>
            <Link href="/docs/components" className="hover:text-[#1a1a1a] transition-colors">
              Components
            </Link>
            <a
              href="https://github.com/ruidssimoes-rdss/hyena"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1a1a1a] transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Credit */}
          <div className="text-sm text-[#666]">
            Built by{' '}
            <a
              href="https://github.com/ruidssimoes-rdss"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1a1a1a] transition-colors"
            >
              Rui Simoes
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
