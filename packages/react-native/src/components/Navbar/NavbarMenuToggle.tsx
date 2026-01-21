import React from 'react';
import { Pressable, View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useNavbar } from './Navbar';
import { TOUCH_TARGET } from '../../utils/platform';

// ============================================================================
// Types
// ============================================================================

export interface NavbarMenuToggleProps {
  /** Custom toggle content */
  children?: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function NavbarMenuToggle({ children, style }: NavbarMenuToggleProps) {
  const { menuOpen, toggleMenu } = useNavbar();

  return (
    <Pressable
      onPress={toggleMenu}
      style={({ pressed }) => [
        styles.toggle,
        pressed && styles.togglePressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={menuOpen ? 'Close menu' : 'Open menu'}
      accessibilityState={{ expanded: menuOpen }}
    >
      {children || <HamburgerIcon open={menuOpen} />}
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
  toggle: {
    minWidth: TOUCH_TARGET,
    minHeight: TOUCH_TARGET,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  togglePressed: {
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
