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
  const mutedColor = mode === 'dark' ? '#71717a' : '#a1a1aa';
  const borderColor = mode === 'dark' ? '#27272a' : '#e5e5e5';
  const cardBg = mode === 'dark' ? '#18181b' : '#ffffff';
  const successColor = getColor('success');
  const errorColor = getColor('error');

  const radius = tokens.radius.base;

  return (
    <div className="w-full max-w-md space-y-6" style={{ color: textColor }}>
      {/* Buttons */}
      <section className="space-y-2">
        <div
          className="text-[10px] uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Buttons
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: brandColor, borderRadius: radius }}
          >
            Primary
          </button>
          <button
            className="px-3 py-1.5 text-xs font-medium border transition-opacity hover:opacity-80"
            style={{ borderColor, borderRadius: radius }}
          >
            Secondary
          </button>
          <button
            className="px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ borderRadius: radius }}
          >
            Ghost
          </button>
          <button
            className="px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: errorColor, borderRadius: radius }}
          >
            Destructive
          </button>
        </div>
      </section>

      {/* Input */}
      <section className="space-y-2">
        <div
          className="text-[10px] uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Input
        </div>
        <input
          type="text"
          placeholder="Enter your email..."
          className="w-full px-3 py-1.5 text-xs border bg-transparent outline-none"
          style={{ borderColor, borderRadius: radius }}
        />
      </section>

      {/* Card */}
      <section className="space-y-2">
        <div
          className="text-[10px] uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Card
        </div>
        <div
          className="p-3 border"
          style={{
            borderColor,
            borderRadius: radius,
            backgroundColor: cardBg,
          }}
        >
          <h3 className="text-sm font-medium">Card Title</h3>
          <p className="text-xs mt-1" style={{ color: mutedColor }}>
            This is the card description.
          </p>
          <button
            className="mt-2 px-2 py-1 text-[10px] font-medium transition-opacity hover:opacity-90"
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

      {/* Badge + Switch + Avatar Row */}
      <section className="space-y-2">
        <div
          className="text-[10px] uppercase tracking-wider"
          style={{ color: mutedColor }}
        >
          Badge / Switch / Avatar
        </div>
        <div className="flex items-center gap-4">
          {/* Badges */}
          <div className="flex gap-1">
            <span
              className="px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: brandColor,
                color: getContrastText(brandColor),
                borderRadius: radius * 0.5,
              }}
            >
              Default
            </span>
            <span
              className="px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: successColor,
                color: getContrastText(successColor),
                borderRadius: radius * 0.5,
              }}
            >
              Success
            </span>
          </div>

          {/* Switch */}
          <button
            onClick={() => setSwitchValue(!switchValue)}
            className="w-8 h-5 flex items-center p-0.5 transition-colors"
            style={{
              backgroundColor: switchValue ? brandColor : borderColor,
              borderRadius: 999,
            }}
          >
            <div
              className="w-4 h-4 bg-white transition-transform"
              style={{
                borderRadius: 999,
                transform: switchValue ? 'translateX(12px)' : 'translateX(0)',
              }}
            />
          </button>

          {/* Avatar */}
          <div
            className="w-8 h-8 flex items-center justify-center text-[10px] font-medium"
            style={{
              backgroundColor: brandColor,
              color: getContrastText(brandColor),
              borderRadius: radius,
            }}
          >
            JD
          </div>
        </div>
      </section>
    </div>
  );
}
