'use client';

import { useState } from 'react';
import { usePlayground, PropTable } from './PlaygroundContext';

// ========================================
// Types
// ========================================

type DocTab = 'installation' | 'usage' | 'features' | 'props' | 'accessibility';

// ========================================
// Icons
// ========================================

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ========================================
// Copyable Code Block
// ========================================

interface CodeSnippetProps {
  code: string;
  language?: string;
}

function CodeSnippet({ code, language = 'bash' }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-zinc-950 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono text-zinc-300">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className={`
          absolute right-2 top-2
          p-1.5 rounded-md
          bg-zinc-800 hover:bg-zinc-700
          text-zinc-400 hover:text-zinc-200
          transition-all
          opacity-0 group-hover:opacity-100
        `}
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied ? <CheckIcon className="text-green-400" /> : <CopyIcon />}
      </button>
    </div>
  );
}

// ========================================
// Tab Components
// ========================================

function InstallationTab() {
  const { componentData } = usePlayground();
  if (!componentData) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">CLI Installation</h3>
        <CodeSnippet code={componentData.installation} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Manual Installation</h3>
        <p className="text-sm text-gray-600 mb-2">
          Copy the component source code from the{' '}
          <a
            href={`https://github.com/ruidssimoes/r-ui/tree/main/packages/react-native/src/components/${componentData.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub repository
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function UsageTab() {
  const { componentData } = usePlayground();
  if (!componentData) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Basic Usage</h3>
      <CodeSnippet code={componentData.usage} language="tsx" />
    </div>
  );
}

function FeaturesTab() {
  const { componentData } = usePlayground();
  if (!componentData) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Features</h3>
      <ul className="space-y-2">
        {componentData.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PropsTab() {
  const { componentData } = usePlayground();
  if (!componentData) return null;

  return (
    <div className="space-y-8">
      {componentData.props.map((table, tableIndex) => (
        <div key={tableIndex}>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{table.component}</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-gray-700 border-b border-gray-200">Prop</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700 border-b border-gray-200">Type</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700 border-b border-gray-200">Default</th>
                  <th className="text-left px-4 py-2 font-medium text-gray-700 border-b border-gray-200">Description</th>
                </tr>
              </thead>
              <tbody>
                {table.props.map((prop, propIndex) => (
                  <tr key={propIndex} className="border-b border-gray-100 last:border-b-0">
                    <td className="px-4 py-3 font-mono text-xs text-blue-600">{prop.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{prop.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{prop.default || '-'}</td>
                    <td className="px-4 py-3 text-gray-700">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function AccessibilityTab() {
  const { componentData } = usePlayground();
  if (!componentData) return null;

  if (!componentData.accessibility) {
    return (
      <div className="text-sm text-gray-600">
        <p>This component follows WAI-ARIA guidelines and supports:</p>
        <ul className="mt-3 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Keyboard navigation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Screen reader announcements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Focus management</span>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none">
      <div className="text-sm text-gray-700 whitespace-pre-wrap">
        {componentData.accessibility}
      </div>
    </div>
  );
}

// ========================================
// Main Component
// ========================================

const tabs: { id: DocTab; label: string }[] = [
  { id: 'installation', label: 'Installation' },
  { id: 'usage', label: 'Usage' },
  { id: 'features', label: 'Features' },
  { id: 'props', label: 'Props' },
  { id: 'accessibility', label: 'Accessibility' },
];

export function PlaygroundDocs() {
  const [activeTab, setActiveTab] = useState<DocTab>('installation');
  const { componentData } = usePlayground();

  if (!componentData) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'installation':
        return <InstallationTab />;
      case 'usage':
        return <UsageTab />;
      case 'features':
        return <FeaturesTab />;
      case 'props':
        return <PropsTab />;
      case 'accessibility':
        return <AccessibilityTab />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-6">
      {/* Tab bar - no borders */}
      <div className="flex overflow-x-auto scrollbar-hide gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors rounded-md
              ${activeTab === tab.id
                ? 'text-gray-900 bg-gray-100'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-4 pb-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

// ========================================
// Compact Version for Mobile
// ========================================

export function PlaygroundDocsCompact() {
  const [activeTab, setActiveTab] = useState<DocTab>('installation');
  const [isExpanded, setIsExpanded] = useState(false);
  const { componentData } = usePlayground();

  if (!componentData) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'installation':
        return <InstallationTab />;
      case 'usage':
        return <UsageTab />;
      case 'features':
        return <FeaturesTab />;
      case 'props':
        return <PropsTab />;
      case 'accessibility':
        return <AccessibilityTab />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-4">
      {/* Expandable header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
      >
        <span>Documentation</span>
        <svg
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <>
          {/* Tab bar - scrollable, no borders */}
          <div className="flex overflow-x-auto scrollbar-hide px-4 pt-2 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors rounded-md
                  ${activeTab === tab.id
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-4">
            {renderTabContent()}
          </div>
        </>
      )}
    </div>
  );
}
