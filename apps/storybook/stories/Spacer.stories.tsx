import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Spacer, colors } from '@r-ui/react-native';

const meta: Meta<typeof Spacer> = {
  title: 'Layout/Spacer',
  component: Spacer,
  argTypes: {
    size: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24],
      description: 'Space size (spacing token)',
    },
    axis: {
      control: 'select',
      options: ['horizontal', 'vertical', 'both'],
      description: 'Direction of spacing',
    },
    flex: {
      control: 'boolean',
      description: 'Take up remaining space',
    },
  },
  args: {
    size: 4,
    axis: 'vertical',
    flex: false,
  },
};

export default meta;

type Story = StoryObj<typeof Spacer>;

const Box = ({ children }: { children: string }) => (
  <View style={{
    backgroundColor: colors.accent.blue.DEFAULT,
    padding: 12,
    borderRadius: 4,
  }}>
    <Text style={{ color: colors.white }}>{children}</Text>
  </View>
);

export const Vertical: Story = {
  render: (args) => (
    <View>
      <Box>Item 1</Box>
      <Spacer {...args} />
      <Box>Item 2</Box>
    </View>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <View style={{ flexDirection: 'row' }}>
      <Box>Left</Box>
      <Spacer axis="horizontal" size={4} />
      <Box>Right</Box>
    </View>
  ),
};

export const FlexSpacer: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', width: 300 }}>
      <Box>Start</Box>
      <Spacer flex />
      <Box>End</Box>
    </View>
  ),
};

export const FlexVertical: Story = {
  render: () => (
    <View style={{ height: 200 }}>
      <Box>Top</Box>
      <Spacer flex />
      <Box>Bottom</Box>
    </View>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 4 }}>size: 2 (8px)</Text>
        <View style={{ backgroundColor: colors.bg.surface, padding: 8 }}>
          <Box>A</Box>
          <Spacer size={2} />
          <Box>B</Box>
        </View>
      </View>
      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 4 }}>size: 4 (16px)</Text>
        <View style={{ backgroundColor: colors.bg.surface, padding: 8 }}>
          <Box>A</Box>
          <Spacer size={4} />
          <Box>B</Box>
        </View>
      </View>
      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 4 }}>size: 8 (32px)</Text>
        <View style={{ backgroundColor: colors.bg.surface, padding: 8 }}>
          <Box>A</Box>
          <Spacer size={8} />
          <Box>B</Box>
        </View>
      </View>
    </View>
  ),
};

export const InHeader: Story = {
  render: () => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.bg.elevated,
      padding: 12,
      borderRadius: 8,
    }}>
      <Text style={{ color: colors.text.primary, fontWeight: '600' }}>Logo</Text>
      <Spacer flex />
      <Text style={{ color: colors.text.secondary }}>Menu</Text>
      <Spacer axis="horizontal" size={4} />
      <Text style={{ color: colors.text.secondary }}>Profile</Text>
    </View>
  ),
};

export const InForm: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <View style={{ backgroundColor: colors.bg.elevated, padding: 16, borderRadius: 8 }}>
        <Text style={{ color: colors.text.primary }}>Email</Text>
        <View style={{ height: 40, backgroundColor: colors.bg.surface, marginTop: 8, borderRadius: 4 }} />
      </View>
      <Spacer size={4} />
      <View style={{ backgroundColor: colors.bg.elevated, padding: 16, borderRadius: 8 }}>
        <Text style={{ color: colors.text.primary }}>Password</Text>
        <View style={{ height: 40, backgroundColor: colors.bg.surface, marginTop: 8, borderRadius: 4 }} />
      </View>
      <Spacer size={6} />
      <View style={{ backgroundColor: colors.accent.blue.DEFAULT, padding: 12, borderRadius: 8, alignItems: 'center' }}>
        <Text style={{ color: colors.white }}>Submit</Text>
      </View>
    </View>
  ),
};
