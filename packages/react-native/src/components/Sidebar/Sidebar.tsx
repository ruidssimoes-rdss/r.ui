import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ViewStyle, useWindowDimensions } from 'react-native';
import { SidebarContext, SidebarSide } from './SidebarContext';

// ============================================================================
// Types
// ============================================================================

export interface SidebarProps {
  /** Whether the sidebar is open (controlled) */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Whether the sidebar can collapse to icon-only mode */
  collapsible?: boolean;
  /** Whether currently collapsed */
  collapsed?: boolean;
  /** Called when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Which side to display on */
  side?: SidebarSide;
  /** Breakpoint for mobile mode (in pixels) */
  mobileBreakpoint?: number;
  /** Sidebar content */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function Sidebar({
  open,
  onOpenChange,
  defaultOpen = true,
  collapsible = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  side = 'left',
  mobileBreakpoint = 768,
  children,
  style,
}: SidebarProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < mobileBreakpoint;

  // Open state (controlled/uncontrolled)
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open !== undefined ? open : internalOpen;

  const setOpen = useCallback((newOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [open, onOpenChange]);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  // Collapsed state (controlled/uncontrolled)
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const setCollapsed = useCallback((newCollapsed: boolean) => {
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(newCollapsed);
    }
    onCollapsedChange?.(newCollapsed);
  }, [controlledCollapsed, onCollapsedChange]);

  const contextValue = useMemo(() => ({
    open: isOpen,
    setOpen,
    toggle,
    collapsible,
    collapsed: isCollapsed,
    setCollapsed,
    side,
    isMobile,
  }), [isOpen, setOpen, toggle, collapsible, isCollapsed, setCollapsed, side, isMobile]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SidebarContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
