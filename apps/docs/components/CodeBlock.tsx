'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * CodeBlock Component
 *
 * Theme-aware code blocks using CSS variables.
 * Adapts to dark/light/oatmeal themes.
 * Copy button visible on hover.
 */
export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      {/* Copy button - theme-aware */}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md
                   bg-[var(--docs-code-btn-bg)] border border-[var(--docs-code-btn-border)]
                   text-[var(--docs-code-btn-text)] hover:text-[var(--docs-code-btn-hover)] hover:bg-[var(--docs-code-btn-hover-bg)]
                   opacity-0 group-hover:opacity-100
                   transition-all duration-200
                   focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--docs-accent)]/30"
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? (
          <>
            <CheckIcon className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400 font-medium">Copied!</span>
          </>
        ) : (
          <>
            <CopyIcon className="w-3.5 h-3.5" />
            <span>Copy</span>
          </>
        )}
      </button>

      {/* Code container - theme-aware */}
      <pre
        className="bg-[var(--docs-code-bg)] border border-[var(--docs-code-border)]
                   rounded-lg p-4 overflow-x-auto
                   shadow-[var(--docs-code-shadow)]
                   transition-all duration-200"
      >
        <code className={`language-${language} text-sm font-mono leading-relaxed text-[var(--docs-code-text)]`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
