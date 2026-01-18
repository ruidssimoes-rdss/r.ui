'use client';

import { useState } from 'react';

/**
 * Tooltip Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const buttonStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] px-4 py-2 text-sm';

function Tooltip({
  children,
  content,
  side = 'top',
}: {
  children: React.ReactNode;
  content: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}) {
  const [show, setShow] = useState(false);

  const sideStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[var(--btn-primary-bg)]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[var(--btn-primary-bg)]',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[var(--btn-primary-bg)]',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[var(--btn-primary-bg)]',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={`
            absolute z-50 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap
            bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]
            animate-in fade-in zoom-in-95 duration-150
            ${sideStyles[side]}
          `}
        >
          {content}
          <span
            className={`absolute w-0 h-0 border-4 ${arrowStyles[side]}`}
          />
        </div>
      )}
    </div>
  );
}

export function TooltipBasicPreview() {
  return (
    <Tooltip content="Add to library">
      <button className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
        Hover me
      </button>
    </Tooltip>
  );
}

export function TooltipSidesPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8">
      <Tooltip content="Top tooltip" side="top">
        <button className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
          Top
        </button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <button className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
          Bottom
        </button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <button className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
          Left
        </button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <button className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
          Right
        </button>
      </Tooltip>
    </div>
  );
}

export function TooltipWithIconsPreview() {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="Bold">
        <button className="p-2 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors">
          <svg className="w-5 h-5 text-[var(--component-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h8a4 4 0 100-8H6v8zm0 0h10a4 4 0 110 8H6v-8z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Italic">
        <button className="p-2 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors">
          <svg className="w-5 h-5 text-[var(--component-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Underline">
        <button className="p-2 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors">
          <svg className="w-5 h-5 text-[var(--component-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8v8a5 5 0 0010 0V8M5 21h14" />
          </svg>
        </button>
      </Tooltip>
      <div className="w-px h-6 bg-[var(--component-border)]" />
      <Tooltip content="Align left">
        <button className="p-2 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors">
          <svg className="w-5 h-5 text-[var(--component-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Align center">
        <button className="p-2 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors">
          <svg className="w-5 h-5 text-[var(--component-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 12h10M4 18h16" />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
}
