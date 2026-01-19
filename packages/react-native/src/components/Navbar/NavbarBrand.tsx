import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export interface NavbarBrandProps {
  /** Brand content (logo, title) */
  children: React.ReactNode;
  /** Called when pressed */
  onPress?: () => void;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function NavbarBrand({ children, onPress, style }: NavbarBrandProps) {
  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      style={[styles.brand, style]}
      accessibilityRole={onPress ? 'button' : 'none'}
    >
      {children}
    </Container>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing[6],
  },
});
