'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Carousel Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const slides = [
  { color: 'from-blue-500 to-purple-600', label: 'Slide 1' },
  { color: 'from-emerald-500 to-cyan-500', label: 'Slide 2' },
  { color: 'from-orange-500 to-red-500', label: 'Slide 3' },
  { color: 'from-pink-500 to-rose-500', label: 'Slide 4' },
];

export function CarouselBasicPreview() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <div className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`min-w-full aspect-video bg-gradient-to-br ${slide.color} flex items-center justify-center`}
            >
              <span className="text-white text-xl font-semibold">{slide.label}</span>
            </div>
          ))}
        </div>
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
        >
          <svg className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
        >
          <svg className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function CarouselWithDotsPreview() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`min-w-full aspect-video bg-gradient-to-br ${slide.color} flex items-center justify-center`}
            >
              <span className="text-white text-xl font-semibold">{slide.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? 'bg-[var(--track-fill)]' : 'bg-[var(--component-border)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function CarouselWithArrowsPreview() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-[var(--component-border)] hover:bg-[var(--component-bg-elevated)] flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-[var(--component-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`min-w-full aspect-video bg-gradient-to-br ${slide.color} flex items-center justify-center`}
              >
                <span className="text-white text-xl font-semibold">{slide.label}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-[var(--component-border)] hover:bg-[var(--component-bg-elevated)] flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-[var(--component-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="text-center mt-3 text-sm text-[var(--component-text-muted)]">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}

export function CarouselAutoplayPreview() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [paused, next]);

  return (
    <div className="w-full max-w-md">
      <div
        className="relative overflow-hidden rounded-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`min-w-full aspect-video bg-gradient-to-br ${slide.color} flex items-center justify-center`}
            >
              <span className="text-white text-xl font-semibold">{slide.label}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-xs">
          {paused ? 'Paused' : 'Auto-playing'}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? 'bg-[var(--track-fill)]' : 'bg-[var(--component-border)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
