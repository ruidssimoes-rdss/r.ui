'use client';

import { useState, useMemo } from 'react';
import { usePlayground } from './PlaygroundContext';

// ========================================
// Icons
// ========================================

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ========================================
// Syntax Highlighting (Simple)
// ========================================

interface Token {
  type: 'keyword' | 'string' | 'comment' | 'number' | 'operator' | 'function' | 'component' | 'prop' | 'punctuation' | 'text';
  value: string;
}

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let remaining = code;

  const patterns: { type: Token['type']; regex: RegExp }[] = [
    // Comments
    { type: 'comment', regex: /^(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/ },
    // Strings
    { type: 'string', regex: /^(['"`])(?:(?!\1)[^\\]|\\.)*?\1/ },
    { type: 'string', regex: /^`(?:[^`\\]|\\.|\$\{[^}]*\})*`/ },
    // JSX Component names (capitalized)
    { type: 'component', regex: /^<\/?([A-Z][a-zA-Z0-9]*)/ },
    // JSX props
    { type: 'prop', regex: /^\s([a-z][a-zA-Z0-9]*)(?==)/ },
    // Keywords
    { type: 'keyword', regex: /^(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|interface|type|as|async|await|new|this|true|false|null|undefined)\b/ },
    // Numbers
    { type: 'number', regex: /^-?\d+\.?\d*/ },
    // Operators
    { type: 'operator', regex: /^(=>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%=<>!&|^~])/ },
    // Function calls
    { type: 'function', regex: /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/ },
    // Punctuation
    { type: 'punctuation', regex: /^[{}[\]();:,.<>/?]/ },
    // Regular text/identifiers
    { type: 'text', regex: /^[a-zA-Z_$][a-zA-Z0-9_$]*/ },
    // Whitespace
    { type: 'text', regex: /^\s+/ },
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const { type, regex } of patterns) {
      const match = remaining.match(regex);
      if (match) {
        tokens.push({ type, value: match[0] });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Push single character as text
      tokens.push({ type: 'text', value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

function getTokenColor(type: Token['type'], isDark: boolean): string {
  if (isDark) {
    switch (type) {
      case 'keyword':
        return 'text-purple-400';
      case 'string':
        return 'text-green-400';
      case 'comment':
        return 'text-zinc-500';
      case 'number':
        return 'text-orange-400';
      case 'operator':
        return 'text-cyan-400';
      case 'function':
        return 'text-blue-400';
      case 'component':
        return 'text-yellow-400';
      case 'prop':
        return 'text-cyan-300';
      case 'punctuation':
        return 'text-zinc-400';
      default:
        return 'text-zinc-300';
    }
  } else {
    // Light mode colors
    switch (type) {
      case 'keyword':
        return 'text-purple-600';
      case 'string':
        return 'text-green-600';
      case 'comment':
        return 'text-gray-400';
      case 'number':
        return 'text-orange-600';
      case 'operator':
        return 'text-cyan-600';
      case 'function':
        return 'text-blue-600';
      case 'component':
        return 'text-amber-600';
      case 'prop':
        return 'text-cyan-700';
      case 'punctuation':
        return 'text-gray-500';
      default:
        return 'text-gray-800';
    }
  }
}

// ========================================
// Main Component
// ========================================

export function PlaygroundCode() {
  const { activeVariant, copyCode, previewTheme } = usePlayground();
  const [copied, setCopied] = useState(false);
  const isDark = previewTheme === 'dark';

  const handleCopy = async () => {
    await copyCode();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const code = activeVariant?.code || '';

  // Tokenize and split into lines
  const lines = useMemo(() => {
    const tokens = tokenize(code);
    const result: Token[][] = [[]];

    tokens.forEach(token => {
      // Split on newlines
      const parts = token.value.split('\n');
      parts.forEach((part, i) => {
        if (i > 0) {
          result.push([]);
        }
        if (part) {
          result[result.length - 1].push({ type: token.type, value: part });
        }
      });
    });

    return result;
  }, [code]);

  if (!code) {
    return (
      <div className={`h-full flex items-center justify-center border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'}`}>
        <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>No code available</p>
      </div>
    );
  }

  return (
    <div className={`relative h-full overflow-auto group border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'}`}>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={`
          absolute right-3 top-3 z-10
          p-1.5 rounded-md
          transition-all
          opacity-0 group-hover:opacity-100
          ${isDark
            ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700'
          }
        `}
        title={copied ? 'Copied!' : 'Copy code'}
        aria-label={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <CopyIcon />
        )}
      </button>

      {/* Code with line numbers - smaller text */}
      <div className="p-4 font-mono text-[13px] leading-5">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((lineTokens, lineIndex) => (
              <tr key={lineIndex} className={isDark ? 'hover:bg-zinc-800/50' : 'hover:bg-gray-100/50'}>
                {/* Line number */}
                <td className={`text-right pr-4 select-none w-10 align-top ${isDark ? 'text-zinc-600' : 'text-gray-400'}`}>
                  {lineIndex + 1}
                </td>
                {/* Code */}
                <td className="whitespace-pre">
                  {lineTokens.map((token, tokenIndex) => (
                    <span
                      key={tokenIndex}
                      className={getTokenColor(token.type, isDark)}
                    >
                      {token.value}
                    </span>
                  ))}
                  {lineTokens.length === 0 && '\u00A0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
