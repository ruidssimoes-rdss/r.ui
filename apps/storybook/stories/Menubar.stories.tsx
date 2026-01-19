import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { useState } from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from '@r-ui/react-native';

const meta: Meta<typeof Menubar> = {
  title: 'Components/Menubar',
  component: Menubar,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Menubar orientation',
    },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;

type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: (args) => (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onPress={() => console.log('New')}>New</MenubarItem>
          <MenubarItem onPress={() => console.log('Open')}>Open</MenubarItem>
          <MenubarItem onPress={() => console.log('Save')}>Save</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onPress={() => console.log('Exit')}>Exit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onPress={() => console.log('Undo')}>Undo</MenubarItem>
          <MenubarItem onPress={() => console.log('Redo')}>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onPress={() => console.log('Cut')}>Cut</MenubarItem>
          <MenubarItem onPress={() => console.log('Copy')}>Copy</MenubarItem>
          <MenubarItem onPress={() => console.log('Paste')}>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onPress={() => console.log('Zoom In')}>Zoom In</MenubarItem>
          <MenubarItem onPress={() => console.log('Zoom Out')}>Zoom Out</MenubarItem>
          <MenubarItem onPress={() => console.log('Reset')}>Reset Zoom</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="⌘N" onPress={() => {}}>New</MenubarItem>
          <MenubarItem shortcut="⌘O" onPress={() => {}}>Open</MenubarItem>
          <MenubarItem shortcut="⌘S" onPress={() => {}}>Save</MenubarItem>
          <MenubarItem shortcut="⇧⌘S" onPress={() => {}}>Save As...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="⌘Q" onPress={() => {}}>Quit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="⌘Z" onPress={() => {}}>Undo</MenubarItem>
          <MenubarItem shortcut="⇧⌘Z" onPress={() => {}}>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="⌘X" onPress={() => {}}>Cut</MenubarItem>
          <MenubarItem shortcut="⌘C" onPress={() => {}}>Copy</MenubarItem>
          <MenubarItem shortcut="⌘V" onPress={() => {}}>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onPress={() => {}}>Undo</MenubarItem>
          <MenubarItem disabled>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Cut</MenubarItem>
          <MenubarItem onPress={() => {}}>Copy</MenubarItem>
          <MenubarItem onPress={() => {}}>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => {
    const [showToolbar, setShowToolbar] = useState(true);
    const [showStatusBar, setShowStatusBar] = useState(false);
    const [wordWrap, setWordWrap] = useState(true);

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem
              checked={showToolbar}
              onCheckedChange={setShowToolbar}
            >
              Show Toolbar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Show Status Bar
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarCheckboxItem
              checked={wordWrap}
              onCheckedChange={setWordWrap}
            >
              Word Wrap
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const WithRadioItems: Story = {
  render: () => {
    const [fontSize, setFontSize] = useState('medium');

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Format</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={fontSize} onValueChange={setFontSize}>
              <MenubarRadioItem value="small">Small</MenubarRadioItem>
              <MenubarRadioItem value="medium">Medium</MenubarRadioItem>
              <MenubarRadioItem value="large">Large</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <Menubar orientation="vertical">
      <MenubarMenu>
        <MenubarTrigger>Option 1</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onPress={() => {}}>Sub Item A</MenubarItem>
          <MenubarItem onPress={() => {}}>Sub Item B</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Option 2</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onPress={() => {}}>Sub Item C</MenubarItem>
          <MenubarItem onPress={() => {}}>Sub Item D</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

export const ApplicationMenubar: Story = {
  render: () => {
    const [autoSave, setAutoSave] = useState(true);
    const [theme, setTheme] = useState('dark');

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem shortcut="⌘N" onPress={() => {}}>New Project</MenubarItem>
            <MenubarItem shortcut="⌘O" onPress={() => {}}>Open...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem shortcut="⌘S" onPress={() => {}}>Save</MenubarItem>
            <MenubarItem onPress={() => {}}>Export</MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked={autoSave} onCheckedChange={setAutoSave}>
              Auto Save
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Preferences</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">Light Theme</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark Theme</MenubarRadioItem>
              <MenubarRadioItem value="system">System Theme</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onPress={() => {}}>Documentation</MenubarItem>
            <MenubarItem onPress={() => {}}>Keyboard Shortcuts</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onPress={() => {}}>About</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};
