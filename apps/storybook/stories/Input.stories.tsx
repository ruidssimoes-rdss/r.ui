import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Input } from '@r-ui/react-native';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper or error text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
  },
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    size: 'md',
    disabled: false,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    value: 'johndoe',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Input label="Small" placeholder="Small input" size="sm" />
      <Input label="Medium" placeholder="Medium input" size="md" />
      <Input label="Large" placeholder="Large input" size="lg" />
    </View>
  ),
};

export const States: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Input label="Default" placeholder="Default state" />
      <Input label="With Value" placeholder="..." value="Hello World" />
      <Input
        label="Error State"
        placeholder="..."
        value="Invalid"
        error
        helperText="This field has an error"
      />
      <Input label="Disabled" placeholder="..." value="Disabled input" disabled />
    </View>
  ),
};

const ControlledInput = () => {
  const [value, setValue] = useState('');
  return (
    <Input
      label="Controlled Input"
      placeholder="Type something..."
      value={value}
      onChangeText={setValue}
      helperText={`Character count: ${value.length}`}
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledInput />,
};
