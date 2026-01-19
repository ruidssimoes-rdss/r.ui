'use client';

import { useState } from 'react';

/**
 * Homepage - Paso-inspired minimal white canvas
 *
 * - Confident typography
 * - Floating component previews
 * - Generous whitespace
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
      <section className="pt-32 pb-20 px-6 lg:px-48 text-center">
        {/* Eyebrow */}
        <p className="text-sm text-gray-400 mb-6">
          Built for solo founders and makers
        </p>

        {/* Main headline - large, confident */}
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 mb-6">
          Beautiful components
          <br />
          for React Native
        </h1>

        {/* Subheadline */}
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
          Copy, paste, ship. 45 accessible components that work on iOS, Android, and Web.
        </p>

        {/* Single CTA */}
        <a
          href="/docs/installation"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Get Started
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </section>

      {/* Floating Components - the "paso constellation" effect */}
      <section className="relative py-20 px-6 lg:px-48 overflow-hidden">
        <div className="relative max-w-5xl mx-auto h-[600px] md:h-[500px]">

          {/* Button preview - top left */}
          <div className="absolute top-0 left-0 md:left-4 bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <p className="text-xs text-gray-400 mb-4">Button</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">Primary</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm">Secondary</button>
            </div>
          </div>

          {/* Card preview - center right */}
          <div className="absolute top-32 md:top-20 right-0 bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 w-72 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <p className="text-xs text-gray-400 mb-4">Card</p>
            <div className="border border-gray-100 rounded-xl p-4">
              <h3 className="font-medium text-gray-900">Card Title</h3>
              <p className="text-sm text-gray-500 mt-1">This is a description of the card component.</p>
            </div>
          </div>

          {/* Dialog preview - bottom center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 w-80 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <p className="text-xs text-gray-400 mb-4">Dialog</p>
            <div className="border border-gray-100 rounded-xl p-4 text-center">
              <h3 className="font-medium text-gray-900">Confirm action?</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">This cannot be undone.</p>
              <div className="flex gap-2 justify-center">
                <button className="px-3 py-1.5 text-sm text-gray-500">Cancel</button>
                <button className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm">Confirm</button>
              </div>
            </div>
          </div>

          {/* Toast preview - top right offset */}
          <div className="absolute top-56 md:top-40 right-4 md:right-20 bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            <p className="text-xs text-gray-400 mb-3">Toast</p>
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Changes saved</span>
            </div>
          </div>

        </div>
      </section>

      {/* Stats - subtle, not shouting */}
      <section className="py-20 px-6 lg:px-48 border-t border-gray-100">
        <div className="max-w-3xl mx-auto flex justify-center gap-16 text-center">
          <div>
            <p className="text-3xl font-semibold text-gray-900">45+</p>
            <p className="text-sm text-gray-400 mt-1">Components</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900">360+</p>
            <p className="text-sm text-gray-400 mt-1">Story variations</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-900">100%</p>
            <p className="text-sm text-gray-400 mt-1">Accessible</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 lg:px-48 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Ready to build?
        </h2>
        <p className="text-gray-500 mb-8">
          Start with a single command.
        </p>
        <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-6 py-3 font-mono text-sm">
          <span className="text-gray-400">$</span>
          <span>npx r-ui init</span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-gray-600 transition-colors"
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
        <div className="flex justify-between items-center text-sm text-gray-400">
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
