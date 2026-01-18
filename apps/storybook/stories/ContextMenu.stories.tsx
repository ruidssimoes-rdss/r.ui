import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  Card,
  CardContent,
  Button,
} from '@r-ui/react-native';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Basic: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card>
          <CardContent>
            <Text style={styles.cardText}>Long press me</Text>
            <Text style={styles.hint}>Hold for 500ms</Text>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => console.log('Edit')}>Edit</ContextMenuItem>
        <ContextMenuItem onSelect={() => console.log('Duplicate')}>Duplicate</ContextMenuItem>
        <ContextMenuItem onSelect={() => console.log('Share')}>Share</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive onSelect={() => console.log('Delete')}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card>
          <CardContent>
            <Text style={styles.cardText}>File Options</Text>
            <Text style={styles.hint}>Long press for menu</Text>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>File</ContextMenuLabel>
        <ContextMenuItem onSelect={() => {}}>Open</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Open With...</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Sharing</ContextMenuLabel>
        <ContextMenuItem onSelect={() => {}}>Share</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Copy Link</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive onSelect={() => {}}>
          Move to Trash
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxItems: Story = {
  render: function CheckboxStory() {
    const [showHidden, setShowHidden] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    const [notifications, setNotifications] = useState(true);

    return (
      <View style={styles.container}>
        <ContextMenu>
          <ContextMenuTrigger>
            <Card>
              <CardContent>
                <Text style={styles.cardText}>Settings</Text>
                <Text style={styles.hint}>Long press for options</Text>
              </CardContent>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Preferences</ContextMenuLabel>
            <ContextMenuCheckboxItem
              checked={showHidden}
              onCheckedChange={setShowHidden}
            >
              Show Hidden Files
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={autoSave}
              onCheckedChange={setAutoSave}
            >
              Auto Save
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={notifications}
              onCheckedChange={setNotifications}
            >
              Notifications
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>

        <View style={styles.status}>
          <Text style={styles.statusText}>
            Hidden: {showHidden ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.statusText}>
            Auto Save: {autoSave ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.statusText}>
            Notifications: {notifications ? 'Yes' : 'No'}
          </Text>
        </View>
      </View>
    );
  },
};

export const DisabledItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card>
          <CardContent>
            <Text style={styles.cardText}>Mixed States</Text>
            <Text style={styles.hint}>Some items are disabled</Text>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => {}}>Available Action</ContextMenuItem>
        <ContextMenuItem disabled onSelect={() => {}}>
          Disabled Action
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Another Action</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled destructive onSelect={() => {}}>
          Cannot Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <View style={styles.delayContainer}>
      <ContextMenu>
        <ContextMenuTrigger delayMs={200}>
          <Card>
            <CardContent>
              <Text style={styles.cardText}>Quick (200ms)</Text>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => {}}>Fast open</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <ContextMenu>
        <ContextMenuTrigger delayMs={500}>
          <Card>
            <CardContent>
              <Text style={styles.cardText}>Default (500ms)</Text>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => {}}>Normal open</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <ContextMenu>
        <ContextMenuTrigger delayMs={1000}>
          <Card>
            <CardContent>
              <Text style={styles.cardText}>Slow (1000ms)</Text>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => {}}>Slow open</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </View>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);

    return (
      <View style={styles.controlledContainer}>
        <Button onPress={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'} Menu
        </Button>

        <ContextMenu open={open} onOpenChange={setOpen}>
          <ContextMenuTrigger>
            <Card>
              <CardContent>
                <Text style={styles.cardText}>Controlled Menu</Text>
                <Text style={styles.hint}>State: {open ? 'Open' : 'Closed'}</Text>
              </CardContent>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={() => console.log('Action 1')}>
              Action 1
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => console.log('Action 2')}>
              Action 2
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </View>
    );
  },
};

export const MessageActions: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <View style={styles.message}>
          <Text style={styles.messageSender}>John Doe</Text>
          <Text style={styles.messageText}>
            Hey! Did you see the new design mockups? They look great!
          </Text>
          <Text style={styles.messageTime}>2:34 PM</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => {}}>Reply</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Forward</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Copy Text</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => {}}>Pin Message</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Mark as Unread</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive onSelect={() => {}}>
          Delete Message
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const ImageActions: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <View style={styles.imageCard}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageEmoji}>🖼️</Text>
          </View>
          <Text style={styles.imageTitle}>vacation-photo.jpg</Text>
          <Text style={styles.imageSize}>2.4 MB</Text>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => {}}>Open</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Quick Look</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Share</ContextMenuLabel>
        <ContextMenuItem onSelect={() => {}}>AirDrop</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Messages</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Mail</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => {}}>Get Info</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive onSelect={() => {}}>
          Move to Trash
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    alignItems: 'center',
  },
  cardText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  hint: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 4,
  },
  delayContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  controlledContainer: {
    gap: 16,
    alignItems: 'center',
  },
  status: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  message: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    maxWidth: 280,
  },
  messageSender: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
  messageTime: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right',
  },
  imageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    width: 160,
  },
  imagePlaceholder: {
    width: 120,
    height: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  imageEmoji: {
    fontSize: 40,
  },
  imageTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  imageSize: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    marginTop: 2,
  },
});
