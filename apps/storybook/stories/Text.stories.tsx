import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text, Heading, Code, Label } from '@r-ui/react-native';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'bodySmall', 'label', 'labelSmall', 'code'],
      description: 'Typography variant',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight override',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'inverse', 'inherit'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
  },
  args: {
    children: 'Sample text',
    variant: 'body',
    color: 'primary',
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Body: Story = {
  args: {
    children: 'This is body text.',
    variant: 'body',
  },
};

export const BodySmall: Story = {
  args: {
    children: 'This is small body text.',
    variant: 'bodySmall',
  },
};

export const H1: Story = {
  args: {
    children: 'Heading 1',
    variant: 'h1',
  },
};

export const H2: Story = {
  args: {
    children: 'Heading 2',
    variant: 'h2',
  },
};

export const H3: Story = {
  args: {
    children: 'Heading 3',
    variant: 'h3',
  },
};

export const H4: Story = {
  args: {
    children: 'Heading 4',
    variant: 'h4',
  },
};

export const LabelText: Story = {
  args: {
    children: 'Label text',
    variant: 'label',
  },
};

export const LabelSmall: Story = {
  args: {
    children: 'Small Label',
    variant: 'labelSmall',
  },
};

export const CodeText: Story = {
  args: {
    children: 'const foo = "bar";',
    variant: 'code',
  },
};

export const AllHeadings: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
    </View>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="body">Body text</Text>
      <Text variant="bodySmall">Body small text</Text>
      <Text variant="label">Label text</Text>
      <Text variant="labelSmall">LABEL SMALL</Text>
      <Text variant="code">Code text</Text>
    </View>
  ),
};

export const AllColors: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text color="primary">Primary color</Text>
      <Text color="secondary">Secondary color</Text>
      <Text color="muted">Muted color</Text>
    </View>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </View>
  ),
};

export const TextAlignment: Story = {
  render: () => (
    <View style={{ gap: 8, width: 300 }}>
      <Text align="left">Left aligned text</Text>
      <Text align="center">Center aligned text</Text>
      <Text align="right">Right aligned text</Text>
    </View>
  ),
};

export const HelperComponents: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Heading level={2}>Using Heading Component</Heading>
      <Label>Using Label Component</Label>
      <Code>Using Code Component</Code>
    </View>
  ),
};
