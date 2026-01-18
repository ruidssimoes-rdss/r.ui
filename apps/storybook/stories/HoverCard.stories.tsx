import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from '@r-ui/react-native';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Text style={styles.link}>@username</Text>
      </HoverCardTrigger>
      <HoverCardContent>
        <View style={styles.profile}>
          <Avatar size="lg">
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>User Name</Text>
            <Text style={styles.username}>@username</Text>
          </View>
        </View>
        <Text style={styles.bio}>
          Software engineer passionate about building great user experiences.
        </Text>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithImage: Story = {
  render: () => (
    <HoverCard openDelay={500}>
      <HoverCardTrigger>
        <Text style={styles.link}>View Profile</Text>
      </HoverCardTrigger>
      <HoverCardContent>
        <View style={styles.imageCard}>
          <View style={styles.header}>
            <Avatar size="md">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>Jane Doe</Text>
              <Text style={styles.role}>Product Designer</Text>
            </View>
          </View>
          <Text style={styles.bio}>
            Creating beautiful and intuitive interfaces. Previously at Apple and Google.
          </Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>4.2k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
        </View>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const Positions: Story = {
  render: () => (
    <View style={styles.positionsContainer}>
      <HoverCard side="top">
        <HoverCardTrigger>
          <Text style={styles.link}>Top</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Content appears above</Text>
        </HoverCardContent>
      </HoverCard>

      <HoverCard side="bottom">
        <HoverCardTrigger>
          <Text style={styles.link}>Bottom</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Content appears below</Text>
        </HoverCardContent>
      </HoverCard>

      <HoverCard side="left">
        <HoverCardTrigger>
          <Text style={styles.link}>Left</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Content appears to the left</Text>
        </HoverCardContent>
      </HoverCard>

      <HoverCard side="right">
        <HoverCardTrigger>
          <Text style={styles.link}>Right</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Content appears to the right</Text>
        </HoverCardContent>
      </HoverCard>
    </View>
  ),
};

export const Alignment: Story = {
  render: () => (
    <View style={styles.alignContainer}>
      <HoverCard align="start">
        <HoverCardTrigger>
          <Text style={styles.link}>Align Start</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Aligned to start</Text>
        </HoverCardContent>
      </HoverCard>

      <HoverCard align="center">
        <HoverCardTrigger>
          <Text style={styles.link}>Align Center</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Aligned to center</Text>
        </HoverCardContent>
      </HoverCard>

      <HoverCard align="end">
        <HoverCardTrigger>
          <Text style={styles.link}>Align End</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Aligned to end</Text>
        </HoverCardContent>
      </HoverCard>
    </View>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <View style={styles.delayContainer}>
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger>
          <Text style={styles.link}>Instant (0ms)</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Opens and closes instantly</Text>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={500} closeDelay={200}>
        <HoverCardTrigger>
          <Text style={styles.link}>Fast (500ms open)</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Opens after 500ms</Text>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={1000} closeDelay={500}>
        <HoverCardTrigger>
          <Text style={styles.link}>Slow (1000ms open)</Text>
        </HoverCardTrigger>
        <HoverCardContent>
          <Text style={styles.contentText}>Opens after 1 second</Text>
        </HoverCardContent>
      </HoverCard>
    </View>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);

    return (
      <View style={styles.controlledContainer}>
        <Button onPress={() => setOpen(!open)}>
          {open ? 'Close' : 'Open'} HoverCard
        </Button>
        <HoverCard open={open} onOpenChange={setOpen}>
          <HoverCardTrigger>
            <Text style={styles.link}>Controlled Trigger</Text>
          </HoverCardTrigger>
          <HoverCardContent>
            <Text style={styles.contentText}>
              This HoverCard is controlled externally.
            </Text>
            <Text style={styles.hint}>
              State: {open ? 'Open' : 'Closed'}
            </Text>
          </HoverCardContent>
        </HoverCard>
      </View>
    );
  },
};

export const ProductPreview: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger>
        <Text style={styles.productLink}>MacBook Pro 14"</Text>
      </HoverCardTrigger>
      <HoverCardContent style={styles.productContent}>
        <View style={styles.productHeader}>
          <View style={styles.productImage}>
            <Text style={styles.productEmoji}>💻</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>MacBook Pro 14"</Text>
            <Text style={styles.productPrice}>$1,999</Text>
          </View>
        </View>
        <Text style={styles.productDesc}>
          The most powerful MacBook Pro ever with M3 Pro chip, up to 18 hours battery life.
        </Text>
        <View style={styles.productFeatures}>
          <Text style={styles.feature}>• M3 Pro chip</Text>
          <Text style={styles.feature}>• 18GB unified memory</Text>
          <Text style={styles.feature}>• 512GB SSD</Text>
        </View>
      </HoverCardContent>
    </HoverCard>
  ),
};

const styles = StyleSheet.create({
  link: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileInfo: {
    marginLeft: 12,
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  bio: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  contentText: {
    color: '#ffffff',
    fontSize: 14,
  },
  positionsContainer: {
    flexDirection: 'row',
    gap: 24,
    padding: 100,
  },
  alignContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  delayContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  controlledContainer: {
    gap: 16,
    alignItems: 'center',
  },
  hint: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 8,
  },
  imageCard: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 12,
  },
  role: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
  },
  stats: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 4,
  },
  stat: {
    alignItems: 'flex-start',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  productLink: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '500',
  },
  productContent: {
    width: 280,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 32,
  },
  productInfo: {
    marginLeft: 12,
  },
  productName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  productPrice: {
    color: '#22c55e',
    fontSize: 18,
    fontWeight: '700',
  },
  productDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  productFeatures: {
    gap: 4,
  },
  feature: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
});
