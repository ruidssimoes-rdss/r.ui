import { createContext, useContext } from 'react';

// ============================================================================
// Types
// ============================================================================

export type SidebarSide = 'left' | 'right';

export interface SidebarContextValue {
  /** Whether the sidebar is open */
  open: boolean;
  /** Toggle sidebar open state */
  setOpen: (open: boolean) => void;
  /** Toggle open/closed */
  toggle: () => void;
  /** Whether the sidebar is collapsible (icon-only mode) */
  collapsible: boolean;
  /** Whether currently collapsed (showing icons only) */
  collapsed: boolean;
  /** Set collapsed state */
  setCollapsed: (collapsed: boolean) => void;
  /** Which side the sidebar is on */
  side: SidebarSide;
  /** Whether to show as mobile drawer */
  isMobile: boolean;
}

// ============================================================================
// Context
// ============================================================================

export const SidebarContext = createContext<SidebarContextValue | null>(null);

// ============================================================================
// Hook
// ============================================================================

export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'Sidebar components must be used within a Sidebar. ' +
        'Wrap your component in <Sidebar> to fix this error.'
    );
  }
  return context;
}
