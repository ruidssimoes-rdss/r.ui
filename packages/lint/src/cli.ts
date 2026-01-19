#!/usr/bin/env node

import { Command } from 'commander';
import { runLinter } from './linter.js';
import { formatResults } from './reporter.js';
import { getRuleDocumentation } from './rules/index.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('r-ui-lint')
  .description('Design and accessibility linter for r.ui components')
  .version('0.1.0')
  .argument('[paths...]', 'Files or directories to lint', ['src/'])
  .option(
    '-f, --format <format>',
    'Output format (stylish|json|compact)',
    'stylish'
  )
  .option('--fix', 'Automatically fix problems (where possible)', false)
  .option(
    '--severity <level>',
    'Minimum severity to report (error|warning|info)',
    'warning'
  )
  .option('--rules <rules>', 'Comma-separated list of rules to run')
  .option('--ignore <patterns>', 'Comma-separated patterns to ignore')
  .option('--list-rules', 'List all available rules')
  .action(async (paths, options) => {
    // List rules if requested
    if (options.listRules) {
      listRules();
      process.exit(0);
    }

    // Parse comma-separated options
    const rules = options.rules?.split(',').map((r: string) => r.trim());
    const ignore = options.ignore?.split(',').map((p: string) => p.trim());

    try {
      const results = await runLinter(paths, {
        format: options.format,
        fix: options.fix,
        severity: options.severity,
        rules,
        ignore,
      });

      console.log(formatResults(results, options.format));

      // Exit with error code if there are errors
      const hasErrors = results.some(r =>
        r.issues.some(i => i.severity === 'error')
      );
      process.exit(hasErrors ? 1 : 0);
    } catch (error) {
      console.error(chalk.red('Error running linter:'), error);
      process.exit(1);
    }
  });

function listRules(): void {
  const rules = getRuleDocumentation();

  console.log('');
  console.log(chalk.bold('Available Rules'));
  console.log(chalk.gray('═'.repeat(67)));
  console.log('');

  // Group by category
  const a11yRules = rules.filter(r => r.category === 'a11y');
  const designRules = rules.filter(r => r.category === 'design');

  console.log(chalk.cyan.bold('  Accessibility Rules (a11y)'));
  console.log(chalk.gray('  ─'.repeat(32)));
  for (const rule of a11yRules) {
    const severityColor =
      rule.severity === 'error'
        ? chalk.red
        : rule.severity === 'warning'
          ? chalk.yellow
          : chalk.blue;
    console.log(`  ${chalk.white(rule.name)}`);
    console.log(`    ${chalk.gray(rule.description)}`);
    console.log(`    Severity: ${severityColor(rule.severity)}`);
    console.log('');
  }

  console.log(chalk.magenta.bold('  Design Rules'));
  console.log(chalk.gray('  ─'.repeat(32)));
  for (const rule of designRules) {
    const severityColor =
      rule.severity === 'error'
        ? chalk.red
        : rule.severity === 'warning'
          ? chalk.yellow
          : chalk.blue;
    console.log(`  ${chalk.white(rule.name)}`);
    console.log(`    ${chalk.gray(rule.description)}`);
    console.log(`    Severity: ${severityColor(rule.severity)}`);
    console.log('');
  }

  console.log(chalk.gray('═'.repeat(67)));
  console.log('');
  console.log(chalk.gray('Use --rules to run specific rules:'));
  console.log(chalk.gray('  r-ui-lint src/ --rules a11y/missing-accessibility-label'));
  console.log(chalk.gray('  r-ui-lint src/ --rules a11y       # Run all a11y rules'));
  console.log('');
}

program.parse();
