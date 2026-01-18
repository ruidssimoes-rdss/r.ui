import React, { useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { CarouselContext, CarouselProps } from './CarouselContext';
import { CarouselContent } from './CarouselContent';
import { CarouselPrevious, CarouselNext } from './CarouselNavigation';
import { CarouselDots } from './CarouselDots';

/**
 * Carousel - Horizontal scrolling carousel with navigation and indicators.
 *
 * Supports autoplay, looping, dot indicators, and navigation arrows.
 * Uses compound components pattern for flexible composition.
 *
 * @example
 * ```tsx
 * <Carousel autoplay loop>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 *   <CarouselDots />
 * </Carousel>
 * ```
 */
export function Carousel({
  autoplay = false,
  interval = 5000,
  loop = false,
  showDots = true,
  showArrows = true,
  children,
  style,
  onSlideChange,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Count slides from CarouselContent children
  const totalSlides = countSlides(children);

  const goToSlide = useCallback(
    (index: number) => {
      let targetIndex = index;

      if (loop) {
        if (index < 0) targetIndex = totalSlides - 1;
        else if (index >= totalSlides) targetIndex = 0;
      } else {
        targetIndex = Math.max(0, Math.min(index, totalSlides - 1));
      }

      setCurrentIndex(targetIndex);
      onSlideChange?.(targetIndex);

      scrollViewRef.current?.scrollTo({
        x: targetIndex * containerWidth,
        animated: true,
      });
    },
    [totalSlides, loop, containerWidth, onSlideChange]
  );

  const goToPrevious = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);
  const goToNext = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);

  // Autoplay effect
  useEffect(() => {
    if (autoplay && totalSlides > 1) {
      autoplayTimerRef.current = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, interval);

      return () => {
        if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      };
    }
  }, [autoplay, interval, currentIndex, totalSlides, goToSlide]);

  const handleLayout = useCallback((event: any) => {
    const width = event.nativeEvent.layout.width;
    if (width > 0) setContainerWidth(width);
  }, []);

  const contextValue = {
    currentIndex,
    totalSlides,
    goToSlide,
    goToPrevious,
    goToNext,
    scrollViewRef,
    itemWidth: containerWidth,
    loop,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <View style={[styles.carousel, style]} onLayout={handleLayout}>
        {renderChildren(children, showDots)}
        {showArrows && !hasChild(children, CarouselPrevious) && <CarouselPrevious />}
        {showArrows && !hasChild(children, CarouselNext) && <CarouselNext />}
        {showDots && !hasChild(children, CarouselDots) && <CarouselDots />}
      </View>
    </CarouselContext.Provider>
  );
}

// ============================================================================
// Helpers
// ============================================================================

function countSlides(children: ReactNode): number {
  let count = 0;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === CarouselContent) {
      count = React.Children.count(child.props.children);
    }
  });
  return count;
}

function hasChild(children: ReactNode, type: any): boolean {
  let found = false;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === type) found = true;
  });
  return found;
}

function renderChildren(children: ReactNode, showDots: boolean): ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === CarouselDots) return showDots ? child : null;
    return child;
  });
}

const styles = StyleSheet.create({
  carousel: {
    position: 'relative',
    overflow: 'hidden',
  },
});
