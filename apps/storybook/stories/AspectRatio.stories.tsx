import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, Image } from 'react-native';
import { AspectRatio, colors } from '@r-ui/react-native';

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  argTypes: {
    ratio: {
      control: { type: 'number', min: 0.1, max: 5, step: 0.1 },
      description: 'Aspect ratio (width/height)',
    },
  },
  args: {
    ratio: 16 / 9,
  },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Ratio16x9: Story = {
  render: (args) => (
    <View style={{ width: 300 }}>
      <AspectRatio {...args}>
        <View style={{
          flex: 1,
          backgroundColor: colors.bg.elevated,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
          <Text style={{ color: colors.text.primary }}>16:9</Text>
        </View>
      </AspectRatio>
    </View>
  ),
};

export const Square: Story = {
  render: () => (
    <View style={{ width: 200 }}>
      <AspectRatio ratio={1}>
        <View style={{
          flex: 1,
          backgroundColor: colors.accent.blue.DEFAULT,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
          <Text style={{ color: colors.white }}>1:1</Text>
        </View>
      </AspectRatio>
    </View>
  ),
};

export const Ratio4x3: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <AspectRatio ratio={4 / 3}>
        <View style={{
          flex: 1,
          backgroundColor: colors.accent.green.DEFAULT,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
          <Text style={{ color: colors.white }}>4:3</Text>
        </View>
      </AspectRatio>
    </View>
  ),
};

export const Portrait: Story = {
  render: () => (
    <View style={{ width: 200 }}>
      <AspectRatio ratio={3 / 4}>
        <View style={{
          flex: 1,
          backgroundColor: colors.accent.amber.DEFAULT,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
          <Text style={{ color: colors.black }}>3:4</Text>
        </View>
      </AspectRatio>
    </View>
  ),
};

export const Ultrawide: Story = {
  render: () => (
    <View style={{ width: 400 }}>
      <AspectRatio ratio={21 / 9}>
        <View style={{
          flex: 1,
          backgroundColor: colors.accent.purple.DEFAULT,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
          <Text style={{ color: colors.white }}>21:9</Text>
        </View>
      </AspectRatio>
    </View>
  ),
};

export const WithImage: Story = {
  render: () => (
    <View style={{ width: 300 }}>
      <AspectRatio ratio={16 / 9}>
        <Image
          source={{ uri: 'https://picsum.photos/800/450' }}
          style={{ flex: 1, borderRadius: 8 }}
          resizeMode="cover"
        />
      </AspectRatio>
    </View>
  ),
};

export const AllRatios: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{ width: 200 }}>
        <Text style={{ color: colors.text.secondary, marginBottom: 8 }}>1:1 (Square)</Text>
        <AspectRatio ratio={1}>
          <View style={{ flex: 1, backgroundColor: colors.bg.elevated, borderRadius: 8 }} />
        </AspectRatio>
      </View>
      <View style={{ width: 200 }}>
        <Text style={{ color: colors.text.secondary, marginBottom: 8 }}>4:3</Text>
        <AspectRatio ratio={4 / 3}>
          <View style={{ flex: 1, backgroundColor: colors.bg.elevated, borderRadius: 8 }} />
        </AspectRatio>
      </View>
      <View style={{ width: 200 }}>
        <Text style={{ color: colors.text.secondary, marginBottom: 8 }}>16:9</Text>
        <AspectRatio ratio={16 / 9}>
          <View style={{ flex: 1, backgroundColor: colors.bg.elevated, borderRadius: 8 }} />
        </AspectRatio>
      </View>
    </View>
  ),
};

export const VideoPlaceholder: Story = {
  render: () => (
    <View style={{ width: 400 }}>
      <AspectRatio ratio={16 / 9}>
        <View style={{
          flex: 1,
          backgroundColor: colors.bg.surface,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colors.border.default,
        }}>
          <View style={{
            width: 60,
            height: 60,
            backgroundColor: colors.bg.elevated,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ color: colors.text.primary, fontSize: 24 }}>▶</Text>
          </View>
        </View>
      </AspectRatio>
    </View>
  ),
};
