'use client';

import { useState } from 'react';

/**
 * Homepage - Editorial + Command Palette Hero
 *
 * Mature, editorial style. The hero is a static Command (⌘K) palette
 * preview — the most impressive component that signals serious quality.
 */
export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npx r-ui init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-48 text-center">
        {/* Pill eyebrow */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm mb-6">
          Built for solo founders and makers
        </div>

        {/* Centered headline */}
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 mb-6">
          Beautiful components
          <br />
          for React Native
        </h1>

        {/* Centered description */}
        <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
          A growing collection of accessible, production-ready components
          that work on iOS, Android, and Web. Copy, paste, ship.
        </p>

        {/* Centered CTA */}
        <a
          href="/docs/get-started"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Get Started
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* Command Palette Preview */}
      <section className="py-20 px-6">
        {/* Static Command Palette */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-2xl shadow-gray-200/50 overflow-hidden max-w-lg mx-auto">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-gray-400 text-sm">Search components...</span>
            <div className="ml-auto flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">esc</kbd>
            </div>
          </div>

          {/* Results */}
          <div className="py-2">
            {/* Group: Suggestions */}
            <div className="px-3 py-1.5">
              <p className="text-xs text-gray-400 font-medium">Suggestions</p>
            </div>

            {/* Items */}
            <div className="px-2">
              <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-gray-50">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Command</p>
                  <p className="text-xs text-gray-500">⌘K palette for power users</p>
                </div>
                <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-400 rounded">↵</kbd>
              </div>

              <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sheet</p>
                  <p className="text-xs text-gray-500">Bottom sheet with snap points</p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Carousel</p>
                  <p className="text-xs text-gray-500">Swipeable image gallery</p>
                </div>
              </div>
            </div>

            {/* Group: Actions */}
            <div className="px-3 py-1.5 mt-2">
              <p className="text-xs text-gray-400 font-medium">Actions</p>
            </div>

            <div className="px-2">
              <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Add component</p>
                </div>
                <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-400 rounded">⌘N</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Press <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-500 rounded mx-1">⌘K</kbd> anywhere to try it
        </p>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 lg:px-48 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex justify-center gap-16 text-center">
          <div>
            <p className="text-2xl font-semibold text-gray-900">45+</p>
            <p className="text-sm text-gray-400 mt-1">Components</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">360+</p>
            <p className="text-sm text-gray-400 mt-1">Stories</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900">100%</p>
            <p className="text-sm text-gray-400 mt-1">Accessible</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 lg:px-48 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Ready to build?
        </h2>
        <p className="text-gray-500 mb-8">
          Start with a single command.
        </p>
        <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 font-mono text-sm">
          <span className="text-gray-400">$</span>
          <span className="text-gray-900">npx r-ui init</span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-600 ml-2 transition-colors"
            aria-label={copied ? 'Copied' : 'Copy command'}
          >
            {copied ? (
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-48 border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-sm text-gray-400">
          <span>r/ui</span>
          <div className="flex gap-6">
            <a
              href="https://github.com/ruidssimoes/r-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors"
            >
              GitHub
            </a>
            <a href="/docs" className="hover:text-gray-600 transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
