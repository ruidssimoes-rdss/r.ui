'use client';

import { useState } from 'react';

/**
 * Collapsible Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

function Collapsible({
  trigger,
  children,
  defaultOpen = false,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function CollapsibleBasicPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--component-text)]">
          @peduarte starred 3 repositories
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="p-1 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors"
        >
          <svg
            className={`w-4 h-4 text-[var(--component-text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-2">
          {['@radix-ui/primitives', '@radix-ui/colors', '@stitches/react'].map((repo) => (
            <div
              key={repo}
              className="px-4 py-3 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)]"
            >
              <span className="text-sm text-[var(--component-text)]">{repo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CollapsibleWithContentPreview() {
  return (
    <Collapsible
      defaultOpen
      trigger={
        <div className="flex items-center gap-2 p-3 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] hover:bg-[var(--component-bg-elevated)] transition-colors">
          <svg className="w-5 h-5 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span className="text-sm font-medium text-[var(--component-text)]">Project Files</span>
          <svg className="w-4 h-4 ml-auto text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      }
    >
      <div className="ml-6 mt-1 space-y-1">
        {['index.tsx', 'styles.css', 'utils.ts', 'types.ts'].map((file) => (
          <div
            key={file}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm text-[var(--component-text)]">{file}</span>
          </div>
        ))}
      </div>
    </Collapsible>
  );
}

export function CollapsibleFAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: 'Is it accessible?', a: 'Yes. It adheres to the WAI-ARIA design pattern.' },
    { q: 'Is it unstyled?', a: 'Yes. It comes with no styles by default, giving you full control.' },
    { q: 'Can it be animated?', a: 'Yes! You can animate the Collapsible with CSS or a JavaScript animation library.' },
  ];

  return (
    <div className="space-y-2 w-full max-w-md">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-lg border border-[var(--component-border)] overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--component-bg-elevated)] transition-colors"
          >
            <span className="text-sm font-medium text-[var(--component-text)]">{faq.q}</span>
            <svg
              className={`w-4 h-4 text-[var(--component-text-muted)] transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === i ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="px-4 pb-4 text-sm text-[var(--component-text-muted)]">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
