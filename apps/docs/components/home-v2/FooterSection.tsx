'use client';

import { useState } from 'react';

export function FooterSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm i @hyena-studio/react-native');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative py-20 bg-[#050505] border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="hp-noise absolute inset-0" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Pixel logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="font-pixelify text-xl text-white">h</span>
          </div>
        </div>

        {/* Install command */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <code className="text-sm text-white/70 font-mono">
              npm i @hyena-studio/react-native
            </code>
            {copied ? (
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-8 mb-12">
          <a
            href="/docs"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Docs
          </a>
          <a
            href="/docs/components"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Components
          </a>
          <a
            href="https://github.com/hyena-studio/hyena"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/hyenastudio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Twitter
          </a>
        </nav>

        {/* Credit */}
        <p className="text-center text-sm text-white/30">
          Built by{' '}
          <a
            href="https://github.com/ruidssimoes-rdss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors"
          >
            Rui Simões
          </a>
        </p>
      </div>
    </footer>
  );
}
