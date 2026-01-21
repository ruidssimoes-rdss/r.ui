'use client';

import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`
        hp-glass-card
        ${hover ? 'hp-glass-card-hover transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
