import React from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useScrollArea } from './ScrollAreaContext';

export type ScrollAreaOrientation = 'vertical' | 'horizontal';

export interface ScrollAreaScrollbarProps {
  /** Scrollbar orientation */
  orientation?: ScrollAreaOrientation;
  /** Force the scrollbar to be visible */
  forceVisible?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  /** Children (typically ScrollAreaThumb) */
  children?: React.ReactNode;
}

/**
 * ScrollAreaScrollbar - Custom scrollbar indicator that fades in/out based on scrolling.
 */
export function ScrollAreaScrollbar({
  orientation = 'vertical',
  forceVisible = false,
  style,
  children,
}: ScrollAreaScrollbarProps) {
  const { scrollbarOpacity, contentHeight, contentWidth, viewportHeight, viewportWidth } =
    useScrollArea();

  const isVertical = orientation === 'vertical';

  // Don't render if content fits in viewport
  const shouldRender = isVertical
    ? contentHeight > viewportHeight
    : contentWidth > viewportWidth;

  if (!shouldRender && !forceVisible) {
    return null;
  }

  const animatedOpacity = forceVisible ? 1 : scrollbarOpacity;

  return (
    <Animated.View
      style={[
        styles.scrollbar,
        isVertical ? styles.vertical : styles.horizontal,
        { opacity: animatedOpacity },
        style,
      ]}
      pointerEvents="none"
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollbar: {
    position: 'absolute',
    backgroundColor: colors.transparent,
  },
  vertical: {
    top: spacing[1],
    bottom: spacing[1],
    right: spacing[1],
    width: 6,
    borderRadius: radius.full,
  },
  horizontal: {
    left: spacing[1],
    right: spacing[1],
    bottom: spacing[1],
    height: 6,
    borderRadius: radius.full,
  },
});
