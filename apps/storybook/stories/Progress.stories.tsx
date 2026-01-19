import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Progress } from '@r-ui/react-native';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Progress bar size',
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage label',
    },
  },
  args: {
    value: 60,
    variant: 'default',
    size: 'md',
    showValue: false,
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true,
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    showValue: true,
  },
};

export const Warning: Story = {
  args: {
    value: 45,
    variant: 'warning',
    showValue: true,
  },
};

export const Error: Story = {
  args: {
    value: 25,
    variant: 'error',
    showValue: true,
  },
};

export const Small: Story = {
  args: {
    value: 50,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    value: 50,
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16, width: 300 }}>
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </View>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16, width: 300 }}>
      <Progress value={25} variant="default" showValue />
      <Progress value={50} variant="success" showValue />
      <Progress value={75} variant="warning" showValue />
      <Progress value={100} variant="error" showValue />
    </View>
  ),
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    variant: 'success',
    showValue: true,
  },
};
