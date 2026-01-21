'use client';

import { useState } from 'react';
import { PlatformCard } from './PlatformCard';

function MiniButton() {
  return (
    <div className="px-3 py-1.5 bg-white/90 rounded-md text-[10px] font-medium text-zinc-900">
      Get Started
    </div>
  );
}

function MiniCard() {
  return (
    <div className="w-full p-2 bg-white/10 rounded-lg border border-white/10">
      <div className="h-2 w-12 bg-white/60 rounded mb-1" />
      <div className="h-1.5 w-16 bg-white/30 rounded" />
    </div>
  );
}

function MiniDialog() {
  return (
    <div className="w-full p-2 bg-white/10 rounded-lg border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <div className="h-2 w-10 bg-white/60 rounded" />
        <div className="h-3 w-3 rounded bg-white/20" />
      </div>
      <div className="flex gap-1 justify-end">
        <div className="px-2 py-1 bg-white/20 rounded text-[8px]">Cancel</div>
        <div className="px-2 py-1 bg-white/80 rounded text-[8px] text-black">OK</div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npm install @hyena-studio/react-native');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#050505]">
        {/* Noise texture */}
        <div className="hp-noise absolute inset-0" />

        {/* Ambient glow orbs */}
        <div className="ambient-glow absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
        <div
          className="ambient-glow absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-[100px]"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="ambient-glow absolute top-1/2 right-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Connection lines SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* iOS to center */}
        <path
          d="M200 250 Q400 250 600 400"
          stroke="url(#lineGradient1)"
          strokeWidth="1"
          fill="none"
          className="flow-line"
        />

        {/* Web to center */}
        <path
          d="M1000 250 Q800 250 600 400"
          stroke="url(#lineGradient1)"
          strokeWidth="1"
          fill="none"
          className="flow-line"
          style={{ animationDelay: '1s' }}
        />

        {/* Android to center */}
        <path
          d="M600 650 L600 400"
          stroke="url(#lineGradient2)"
          strokeWidth="1"
          fill="none"
          className="flow-line"
          style={{ animationDelay: '2s' }}
        />
      </svg>

      {/* Platform cards constellation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* iOS - top left */}
        <div className="absolute top-[15%] left-[10%] md:left-[15%] pointer-events-auto">
          <PlatformCard platform="ios">
            <MiniButton />
          </PlatformCard>
        </div>

        {/* Web - top right */}
        <div className="absolute top-[15%] right-[10%] md:right-[15%] pointer-events-auto">
          <PlatformCard platform="web">
            <MiniDialog />
          </PlatformCard>
        </div>

        {/* Android - bottom center */}
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 pointer-events-auto">
          <PlatformCard platform="android">
            <MiniCard />
          </PlatformCard>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Pixel logo */}
        <div className="mb-6 inline-flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="font-pixelify text-3xl text-white">h</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4">
          HYENA
        </h1>

        <p className="text-xl md:text-2xl text-white/60 mb-8 max-w-lg mx-auto">
          Universal React Native components.
          <br />
          Write once. Native everywhere.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="/docs"
            className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20"
          >
            Get Started
          </a>
          <a
            href="https://github.com/hyena-studio/hyena"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white/10 text-white font-medium rounded-xl border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        {/* Install command */}
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-3 backdrop-blur-sm">
          <span className="text-white/40 font-mono">$</span>
          <code className="text-white/80 font-mono text-sm">
            npm install @hyena-studio/react-native
          </code>
          <button
            onClick={handleCopy}
            className="ml-2 p-1.5 text-white/40 hover:text-white/60 hover:bg-white/10 rounded-md transition-colors"
            aria-label={copied ? 'Copied' : 'Copy command'}
          >
            {copied ? (
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
