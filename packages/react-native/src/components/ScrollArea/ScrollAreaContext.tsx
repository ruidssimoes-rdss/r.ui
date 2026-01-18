import React, { createContext, useContext } from 'react';
import { Animated } from 'react-native';

export interface ScrollAreaContextValue {
  /** Current scroll position X */
  scrollX: Animated.Value;
  /** Current scroll position Y */
  scrollY: Animated.Value;
  /** Content width */
  contentWidth: number;
  /** Content height */
  contentHeight: number;
  /** Viewport width */
  viewportWidth: number;
  /** Viewport height */
  viewportHeight: number;
  /** Update content dimensions */
  setContentSize: (width: number, height: number) => void;
  /** Update viewport dimensions */
  setViewportSize: (width: number, height: number) => void;
  /** Scrollbar visibility animation */
  scrollbarOpacity: Animated.Value;
  /** Show scrollbar */
  showScrollbar: () => void;
  /** Hide scrollbar with delay */
  hideScrollbar: () => void;
  /** Whether horizontal scrolling is enabled */
  horizontal: boolean;
  /** Whether to show scroll indicators */
  showsIndicator: boolean;
}

const ScrollAreaContext = createContext<ScrollAreaContextValue | null>(null);

export function useScrollArea(): ScrollAreaContextValue {
  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error('useScrollArea must be used within a ScrollArea');
  }
  return context;
}

export { ScrollAreaContext };
