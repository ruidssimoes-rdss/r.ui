'use client';

import { useState } from 'react';

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npx hyena-studio init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-sm font-medium mb-8 animate-fade-in">
          <span className="mr-2">shadcn/ui for React Native</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in">
          Universal components for{' '}
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            iOS, Android & Web
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in">
          73+ production-ready React Native components. Copy, paste, ship.
          Beautiful by default, accessible always.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-in">
          <a
            href="/docs/installation"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-full text-base font-semibold hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </a>
          <a
            href="/docs/components/button"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-gray-300 rounded-full text-base font-semibold text-gray-700 hover:bg-gray-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Browse Components
          </a>
        </div>

        {/* Install command */}
        <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 font-mono text-sm animate-fade-in">
          <span className="text-gray-400">$</span>
          <span className="text-gray-900">npx hyena-studio init</span>
          <button
            onClick={handleCopy}
            className="ml-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
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
      </div>
    </section>
  );
}
