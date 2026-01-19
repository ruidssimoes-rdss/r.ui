'use client';

import { useState } from 'react';

/**
 * Code Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function CodeInlinePreview() {
  return (
    <div className="space-y-4">
      <p className="text-[var(--component-text)]">
        Use the <code className="px-1.5 py-0.5 rounded bg-[var(--component-bg-elevated)] text-sm font-mono text-[var(--component-text)]">useState</code> hook
        to manage component state.
      </p>
      <p className="text-[var(--component-text)]">
        Install the package with <code className="px-1.5 py-0.5 rounded bg-[var(--component-bg-elevated)] text-sm font-mono text-[var(--component-text)]">npm install @r-ui/react-native</code>
      </p>
    </div>
  );
}

export function CodeBlockPreview() {
  const code = `import { Button } from '@r-ui/react-native'

export default function App() {
  return (
    <Button onPress={() => console.log('clicked')}>
      Click me
    </Button>
  )
}`;

  return (
    <pre className="p-4 rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto">
      <code className="text-sm font-mono">{code}</code>
    </pre>
  );
}

export function CodeWithCopyPreview() {
  const [copied, setCopied] = useState(false);
  const code = `npx r-ui add button`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="p-4 pr-12 rounded-lg bg-zinc-950 text-zinc-50 overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
