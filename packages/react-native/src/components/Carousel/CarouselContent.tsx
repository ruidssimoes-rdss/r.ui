import React, { useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useCarousel, CarouselContentProps } from './CarouselContext';

/**
 * CarouselContent - The scrollable container for carousel slides.
 *
 * Wraps CarouselItem children in a horizontal paging ScrollView.
 * Must be used within a Carousel component.
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 */
export function CarouselContent({ children, style }: CarouselContentProps) {
  const {
    scrollViewRef,
    itemWidth,
    goToSlide,
    currentIndex,
    totalSlides,
  } = useCarousel();

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(contentOffsetX / itemWidth);

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
        goToSlide(newIndex);
      }
    },
    [itemWidth, currentIndex, totalSlides, goToSlide]
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScroll}
      scrollEventThrottle={16}
      style={[styles.scrollView, style]}
      contentContainerStyle={styles.scrollContent}
    >
      {React.Children.map(children, (child, index) => (
        <View key={index} style={{ width: itemWidth }}>
          {child}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {},
});
