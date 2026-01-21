import React from 'react';
import { View, Animated, Pressable, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useSidebar } from './SidebarContext';
import { GlassSurface } from '../GlassSurface';
import { useTheme, ThemeContextValue } from '../../themes/ThemeProvider';

// Safe hook that returns null if ThemeProvider is not present
function useThemeOptional(): ThemeContextValue | null {
  try {
    return useTheme();
  } catch {
    return null;
  }
}

// ============================================================================
// Types
// ============================================================================

export interface SidebarContentProps {
  /** Sidebar content */
  children: React.ReactNode;
  /** Width when expanded */
  width?: number;
  /** Width when collapsed */
  collapsedWidth?: number;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function SidebarContent({
  children,
  width = 256,
  collapsedWidth = 64,
  style,
}: SidebarContentProps) {
  const { open, setOpen, collapsed, side, isMobile } = useSidebar();
  const themeContext = useThemeOptional();
  const isGlass = themeContext?.isGlass ?? false;

  const currentWidth = collapsed ? collapsedWidth : width;

  // On mobile, render as overlay drawer
  if (isMobile) {
    if (!open) return null;

    // Glass mode mobile drawer
    if (isGlass) {
      return (
        <>
          {/* Backdrop */}
          <Pressable
            style={styles.backdrop}
            onPress={() => setOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close sidebar"
          />

          {/* Glass Drawer */}
          <GlassSurface
            intensity={20}
            borderRadius={0}
            shadow="lg"
            bordered={false}
            style={[
              styles.glassDrawer as ViewStyle,
              { width },
              side === 'left' ? styles.drawerLeft : styles.drawerRight,
              side === 'left' ? styles.glassDrawerLeft : styles.glassDrawerRight,
              style as ViewStyle,
            ]}
          >
            {children}
          </GlassSurface>
        </>
      );
    }

    // Default mobile drawer
    return (
      <>
        {/* Backdrop */}
        <Pressable
          style={styles.backdrop}
          onPress={() => setOpen(false)}
          accessibilityRole="button"
          accessibilityLabel="Close sidebar"
        />

        {/* Drawer */}
        <View
          style={[
            styles.drawer,
            { width },
            side === 'left' ? styles.drawerLeft : styles.drawerRight,
            style,
          ]}
        >
          {children}
        </View>
      </>
    );
  }

  // Desktop: fixed sidebar
  if (!open) return null;

  // Glass mode desktop sidebar
  if (isGlass) {
    return (
      <GlassSurface
        intensity={16}
        borderRadius={0}
        shadow="lg"
        bordered={false}
        style={[
          styles.glassContent as ViewStyle,
          { width: currentWidth },
          side === 'left' ? styles.glassContentLeft : styles.glassContentRight,
          style as ViewStyle,
        ]}
      >
        {children}
      </GlassSurface>
    );
  }

  // Default desktop sidebar
  return (
    <View
      style={[
        styles.content,
        { width: currentWidth },
        side === 'right' && styles.contentRight,
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
    backgroundColor: colors.bg.surface,
    borderRightWidth: 1,
    borderRightColor: colors.border.default,
    height: '100%',
  },
  contentRight: {
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: colors.border.default,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: colors.bg.base,
    zIndex: 50,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 16,
      },
      default: {
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.25)',
      },
    }),
  },
  drawerLeft: {
    left: 0,
  },
  drawerRight: {
    right: 0,
  },
  // Glass mode styles
  glassContent: {
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
  },
  glassContentLeft: {
    borderTopRightRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  glassContentRight: {
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.2)',
    borderTopLeftRadius: radius.lg,
    borderBottomLeftRadius: radius.lg,
  },
  glassDrawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 50,
  },
  glassDrawerLeft: {
    borderTopRightRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  glassDrawerRight: {
    borderTopLeftRadius: radius.xl,
    borderBottomLeftRadius: radius.xl,
  },
});
