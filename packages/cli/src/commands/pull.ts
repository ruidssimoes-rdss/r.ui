import pc from 'picocolors';
import { loadConfig } from '../utils/config.js';
import { fetchTokensFromUrl, decodeTokensFromUrl } from '../utils/api.js';
import { generateOutput } from '../utils/files.js';

interface PullOptions {
  config?: string;
}

export async function pullCommand(options: PullOptions): Promise<void> {
  console.log(pc.cyan('\n  Hyena Studio - Token Pull\n'));

  // Load config
  const configPath = options.config || 'hyena.config.json';
  const config = await loadConfig(configPath);

  if (!config) {
    console.log(pc.red(`  No config found at ${configPath}`));
    console.log(
      pc.dim('  Run `npx hyena-studio init` first to set up your project.\n')
    );
    process.exit(1);
  }

  console.log(pc.dim(`  Source: ${config.url}`));
  console.log(pc.dim(`  Format: ${config.format}`));
  console.log(pc.dim(`  Output: ${config.output}\n`));

  // Fetch tokens
  console.log(pc.dim('  Fetching tokens...'));

  let tokens;
  try {
    tokens = await fetchTokensFromUrl(config.url);
  } catch {
    try {
      tokens = decodeTokensFromUrl(config.url);
    } catch (error) {
      console.log(pc.red(`  Failed to fetch tokens: ${error}`));
      process.exit(1);
    }
  }

  if (!tokens) {
    console.log(pc.red('  No tokens found'));
    process.exit(1);
  }

  console.log(pc.green(`  ✓ Found: ${tokens.name}`));

  // Generate output
  console.log(pc.dim(`  Updating files...`));

  try {
    const files = await generateOutput(tokens, config.format, config.output);

    console.log(pc.green('\n  ✓ Updated files:'));
    for (const file of files) {
      console.log(pc.dim(`    ${file}`));
    }
  } catch (error) {
    console.log(pc.red(`  Failed to generate files: ${error}`));
    process.exit(1);
  }

  console.log(pc.cyan('\n  ✨ Tokens updated successfully!\n'));
}
