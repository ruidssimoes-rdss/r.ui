import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CarouselItemProps } from './CarouselContext';

/**
 * CarouselItem - Individual slide container within a Carousel.
 *
 * Must be used as a child of CarouselContent.
 *
 * @example
 * ```tsx
 * <CarouselContent>
 *   <CarouselItem>
 *     <Text>Slide 1</Text>
 *   </CarouselItem>
 *   <CarouselItem>
 *     <Text>Slide 2</Text>
 *   </CarouselItem>
 * </CarouselContent>
 * ```
 */
export function CarouselItem({ children, style }: CarouselItemProps) {
  return <View style={[styles.item, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
});
