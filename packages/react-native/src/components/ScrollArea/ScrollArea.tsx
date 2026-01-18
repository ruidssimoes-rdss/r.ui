import React, { useState, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { ScrollAreaContext, ScrollAreaContextValue } from './ScrollAreaContext';

export interface ScrollAreaProps {
  /** Content to render */
  children: React.ReactNode;
  /** Enable horizontal scrolling */
  horizontal?: boolean;
  /** Show scroll indicators (native) */
  showsIndicator?: boolean;
  /** Enable bounce effect */
  bounces?: boolean;
  /** Additional styles for the container */
  style?: ViewStyle;
}

/**
 * ScrollArea - A custom styled scrollable container with optional custom scrollbar indicators.
 */
export function ScrollArea({
  children,
  horizontal = false,
  showsIndicator = true,
  bounces = true,
  style,
}: ScrollAreaProps) {
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollbarOpacity = useRef(new Animated.Value(0)).current;
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setContentSize = useCallback((width: number, height: number) => {
    setContentWidth(width);
    setContentHeight(height);
  }, []);

  const setViewportSize = useCallback((width: number, height: number) => {
    setViewportWidth(width);
    setViewportHeight(height);
  }, []);

  const showScrollbar = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    Animated.timing(scrollbarOpacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [scrollbarOpacity]);

  const hideScrollbar = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      Animated.timing(scrollbarOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, [scrollbarOpacity]);

  const contextValue: ScrollAreaContextValue = useMemo(
    () => ({
      scrollX,
      scrollY,
      contentWidth,
      contentHeight,
      viewportWidth,
      viewportHeight,
      setContentSize,
      setViewportSize,
      scrollbarOpacity,
      showScrollbar,
      hideScrollbar,
      horizontal,
      showsIndicator,
    }),
    [
      scrollX,
      scrollY,
      contentWidth,
      contentHeight,
      viewportWidth,
      viewportHeight,
      setContentSize,
      setViewportSize,
      scrollbarOpacity,
      showScrollbar,
      hideScrollbar,
      horizontal,
      showsIndicator,
    ]
  );

  return (
    <ScrollAreaContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>{children}</View>
    </ScrollAreaContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: radius.md,
    backgroundColor: colors.bg.surface,
  },
});
