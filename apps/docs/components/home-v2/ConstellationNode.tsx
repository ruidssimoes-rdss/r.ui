'use client';

import { useState } from 'react';

interface ConstellationNodeProps {
  name: string;
  category: 'input' | 'display' | 'feedback' | 'layout' | 'navigation';
  delay?: number;
  onHover?: () => void;
  onLeave?: () => void;
  href?: string;
}

const categoryColors = {
  input: 'bg-blue-500',
  display: 'bg-purple-500',
  feedback: 'bg-green-500',
  layout: 'bg-orange-500',
  navigation: 'bg-pink-500',
};

export function ConstellationNode({
  name,
  category,
  delay = 0,
  onHover,
  onLeave,
  href = '#',
}: ConstellationNodeProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave?.();
  };

  return (
    <a
      href={href}
      className="constellation-node group relative inline-flex flex-col items-center"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect on hover */}
      <div
        className={`
          absolute -inset-4 rounded-full transition-opacity duration-300
          ${categoryColors[category]}/20 blur-xl
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Node dot */}
      <div
        className={`
          relative w-3 h-3 rounded-full transition-all duration-300
          ${categoryColors[category]}
          ${isHovered ? 'scale-150 shadow-lg' : 'scale-100'}
        `}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-white/30 blur-[2px]" />
      </div>

      {/* Label */}
      <span
        className={`
          mt-2 text-xs font-medium transition-all duration-300
          ${isHovered ? 'text-white' : 'text-white/50'}
        `}
      >
        {name}
      </span>
    </a>
  );
}
