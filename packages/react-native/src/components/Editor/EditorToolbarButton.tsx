import React from 'react';
import { Pressable, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useEditor } from './EditorContext';
import { FormatState } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface EditorToolbarButtonProps {
  /** Format to toggle */
  format?: keyof FormatState;
  /** Custom action */
  onPress?: () => void;
  /** Button content (icon or text) */
  children: React.ReactNode;
  /** Whether the button is active */
  active?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function EditorToolbarButton({
  format,
  onPress,
  children,
  active: activeProp,
  disabled = false,
  style,
}: EditorToolbarButtonProps) {
  const { formatState, toggleFormat, readOnly } = useEditor();

  // Determine active state
  const isActive = activeProp !== undefined
    ? activeProp
    : format
    ? Boolean(formatState[format])
    : false;

  const isDisabled = disabled || readOnly;

  const handlePress = () => {
    if (isDisabled) return;

    if (format) {
      toggleFormat(format);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        isActive && styles.buttonActive,
        pressed && !isDisabled && styles.buttonPressed,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive, disabled: isDisabled }}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, isActive && styles.textActive, isDisabled && styles.textDisabled]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

// ============================================================================
// Pre-built Format Buttons
// ============================================================================

export function BoldButton() {
  return (
    <EditorToolbarButton format="bold">
      <Text style={[styles.iconText, { fontWeight: '700' }]}>B</Text>
    </EditorToolbarButton>
  );
}

export function ItalicButton() {
  return (
    <EditorToolbarButton format="italic">
      <Text style={[styles.iconText, { fontStyle: 'italic' }]}>I</Text>
    </EditorToolbarButton>
  );
}

export function UnderlineButton() {
  return (
    <EditorToolbarButton format="underline">
      <Text style={[styles.iconText, { textDecorationLine: 'underline' }]}>U</Text>
    </EditorToolbarButton>
  );
}

export function StrikethroughButton() {
  return (
    <EditorToolbarButton format="strikethrough">
      <Text style={[styles.iconText, { textDecorationLine: 'line-through' }]}>S</Text>
    </EditorToolbarButton>
  );
}

export function CodeButton() {
  return (
    <EditorToolbarButton format="code">
      <Text style={[styles.iconText, { fontFamily: 'monospace' }]}>{`</>`}</Text>
    </EditorToolbarButton>
  );
}

export function HeadingButton() {
  const { formatState } = useEditor();
  const label = formatState.heading ? formatState.heading.toUpperCase() : 'H';

  return (
    <EditorToolbarButton format="heading">
      <Text style={styles.iconText}>{label}</Text>
    </EditorToolbarButton>
  );
}

export function ListButton() {
  const { formatState } = useEditor();

  return (
    <EditorToolbarButton format="list">
      <View style={listIconStyles.container}>
        {formatState.list === 'numbered' ? (
          <>
            <Text style={listIconStyles.number}>1.</Text>
            <View style={listIconStyles.line} />
          </>
        ) : (
          <>
            <View style={listIconStyles.bullet} />
            <View style={listIconStyles.line} />
          </>
        )}
      </View>
    </EditorToolbarButton>
  );
}

export function QuoteButton() {
  return (
    <EditorToolbarButton format="quote">
      <Text style={[styles.iconText, { fontSize: 18 }]}>"</Text>
    </EditorToolbarButton>
  );
}

export function UndoButton() {
  const { undo, canUndo } = useEditor();

  return (
    <EditorToolbarButton onPress={undo} disabled={!canUndo}>
      <View style={arrowIconStyles.container}>
        <View style={[arrowIconStyles.arrow, arrowIconStyles.arrowLeft]} />
      </View>
    </EditorToolbarButton>
  );
}

export function RedoButton() {
  const { redo, canRedo } = useEditor();

  return (
    <EditorToolbarButton onPress={redo} disabled={!canRedo}>
      <View style={arrowIconStyles.container}>
        <View style={[arrowIconStyles.arrow, arrowIconStyles.arrowRight]} />
      </View>
    </EditorToolbarButton>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonActive: {
    backgroundColor: colors.bg.elevated,
  },
  buttonPressed: {
    backgroundColor: colors.bg.elevated,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  text: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
  },
  textActive: {
    color: colors.text.primary,
  },
  textDisabled: {
    color: colors.text.muted,
  },
  iconText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.text.secondary,
  },
});

const listIconStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text.secondary,
  },
  number: {
    fontSize: 10,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  line: {
    width: 10,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
  },
});

const arrowIconStyles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.text.secondary,
  },
  arrowLeft: {
    transform: [{ rotate: '-135deg' }, { translateX: 2 }],
  },
  arrowRight: {
    transform: [{ rotate: '45deg' }, { translateX: -2 }],
  },
});
