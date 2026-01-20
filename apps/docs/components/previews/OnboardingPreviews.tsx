'use client';

/**
 * Onboarding Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 */

import { useState } from 'react';

// Base styles
const containerStyles = 'flex flex-col bg-[var(--color-bg-base)] rounded-xl overflow-hidden border border-[var(--color-border-default)]';
const stepContainerStyles = 'flex-1 flex flex-col items-center justify-center p-6';
const titleStyles = 'text-2xl font-bold text-[var(--color-text-primary)] text-center mb-2';
const descriptionStyles = 'text-base text-[var(--color-text-secondary)] text-center max-w-xs';
const actionsStyles = 'flex flex-row items-center justify-between p-4 border-t border-[var(--color-border-default)]';

// Icon props type
interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Icon components
function LayersIcon({ size = 48, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function CheckSquareIcon({ size = 48, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function RocketIcon({ size = 48, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ArrowLeftIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

// Steps data
const steps = [
  {
    icon: LayersIcon,
    title: 'Welcome to AppName',
    description: 'Discover a better way to manage your tasks and boost your productivity.',
    color: 'var(--color-accent-blue)',
  },
  {
    icon: CheckSquareIcon,
    title: 'Powerful Features',
    description: 'Everything you need to stay organized and achieve your goals.',
    color: '#22c55e',
  },
  {
    icon: RocketIcon,
    title: 'Ready to Start?',
    description: "Let's get you set up in seconds. Your productivity journey begins now.",
    color: '#a855f7',
  },
];

// Dots component
function Dots({ current, total, variant = 'dots' }: { current: number; total: number; variant?: 'dots' | 'pills' | 'numbers' }) {
  return (
    <div className="flex flex-row items-center justify-center gap-2 py-4">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;

        if (variant === 'numbers') {
          return (
            <div
              key={i}
              className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
                transition-all duration-200
                ${isActive
                  ? 'bg-[var(--color-accent-blue)] text-white scale-110'
                  : 'bg-transparent border border-[var(--color-border-default)] text-[var(--color-text-secondary)]'
                }
              `}
            >
              {i + 1}
            </div>
          );
        }

        if (variant === 'pills') {
          return (
            <div
              key={i}
              className={`
                h-2 rounded-full transition-all duration-200
                ${isActive
                  ? 'w-6 bg-[var(--color-accent-blue)]'
                  : 'w-2 bg-[var(--color-border-default)] opacity-50'
                }
              `}
            />
          );
        }

        return (
          <div
            key={i}
            className={`
              w-2 h-2 rounded-full transition-all duration-200
              ${isActive
                ? 'bg-[var(--color-accent-blue)] scale-125'
                : 'bg-[var(--color-border-default)] opacity-50'
              }
            `}
          />
        );
      })}
    </div>
  );
}

// Progress bar component
function ProgressBar({ current, total, variant = 'bar' }: { current: number; total: number; variant?: 'bar' | 'segmented' }) {
  const progress = ((current + 1) / total) * 100;

  if (variant === 'segmented') {
    return (
      <div className="flex flex-row gap-1 px-4 py-4">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`
              flex-1 h-1.5 rounded-full transition-all duration-300
              ${i <= current
                ? 'bg-[var(--color-accent-blue)]'
                : 'bg-[var(--color-border-default)]'
              }
            `}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="h-1 rounded-full bg-[var(--color-border-default)] overflow-hidden">
        <div
          className="h-full bg-[var(--color-accent-blue)] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// === Preview Components ===

export function OnboardingBasicPreview() {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className={containerStyles} style={{ height: 400 }}>
      <div className={stepContainerStyles}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${currentStep.color}15` }}
        >
          <Icon size={48} className="opacity-80" style={{ stroke: currentStep.color }} />
        </div>
        <h2 className={titleStyles}>{currentStep.title}</h2>
        <p className={descriptionStyles}>{currentStep.description}</p>
      </div>

      <Dots current={step} total={steps.length} />

      <div className={actionsStyles}>
        <button
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
          onClick={() => setStep(steps.length - 1)}
        >
          Skip
        </button>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
        >
          {step === steps.length - 1 ? 'Get Started' : 'Next'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingPillsPreview() {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className={containerStyles} style={{ height: 400 }}>
      <div className={stepContainerStyles}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${currentStep.color}15` }}
        >
          <Icon size={48} className="opacity-80" style={{ stroke: currentStep.color }} />
        </div>
        <h2 className={titleStyles}>{currentStep.title}</h2>
        <p className={descriptionStyles}>{currentStep.description}</p>
      </div>

      <Dots current={step} total={steps.length} variant="pills" />

      <div className={actionsStyles}>
        <button
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
          onClick={() => setStep(steps.length - 1)}
        >
          Skip
        </button>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
        >
          {step === steps.length - 1 ? 'Get Started' : 'Continue'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingProgressPreview() {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className={containerStyles} style={{ height: 400 }}>
      <ProgressBar current={step} total={steps.length} />

      <div className={stepContainerStyles}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${currentStep.color}15` }}
        >
          <Icon size={48} className="opacity-80" style={{ stroke: currentStep.color }} />
        </div>
        <h2 className={titleStyles}>{currentStep.title}</h2>
        <p className={descriptionStyles}>{currentStep.description}</p>
      </div>

      <div className={actionsStyles}>
        {step > 0 ? (
          <button
            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            onClick={() => setStep(s => Math.max(s - 1, 0))}
          >
            <ArrowLeftIcon size={14} />
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
        >
          {step === steps.length - 1 ? 'Get Started' : 'Next'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingSegmentedPreview() {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className={containerStyles} style={{ height: 400 }}>
      <ProgressBar current={step} total={steps.length} variant="segmented" />

      <div className={stepContainerStyles}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${currentStep.color}15` }}
        >
          <Icon size={48} className="opacity-80" style={{ stroke: currentStep.color }} />
        </div>
        <h2 className={titleStyles}>{currentStep.title}</h2>
        <p className={descriptionStyles}>{currentStep.description}</p>
      </div>

      <div className={actionsStyles}>
        {step > 0 ? (
          <button
            className="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            onClick={() => setStep(s => Math.max(s - 1, 0))}
          >
            <ArrowLeftIcon size={14} />
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
        >
          {step === steps.length - 1 ? 'Finish Setup' : 'Continue'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingNumbersPreview() {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className={containerStyles} style={{ height: 400 }}>
      <div className={stepContainerStyles}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${currentStep.color}15` }}
        >
          <Icon size={48} className="opacity-80" style={{ stroke: currentStep.color }} />
        </div>
        <h2 className={titleStyles}>{currentStep.title}</h2>
        <p className={descriptionStyles}>{currentStep.description}</p>
      </div>

      <Dots current={step} total={steps.length} variant="numbers" />

      <div className={actionsStyles}>
        <div />
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
          onClick={() => setStep(s => Math.min(s + 1, steps.length - 1))}
        >
          {step === steps.length - 1 ? 'Get Started' : 'Next'}
          {step < steps.length - 1 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingMinimalPreview() {
  const [step, setStep] = useState(0);
  const titles = ['Welcome', 'Simple', 'Ready'];
  const descriptions = [
    'A minimalist onboarding experience.',
    'No distractions. Just what you need.',
    "Let's begin your journey.",
  ];

  return (
    <div className={containerStyles} style={{ height: 400 }}>
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-bold text-[var(--color-text-primary)] text-center mb-4">
          {titles[step]}
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] text-center max-w-sm">
          {descriptions[step]}
        </p>
      </div>

      <Dots current={step} total={3} variant="numbers" />

      <div className={actionsStyles}>
        <div />
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
          onClick={() => setStep(s => Math.min(s + 1, 2))}
        >
          {step === 2 ? 'Get Started' : 'Next'}
          {step < 2 && <ArrowRightIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

export function OnboardingAllIndicatorsPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">Dots (default)</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg p-4">
          <Dots current={0} total={4} variant="dots" />
        </div>
      </div>

      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">Pills</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg p-4">
          <Dots current={1} total={4} variant="pills" />
        </div>
      </div>

      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">Numbers</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg p-4">
          <Dots current={2} total={4} variant="numbers" />
        </div>
      </div>

      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">Progress Bar</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg">
          <ProgressBar current={2} total={4} variant="bar" />
        </div>
      </div>

      <div>
        <p className="text-sm text-[var(--color-text-secondary)] mb-3">Segmented Progress</p>
        <div className="bg-[var(--color-bg-surface)] rounded-lg">
          <ProgressBar current={1} total={4} variant="segmented" />
        </div>
      </div>
    </div>
  );
}
