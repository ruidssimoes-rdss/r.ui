'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { generateCSS } from '@/lib/studio/generators/css';
import { generateTailwind } from '@/lib/studio/generators/tailwind';
import { generateRUITheme } from '@/lib/studio/generators/rui-theme';
import { generateJSON } from '@/lib/studio/generators/json';
import { generateReactNativeStyleSheet, generateHyenaTheme } from '@/lib/studio/generators/react-native';
import { ExportFormat } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

export function TokenExport() {
  const { state, setExportFormat } = useTokens();
  const [copied, setCopied] = useState(false);

  const getCode = (): string => {
    switch (state.exportFormat) {
      case 'css':
        return generateCSS(state.tokens);
      case 'tailwind':
        return generateTailwind(state.tokens);
      case 'rui':
        return generateRUITheme(state.tokens);
      case 'json':
        return generateJSON(state.tokens);
      case 'react-native':
        return generateReactNativeStyleSheet(state.tokens);
      case 'hyena-rn':
        return generateHyenaTheme(state.tokens);
      default:
        return generateCSS(state.tokens);
    }
  };

  const code = getCode();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formats: { id: ExportFormat; label: string }[] = [
    { id: 'css', label: 'CSS' },
    { id: 'tailwind', label: 'Tailwind' },
    { id: 'rui', label: 'Hyena' },
    { id: 'json', label: 'JSON' },
  ];

  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      {/* Format tabs */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-1">
          {formats.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setExportFormat(id)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                state.exportFormat === id
                  ? 'bg-white/10 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          {copied ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code area - dark regardless of theme */}
      <div className="flex-1 overflow-auto bg-[#0a0a0a] p-4">
        <pre className="text-[11px] text-zinc-400 font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
