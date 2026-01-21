'use client';

interface FlowLineProps {
  className?: string;
  direction?: 'right' | 'down' | 'split';
  animated?: boolean;
}

export function FlowLine({ className = '', direction = 'right', animated = true }: FlowLineProps) {
  if (direction === 'right') {
    return (
      <svg
        className={`w-24 h-8 ${className}`}
        viewBox="0 0 96 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flowGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <path
          d="M0 16 H96"
          stroke="url(#flowGradientH)"
          strokeWidth="1"
          className={animated ? 'flow-line' : ''}
        />
        {/* Arrow */}
        <path
          d="M88 12 L96 16 L88 20"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    );
  }

  if (direction === 'split') {
    return (
      <svg
        className={`w-24 h-32 ${className}`}
        viewBox="0 0 96 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flowGradientSplit" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        {/* Center line */}
        <path
          d="M0 64 H48"
          stroke="url(#flowGradientSplit)"
          strokeWidth="1"
          className={animated ? 'flow-line' : ''}
        />
        {/* Top branch */}
        <path
          d="M48 64 Q72 64 72 32 H96"
          stroke="url(#flowGradientSplit)"
          strokeWidth="1"
          fill="none"
          className={animated ? 'flow-line' : ''}
          style={{ animationDelay: '0.2s' }}
        />
        {/* Middle branch */}
        <path
          d="M48 64 H96"
          stroke="url(#flowGradientSplit)"
          strokeWidth="1"
          className={animated ? 'flow-line' : ''}
          style={{ animationDelay: '0.4s' }}
        />
        {/* Bottom branch */}
        <path
          d="M48 64 Q72 64 72 96 H96"
          stroke="url(#flowGradientSplit)"
          strokeWidth="1"
          fill="none"
          className={animated ? 'flow-line' : ''}
          style={{ animationDelay: '0.6s' }}
        />
      </svg>
    );
  }

  return (
    <svg
      className={`w-8 h-24 ${className}`}
      viewBox="0 0 32 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flowGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <path
        d="M16 0 V96"
        stroke="url(#flowGradientV)"
        strokeWidth="1"
        className={animated ? 'flow-line' : ''}
      />
    </svg>
  );
}
