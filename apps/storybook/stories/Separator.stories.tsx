import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Separator, colors } from '@r-ui/react-native';

const meta: Meta<typeof Separator> = {
  title: 'Layout/Separator',
  component: Separator,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Separator orientation',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether purely decorative',
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: (args) => (
    <View style={{ width: 300 }}>
      <Text style={{ color: colors.text.primary }}>Content above</Text>
      <Separator {...args} />
      <Text style={{ color: colors.text.primary }}>Content below</Text>
    </View>
  ),
};

export const Vertical: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
      <Text style={{ color: colors.text.primary }}>Left</Text>
      <Separator orientation="vertical" />
      <Text style={{ color: colors.text.primary }}>Right</Text>
    </View>
  ),
};

export const InList: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <View style={{ padding: 12 }}>
        <Text style={{ color: colors.text.primary }}>Item 1</Text>
      </View>
      <Separator />
      <View style={{ padding: 12 }}>
        <Text style={{ color: colors.text.primary }}>Item 2</Text>
      </View>
      <Separator />
      <View style={{ padding: 12 }}>
        <Text style={{ color: colors.text.primary }}>Item 3</Text>
      </View>
    </View>
  ),
};

export const InToolbar: Story = {
  render: () => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.bg.elevated,
      padding: 8,
      borderRadius: 8,
      height: 44,
    }}>
      <Text style={{ color: colors.text.primary, paddingHorizontal: 12 }}>Edit</Text>
      <Separator orientation="vertical" style={{ marginVertical: 8 }} />
      <Text style={{ color: colors.text.primary, paddingHorizontal: 12 }}>View</Text>
      <Separator orientation="vertical" style={{ marginVertical: 8 }} />
      <Text style={{ color: colors.text.primary, paddingHorizontal: 12 }}>Help</Text>
    </View>
  ),
};

export const WithSections: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <Text style={{ color: colors.text.primary, fontWeight: '600', marginBottom: 8 }}>
        Section 1
      </Text>
      <Text style={{ color: colors.text.secondary }}>
        Some content for the first section.
      </Text>
      <Separator style={{ marginVertical: 16 }} />
      <Text style={{ color: colors.text.primary, fontWeight: '600', marginBottom: 8 }}>
        Section 2
      </Text>
      <Text style={{ color: colors.text.secondary }}>
        Some content for the second section.
      </Text>
    </View>
  ),
};

export const CustomStyle: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <Text style={{ color: colors.text.primary }}>Above</Text>
      <Separator style={{
        backgroundColor: colors.accent.blue.DEFAULT,
        height: 2,
        marginVertical: 16,
      }} />
      <Text style={{ color: colors.text.primary }}>Below</Text>
    </View>
  ),
};
