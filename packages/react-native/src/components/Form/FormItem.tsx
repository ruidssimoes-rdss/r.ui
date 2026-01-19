import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export interface FormItemProps {
  /** Content: label, control, description, message */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FormItem({ children, style }: FormItemProps) {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  item: {
    width: '100%',
    marginBottom: spacing[4],
  },
});
