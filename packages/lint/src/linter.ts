import { glob } from 'glob';
import * as path from 'path';
import { parseFile, runRules } from './parser.js';
import { allRules, getRulesByNames } from './rules/index.js';
import { calculateScore } from './utils.js';
import type { LintResult, LinterOptions, Severity } from './types.js';

const SEVERITY_ORDER: Record<Severity, number> = {
  error: 0,
  warning: 1,
  info: 2,
};

/**
 * Run the linter on specified paths
 */
export async function runLinter(
  paths: string[],
  options: LinterOptions = {}
): Promise<LintResult[]> {
  const results: LintResult[] = [];

  // Determine which rules to run
  let rulesToRun = allRules;

  if (options.rules && options.rules.length > 0) {
    rulesToRun = getRulesByNames(options.rules);
  }

  // Filter rules by severity
  const minSeverity = options.severity ?? 'warning';
  const minSeverityOrder = SEVERITY_ORDER[minSeverity];

  rulesToRun = rulesToRun.filter(
    rule => SEVERITY_ORDER[rule.severity] <= minSeverityOrder
  );

  // Expand paths to files
  const files = await expandPaths(paths, options.ignore);

  // Process each file
  for (const file of files) {
    const result = await lintFile(file, rulesToRun);
    if (result) {
      // Filter issues by severity
      result.issues = result.issues.filter(
        issue => SEVERITY_ORDER[issue.severity] <= minSeverityOrder
      );

      // Only include files with issues or all files for JSON output
      if (result.issues.length > 0 || options.format === 'json') {
        results.push(result);
      }
    }
  }

  return results;
}

/**
 * Lint a single file
 */
async function lintFile(
  filePath: string,
  rules: typeof allRules
): Promise<LintResult | null> {
  const parseResult = parseFile(filePath);

  if (!parseResult) {
    return null;
  }

  const { ast, source } = parseResult;
  const issues = runRules(ast, source, filePath, rules);

  // Sort issues by line number
  issues.sort((a, b) => a.line - b.line);

  // Calculate score
  const errors = issues.filter(i => i.severity === 'error').length;
  const warnings = issues.filter(i => i.severity === 'warning').length;
  const infos = issues.filter(i => i.severity === 'info').length;
  const score = calculateScore(errors, warnings, infos);

  return {
    file: filePath,
    issues,
    score,
  };
}

/**
 * Expand paths to individual files
 */
async function expandPaths(
  paths: string[],
  ignore?: string[]
): Promise<string[]> {
  const files: Set<string> = new Set();
  const defaultIgnore = [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/*.d.ts',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
  ];

  const ignorePatterns = [...defaultIgnore, ...(ignore ?? [])];

  for (const inputPath of paths) {
    const absolutePath = path.resolve(inputPath);

    // Check if it's a directory or a file pattern
    const matches = await glob(absolutePath, {
      ignore: ignorePatterns,
      nodir: true,
    });

    if (matches.length > 0) {
      for (const match of matches) {
        if (isSupportedFile(match)) {
          files.add(match);
        }
      }
    } else {
      // Try as a directory
      const dirPattern = path.join(absolutePath, '**/*.{ts,tsx,js,jsx}');
      const dirMatches = await glob(dirPattern, {
        ignore: ignorePatterns,
        nodir: true,
      });

      for (const match of dirMatches) {
        if (isSupportedFile(match)) {
          files.add(match);
        }
      }
    }
  }

  return Array.from(files).sort();
}

/**
 * Check if a file is supported for linting
 */
function isSupportedFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return ['.ts', '.tsx', '.js', '.jsx'].includes(ext);
}

/**
 * Get summary statistics from lint results
 */
export function getLintSummary(results: LintResult[]): {
  filesScanned: number;
  totalIssues: number;
  errors: number;
  warnings: number;
  infos: number;
  averageScore: number;
} {
  const filesScanned = results.length;
  let totalIssues = 0;
  let errors = 0;
  let warnings = 0;
  let infos = 0;
  let totalScore = 0;

  for (const result of results) {
    totalIssues += result.issues.length;
    totalScore += result.score;

    for (const issue of result.issues) {
      switch (issue.severity) {
        case 'error':
          errors++;
          break;
        case 'warning':
          warnings++;
          break;
        case 'info':
          infos++;
          break;
      }
    }
  }

  return {
    filesScanned,
    totalIssues,
    errors,
    warnings,
    infos,
    averageScore: filesScanned > 0 ? Math.round(totalScore / filesScanned) : 100,
  };
}
