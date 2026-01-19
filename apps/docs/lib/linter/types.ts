export type Severity = 'error' | 'warning' | 'info';

export interface LintIssue {
  rule: string;
  severity: Severity;
  message: string;
  line: number;
  column: number;
  code: string;
  fix?: string;
  docs?: string;
}
