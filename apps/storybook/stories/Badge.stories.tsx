import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Badge } from '@r-ui/react-native';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'error', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Badge size',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </View>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </View>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="secondary">Draft</Badge>
    </View>
  ),
};
