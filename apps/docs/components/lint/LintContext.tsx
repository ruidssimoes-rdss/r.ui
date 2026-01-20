'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { lintCode } from '@/lib/linter';
import { encodeReport, decodeReport } from '@/lib/linter/share';
import type { LintIssue } from '@/lib/linter/types';

// ========================================
// Types
// ========================================

export type LintTab = 'issues' | 'rules' | 'learn' | 'share';
export type OutputViewMode = 'issues' | 'fixed';

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

interface LintState {
  code: string;
  issues: LintIssue[];
  score: number | null;
  isLinting: boolean;
  activeTab: LintTab;
  enabledRules: string[];
  outputViewMode: OutputViewMode;
  isSharedReport: boolean;
  sharedTimestamp: number | null;
  copyFeedback: boolean;
}

interface LintContextValue extends LintState {
  // Setters
  setCode: (code: string) => void;
  setActiveTab: (tab: LintTab) => void;
  setOutputViewMode: (mode: OutputViewMode) => void;
  toggleRule: (rule: string) => void;

  // Actions
  handleClear: () => void;
  handleLoadExample: () => void;
  handleShare: () => Promise<void>;
  handleEditSharedCode: () => void;
  handleCodeChangeFromFix: (newCode: string) => void;

  // Computed
  errors: LintIssue[];
  warnings: LintIssue[];
  infos: LintIssue[];
  allRules: string[];
}

// ========================================
// Constants
// ========================================

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

// ========================================
// Context
// ========================================

const LintContext = createContext<LintContextValue | null>(null);

// ========================================
// Provider
// ========================================

interface LintProviderProps {
  children: ReactNode;
  initialReport?: string | null;
}

export function LintProvider({ children, initialReport }: LintProviderProps) {
  const [code, setCodeInternal] = useState('');
  const [issues, setIssues] = useState<LintIssue[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [isLinting, setIsLinting] = useState(false);
  const [activeTab, setActiveTab] = useState<LintTab>('issues');
  const [enabledRules, setEnabledRules] = useState<string[]>(ALL_RULES);
  const [outputViewMode, setOutputViewMode] = useState<OutputViewMode>('issues');
  const [isSharedReport, setIsSharedReport] = useState(false);
  const [sharedTimestamp, setSharedTimestamp] = useState<number | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Load shared report from URL on mount
  useEffect(() => {
    if (initialReport) {
      const report = decodeReport(initialReport);
      if (report) {
        setCodeInternal(report.code);
        setIssues(report.results);
        setScore(report.score);
        setIsSharedReport(true);
        setSharedTimestamp(report.timestamp);
      }
    }
  }, [initialReport]);

  // Auto-lint with debounce
  useEffect(() => {
    if (!code.trim() || isSharedReport) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsLinting(true);
      try {
        const { issues: newIssues, score: newScore } = await lintCode(code, enabledRules);
        setIssues(newIssues);
        setScore(newScore);
      } catch (error) {
        console.error('Lint error:', error);
      } finally {
        setIsLinting(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [code, enabledRules, isSharedReport]);

  // Code setter that clears shared report state
  const setCode = useCallback((newCode: string) => {
    setCodeInternal(newCode);
    if (isSharedReport) {
      setIsSharedReport(false);
      setSharedTimestamp(null);
      window.history.replaceState({}, '', '/lint');
    }
  }, [isSharedReport]);

  // Toggle a rule
  const toggleRule = useCallback((rule: string) => {
    setEnabledRules((prev) =>
      prev.includes(rule) ? prev.filter((r) => r !== rule) : [...prev, rule]
    );
  }, []);

  // Clear code
  const handleClear = useCallback(() => {
    setCodeInternal('');
    setIssues([]);
    setScore(null);
    setIsSharedReport(false);
    setSharedTimestamp(null);
    window.history.replaceState({}, '', '/lint');
  }, []);

  // Load example
  const handleLoadExample = useCallback(() => {
    setCodeInternal(EXAMPLE_CODE);
    setIsSharedReport(false);
    setSharedTimestamp(null);
    window.history.replaceState({}, '', '/lint');
  }, []);

  // Share report
  const handleShare = useCallback(async () => {
    if (score === null) return;

    const report = {
      code,
      results: issues,
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
  }, [code, issues, score]);

  // Edit shared code
  const handleEditSharedCode = useCallback(() => {
    setIsSharedReport(false);
    setSharedTimestamp(null);
    window.history.replaceState({}, '', '/lint');
  }, []);

  // Handle code change from fix - updates code input and triggers auto-lint
  const handleCodeChangeFromFix = useCallback((newCode: string) => {
    // Update code state - this will update the code input panel
    setCodeInternal(newCode);
    // Clear stale issues immediately to prevent showing old highlights on new code
    // The auto-lint useEffect will repopulate issues after debounce
    setIssues([]);
    setScore(null);
    // Clear shared report state
    setIsSharedReport(false);
    setSharedTimestamp(null);
    window.history.replaceState({}, '', '/lint');
    // Auto-lint will be triggered by the useEffect watching code changes
  }, []);

  // Computed values
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');
  const infos = issues.filter((i) => i.severity === 'info');

  const value: LintContextValue = {
    code,
    issues,
    score,
    isLinting,
    activeTab,
    enabledRules,
    outputViewMode,
    isSharedReport,
    sharedTimestamp,
    copyFeedback,
    setCode,
    setActiveTab,
    setOutputViewMode,
    toggleRule,
    handleClear,
    handleLoadExample,
    handleShare,
    handleEditSharedCode,
    handleCodeChangeFromFix,
    errors,
    warnings,
    infos,
    allRules: ALL_RULES,
  };

  return (
    <LintContext.Provider value={value}>
      {children}
    </LintContext.Provider>
  );
}

// ========================================
// Hook
// ========================================

export function useLint() {
  const context = useContext(LintContext);
  if (!context) {
    throw new Error('useLint must be used within a LintProvider');
  }
  return context;
}
