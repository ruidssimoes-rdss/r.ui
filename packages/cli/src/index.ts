#!/usr/bin/env node

import { Command } from 'commander';
import pc from 'picocolors';
import { initCommand } from './commands/init.js';
import { pullCommand } from './commands/pull.js';

const program = new Command();

// ASCII art logo
const logo = `
  ${pc.cyan('╦ ╦╦ ╦╔═╗╔╗╔╔═╗')}
  ${pc.cyan('╠═╣╚╦╝║╣ ║║║╠═╣')}
  ${pc.cyan('╩ ╩ ╩ ╚═╝╝╚╝╩ ╩')} ${pc.dim('studio')}
`;

program
  .name('hyena-studio')
  .description('Pull design tokens from Hyena Studio into your project')
  .version('0.1.0')
  .addHelpText('before', logo);

program
  .command('init')
  .description('Initialize Hyena Studio tokens in your project')
  .option('-u, --url <url>', 'Hyena Studio share URL')
  .option('-o, --output <dir>', 'Output directory', './tokens')
  .option(
    '-f, --format <format>',
    'Output format (css|tailwind|json|rn|hyena)',
    'css'
  )
  .option('--skip-prompts', 'Skip interactive prompts')
  .action(initCommand);

program
  .command('pull')
  .description('Pull latest tokens from a configured source')
  .option('-c, --config <file>', 'Config file path', 'hyena.config.json')
  .action(pullCommand);

program.parse();
