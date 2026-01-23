import prompts from 'prompts';
import pc from 'picocolors';
import { decodeTokensFromUrl, fetchTokensFromUrl } from '../utils/api.js';
import { generateOutput } from '../utils/files.js';
import { saveConfig } from '../utils/config.js';

interface InitOptions {
  url?: string;
  output?: string;
  format?: string;
  skipPrompts?: boolean;
}

const FORMAT_OPTIONS = [
  {
    title: 'CSS Variables',
    value: 'css',
    description: 'Standard CSS custom properties',
  },
  {
    title: 'Tailwind Config',
    value: 'tailwind',
    description: 'Tailwind CSS theme extension',
  },
  {
    title: 'JSON (W3C)',
    value: 'json',
    description: 'W3C Design Tokens format',
  },
  {
    title: 'React Native',
    value: 'rn',
    description: 'React Native StyleSheet',
  },
  {
    title: 'Hyena Theme',
    value: 'hyena',
    description: 'Hyena component library theme',
  },
];

export async function initCommand(options: InitOptions): Promise<void> {
  console.log(pc.cyan('\n  Hyena Studio - Token Initializer\n'));

  let url = options.url;
  let outputDir = options.output || './tokens';
  let format = options.format || 'css';

  // Interactive prompts if not skipped
  if (!options.skipPrompts) {
    const response = await prompts(
      [
        {
          type: url ? null : 'text',
          name: 'url',
          message: 'Paste your Hyena Studio share URL:',
          validate: (value: string) => {
            if (!value) return 'URL is required';
            try {
              new URL(value);
              if (!value.includes('?t=')) {
                return 'URL must include token data (?t= parameter)';
              }
              return true;
            } catch {
              return 'Please enter a valid URL';
            }
          },
        },
        {
          type: 'select',
          name: 'format',
          message: 'Choose output format:',
          choices: FORMAT_OPTIONS,
          initial: FORMAT_OPTIONS.findIndex((f) => f.value === format),
        },
        {
          type: 'text',
          name: 'output',
          message: 'Output directory:',
          initial: outputDir,
        },
        {
          type: 'confirm',
          name: 'saveConfig',
          message: 'Save configuration for future pulls?',
          initial: true,
        },
      ],
      {
        onCancel: () => {
          console.log(pc.red('\n  Aborted.\n'));
          process.exit(1);
        },
      }
    );

    if (!response.url && !url) {
      console.log(pc.red('  Aborted.\n'));
      process.exit(1);
    }

    url = response.url || url;
    format = response.format || format;
    outputDir = response.output || outputDir;

    // Save config if requested
    if (response.saveConfig && url) {
      await saveConfig({
        url,
        output: outputDir,
        format,
      });
      console.log(pc.dim('  Saved config to hyena.config.json'));
    }
  }

  if (!url) {
    console.log(pc.red('  URL is required. Use --url or run without --skip-prompts.\n'));
    process.exit(1);
  }

  // Fetch tokens
  console.log(pc.dim('\n  Fetching tokens...'));

  let tokens;
  try {
    tokens = await fetchTokensFromUrl(url);
  } catch {
    // Try to decode from URL directly (for share URLs)
    try {
      tokens = decodeTokensFromUrl(url);
    } catch (error) {
      console.log(pc.red(`  Failed to fetch tokens: ${error}`));
      process.exit(1);
    }
  }

  if (!tokens) {
    console.log(pc.red('  No tokens found in URL'));
    process.exit(1);
  }

  console.log(pc.green(`  ✓ Found token system: ${tokens.name}`));

  // Generate output files
  console.log(pc.dim(`  Generating ${format} output...`));

  try {
    const files = await generateOutput(tokens, format, outputDir);

    console.log(pc.green('\n  ✓ Files created:'));
    for (const file of files) {
      console.log(pc.dim(`    ${file}`));
    }
  } catch (error) {
    console.log(pc.red(`  Failed to generate files: ${error}`));
    process.exit(1);
  }

  // Success message
  console.log(pc.cyan('\n  ✨ Tokens initialized successfully!\n'));

  // Usage hints
  console.log(pc.dim('  Next steps:'));
  if (format === 'css') {
    console.log(pc.dim('    Import in your CSS: @import "./tokens/tokens.css";'));
  } else if (format === 'tailwind') {
    console.log(
      pc.dim('    Extend your tailwind.config.js with the generated theme')
    );
  } else if (format === 'rn') {
    console.log(
      pc.dim('    Import in your app: import { colors, spacing } from "./tokens";')
    );
  } else if (format === 'hyena') {
    console.log(
      pc.dim('    Import in your app: import { theme } from "./tokens/theme";')
    );
  }
  console.log(pc.dim('    Run `npx hyena-studio pull` to update tokens later\n'));
}
