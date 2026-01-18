import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@r-ui/react-native';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// ============================================================================
// Story: Default
// ============================================================================
export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.hint}>Hover or long-press the text below</Text>
      <Tooltip content="This is a helpful tooltip">
        <TooltipTrigger>
          <Text style={styles.trigger}>Hover me</Text>
        </TooltipTrigger>
        <TooltipContent />
      </Tooltip>
    </View>
  ),
};

// ============================================================================
// Story: Top
// ============================================================================
export const Top: Story = {
  render: () => (
    <View style={styles.containerCentered}>
      <Tooltip content="Tooltip appears above" side="top">
        <TooltipTrigger>
          <View style={styles.box}>
            <Text style={styles.boxText}>Top</Text>
          </View>
        </TooltipTrigger>
        <TooltipContent />
      </Tooltip>
    </View>
  ),
};

// ============================================================================
// Story: Bottom
// ============================================================================
export const Bottom: Story = {
  render: () => (
    <View style={styles.containerCentered}>
      <Tooltip content="Tooltip appears below" side="bottom">
        <TooltipTrigger>
          <View style={styles.box}>
            <Text style={styles.boxText}>Bottom</Text>
          </View>
        </TooltipTrigger>
        <TooltipContent />
      </Tooltip>
    </View>
  ),
};

// ============================================================================
// Story: Left
// ============================================================================
export const Left: Story = {
  render: () => (
    <View style={styles.containerCentered}>
      <Tooltip content="Tooltip on the left" side="left">
        <TooltipTrigger>
          <View style={styles.box}>
            <Text style={styles.boxText}>Left</Text>
          </View>
        </TooltipTrigger>
        <TooltipContent />
      </Tooltip>
    </View>
  ),
};

// ============================================================================
// Story: Right
// ============================================================================
export const Right: Story = {
  render: () => (
    <View style={styles.containerCentered}>
      <Tooltip content="Tooltip on the right" side="right">
        <TooltipTrigger>
          <View style={styles.box}>
            <Text style={styles.boxText}>Right</Text>
          </View>
        </TooltipTrigger>
        <TooltipContent />
      </Tooltip>
    </View>
  ),
};

// ============================================================================
// Story: WithDelay
// ============================================================================
export const WithDelay: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.hint}>This tooltip has a 500ms delay</Text>
      <Tooltip content="I took a bit longer to show up!" delay={500}>
        <TooltipTrigger>
          <Text style={styles.trigger}>Hover me (slow)</Text>
        </TooltipTrigger>
        <TooltipContent />
      </Tooltip>
    </View>
  ),
};

// ============================================================================
// Story: OnButton
// ============================================================================
export const OnButton: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.hint}>Hover the button to see what it does</Text>
      <Tooltip content="Save your changes to the cloud" side="bottom">
        <TooltipTrigger>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>💾 Save</Text>
          </Pressable>
        </TooltipTrigger>
        <TooltipContent />
      </Tooltip>
    </View>
  ),
};

// ============================================================================
// Story: OnIcon
// ============================================================================
export const OnIcon: Story = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.formRow}>
        <Text style={styles.label}>Password</Text>
        <Tooltip content="Must be at least 8 characters with one uppercase letter and one number">
          <TooltipTrigger>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>ⓘ</Text>
            </View>
          </TooltipTrigger>
          <TooltipContent />
        </Tooltip>
      </View>
      <View style={styles.inputPlaceholder}>
        <Text style={styles.inputText}>••••••••</Text>
      </View>
    </View>
  ),
};

// ============================================================================
// Story: OnDisabled
// ============================================================================
export const OnDisabled: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.hint}>Hover the disabled button to see why</Text>
      <Tooltip content="Please complete all required fields before submitting">
        <TooltipTrigger>
          <Pressable style={[styles.button, styles.buttonDisabled]} disabled>
            <Text style={[styles.buttonText, styles.buttonTextDisabled]}>Submit</Text>
          </Pressable>
        </TooltipTrigger>
        <TooltipContent />
      </Tooltip>
    </View>
  ),
};

// ============================================================================
// Story: RichContent
// ============================================================================
export const RichContent: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.hint}>Hover for detailed information</Text>
      <Tooltip
        content="Keyboard shortcuts:&#10;• Cmd+S to save&#10;• Cmd+Z to undo&#10;• Cmd+Shift+Z to redo"
        side="bottom"
      >
        <TooltipTrigger>
          <View style={styles.keyboardIcon}>
            <Text style={styles.keyboardText}>⌨️ Shortcuts</Text>
          </View>
        </TooltipTrigger>
        <TooltipContent />
      </Tooltip>
    </View>
  ),
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    gap: 16,
  },
  containerCentered: {
    padding: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  trigger: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  boxText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  buttonTextDisabled: {
    color: '#999',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconText: {
    fontSize: 14,
    color: '#666',
  },
  inputPlaceholder: {
    width: 250,
    height: 44,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  keyboardIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  keyboardText: {
    fontSize: 14,
    color: '#333',
  },
});
