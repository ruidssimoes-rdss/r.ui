import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

// ============================================================================
// Types
// ============================================================================

export interface CalloutIconProps {
  /** Custom icon element */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function CalloutIcon({ children, style }: CalloutIconProps) {
  return (
    <View style={[styles.icon, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
