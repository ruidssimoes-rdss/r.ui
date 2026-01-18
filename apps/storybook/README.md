# R.UI Storybook

Interactive component development environment for the R.UI React Native component library.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation

From the monorepo root:

```bash
pnpm install
```

### Running Storybook

From the monorepo root:

```bash
pnpm storybook
```

Or from this directory:

```bash
pnpm start
```

Then:
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Scan the QR code with Expo Go app on your device

## Adding Stories

Create new story files in `stories/` directory:

```tsx
// stories/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from '@r-ui/react-native';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  argTypes: {
    // Define controls for props
  },
};

export default meta;

type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

After adding stories, regenerate the story list:

```bash
pnpm storybook-generate
```

## Project Structure

```
apps/storybook/
├── .storybook/
│   ├── main.ts              # Storybook configuration
│   ├── preview.tsx          # Global decorators
│   ├── index.tsx            # Storybook UI entry
│   └── storybook.requires.ts # Auto-generated story imports
├── stories/
│   ├── Button.stories.tsx
│   ├── Card.stories.tsx
│   └── Input.stories.tsx
├── App.tsx                  # Expo entry point
├── metro.config.js          # Metro bundler config
├── tailwind.config.js       # NativeWind/Tailwind config
└── global.css               # Tailwind imports
```

## Assets

Add the following images to `assets/`:
- `icon.png` (1024x1024) - App icon
- `splash.png` (1284x2778) - Splash screen
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (48x48) - Web favicon
