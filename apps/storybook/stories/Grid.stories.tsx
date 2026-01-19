import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Grid, GridItem, colors } from '@r-ui/react-native';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
      description: 'Number of columns',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: 'Gap between items',
    },
  },
  args: {
    columns: 2,
    gap: 4,
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

const GridBox = ({ children }: { children: string }) => (
  <View style={{
    backgroundColor: colors.accent.blue.DEFAULT,
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  }}>
    <Text style={{ color: colors.white }}>{children}</Text>
  </View>
);

export const TwoColumns: Story = {
  render: (args) => (
    <Grid {...args} style={{ width: 300 }}>
      <GridItem><GridBox>1</GridBox></GridItem>
      <GridItem><GridBox>2</GridBox></GridItem>
      <GridItem><GridBox>3</GridBox></GridItem>
      <GridItem><GridBox>4</GridBox></GridItem>
    </Grid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <Grid columns={3} gap={4} style={{ width: 400 }}>
      <GridItem><GridBox>1</GridBox></GridItem>
      <GridItem><GridBox>2</GridBox></GridItem>
      <GridItem><GridBox>3</GridBox></GridItem>
      <GridItem><GridBox>4</GridBox></GridItem>
      <GridItem><GridBox>5</GridBox></GridItem>
      <GridItem><GridBox>6</GridBox></GridItem>
    </Grid>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <Grid columns={4} gap={4} style={{ width: 500 }}>
      <GridItem><GridBox>1</GridBox></GridItem>
      <GridItem><GridBox>2</GridBox></GridItem>
      <GridItem><GridBox>3</GridBox></GridItem>
      <GridItem><GridBox>4</GridBox></GridItem>
      <GridItem><GridBox>5</GridBox></GridItem>
      <GridItem><GridBox>6</GridBox></GridItem>
      <GridItem><GridBox>7</GridBox></GridItem>
      <GridItem><GridBox>8</GridBox></GridItem>
    </Grid>
  ),
};

export const SingleColumn: Story = {
  render: () => (
    <Grid columns={1} gap={4} style={{ width: 200 }}>
      <GridItem><GridBox>1</GridBox></GridItem>
      <GridItem><GridBox>2</GridBox></GridItem>
      <GridItem><GridBox>3</GridBox></GridItem>
    </Grid>
  ),
};

export const WithColSpan: Story = {
  render: () => (
    <Grid columns={4} gap={4} style={{ width: 500 }}>
      <GridItem colSpan={2}>
        <View style={{
          backgroundColor: colors.accent.green.DEFAULT,
          padding: 16,
          borderRadius: 4,
          alignItems: 'center',
        }}>
          <Text style={{ color: colors.white }}>Span 2</Text>
        </View>
      </GridItem>
      <GridItem><GridBox>1</GridBox></GridItem>
      <GridItem><GridBox>2</GridBox></GridItem>
      <GridItem><GridBox>3</GridBox></GridItem>
      <GridItem colSpan={3}>
        <View style={{
          backgroundColor: colors.accent.amber.DEFAULT,
          padding: 16,
          borderRadius: 4,
          alignItems: 'center',
        }}>
          <Text style={{ color: colors.black }}>Span 3</Text>
        </View>
      </GridItem>
    </Grid>
  ),
};

export const DifferentGaps: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 8 }}>gap: 2</Text>
        <Grid columns={3} gap={2} style={{ width: 300 }}>
          <GridItem><GridBox>1</GridBox></GridItem>
          <GridItem><GridBox>2</GridBox></GridItem>
          <GridItem><GridBox>3</GridBox></GridItem>
        </Grid>
      </View>
      <View>
        <Text style={{ color: colors.text.secondary, marginBottom: 8 }}>gap: 6</Text>
        <Grid columns={3} gap={6} style={{ width: 300 }}>
          <GridItem><GridBox>1</GridBox></GridItem>
          <GridItem><GridBox>2</GridBox></GridItem>
          <GridItem><GridBox>3</GridBox></GridItem>
        </Grid>
      </View>
    </View>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <Grid columns={2} gap={4} style={{ width: 400 }}>
      {[1, 2, 3, 4].map((i) => (
        <GridItem key={i}>
          <View style={{
            backgroundColor: colors.bg.elevated,
            padding: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border.default,
          }}>
            <Text style={{ color: colors.text.primary, fontWeight: '600' }}>Card {i}</Text>
            <Text style={{ color: colors.text.secondary, fontSize: 14, marginTop: 4 }}>
              Card description
            </Text>
          </View>
        </GridItem>
      ))}
    </Grid>
  ),
};
