'use client';

import { useState } from 'react';
import { TokenSystem } from '@/lib/studio/types';
import { encodeTokensToUrl, EncodedTokenData } from '@/lib/studio/utils/tokenUrl';

interface ShareButtonProps {
  tokens: TokenSystem;
  presetId?: string;
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
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

export function ShareButton({ tokens, presetId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = async () => {
    setError(null);

    const data: EncodedTokenData = { tokens, presetId };
    const url = encodeTokensToUrl(data);

    if (!url) {
      setError('Design system is too large to share via URL. Try using Export instead.');
      setTimeout(() => setError(null), 4000);
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setError('Failed to copy to clipboard');
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
        title="Share design system via URL"
      >
        {copied ? (
          <>
            <CheckIcon className="text-green-600" />
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon />
            <span>Share</span>
          </>
        )}
      </button>

      {error && (
        <div className="absolute top-full mt-2 right-0 p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg whitespace-nowrap shadow-lg z-50 max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
}
