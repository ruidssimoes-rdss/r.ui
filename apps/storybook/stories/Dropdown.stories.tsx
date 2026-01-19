import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  Button,
} from '@r-ui/react-native';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Content alignment',
    },
  },
  args: {
    align: 'start',
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>Open Menu</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem onSelect={() => console.log('Profile')}>Profile</DropdownItem>
        <DropdownItem onSelect={() => console.log('Settings')}>Settings</DropdownItem>
        <DropdownItem onSelect={() => console.log('Help')}>Help</DropdownItem>
        <DropdownSeparator />
        <DropdownItem onSelect={() => console.log('Logout')} destructive>
          Logout
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <View style={{ alignItems: 'center' }}>
      <Dropdown align="center">
        <DropdownTrigger>
          <Button>Center Aligned</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem>Option 3</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </View>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <View style={{ alignItems: 'flex-end' }}>
      <Dropdown align="end">
        <DropdownTrigger>
          <Button>End Aligned</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem>Option 3</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </View>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button>Menu with Disabled</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Active Item</DropdownItem>
        <DropdownItem disabled>Disabled Item</DropdownItem>
        <DropdownItem>Another Active</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

export const WithDestructiveItem: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button>Actions</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Duplicate</DropdownItem>
        <DropdownSeparator />
        <DropdownItem destructive>Delete</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

export const ContextMenuStyle: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="ghost">
          <Text style={{ fontSize: 20 }}>...</Text>
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Copy</DropdownItem>
        <DropdownItem>Cut</DropdownItem>
        <DropdownItem>Paste</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Select All</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};
