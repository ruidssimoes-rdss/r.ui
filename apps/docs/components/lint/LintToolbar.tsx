'use client';

import { useState, useRef, useEffect } from 'react';
import { useLint } from './LintContext';

// ========================================
// Icons
// ========================================

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function FileCodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  );
}

// ========================================
// Toolbar Button
// ========================================

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

function ToolbarButton({ icon, label, onClick, disabled }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-7 h-7 flex items-center justify-center rounded-md transition-colors
        ${disabled
          ? 'text-[#D1D5DB] cursor-not-allowed'
          : 'text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6]'
        }
      `}
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );
}

// ========================================
// Dropdown
// ========================================

interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange?: (value: string) => void;
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const selectedOption = options.find(o => o.id === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-md
          transition-colors text-[#374151]
          ${open ? 'bg-[#F3F4F6]' : 'hover:bg-[#F9FAFB]'}
        `}
      >
        <span className="leading-5">{selectedOption?.label || label}</span>
        <ChevronDownIcon className={`text-[#374151] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[200px] max-h-[300px] overflow-auto rounded-lg bg-white border border-[#E5E7EB] shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="py-1">
            {options.map((option) => {
              const isSelected = option.id === value;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    onChange?.(option.id);
                    setOpen(false);
                  }}
                  className={`
                    block w-full px-3 py-2 text-sm text-left leading-5
                    ${isSelected ? 'bg-[#F9FAFB] text-[#111827] font-medium' : 'text-[#374151] hover:bg-[#F9FAFB]'}
                  `}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ========================================
// Main Component
// ========================================

export function LintToolbar() {
  const {
    isLinting,
    score,
    copyFeedback,
    isSharedReport,
    handleClear,
    handleLoadExample,
    handleShare,
  } = useLint();

  // Tool options for future expansion
  const toolOptions = [
    { id: 'linter', label: 'Design Linter' },
  ];

  return (
    <div className="flex items-center justify-between h-12 py-2">
      {/* Left: Action buttons */}
      <div className="flex items-center gap-1">
        {/* Linting indicator */}
        {isLinting && (
          <div className="flex items-center gap-1.5 px-2 py-1 text-xs text-[#6B7280]">
            <LoaderIcon className="w-3 h-3 animate-spin" />
            <span>Linting...</span>
          </div>
        )}

        {/* Score display */}
        {score !== null && !isLinting && (
          <div className={`
            px-2 py-1 text-xs font-medium rounded-md
            ${score >= 90 ? 'text-green-600 bg-green-50' : score >= 70 ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50'}
          `}>
            {score}/100
          </div>
        )}

        {/* Vertical divider */}
        {(isLinting || score !== null) && (
          <div className="w-[9px] flex items-center justify-center">
            <div className="w-px h-4 bg-[#E5E7EB]" />
          </div>
        )}

        {/* Action buttons (only show when not viewing shared report) */}
        {!isSharedReport && (
          <>
            <ToolbarButton
              icon={<TrashIcon />}
              label="Clear"
              onClick={handleClear}
            />
            <ToolbarButton
              icon={<FileCodeIcon />}
              label="Load Example"
              onClick={handleLoadExample}
            />
          </>
        )}

        {/* Share button */}
        {score !== null && (
          <>
            <div className="w-[9px] flex items-center justify-center">
              <div className="w-px h-4 bg-[#E5E7EB]" />
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-[#374151] rounded-md hover:bg-[#F9FAFB] transition-colors"
            >
              <ShareIcon />
              <span>{copyFeedback ? 'Copied!' : 'Share'}</span>
            </button>
          </>
        )}
      </div>

      {/* Right: Tool dropdown (breadcrumb style) */}
      <div className="flex items-center">
        <span className="text-sm font-medium text-[#374151] px-2 py-1.5">Tools</span>
        <span className="text-[#D1D5DB] text-base leading-6 px-0.5">/</span>
        <Dropdown
          label="Tool"
          options={toolOptions}
          value="linter"
        />
      </div>
    </div>
  );
}

// ========================================
// Mobile Toolbar
// ========================================

export function LintToolbarMobile() {
  const {
    isLinting,
    score,
    copyFeedback,
    isSharedReport,
    handleClear,
    handleLoadExample,
    handleShare,
  } = useLint();

  return (
    <div className="flex items-center justify-between py-2">
      {/* Left: Score and status */}
      <div className="flex items-center gap-2">
        {isLinting && (
          <div className="flex items-center gap-1 text-xs text-[#6B7280]">
            <LoaderIcon className="w-3 h-3 animate-spin" />
            <span>Linting...</span>
          </div>
        )}
        {score !== null && !isLinting && (
          <div className={`
            px-2 py-0.5 text-xs font-medium rounded
            ${score >= 90 ? 'text-green-600 bg-green-50' : score >= 70 ? 'text-amber-600 bg-amber-50' : 'text-red-600 bg-red-50'}
          `}>
            {score}/100
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {!isSharedReport && (
          <>
            <ToolbarButton
              icon={<TrashIcon />}
              label="Clear"
              onClick={handleClear}
            />
            <ToolbarButton
              icon={<FileCodeIcon />}
              label="Load Example"
              onClick={handleLoadExample}
            />
          </>
        )}
        {score !== null && (
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#374151] rounded hover:bg-gray-100"
          >
            <ShareIcon />
            <span>{copyFeedback ? 'Copied!' : 'Share'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
