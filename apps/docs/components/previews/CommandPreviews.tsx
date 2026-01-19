'use client';

import { useState } from 'react';

/**
 * Command Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function CommandBasicPreview() {
  const [search, setSearch] = useState('');

  const items = [
    { icon: '📄', label: 'New File', shortcut: '⌘N' },
    { icon: '📁', label: 'New Folder', shortcut: '⌘⇧N' },
    { icon: '🔍', label: 'Search', shortcut: '⌘F' },
    { icon: '⚙️', label: 'Settings', shortcut: '⌘,' },
  ];

  const filtered = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-md rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 border-b border-[var(--component-border)]">
        <svg className="w-4 h-4 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type a command or search..."
          className="flex-1 py-3 bg-transparent text-sm text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] focus:outline-none"
        />
      </div>
      <div className="p-2 max-h-64 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="py-4 text-center text-sm text-[var(--component-text-muted)]">No results found.</p>
        ) : (
          filtered.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </span>
              <span className="text-xs text-[var(--component-text-muted)]">{item.shortcut}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export function CommandWithGroupsPreview() {
  const [search, setSearch] = useState('');

  const groups = [
    {
      label: 'Suggestions',
      items: [
        { icon: '📝', label: 'New Document' },
        { icon: '📊', label: 'New Spreadsheet' },
      ],
    },
    {
      label: 'Settings',
      items: [
        { icon: '👤', label: 'Profile' },
        { icon: '🔔', label: 'Notifications' },
        { icon: '🔒', label: 'Privacy' },
      ],
    },
  ];

  return (
    <div className="w-full max-w-md rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 border-b border-[var(--component-border)]">
        <svg className="w-4 h-4 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 py-3 bg-transparent text-sm text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] focus:outline-none"
        />
      </div>
      <div className="p-2 max-h-72 overflow-y-auto">
        {groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-2' : ''}>
            <p className="px-2 py-1.5 text-xs font-medium text-[var(--component-text-muted)]">
              {group.label}
            </p>
            {group.items.map((item, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CommandDialogPreview() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const items = [
    { icon: '🏠', label: 'Home', shortcut: 'G H' },
    { icon: '📦', label: 'Components', shortcut: 'G C' },
    { icon: '📖', label: 'Documentation', shortcut: 'G D' },
    { icon: '⚙️', label: 'Settings', shortcut: '⌘ ,' },
    { icon: '🌙', label: 'Toggle Theme', shortcut: '⌘ T' },
  ];

  const filtered = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] text-sm text-[var(--component-text-muted)] hover:bg-[var(--component-bg-elevated)] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search...</span>
        <kbd className="ml-2 px-1.5 py-0.5 rounded bg-[var(--component-bg-elevated)] text-xs font-mono">⌘K</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg mx-4 rounded-xl border border-[var(--component-border)] bg-[var(--component-bg)] shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 border-b border-[var(--component-border)]">
              <svg className="w-4 h-4 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                autoFocus
                className="flex-1 py-4 bg-transparent text-sm text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] focus:outline-none"
              />
              <button
                onClick={() => setOpen(false)}
                className="px-2 py-1 rounded text-xs text-[var(--component-text-muted)] hover:bg-[var(--component-bg-elevated)]"
              >
                ESC
              </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="py-6 text-center text-sm text-[var(--component-text-muted)]">No results found.</p>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </span>
                    <span className="text-xs text-[var(--component-text-muted)] font-mono">{item.shortcut}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
