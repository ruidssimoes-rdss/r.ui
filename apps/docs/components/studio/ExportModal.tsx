'use client';

import { useState } from 'react';
import { useTokens } from '@/lib/studio/context';
import { generateCSS } from '@/lib/studio/generators/css';
import { generateTailwind } from '@/lib/studio/generators/tailwind';
import { generateRUITheme } from '@/lib/studio/generators/rui-theme';
import { generateJSON } from '@/lib/studio/generators/json';
import { generateReactNativeStyleSheet, generateHyenaTheme } from '@/lib/studio/generators/react-native';
import { generateFigmaVariables, generateFigmaTokensStudio } from '@/lib/studio/generators/figma';
import { ExportFormat } from '@/lib/studio/types';
import { cn } from '@/lib/utils';
import { FigmaImportGuide } from './FigmaImportGuide';

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
      case 'react-native':
        return generateReactNativeStyleSheet(state.tokens);
      case 'hyena-rn':
        return generateHyenaTheme(state.tokens);
      case 'figma-variables':
        return generateFigmaVariables(state.tokens);
      case 'figma-tokens-studio':
        return generateFigmaTokensStudio(state.tokens);
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
      case 'react-native':
        return `${baseName}-theme.ts`;
      case 'hyena-rn':
        return `${baseName}-hyena-theme.ts`;
      case 'figma-variables':
        return `${baseName}-figma-variables.json`;
      case 'figma-tokens-studio':
        return `${baseName}-tokens-studio.json`;
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

  const formats: { id: ExportFormat; label: string; description: string; category: string }[] = [
    { id: 'css', label: 'CSS Variables', description: 'Standard CSS custom properties', category: 'Web' },
    { id: 'tailwind', label: 'Tailwind Config', description: 'tailwind.config.ts theme extension', category: 'Web' },
    { id: 'json', label: 'Design Tokens', description: 'W3C Design Tokens JSON format', category: 'Web' },
    { id: 'react-native', label: 'React Native', description: 'StyleSheet with Platform-specific styles', category: 'Mobile' },
    { id: 'hyena-rn', label: 'Hyena RN Theme', description: 'Hyena createTheme for React Native', category: 'Mobile' },
    { id: 'rui', label: 'Hyena Web', description: 'Hyena createTheme configuration', category: 'Web' },
    { id: 'figma-variables', label: 'Figma Variables', description: 'Native Figma variables format', category: 'Design' },
    { id: 'figma-tokens-studio', label: 'Tokens Studio', description: 'For Figma Tokens Studio plugin', category: 'Design' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-[#E5E7EB]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">Export Tokens</h2>
            <p className="text-sm text-[#6B7280]">
              Download your token system in multiple formats
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F3F4F6] rounded-lg transition-colors"
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
          <div className="w-52 border-r border-[#E5E7EB] p-3 flex-shrink-0 bg-[#F9FAFB] overflow-y-auto">
            {/* Web Formats */}
            <div className="mb-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] px-3 mb-2">
                Web
              </div>
              <div className="space-y-1">
                {formats.filter(f => f.category === 'Web').map(({ id, label, description }) => (
                  <button
                    key={id}
                    onClick={() => setFormat(id)}
                    className={cn(
                      'w-full text-left p-3 rounded-xl transition-colors',
                      format === id
                        ? 'bg-white text-[#111827] shadow-sm border border-[#E5E7EB]'
                        : 'text-[#6B7280] hover:bg-white hover:text-[#374151]'
                    )}
                  >
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-[#9CA3AF]">{description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Formats */}
            <div className="mb-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] px-3 mb-2">
                Mobile
              </div>
              <div className="space-y-1">
                {formats.filter(f => f.category === 'Mobile').map(({ id, label, description }) => (
                  <button
                    key={id}
                    onClick={() => setFormat(id)}
                    className={cn(
                      'w-full text-left p-3 rounded-xl transition-colors',
                      format === id
                        ? 'bg-white text-[#111827] shadow-sm border border-[#E5E7EB]'
                        : 'text-[#6B7280] hover:bg-white hover:text-[#374151]'
                    )}
                  >
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-[#9CA3AF]">{description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Tools Formats */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF] px-3 mb-2">
                Design Tools
              </div>
              <div className="space-y-1">
                {formats.filter(f => f.category === 'Design').map(({ id, label, description }) => (
                  <button
                    key={id}
                    onClick={() => setFormat(id)}
                    className={cn(
                      'w-full text-left p-3 rounded-xl transition-colors',
                      format === id
                        ? 'bg-white text-[#111827] shadow-sm border border-[#E5E7EB]'
                        : 'text-[#6B7280] hover:bg-white hover:text-[#374151]'
                    )}
                  >
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-[#9CA3AF]">{description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <span className="text-xs font-mono text-[#6B7280]">
                {getFileName()}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-[#6B7280] hover:text-[#374151] hover:bg-[#F3F4F6] transition-colors"
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
            <div className="flex-1 overflow-auto bg-[#18181B] p-4">
              <pre className="text-[11px] text-[#A1A1AA] font-mono leading-relaxed whitespace-pre-wrap">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-[#E5E7EB]">
          <div className="flex-1">
            {(format === 'figma-variables' || format === 'figma-tokens-studio') && (
              <FigmaImportGuide format={format} />
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm text-[#6B7280] hover:text-[#374151] hover:bg-[#F3F4F6] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-[#18181B] text-white rounded-lg hover:bg-[#27272A] transition-colors font-medium"
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
      </div>
    </>
  );
}
