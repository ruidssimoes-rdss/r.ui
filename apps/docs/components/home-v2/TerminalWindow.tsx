'use client';

import { useState } from 'react';

interface TerminalLineProps {
  prompt?: string;
  type?: 'command' | 'success' | 'info' | 'code';
  children: React.ReactNode;
  className?: string;
}

function TerminalLine({ prompt, type = 'command', children, className = '' }: TerminalLineProps) {
  const colors = {
    command: 'text-white',
    success: 'text-green-400',
    info: 'text-blue-400',
    code: 'text-purple-400',
  };

  return (
    <div className={`flex items-start gap-2 font-mono text-sm ${className}`}>
      {prompt && <span className="text-white/40 select-none">{prompt}</span>}
      <span className={colors[type]}>{children}</span>
    </div>
  );
}

interface TerminalWindowProps {
  title?: string;
  className?: string;
}

export function TerminalWindow({ title = 'Terminal', className = '' }: TerminalWindowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('npx hyena-studio add card button');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`hp-terminal max-w-xl mx-auto ${className}`}>
      {/* Header */}
      <div className="hp-terminal-header">
        <div className="hp-terminal-dot red" />
        <div className="hp-terminal-dot yellow" />
        <div className="hp-terminal-dot green" />
        <span className="ml-3 text-xs text-white/40 font-mono">{title}</span>
        <button
          onClick={handleCopy}
          className="ml-auto p-1.5 text-white/40 hover:text-white/60 hover:bg-white/5 rounded transition-colors"
          aria-label={copied ? 'Copied' : 'Copy command'}
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2">
        <TerminalLine prompt="$">
          npx hyena-studio add card button
        </TerminalLine>

        <div className="h-2" />

        <TerminalLine type="success">
          ✓ Card added to ./components/ui
        </TerminalLine>

        <TerminalLine type="success">
          ✓ Button added to ./components/ui
        </TerminalLine>

        <div className="h-3" />

        <TerminalLine type="info">
          Ready to import:
        </TerminalLine>

        <TerminalLine type="code">
          {`import { Card, Button } from './ui'`}
        </TerminalLine>
      </div>
    </div>
  );
}
