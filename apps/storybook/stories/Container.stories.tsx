import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Container, colors } from '@r-ui/react-native';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Maximum width size',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Horizontal padding',
    },
    centered: {
      control: 'boolean',
      description: 'Center the container',
    },
  },
  args: {
    size: 'lg',
    padding: 'md',
    centered: true,
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

const DemoContent = () => (
  <View style={{ backgroundColor: colors.bg.elevated, padding: 16, borderRadius: 8 }}>
    <Text style={{ color: colors.text.primary }}>Container content</Text>
  </View>
);

export const Default: Story = {
  render: (args) => (
    <Container {...args}>
      <DemoContent />
    </Container>
  ),
};

export const Small: Story = {
  render: () => (
    <Container size="sm">
      <DemoContent />
    </Container>
  ),
};

export const Medium: Story = {
  render: () => (
    <Container size="md">
      <DemoContent />
    </Container>
  ),
};

export const Large: Story = {
  render: () => (
    <Container size="lg">
      <DemoContent />
    </Container>
  ),
};

export const ExtraLarge: Story = {
  render: () => (
    <Container size="xl">
      <DemoContent />
    </Container>
  ),
};

export const Full: Story = {
  render: () => (
    <Container size="full">
      <DemoContent />
    </Container>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16, width: '100%' }}>
      <Container size="sm" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
        <Text style={{ color: colors.text.primary, padding: 8 }}>sm (640px)</Text>
      </Container>
      <Container size="md" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
        <Text style={{ color: colors.text.primary, padding: 8 }}>md (768px)</Text>
      </Container>
      <Container size="lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
        <Text style={{ color: colors.text.primary, padding: 8 }}>lg (1024px)</Text>
      </Container>
      <Container size="xl" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
        <Text style={{ color: colors.text.primary, padding: 8 }}>xl (1280px)</Text>
      </Container>
    </View>
  ),
};

export const PaddingVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Container padding="none" style={{ backgroundColor: colors.bg.elevated }}>
        <Text style={{ color: colors.text.primary }}>No padding</Text>
      </Container>
      <Container padding="sm" style={{ backgroundColor: colors.bg.elevated }}>
        <Text style={{ color: colors.text.primary }}>Small padding</Text>
      </Container>
      <Container padding="md" style={{ backgroundColor: colors.bg.elevated }}>
        <Text style={{ color: colors.text.primary }}>Medium padding</Text>
      </Container>
      <Container padding="lg" style={{ backgroundColor: colors.bg.elevated }}>
        <Text style={{ color: colors.text.primary }}>Large padding</Text>
      </Container>
    </View>
  ),
};

export const NotCentered: Story = {
  render: () => (
    <Container size="sm" centered={false}>
      <DemoContent />
    </Container>
  ),
};
