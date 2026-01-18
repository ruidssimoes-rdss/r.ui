'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * Popover Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const buttonStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] px-4 py-2 text-sm';

function Popover({
  trigger,
  children,
  align = 'center',
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
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

  const alignStyles = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={`
            absolute top-full mt-2 z-50
            min-w-[200px] p-4 rounded-lg
            bg-[var(--component-bg)] border border-[var(--component-border)] shadow-lg
            animate-in fade-in zoom-in-95 duration-150
            ${alignStyles[align]}
          `}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function PopoverBasicPreview() {
  return (
    <Popover
      trigger={
        <button className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
          Open Popover
        </button>
      }
    >
      <div className="space-y-2">
        <h4 className="font-medium text-sm text-[var(--component-text)]">Dimensions</h4>
        <p className="text-sm text-[var(--component-text-muted)]">
          Set the dimensions for the layer.
        </p>
      </div>
    </Popover>
  );
}

export function PopoverWithFormPreview() {
  return (
    <Popover
      trigger={
        <button className={`${buttonStyles} bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]`}>
          Update dimensions
        </button>
      }
    >
      <div className="space-y-4 w-64">
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-[var(--component-text)]">Dimensions</h4>
          <p className="text-xs text-[var(--component-text-muted)]">
            Set the dimensions for the layer.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-[var(--component-text)]">Width</label>
            <input
              type="text"
              defaultValue="100%"
              className="mt-1 w-full px-2 py-1.5 text-sm rounded border bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] focus:outline-none focus:ring-1 focus:ring-[var(--track-fill)]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--component-text)]">Max. width</label>
            <input
              type="text"
              defaultValue="300px"
              className="mt-1 w-full px-2 py-1.5 text-sm rounded border bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] focus:outline-none focus:ring-1 focus:ring-[var(--track-fill)]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--component-text)]">Height</label>
            <input
              type="text"
              defaultValue="25px"
              className="mt-1 w-full px-2 py-1.5 text-sm rounded border bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] focus:outline-none focus:ring-1 focus:ring-[var(--track-fill)]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--component-text)]">Max. height</label>
            <input
              type="text"
              defaultValue="none"
              className="mt-1 w-full px-2 py-1.5 text-sm rounded border bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--input-text)] focus:outline-none focus:ring-1 focus:ring-[var(--track-fill)]"
            />
          </div>
        </div>
      </div>
    </Popover>
  );
}

export function PopoverMenuPreview() {
  return (
    <Popover
      align="start"
      trigger={
        <button className={`${buttonStyles} bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)]`}>
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New
        </button>
      }
    >
      <div className="-m-2">
        {[
          { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'New Document' },
          { icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', label: 'New Folder' },
          { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Upload Image' },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--component-text)] hover:bg-[var(--component-bg-elevated)] rounded-md transition-colors"
          >
            <svg className="w-4 h-4 text-[var(--component-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
      </div>
    </Popover>
  );
}
