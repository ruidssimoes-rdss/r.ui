import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { useEditor } from './EditorContext';

// ============================================================================
// Types
// ============================================================================

export interface EditorToolbarProps {
  /** Toolbar items */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function EditorToolbar({ children, style }: EditorToolbarProps) {
  const { showToolbar, readOnly } = useEditor();

  if (!showToolbar || readOnly) {
    return null;
  }

  return (
    <View style={[styles.toolbar, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {children}
      </ScrollView>
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  toolbar: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    backgroundColor: colors.bg.raised,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    gap: spacing[1],
  },
});
