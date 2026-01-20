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
import { ExportFormat } from '@/lib/studio/types';

function XIcon({ size = 16 }: { size?: number }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

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

function DownloadIcon({ size = 14 }: { size?: number }) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const formatOptions: { key: ExportFormat; label: string; extension: string }[] =
  [
    { key: 'css', label: 'CSS Variables', extension: '.css' },
    { key: 'theme', label: 'r/ui Theme', extension: '.ts' },
    { key: 'tailwind', label: 'Tailwind Config', extension: '.js' },
    { key: 'json', label: 'JSON', extension: '.json' },
  ];

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const { state } = useStudio();
  const [format, setFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (format) {
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
  const currentFormat = formatOptions.find((f) => f.key === format);

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
    a.download = `theme${currentFormat?.extension || '.txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-xl border border-border shadow-2xl w-full max-w-2xl p-6 mx-4">
        <h2 className="text-lg font-semibold mb-4">Export Theme</h2>

        {/* Format Selection */}
        <div className="flex gap-2 mb-4">
          {formatOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFormat(key)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm transition-colors',
                format === key
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Code Preview */}
        <div className="rounded-lg border border-border overflow-hidden mb-4">
          <div className="bg-[#0a0a0a] p-4 max-h-[300px] overflow-auto">
            <pre className="text-sm text-gray-300 font-mono">
              <code>{code}</code>
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          >
            <DownloadIcon size={14} />
            Download
          </button>
        </div>

        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <XIcon size={16} />
        </button>
      </div>
    </div>
  );
}
