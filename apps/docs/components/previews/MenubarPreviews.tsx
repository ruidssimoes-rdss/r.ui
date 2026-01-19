'use client';

import { useState } from 'react';

/**
 * Menubar Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function MenubarBasicPreview() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menus = {
    file: ['New File', 'Open...', 'Save', 'Save As...', null, 'Exit'],
    edit: ['Undo', 'Redo', null, 'Cut', 'Copy', 'Paste'],
    view: ['Zoom In', 'Zoom Out', null, 'Full Screen'],
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)]">
        {Object.entries(menus).map(([key, items]) => (
          <div key={key} className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === key ? null : key)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                openMenu === key
                  ? 'bg-[var(--component-bg-elevated)] text-[var(--component-text)]'
                  : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
            {openMenu === key && (
              <div className="absolute top-full left-0 mt-1 py-1 min-w-[160px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10">
                {items.map((item, i) =>
                  item === null ? (
                    <div key={i} className="my-1 h-px bg-[var(--component-border)]" />
                  ) : (
                    <button
                      key={i}
                      className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MenubarWithShortcutsPreview() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const items = [
    { label: 'New File', shortcut: '⌘N' },
    { label: 'Open...', shortcut: '⌘O' },
    { label: 'Save', shortcut: '⌘S' },
    { label: 'Save As...', shortcut: '⇧⌘S' },
    { label: null },
    { label: 'Close', shortcut: '⌘W' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)]">
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              openMenu === 'file'
                ? 'bg-[var(--component-bg-elevated)] text-[var(--component-text)]'
                : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
            }`}
          >
            File
          </button>
          {openMenu === 'file' && (
            <div className="absolute top-full left-0 mt-1 py-1 min-w-[200px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10">
              {items.map((item, i) =>
                item.label === null ? (
                  <div key={i} className="my-1 h-px bg-[var(--component-border)]" />
                ) : (
                  <button
                    key={i}
                    className="w-full px-3 py-1.5 text-sm text-left flex items-center justify-between text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[var(--component-text-muted)]">{item.shortcut}</span>
                  </button>
                )
              )}
            </div>
          )}
        </div>
        <button className="px-3 py-1.5 text-sm rounded-md text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors">
          Edit
        </button>
        <button className="px-3 py-1.5 text-sm rounded-md text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors">
          View
        </button>
      </div>
    </div>
  );
}

export function MenubarWithSubmenusPreview() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <div className="relative">
      <div className="flex items-center gap-1 p-1 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)]">
        <div className="relative">
          <button
            onClick={() => {
              setOpenMenu(openMenu === 'file' ? null : 'file');
              setOpenSubmenu(null);
            }}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              openMenu === 'file'
                ? 'bg-[var(--component-bg-elevated)] text-[var(--component-text)]'
                : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
            }`}
          >
            File
          </button>
          {openMenu === 'file' && (
            <div className="absolute top-full left-0 mt-1 py-1 min-w-[180px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10">
              <button className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
                New File
              </button>
              <div
                className="relative"
                onMouseEnter={() => setOpenSubmenu('recent')}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <button className="w-full px-3 py-1.5 text-sm text-left flex items-center justify-between text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
                  <span>Open Recent</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {openSubmenu === 'recent' && (
                  <div className="absolute left-full top-0 ml-1 py-1 min-w-[160px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg">
                    <button className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
                      Document.tsx
                    </button>
                    <button className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
                      styles.css
                    </button>
                    <button className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
                      config.json
                    </button>
                  </div>
                )}
              </div>
              <div className="my-1 h-px bg-[var(--component-border)]" />
              <button className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
                Exit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
