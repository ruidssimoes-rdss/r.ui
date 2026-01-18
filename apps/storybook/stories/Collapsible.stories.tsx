import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@r-ui/react-native';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

// ============================================================================
// Story: Default
// ============================================================================
export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <Collapsible>
        <CollapsibleTrigger>
          <View style={styles.trigger}>
            <Text style={styles.triggerText}>Can I use this in my project?</Text>
            <Text style={styles.chevron}>▼</Text>
          </View>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              Yes! This component library is open source and can be used in any React Native project.
              Just install it via npm and import the components you need.
            </Text>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  ),
};

// ============================================================================
// Story: DefaultOpen
// ============================================================================
export const DefaultOpen: Story = {
  render: () => (
    <View style={styles.container}>
      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <View style={styles.trigger}>
            <Text style={styles.triggerText}>Important Notice</Text>
            <Text style={styles.chevron}>▼</Text>
          </View>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              This section starts expanded by default. Use the defaultOpen prop to control
              the initial state of the collapsible section.
            </Text>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  ),
};

// ============================================================================
// Story: Controlled
// ============================================================================
function ControlledCollapsible() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.externalControls}>
        <Pressable style={styles.externalButton} onPress={() => setOpen(!open)}>
          <Text style={styles.externalButtonText}>
            {open ? 'Close Section' : 'Open Section'}
          </Text>
        </Pressable>
        <Text style={styles.stateText}>State: {open ? 'Open' : 'Closed'}</Text>
      </View>

      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>
          <View style={styles.trigger}>
            <Text style={styles.triggerText}>Controlled Section</Text>
            <Text style={[styles.chevron, open && styles.chevronOpen]}>▼</Text>
          </View>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View style={styles.content}>
            <Text style={styles.contentText}>
              This collapsible is controlled by external state. You can toggle it using
              the button above or by clicking the trigger directly.
            </Text>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
}

export const Controlled: Story = {
  render: () => <ControlledCollapsible />,
};

// ============================================================================
// Story: WithIcon
// ============================================================================
function CollapsibleWithIcon() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>
          <View style={styles.trigger}>
            <Text style={styles.triggerText}>Settings</Text>
            <Text style={[styles.chevronAnimated, open && styles.chevronRotated]}>▶</Text>
          </View>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View style={styles.settingsContent}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingValue}>On</Text>
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingValue}>Off</Text>
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingValue}>English</Text>
            </View>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
}

export const WithIcon: Story = {
  render: () => <CollapsibleWithIcon />,
};

// ============================================================================
// Story: Starred (Radix-style)
// ============================================================================
export const Starred: Story = {
  render: () => (
    <View style={styles.container}>
      <Collapsible>
        <View style={styles.starredHeader}>
          <Text style={styles.starredText}>
            <Text style={styles.starredUser}>@peduarte</Text> starred 3 repositories
          </Text>
          <CollapsibleTrigger>
            <View style={styles.starredToggle}>
              <Text style={styles.starredToggleText}>Show</Text>
            </View>
          </CollapsibleTrigger>
        </View>
        <CollapsibleContent>
          <View style={styles.starredList}>
            <View style={styles.repoItem}>
              <Text style={styles.repoName}>@radix-ui/primitives</Text>
              <Text style={styles.repoDescription}>
                Low-level UI primitives for React
              </Text>
            </View>
            <View style={styles.repoItem}>
              <Text style={styles.repoName}>@stitches/react</Text>
              <Text style={styles.repoDescription}>
                CSS-in-JS with near-zero runtime
              </Text>
            </View>
            <View style={styles.repoItem}>
              <Text style={styles.repoName}>@modulz/design-system</Text>
              <Text style={styles.repoDescription}>
                Modulz design system components
              </Text>
            </View>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  ),
};

// ============================================================================
// Story: CodeBlock
// ============================================================================
function CodeBlockCollapsible() {
  const [open, setOpen] = useState(false);

  const codeSnippet = `import { Collapsible } from '@r-ui/react-native';

function App() {
  return (
    <Collapsible>
      <CollapsibleTrigger>
        <Text>Toggle</Text>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>Content here</Text>
      </CollapsibleContent>
    </Collapsible>
  );
}`;

  return (
    <View style={styles.container}>
      <Collapsible open={open} onOpenChange={setOpen}>
        <View style={styles.codeHeader}>
          <Text style={styles.codeTitle}>Example Usage</Text>
          <CollapsibleTrigger>
            <Text style={styles.showMoreLink}>
              {open ? 'Show less' : 'Show more'}
            </Text>
          </CollapsibleTrigger>
        </View>
        <View style={styles.codePreview}>
          <Text style={styles.codeText} numberOfLines={open ? undefined : 3}>
            {codeSnippet}
          </Text>
        </View>
        <CollapsibleContent>
          <View style={styles.codeActions}>
            <Pressable style={styles.copyButton}>
              <Text style={styles.copyButtonText}>📋 Copy Code</Text>
            </Pressable>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
}

export const CodeBlock: Story = {
  render: () => <CodeBlockCollapsible />,
};

// ============================================================================
// Story: ReadMore
// ============================================================================
function ReadMoreCollapsible() {
  const [open, setOpen] = useState(false);

  const articleText = `React Native is an open-source framework for building native mobile applications using JavaScript and React. It was developed by Facebook (now Meta) and first released in 2015. The framework allows developers to use a single codebase to create apps for both iOS and Android platforms.

One of the key benefits of React Native is its ability to render truly native components, rather than using webviews like some other cross-platform solutions. This results in better performance and a more authentic user experience. The framework uses a bridge to communicate between JavaScript and native code, allowing access to platform-specific APIs.

React Native has a large and active community, with thousands of open-source libraries available through npm. Companies like Airbnb, Instagram, and Shopify have used React Native to build their mobile applications.`;

  return (
    <View style={styles.articleContainer}>
      <Text style={styles.articleTitle}>What is React Native?</Text>
      <Collapsible open={open} onOpenChange={setOpen}>
        <Text style={styles.articleText} numberOfLines={open ? undefined : 3}>
          {articleText}
        </Text>
        <CollapsibleTrigger>
          <Text style={styles.readMoreLink}>
            {open ? 'Read less ↑' : 'Read more ↓'}
          </Text>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View style={styles.articleMeta}>
            <Text style={styles.articleMetaText}>
              Published: January 15, 2024 • 3 min read
            </Text>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
}

export const ReadMore: Story = {
  render: () => <ReadMoreCollapsible />,
};

// ============================================================================
// Story: Changelog
// ============================================================================
export const Changelog: Story = {
  render: () => (
    <View style={styles.changelogContainer}>
      <Text style={styles.changelogTitle}>Changelog</Text>

      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <View style={styles.versionHeader}>
            <View style={styles.versionBadge}>
              <Text style={styles.versionBadgeText}>v2.1.0</Text>
            </View>
            <Text style={styles.versionDate}>January 18, 2024</Text>
            <Text style={styles.chevron}>▼</Text>
          </View>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View style={styles.changesList}>
            <View style={styles.changeItem}>
              <Text style={styles.changeType}>✨ New</Text>
              <Text style={styles.changeText}>Added Collapsible component</Text>
            </View>
            <View style={styles.changeItem}>
              <Text style={styles.changeType}>✨ New</Text>
              <Text style={styles.changeText}>Added Tooltip component</Text>
            </View>
            <View style={styles.changeItem}>
              <Text style={styles.changeType}>🐛 Fix</Text>
              <Text style={styles.changeText}>Fixed animation flickering on Android</Text>
            </View>
          </View>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger>
          <View style={styles.versionHeader}>
            <View style={[styles.versionBadge, styles.versionBadgeOld]}>
              <Text style={styles.versionBadgeText}>v2.0.0</Text>
            </View>
            <Text style={styles.versionDate}>December 1, 2023</Text>
            <Text style={styles.chevron}>▼</Text>
          </View>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View style={styles.changesList}>
            <View style={styles.changeItem}>
              <Text style={styles.changeType}>💥 Breaking</Text>
              <Text style={styles.changeText}>Renamed Button variants</Text>
            </View>
            <View style={styles.changeItem}>
              <Text style={styles.changeType}>✨ New</Text>
              <Text style={styles.changeText}>Complete redesign of all components</Text>
            </View>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  ),
};

// ============================================================================
// Story: NestedContent
// ============================================================================
export const NestedContent: Story = {
  render: () => (
    <View style={styles.container}>
      <Collapsible defaultOpen>
        <CollapsibleTrigger>
          <View style={styles.trigger}>
            <Text style={styles.triggerText}>Project Structure</Text>
            <Text style={styles.chevron}>▼</Text>
          </View>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View style={styles.nestedContainer}>
            <Collapsible>
              <CollapsibleTrigger>
                <View style={styles.nestedTrigger}>
                  <Text style={styles.folderIcon}>📁</Text>
                  <Text style={styles.nestedTriggerText}>src</Text>
                  <Text style={styles.chevronSmall}>▼</Text>
                </View>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <View style={styles.fileList}>
                  <Collapsible>
                    <CollapsibleTrigger>
                      <View style={[styles.nestedTrigger, styles.indented]}>
                        <Text style={styles.folderIcon}>📁</Text>
                        <Text style={styles.nestedTriggerText}>components</Text>
                        <Text style={styles.chevronSmall}>▼</Text>
                      </View>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <View style={styles.fileList}>
                        <View style={[styles.fileItem, styles.indentedMore]}>
                          <Text style={styles.fileIcon}>📄</Text>
                          <Text style={styles.fileName}>Button.tsx</Text>
                        </View>
                        <View style={[styles.fileItem, styles.indentedMore]}>
                          <Text style={styles.fileIcon}>📄</Text>
                          <Text style={styles.fileName}>Card.tsx</Text>
                        </View>
                      </View>
                    </CollapsibleContent>
                  </Collapsible>
                  <View style={[styles.fileItem, styles.indented]}>
                    <Text style={styles.fileIcon}>📄</Text>
                    <Text style={styles.fileName}>App.tsx</Text>
                  </View>
                  <View style={[styles.fileItem, styles.indented]}>
                    <Text style={styles.fileIcon}>📄</Text>
                    <Text style={styles.fileName}>index.ts</Text>
                  </View>
                </View>
              </CollapsibleContent>
            </Collapsible>

            <View style={styles.fileItem}>
              <Text style={styles.fileIcon}>📄</Text>
              <Text style={styles.fileName}>package.json</Text>
            </View>
            <View style={styles.fileItem}>
              <Text style={styles.fileIcon}>📄</Text>
              <Text style={styles.fileName}>README.md</Text>
            </View>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  ),
};

// ============================================================================
// Story: AnimatedHeight
// ============================================================================
function AnimatedHeightDemo() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        Click to see smooth height animation
      </Text>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>
          <View style={styles.animatedTrigger}>
            <Text style={styles.animatedTriggerText}>
              {open ? 'Collapse' : 'Expand'} Content
            </Text>
            <View style={styles.animatedIndicator}>
              <Text style={styles.animatedIndicatorText}>
                {open ? '−' : '+'}
              </Text>
            </View>
          </View>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <View style={styles.animatedContent}>
            <View style={styles.animatedBox}>
              <Text style={styles.animatedBoxTitle}>Smooth Animations</Text>
              <Text style={styles.animatedBoxText}>
                The Collapsible component uses React Native's Animated API to create
                smooth height transitions. The content height is measured on layout
                and animated from 0 to the actual height when opening.
              </Text>
            </View>
            <View style={styles.animatedStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>200ms</Text>
                <Text style={styles.statLabel}>Duration</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Native</Text>
                <Text style={styles.statLabel}>Driver</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>60fps</Text>
                <Text style={styles.statLabel}>Target</Text>
              </View>
            </View>
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
}

export const AnimatedHeight: Story = {
  render: () => <AnimatedHeightDemo />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    width: 360,
    padding: 16,
  },
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  triggerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  chevron: {
    fontSize: 12,
    color: '#666',
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
  chevronAnimated: {
    fontSize: 12,
    color: '#666',
    transition: 'transform 0.2s',
  },
  chevronRotated: {
    transform: [{ rotate: '90deg' }],
  },
  chevronSmall: {
    fontSize: 10,
    color: '#666',
    marginLeft: 'auto',
  },
  content: {
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  contentText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  externalControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  externalButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  externalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  stateText: {
    fontSize: 14,
    color: '#666',
  },
  settingsContent: {
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
  starredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  starredText: {
    fontSize: 14,
    color: '#666',
  },
  starredUser: {
    fontWeight: '600',
    color: '#333',
  },
  starredToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  starredToggleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  starredList: {
    marginTop: 8,
    gap: 8,
  },
  repoItem: {
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  repoName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  repoDescription: {
    fontSize: 12,
    color: '#666',
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  showMoreLink: {
    fontSize: 14,
    color: '#007AFF',
  },
  codePreview: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 6,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#d4d4d4',
    lineHeight: 18,
  },
  codeActions: {
    marginTop: 8,
    alignItems: 'flex-start',
  },
  copyButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#333',
    borderRadius: 4,
  },
  copyButtonText: {
    fontSize: 12,
    color: '#fff',
  },
  articleContainer: {
    width: 360,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  articleText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  readMoreLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginTop: 8,
  },
  articleMeta: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  articleMetaText: {
    fontSize: 12,
    color: '#999',
  },
  changelogContainer: {
    width: 400,
    padding: 16,
    gap: 12,
  },
  changelogTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  versionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  versionBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  versionBadgeOld: {
    backgroundColor: '#666',
  },
  versionBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  versionDate: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  changesList: {
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  changeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  changeType: {
    fontSize: 12,
    width: 80,
  },
  changeText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  nestedContainer: {
    marginTop: 8,
    gap: 4,
  },
  nestedTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: '#fafafa',
    borderRadius: 4,
  },
  nestedTriggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  folderIcon: {
    fontSize: 14,
  },
  fileList: {
    marginLeft: 24,
    marginTop: 4,
    gap: 4,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 6,
  },
  fileIcon: {
    fontSize: 12,
  },
  fileName: {
    fontSize: 13,
    color: '#666',
  },
  indented: {
    marginLeft: 0,
  },
  indentedMore: {
    marginLeft: 0,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  animatedTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  animatedTriggerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  animatedIndicator: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedIndicatorText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  animatedContent: {
    marginTop: 12,
    gap: 16,
  },
  animatedBox: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  animatedBoxTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  animatedBoxText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  animatedStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
