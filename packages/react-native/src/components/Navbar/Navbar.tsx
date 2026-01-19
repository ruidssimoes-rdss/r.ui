import React, { useState, createContext, useContext, useMemo } from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export type NavbarPosition = 'static' | 'sticky' | 'fixed';
export type NavbarMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface NavbarContextValue {
  /** Whether the mobile menu is open */
  menuOpen: boolean;
  /** Set mobile menu open state */
  setMenuOpen: (open: boolean) => void;
  /** Toggle mobile menu */
  toggleMenu: () => void;
}

export interface NavbarProps {
  /** Position behavior */
  position?: NavbarPosition;
  /** Apply blur effect (web only) */
  blur?: boolean;
  /** Show bottom border */
  bordered?: boolean;
  /** Max width of content */
  maxWidth?: NavbarMaxWidth;
  /** Navbar content */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

const NavbarContext = createContext<NavbarContextValue | null>(null);

export function useNavbar(): NavbarContextValue {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error(
      'Navbar components must be used within a Navbar. ' +
        'Wrap your component in <Navbar> to fix this error.'
    );
  }
  return context;
}

// ============================================================================
// Constants
// ============================================================================

const maxWidthValues: Record<NavbarMaxWidth, number | string> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  full: '100%',
};

// ============================================================================
// Component
// ============================================================================

export function Navbar({
  position = 'static',
  blur = false,
  bordered = true,
  maxWidth = 'xl',
  children,
  style,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const contextValue = useMemo(() => ({
    menuOpen,
    setMenuOpen,
    toggleMenu,
  }), [menuOpen]);

  const positionStyles: ViewStyle = position === 'fixed'
    ? { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 }
    : position === 'sticky'
    ? { position: 'relative', zIndex: 50 }
    : {};

  const blurStyles = blur && Platform.OS === 'web'
    ? { backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)' }
    : { backgroundColor: colors.bg.base };

  return (
    <NavbarContext.Provider value={contextValue}>
      <View
        style={[
          styles.navbar,
          positionStyles,
          blurStyles as ViewStyle,
          bordered && styles.bordered,
          style,
        ]}
        accessibilityRole="navigation"
      >
        <View
          style={[
            styles.content,
            { maxWidth: maxWidthValues[maxWidth] },
          ]}
        >
          {children}
        </View>
      </View>
    </NavbarContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    paddingHorizontal: spacing[4],
  },
  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    width: '100%',
    marginHorizontal: 'auto',
  },
});
