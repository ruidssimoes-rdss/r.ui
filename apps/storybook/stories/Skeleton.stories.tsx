import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Skeleton } from '@r-ui/react-native';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
      description: 'Shape variant',
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton',
    },
    animate: {
      control: 'boolean',
      description: 'Enable shimmer animation',
    },
  },
  args: {
    variant: 'text',
    animate: true,
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: 200,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    height: 48,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 120,
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'text',
    width: 200,
    animate: false,
  },
};

export const TextLines: Story = {
  render: () => (
    <View style={{ gap: 8, width: 300 }}>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
    </View>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <View style={{ gap: 12, width: 300 }}>
      <Skeleton variant="rectangular" width="100%" height={180} />
      <View style={{ gap: 8 }}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
      </View>
    </View>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Skeleton variant="circular" height={56} />
      <View style={{ gap: 8, flex: 1 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </View>
    </View>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Skeleton variant="circular" height={40} />
          <View style={{ gap: 6, flex: 1 }}>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
          </View>
        </View>
      ))}
    </View>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ gap: 4 }}>
        <Skeleton variant="text" width={200} />
      </View>
      <View style={{ gap: 4 }}>
        <Skeleton variant="circular" height={48} />
      </View>
      <View style={{ gap: 4 }}>
        <Skeleton variant="rectangular" width={200} height={100} />
      </View>
    </View>
  ),
};
