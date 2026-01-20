import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Modal,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  Dimensions,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows } from '../../tokens/shadows';
import { useHoverCard } from './HoverCardContext';

export interface HoverCardContentProps {
  /** Content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export function HoverCardContent({ children, style }: HoverCardContentProps) {
  const { open, onOpenChange, triggerLayout, side, align, sideOffset } = useHoverCard();
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.95);
      opacityAnim.setValue(0);
    }
  }, [open, scaleAnim, opacityAnim]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContentSize({ width, height });
  };

  // Web hover support - cancel close when hovering content
  const webProps = Platform.select({
    web: {
      onMouseEnter: () => {
        // Keep open when hovering content
      },
      onMouseLeave: () => onOpenChange(false),
    },
    default: {},
  });

  if (!triggerLayout || !open) return null;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  let top = 0;
  let left = 0;

  // Calculate position based on side
  switch (side) {
    case 'top':
      top = triggerLayout.y - contentSize.height - sideOffset;
      break;
    case 'bottom':
      top = triggerLayout.y + triggerLayout.height + sideOffset;
      break;
    case 'left':
      left = triggerLayout.x - contentSize.width - sideOffset;
      top = triggerLayout.y;
      break;
    case 'right':
      left = triggerLayout.x + triggerLayout.width + sideOffset;
      top = triggerLayout.y;
      break;
  }

  // Calculate alignment
  if (side === 'top' || side === 'bottom') {
    switch (align) {
      case 'start':
        left = triggerLayout.x;
        break;
      case 'center':
        left = triggerLayout.x + triggerLayout.width / 2 - contentSize.width / 2;
        break;
      case 'end':
        left = triggerLayout.x + triggerLayout.width - contentSize.width;
        break;
    }
  } else {
    switch (align) {
      case 'start':
        top = triggerLayout.y;
        break;
      case 'center':
        top = triggerLayout.y + triggerLayout.height / 2 - contentSize.height / 2;
        break;
      case 'end':
        top = triggerLayout.y + triggerLayout.height - contentSize.height;
        break;
    }
  }

  // Keep within screen bounds
  left = Math.max(spacing[2], Math.min(left, screenWidth - contentSize.width - spacing[2]));
  top = Math.max(spacing[2], Math.min(top, screenHeight - contentSize.height - spacing[2]));

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable accessibilityRole="button" accessibilityLabel="Close" style={styles.backdrop} onPress={() => onOpenChange(false)} />
      <Animated.View
        onLayout={handleLayout}
        style={[
          styles.content,
          {
            position: 'absolute',
            top,
            left,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
          style,
        ]}
        {...webProps}
      >
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[4],
    minWidth: 200,
    maxWidth: 320,
    ...shadows.lg,
  },
});
