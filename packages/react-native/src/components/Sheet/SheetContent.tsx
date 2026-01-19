import React, { useRef, useEffect } from 'react';
import {
  View,
  Modal,
  Animated,
  PanResponder,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useSheet, SheetContentProps, SheetSide } from './SheetContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SheetOverlay } from './SheetOverlay';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function getInitialTranslate(side: SheetSide): number {
  switch (side) {
    case 'bottom': return SCREEN_HEIGHT;
    case 'top': return -SCREEN_HEIGHT;
    case 'left': return -SCREEN_WIDTH;
    case 'right': return SCREEN_WIDTH;
  }
}

function getContentStyle(side: SheetSide): ViewStyle {
  const base: ViewStyle = { position: 'absolute', backgroundColor: colors.bg.elevated };

  switch (side) {
    case 'bottom':
      return { ...base, bottom: 0, left: 0, right: 0, maxHeight: SCREEN_HEIGHT * 0.9,
        borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl };
    case 'top':
      return { ...base, top: 0, left: 0, right: 0, maxHeight: SCREEN_HEIGHT * 0.9,
        borderBottomLeftRadius: radius.xl, borderBottomRightRadius: radius.xl };
    case 'left':
      return { ...base, top: 0, bottom: 0, left: 0, width: SCREEN_WIDTH * 0.85, maxWidth: 400 };
    case 'right':
      return { ...base, top: 0, bottom: 0, right: 0, width: SCREEN_WIDTH * 0.85, maxWidth: 400 };
  }
}

/**
 * SheetContent - The sliding panel with gesture-based dismissal.
 */
export function SheetContent({ children, style }: SheetContentProps) {
  const { open, onOpenChange, side } = useSheet();
  const reducedMotion = useReducedMotion();
  const translateAnim = useRef(new Animated.Value(getInitialTranslate(side))).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const isHorizontal = side === 'left' || side === 'right';
  const sheetSize = isHorizontal ? SCREEN_WIDTH * 0.85 : SCREEN_HEIGHT * 0.5;
  const dismissThreshold = sheetSize * 0.3;

  const openSheet = () => {
    if (reducedMotion) {
      // Instant appearance for reduced motion
      translateAnim.setValue(0);
      backdropOpacity.setValue(1);
      return;
    }
    Animated.parallel([
      Animated.spring(translateAnim, { toValue: 0, useNativeDriver: true, tension: 65, friction: 10 }),
      Animated.timing(backdropOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const closeSheet = () => {
    if (reducedMotion) {
      // Instant dismissal for reduced motion
      onOpenChange(false);
      return;
    }
    Animated.parallel([
      Animated.timing(translateAnim, { toValue: getInitialTranslate(side), duration: 200, useNativeDriver: true }),
      Animated.timing(backdropOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => onOpenChange(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dx, dy }) => {
        switch (side) {
          case 'bottom': return dy > 10;
          case 'top': return dy < -10;
          case 'left': return dx < -10;
          case 'right': return dx > 10;
        }
      },
      onPanResponderMove: (_, { dx, dy }) => {
        let value = 0;
        switch (side) {
          case 'bottom': value = Math.max(0, dy); break;
          case 'top': value = Math.min(0, dy); break;
          case 'left': value = Math.min(0, dx); break;
          case 'right': value = Math.max(0, dx); break;
        }
        translateAnim.setValue(value);
      },
      onPanResponderRelease: (_, { dx, dy }) => {
        let shouldDismiss = false;
        switch (side) {
          case 'bottom': shouldDismiss = dy > dismissThreshold; break;
          case 'top': shouldDismiss = dy < -dismissThreshold; break;
          case 'left': shouldDismiss = dx < -dismissThreshold; break;
          case 'right': shouldDismiss = dx > dismissThreshold; break;
        }
        if (shouldDismiss) {
          closeSheet();
        } else {
          Animated.spring(translateAnim, { toValue: 0, useNativeDriver: true, tension: 65, friction: 10 }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (open) {
      translateAnim.setValue(getInitialTranslate(side));
      openSheet();
    }
  }, [open]);

  const transformStyle = (side === 'bottom' || side === 'top')
    ? { transform: [{ translateY: translateAnim }] }
    : { transform: [{ translateX: translateAnim }] };

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={closeSheet}>
      <View style={styles.container}>
        <SheetOverlay opacity={backdropOpacity} onPress={closeSheet} />
        <Animated.View {...panResponder.panHandlers} style={[getContentStyle(side), transformStyle, style]}>
          {side === 'bottom' && <View style={styles.handle} />}
          <View style={styles.contentInner}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: colors.border.strong,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing[2],
    marginBottom: spacing[2],
  },
  contentInner: { padding: spacing[4] },
});
