import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import type { File } from '@babel/types';
import type { Rule, RuleContext, LintIssue, RuleVisitor } from './types.js';
import * as fs from 'fs';

export interface ParseResult {
  ast: File;
  source: string;
}

/**
 * Parse a file into an AST
 */
export function parseFile(filePath: string): ParseResult | null {
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const ast = parser.parse(source, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        'classProperties',
        'decorators-legacy',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'dynamicImport',
        'nullishCoalescingOperator',
        'optionalChaining',
      ],
    });

    return { ast, source };
  } catch (error) {
    console.error(`Failed to parse ${filePath}:`, error);
    return null;
  }
}

/**
 * Parse source code string into an AST
 */
export function parseSource(source: string): File | null {
  try {
    return parser.parse(source, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        'classProperties',
        'decorators-legacy',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'dynamicImport',
        'nullishCoalescingOperator',
        'optionalChaining',
      ],
    });
  } catch (error) {
    return null;
  }
}

/**
 * Get source code for a node
 */
export function getSourceForNode(source: string, node: { start?: number | null; end?: number | null }): string {
  if (node.start == null || node.end == null) return '';
  return source.slice(node.start, node.end);
}

/**
 * Run rules against an AST
 */
export function runRules(
  ast: File,
  source: string,
  filename: string,
  rules: Rule[]
): LintIssue[] {
  const issues: LintIssue[] = [];

  // Create contexts and visitors for all rules
  const visitors: Record<string, Array<(path: any) => void>> = {};

  for (const rule of rules) {
    const context: RuleContext = {
      filename,
      report: (issue) => {
        issues.push({
          ...issue,
          file: filename,
        });
      },
      getSource: (node) => getSourceForNode(source, node),
    };

    const ruleVisitor = rule.create(context);

    // Merge rule visitors
    for (const [key, handler] of Object.entries(ruleVisitor)) {
      if (handler) {
        if (!visitors[key]) {
          visitors[key] = [];
        }
        visitors[key].push(handler);
      }
    }
  }

  // Create combined visitor
  const combinedVisitor: Record<string, (path: any) => void> = {};

  for (const [key, handlers] of Object.entries(visitors)) {
    combinedVisitor[key] = (path) => {
      for (const handler of handlers) {
        try {
          handler(path);
        } catch (error) {
          // Silently continue on rule errors
        }
      }
    };
  }

  // Traverse AST with combined visitor
  try {
    traverse(ast, combinedVisitor);
  } catch (error) {
    console.error(`Error traversing ${filename}:`, error);
  }

  return issues;
}

/**
 * Extract code snippet around a line
 */
export function extractCodeSnippet(source: string, line: number, contextLines: number = 1): string {
  const lines = source.split('\n');
  const startLine = Math.max(0, line - 1 - contextLines);
  const endLine = Math.min(lines.length, line + contextLines);

  return lines
    .slice(startLine, endLine)
    .map((l, i) => {
      const lineNum = startLine + i + 1;
      const prefix = lineNum === line ? '>' : ' ';
      return `${prefix} ${lineNum.toString().padStart(4)} | ${l}`;
    })
    .join('\n');
}
