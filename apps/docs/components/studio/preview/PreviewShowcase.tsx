'use client';

import { useState } from 'react';
import { PreviewMode } from '@/lib/studio/types';

interface PreviewShowcaseProps {
  mode: PreviewMode;
}

// Icons
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Preview Block Component - Fixed size containers matching Figma (448x519.75)
function PreviewBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-[#737373] px-1.5 py-2">{label}</span>
      <div
        className="border border-dashed border-[#E5E5E5] bg-white flex items-center justify-center"
        style={{ width: '448px', height: '519.75px', padding: '24px' }}
      >
        {children}
      </div>
    </div>
  );
}

// ============================================
// r/ui-style Web Components for Preview
// These mimic r/ui's design system and respond to CSS variables
// ============================================

// Card Components (r/ui style)
function RuiCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        backgroundColor: 'var(--color-card)',
        boxShadow: '0px 0px 0px 1px rgba(10, 10, 10, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      {children}
    </div>
  );
}

function RuiCardHeader({ children, showMenu = false }: { children: React.ReactNode; showMenu?: boolean }) {
  return (
    <div className="px-6 pt-6 space-y-1 relative">
      {children}
      {showMenu && (
        <button
          className="absolute top-6 right-6 p-1 text-[#0A0A0A] hover:bg-[#F4F4F5] rounded transition-colors"
          title="More options"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      )}
    </div>
  );
}

function RuiCardContent({ children }: { children: React.ReactNode }) {
  return <div className="px-6 pt-4">{children}</div>;
}

function RuiCardFooter({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4 flex items-center gap-2">{children}</div>;
}

function RuiCardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
      {children}
    </h3>
  );
}

function RuiCardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
      {children}
    </p>
  );
}

// Button Component (r/ui style)
function RuiButton({
  children,
  variant = 'default',
  size = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm';
}) {
  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';

  const variantStyles: Record<string, { bg: string; text: string; border?: string }> = {
    default: { bg: 'var(--color-primary)', text: '#FAFAFA' },
    secondary: { bg: '#F4F4F5', text: '#18181B' },
    outline: { bg: 'transparent', text: 'var(--color-foreground)', border: '#E5E5E5' },
    ghost: { bg: 'transparent', text: 'var(--color-foreground)' },
  };

  const style = variantStyles[variant];

  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-opacity hover:opacity-90 ${sizeClasses}`}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: style.border ? `1px solid ${style.border}` : 'none',
      }}
    >
      {children}
    </button>
  );
}

// Badge Component (r/ui style)
function RuiBadge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}) {
  const variantStyles: Record<string, { bg: string; text: string; border?: string }> = {
    default: { bg: 'var(--color-primary)', text: '#FAFAFA' },
    secondary: { bg: '#F4F4F5', text: '#18181B' },
    outline: { bg: 'transparent', text: 'var(--color-foreground)', border: '#E5E5E5' },
    destructive: { bg: '#EF4444', text: '#FAFAFA' },
  };

  const style = variantStyles[variant];

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: style.border ? `1px solid ${style.border}` : 'none',
      }}
    >
      {children}
    </span>
  );
}

// Input Component (r/ui style)
function RuiInput({
  placeholder,
  value,
  onChange,
  multiline = false,
}: {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  multiline?: boolean;
}) {
  const baseStyle = {
    backgroundColor: 'var(--color-card)',
    borderColor: '#E5E5E5',
    color: 'var(--color-foreground)',
  };

  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
        style={baseStyle}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
      style={baseStyle}
    />
  );
}

// Switch Component (r/ui style)
function RuiSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      style={{
        backgroundColor: checked ? 'var(--color-primary)' : '#E5E5E5',
      }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
        style={{
          transform: checked ? 'translateX(22px)' : 'translateX(4px)',
        }}
      />
    </button>
  );
}

// Progress Component (r/ui style)
function RuiProgress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-[#E5E5E5] overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${value}%`,
          backgroundColor: 'var(--color-primary)',
        }}
      />
    </div>
  );
}

// Checkbox Component (r/ui style)
function RuiCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      className="h-4 w-4 rounded border flex items-center justify-center transition-colors"
      style={{
        backgroundColor: checked ? 'var(--color-primary)' : 'transparent',
        borderColor: checked ? 'var(--color-primary)' : '#E5E5E5',
      }}
    >
      {checked && <CheckIcon />}
    </button>
  );
}

// Slider Component (r/ui style)
function RuiSlider({
  value,
  onChange,
  max = 100,
}: {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  const percent = (value / max) * 100;

  return (
    <div className="relative h-2 w-full">
      <div className="absolute inset-0 rounded-full bg-[#E5E5E5]" />
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${percent}%`,
          backgroundColor: 'var(--color-primary)',
        }}
      />
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 shadow-sm pointer-events-none"
        style={{
          left: `calc(${percent}% - 8px)`,
          borderColor: 'var(--color-primary)',
        }}
      />
    </div>
  );
}

// ============================================
// Preview Components
// ============================================

// Card Preview
function CardPreview() {
  return (
    <div className="flex justify-center">
      <div className="w-96 max-w-full">
        <RuiCard>
          {/* Image Placeholder */}
          <div
            className="w-full relative overflow-hidden"
            style={{
              height: '180px',
              background: 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>
          <RuiCardHeader>
            <RuiCardTitle>Observability Plus is replacing Monitoring</RuiCardTitle>
            <RuiCardDescription>
              Switch to the improved way to explore your data, with natural language.
            </RuiCardDescription>
          </RuiCardHeader>
          <RuiCardFooter>
            <div className="flex items-center justify-between w-full">
              <RuiButton size="sm">
                <span className="flex items-center gap-1.5">
                  Create Query
                  <PlusIcon />
                </span>
              </RuiButton>
              <RuiBadge variant="secondary">Warning</RuiBadge>
            </div>
          </RuiCardFooter>
        </RuiCard>
      </div>
    </div>
  );
}

// Select Component (r/ui style)
function RuiSelect({ placeholder }: { placeholder?: string }) {
  return (
    <div
      className="w-full px-3 py-2 text-sm border rounded-lg flex items-center justify-between cursor-pointer"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor: '#E5E5E5',
        color: 'var(--color-muted-foreground)',
      }}
    >
      <span>{placeholder}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

// Form Preview
function FormPreview() {
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');

  return (
    <div className="w-full max-w-md">
      <RuiCard>
        <RuiCardHeader showMenu>
          <RuiCardTitle>User Information</RuiCardTitle>
          <RuiCardDescription>Please fill in your details below</RuiCardDescription>
        </RuiCardHeader>
        <RuiCardContent>
          <div className="space-y-4">
            {/* Name & Role Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  Name
                </label>
                <RuiInput placeholder="" value={name} onChange={setName} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  Role
                </label>
                <RuiSelect placeholder="Select a role" />
              </div>
            </div>

            {/* Framework */}
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                Framework
              </label>
              <RuiSelect placeholder="" />
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                Comments
              </label>
              <RuiInput
                placeholder=""
                value={comments}
                onChange={setComments}
                multiline
              />
            </div>
          </div>
        </RuiCardContent>
        <RuiCardFooter>
          <RuiButton>Submit</RuiButton>
          <RuiButton variant="outline">Cancel</RuiButton>
        </RuiCardFooter>
      </RuiCard>
    </div>
  );
}

// Settings Preview
function ComplexFormPreview() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const progress = 65;

  return (
    <div className="w-full max-w-md">
      <RuiCard>
        <RuiCardHeader>
          <RuiCardTitle>Account Settings</RuiCardTitle>
          <RuiCardDescription>Manage your preferences and notifications</RuiCardDescription>
        </RuiCardHeader>
        <RuiCardContent>
          <div className="space-y-5">
            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  Push Notifications
                </p>
                <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                  Receive alerts on your device
                </p>
              </div>
              <RuiSwitch checked={notifications} onChange={setNotifications} />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  Marketing Emails
                </p>
                <p className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                  Get product updates and offers
                </p>
              </div>
              <RuiSwitch checked={marketing} onChange={setMarketing} />
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  Profile Completion
                </span>
                <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                  {progress}%
                </span>
              </div>
              <RuiProgress value={progress} />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3">
              <RuiCheckbox checked={true} />
              <span className="text-sm" style={{ color: 'var(--color-foreground)' }}>
                I agree to the terms and conditions
              </span>
            </div>
          </div>
        </RuiCardContent>
      </RuiCard>
    </div>
  );
}

// Components Preview
function FieldsPreview() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="space-y-5">
      {/* Badges */}
      <div className="space-y-2">
        <p className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
          Status Badges
        </p>
        <div className="flex flex-wrap gap-2">
          <RuiBadge>Default</RuiBadge>
          <RuiBadge variant="secondary">Secondary</RuiBadge>
          <RuiBadge variant="outline">Outline</RuiBadge>
          <RuiBadge variant="destructive">Error</RuiBadge>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
            Volume Control
          </span>
          <span className="text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
            {sliderValue}%
          </span>
        </div>
        <RuiSlider value={sliderValue} onChange={setSliderValue} />
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <p className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
          Button Styles
        </p>
        <div className="flex flex-wrap gap-2">
          <RuiButton size="sm">Primary</RuiButton>
          <RuiButton size="sm" variant="secondary">Secondary</RuiButton>
          <RuiButton size="sm" variant="outline">Outline</RuiButton>
          <RuiButton size="sm" variant="ghost">Ghost</RuiButton>
        </div>
      </div>
    </div>
  );
}

export function PreviewShowcase({ mode }: PreviewShowcaseProps) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-8">
        <PreviewBlock label="Card">
          <CardPreview />
        </PreviewBlock>

        <PreviewBlock label="Complex Form">
          <ComplexFormPreview />
        </PreviewBlock>
      </div>

      {/* Right Column */}
      <div className="space-y-8">
        <PreviewBlock label="Form">
          <FormPreview />
        </PreviewBlock>

        <PreviewBlock label="Fields">
          <FieldsPreview />
        </PreviewBlock>
      </div>
    </div>
  );
}
