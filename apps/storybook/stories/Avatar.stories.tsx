import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Avatar } from '@r-ui/react-native';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    fallback: {
      control: 'text',
      description: 'Fallback initials when image fails',
    },
  },
  args: {
    size: 'md',
    fallback: 'JD',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=1',
    alt: 'John Doe',
  },
};

export const WithFallback: Story = {
  args: {
    fallback: 'JD',
  },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-image-url.com/404.jpg',
    fallback: 'AB',
    alt: 'Alice Brown',
  },
};

export const Small: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=2',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=3',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=4',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=5',
    size: 'xl',
  },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </View>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <View style={{ flexDirection: 'row' }}>
      <Avatar
        src="https://i.pravatar.cc/150?u=10"
        size="md"
        style={{ marginRight: -8, borderWidth: 2, borderColor: '#000' }}
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=11"
        size="md"
        style={{ marginRight: -8, borderWidth: 2, borderColor: '#000' }}
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=12"
        size="md"
        style={{ marginRight: -8, borderWidth: 2, borderColor: '#000' }}
      />
      <Avatar
        fallback="+3"
        size="md"
        style={{ borderWidth: 2, borderColor: '#000' }}
      />
    </View>
  ),
};
