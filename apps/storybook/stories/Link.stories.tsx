import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Link } from '@r-ui/react-native';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'destructive'],
      description: 'Visual variant',
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
      description: 'Underline behavior',
    },
    external: {
      control: 'boolean',
      description: 'Opens in browser',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the link',
    },
    children: {
      control: 'text',
      description: 'Link text',
    },
  },
  args: {
    children: 'Link text',
    variant: 'default',
    underline: 'always',
    external: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: 'Click here',
    onPress: () => console.log('Link pressed'),
  },
};

export const External: Story = {
  args: {
    children: 'Visit Website',
    href: 'https://example.com',
    external: true,
  },
};

export const Muted: Story = {
  args: {
    children: 'Secondary link',
    variant: 'muted',
    onPress: () => {},
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete account',
    variant: 'destructive',
    onPress: () => {},
  },
};

export const NoUnderline: Story = {
  args: {
    children: 'No underline',
    underline: 'none',
    onPress: () => {},
  },
};

export const UnderlineOnHover: Story = {
  args: {
    children: 'Hover for underline',
    underline: 'hover',
    onPress: () => {},
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled link',
    disabled: true,
    onPress: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Link variant="default" onPress={() => {}}>Default link</Link>
      <Link variant="muted" onPress={() => {}}>Muted link</Link>
      <Link variant="destructive" onPress={() => {}}>Destructive link</Link>
    </View>
  ),
};

export const AllUnderlineStyles: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Link underline="always" onPress={() => {}}>Always underlined</Link>
      <Link underline="hover" onPress={() => {}}>Underline on press</Link>
      <Link underline="none" onPress={() => {}}>Never underlined</Link>
    </View>
  ),
};

export const InlineText: Story = {
  render: () => (
    <Text style={{ color: '#9ca3af', fontSize: 14, lineHeight: 22 }}>
      By clicking continue, you agree to our{' '}
      <Link onPress={() => {}}>Terms of Service</Link>
      {' '}and{' '}
      <Link onPress={() => {}}>Privacy Policy</Link>.
    </Text>
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Link href="https://github.com" external>GitHub</Link>
      <Link href="https://twitter.com" external>Twitter</Link>
      <Link href="https://linkedin.com" external>LinkedIn</Link>
    </View>
  ),
};
