import React, { useRef } from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useHoverCard } from './HoverCardContext';

export interface HoverCardTriggerProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export function HoverCardTrigger({ children, style }: HoverCardTriggerProps) {
  const { onOpenChange, setTriggerLayout } = useHoverCard();
  const triggerRef = useRef<View>(null);

  const measureAndOpen = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      onOpenChange(true);
    });
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  // Long press for mobile
  const handleLongPress = () => {
    measureAndOpen();
  };

  // Web hover support
  const webProps = Platform.select({
    web: {
      onMouseEnter: measureAndOpen,
      onMouseLeave: handleClose,
    },
    default: {},
  });

  return (
    <Pressable
      ref={triggerRef}
      onLongPress={handleLongPress}
      delayLongPress={500}
      style={[styles.trigger, style]}
      {...webProps}
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
