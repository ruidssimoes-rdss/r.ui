import React from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
import { colors } from '../../tokens/colors';

interface SheetOverlayProps {
  opacity: Animated.Value;
  onPress: () => void;
}

/**
 * SheetOverlay - Backdrop that dims the content behind the sheet.
 * Internal component used by SheetContent.
 */
export function SheetOverlay({ opacity, onPress }: SheetOverlayProps) {
  return (
    <Animated.View style={[styles.backdrop, { opacity }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close sheet"
        style={StyleSheet.absoluteFill}
        onPress={onPress}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg.overlay,
  },
});
