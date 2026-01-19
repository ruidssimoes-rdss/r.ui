'use client';

import { useState } from 'react';

/**
 * NavigationMenu Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function NavigationMenuBasicPreview() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="relative">
      <div className="flex items-center gap-1">
        <div
          className="relative"
          onMouseEnter={() => setOpenMenu('getting-started')}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] rounded-lg transition-colors">
            Getting Started
            <svg className={`w-4 h-4 transition-transform ${openMenu === 'getting-started' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openMenu === 'getting-started' && (
            <div className="absolute top-full left-0 mt-1 p-4 w-[400px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10">
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="block p-3 rounded-lg hover:bg-[var(--component-bg-elevated)] transition-colors">
                  <div className="font-medium text-sm text-[var(--component-text)]">Introduction</div>
                  <p className="text-xs text-[var(--component-text-muted)] mt-1">Learn the basics of r/ui</p>
                </a>
                <a href="#" className="block p-3 rounded-lg hover:bg-[var(--component-bg-elevated)] transition-colors">
                  <div className="font-medium text-sm text-[var(--component-text)]">Installation</div>
                  <p className="text-xs text-[var(--component-text-muted)] mt-1">Get started in your project</p>
                </a>
                <a href="#" className="block p-3 rounded-lg hover:bg-[var(--component-bg-elevated)] transition-colors">
                  <div className="font-medium text-sm text-[var(--component-text)]">Typography</div>
                  <p className="text-xs text-[var(--component-text-muted)] mt-1">Styles for headings and text</p>
                </a>
                <a href="#" className="block p-3 rounded-lg hover:bg-[var(--component-bg-elevated)] transition-colors">
                  <div className="font-medium text-sm text-[var(--component-text)]">Theming</div>
                  <p className="text-xs text-[var(--component-text-muted)] mt-1">Customize the look and feel</p>
                </a>
              </div>
            </div>
          )}
        </div>
        <div
          className="relative"
          onMouseEnter={() => setOpenMenu('components')}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] rounded-lg transition-colors">
            Components
            <svg className={`w-4 h-4 transition-transform ${openMenu === 'components' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openMenu === 'components' && (
            <div className="absolute top-full left-0 mt-1 py-2 min-w-[180px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10">
              {['Button', 'Input', 'Select', 'Dialog', 'Toast'].map(item => (
                <a
                  key={item}
                  href="#"
                  className="block px-4 py-2 text-sm text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
        <a href="#" className="px-4 py-2 text-sm font-medium text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] rounded-lg transition-colors">
          Documentation
        </a>
      </div>
    </nav>
  );
}

export function NavigationMenuWithIndicatorPreview() {
  const [active, setActive] = useState('home');
  const items = ['Home', 'Products', 'About', 'Contact'];

  return (
    <nav className="relative">
      <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)]">
        {items.map(item => {
          const key = item.toLowerCase();
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                active === key
                  ? 'text-[var(--track-fill)]'
                  : 'text-[var(--component-text)] hover:text-[var(--track-fill)]'
              }`}
            >
              {item}
              {active === key && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-[var(--track-fill)] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
