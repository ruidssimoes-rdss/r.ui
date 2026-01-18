'use client';

interface FloatingPanelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * FloatingPanel Component
 *
 * Premium floating panel with deep glassmorphism, frosted effect, and elevation.
 * Creates a floating, lifted appearance with subtle shadows and inner glow.
 * Uses theme-aware variables for consistent appearance across all themes.
 *
 * Features:
 * - Translucent background with backdrop blur
 * - Multi-layer shadows for depth
 * - Inner glow/shine at top edge
 * - Smooth theme transitions
 */
export function FloatingPanel({ children, className = '' }: FloatingPanelProps) {
  return (
    <div
      className={`
        relative
        bg-[var(--floating-panel-bg)]
        rounded-2xl
        border border-[var(--floating-panel-border)]
        backdrop-blur-2xl
        transition-all duration-300
        ${className}
      `}
      style={{
        boxShadow: 'var(--floating-panel-shadow)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        backdropFilter: 'blur(40px) saturate(180%)',
      }}
    >
      {/* Top shine line for premium depth effect */}
      <div
        className="absolute top-0 left-[5%] right-[5%] h-px pointer-events-none rounded-full z-10"
        style={{
          background: 'var(--floating-panel-shine)',
        }}
      />

      {/* Inner glow overlay for frosted effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'var(--floating-panel-inner-glow)',
        }}
      />

      {/* Subtle bottom edge highlight for 3D depth */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] h-px pointer-events-none rounded-full"
        style={{
          background: 'var(--floating-panel-bottom-edge)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
