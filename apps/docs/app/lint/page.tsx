'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LintEditor } from '@/components/lint/LintEditor';
import { LintResults } from '@/components/lint/LintResults';
import { LintRulesPanel } from '@/components/lint/LintRulesPanel';
import { lintCode } from '@/lib/linter';
import { encodeReport, decodeReport } from '@/lib/linter/share';
import type { LintIssue } from '@/lib/linter/types';

const EXAMPLE_CODE = `<Pressable onPress={handleClose}>
  <Icon name="close" />
</Pressable>

<Image source={require('./logo.png')} />

<View style={{ backgroundColor: '#3b82f6', padding: 17 }}>
  <Text style={{ fontSize: 15 }}>Hello World</Text>
</View>

<TouchableWithoutFeedback onPress={doSomething}>
  <View className="w-6 h-6">
    <Icon name="menu" />
  </View>
</TouchableWithoutFeedback>`;

const ALL_RULES = [
  'missing-accessibility-label',
  'missing-accessibility-role',
  'touchable-missing-feedback',
  'image-missing-alt',
  'small-touch-target',
  'hardcoded-color',
  'hardcoded-spacing',
  'inconsistent-radius',
  'missing-dark-mode',
  'non-token-font-size',
];

export default function LintPage() {
  return (
    <Suspense fallback={<LintPageSkeleton />}>
      <LintPageContent />
    </Suspense>
  );
}

function LintPageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            r/ui Design Linter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Catch accessibility and design issues in your React Native code before they reach
            production.
          </p>
        </div>
        <div className="h-64 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 animate-pulse" />
      </div>
    </div>
  );
}

function LintPageContent() {
  const searchParams = useSearchParams();
  const [code, setCode] = React.useState('');
  const [results, setResults] = React.useState<LintIssue[]>([]);
  const [score, setScore] = React.useState<number | null>(null);
  const [isLinting, setIsLinting] = React.useState(false);
  const [enabledRules, setEnabledRules] = React.useState<string[]>(ALL_RULES);
  const [isSharedReport, setIsSharedReport] = React.useState(false);
  const [sharedTimestamp, setSharedTimestamp] = React.useState<number | null>(null);
  const [copyFeedback, setCopyFeedback] = React.useState(false);

  // Load shared report from URL on mount
  React.useEffect(() => {
    const reportParam = searchParams.get('report');
    if (reportParam) {
      const report = decodeReport(reportParam);
      if (report) {
        setCode(report.code);
        setResults(report.results);
        setScore(report.score);
        setIsSharedReport(true);
        setSharedTimestamp(report.timestamp);
      }
    }
  }, [searchParams]);

  const handleLint = async () => {
    if (!code.trim()) return;
    setIsLinting(true);
    setIsSharedReport(false);
    setSharedTimestamp(null);

    // Clear report param from URL when linting new code
    if (searchParams.get('report')) {
      window.history.replaceState({}, '', '/lint');
    }

    try {
      const { issues, score: newScore } = await lintCode(code, enabledRules);
      setResults(issues);
      setScore(newScore);
    } catch (error) {
      console.error('Lint error:', error);
    } finally {
      setIsLinting(false);
    }
  };

  const handleClear = () => {
    setCode('');
    setResults([]);
    setScore(null);
    setIsSharedReport(false);
    setSharedTimestamp(null);
    if (searchParams.get('report')) {
      window.history.replaceState({}, '', '/lint');
    }
  };

  const handleLoadExample = () => {
    setCode(EXAMPLE_CODE);
    setResults([]);
    setScore(null);
    setIsSharedReport(false);
    setSharedTimestamp(null);
    if (searchParams.get('report')) {
      window.history.replaceState({}, '', '/lint');
    }
  };

  const handleToggleRule = (rule: string) => {
    setEnabledRules((prev) =>
      prev.includes(rule) ? prev.filter((r) => r !== rule) : [...prev, rule]
    );
  };

  const handleShare = async () => {
    if (score === null) return;

    const report = {
      code,
      results,
      score,
      timestamp: Date.now(),
    };

    const encoded = encodeReport(report);
    const url = `${window.location.origin}/lint?report=${encoded}`;

    // Update URL
    window.history.replaceState({}, '', `/lint?report=${encoded}`);

    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const handleEditSharedCode = () => {
    setIsSharedReport(false);
    setSharedTimestamp(null);
    window.history.replaceState({}, '', '/lint');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            r/ui Design Linter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Catch accessibility and design issues in your React Native code before they reach
            production.
          </p>
        </div>

        {/* Shared Report Banner */}
        {isSharedReport && sharedTimestamp && (
          <div className="mb-4 px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Viewing a shared report · Generated on {formatDate(sharedTimestamp)}
            </p>
            <button
              onClick={handleEditSharedCode}
              className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 underline"
            >
              Edit this code
            </button>
          </div>
        )}

        {/* Editor */}
        <LintEditor
          code={code}
          onChange={setCode}
          placeholder="// Paste your React Native code here..."
          readOnly={isSharedReport}
        />

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 mb-8 flex-wrap">
          {!isSharedReport && (
            <>
              <button
                onClick={handleLint}
                disabled={!code.trim() || isLinting}
                className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLinting ? 'Linting...' : 'Lint Code'}
              </button>
              <button
                onClick={handleClear}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleLoadExample}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Load Example
              </button>
            </>
          )}
          {score !== null && (
            <button
              onClick={handleShare}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {copyFeedback ? 'Link copied!' : 'Share Report'}
            </button>
          )}
        </div>

        {/* Results */}
        {score !== null && <LintResults issues={results} score={score} />}

        {/* Rules Panel */}
        {!isSharedReport && (
          <LintRulesPanel enabledRules={enabledRules} onToggleRule={handleToggleRule} />
        )}

        {/* Footer info */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            About this linter
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Accessibility Rules
              </h3>
              <ul className="space-y-1">
                <li>• Missing accessibility labels on icon-only buttons</li>
                <li>• Missing accessibility roles on interactive elements</li>
                <li>• TouchableWithoutFeedback usage (no visual feedback)</li>
                <li>• Images without accessible descriptions</li>
                <li>• Touch targets smaller than 44px minimum</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Design Rules</h3>
              <ul className="space-y-1">
                <li>• Hardcoded color values instead of tokens</li>
                <li>• Spacing values outside the design scale</li>
                <li>• Border radius values outside the design scale</li>
                <li>• Missing dark mode variants for color classes</li>
                <li>• Font sizes outside the typography scale</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
            Based on WCAG 2.1 guidelines (4.1.2 Name, Role, Value • 1.1.1 Non-text Content • 2.5.5
            Target Size)
          </p>
        </div>
      </div>
    </div>
  );
}
