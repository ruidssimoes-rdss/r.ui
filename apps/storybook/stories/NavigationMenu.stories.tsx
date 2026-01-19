import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  colors,
} from '@r-ui/react-native';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Menu orientation',
    },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <View style={{ gap: 4 }}>
              <NavigationMenuLink onPress={() => console.log('Intro')}>
                Introduction
              </NavigationMenuLink>
              <NavigationMenuLink onPress={() => console.log('Install')}>
                Installation
              </NavigationMenuLink>
              <NavigationMenuLink onPress={() => console.log('Usage')}>
                Usage Guide
              </NavigationMenuLink>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <View style={{ gap: 4 }}>
              <NavigationMenuLink onPress={() => {}}>Button</NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>Card</NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>Dialog</NavigationMenuLink>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink onPress={() => console.log('Docs')}>
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <View style={{ gap: 8, width: 280 }}>
              <View style={{ padding: 8, borderRadius: 4 }}>
                <Text style={{ color: colors.text.primary, fontWeight: '600' }}>Analytics</Text>
                <Text style={{ color: colors.text.secondary, fontSize: 13 }}>
                  Track and analyze your data
                </Text>
              </View>
              <View style={{ padding: 8, borderRadius: 4 }}>
                <Text style={{ color: colors.text.primary, fontWeight: '600' }}>Automation</Text>
                <Text style={{ color: colors.text.secondary, fontSize: 13 }}>
                  Automate your workflows
                </Text>
              </View>
              <View style={{ padding: 8, borderRadius: 4 }}>
                <Text style={{ color: colors.text.primary, fontWeight: '600' }}>Security</Text>
                <Text style={{ color: colors.text.secondary, fontSize: 13 }}>
                  Keep your data safe
                </Text>
              </View>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <View style={{ gap: 4 }}>
              <NavigationMenuLink onPress={() => {}}>Documentation</NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>API Reference</NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>Tutorials</NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>Blog</NavigationMenuLink>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WithActiveLink: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <View style={{ gap: 4 }}>
              <NavigationMenuLink onPress={() => {}} active>
                Home
              </NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>
                About
              </NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>
                Contact
              </NavigationMenuLink>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const Vertical: Story = {
  render: () => (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
          <NavigationMenuContent>
            <View style={{ gap: 4 }}>
              <NavigationMenuLink onPress={() => {}}>Overview</NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>Analytics</NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>Reports</NavigationMenuLink>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <View style={{ gap: 4 }}>
              <NavigationMenuLink onPress={() => {}}>Profile</NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>Security</NavigationMenuLink>
              <NavigationMenuLink onPress={() => {}}>Notifications</NavigationMenuLink>
            </View>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const SimpleLinks: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink onPress={() => {}} active>Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink onPress={() => {}}>Features</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink onPress={() => {}}>Pricing</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink onPress={() => {}}>Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

export const WebsiteHeader: Story = {
  render: () => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors.bg.surface,
      borderRadius: 8,
    }}>
      <Text style={{ color: colors.text.primary, fontWeight: '700', fontSize: 18 }}>
        Logo
      </Text>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <View style={{ gap: 4 }}>
                <NavigationMenuLink onPress={() => {}}>Feature A</NavigationMenuLink>
                <NavigationMenuLink onPress={() => {}}>Feature B</NavigationMenuLink>
                <NavigationMenuLink onPress={() => {}}>Feature C</NavigationMenuLink>
              </View>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink onPress={() => {}}>Pricing</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink onPress={() => {}}>About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </View>
  ),
};
