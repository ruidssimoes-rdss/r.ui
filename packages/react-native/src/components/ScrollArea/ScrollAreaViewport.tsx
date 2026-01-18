import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  Animated,
} from 'react-native';
import { useScrollArea } from './ScrollAreaContext';

export interface ScrollAreaViewportProps {
  /** Content to render */
  children: React.ReactNode;
  /** Additional styles for the content container */
  contentContainerStyle?: ViewStyle;
  /** Additional styles for the scroll view */
  style?: ViewStyle;
}

/**
 * ScrollAreaViewport - The actual ScrollView component that tracks scroll position and content size.
 */
export function ScrollAreaViewport({
  children,
  contentContainerStyle,
  style,
}: ScrollAreaViewportProps) {
  const {
    scrollX,
    scrollY,
    setContentSize,
    setViewportSize,
    showScrollbar,
    hideScrollbar,
    horizontal,
    showsIndicator,
  } = useScrollArea();

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
            y: scrollY,
          },
        },
      },
    ],
    {
      useNativeDriver: true,
      listener: () => {
        showScrollbar();
        hideScrollbar();
      },
    }
  );

  const handleContentSizeChange = useCallback(
    (width: number, height: number) => {
      setContentSize(width, height);
    },
    [setContentSize]
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      setViewportSize(width, height);
    },
    [setViewportSize]
  );

  return (
    <Animated.ScrollView
      style={[styles.viewport, style]}
      contentContainerStyle={contentContainerStyle}
      horizontal={horizontal}
      showsVerticalScrollIndicator={showsIndicator && !horizontal}
      showsHorizontalScrollIndicator={showsIndicator && horizontal}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onContentSizeChange={handleContentSizeChange}
      onLayout={handleLayout}
      bounces={true}
    >
      {children}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
  },
});
