import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Alert } from '@r-ui/react-native';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Visual style variant',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    description: {
      control: 'text',
      description: 'Alert description',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
  },
  args: {
    title: 'Alert Title',
    description: 'This is an alert description.',
    variant: 'default',
    closable: false,
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    title: 'Heads up!',
    description: 'You can add components to your app using the cli.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'This feature is currently in beta.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Your session will expire in 5 minutes.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'There was a problem with your request.',
  },
};

export const Closable: Story = {
  args: {
    title: 'Dismissible Alert',
    description: 'Click the X to dismiss this alert.',
    closable: true,
    onClose: () => console.log('Alert closed'),
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'A simple alert with only a title',
    description: undefined,
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12, maxWidth: 400 }}>
      <Alert variant="default" title="Default" description="This is a default alert." />
      <Alert variant="info" title="Info" description="This is an info alert." />
      <Alert variant="success" title="Success" description="This is a success alert." />
      <Alert variant="warning" title="Warning" description="This is a warning alert." />
      <Alert variant="error" title="Error" description="This is an error alert." />
    </View>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Alert variant="info" title="Custom Content">
      <View style={{ marginTop: 8 }}>
        <Text style={{ color: '#9ca3af', fontSize: 14 }}>
          You can render any custom content inside an Alert.
        </Text>
      </View>
    </Alert>
  ),
};
