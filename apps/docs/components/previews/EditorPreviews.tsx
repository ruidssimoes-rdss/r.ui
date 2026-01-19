'use client';

import { useState } from 'react';

/**
 * Editor Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const BoldIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
  </svg>
);

const ItalicIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
  </svg>
);

const UnderlineIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
  </svg>
);

const StrikeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </svg>
);

const UndoIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
  </svg>
);

const RedoIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
  </svg>
);

interface ToolbarButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function ToolbarButton({ icon, active, disabled, onClick }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 rounded transition-colors
        ${active
          ? 'bg-[var(--switch-bg-checked)]/10 text-[var(--switch-bg-checked)]'
          : 'text-[var(--component-text-muted)] hover:text-[var(--component-text)] hover:bg-[var(--component-bg-hover)]'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {icon}
    </button>
  );
}

function ToolbarSeparator() {
  return <div className="w-px h-6 bg-[var(--component-border)] mx-1" />;
}

export function EditorBasicPreview() {
  const [value, setValue] = useState('');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  return (
    <div className="w-full max-w-md bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 p-1 border-b border-[var(--component-border)]">
        <ToolbarButton icon={<BoldIcon />} active={bold} onClick={() => setBold(!bold)} />
        <ToolbarButton icon={<ItalicIcon />} active={italic} onClick={() => setItalic(!italic)} />
        <ToolbarButton icon={<UnderlineIcon />} />
      </div>
      {/* Content */}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Start writing..."
        className={`
          w-full min-h-[120px] p-3 text-sm bg-transparent text-[var(--component-text)]
          placeholder:text-[var(--component-text-muted)] resize-none focus:outline-none
          ${bold ? 'font-bold' : ''}
          ${italic ? 'italic' : ''}
        `}
      />
    </div>
  );
}

export function EditorFullToolbarPreview() {
  const [value, setValue] = useState('');

  return (
    <div className="w-full max-w-md bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 p-1 border-b border-[var(--component-border)] flex-wrap">
        <ToolbarButton icon={<UndoIcon />} />
        <ToolbarButton icon={<RedoIcon />} />
        <ToolbarSeparator />
        <ToolbarButton icon={<BoldIcon />} />
        <ToolbarButton icon={<ItalicIcon />} />
        <ToolbarButton icon={<UnderlineIcon />} />
        <ToolbarButton icon={<StrikeIcon />} />
        <ToolbarSeparator />
        <ToolbarButton icon={<ListIcon />} />
        <ToolbarButton icon={<QuoteIcon />} />
      </div>
      {/* Content */}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Start writing..."
        className="w-full min-h-[150px] p-3 text-sm bg-transparent text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] resize-none focus:outline-none"
      />
    </div>
  );
}

export function EditorWithCharacterCountPreview() {
  const [value, setValue] = useState('');
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="w-full max-w-md">
      <div className="bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 p-1 border-b border-[var(--component-border)]">
          <ToolbarButton icon={<BoldIcon />} />
          <ToolbarButton icon={<ItalicIcon />} />
        </div>
        {/* Content */}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start writing..."
          className="w-full min-h-[100px] p-3 text-sm bg-transparent text-[var(--component-text)] placeholder:text-[var(--component-text-muted)] resize-none focus:outline-none"
        />
      </div>
      <div className="mt-2 text-xs text-[var(--component-text-muted)]">
        {charCount} characters · {wordCount} words
      </div>
    </div>
  );
}

export function EditorDisabledPreview() {
  return (
    <div className="w-full max-w-md bg-[var(--component-bg-elevated)] border border-[var(--component-border)] rounded-lg overflow-hidden opacity-60">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 p-1 border-b border-[var(--component-border)]">
        <ToolbarButton icon={<BoldIcon />} disabled />
        <ToolbarButton icon={<ItalicIcon />} disabled />
        <ToolbarButton icon={<UnderlineIcon />} disabled />
      </div>
      {/* Content */}
      <textarea
        value="This editor is read-only."
        disabled
        className="w-full min-h-[100px] p-3 text-sm bg-transparent text-[var(--component-text)] cursor-not-allowed resize-none focus:outline-none"
      />
    </div>
  );
}
