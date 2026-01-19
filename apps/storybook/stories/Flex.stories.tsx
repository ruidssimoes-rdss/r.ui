import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Flex, colors } from '@r-ui/react-native';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Flex direction',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Justify content',
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch', 'baseline'],
      description: 'Align items',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: 'Gap between items',
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'wrap-reverse'],
      description: 'Flex wrap',
    },
  },
  args: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    gap: 4,
    wrap: 'nowrap',
  },
};

export default meta;

type Story = StoryObj<typeof Flex>;

const Box = ({ children, width = 60 }: { children: string; width?: number }) => (
  <View style={{
    backgroundColor: colors.accent.blue.DEFAULT,
    padding: 12,
    borderRadius: 4,
    width,
    alignItems: 'center',
  }}>
    <Text style={{ color: colors.white }}>{children}</Text>
  </View>
);

export const Row: Story = {
  render: (args) => (
    <Flex {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Flex>
  ),
};

export const Column: Story = {
  render: () => (
    <Flex direction="column" gap={4}>
      <Box width={100}>1</Box>
      <Box width={100}>2</Box>
      <Box width={100}>3</Box>
    </Flex>
  ),
};

export const JustifyBetween: Story = {
  render: () => (
    <Flex justify="between" style={{ width: 300 }}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Flex>
  ),
};

export const JustifyCenter: Story = {
  render: () => (
    <Flex justify="center" style={{ width: 300 }}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Flex>
  ),
};

export const JustifyAround: Story = {
  render: () => (
    <Flex justify="around" style={{ width: 300 }}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Flex>
  ),
};

export const JustifyEvenly: Story = {
  render: () => (
    <Flex justify="evenly" style={{ width: 300 }}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Flex>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <Flex align="center" gap={4} style={{ height: 100, backgroundColor: colors.bg.surface }}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Flex>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Flex wrap="wrap" gap={4} style={{ width: 200 }}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
    </Flex>
  ),
};

export const AllGaps: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 8 }}>gap: 2</Text>
        <Flex gap={2}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </View>
      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 8 }}>gap: 4</Text>
        <Flex gap={4}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </View>
      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 8 }}>gap: 8</Text>
        <Flex gap={8}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </View>
    </View>
  ),
};

export const FlexGrow: Story = {
  render: () => (
    <Flex gap={4} style={{ width: 300 }}>
      <Box width={60}>Fixed</Box>
      <View style={{
        flex: 1,
        backgroundColor: colors.accent.green.DEFAULT,
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
      }}>
        <Text style={{ color: colors.white }}>Flex</Text>
      </View>
      <Box width={60}>Fixed</Box>
    </Flex>
  ),
};
