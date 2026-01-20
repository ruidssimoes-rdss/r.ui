'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { generateCSS } from '@/lib/studio/generators/css';
import { generateTailwind } from '@/lib/studio/generators/tailwind';
import { generateRUITheme } from '@/lib/studio/generators/rui-theme';
import { generateJSON } from '@/lib/studio/generators/json';
import { ExportFormat } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const { state } = useTokens();
  const [format, setFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const getCode = () => {
    switch (format) {
      case 'css':
        return generateCSS(state.tokens);
      case 'tailwind':
        return generateTailwind(state.tokens);
      case 'rui':
        return generateRUITheme(state.tokens);
      case 'json':
        return generateJSON(state.tokens);
    }
  };

  const getFileName = () => {
    const baseName = state.tokens.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    switch (format) {
      case 'css':
        return `${baseName}-tokens.css`;
      case 'tailwind':
        return 'tailwind.config.ts';
      case 'rui':
        return 'theme.ts';
      case 'json':
        return `${baseName}-tokens.json`;
    }
  };

  const code = getCode();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getFileName();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formats: { id: ExportFormat; label: string; description: string }[] = [
    { id: 'css', label: 'CSS Variables', description: 'Standard CSS custom properties' },
    { id: 'tailwind', label: 'Tailwind Config', description: 'tailwind.config.ts theme extension' },
    { id: 'rui', label: 'r/ui Theme', description: 'r/ui createTheme configuration' },
    { id: 'json', label: 'Design Tokens', description: 'W3C Design Tokens JSON format' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:max-h-[80vh] bg-background rounded-xl shadow-xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold">Export Tokens</h2>
            <p className="text-sm text-muted-foreground">
              Download your token system in multiple formats
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex min-h-0">
          {/* Format Selection */}
          <div className="w-48 border-r border-border p-3 flex-shrink-0">
            <div className="space-y-1">
              {formats.map(({ id, label, description }) => (
                <button
                  key={id}
                  onClick={() => setFormat(id)}
                  className={cn(
                    'w-full text-left p-2 rounded-lg transition-colors',
                    format === id
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs text-muted-foreground">{description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Code Preview */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
              <span className="text-xs font-mono text-muted-foreground">
                {getFileName()}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? (
                  <>
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
                    Copied!
                  </>
                ) : (
                  <>
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
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-[#0a0a0a] p-4">
              <pre className="text-[11px] text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-border">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download {getFileName()}
          </button>
        </div>
      </div>
    </>
  );
}
