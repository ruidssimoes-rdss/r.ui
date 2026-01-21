'use client';

import { useState } from 'react';
import { ConstellationNode } from './ConstellationNode';

interface ComponentData {
  name: string;
  category: 'input' | 'display' | 'feedback' | 'layout' | 'navigation';
  position: { top: string; left: string };
  delay: number;
}

const components: ComponentData[] = [
  { name: 'Button', category: 'input', position: { top: '15%', left: '20%' }, delay: 0 },
  { name: 'Card', category: 'display', position: { top: '25%', left: '55%' }, delay: 0.2 },
  { name: 'Dialog', category: 'feedback', position: { top: '10%', left: '75%' }, delay: 0.4 },
  { name: 'Toast', category: 'feedback', position: { top: '35%', left: '85%' }, delay: 0.6 },
  { name: 'Select', category: 'input', position: { top: '45%', left: '25%' }, delay: 0.8 },
  { name: 'Sheet', category: 'navigation', position: { top: '55%', left: '65%' }, delay: 1.0 },
  { name: 'Tabs', category: 'navigation', position: { top: '20%', left: '40%' }, delay: 1.2 },
  { name: 'Input', category: 'input', position: { top: '65%', left: '45%' }, delay: 1.4 },
  { name: 'Switch', category: 'input', position: { top: '70%', left: '20%' }, delay: 1.6 },
  { name: 'Checkbox', category: 'input', position: { top: '50%', left: '50%' }, delay: 1.8 },
  { name: 'Accordion', category: 'display', position: { top: '75%', left: '75%' }, delay: 2.0 },
  { name: 'Menu', category: 'navigation', position: { top: '40%', left: '10%' }, delay: 2.2 },
  { name: 'Popover', category: 'feedback', position: { top: '60%', left: '90%' }, delay: 2.4 },
  { name: 'Avatar', category: 'display', position: { top: '80%', left: '35%' }, delay: 2.6 },
  { name: 'Badge', category: 'display', position: { top: '30%', left: '70%' }, delay: 2.8 },
  { name: 'Progress', category: 'feedback', position: { top: '85%', left: '60%' }, delay: 3.0 },
];

const categoryInfo = {
  input: { color: 'bg-blue-500', label: 'Input' },
  display: { color: 'bg-purple-500', label: 'Display' },
  feedback: { color: 'bg-green-500', label: 'Feedback' },
  layout: { color: 'bg-orange-500', label: 'Layout' },
  navigation: { color: 'bg-pink-500', label: 'Navigation' },
};

export function ConstellationSection() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="hp-noise absolute inset-0" />
        <div className="ambient-glow absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="ambient-glow absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8 px-6">
        <div className="flex items-baseline justify-center gap-3 mb-4">
          <span className="text-7xl md:text-9xl font-bold text-white">73</span>
          <span className="text-2xl md:text-3xl text-white/60 font-light">Components</span>
        </div>
        <p className="text-lg text-white/40 max-w-md mx-auto">
          A comprehensive library for every UI need
        </p>
      </div>

      {/* Category legend */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-12 px-6">
        {Object.entries(categoryInfo).map(([key, { color, label }]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-xs text-white/50">{label}</span>
          </div>
        ))}
      </div>

      {/* Constellation */}
      <div className="relative z-10 h-[400px] md:h-[500px] max-w-5xl mx-auto px-6">
        {/* Connection lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="constellationLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          {/* Random connection lines for visual effect */}
          <line x1="20" y1="15" x2="55" y2="25" stroke="url(#constellationLine)" strokeWidth="0.2" />
          <line x1="55" y1="25" x2="75" y2="10" stroke="url(#constellationLine)" strokeWidth="0.2" />
          <line x1="40" y1="20" x2="25" y2="45" stroke="url(#constellationLine)" strokeWidth="0.2" />
          <line x1="50" y1="50" x2="65" y2="55" stroke="url(#constellationLine)" strokeWidth="0.2" />
          <line x1="25" y1="45" x2="50" y2="50" stroke="url(#constellationLine)" strokeWidth="0.2" />
          <line x1="85" y1="35" x2="65" y2="55" stroke="url(#constellationLine)" strokeWidth="0.2" />
          <line x1="20" y1="70" x2="45" y2="65" stroke="url(#constellationLine)" strokeWidth="0.2" />
          <line x1="45" y1="65" x2="75" y2="75" stroke="url(#constellationLine)" strokeWidth="0.2" />
        </svg>

        {/* Component nodes */}
        {components.map((comp) => (
          <div
            key={comp.name}
            className="absolute"
            style={{ top: comp.position.top, left: comp.position.left }}
          >
            <ConstellationNode
              name={comp.name}
              category={comp.category}
              delay={comp.delay}
              href={`/docs/components/${comp.name.toLowerCase()}`}
              onHover={() => setHoveredComponent(comp.name)}
              onLeave={() => setHoveredComponent(null)}
            />
          </div>
        ))}

        {/* Hover preview (subtle) */}
        {hoveredComponent && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <span className="text-sm text-white/80 font-mono">{`<${hoveredComponent} />`}</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="relative z-10 text-center mt-12 px-6">
        <a
          href="/docs/components"
          className="inline-flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-all hover:bg-white/5"
        >
          Explore All Components
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
