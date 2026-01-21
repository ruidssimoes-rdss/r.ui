import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useSidebar } from './SidebarContext';
import { TOUCH_TARGET, isNative } from '../../utils/platform';

// ============================================================================
// Types
// ============================================================================

export interface SidebarTriggerProps {
  /** Custom trigger content */
  children?: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function SidebarTrigger({ children, style }: SidebarTriggerProps) {
  const { toggle, open } = useSidebar();

  return (
    <Pressable
      onPress={toggle}
      style={({ pressed }) => [
        styles.trigger,
        pressed && styles.triggerPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={open ? 'Close sidebar' : 'Open sidebar'}
      accessibilityState={{ expanded: open }}
    >
      {children || <HamburgerIcon open={open} />}
    </Pressable>
  );
}

// ============================================================================
// Hamburger Icon
// ============================================================================

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <View style={iconStyles.container}>
      <View style={[iconStyles.line, open && iconStyles.lineTop]} />
      <View style={[iconStyles.line, open && iconStyles.lineHidden]} />
      <View style={[iconStyles.line, open && iconStyles.lineBottom]} />
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  trigger: {
    // Use platform-aware touch target size
    width: isNative ? TOUCH_TARGET : 40,
    height: isNative ? TOUCH_TARGET : 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  triggerPressed: {
    backgroundColor: colors.bg.elevated,
  },
});

const iconStyles = StyleSheet.create({
  container: {
    width: 20,
    height: 14,
    justifyContent: 'space-between',
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: colors.text.primary,
    borderRadius: 1,
  },
  lineTop: {
    transform: [{ rotate: '45deg' }, { translateY: 6 }, { translateX: 4 }],
  },
  lineHidden: {
    opacity: 0,
  },
  lineBottom: {
    transform: [{ rotate: '-45deg' }, { translateY: -6 }, { translateX: 4 }],
  },
});
