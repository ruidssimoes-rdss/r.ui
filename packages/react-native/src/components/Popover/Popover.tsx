import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Pressable,
  Modal,
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

export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
  side: PopoverSide;
  align: PopoverAlign;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within a Popover');
  }
  return context;
}

export interface PopoverProps {
  /** Popover content */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Side to show popover */
  side?: PopoverSide;
  /** Alignment relative to trigger */
  align?: PopoverAlign;
}

export interface PopoverTriggerProps {
  /** Trigger element */
  children: React.ReactElement;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PopoverContentProps {
  /** Content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PopoverCloseProps {
  /** Close button content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export function Popover({
  children,
  open: controlledOpen,
  onOpenChange,
  side = 'bottom',
  align = 'center',
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <PopoverContext.Provider
      value={{ open, onOpenChange: handleOpenChange, triggerLayout, setTriggerLayout, side, align }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children, style }: PopoverTriggerProps) {
  const { onOpenChange, setTriggerLayout } = usePopoverContext();
  const triggerRef = useRef<View>(null);

  const handlePress = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      onOpenChange(true);
    });
  };

  return (
    <Pressable ref={triggerRef} onPress={handlePress} accessibilityRole="button" style={style}>
      {children}
    </Pressable>
  );
}

export function PopoverContent({ children, style }: PopoverContentProps) {
  const { open, onOpenChange, triggerLayout, side, align } = usePopoverContext();
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
  }, [open]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContentSize({ width, height });
  };

  if (!triggerLayout) return null;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const gap = spacing[2];

  let top = 0;
  let left = 0;

  // Calculate position based on side
  switch (side) {
    case 'top':
      top = triggerLayout.y - contentSize.height - gap;
      break;
    case 'bottom':
      top = triggerLayout.y + triggerLayout.height + gap;
      break;
    case 'left':
      left = triggerLayout.x - contentSize.width - gap;
      top = triggerLayout.y;
      break;
    case 'right':
      left = triggerLayout.x + triggerLayout.width + gap;
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
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <Pressable style={styles.backdrop} onPress={() => onOpenChange(false)} accessibilityRole="button" accessibilityLabel="Close popover" />
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

export function PopoverClose({ children, style }: PopoverCloseProps) {
  const { onOpenChange } = usePopoverContext();

  return (
    <Pressable onPress={() => onOpenChange(false)} accessibilityRole="button" style={style}>
      {children}
    </Pressable>
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
    ...shadows.lg,
  },
});
