import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export type NavbarContentJustify = 'start' | 'center' | 'end';

export interface NavbarContentProps {
  /** Content */
  children: React.ReactNode;
  /** Content alignment */
  justify?: NavbarContentJustify;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Constants
// ============================================================================

const justifyMap: Record<NavbarContentJustify, 'flex-start' | 'center' | 'flex-end'> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

// ============================================================================
// Component
// ============================================================================

export function NavbarContent({ children, justify = 'start', style }: NavbarContentProps) {
  return (
    <View
      style={[
        styles.content,
        { justifyContent: justifyMap[justify] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
});
