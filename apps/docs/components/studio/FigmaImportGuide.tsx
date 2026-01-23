'use client';

import { useState } from 'react';

interface FigmaImportGuideProps {
  format: 'figma-variables' | 'figma-tokens-studio';
}

export function FigmaImportGuide({ format }: FigmaImportGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-[#9CA3AF] hover:text-[#6B7280] flex items-center gap-1 transition-colors"
      >
        <QuestionIcon className="w-3.5 h-3.5" />
        How to import into Figma
        <ChevronIcon
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 p-3 bg-[#F9FAFB] rounded-lg text-xs text-[#6B7280] space-y-3 border border-[#E5E7EB]">
          {format === 'figma-variables' ? (
            <>
              <p className="font-medium text-[#374151]">
                For Figma Variables (Native):
              </p>
              <ol className="list-decimal list-inside space-y-1.5 ml-1">
                <li>Open your Figma file</li>
                <li>Go to the Variables panel (right sidebar)</li>
                <li>
                  Click the settings icon (
                  <SettingsIcon className="inline w-3 h-3" />) → "Import
                  variables"
                </li>
                <li>Select the downloaded JSON file</li>
                <li>Variables will appear organized by collection</li>
              </ol>
              <p className="text-[#9CA3AF] mt-2">
                Note: Light and Dark modes will be available as variable modes
              </p>
            </>
          ) : (
            <>
              <p className="font-medium text-[#374151]">For Tokens Studio:</p>
              <ol className="list-decimal list-inside space-y-1.5 ml-1">
                <li>
                  Install the "Tokens Studio" plugin from{' '}
                  <a
                    href="https://www.figma.com/community/plugin/843461159747178978"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Figma Community
                  </a>
                </li>
                <li>Open the plugin in your file</li>
                <li>Click "Load" → "File" → select the JSON</li>
                <li>Apply tokens to your designs using the plugin UI</li>
              </ol>
              <p className="text-[#9CA3AF] mt-2">
                Tokens Studio offers more advanced features like token aliases
                and themes
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
