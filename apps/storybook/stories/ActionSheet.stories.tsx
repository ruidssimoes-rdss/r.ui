import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  ActionSheet,
  ActionSheetTrigger,
  ActionSheetContent,
  ActionSheetHeader,
  ActionSheetTitle,
  ActionSheetDescription,
  ActionSheetItem,
  ActionSheetCancel,
  ActionSheetSeparator,
  Button,
} from '@r-ui/react-native';

const meta: Meta<typeof ActionSheet> = {
  title: 'Components/ActionSheet',
  component: ActionSheet,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ActionSheet>;

export const Basic: Story = {
  render: () => (
    <ActionSheet>
      <ActionSheetTrigger asChild>
        <Button>Show Options</Button>
      </ActionSheetTrigger>
      <ActionSheetContent>
        <ActionSheetItem onPress={() => console.log('View')}>
          View Details
        </ActionSheetItem>
        <ActionSheetItem onPress={() => console.log('Edit')}>
          Edit
        </ActionSheetItem>
        <ActionSheetItem onPress={() => console.log('Duplicate')}>
          Duplicate
        </ActionSheetItem>
        <ActionSheetCancel>Cancel</ActionSheetCancel>
      </ActionSheetContent>
    </ActionSheet>
  ),
};

export const ShareSheet: Story = {
  render: () => (
    <ActionSheet>
      <ActionSheetTrigger asChild>
        <Button>Share</Button>
      </ActionSheetTrigger>
      <ActionSheetContent>
        <ActionSheetHeader>
          <ActionSheetTitle>Share this post</ActionSheetTitle>
          <ActionSheetDescription>
            Choose how you want to share
          </ActionSheetDescription>
        </ActionSheetHeader>
        <ActionSheetItem onPress={() => console.log('Twitter')}>
          Share on Twitter
        </ActionSheetItem>
        <ActionSheetItem onPress={() => console.log('Facebook')}>
          Share on Facebook
        </ActionSheetItem>
        <ActionSheetItem onPress={() => console.log('Copy')}>
          Copy Link
        </ActionSheetItem>
        <ActionSheetItem onPress={() => console.log('Message')}>
          Send via Message
        </ActionSheetItem>
        <ActionSheetCancel>Cancel</ActionSheetCancel>
      </ActionSheetContent>
    </ActionSheet>
  ),
};

export const WithDestructiveAction: Story = {
  render: () => (
    <ActionSheet>
      <ActionSheetTrigger asChild>
        <Button variant="secondary">Post Options</Button>
      </ActionSheetTrigger>
      <ActionSheetContent>
        <ActionSheetItem onPress={() => console.log('Edit')}>
          Edit Post
        </ActionSheetItem>
        <ActionSheetItem onPress={() => console.log('Archive')}>
          Archive Post
        </ActionSheetItem>
        <ActionSheetItem onPress={() => console.log('Pin')}>
          Pin to Profile
        </ActionSheetItem>
        <ActionSheetSeparator />
        <ActionSheetItem destructive onPress={() => console.log('Delete')}>
          Delete Post
        </ActionSheetItem>
        <ActionSheetCancel>Cancel</ActionSheetCancel>
      </ActionSheetContent>
    </ActionSheet>
  ),
};

export const PhotoPicker: Story = {
  render: () => (
    <ActionSheet>
      <ActionSheetTrigger asChild>
        <Button>Upload Photo</Button>
      </ActionSheetTrigger>
      <ActionSheetContent>
        <ActionSheetHeader>
          <ActionSheetTitle>Choose Photo Source</ActionSheetTitle>
        </ActionSheetHeader>
        <ActionSheetItem onPress={() => console.log('Camera')}>
          Take Photo
        </ActionSheetItem>
        <ActionSheetItem onPress={() => console.log('Library')}>
          Choose from Library
        </ActionSheetItem>
        <ActionSheetItem onPress={() => console.log('Files')}>
          Browse Files
        </ActionSheetItem>
        <ActionSheetCancel>Cancel</ActionSheetCancel>
      </ActionSheetContent>
    </ActionSheet>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (option: string) => {
      setSelectedOption(option);
    };

    return (
      <View style={styles.controlledContainer}>
        <Button onPress={() => setOpen(true)}>Open Action Sheet</Button>

        <ActionSheet open={open} onOpenChange={setOpen}>
          <ActionSheetContent>
            <ActionSheetHeader>
              <ActionSheetTitle>Select Option</ActionSheetTitle>
            </ActionSheetHeader>
            <ActionSheetItem onPress={() => handleSelect('Option 1')}>
              Option 1
            </ActionSheetItem>
            <ActionSheetItem onPress={() => handleSelect('Option 2')}>
              Option 2
            </ActionSheetItem>
            <ActionSheetItem onPress={() => handleSelect('Option 3')}>
              Option 3
            </ActionSheetItem>
            <ActionSheetCancel>Cancel</ActionSheetCancel>
          </ActionSheetContent>
        </ActionSheet>

        <View style={styles.status}>
          <Text style={styles.statusText}>
            Selected: {selectedOption || 'None'}
          </Text>
        </View>
      </View>
    );
  },
};

export const DisabledItems: Story = {
  render: () => (
    <ActionSheet>
      <ActionSheetTrigger asChild>
        <Button>Account Actions</Button>
      </ActionSheetTrigger>
      <ActionSheetContent>
        <ActionSheetItem onPress={() => {}}>
          View Profile
        </ActionSheetItem>
        <ActionSheetItem onPress={() => {}}>
          Edit Profile
        </ActionSheetItem>
        <ActionSheetItem disabled onPress={() => {}}>
          Upgrade to Pro (Coming Soon)
        </ActionSheetItem>
        <ActionSheetSeparator />
        <ActionSheetItem onPress={() => {}}>
          Log Out
        </ActionSheetItem>
        <ActionSheetCancel>Cancel</ActionSheetCancel>
      </ActionSheetContent>
    </ActionSheet>
  ),
};

export const NoHandle: Story = {
  render: () => (
    <ActionSheet>
      <ActionSheetTrigger asChild>
        <Button variant="ghost">More</Button>
      </ActionSheetTrigger>
      <ActionSheetContent showHandle={false}>
        <ActionSheetItem onPress={() => {}}>
          Quick Action 1
        </ActionSheetItem>
        <ActionSheetItem onPress={() => {}}>
          Quick Action 2
        </ActionSheetItem>
        <ActionSheetCancel>Cancel</ActionSheetCancel>
      </ActionSheetContent>
    </ActionSheet>
  ),
};

export const FileActions: Story = {
  render: () => (
    <View style={styles.fileContainer}>
      <View style={styles.fileItem}>
        <View style={styles.fileIcon}>
          <Text style={styles.fileEmoji}>📄</Text>
        </View>
        <View style={styles.fileInfo}>
          <Text style={styles.fileName}>Document.pdf</Text>
          <Text style={styles.fileSize}>2.4 MB</Text>
        </View>
        <ActionSheet>
          <ActionSheetTrigger asChild>
            <Button size="sm" variant="ghost">
              •••
            </Button>
          </ActionSheetTrigger>
          <ActionSheetContent>
            <ActionSheetHeader>
              <ActionSheetTitle>Document.pdf</ActionSheetTitle>
              <ActionSheetDescription>2.4 MB • PDF Document</ActionSheetDescription>
            </ActionSheetHeader>
            <ActionSheetItem onPress={() => {}}>
              Open
            </ActionSheetItem>
            <ActionSheetItem onPress={() => {}}>
              Share
            </ActionSheetItem>
            <ActionSheetItem onPress={() => {}}>
              Rename
            </ActionSheetItem>
            <ActionSheetItem onPress={() => {}}>
              Move to Folder
            </ActionSheetItem>
            <ActionSheetSeparator />
            <ActionSheetItem destructive onPress={() => {}}>
              Delete
            </ActionSheetItem>
            <ActionSheetCancel>Cancel</ActionSheetCancel>
          </ActionSheetContent>
        </ActionSheet>
      </View>
    </View>
  ),
};

export const ReportContent: Story = {
  render: () => (
    <ActionSheet>
      <ActionSheetTrigger asChild>
        <Button variant="ghost">Report</Button>
      </ActionSheetTrigger>
      <ActionSheetContent>
        <ActionSheetHeader>
          <ActionSheetTitle>Report this content</ActionSheetTitle>
          <ActionSheetDescription>
            Why are you reporting this?
          </ActionSheetDescription>
        </ActionSheetHeader>
        <ActionSheetItem onPress={() => {}}>
          Spam
        </ActionSheetItem>
        <ActionSheetItem onPress={() => {}}>
          Harassment
        </ActionSheetItem>
        <ActionSheetItem onPress={() => {}}>
          Misinformation
        </ActionSheetItem>
        <ActionSheetItem onPress={() => {}}>
          Inappropriate Content
        </ActionSheetItem>
        <ActionSheetItem onPress={() => {}}>
          Other
        </ActionSheetItem>
        <ActionSheetCancel>Cancel</ActionSheetCancel>
      </ActionSheetContent>
    </ActionSheet>
  ),
};

const styles = StyleSheet.create({
  controlledContainer: {
    gap: 16,
    alignItems: 'center',
  },
  status: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  fileContainer: {
    width: 320,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  fileIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileEmoji: {
    fontSize: 24,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  fileSize: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
});
