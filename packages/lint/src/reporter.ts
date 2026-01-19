import chalk from 'chalk';
import * as path from 'path';
import type { LintResult, LintIssue, Severity } from './types.js';
import { getLintSummary } from './linter.js';

const SEVERITY_COLORS: Record<Severity, typeof chalk.red> = {
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
};

const SEVERITY_LABELS: Record<Severity, string> = {
  error: 'ERROR',
  warning: 'WARNING',
  info: 'INFO',
};

/**
 * Format lint results for output
 */
export function formatResults(
  results: LintResult[],
  format: 'stylish' | 'json' | 'compact' = 'stylish'
): string {
  switch (format) {
    case 'json':
      return formatJson(results);
    case 'compact':
      return formatCompact(results);
    default:
      return formatStylish(results);
  }
}

/**
 * Stylish format with colors and boxes
 */
function formatStylish(results: LintResult[]): string {
  const output: string[] = [];
  const separator = chalk.gray('═'.repeat(67));
  const thinSeparator = chalk.gray('─'.repeat(67));

  // Filter results with issues
  const resultsWithIssues = results.filter(r => r.issues.length > 0);

  if (resultsWithIssues.length === 0) {
    output.push('');
    output.push(chalk.green('✓ No issues found!'));
    output.push('');
    return output.join('\n');
  }

  for (const result of resultsWithIssues) {
    const relativePath = path.relative(process.cwd(), result.file);

    output.push('');
    output.push(separator);
    output.push(chalk.bold(`  r.ui DESIGN REVIEW: ${relativePath}`));
    output.push(separator);

    // Group issues by severity
    const errors = result.issues.filter(i => i.severity === 'error');
    const warnings = result.issues.filter(i => i.severity === 'warning');
    const infos = result.issues.filter(i => i.severity === 'info');

    // Errors
    if (errors.length > 0) {
      output.push('');
      output.push(chalk.red.bold(`  ERRORS (${errors.length})`));
      output.push(thinSeparator);
      for (const issue of errors) {
        output.push(formatIssue(issue));
      }
    }

    // Warnings
    if (warnings.length > 0) {
      output.push('');
      output.push(chalk.yellow.bold(`  WARNINGS (${warnings.length})`));
      output.push(thinSeparator);
      for (const issue of warnings) {
        output.push(formatIssue(issue));
      }
    }

    // Info
    if (infos.length > 0) {
      output.push('');
      output.push(chalk.blue.bold(`  INFO (${infos.length})`));
      output.push(thinSeparator);
      for (const issue of infos) {
        output.push(formatIssue(issue));
      }
    }
  }

  // Summary
  const summary = getLintSummary(results);

  output.push('');
  output.push(separator);
  output.push(chalk.bold('  SUMMARY'));
  output.push(separator);
  output.push('');
  output.push(`  Files scanned:  ${chalk.cyan(summary.filesScanned.toString())}`);

  const issueText = formatIssueCounts(summary.errors, summary.warnings, summary.infos);
  output.push(`  Issues found:   ${summary.totalIssues} ${issueText}`);

  const scoreColor =
    summary.averageScore >= 80
      ? chalk.green
      : summary.averageScore >= 60
        ? chalk.yellow
        : chalk.red;
  output.push(`  Score:          ${scoreColor(`${summary.averageScore}/100`)}`);

  output.push('');
  output.push(separator);
  output.push('');

  return output.join('\n');
}

/**
 * Format a single issue
 */
function formatIssue(issue: LintIssue): string {
  const lines: string[] = [];
  const color = SEVERITY_COLORS[issue.severity];

  // Rule and location
  lines.push(`  ${color(`[${issue.rule}]`)} ${chalk.gray(`Line ${issue.line}`)}`);

  // Message
  lines.push(`  ${issue.message}`);

  // Code snippet
  if (issue.code) {
    const codeLines = issue.code.split('\n').slice(0, 4); // Limit to 4 lines
    for (const line of codeLines) {
      lines.push(`  ${chalk.gray('│')} ${chalk.gray(line.trim())}`);
    }
  }

  // Fix suggestion
  if (issue.fix) {
    lines.push('');
    lines.push(`  ${chalk.green('Fix:')} ${issue.fix}`);
  }

  // Documentation reference
  if (issue.docs) {
    lines.push(`  ${chalk.cyan('Ref:')} ${issue.docs}`);
  }

  lines.push('');

  return lines.join('\n');
}

/**
 * Format issue counts
 */
function formatIssueCounts(errors: number, warnings: number, infos: number): string {
  const parts: string[] = [];

  if (errors > 0) {
    parts.push(chalk.red(`${errors} error${errors !== 1 ? 's' : ''}`));
  }
  if (warnings > 0) {
    parts.push(chalk.yellow(`${warnings} warning${warnings !== 1 ? 's' : ''}`));
  }
  if (infos > 0) {
    parts.push(chalk.blue(`${infos} info`));
  }

  return parts.length > 0 ? `(${parts.join(', ')})` : '';
}

/**
 * JSON format
 */
function formatJson(results: LintResult[]): string {
  const summary = getLintSummary(results);

  return JSON.stringify(
    {
      results,
      summary,
    },
    null,
    2
  );
}

/**
 * Compact format (one line per issue)
 */
function formatCompact(results: LintResult[]): string {
  const lines: string[] = [];

  for (const result of results) {
    const relativePath = path.relative(process.cwd(), result.file);

    for (const issue of result.issues) {
      const color = SEVERITY_COLORS[issue.severity];
      const label = SEVERITY_LABELS[issue.severity];

      lines.push(
        `${relativePath}:${issue.line}:${issue.column} ${color(label)} [${issue.rule}] ${issue.message}`
      );
    }
  }

  // Add summary line
  const summary = getLintSummary(results);
  lines.push('');
  lines.push(
    `${summary.filesScanned} file(s), ${summary.totalIssues} issue(s) ` +
      `(${summary.errors} errors, ${summary.warnings} warnings, ${summary.infos} info)`
  );

  return lines.join('\n');
}

/**
 * Print results to console
 */
export function printResults(
  results: LintResult[],
  format: 'stylish' | 'json' | 'compact' = 'stylish'
): void {
  console.log(formatResults(results, format));
}
