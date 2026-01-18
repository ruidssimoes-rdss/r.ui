'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * Dropdown Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const buttonStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] px-4 py-2 text-sm';

type MenuItem =
  | {
      label: string;
      icon?: React.ReactNode;
      shortcut?: string;
      disabled?: boolean;
      danger?: boolean;
      separator?: false;
    }
  | {
      separator: true;
      label?: never;
      icon?: never;
      shortcut?: never;
      disabled?: never;
      danger?: never;
    };

function Dropdown({
  trigger,
  items,
  align = 'start',
}: {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'start' | 'end';
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={`
            absolute top-full mt-1 z-50 min-w-[180px] py-1
            rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] shadow-lg
            animate-in fade-in zoom-in-95 duration-150
            ${align === 'end' ? 'right-0' : 'left-0'}
          `}
        >
          {items.map((item, index) =>
            item.separator ? (
              <div key={index} className="my-1 h-px bg-[var(--component-border)]" />
            ) : (
              <button
                key={index}
                disabled={item.disabled}
                onClick={() => setOpen(false)}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors
                  ${item.disabled
                    ? 'text-[var(--component-text-muted)] cursor-not-allowed'
                    : item.danger
                      ? 'text-red-500 hover:bg-red-500/10'
                      : 'text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)]'
                  }
                `}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="text-xs text-[var(--component-text-muted)]">{item.shortcut}</span>
                )}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export function DropdownBasicPreview() {
  return (
    <Dropdown
      trigger={
        <button className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
          Open Menu
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      }
      items={[
        { label: 'Profile', shortcut: '⌘P' },
        { label: 'Settings', shortcut: '⌘S' },
        { label: 'Keyboard shortcuts', shortcut: '⌘K' },
        { separator: true },
        { label: 'Team' },
        { label: 'Invite users' },
        { separator: true },
        { label: 'Log out', danger: true },
      ]}
    />
  );
}

export function DropdownWithIconsPreview() {
  return (
    <Dropdown
      trigger={
        <button className="p-2 rounded-md hover:bg-[var(--component-bg-elevated)] transition-colors">
          <svg className="w-5 h-5 text-[var(--component-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      }
      align="end"
      items={[
        {
          label: 'Edit',
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          ),
        },
        {
          label: 'Duplicate',
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          label: 'Archive',
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          ),
        },
        { separator: true },
        {
          label: 'Delete',
          danger: true,
          icon: (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ),
        },
      ]}
    />
  );
}

export function DropdownDisabledItemsPreview() {
  return (
    <Dropdown
      trigger={
        <button className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}>
          Actions
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      }
      items={[
        { label: 'New file' },
        { label: 'New folder' },
        { separator: true },
        { label: 'Share', disabled: true },
        { label: 'Download' },
        { separator: true },
        { label: 'Move to trash', danger: true },
      ]}
    />
  );
}
