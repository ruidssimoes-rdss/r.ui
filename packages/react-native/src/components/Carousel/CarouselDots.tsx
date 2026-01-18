import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { useCarousel, CarouselDotsProps } from './CarouselContext';

/**
 * CarouselDots - Dot indicators showing current slide position.
 *
 * Renders a row of clickable dots. The active dot is highlighted.
 * Must be used within a Carousel component.
 *
 * @example
 * ```tsx
 * <Carousel>
 *   <CarouselContent>...</CarouselContent>
 *   <CarouselDots
 *     activeColor="#3b82f6"
 *     inactiveColor="rgba(59, 130, 246, 0.3)"
 *   />
 * </Carousel>
 * ```
 */
export function CarouselDots({
  style,
  activeColor = colors.text.primary,
  inactiveColor = colors.text.muted,
}: CarouselDotsProps) {
  const { currentIndex, totalSlides, goToSlide } = useCarousel();

  return (
    <View style={[styles.dots, style]}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <Pressable
          key={index}
          onPress={() => goToSlide(index)}
          style={({ pressed }) => [
            styles.dot,
            {
              backgroundColor:
                index === currentIndex ? activeColor : inactiveColor,
            },
            pressed && styles.dotPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={`Go to slide ${index + 1}`}
          accessibilityState={{ selected: index === currentIndex }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing[3],
    gap: spacing[2],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotPressed: {
    opacity: 0.7,
  },
});
