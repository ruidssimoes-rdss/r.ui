'use client';

import { useState } from 'react';
import { useStudio } from '@/lib/studio/theme-context';
import {
  generateCSSExport,
  generateThemeExport,
  generateTailwindExport,
} from '@/lib/studio/export-utils';

// ========================================
// Types
// ========================================

type ExportFormat = 'css' | 'theme' | 'tailwind' | 'json';

interface StudioExportProps {
  expanded: boolean;
  onToggle: () => void;
}

// ========================================
// Icons
// ========================================

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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
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
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function ChevronDownIcon({ size = 14 }: { size?: number }) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ========================================
// Format Config
// ========================================

const formatConfig: Record<ExportFormat, { label: string; ext: string }> = {
  css: { label: 'CSS Variables', ext: 'css' },
  theme: { label: 'r/ui Theme', ext: 'ts' },
  tailwind: { label: 'Tailwind', ext: 'js' },
  json: { label: 'JSON', ext: 'json' },
};

// ========================================
// Main Component
// ========================================

export function StudioExport({ expanded, onToggle }: StudioExportProps) {
  const { state } = useStudio();
  const [format, setFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  const getExportCode = () => {
    switch (format) {
      case 'css':
        return generateCSSExport(state.theme);
      case 'theme':
        return generateThemeExport(state.theme);
      case 'tailwind':
        return generateTailwindExport(state.theme);
      case 'json':
        return JSON.stringify(state.theme, null, 2);
    }
  };

  const code = getExportCode();

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
    a.download = `r-ui-theme.${formatConfig[format].ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50/50 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-900">Export Code</span>
          <span className="text-xs text-gray-500">
            {code.split('\n').length} lines • .{formatConfig[format].ext}
          </span>
        </div>
        <ChevronDownIcon
          size={16}
        />
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-gray-200">
          {/* Format Tabs */}
          <div className="flex items-center gap-1 p-2 bg-gray-50/50 border-b border-gray-200">
            {(Object.keys(formatConfig) as ExportFormat[]).map((key) => {
              const config = formatConfig[key];
              return (
                <button
                  key={key}
                  onClick={() => setFormat(key)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    format === key
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {config.label}
                </button>
              );
            })}

            <div className="flex-1" />

            {/* Actions */}
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm transition-colors ${
                copied
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <DownloadIcon size={14} />
              <span>Download</span>
            </button>
          </div>

          {/* Code Preview */}
          <div className="bg-zinc-900 p-4 max-h-[300px] overflow-auto">
            <pre className="text-[13px] text-zinc-300 font-mono leading-5">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
