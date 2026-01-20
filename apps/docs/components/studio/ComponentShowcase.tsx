'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/studio-context';
import { getContrastText } from '@/lib/studio/color-utils';

interface ComponentShowcaseProps {
  mode: 'light' | 'dark';
}

export function ComponentShowcase({ mode }: ComponentShowcaseProps) {
  const { state } = useStudio();
  const { tokens } = state;
  const [switchValue, setSwitchValue] = useState(true);

  // Get colors by name
  const getColor = (name: string) => {
    return tokens.colors.find((c) => c.name === name)?.value || '#888888';
  };

  const brandColor = getColor('brand');
  const textColor = mode === 'dark' ? '#fafafa' : getColor('text');
  const mutedColor = mode === 'dark' ? '#a1a1aa' : '#71717a';
  const borderColor = mode === 'dark' ? '#27272a' : '#e5e5e5';
  const cardBg = mode === 'dark' ? '#18181b' : '#ffffff';
  const successColor = getColor('success');
  const errorColor = getColor('error');

  const radius = tokens.radius.base;

  return (
    <div className="space-y-8 w-full max-w-2xl" style={{ color: textColor }}>
      {/* Buttons */}
      <section className="space-y-3">
        <div
          className="text-xs uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Buttons
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: brandColor, borderRadius: radius }}
          >
            Primary
          </button>
          <button
            className="px-4 py-2 text-sm font-medium border transition-opacity hover:opacity-80"
            style={{ borderColor, borderRadius: radius, color: textColor }}
          >
            Secondary
          </button>
          <button
            className="px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ borderRadius: radius, color: textColor }}
          >
            Ghost
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: errorColor, borderRadius: radius }}
          >
            Destructive
          </button>
        </div>
      </section>

      {/* Input */}
      <section className="space-y-3">
        <div
          className="text-xs uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Input
        </div>
        <input
          type="text"
          placeholder="Enter your email..."
          className="w-full max-w-xs px-3 py-2 text-sm border bg-transparent outline-none focus:ring-2 focus:ring-offset-1"
          style={{
            borderColor,
            borderRadius: radius,
            color: textColor,
            // @ts-expect-error CSS variable
            '--tw-ring-color': brandColor,
          }}
        />
      </section>

      {/* Card */}
      <section className="space-y-3">
        <div
          className="text-xs uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Card
        </div>
        <div
          className="p-4 border"
          style={{
            borderColor,
            borderRadius: radius,
            backgroundColor: cardBg,
          }}
        >
          <h3 className="font-medium">Card Title</h3>
          <p className="text-sm mt-1" style={{ color: mutedColor }}>
            This is the card description with some content.
          </p>
          <button
            className="mt-3 px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: brandColor,
              color: getContrastText(brandColor),
              borderRadius: radius * 0.75,
            }}
          >
            Action
          </button>
        </div>
      </section>

      {/* Badge */}
      <section className="space-y-3">
        <div
          className="text-xs uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Badge
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className="px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: brandColor,
              color: getContrastText(brandColor),
              borderRadius: radius * 0.75,
            }}
          >
            Default
          </span>
          <span
            className="px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: successColor,
              color: getContrastText(successColor),
              borderRadius: radius * 0.75,
            }}
          >
            Success
          </span>
          <span
            className="px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: errorColor,
              color: getContrastText(errorColor),
              borderRadius: radius * 0.75,
            }}
          >
            Error
          </span>
        </div>
      </section>

      {/* Switch */}
      <section className="space-y-3">
        <div
          className="text-xs uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Switch
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSwitchValue(!switchValue)}
            className="w-10 h-6 flex items-center p-1 transition-colors"
            style={{
              backgroundColor: switchValue ? brandColor : borderColor,
              borderRadius: 999,
            }}
          >
            <div
              className="w-4 h-4 bg-white transition-transform"
              style={{
                borderRadius: 999,
                transform: switchValue ? 'translateX(16px)' : 'translateX(0)',
              }}
            />
          </button>
          <span className="text-sm">{switchValue ? 'Enabled' : 'Disabled'}</span>
        </div>
      </section>

      {/* Avatar */}
      <section className="space-y-3">
        <div
          className="text-xs uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Avatar
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center font-medium"
            style={{
              backgroundColor: brandColor,
              color: getContrastText(brandColor),
              borderRadius: radius,
            }}
          >
            JD
          </div>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-xs" style={{ color: mutedColor }}>
              @johndoe
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
