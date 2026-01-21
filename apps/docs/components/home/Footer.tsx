'use client';

import { useState } from 'react';

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm install @hyena-studio/react-native');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="py-16 px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Quick install */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 font-mono text-sm">
            <span className="text-gray-400">$</span>
            <span className="text-gray-900">npm install @hyena-studio/react-native</span>
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

        {/* Links and branding */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <span className="font-pixelify text-2xl text-gray-900">hyena</span>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a
              href="/docs"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Documentation
            </a>
            <a
              href="/docs/components/button"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Components
            </a>
            <a
              href="https://github.com/hyena-studio/hyena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
          </nav>

          {/* Credit */}
          <p className="text-sm text-gray-400">
            Built by{' '}
            <a
              href="https://github.com/ruidssimoes-rdss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Rui Simoes
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
