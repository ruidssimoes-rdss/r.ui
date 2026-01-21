'use client';

import { useState } from 'react';

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
}

function CodeBlock({ title, code, language = 'bash' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-950 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
        <span className="text-xs text-gray-400 font-mono">{title}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-md transition-colors"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? (
            <CheckIcon className="w-4 h-4 text-green-400" />
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono">
          <code className="text-gray-100 whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  );
}

function BenefitItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <CheckIcon className="w-3 h-3 text-green-600" />
      </div>
      <span className="text-gray-600">{children}</span>
    </li>
  );
}

export function CodeExample() {
  const installCode = `npx hyena-studio add card button dialog`;

  const usageCode = `import { Card, Button } from '@hyena-studio/react-native'

export function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome to Hyena</Card.Title>
      </Card.Header>
      <Card.Content>
        <Button>Get Started</Button>
      </Card.Content>
    </Card>
  )
}`;

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dead simple to use
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              Add components with a single command. No configuration needed.
            </p>

            <ul className="space-y-4">
              <BenefitItem>TypeScript-first with full type safety</BenefitItem>
              <BenefitItem>NativeWind (Tailwind) styling</BenefitItem>
              <BenefitItem>Compound component patterns</BenefitItem>
              <BenefitItem>Tree-shakeable exports</BenefitItem>
            </ul>
          </div>

          {/* Code side */}
          <div className="space-y-4">
            <CodeBlock title="Terminal" code={installCode} />
            <CodeBlock title="App.tsx" code={usageCode} language="tsx" />
          </div>
        </div>
      </div>
    </section>
  );
}
