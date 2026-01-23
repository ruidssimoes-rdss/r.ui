import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardContent,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
  Progress,
  Separator,
} from '@hyena-studio/react-native';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Text style={styles.contentTitle}>Account</Text>
          <Text style={styles.contentText}>
            Manage your account settings and preferences here.
            Update your profile information and email address.
          </Text>
        </TabsContent>
        <TabsContent value="password">
          <Text style={styles.contentTitle}>Password</Text>
          <Text style={styles.contentText}>
            Change your password here. After saving, you'll be
            logged out and need to sign in again.
          </Text>
        </TabsContent>
        <TabsContent value="settings">
          <Text style={styles.contentTitle}>Settings</Text>
          <Text style={styles.contentText}>
            Configure your notification preferences and privacy
            settings in this section.
          </Text>
        </TabsContent>
      </Tabs>
    </View>
  ),
};

export const DefaultValue: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>Second tab selected by default</Text>
      <Tabs defaultValue="billing">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Text style={styles.contentTitle}>Overview</Text>
          <Text style={styles.contentText}>
            Get a high-level view of your project status and metrics.
          </Text>
        </TabsContent>
        <TabsContent value="billing">
          <Text style={styles.contentTitle}>Billing</Text>
          <Text style={styles.contentText}>
            View your invoices and manage payment methods.
            Your next billing date is January 1, 2026.
          </Text>
        </TabsContent>
        <TabsContent value="team">
          <Text style={styles.contentTitle}>Team</Text>
          <Text style={styles.contentText}>
            Manage team members and their permissions.
          </Text>
        </TabsContent>
      </Tabs>
    </View>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [activeTab, setActiveTab] = useState('music');

    return (
      <View style={styles.container}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
          </TabsList>
          <TabsContent value="music">
            <Text style={styles.contentTitle}>Music Library</Text>
            <Text style={styles.contentText}>
              Browse your saved songs and albums.
            </Text>
          </TabsContent>
          <TabsContent value="podcasts">
            <Text style={styles.contentTitle}>Podcasts</Text>
            <Text style={styles.contentText}>
              Your podcast subscriptions and episodes.
            </Text>
          </TabsContent>
          <TabsContent value="live">
            <Text style={styles.contentTitle}>Live Radio</Text>
            <Text style={styles.contentText}>
              Listen to live broadcasts and radio stations.
            </Text>
          </TabsContent>
        </Tabs>

        <View style={styles.externalControls}>
          <Text style={styles.controlLabel}>External navigation:</Text>
          <View style={styles.buttonRow}>
            <Button
              size="sm"
              variant={activeTab === 'music' ? 'primary' : 'ghost'}
              onPress={() => setActiveTab('music')}
            >
              Music
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'podcasts' ? 'primary' : 'ghost'}
              onPress={() => setActiveTab('podcasts')}
            >
              Podcasts
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'live' ? 'primary' : 'ghost'}
              onPress={() => setActiveTab('live')}
            >
              Live
            </Button>
          </View>
        </View>
      </View>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <View style={styles.container}>
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">
            <View style={styles.iconTab}>
              <Text style={styles.tabIcon}>🏠</Text>
              <Text style={styles.tabLabel}>Home</Text>
            </View>
          </TabsTrigger>
          <TabsTrigger value="search">
            <View style={styles.iconTab}>
              <Text style={styles.tabIcon}>🔍</Text>
              <Text style={styles.tabLabel}>Search</Text>
            </View>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <View style={styles.iconTab}>
              <Text style={styles.tabIcon}>🔔</Text>
              <Text style={styles.tabLabel}>Alerts</Text>
            </View>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <Text style={styles.contentTitle}>Home Feed</Text>
          <Text style={styles.contentText}>
            Welcome back! Here's what's happening.
          </Text>
        </TabsContent>
        <TabsContent value="search">
          <Text style={styles.contentTitle}>Search</Text>
          <Text style={styles.contentText}>
            Find people, topics, and content.
          </Text>
        </TabsContent>
        <TabsContent value="notifications">
          <Text style={styles.contentTitle}>Notifications</Text>
          <Text style={styles.contentText}>
            You have 3 new notifications.
          </Text>
        </TabsContent>
      </Tabs>
    </View>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.label}>Icon-only tabs (no text labels)</Text>
      <Tabs defaultValue="grid" variant="pills">
        <TabsList>
          <TabsTrigger value="grid">
            <Text style={styles.iconOnlyTab}>▦</Text>
          </TabsTrigger>
          <TabsTrigger value="list">
            <Text style={styles.iconOnlyTab}>☰</Text>
          </TabsTrigger>
          <TabsTrigger value="columns">
            <Text style={styles.iconOnlyTab}>▥</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <View style={styles.gridView}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View key={i} style={styles.gridItem}>
                <Text style={styles.gridItemText}>{i}</Text>
              </View>
            ))}
          </View>
        </TabsContent>
        <TabsContent value="list">
          <View style={styles.listView}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listItemText}>List Item {i}</Text>
              </View>
            ))}
          </View>
        </TabsContent>
        <TabsContent value="columns">
          <View style={styles.columnsView}>
            <View style={styles.column}>
              <Text style={styles.columnText}>Column 1</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.columnText}>Column 2</Text>
            </View>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  ),
};

export const UnderlineVariant: Story = {
  render: () => (
    <View style={styles.container}>
      <Tabs defaultValue="all" variant="underline">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Text style={styles.contentTitle}>All Messages</Text>
          <Text style={styles.contentText}>
            Showing all 24 messages in your inbox.
          </Text>
        </TabsContent>
        <TabsContent value="unread">
          <Text style={styles.contentTitle}>Unread Messages</Text>
          <Text style={styles.contentText}>
            You have 5 unread messages.
          </Text>
        </TabsContent>
        <TabsContent value="archived">
          <Text style={styles.contentTitle}>Archived</Text>
          <Text style={styles.contentText}>
            12 messages have been archived.
          </Text>
        </TabsContent>
      </Tabs>
    </View>
  ),
};

export const ProfileTabs: Story = {
  render: () => (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <Avatar size="lg">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Jane Doe</Text>
          <Text style={styles.profileHandle}>@janedoe</Text>
        </View>
        <Button size="sm" variant="secondary">Edit Profile</Button>
      </View>

      <Tabs defaultValue="posts" variant="underline">
        <TabsList>
          <TabsTrigger value="posts">
            <View style={styles.profileTab}>
              <Text style={styles.profileTabLabel}>Posts</Text>
              <Text style={styles.profileTabCount}>128</Text>
            </View>
          </TabsTrigger>
          <TabsTrigger value="followers">
            <View style={styles.profileTab}>
              <Text style={styles.profileTabLabel}>Followers</Text>
              <Text style={styles.profileTabCount}>2.4K</Text>
            </View>
          </TabsTrigger>
          <TabsTrigger value="following">
            <View style={styles.profileTab}>
              <Text style={styles.profileTabLabel}>Following</Text>
              <Text style={styles.profileTabCount}>186</Text>
            </View>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <View style={styles.postsGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View key={i} style={styles.postThumbnail}>
                <Text style={styles.postIcon}>📷</Text>
              </View>
            ))}
          </View>
        </TabsContent>
        <TabsContent value="followers">
          <View style={styles.followersList}>
            {['Alex', 'Sam', 'Jordan'].map((name) => (
              <View key={name} style={styles.followerItem}>
                <Avatar size="sm">
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <Text style={styles.followerName}>{name}</Text>
                <Button size="sm" variant="ghost">Follow</Button>
              </View>
            ))}
          </View>
        </TabsContent>
        <TabsContent value="following">
          <View style={styles.followersList}>
            {['Morgan', 'Taylor', 'Casey'].map((name) => (
              <View key={name} style={styles.followerItem}>
                <Avatar size="sm">
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <Text style={styles.followerName}>{name}</Text>
                <Button size="sm" variant="secondary">Following</Button>
              </View>
            ))}
          </View>
        </TabsContent>
      </Tabs>
    </View>
  ),
};

export const SettingsTabs: Story = {
  render: () => (
    <View style={styles.settingsContainer}>
      <Text style={styles.settingsTitle}>Settings</Text>

      <Tabs defaultValue="general" variant="pills">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <View style={styles.settingsSection}>
            <View style={styles.settingsItem}>
              <Text style={styles.settingsItemLabel}>Language</Text>
              <Badge variant="secondary">English</Badge>
            </View>
            <Separator />
            <View style={styles.settingsItem}>
              <Text style={styles.settingsItemLabel}>Time Zone</Text>
              <Badge variant="secondary">UTC-8</Badge>
            </View>
            <Separator />
            <View style={styles.settingsItem}>
              <Text style={styles.settingsItemLabel}>Theme</Text>
              <Badge variant="secondary">Dark</Badge>
            </View>
          </View>
        </TabsContent>

        <TabsContent value="privacy">
          <View style={styles.settingsSection}>
            <View style={styles.settingsItem}>
              <View>
                <Text style={styles.settingsItemLabel}>Profile Visibility</Text>
                <Text style={styles.settingsItemDesc}>Who can see your profile</Text>
              </View>
              <Badge variant="default">Public</Badge>
            </View>
            <Separator />
            <View style={styles.settingsItem}>
              <View>
                <Text style={styles.settingsItemLabel}>Activity Status</Text>
                <Text style={styles.settingsItemDesc}>Show when you're online</Text>
              </View>
              <Badge variant="success">On</Badge>
            </View>
          </View>
        </TabsContent>

        <TabsContent value="notifications">
          <View style={styles.settingsSection}>
            <View style={styles.settingsItem}>
              <View>
                <Text style={styles.settingsItemLabel}>Push Notifications</Text>
                <Text style={styles.settingsItemDesc}>Receive push alerts</Text>
              </View>
              <Badge variant="success">Enabled</Badge>
            </View>
            <Separator />
            <View style={styles.settingsItem}>
              <View>
                <Text style={styles.settingsItemLabel}>Email Digest</Text>
                <Text style={styles.settingsItemDesc}>Weekly summary email</Text>
              </View>
              <Badge variant="secondary">Off</Badge>
            </View>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  ),
};

export const ProductTabs: Story = {
  render: () => (
    <View style={styles.productContainer}>
      <View style={styles.productHeader}>
        <Text style={styles.productTitle}>Premium Wireless Headphones</Text>
        <View style={styles.productMeta}>
          <Badge variant="success">In Stock</Badge>
          <Text style={styles.productPrice}>$299.99</Text>
        </View>
      </View>

      <Tabs defaultValue="description" variant="underline">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews (128)</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <View style={styles.productSection}>
            <Text style={styles.sectionTitle}>About this product</Text>
            <Text style={styles.productDescription}>
              Experience premium audio with our flagship wireless headphones.
              Featuring active noise cancellation, 30-hour battery life, and
              premium comfort for all-day wear.
            </Text>

            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featuresList}>
              <Text style={styles.featureItem}>• Active Noise Cancellation</Text>
              <Text style={styles.featureItem}>• 30-hour battery life</Text>
              <Text style={styles.featureItem}>• Bluetooth 5.3</Text>
              <Text style={styles.featureItem}>• Premium memory foam cushions</Text>
            </View>
          </View>
        </TabsContent>

        <TabsContent value="reviews">
          <View style={styles.productSection}>
            <View style={styles.reviewSummary}>
              <Text style={styles.reviewScore}>4.8</Text>
              <View style={styles.reviewMeta}>
                <Text style={styles.reviewStars}>⭐⭐⭐⭐⭐</Text>
                <Text style={styles.reviewCount}>Based on 128 reviews</Text>
              </View>
            </View>

            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewAuthor}>Sarah M.</Text>
                <Text style={styles.reviewStars}>⭐⭐⭐⭐⭐</Text>
              </View>
              <Text style={styles.reviewText}>
                Best headphones I've ever owned. The noise cancellation is amazing!
              </Text>
            </View>

            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewAuthor}>Mike T.</Text>
                <Text style={styles.reviewStars}>⭐⭐⭐⭐</Text>
              </View>
              <Text style={styles.reviewText}>
                Great sound quality and comfortable fit. Battery life is impressive.
              </Text>
            </View>
          </View>
        </TabsContent>

        <TabsContent value="shipping">
          <View style={styles.productSection}>
            <View style={styles.shippingOption}>
              <Text style={styles.shippingIcon}>🚚</Text>
              <View style={styles.shippingInfo}>
                <Text style={styles.shippingTitle}>Standard Shipping</Text>
                <Text style={styles.shippingDesc}>5-7 business days • Free</Text>
              </View>
            </View>

            <View style={styles.shippingOption}>
              <Text style={styles.shippingIcon}>⚡</Text>
              <View style={styles.shippingInfo}>
                <Text style={styles.shippingTitle}>Express Shipping</Text>
                <Text style={styles.shippingDesc}>2-3 business days • $9.99</Text>
              </View>
            </View>

            <View style={styles.shippingOption}>
              <Text style={styles.shippingIcon}>📦</Text>
              <View style={styles.shippingInfo}>
                <Text style={styles.shippingTitle}>Store Pickup</Text>
                <Text style={styles.shippingDesc}>Available today • Free</Text>
              </View>
            </View>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  ),
};

export const DashboardTabs: Story = {
  render: () => (
    <View style={styles.dashboardContainer}>
      <Text style={styles.dashboardTitle}>Analytics Dashboard</Text>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <View style={styles.statsGrid}>
            <Card variant="outlined" style={styles.statCard}>
              <CardContent>
                <Text style={styles.statLabel}>Total Revenue</Text>
                <Text style={styles.statValue}>$45,231</Text>
                <View style={styles.statChange}>
                  <Text style={styles.statChangePositive}>↑ 12.5%</Text>
                  <Text style={styles.statChangeLabel}>vs last month</Text>
                </View>
              </CardContent>
            </Card>

            <Card variant="outlined" style={styles.statCard}>
              <CardContent>
                <Text style={styles.statLabel}>Active Users</Text>
                <Text style={styles.statValue}>2,847</Text>
                <View style={styles.statChange}>
                  <Text style={styles.statChangePositive}>↑ 8.2%</Text>
                  <Text style={styles.statChangeLabel}>vs last month</Text>
                </View>
              </CardContent>
            </Card>

            <Card variant="outlined" style={styles.statCard}>
              <CardContent>
                <Text style={styles.statLabel}>Avg. Session</Text>
                <Text style={styles.statValue}>4m 32s</Text>
                <View style={styles.statChange}>
                  <Text style={styles.statChangeNegative}>↓ 2.1%</Text>
                  <Text style={styles.statChangeLabel}>vs last month</Text>
                </View>
              </CardContent>
            </Card>
          </View>
        </TabsContent>

        <TabsContent value="traffic">
          <View style={styles.trafficSection}>
            <Text style={styles.trafficTitle}>Traffic Sources</Text>

            <View style={styles.trafficItem}>
              <View style={styles.trafficInfo}>
                <Text style={styles.trafficSource}>Organic Search</Text>
                <Text style={styles.trafficValue}>45%</Text>
              </View>
              <Progress value={45} size="sm" />
            </View>

            <View style={styles.trafficItem}>
              <View style={styles.trafficInfo}>
                <Text style={styles.trafficSource}>Direct</Text>
                <Text style={styles.trafficValue}>28%</Text>
              </View>
              <Progress value={28} size="sm" />
            </View>

            <View style={styles.trafficItem}>
              <View style={styles.trafficInfo}>
                <Text style={styles.trafficSource}>Social Media</Text>
                <Text style={styles.trafficValue}>18%</Text>
              </View>
              <Progress value={18} size="sm" />
            </View>

            <View style={styles.trafficItem}>
              <View style={styles.trafficInfo}>
                <Text style={styles.trafficSource}>Referral</Text>
                <Text style={styles.trafficValue}>9%</Text>
              </View>
              <Progress value={9} size="sm" />
            </View>
          </View>
        </TabsContent>

        <TabsContent value="conversions">
          <View style={styles.conversionsSection}>
            <View style={styles.conversionCard}>
              <Text style={styles.conversionIcon}>🎯</Text>
              <View style={styles.conversionInfo}>
                <Text style={styles.conversionLabel}>Conversion Rate</Text>
                <Text style={styles.conversionValue}>3.24%</Text>
              </View>
            </View>

            <View style={styles.conversionCard}>
              <Text style={styles.conversionIcon}>🛒</Text>
              <View style={styles.conversionInfo}>
                <Text style={styles.conversionLabel}>Cart Abandonment</Text>
                <Text style={styles.conversionValue}>68.2%</Text>
              </View>
            </View>

            <View style={styles.conversionCard}>
              <Text style={styles.conversionIcon}>💰</Text>
              <View style={styles.conversionInfo}>
                <Text style={styles.conversionLabel}>Avg. Order Value</Text>
                <Text style={styles.conversionValue}>$127.50</Text>
              </View>
            </View>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: 360,
    padding: 16,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginBottom: 12,
  },
  contentTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  contentText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 22,
  },
  // Controlled
  externalControls: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  controlLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  // Icons
  iconTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabLabel: {
    color: 'inherit',
  },
  iconOnlyTab: {
    fontSize: 18,
  },
  // Grid/List views
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    width: 100,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  listView: {
    gap: 8,
  },
  listItem: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  listItemText: {
    color: '#ffffff',
    fontSize: 14,
  },
  columnsView: {
    flexDirection: 'row',
    gap: 8,
  },
  column: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  columnText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  // Profile
  profileContainer: {
    width: 360,
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  profileHandle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  profileTab: {
    alignItems: 'center',
  },
  profileTabLabel: {
    color: 'inherit',
    fontSize: 14,
  },
  profileTabCount: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  postThumbnail: {
    width: 105,
    height: 105,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postIcon: {
    fontSize: 24,
  },
  followersList: {
    gap: 12,
  },
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  followerName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  // Settings
  settingsContainer: {
    width: 360,
    padding: 16,
  },
  settingsTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingsSection: {
    gap: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  settingsItemLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  settingsItemDesc: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  // Product
  productContainer: {
    width: 360,
    padding: 16,
  },
  productHeader: {
    marginBottom: 16,
  },
  productTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  productSection: {
    gap: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 22,
  },
  featuresList: {
    gap: 4,
  },
  featureItem: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    lineHeight: 22,
  },
  reviewSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  reviewScore: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
  },
  reviewMeta: {
    gap: 4,
  },
  reviewStars: {
    fontSize: 16,
  },
  reviewCount: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  reviewItem: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewAuthor: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  reviewText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    lineHeight: 20,
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 8,
  },
  shippingIcon: {
    fontSize: 24,
  },
  shippingInfo: {
    flex: 1,
  },
  shippingTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  shippingDesc: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  // Dashboard
  dashboardContainer: {
    width: 360,
    padding: 16,
  },
  dashboardTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    gap: 12,
  },
  statCard: {
    marginBottom: 0,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  statChangePositive: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '500',
  },
  statChangeNegative: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '500',
  },
  statChangeLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  trafficSection: {
    gap: 16,
  },
  trafficTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  trafficItem: {
    gap: 8,
  },
  trafficInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trafficSource: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
  },
  trafficValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  conversionsSection: {
    gap: 12,
  },
  conversionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
  },
  conversionIcon: {
    fontSize: 32,
  },
  conversionInfo: {
    flex: 1,
  },
  conversionLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  conversionValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
});
