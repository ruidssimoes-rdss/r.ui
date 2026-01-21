import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { useCarousel, CarouselPreviousProps, CarouselNextProps } from './CarouselContext';
import { TOUCH_TARGET } from '../../utils/platform';

function ChevronArrow({ direction }: { direction: 'left' | 'right' }) {
  const isLeft = direction === 'left';
  return (
    <View style={styles.arrowContainer}>
      <View style={[styles.arrowLine, isLeft ? styles.arrowLeft1 : styles.arrowRight1]} />
      <View style={[styles.arrowLine, isLeft ? styles.arrowLeft2 : styles.arrowRight2]} />
    </View>
  );
}

/**
 * CarouselPrevious - Navigate to the previous slide.
 * Automatically disabled at first slide unless loop is enabled.
 */
export function CarouselPrevious({ children, style, disabled: disabledProp }: CarouselPreviousProps) {
  const { goToPrevious, currentIndex, loop } = useCarousel();
  const disabled = disabledProp ?? (!loop && currentIndex === 0);

  return (
    <Pressable
      onPress={goToPrevious}
      disabled={disabled}
      style={({ pressed }) => [
        styles.arrow,
        styles.arrowPrevious,
        pressed && !disabled && styles.arrowPressed,
        disabled && styles.arrowDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Previous slide"
      accessibilityState={{ disabled }}
    >
      {children || <ChevronArrow direction="left" />}
    </Pressable>
  );
}

/**
 * CarouselNext - Navigate to the next slide.
 * Automatically disabled at last slide unless loop is enabled.
 */
export function CarouselNext({ children, style, disabled: disabledProp }: CarouselNextProps) {
  const { goToNext, currentIndex, totalSlides, loop } = useCarousel();
  const disabled = disabledProp ?? (!loop && currentIndex === totalSlides - 1);

  return (
    <Pressable
      onPress={goToNext}
      disabled={disabled}
      style={({ pressed }) => [
        styles.arrow,
        styles.arrowNext,
        pressed && !disabled && styles.arrowPressed,
        disabled && styles.arrowDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Next slide"
      accessibilityState={{ disabled }}
    >
      {children || <ChevronArrow direction="right" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -(TOUCH_TARGET / 2) }],
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    borderRadius: TOUCH_TARGET / 2,
    backgroundColor: colors.bg.elevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
    zIndex: 10,
  },
  arrowPrevious: { left: spacing[2] },
  arrowNext: { right: spacing[2] },
  arrowPressed: { backgroundColor: colors.bg.surface },
  arrowDisabled: { opacity: 0.5 },
  arrowContainer: { width: 12, height: 12, justifyContent: 'center', alignItems: 'center' },
  arrowLine: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: colors.text.primary,
    borderRadius: 1,
  },
  arrowLeft1: { transform: [{ rotate: '-45deg' }, { translateY: -2 }] },
  arrowLeft2: { transform: [{ rotate: '45deg' }, { translateY: 2 }] },
  arrowRight1: { transform: [{ rotate: '45deg' }, { translateY: -2 }] },
  arrowRight2: { transform: [{ rotate: '-45deg' }, { translateY: 2 }] },
});
