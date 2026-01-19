import React from 'react';
import { TextInput, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useEditor } from './EditorContext';

// ============================================================================
// Types
// ============================================================================

export interface EditorContentProps {
  /** Minimum number of lines */
  minLines?: number;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function EditorContent({ minLines = 5, style }: EditorContentProps) {
  const { value, setValue, readOnly, placeholder, formatState } = useEditor();

  const minHeight = minLines * 24; // Approximate line height

  return (
    <TextInput
      style={[
        styles.content,
        { minHeight },
        formatState.bold && styles.bold,
        formatState.italic && styles.italic,
        style,
      ]}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      placeholderTextColor={colors.text.muted}
      editable={!readOnly}
      multiline
      textAlignVertical="top"
      scrollEnabled
    />
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: spacing[4],
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    color: colors.text.primary,
    lineHeight: 24,
  },
  bold: {
    fontWeight: '700',
  },
  italic: {
    fontStyle: 'italic',
  },
});
