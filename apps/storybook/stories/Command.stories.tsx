import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandDialog,
  Button,
} from '@r-ui/react-native';

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Command>;

export const Basic: Story = {
  render: () => (
    <View style={styles.container}>
      <Command>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem value="calendar">Calendar</CommandItem>
            <CommandItem value="search">Search</CommandItem>
            <CommandItem value="settings">Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </View>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <View style={styles.container}>
      <Command>
        <CommandInput placeholder="Search components..." />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          <CommandGroup heading="Components">
            <CommandItem value="button">Button</CommandItem>
            <CommandItem value="card">Card</CommandItem>
            <CommandItem value="input">Input</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="new-file">Create new file</CommandItem>
            <CommandItem value="new-folder">Create new folder</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </View>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <View style={styles.container}>
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Apps">
            <CommandItem
              value="calendar"
              icon={<Text style={styles.icon}>📅</Text>}
            >
              Calendar
            </CommandItem>
            <CommandItem
              value="mail"
              icon={<Text style={styles.icon}>✉️</Text>}
            >
              Mail
            </CommandItem>
            <CommandItem
              value="photos"
              icon={<Text style={styles.icon}>📷</Text>}
            >
              Photos
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              value="profile"
              icon={<Text style={styles.icon}>👤</Text>}
            >
              Profile
            </CommandItem>
            <CommandItem
              value="preferences"
              icon={<Text style={styles.icon}>⚙️</Text>}
            >
              Preferences
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </View>
  ),
};

export const WithKeywords: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.hint}>
        Try searching for "toggle" or "switch"
      </Text>
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Components">
            <CommandItem
              value="switch"
              keywords={['toggle', 'boolean', 'on', 'off']}
            >
              Switch
            </CommandItem>
            <CommandItem
              value="checkbox"
              keywords={['check', 'tick', 'select']}
            >
              Checkbox
            </CommandItem>
            <CommandItem
              value="button"
              keywords={['click', 'action', 'press']}
            >
              Button
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </View>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <View style={styles.container}>
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem value="save">Save</CommandItem>
            <CommandItem value="copy">Copy</CommandItem>
            <CommandItem value="paste" disabled>
              Paste (disabled)
            </CommandItem>
            <CommandItem value="delete" disabled>
              Delete (disabled)
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </View>
  ),
};

export const WithSelection: Story = {
  render: function WithSelectionStory() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <View style={styles.container}>
        <Text style={styles.selectedText}>
          Selected: {selected || 'none'}
        </Text>
        <Command onSelect={(value) => setSelected(value)}>
          <CommandInput placeholder="Select an option..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup heading="Options">
              <CommandItem value="option-1">Option 1</CommandItem>
              <CommandItem value="option-2">Option 2</CommandItem>
              <CommandItem value="option-3">Option 3</CommandItem>
              <CommandItem value="option-4">Option 4</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </View>
    );
  },
};

export const Dialog: Story = {
  render: function DialogStory() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <View style={styles.dialogContainer}>
        <Button onPress={() => setOpen(true)}>Open Command Palette</Button>
        <Text style={styles.hint}>Press ⌘K to open (simulated)</Text>
        {selected && (
          <Text style={styles.selectedText}>Last selected: {selected}</Text>
        )}
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          onSelect={(value) => {
            setSelected(value);
            setOpen(false);
          }}
        >
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem
                value="new-file"
                icon={<Text style={styles.icon}>📄</Text>}
              >
                New File
              </CommandItem>
              <CommandItem
                value="new-folder"
                icon={<Text style={styles.icon}>📁</Text>}
              >
                New Folder
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem
                value="go-home"
                icon={<Text style={styles.icon}>🏠</Text>}
              >
                Go to Home
              </CommandItem>
              <CommandItem
                value="go-settings"
                icon={<Text style={styles.icon}>⚙️</Text>}
              >
                Go to Settings
              </CommandItem>
              <CommandItem
                value="go-profile"
                icon={<Text style={styles.icon}>👤</Text>}
              >
                Go to Profile
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem
                value="toggle-theme"
                icon={<Text style={styles.icon}>🌙</Text>}
              >
                Toggle Dark Mode
              </CommandItem>
              <CommandItem
                value="logout"
                icon={<Text style={styles.icon}>🚪</Text>}
              >
                Sign Out
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    maxWidth: '100%',
  },
  dialogContainer: {
    width: 350,
    gap: 16,
    alignItems: 'center',
  },
  hint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 12,
  },
  selectedText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
  },
  icon: {
    fontSize: 16,
  },
});
