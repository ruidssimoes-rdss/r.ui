import React, { useRef, useEffect, useState } from 'react';
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
import { useDateRangePicker } from './DateRangePickerContext';

export interface DateRangePickerContentProps {
  /** Content (DateRangePickerHeader, DateRangePickerCalendar, etc.) */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export function DateRangePickerContent({ children, style }: DateRangePickerContentProps) {
  const { open, setOpen, triggerLayout, showPresets } = useDateRangePicker();
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

  if (!open || !triggerLayout) return null;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Position dropdown below trigger, wider for date range + presets
  const calendarWidth = showPresets
    ? Math.max(triggerLayout.width, 480)
    : Math.max(triggerLayout.width, 320);

  let left = triggerLayout.x;

  // Keep within screen bounds
  left = Math.max(
    spacing[2],
    Math.min(left, screenWidth - calendarWidth - spacing[2])
  );

  let top = triggerLayout.y + triggerLayout.height + spacing[1];

  // If dropdown would go off bottom, show above trigger
  if (top + contentSize.height > screenHeight - spacing[4]) {
    top = triggerLayout.y - contentSize.height - spacing[1];
  }

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => setOpen(false)}
    >
      <Pressable
        style={styles.backdrop}
        onPress={() => setOpen(false)}
        accessibilityRole="button"
        accessibilityLabel="Close picker"
      />
      <Animated.View
        onLayout={handleLayout}
        style={[
          styles.content,
          {
            position: 'absolute',
            top,
            left,
            minWidth: calendarWidth,
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
    overflow: 'hidden',
    ...shadows.lg,
  },
});
