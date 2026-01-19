# @r-ui/lint

Design and accessibility linter for r.ui React Native components. Scans JSX/TSX files and reports issues with accessibility, design token usage, and component patterns.

## Features

- **Accessibility Rules** - Catch missing labels, roles, small touch targets, and more
- **Design Rules** - Enforce design token usage for colors, spacing, radius, and typography
- **Beautiful Output** - Colored, formatted reports with fix suggestions
- **Multiple Formats** - Stylish (default), JSON, or compact output
- **Flexible Configuration** - Run specific rules, filter by severity, ignore patterns

## Installation

```bash
pnpm add -D @r-ui/lint
```

## Usage

### CLI

```bash
# Lint a directory
npx r-ui-lint src/

# Lint specific files
npx r-ui-lint src/components/Button/Button.tsx

# With options
npx r-ui-lint src/ --severity error --format json

# List all available rules
npx r-ui-lint --list-rules
```

### CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `-f, --format <format>` | Output format: `stylish`, `json`, `compact` | `stylish` |
| `--severity <level>` | Minimum severity: `error`, `warning`, `info` | `warning` |
| `--rules <rules>` | Comma-separated list of rules to run | all |
| `--ignore <patterns>` | Comma-separated patterns to ignore | - |
| `--fix` | Auto-fix problems (where possible) | `false` |
| `--list-rules` | List all available rules | - |

### Programmatic API

```typescript
import { runLinter, formatResults } from '@r-ui/lint';

const results = await runLinter(['src/components/'], {
  severity: 'warning',
  format: 'stylish',
});

console.log(formatResults(results));
```

## Rules

### Accessibility Rules (`a11y/*`)

| Rule | Severity | Description |
|------|----------|-------------|
| `a11y/missing-accessibility-label` | error | Icon-only interactive elements must have `accessibilityLabel` |
| `a11y/missing-accessibility-role` | warning | Interactive elements should have `accessibilityRole` |
| `a11y/touchable-missing-feedback` | warning | Avoid `TouchableWithoutFeedback` - provides no visual feedback |
| `a11y/image-missing-alt` | error | Images must have accessible labels |
| `a11y/small-touch-target` | warning | Touch targets must be at least 44x44px |

### Design Rules (`design/*`)

| Rule | Severity | Description |
|------|----------|-------------|
| `design/hardcoded-color` | warning | Use design tokens instead of hardcoded colors |
| `design/hardcoded-spacing` | info | Use spacing scale tokens instead of arbitrary values |
| `design/inconsistent-radius` | info | Use design system radius tokens |
| `design/missing-dark-mode` | warning | Light mode colors should have dark mode variants |
| `design/non-token-font-size` | info | Use typography scale tokens for font sizes |

## Example Output

```
═══════════════════════════════════════════════════════════════════
  r.ui DESIGN REVIEW: src/components/Button/Button.tsx
═══════════════════════════════════════════════════════════════════

  ERRORS (1)
───────────────────────────────────────────────────────────────────

  [a11y/missing-accessibility-label] Line 45
  Icon-only pressable missing accessibilityLabel
  │ <Pressable onPress={onClose}>
  │   <Icon name="close" />
  │ </Pressable>

  Fix: Add accessibilityLabel="<descriptive label>"
  Ref: https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html

  WARNINGS (2)
───────────────────────────────────────────────────────────────────

  [design/hardcoded-color] Line 23
  Hardcoded color value: #3b82f6
  │ backgroundColor: '#3b82f6'

  Fix: Use design token: bg-<token> (e.g., bg-primary, bg-secondary)

  [a11y/small-touch-target] Line 67
  Touch target below 44px minimum (width: 32px, height: 32px)
  │ <Pressable className="w-8 h-8">

  Fix: Minimum touch target should be 44x44px (w-11 h-11 in Tailwind)
  Ref: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html

═══════════════════════════════════════════════════════════════════
  SUMMARY
═══════════════════════════════════════════════════════════════════

  Files scanned:  12
  Issues found:   3 (1 error, 2 warnings)
  Score:          78/100

═══════════════════════════════════════════════════════════════════
```

## Running Specific Rules

```bash
# Run only accessibility rules
npx r-ui-lint src/ --rules a11y

# Run specific rules
npx r-ui-lint src/ --rules a11y/missing-accessibility-label,design/hardcoded-color

# Only show errors
npx r-ui-lint src/ --severity error
```

## Integration

### Add to package.json scripts

```json
{
  "scripts": {
    "lint:design": "r-ui-lint src/",
    "lint:design:fix": "r-ui-lint src/ --fix"
  }
}
```

### CI Integration

```yaml
# GitHub Actions
- name: Design Lint
  run: npx r-ui-lint src/ --format compact --severity error
```

## WCAG References

- **WCAG 4.1.2** - Name, Role, Value
- **WCAG 1.1.1** - Non-text Content
- **WCAG 2.5.5** - Target Size (Enhanced)

## License

MIT
