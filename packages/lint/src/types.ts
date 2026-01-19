import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';

export type Severity = 'error' | 'warning' | 'info';

export interface LintIssue {
  rule: string;
  severity: Severity;
  message: string;
  file: string;
  line: number;
  column: number;
  code: string;
  fix?: string;
  docs?: string;
}

export interface LintResult {
  file: string;
  issues: LintIssue[];
  score: number;
}

export interface RuleContext {
  filename: string;
  report: (issue: Omit<LintIssue, 'file'>) => void;
  getSource: (node: t.Node) => string;
}

export type RuleVisitor = {
  JSXElement?: (path: NodePath<t.JSXElement>) => void;
  JSXAttribute?: (path: NodePath<t.JSXAttribute>) => void;
  JSXOpeningElement?: (path: NodePath<t.JSXOpeningElement>) => void;
  JSXSpreadAttribute?: (path: NodePath<t.JSXSpreadAttribute>) => void;
  CallExpression?: (path: NodePath<t.CallExpression>) => void;
  [key: string]: ((path: NodePath<any>) => void) | undefined;
};

export interface Rule {
  name: string;
  description: string;
  severity: Severity;
  category: 'a11y' | 'design' | 'component';
  create: (context: RuleContext) => RuleVisitor;
}

export interface LinterOptions {
  format?: 'stylish' | 'json' | 'compact';
  fix?: boolean;
  severity?: Severity;
  rules?: string[];
  ignore?: string[];
}

export interface LintSummary {
  filesScanned: number;
  totalIssues: number;
  errors: number;
  warnings: number;
  infos: number;
  averageScore: number;
}
