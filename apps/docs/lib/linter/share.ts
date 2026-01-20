import type { LintIssue } from './types';

export interface ShareableReport {
  code: string;
  results: LintIssue[];
  score: number;
  timestamp: number;
}

export function encodeReport(report: ShareableReport): string {
  return btoa(encodeURIComponent(JSON.stringify(report)));
}

export function decodeReport(encoded: string): ShareableReport | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}
