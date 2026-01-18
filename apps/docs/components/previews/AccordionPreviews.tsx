'use client';

import { useState } from 'react';

/**
 * Accordion Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`h-4 w-4 text-[var(--component-text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Accordion({
  items,
  allowMultiple = false,
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
}) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="w-full divide-y divide-[var(--component-border)] border border-[var(--component-border)] rounded-lg overflow-hidden">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div key={item.id}>
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[var(--component-bg-elevated)] transition-colors"
            >
              <span className="text-sm font-medium text-[var(--component-text)]">{item.title}</span>
              <ChevronIcon isOpen={isOpen} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-4 pb-4 text-sm text-[var(--component-text-muted)]">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AccordionBasicPreview() {
  return (
    <Accordion
      items={[
        {
          id: '1',
          title: 'Is it accessible?',
          content: 'Yes. It adheres to the WAI-ARIA design pattern.',
        },
        {
          id: '2',
          title: 'Is it styled?',
          content: 'Yes. It comes with default styles that match your design system.',
        },
        {
          id: '3',
          title: 'Is it animated?',
          content: 'Yes. It uses CSS transitions for smooth open/close animations.',
        },
      ]}
    />
  );
}

export function AccordionMultiplePreview() {
  return (
    <Accordion
      allowMultiple
      items={[
        {
          id: '1',
          title: 'Can I open multiple items?',
          content: 'Yes! This accordion allows multiple items to be open at once.',
        },
        {
          id: '2',
          title: 'How does it work?',
          content: 'Each item toggles independently without closing other items.',
        },
        {
          id: '3',
          title: 'When should I use this?',
          content: 'Use multiple mode when users need to compare content across sections.',
        },
      ]}
    />
  );
}

export function AccordionWithContentPreview() {
  return (
    <Accordion
      items={[
        {
          id: 'getting-started',
          title: 'Getting Started',
          content: (
            <div className="space-y-2">
              <p>To get started with r.ui, install the package:</p>
              <code className="block p-2 rounded bg-[var(--component-bg-elevated)] text-xs">
                npm install @r-ui/react-native
              </code>
            </div>
          ),
        },
        {
          id: 'components',
          title: 'Available Components',
          content: (
            <ul className="list-disc list-inside space-y-1">
              <li>Button - Trigger actions</li>
              <li>Input - Text input fields</li>
              <li>Switch - Toggle controls</li>
              <li>Checkbox - Multiple selection</li>
            </ul>
          ),
        },
        {
          id: 'theming',
          title: 'Theming',
          content: (
            <p>
              r.ui supports dark, light, and oatmeal themes out of the box.
              Colors automatically adjust based on your theme preference.
            </p>
          ),
        },
      ]}
    />
  );
}
