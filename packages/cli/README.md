# Hyena Studio CLI

Pull design tokens from Hyena Studio into your project.

## Installation

```bash
# Using npx (no install needed)
npx hyena-studio init

# Or install globally
npm install -g hyena-studio
```

## Usage

### Initialize tokens

```bash
npx hyena-studio init
```

This will prompt you for:

- Your Hyena Studio share URL
- Output format (CSS, Tailwind, JSON, React Native, Hyena Theme)
- Output directory

### Pull latest tokens

After initializing, pull the latest tokens:

```bash
npx hyena-studio pull
```

This reads from `hyena.config.json` and updates your token files.

### Options

```bash
# Initialize with options
npx hyena-studio init --url "https://hyena.studio/studio?t=..." --format tailwind --output ./src/tokens

# Skip prompts for CI/CD
npx hyena-studio init --url "..." --format css --skip-prompts

# Pull with custom config
npx hyena-studio pull --config ./my-config.json
```

## Output Formats

| Format     | Output              | Description                |
| ---------- | ------------------- | -------------------------- |
| `css`      | `tokens.css`        | CSS custom properties      |
| `tailwind` | `tailwind.theme.js` | Tailwind theme extension   |
| `json`     | `tokens.json`       | W3C Design Tokens format   |
| `rn`       | `tokens.ts`         | React Native StyleSheet    |
| `hyena`    | `theme.ts`          | Hyena library theme        |

## Configuration

The CLI saves your preferences to `hyena.config.json`:

```json
{
  "url": "https://hyena.studio/studio?t=...",
  "output": "./tokens",
  "format": "css",
  "lastPull": "2024-01-15T10:30:00.000Z"
}
```

## Integration with CI/CD

Add token pulling to your build process:

```json
{
  "scripts": {
    "tokens": "npx hyena-studio pull",
    "build": "npm run tokens && next build"
  }
}
```

## Getting Your Share URL

1. Open Hyena Studio at https://hyena.studio/studio
2. Create or customize your token system
3. Click the "Share" button
4. Copy the generated URL

The URL contains your complete token system encoded as a parameter.

## Updating Tokens

When you make changes to your design system in Hyena Studio:

1. Generate a new share URL
2. Update the `url` in your `hyena.config.json`
3. Run `npx hyena-studio pull`

Or for a fresh start:

```bash
npx hyena-studio init --url "new-url-here"
```

## License

MIT
