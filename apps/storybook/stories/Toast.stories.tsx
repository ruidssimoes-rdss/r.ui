import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button, ToastProvider, useToast } from '@r-ui/react-native';

function ToastDemo({ variant, title, description, withAction }: {
  variant?: 'default' | 'success' | 'warning' | 'error';
  title: string;
  description?: string;
  withAction?: boolean;
}) {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title,
      description,
      variant,
      action: withAction ? {
        label: 'Undo',
        onPress: () => console.log('Undo pressed'),
      } : undefined,
    });
  };

  return (
    <Button onPress={showToast}>
      Show Toast
    </Button>
  );
}

function ToastStoryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <View style={{ padding: 20 }}>
        {children}
      </View>
    </ToastProvider>
  );
}

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <ToastStoryWrapper>
        <Story />
      </ToastStoryWrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <ToastDemo
      title="Event created"
      description="Your event has been scheduled."
    />
  ),
};

export const Success: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="Success!"
      description="Your changes have been saved."
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastDemo
      variant="warning"
      title="Warning"
      description="Your session will expire in 5 minutes."
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ToastDemo
      variant="error"
      title="Error"
      description="Something went wrong. Please try again."
    />
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastDemo
      title="Message deleted"
      description="The message has been removed."
      withAction
    />
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <ToastDemo title="Copied to clipboard" />
  ),
};

export const AllVariants: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <View style={{ gap: 12 }}>
        <Button onPress={() => toast({ title: 'Default toast', variant: 'default' })}>
          Default
        </Button>
        <Button onPress={() => toast({ title: 'Success toast', variant: 'success' })}>
          Success
        </Button>
        <Button onPress={() => toast({ title: 'Warning toast', variant: 'warning' })}>
          Warning
        </Button>
        <Button onPress={() => toast({ title: 'Error toast', variant: 'error' })}>
          Error
        </Button>
      </View>
    );
  },
};
