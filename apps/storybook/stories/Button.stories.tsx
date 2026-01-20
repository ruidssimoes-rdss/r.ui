import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Button, ButtonGroup } from '@r-ui/react-native';
import Svg, { Line, Circle, Path, Rect, Polyline } from 'react-native-svg';

// Icon components for stories
function XIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
}

function SettingsIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="3" />
      <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </Svg>
  );
}

function MenuIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Line x1="3" y1="12" x2="21" y2="12" />
      <Line x1="3" y1="6" x2="21" y2="6" />
      <Line x1="3" y1="18" x2="21" y2="18" />
    </Svg>
  );
}

function CopyIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Svg>
  );
}

function CheckIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <Polyline points="20 6 9 17 4 12" />
    </Svg>
  );
}

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link', 'success'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon-sm', 'icon', 'icon-lg'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (polymorphic)',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    asChild: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// === Variant Stories ===

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Link: Story = {
  args: {
    children: 'Learn more',
    variant: 'link',
  },
};

export const Success: Story = {
  args: {
    children: 'Confirm',
    variant: 'success',
  },
};

// === Size Stories ===

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// === Icon Size Stories ===

export const IconSmall: Story = {
  args: {
    size: 'icon-sm',
    variant: 'secondary',
    accessibilityLabel: 'Close',
  },
  render: (args) => (
    <Button {...args}>
      <XIcon size={16} color="#fff" />
    </Button>
  ),
};

export const IconDefault: Story = {
  args: {
    size: 'icon',
    variant: 'secondary',
    accessibilityLabel: 'Settings',
  },
  render: (args) => (
    <Button {...args}>
      <SettingsIcon size={20} color="#fff" />
    </Button>
  ),
};

export const IconLarge: Story = {
  args: {
    size: 'icon-lg',
    variant: 'secondary',
    accessibilityLabel: 'Menu',
  },
  render: (args) => (
    <Button {...args}>
      <MenuIcon size={24} color="#fff" />
    </Button>
  ),
};

// === Icon Button Variant Combinations ===

export const IconOutline: Story = {
  args: {
    size: 'icon',
    variant: 'outline',
    accessibilityLabel: 'Settings',
  },
  render: (args) => (
    <Button {...args}>
      <SettingsIcon size={20} color="#fff" />
    </Button>
  ),
};

export const IconGhost: Story = {
  args: {
    size: 'icon',
    variant: 'ghost',
    accessibilityLabel: 'Close',
  },
  render: (args) => (
    <Button {...args}>
      <XIcon size={20} color="rgba(255,255,255,0.6)" />
    </Button>
  ),
};

export const IconDestructive: Story = {
  args: {
    size: 'icon',
    variant: 'destructive',
    accessibilityLabel: 'Delete',
  },
  render: (args) => (
    <Button {...args}>
      <XIcon size={20} color="#fff" />
    </Button>
  ),
};

export const IconSuccess: Story = {
  args: {
    size: 'icon',
    variant: 'success',
    accessibilityLabel: 'Confirm',
  },
  render: (args) => (
    <Button {...args}>
      <CheckIcon size={20} color="#fff" />
    </Button>
  ),
};

// === State Stories ===

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const LoadingSuccess: Story = {
  args: {
    children: 'Saving...',
    variant: 'success',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

// === asChild Stories ===

export const AsChild: Story = {
  render: () => (
    <Button asChild variant="primary">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <CopyIcon size={16} color="#0a0a0a" />
        <Text style={{ color: '#0a0a0a', fontWeight: '600' }}>Custom Child</Text>
      </View>
    </Button>
  ),
};

export const AsChildLink: Story = {
  render: () => (
    <Button asChild variant="link">
      <Text style={{ color: '#3b82f6', fontWeight: '600' }}>Link as Text</Text>
    </Button>
  ),
};

// === ButtonGroup Stories ===

export const GroupSpaced: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">One</Button>
      <Button variant="outline">Two</Button>
      <Button variant="outline">Three</Button>
    </ButtonGroup>
  ),
};

export const GroupAttached: Story = {
  render: () => (
    <ButtonGroup attached>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Cut</Button>
      <Button variant="outline">Paste</Button>
    </ButtonGroup>
  ),
};

export const GroupVertical: Story = {
  render: () => (
    <ButtonGroup vertical>
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const GroupVerticalAttached: Story = {
  render: () => (
    <ButtonGroup vertical attached>
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const GroupWithSize: Story = {
  render: () => (
    <ButtonGroup size="sm">
      <Button variant="secondary">Small</Button>
      <Button variant="secondary">Buttons</Button>
      <Button variant="secondary">Group</Button>
    </ButtonGroup>
  ),
};

// === Composite Stories ===

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button variant="success">Success</Button>
    </View>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </View>
  ),
};

export const AllIconSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Button size="icon-sm" variant="secondary" accessibilityLabel="Close">
        <XIcon size={16} color="#fff" />
      </Button>
      <Button size="icon" variant="secondary" accessibilityLabel="Settings">
        <SettingsIcon size={20} color="#fff" />
      </Button>
      <Button size="icon-lg" variant="secondary" accessibilityLabel="Menu">
        <MenuIcon size={24} color="#fff" />
      </Button>
    </View>
  ),
};

export const IconButtonVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Button size="icon" variant="primary" accessibilityLabel="Primary">
        <SettingsIcon size={20} color="#0a0a0a" />
      </Button>
      <Button size="icon" variant="outline" accessibilityLabel="Outline">
        <SettingsIcon size={20} color="#fff" />
      </Button>
      <Button size="icon" variant="ghost" accessibilityLabel="Ghost">
        <XIcon size={20} color="rgba(255,255,255,0.6)" />
      </Button>
      <Button size="icon" variant="destructive" accessibilityLabel="Delete">
        <XIcon size={20} color="#fff" />
      </Button>
      <Button size="icon" variant="success" accessibilityLabel="Confirm">
        <CheckIcon size={20} color="#fff" />
      </Button>
    </View>
  ),
};
