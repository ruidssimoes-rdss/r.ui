import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from '@r-ui/react-native';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

const tags = [
  'React',
  'React Native',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'GraphQL',
  'REST API',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Firebase',
  'Vercel',
];

const items = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

export const Basic: Story = {
  render: () => (
    <ScrollArea style={styles.basicContainer}>
      <ScrollAreaViewport>
        <View style={styles.content}>
          {items.slice(0, 20).map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea horizontal style={styles.horizontalContainer}>
      <ScrollAreaViewport contentContainerStyle={styles.horizontalContent}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb orientation="horizontal" />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <ScrollArea horizontal style={styles.galleryContainer}>
      <ScrollAreaViewport contentContainerStyle={styles.galleryContent}>
        {Array.from({ length: 10 }, (_, i) => (
          <View key={i} style={styles.galleryItem}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageText}>{i + 1}</Text>
            </View>
            <Text style={styles.imageLabel}>Photo {i + 1}</Text>
          </View>
        ))}
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb orientation="horizontal" />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ),
};

export const ForceVisibleScrollbar: Story = {
  render: () => (
    <ScrollArea style={styles.basicContainer}>
      <ScrollAreaViewport>
        <View style={styles.content}>
          {items.slice(0, 15).map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical" forceVisible>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ),
};

export const NativeIndicators: Story = {
  render: () => (
    <ScrollArea showsIndicator style={styles.basicContainer}>
      <ScrollAreaViewport>
        <View style={styles.content}>
          {items.slice(0, 25).map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      </ScrollAreaViewport>
    </ScrollArea>
  ),
};

export const ChatMessages: Story = {
  render: () => (
    <ScrollArea style={styles.chatContainer}>
      <ScrollAreaViewport>
        <View style={styles.chatContent}>
          {Array.from({ length: 20 }, (_, i) => (
            <View
              key={i}
              style={[
                styles.message,
                i % 3 === 0 ? styles.messageRight : styles.messageLeft,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  i % 3 === 0 ? styles.bubbleRight : styles.bubbleLeft,
                ]}
              >
                <Text style={styles.messageText}>
                  {i % 3 === 0
                    ? 'This is a sent message.'
                    : 'This is a received message with some more text to show wrapping.'}
                </Text>
              </View>
              <Text style={styles.messageTime}>
                {`${Math.floor(i / 2) + 9}:${(i * 5) % 60 < 10 ? '0' : ''}${(i * 5) % 60}`}
              </Text>
            </View>
          ))}
        </View>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ),
};

export const CodeBlock: Story = {
  render: () => (
    <ScrollArea horizontal style={styles.codeContainer}>
      <ScrollAreaViewport>
        <View style={styles.codeContent}>
          <Text style={styles.codeLine}>
            <Text style={styles.codeKeyword}>import</Text>
            {' { useState, useEffect } '}
            <Text style={styles.codeKeyword}>from</Text>
            {" 'react';"}
          </Text>
          <Text style={styles.codeLine}>
            <Text style={styles.codeKeyword}>import</Text>
            {' { View, Text, StyleSheet } '}
            <Text style={styles.codeKeyword}>from</Text>
            {" 'react-native';"}
          </Text>
          <Text style={styles.codeLine}>{''}</Text>
          <Text style={styles.codeLine}>
            <Text style={styles.codeKeyword}>export function</Text>
            {' MyComponent({ title, description, onPress }: MyComponentProps) {'}
          </Text>
          <Text style={styles.codeLine}>
            {'  '}
            <Text style={styles.codeKeyword}>const</Text>
            {' [count, setCount] = useState(0);'}
          </Text>
          <Text style={styles.codeLine}>{''}</Text>
          <Text style={styles.codeLine}>
            {'  '}
            <Text style={styles.codeKeyword}>return</Text>
            {' ('}
          </Text>
          <Text style={styles.codeLine}>
            {'    <View style={styles.container}>'}
          </Text>
          <Text style={styles.codeLine}>
            {'      <Text style={styles.title}>{title}</Text>'}
          </Text>
          <Text style={styles.codeLine}>{'    </View>'}</Text>
          <Text style={styles.codeLine}>{'  );'}</Text>
          <Text style={styles.codeLine}>{'}'}</Text>
        </View>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb orientation="horizontal" />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea style={styles.bothContainer}>
      <ScrollAreaViewport>
        <View style={styles.largeContent}>
          <View style={styles.gridContainer}>
            {Array.from({ length: 100 }, (_, i) => (
              <View key={i} style={styles.gridItem}>
                <Text style={styles.gridText}>{i + 1}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb orientation="horizontal" />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ),
};

const styles = StyleSheet.create({
  basicContainer: {
    height: 300,
    width: 280,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  horizontalContainer: {
    height: 60,
    width: 320,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  galleryContainer: {
    height: 180,
    width: 320,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  chatContainer: {
    height: 400,
    width: 320,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  codeContainer: {
    height: 200,
    width: 400,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#0d1117',
  },
  bothContainer: {
    height: 300,
    width: 300,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    padding: 16,
  },
  horizontalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  galleryContent: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  itemTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  itemDescription: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 2,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  galleryItem: {
    alignItems: 'center',
    gap: 8,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 24,
    fontWeight: '600',
  },
  imageLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  chatContent: {
    padding: 16,
  },
  message: {
    marginBottom: 12,
  },
  messageLeft: {
    alignItems: 'flex-start',
  },
  messageRight: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  bubbleLeft: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 4,
  },
  bubbleRight: {
    backgroundColor: '#3b82f6',
    borderBottomRightRadius: 4,
  },
  messageText: {
    color: '#ffffff',
    fontSize: 14,
  },
  messageTime: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    marginTop: 4,
  },
  codeContent: {
    padding: 16,
    minWidth: 600,
  },
  codeLine: {
    color: '#c9d1d9',
    fontSize: 13,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  codeKeyword: {
    color: '#ff7b72',
  },
  largeContent: {
    width: 600,
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});
