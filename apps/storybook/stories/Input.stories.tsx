import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Svg, { Path, Line, Circle } from 'react-native-svg';
import { Input, SearchInput, PasswordInput } from '@r-ui/react-native';

// Icon components for stories
function SearchIcon({ size = 18, color = 'rgba(255,255,255,0.5)' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="11" cy="11" r="8" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Svg>
  );
}

function XIcon({ size = 18, color = 'rgba(255,255,255,0.5)' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
}

function MailIcon({ size = 18, color = 'rgba(255,255,255,0.5)' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <Path d="M22 6l-10 7L2 6" />
    </Svg>
  );
}

function EyeIcon({ size = 18, color = 'rgba(255,255,255,0.5)' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <Circle cx="12" cy="12" r="3" />
    </Svg>
  );
}

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

// === Icon Stories ===

export const WithLeftIcon: Story = {
  render: () => (
    <Input
      leftIcon={<MailIcon size={18} />}
      placeholder="Email address"
      label="Email"
    />
  ),
};

export const WithRightIcon: Story = {
  render: () => (
    <Input
      rightIcon={<EyeIcon size={18} />}
      placeholder="Password"
      label="Password"
    />
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <Input
      leftIcon={<SearchIcon size={18} />}
      rightIcon={<XIcon size={18} />}
      placeholder="Search..."
    />
  ),
};

const InteractiveIconInput = () => {
  const [value, setValue] = useState('Hello');
  return (
    <Input
      value={value}
      onChangeText={setValue}
      rightIcon={value ? <XIcon size={18} /> : undefined}
      onRightIconPress={() => setValue('')}
      placeholder="Type something..."
      label="Clearable Input"
      helperText="Click the X to clear"
    />
  );
};

export const WithInteractiveRightIcon: Story = {
  render: () => <InteractiveIconInput />,
};

export const IconsWithError: Story = {
  render: () => (
    <Input
      leftIcon={<MailIcon size={18} />}
      placeholder="Email"
      label="Email"
      error
      helperText="Invalid email address"
      value="invalid-email"
    />
  ),
};

export const IconSizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Input size="sm" leftIcon={<SearchIcon size={16} />} placeholder="Small with icon" />
      <Input size="md" leftIcon={<SearchIcon size={18} />} placeholder="Medium with icon" />
      <Input size="lg" leftIcon={<SearchIcon size={20} />} placeholder="Large with icon" />
    </View>
  ),
};

export const IconsDisabled: Story = {
  render: () => (
    <Input
      leftIcon={<MailIcon size={18} />}
      rightIcon={<XIcon size={18} />}
      placeholder="Disabled with icons"
      label="Disabled"
      disabled
      value="Cannot edit"
    />
  ),
};

// === Convenience Component Stories ===

const SearchInputStory = () => {
  const [query, setQuery] = useState('');
  return (
    <SearchInput
      value={query}
      onChangeText={setQuery}
      onClear={() => setQuery('')}
      placeholder="Search..."
      label="Search"
      helperText={query ? `Searching for: "${query}"` : 'Enter a search term'}
    />
  );
};

export const SearchInputComponent: Story = {
  name: 'SearchInput',
  render: () => <SearchInputStory />,
};

export const PasswordInputComponent: Story = {
  name: 'PasswordInput',
  render: () => (
    <PasswordInput
      placeholder="Enter password"
      label="Password"
      helperText="Click the eye icon to show/hide"
    />
  ),
};

export const AllIconVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Input
        leftIcon={<MailIcon size={18} />}
        placeholder="With left icon"
        label="Left Icon"
      />
      <Input
        rightIcon={<EyeIcon size={18} />}
        placeholder="With right icon"
        label="Right Icon"
      />
      <Input
        leftIcon={<SearchIcon size={18} />}
        rightIcon={<XIcon size={18} />}
        placeholder="With both icons"
        label="Both Icons"
      />
    </View>
  ),
};
