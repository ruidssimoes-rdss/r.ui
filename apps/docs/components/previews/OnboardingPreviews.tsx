'use client';

/**
 * Onboarding Previews for Docs
 *
 * White frosted glass onboarding previews with warm neutral background.
 * Features:
 * - Glassmorphic card: rgba(255, 255, 255, 0.65) + backdrop blur
 * - Warm oatmeal background: #E8E4DF
 * - Clean typography with Pixelify Sans logo
 * - Smooth animations and micro-interactions
 * - Drag/swipe gesture support
 * - Keyboard navigation (arrow keys)
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// ============================================================================
// Design Tokens - White Frosted Glass Theme
// ============================================================================

const theme = {
  // Background
  bg: {
    page: '#E8E4DF',
    glass: 'rgba(255, 255, 255, 0.65)',
    glassBorder: 'rgba(255, 255, 255, 0.8)',
    feature: 'rgba(0, 0, 0, 0.03)',
    featureHover: 'rgba(0, 0, 0, 0.05)',
    iconBox: '#ffffff',
    iconBoxBorder: 'rgba(0, 0, 0, 0.06)',
  },
  // Text
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    muted: '#888888',
    label: '#999999',
    link: '#aaaaaa',
  },
  // Buttons
  button: {
    primary: '#1a1a1a',
    primaryHover: '#333333',
    secondary: 'rgba(0, 0, 0, 0.04)',
    secondaryHover: 'rgba(0, 0, 0, 0.08)',
  },
  // Dots/Progress
  dots: {
    inactive: 'rgba(0, 0, 0, 0.15)',
    active: '#1a1a1a',
  },
  // Shadow
  shadow: {
    card: '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
  },
};

// ============================================================================
// Content for r/ui Onboarding
// ============================================================================

const steps = [
  {
    id: 'welcome',
    label: 'Welcome',
    title: 'Build once,',
    titleAccent: 'ship everywhere',
    description: 'Production-ready React Native components for iOS, Android, and web.',
    features: [
      {
        icon: 'phone',
        title: 'Cross-platform',
        desc: 'iOS, Android, Web',
      },
      {
        icon: 'layers',
        title: '73+ Components',
        desc: 'Ready to use',
      },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    title: 'Accessible',
    titleAccent: 'by default',
    description: 'Every component follows WCAG guidelines and platform conventions.',
    features: [
      {
        icon: 'clock',
        title: 'Ship faster',
        desc: 'Pre-built and tested',
      },
      {
        icon: 'eye',
        title: 'WCAG compliant',
        desc: 'AA standard',
      },
    ],
  },
  {
    id: 'install',
    label: 'Install',
    title: 'One command',
    titleAccent: 'to get started',
    description: 'Add components individually or set up the full library.',
    features: [
      {
        icon: 'terminal',
        title: 'npx r-ui init',
        desc: 'Quick setup',
      },
      {
        icon: 'file',
        title: 'Documentation',
        desc: 'Guides & examples',
      },
    ],
  },
];

// ============================================================================
// Icons
// ============================================================================

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function getIcon(name: string) {
  switch (name) {
    case 'phone': return <PhoneIcon />;
    case 'layers': return <LayersIcon />;
    case 'clock': return <ClockIcon />;
    case 'eye': return <EyeIcon />;
    case 'terminal': return <TerminalIcon />;
    case 'file': return <FileIcon />;
    default: return <LayersIcon />;
  }
}

// ============================================================================
// Hook for swipe/drag gestures and keyboard navigation
// ============================================================================

function useSwipeNavigation(
  totalSteps: number,
  step: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const goToNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }, [totalSteps, setStep]);

  const goToPrevious = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, [setStep]);

  // Keyboard navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Mouse/touch drag handlers
  const handleDragStart = useCallback((clientX: number) => {
    dragStartX.current = clientX;
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (dragStartX.current === null) return;
    const diff = clientX - dragStartX.current;
    const resistance = (step === 0 && diff > 0) || (step === totalSteps - 1 && diff < 0) ? 0.3 : 1;
    setDragOffset(diff * resistance);
  }, [step, totalSteps]);

  const handleDragEnd = useCallback(() => {
    if (dragStartX.current === null) return;

    const threshold = 50;
    if (dragOffset > threshold && step > 0) {
      goToPrevious();
    } else if (dragOffset < -threshold && step < totalSteps - 1) {
      goToNext();
    }

    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  }, [dragOffset, step, totalSteps, goToNext, goToPrevious]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  }, [handleDragStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  }, [handleDragMove]);

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) handleDragEnd();
  }, [isDragging, handleDragEnd]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  }, [handleDragStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  return {
    containerRef,
    dragOffset,
    isDragging,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}

// ============================================================================
// CSS Keyframes
// ============================================================================

const keyframesCSS = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// ============================================================================
// Progress Dots Component
// ============================================================================

function ProgressDots({
  current,
  total,
  variant = 'pills',
  onDotClick,
}: {
  current: number;
  total: number;
  variant?: 'dots' | 'pills' | 'numbers' | 'line';
  onDotClick?: (index: number) => void;
}) {
  if (variant === 'line') {
    return (
      <div className="flex items-center gap-2 py-5 px-7">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onDotClick?.(i)}
            className="relative h-1 flex-1 rounded-full overflow-hidden transition-all duration-300"
            style={{ backgroundColor: theme.dots.inactive }}
            aria-label={`Go to step ${i + 1}`}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
              style={{
                width: i <= current ? '100%' : '0%',
                background: theme.dots.active,
              }}
            />
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'numbers') {
    return (
      <div className="flex items-center justify-center gap-3 py-5">
        {Array.from({ length: total }, (_, i) => {
          const isActive = i === current;
          const isPast = i < current;
          return (
            <button
              key={i}
              onClick={() => onDotClick?.(i)}
              className="relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300"
              style={{
                background: isActive ? theme.dots.active : 'transparent',
                border: `1px solid ${isActive || isPast ? theme.dots.active : theme.dots.inactive}`,
                color: isActive ? '#ffffff' : theme.text.secondary,
              }}
              aria-label={`Go to step ${i + 1}`}
            >
              {isPast ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex items-center justify-center gap-1.5 py-5">
        {Array.from({ length: total }, (_, i) => {
          const isActive = i === current;
          return (
            <button
              key={i}
              onClick={() => onDotClick?.(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: '6px',
                height: '6px',
                background: isActive ? theme.dots.active : theme.dots.inactive,
              }}
              aria-label={`Go to step ${i + 1}`}
            />
          );
        })}
      </div>
    );
  }

  // Default: pills
  return (
    <div className="flex items-center justify-center gap-1.5 py-5">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        return (
          <button
            key={i}
            onClick={() => onDotClick?.(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: isActive ? '20px' : '6px',
              background: isActive ? theme.dots.active : theme.dots.inactive,
            }}
            aria-label={`Go to step ${i + 1}`}
          />
        );
      })}
    </div>
  );
}

// ============================================================================
// Feature Row Component
// ============================================================================

function FeatureRow({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-200"
      style={{ background: theme.bg.feature }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: theme.bg.iconBox,
          border: `1px solid ${theme.bg.iconBoxBorder}`,
          color: theme.text.primary,
        }}
      >
        {getIcon(icon)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium" style={{ color: theme.text.primary }}>
          {title}
        </p>
        <p className="text-xs" style={{ color: theme.text.muted }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Preview Component - White Frosted Glass
// ============================================================================

function GlassOnboardingPreview({
  dotsVariant = 'pills',
  showHeader = true,
  showSkip = true,
}: {
  dotsVariant?: 'dots' | 'pills' | 'numbers' | 'line';
  showHeader?: boolean;
  showSkip?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const currentStep = steps[step];

  const { containerRef, dragOffset, isDragging, handlers } = useSwipeNavigation(
    steps.length,
    step,
    (newStep) => {
      if (typeof newStep === 'function') {
        setStep((s) => {
          const next = newStep(s);
          if (next !== s) setAnimationKey((k) => k + 1);
          return next;
        });
      } else {
        if (newStep !== step) setAnimationKey((k) => k + 1);
        setStep(newStep);
      }
    }
  );

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleDotClick = (i: number) => {
    if (i !== step) {
      setStep(i);
      setAnimationKey((k) => k + 1);
    }
  };

  const handleSkip = () => {
    setStep(steps.length - 1);
    setAnimationKey((k) => k + 1);
  };

  const isLastStep = step === steps.length - 1;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />

      {/* Warm neutral background */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center p-6 rounded-2xl select-none overflow-hidden"
        style={{
          height: 520,
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(200, 190, 180, 0.3) 0%, transparent 50%),
            ${theme.bg.page}
          `,
        }}
        tabIndex={0}
        {...handlers}
      >
        {/* White Frosted Glass Card */}
        <div
          className="relative w-full max-w-[400px] rounded-[20px] overflow-hidden"
          style={{
            background: theme.bg.glass,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: `1px solid ${theme.bg.glassBorder}`,
            boxShadow: theme.shadow.card,
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {/* Header */}
          {showHeader && (
            <header className="flex items-center justify-between px-7 pt-7">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-lg font-semibold tracking-tight"
                  style={{
                    fontFamily: "'Pixelify Sans', monospace",
                    color: theme.text.primary,
                    letterSpacing: '-0.3px',
                  }}
                >
                  r/ui
                </span>
              </div>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ background: 'rgba(0, 0, 0, 0.05)' }}
                aria-label="Close"
              >
                <span style={{ color: '#666666' }}>
                  <CloseIcon />
                </span>
              </button>
            </header>
          )}

          {/* Content */}
          <main className="px-7 pt-10 pb-8">
            <div
              key={`content-${animationKey}`}
              style={{
                animation: 'fadeIn 0.3s ease',
              }}
            >
              {/* Step label */}
              <p
                className="text-[11px] font-semibold uppercase tracking-wider mb-3"
                style={{ color: theme.text.label, letterSpacing: '1px' }}
              >
                {currentStep.label}
              </p>

              {/* Title */}
              <h2
                className="text-2xl font-semibold leading-tight mb-3"
                style={{ color: theme.text.primary, letterSpacing: '-0.3px' }}
              >
                {currentStep.title}
                <br />
                <span style={{ color: theme.text.muted }}>{currentStep.titleAccent}</span>
              </h2>

              {/* Description */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: theme.text.secondary }}
              >
                {currentStep.description}
              </p>

              {/* Features */}
              <div className="mt-7 flex flex-col gap-3">
                {currentStep.features.map((feature, i) => (
                  <FeatureRow
                    key={i}
                    icon={feature.icon}
                    title={feature.title}
                    desc={feature.desc}
                  />
                ))}
              </div>
            </div>
          </main>

          {/* Progress Dots */}
          <ProgressDots
            current={step}
            total={steps.length}
            variant={dotsVariant}
            onDotClick={handleDotClick}
          />

          {/* Navigation Buttons */}
          <footer className="flex gap-2.5 px-5 pb-5">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="flex-1 px-5 py-3 rounded-[10px] text-[13px] font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: theme.button.secondary,
                color: theme.text.secondary,
              }}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-5 py-3 rounded-[10px] text-[13px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5"
              style={{
                background: theme.button.primary,
                color: '#ffffff',
              }}
            >
              {isLastStep ? 'Get Started' : 'Continue'}
              {!isLastStep && <ArrowRightIcon />}
            </button>
          </footer>

          {/* Skip Link */}
          {showSkip && !isLastStep && (
            <div className="text-center pb-5">
              <button
                onClick={handleSkip}
                className="text-xs transition-colors duration-200"
                style={{ color: theme.text.link }}
              >
                Skip intro
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================================================
// Exported Preview Components
// ============================================================================

export function OnboardingBasicPreview() {
  return <GlassOnboardingPreview dotsVariant="pills" />;
}

export function OnboardingPillsPreview() {
  return <GlassOnboardingPreview dotsVariant="pills" />;
}

export function OnboardingProgressPreview() {
  return <GlassOnboardingPreview dotsVariant="line" />;
}

export function OnboardingSegmentedPreview() {
  return <GlassOnboardingPreview dotsVariant="line" />;
}

export function OnboardingNumbersPreview() {
  return <GlassOnboardingPreview dotsVariant="numbers" />;
}

export function OnboardingMinimalPreview() {
  return <GlassOnboardingPreview dotsVariant="dots" showHeader={false} showSkip={false} />;
}

export function OnboardingAllIndicatorsPreview() {
  const [dotsStep, setDotsStep] = useState(0);
  const [pillsStep, setPillsStep] = useState(1);
  const [numbersStep, setNumbersStep] = useState(2);
  const [lineStep, setLineStep] = useState(1);

  return (
    <div
      className="flex flex-col gap-6 p-6 rounded-2xl"
      style={{
        background: `
          radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(200, 190, 180, 0.3) 0%, transparent 50%),
          ${theme.bg.page}
        `,
      }}
    >
      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Dots
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: theme.bg.glass,
            backdropFilter: 'blur(24px)',
            border: `1px solid ${theme.bg.glassBorder}`,
          }}
        >
          <ProgressDots current={dotsStep} total={4} variant="dots" onDotClick={setDotsStep} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Pills (default)
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: theme.bg.glass,
            backdropFilter: 'blur(24px)',
            border: `1px solid ${theme.bg.glassBorder}`,
          }}
        >
          <ProgressDots current={pillsStep} total={4} variant="pills" onDotClick={setPillsStep} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Numbers
        </p>
        <div
          className="rounded-xl p-4"
          style={{
            background: theme.bg.glass,
            backdropFilter: 'blur(24px)',
            border: `1px solid ${theme.bg.glassBorder}`,
          }}
        >
          <ProgressDots current={numbersStep} total={4} variant="numbers" onDotClick={setNumbersStep} />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-4" style={{ color: theme.text.secondary }}>
          Line Progress
        </p>
        <div
          className="rounded-xl"
          style={{
            background: theme.bg.glass,
            backdropFilter: 'blur(24px)',
            border: `1px solid ${theme.bg.glassBorder}`,
          }}
        >
          <ProgressDots current={lineStep} total={4} variant="line" onDotClick={setLineStep} />
        </div>
      </div>
    </div>
  );
}
