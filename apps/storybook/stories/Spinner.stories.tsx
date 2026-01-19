import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Spinner, colors } from '@r-ui/react-native';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    variant: {
      control: 'select',
      options: ['default', 'dots'],
      description: 'Spinner variant',
    },
    color: {
      control: 'color',
      description: 'Spinner color',
    },
  },
  args: {
    size: 'md',
    variant: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
  },
};

export const DotsSmall: Story = {
  args: {
    variant: 'dots',
    size: 'sm',
  },
};

export const DotsLarge: Story = {
  args: {
    variant: 'dots',
    size: 'lg',
  },
};

export const CustomColor: Story = {
  args: {
    color: colors.accent.blue.DEFAULT,
  },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </View>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 32 }}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Spinner variant="default" />
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Spinner variant="dots" />
      </View>
    </View>
  ),
};

export const WithColors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
      <Spinner color={colors.accent.blue.DEFAULT} />
      <Spinner color={colors.accent.green.DEFAULT} />
      <Spinner color={colors.accent.amber.DEFAULT} />
      <Spinner color={colors.accent.red.DEFAULT} />
    </View>
  ),
};
