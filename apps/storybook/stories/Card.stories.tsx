import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  Button,
  Text,
} from '@r-ui/react-native';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'ghost'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding',
    },
  },
  args: {
    variant: 'elevated',
    padding: 'md',
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>This is the card content area where you can put any content.</Text>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" padding="md">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has a shadow effect.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Content with elevated background and shadow.</Text>
      </CardContent>
    </Card>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" padding="md">
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardDescription>This card has a border.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Content with outlined style and border.</Text>
      </CardContent>
    </Card>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost" padding="md">
      <CardHeader>
        <CardTitle>Ghost Card</CardTitle>
        <CardDescription>This card has no background.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Content with transparent background.</Text>
      </CardContent>
    </Card>
  ),
};

export const DifferentPaddings: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Card variant="outlined" padding="sm">
        <CardContent>
          <Text>Small padding</Text>
        </CardContent>
      </Card>
      <Card variant="outlined" padding="md">
        <CardContent>
          <Text>Medium padding</Text>
        </CardContent>
      </Card>
      <Card variant="outlined" padding="lg">
        <CardContent>
          <Text>Large padding</Text>
        </CardContent>
      </Card>
    </View>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Card variant="elevated" padding="md">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Configure your notification preferences here.</Text>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm">
          Reset
        </Button>
        <Button variant="primary" size="sm">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  ),
};
