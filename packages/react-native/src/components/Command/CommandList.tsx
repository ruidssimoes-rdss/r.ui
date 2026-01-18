import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../tokens/spacing';

export interface CommandListProps {
  /** List content */
  children: React.ReactNode;
  /** Maximum height for the list */
  maxHeight?: number;
  /** Additional styles */
  style?: ViewStyle;
}

export function CommandList({
  children,
  maxHeight = 300,
  style,
}: CommandListProps) {
  return (
    <ScrollView
      style={[styles.container, { maxHeight }, style]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: spacing[2],
  },
});
