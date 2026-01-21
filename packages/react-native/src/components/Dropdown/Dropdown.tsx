import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows } from '../../tokens/shadows';
import { TOUCH_TARGET } from '../../utils/platform';

export type DropdownAlign = 'start' | 'center' | 'end';

interface DropdownContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
  align: DropdownAlign;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
}

export interface DropdownProps {
  /** Dropdown content */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Content alignment relative to trigger */
  align?: DropdownAlign;
}

export interface DropdownTriggerProps {
  /** Trigger element */
  children: React.ReactElement;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DropdownContentProps {
  /** Content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DropdownItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Selection callback */
  onSelect?: () => void;
  /** Disable the item */
  disabled?: boolean;
  /** Destructive styling */
  destructive?: boolean;
  /** Icon element */
  icon?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export interface DropdownSeparatorProps {
  /** Additional styles */
  style?: ViewStyle;
}

export function Dropdown({
  children,
  open: controlledOpen,
  onOpenChange,
  align = 'start',
}: DropdownProps) {
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
    <DropdownContext.Provider
      value={{ open, onOpenChange: handleOpenChange, triggerLayout, setTriggerLayout, align }}
    >
      {children}
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children, style }: DropdownTriggerProps) {
  const { onOpenChange, setTriggerLayout } = useDropdownContext();
  const triggerRef = useRef<View>(null);

  const handlePress = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      onOpenChange(true);
    });
  };

  return (
    <Pressable ref={triggerRef} onPress={handlePress} style={[styles.trigger, style]} accessibilityRole="button">
      {children}
    </Pressable>
  );
}

export function DropdownContent({ children, style }: DropdownContentProps) {
  const { open, onOpenChange, triggerLayout, align } = useDropdownContext();
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

  let left = triggerLayout.x;
  if (align === 'center') {
    left = triggerLayout.x + triggerLayout.width / 2 - contentSize.width / 2;
  } else if (align === 'end') {
    left = triggerLayout.x + triggerLayout.width - contentSize.width;
  }

  // Keep within screen bounds
  left = Math.max(spacing[2], Math.min(left, screenWidth - contentSize.width - spacing[2]));

  let top = triggerLayout.y + triggerLayout.height + spacing[1];
  // If dropdown would go off bottom, show above trigger
  if (top + contentSize.height > screenHeight - spacing[4]) {
    top = triggerLayout.y - contentSize.height - spacing[1];
  }

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <Pressable style={styles.backdrop} onPress={() => onOpenChange(false)} accessibilityRole="button" accessibilityLabel="Close dropdown" />
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

export function DropdownItem({
  children,
  onSelect,
  disabled = false,
  destructive = false,
  icon,
  style,
  textStyle,
}: DropdownItemProps) {
  const { onOpenChange } = useDropdownContext();

  const handlePress = () => {
    if (!disabled) {
      onSelect?.();
      onOpenChange(false);
    }
  };

  return (
    <Pressable
      accessibilityRole="menuitem"
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      {icon && <View style={styles.itemIcon}>{icon}</View>}
      <Text
        style={[
          styles.itemText,
          destructive && styles.itemTextDestructive,
          disabled && styles.itemTextDisabled,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export function DropdownSeparator({ style }: DropdownSeparatorProps) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
  trigger: {
    minHeight: TOUCH_TARGET, // Platform-aware: 44pt iOS, 48dp Android, 36px Web
    justifyContent: 'center',
  },
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TOUCH_TARGET, // Platform-aware: 44pt iOS, 48dp Android, 36px Web
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    gap: spacing[2],
  },
  itemPressed: {
    backgroundColor: colors.bg.surface,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  itemTextDestructive: {
    color: colors.accent.red.DEFAULT,
  },
  itemTextDisabled: {
    color: colors.text.muted,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.default,
    marginVertical: spacing[1],
  },
});
