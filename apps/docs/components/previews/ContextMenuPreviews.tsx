'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * ContextMenu Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface MenuPosition {
  x: number;
  y: number;
}

export function ContextMenuBasicPreview() {
  const [menuPos, setMenuPos] = useState<MenuPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = () => setMenuPos(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMenuPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={handleContextMenu}
      className="relative w-full h-48 rounded-lg border-2 border-dashed border-[var(--component-border)] bg-[var(--component-bg)] flex items-center justify-center"
    >
      <p className="text-sm text-[var(--component-text-muted)]">Right-click anywhere in this area</p>
      {menuPos && (
        <div
          className="absolute py-1 min-w-[160px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10"
          style={{ left: menuPos.x, top: menuPos.y }}
        >
          {['Back', 'Forward', 'Reload', null, 'Save As...', 'Print...'].map((item, i) =>
            item === null ? (
              <div key={i} className="my-1 h-px bg-[var(--component-border)]" />
            ) : (
              <button
                key={i}
                onClick={() => setMenuPos(null)}
                className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] transition-colors"
              >
                {item}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export function ContextMenuWithIconsPreview() {
  const [menuPos, setMenuPos] = useState<MenuPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = () => setMenuPos(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMenuPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const items = [
    { icon: '✂️', label: 'Cut', shortcut: '⌘X' },
    { icon: '📋', label: 'Copy', shortcut: '⌘C' },
    { icon: '📄', label: 'Paste', shortcut: '⌘V' },
    { icon: null, label: null },
    { icon: '🗑️', label: 'Delete', shortcut: '⌫', destructive: true },
  ];

  return (
    <div
      ref={containerRef}
      onContextMenu={handleContextMenu}
      className="relative w-full h-48 rounded-lg border-2 border-dashed border-[var(--component-border)] bg-[var(--component-bg)] flex items-center justify-center"
    >
      <p className="text-sm text-[var(--component-text-muted)]">Right-click for context menu with icons</p>
      {menuPos && (
        <div
          className="absolute py-1 min-w-[180px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10"
          style={{ left: menuPos.x, top: menuPos.y }}
        >
          {items.map((item, i) =>
            item.label === null ? (
              <div key={i} className="my-1 h-px bg-[var(--component-border)]" />
            ) : (
              <button
                key={i}
                onClick={() => setMenuPos(null)}
                className={`w-full px-3 py-1.5 text-sm text-left flex items-center justify-between ${
                  item.destructive
                    ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20'
                    : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                } transition-colors`}
              >
                <span className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                <span className="text-xs text-[var(--component-text-muted)]">{item.shortcut}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export function ContextMenuNestedPreview() {
  const [menuPos, setMenuPos] = useState<MenuPosition | null>(null);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setMenuPos(null);
      setSubmenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMenuPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={handleContextMenu}
      className="relative w-full h-48 rounded-lg border-2 border-dashed border-[var(--component-border)] bg-[var(--component-bg)] flex items-center justify-center"
    >
      <p className="text-sm text-[var(--component-text-muted)]">Right-click for nested menu</p>
      {menuPos && (
        <div
          className="absolute py-1 min-w-[160px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg z-10"
          style={{ left: menuPos.x, top: menuPos.y }}
        >
          <button
            onClick={() => setMenuPos(null)}
            className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]"
          >
            New File
          </button>
          <div
            className="relative"
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            <button className="w-full px-3 py-1.5 text-sm text-left flex items-center justify-between text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
              <span>Share</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {submenuOpen && (
              <div className="absolute left-full top-0 ml-1 py-1 min-w-[140px] rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)] shadow-lg">
                <button className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
                  Email
                </button>
                <button className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
                  Message
                </button>
                <button className="w-full px-3 py-1.5 text-sm text-left text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]">
                  Copy Link
                </button>
              </div>
            )}
          </div>
          <div className="my-1 h-px bg-[var(--component-border)]" />
          <button
            onClick={() => setMenuPos(null)}
            className="w-full px-3 py-1.5 text-sm text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
