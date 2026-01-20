import React from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { useNavbar } from './Navbar';

// ============================================================================
// Types
// ============================================================================

export interface NavbarMenuProps {
  /** Menu content */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function NavbarMenu({ children, style }: NavbarMenuProps) {
  const { menuOpen, setMenuOpen } = useNavbar();

  if (!menuOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <Pressable
        style={styles.backdrop}
        onPress={() => setMenuOpen(false)}
        accessibilityRole="button"
        accessibilityLabel="Close menu"
      />

      {/* Menu */}
      <View style={[styles.menu, style]}>
        {children}
      </View>
    </>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 56, // navbar height
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
  },
  menu: {
    position: 'absolute',
    top: 56, // navbar height
    left: 0,
    right: 0,
    backgroundColor: colors.bg.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    zIndex: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      default: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
});
