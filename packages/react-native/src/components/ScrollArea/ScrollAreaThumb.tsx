import React from 'react';
import { StyleSheet, ViewStyle, Animated } from 'react-native';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { useScrollArea } from './ScrollAreaContext';

export interface ScrollAreaThumbProps {
  /** Scrollbar orientation (inherited from parent, but can be overridden) */
  orientation?: 'vertical' | 'horizontal';
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * ScrollAreaThumb - The draggable thumb of the scrollbar with size proportional to content vs viewport.
 */
export function ScrollAreaThumb({
  orientation = 'vertical',
  style,
}: ScrollAreaThumbProps) {
  const {
    scrollX,
    scrollY,
    contentWidth,
    contentHeight,
    viewportWidth,
    viewportHeight,
  } = useScrollArea();

  const isVertical = orientation === 'vertical';

  // Calculate thumb size as a ratio of viewport to content
  const thumbSize = isVertical
    ? viewportHeight > 0 && contentHeight > 0
      ? Math.max((viewportHeight / contentHeight) * viewportHeight, 30)
      : 30
    : viewportWidth > 0 && contentWidth > 0
      ? Math.max((viewportWidth / contentWidth) * viewportWidth, 30)
      : 30;

  // Calculate the scrollable track length
  const trackLength = isVertical
    ? viewportHeight - thumbSize - 8 // 8 = spacing[1] * 2 for padding
    : viewportWidth - thumbSize - 8;

  // Calculate the max scroll position
  const maxScroll = isVertical
    ? Math.max(contentHeight - viewportHeight, 1)
    : Math.max(contentWidth - viewportWidth, 1);

  // Animate thumb position based on scroll
  const translateStyle = isVertical
    ? {
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [0, maxScroll],
              outputRange: [0, trackLength],
              extrapolate: 'clamp',
            }),
          },
        ],
      }
    : {
        transform: [
          {
            translateX: scrollX.interpolate({
              inputRange: [0, maxScroll],
              outputRange: [0, trackLength],
              extrapolate: 'clamp',
            }),
          },
        ],
      };

  const sizeStyle = isVertical
    ? { height: thumbSize, width: '100%' as const }
    : { width: thumbSize, height: '100%' as const };

  return (
    <Animated.View
      style={[styles.thumb, sizeStyle, translateStyle, style]}
    />
  );
}

const styles = StyleSheet.create({
  thumb: {
    backgroundColor: colors.border.strong,
    borderRadius: radius.full,
  },
});
