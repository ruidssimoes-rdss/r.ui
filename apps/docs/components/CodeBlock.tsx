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
      width="16"
      height="16"
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
      width="16"
      height="16"
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
 * Minimal code display - plain text with left border/indent.
 * No background colors, no containers.
 * Copy button top-right, gray icon with hover state.
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
      {/* Copy button - top-right */}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-gray-600
                   opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <CopyIcon />
        )}
      </button>

      {/* Code - plain text with left border */}
      <div className="border-l-2 border-gray-200 pl-4 py-2">
        <pre className="overflow-x-auto">
          <code className={`language-${language} text-sm font-mono text-gray-700 leading-relaxed`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
