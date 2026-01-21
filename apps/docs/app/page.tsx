'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Homepage v3 - Clean & Confident
 *
 * Minimal, calm homepage inspired by sort.to.
 * Lots of whitespace, simple features, no gimmicks.
 */

function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}

function PreviewCard({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white border border-gray-100">
      <div className="flex items-center justify-center min-h-[60px]">
        {children}
      </div>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
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
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
            Universal React Native Components
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Beautiful, accessible components for iOS, Android and Web.
            Copy, paste, ship.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs/installation"
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/docs/components"
              className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-gray-50/50 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Button */}
                <PreviewCard label="Button">
                  <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg">
                    Click me
                  </button>
                </PreviewCard>

                {/* Card */}
                <PreviewCard label="Card">
                  <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="h-2 w-16 bg-gray-300 rounded mb-2" />
                    <div className="h-2 w-12 bg-gray-200 rounded" />
                  </div>
                </PreviewCard>

                {/* Switch */}
                <PreviewCard label="Switch">
                  <div className="w-11 h-6 bg-gray-900 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                  </div>
                </PreviewCard>

                {/* Input */}
                <PreviewCard label="Input">
                  <div className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-400">
                    Placeholder...
                  </div>
                </PreviewCard>

                {/* Badge */}
                <PreviewCard label="Badge">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    New
                  </span>
                </PreviewCard>

                {/* Checkbox */}
                <PreviewCard label="Checkbox">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-900 rounded flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">Checked</span>
                  </div>
                </PreviewCard>

                {/* Avatar */}
                <PreviewCard label="Avatar">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    RS
                  </div>
                </PreviewCard>

                {/* Progress */}
                <PreviewCard label="Progress">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-gray-900 rounded-full" />
                  </div>
                </PreviewCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <FeatureItem
              title="Cross-platform"
              description="Write once, run on iOS, Android, and Web. Same components, native performance."
            />
            <FeatureItem
              title="4 Beautiful Themes"
              description="Dark, Light, Oatmeal, and Glass. Switch instantly, customize easily."
            />
            <FeatureItem
              title="Accessible"
              description="WCAG compliant. Screen reader tested. Keyboard navigable."
            />
            <FeatureItem
              title="Copy & Paste"
              description="No bloated dependencies. Copy the code, own it forever."
            />
          </div>
        </div>
      </section>

      {/* Install */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl bg-white border border-gray-200 p-4 flex items-center justify-between shadow-sm">
            <code className="text-sm md:text-base font-mono text-gray-800">
              <span className="text-gray-400">$</span> npm install @hyena-studio/react-native
            </code>
            <button
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={copied ? 'Copied' : 'Copy command'}
            >
              {copied ? (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900">73+</div>
              <div className="mt-1 text-sm text-gray-500">Components</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <div className="text-4xl font-bold text-gray-900">4</div>
              <div className="mt-1 text-sm text-gray-500">Themes</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div>
              <div className="text-4xl font-bold text-gray-900">100%</div>
              <div className="mt-1 text-sm text-gray-500">Accessible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-pixelify text-xl text-gray-900 mb-6">hyena</div>

          <nav className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <Link href="/docs" className="hover:text-gray-900 transition-colors">
              Docs
            </Link>
            <Link href="/docs/components" className="hover:text-gray-900 transition-colors">
              Components
            </Link>
            <a
              href="https://github.com/hyena-studio/hyena"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
          </nav>

          <p className="mt-8 text-sm text-gray-400">
            Built by{' '}
            <a
              href="https://github.com/ruidssimoes-rdss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Rui Simões
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
