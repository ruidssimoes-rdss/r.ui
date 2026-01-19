import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
  Input,
} from '@r-ui/react-native';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Side to show popover',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment relative to trigger',
    },
  },
  args: {
    side: 'bottom',
    align: 'center',
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => (
    <View style={{ alignItems: 'center', paddingTop: 100 }}>
      <Popover {...args}>
        <PopoverTrigger>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <View style={{ gap: 8, width: 200 }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>Popover Title</Text>
            <Text style={{ color: '#9ca3af', fontSize: 14 }}>
              This is some popover content.
            </Text>
          </View>
        </PopoverContent>
      </Popover>
    </View>
  ),
};

export const SideTop: Story = {
  render: () => (
    <View style={{ alignItems: 'center', paddingTop: 150 }}>
      <Popover side="top">
        <PopoverTrigger>
          <Button>Open Top</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text style={{ color: '#fff' }}>Popover on top</Text>
        </PopoverContent>
      </Popover>
    </View>
  ),
};

export const SideLeft: Story = {
  render: () => (
    <View style={{ alignItems: 'center', paddingLeft: 200 }}>
      <Popover side="left">
        <PopoverTrigger>
          <Button>Open Left</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text style={{ color: '#fff' }}>Popover on left</Text>
        </PopoverContent>
      </Popover>
    </View>
  ),
};

export const SideRight: Story = {
  render: () => (
    <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
      <Popover side="right">
        <PopoverTrigger>
          <Button>Open Right</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Text style={{ color: '#fff' }}>Popover on right</Text>
        </PopoverContent>
      </Popover>
    </View>
  ),
};

export const WithForm: Story = {
  render: () => (
    <View style={{ alignItems: 'center', paddingTop: 100 }}>
      <Popover>
        <PopoverTrigger>
          <Button>Edit Profile</Button>
        </PopoverTrigger>
        <PopoverContent>
          <View style={{ gap: 12, width: 240 }}>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
              Edit Profile
            </Text>
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
              <PopoverClose>
                <Button variant="ghost" size="sm">Cancel</Button>
              </PopoverClose>
              <Button size="sm">Save</Button>
            </View>
          </View>
        </PopoverContent>
      </Popover>
    </View>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <View style={{ alignItems: 'center', paddingTop: 100 }}>
      <Popover>
        <PopoverTrigger>
          <Button>Info</Button>
        </PopoverTrigger>
        <PopoverContent>
          <View style={{ gap: 12, width: 200 }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>Information</Text>
            <Text style={{ color: '#9ca3af', fontSize: 14 }}>
              Here is some helpful information about this feature.
            </Text>
            <PopoverClose>
              <Button size="sm">Got it</Button>
            </PopoverClose>
          </View>
        </PopoverContent>
      </Popover>
    </View>
  ),
};
