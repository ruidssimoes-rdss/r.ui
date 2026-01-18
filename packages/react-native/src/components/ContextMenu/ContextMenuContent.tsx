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
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows } from '../../tokens/shadows';
import { useContextMenu } from './ContextMenuContext';

export interface ContextMenuContentProps {
  /** Content */
  children: React.ReactNode;
  /** Content alignment relative to press position */
  align?: 'start' | 'center' | 'end';
  /** Offset from press position */
  sideOffset?: number;
  /** Additional styles */
  style?: ViewStyle;
}

export function ContextMenuContent({
  children,
  align: alignProp,
  sideOffset: sideOffsetProp,
  style,
}: ContextMenuContentProps) {
  const {
    open,
    onOpenChange,
    pressPosition,
    triggerLayout,
    align: contextAlign,
    sideOffset: contextSideOffset,
  } = useContextMenu();

  const align = alignProp ?? contextAlign;
  const sideOffset = sideOffsetProp ?? contextSideOffset;

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

  if (!open) return null;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const screenMargin = spacing[2];

  // Calculate position based on press position or fallback to trigger
  let left = 0;
  let top = 0;

  if (pressPosition) {
    // Position near the press location
    left = pressPosition.x;
    top = pressPosition.y + sideOffset;

    // Adjust horizontal alignment
    if (align === 'center') {
      left = pressPosition.x - contentSize.width / 2;
    } else if (align === 'end') {
      left = pressPosition.x - contentSize.width;
    }
  } else if (triggerLayout) {
    // Fallback to trigger position
    left = triggerLayout.x;
    top = triggerLayout.y + triggerLayout.height + sideOffset;

    if (align === 'center') {
      left = triggerLayout.x + triggerLayout.width / 2 - contentSize.width / 2;
    } else if (align === 'end') {
      left = triggerLayout.x + triggerLayout.width - contentSize.width;
    }
  }

  // Keep within screen bounds horizontally
  left = Math.max(screenMargin, Math.min(left, screenWidth - contentSize.width - screenMargin));

  // Keep within screen bounds vertically
  // If menu would go off bottom, show above the press point
  if (top + contentSize.height > screenHeight - screenMargin) {
    if (pressPosition) {
      top = pressPosition.y - contentSize.height - sideOffset;
    } else if (triggerLayout) {
      top = triggerLayout.y - contentSize.height - sideOffset;
    }
  }
  top = Math.max(screenMargin, Math.min(top, screenHeight - contentSize.height - screenMargin));

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable style={styles.backdrop} onPress={() => onOpenChange(false)} />
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
    minWidth: 180,
    paddingVertical: spacing[1],
    ...shadows.lg,
  },
});
