'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/studio-context';
import {
  generateCSSExport,
  generateThemeExport,
  generateTailwindExport,
  generateJSONExport,
} from '@/lib/studio/export-utils';
import { cn } from '@/lib/utils';

function CopyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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

const formatTabs = [
  { key: 'css' as const, label: 'CSS Variables' },
  { key: 'theme' as const, label: 'r/ui Theme' },
  { key: 'tailwind' as const, label: 'Tailwind' },
  { key: 'json' as const, label: 'JSON' },
];

export function StudioCodeView() {
  const { state, setExportFormat } = useStudio();
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (state.exportFormat) {
      case 'css':
        return generateCSSExport(state.tokens);
      case 'theme':
        return generateThemeExport(state.tokens);
      case 'tailwind':
        return generateTailwindExport(state.tokens);
      case 'json':
        return generateJSONExport(state.tokens);
    }
  };

  const code = getCode();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      {/* Format Tabs */}
      <div className="flex items-center justify-between p-2 bg-muted/30 border-b border-border/50">
        <div className="flex items-center gap-1">
          {formatTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setExportFormat(key)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm transition-colors',
                state.exportFormat === key
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <div className="bg-[#0a0a0a] p-4 max-h-[400px] overflow-auto">
        <pre className="text-sm text-gray-300 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
