import React, { useRef, cloneElement, isValidElement } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { useContextMenu } from './ContextMenuContext';

// Try to import haptics if available
let triggerHaptic: (() => void) | null = null;
try {
  const Haptics = require('expo-haptics');
  triggerHaptic = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
} catch {
  // Haptics not available
}

export interface ContextMenuTriggerProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Render as child element instead of wrapping in Pressable */
  asChild?: boolean;
  /** Long press delay in milliseconds */
  delayMs?: number;
  /** Additional styles */
  style?: ViewStyle;
}

export function ContextMenuTrigger({
  children,
  asChild = false,
  delayMs = 500,
  style,
}: ContextMenuTriggerProps) {
  const { onOpenChange, setPressPosition, setTriggerLayout } = useContextMenu();
  const triggerRef = useRef<View>(null);

  const handleLongPress = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    // Trigger haptic feedback if available
    triggerHaptic?.();

    // Measure trigger for positioning fallback
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
    });

    // Store press position for menu placement
    setPressPosition({ x: pageX, y: pageY });
    onOpenChange(true);
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onLongPress: handleLongPress,
      delayLongPress: delayMs,
    });
  }

  return (
    <Pressable
      ref={triggerRef}
      onLongPress={handleLongPress}
      delayLongPress={delayMs}
      style={[styles.trigger, style]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trigger: {
    alignSelf: 'flex-start',
  },
});
