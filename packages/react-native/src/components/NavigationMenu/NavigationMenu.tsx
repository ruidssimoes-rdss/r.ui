import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  Linking,
  Dimensions,
  Modal,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { TOUCH_TARGET, isNative } from '../../utils/platform';

// Types
export type NavigationMenuOrientation = 'horizontal' | 'vertical';

export interface NavigationMenuProps {
  orientation?: NavigationMenuOrientation;
  delayDuration?: number;
  children?: ReactNode;
  style?: ViewStyle;
}

export interface NavigationMenuListProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface NavigationMenuItemProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface NavigationMenuTriggerProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface NavigationMenuContentProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface NavigationMenuLinkProps {
  href?: string;
  onPress?: () => void;
  children?: ReactNode;
  style?: ViewStyle;
  active?: boolean;
}

// Contexts
interface NavigationMenuContextValue {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
  delayDuration: number;
  orientation: NavigationMenuOrientation;
}

const NavigationMenuContext = createContext<NavigationMenuContextValue | undefined>(undefined);

interface NavigationMenuItemContextValue {
  itemId: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
}

const NavigationMenuItemContext = createContext<NavigationMenuItemContextValue | undefined>(undefined);

// Generate unique IDs
let itemIdCounter = 0;
const generateItemId = () => `nav-menu-item-${++itemIdCounter}`;

// Chevron Icon
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View style={[styles.chevron, { transform: [{ rotate: rotation }] }]}>
      <View style={styles.chevronLine1} />
      <View style={styles.chevronLine2} />
    </Animated.View>
  );
}

// NavigationMenuTrigger
export function NavigationMenuTrigger({ children, style }: NavigationMenuTriggerProps) {
  const context = useContext(NavigationMenuItemContext);
  const menuContext = useContext(NavigationMenuContext);
  const triggerRef = useRef<View>(null);

  if (!context || !menuContext) {
    throw new Error('NavigationMenuTrigger must be used within NavigationMenuItem');
  }

  const { isOpen, open, close, setTriggerLayout } = context;
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measureAndOpen = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      open();
    });
  }, [open, setTriggerLayout]);

  const handlePressIn = useCallback(() => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
    }
    delayTimerRef.current = setTimeout(() => {
      measureAndOpen();
    }, menuContext.delayDuration);
  }, [measureAndOpen, menuContext.delayDuration]);

  const handlePress = useCallback(() => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
    }
    if (isOpen) {
      close();
    } else {
      measureAndOpen();
    }
  }, [isOpen, close, measureAndOpen]);

  React.useEffect(() => {
    return () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
      }
    };
  }, []);

  return (
    <Pressable
      ref={triggerRef}
      onPress={handlePress}
      onPressIn={handlePressIn}
      style={({ pressed }) => [
        styles.trigger,
        isOpen && styles.triggerActive,
        pressed && styles.triggerPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}
    >
      {typeof children === 'string' ? (
        <Text style={styles.triggerText}>{children}</Text>
      ) : (
        children
      )}
      <ChevronIcon isOpen={isOpen} />
    </Pressable>
  );
}

// NavigationMenuContent
export function NavigationMenuContent({ children, style }: NavigationMenuContentProps) {
  const context = useContext(NavigationMenuItemContext);
  const menuContext = useContext(NavigationMenuContext);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-10)).current;
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  if (!context || !menuContext) {
    throw new Error('NavigationMenuContent must be used within NavigationMenuItem');
  }

  const { isOpen, close, triggerLayout } = context;

  React.useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          tension: 300,
          friction: 20,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: -10,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, opacityAnim, translateYAnim]);

  const handleContentLayout = useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setContentSize({ width, height });
  }, []);

  if (!isOpen) return null;

  // Calculate position with screen bounds detection
  const calculatePosition = () => {
    if (!triggerLayout) return { top: 0, left: 0 };

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const gap = spacing[2];

    let top = triggerLayout.y + triggerLayout.height + gap;
    let left = triggerLayout.x;

    // Check if content would overflow bottom of screen
    if (contentSize.height > 0 && top + contentSize.height > windowHeight - spacing[4]) {
      // Position above trigger instead
      top = triggerLayout.y - contentSize.height - gap;
    }

    // Keep within horizontal bounds
    if (contentSize.width > 0) {
      if (left + contentSize.width > windowWidth - spacing[2]) {
        left = windowWidth - contentSize.width - spacing[2];
      }
      if (left < spacing[2]) {
        left = spacing[2];
      }
    }

    return { top, left };
  };

  const position = calculatePosition();

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={close}
    >
      {/* Click-outside backdrop to close */}
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={close}
        accessibilityRole="none"
      />
      <Animated.View
        onLayout={handleContentLayout}
        style={[
          styles.content,
          {
            position: 'absolute',
            top: position.top,
            left: position.left,
            opacity: opacityAnim,
            transform: [{ translateY: translateYAnim }],
          },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </Modal>
  );
}

// NavigationMenuLink
export function NavigationMenuLink({
  href,
  onPress,
  children,
  style,
  active = false,
}: NavigationMenuLinkProps) {
  const context = useContext(NavigationMenuContext);

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    } else if (href) {
      Linking.openURL(href);
    }
    context?.setActiveItem(null);
  }, [onPress, href, context]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.link,
        active && styles.linkActive,
        pressed && styles.linkPressed,
        style,
      ]}
      accessibilityRole="link"
    >
      {typeof children === 'string' ? (
        <Text style={[styles.linkText, active && styles.linkTextActive]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

// NavigationMenuItem
export function NavigationMenuItem({ children, style }: NavigationMenuItemProps) {
  const context = useContext(NavigationMenuContext);
  const [itemId] = useState(generateItemId);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  if (!context) {
    throw new Error('NavigationMenuItem must be used within NavigationMenu');
  }

  const { activeItem, setActiveItem } = context;
  const isOpen = activeItem === itemId;

  const open = useCallback(() => {
    setActiveItem(itemId);
  }, [itemId, setActiveItem]);

  const close = useCallback(() => {
    setActiveItem(null);
  }, [setActiveItem]);

  return (
    <NavigationMenuItemContext.Provider
      value={{ itemId, isOpen, open, close, triggerLayout, setTriggerLayout }}
    >
      <View style={[styles.item, style]}>
        {children}
      </View>
    </NavigationMenuItemContext.Provider>
  );
}

// NavigationMenuList
export function NavigationMenuList({ children, style }: NavigationMenuListProps) {
  const context = useContext(NavigationMenuContext);

  if (!context) {
    throw new Error('NavigationMenuList must be used within NavigationMenu');
  }

  return (
    <View
      style={[
        styles.list,
        context.orientation === 'vertical' && styles.listVertical,
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Main NavigationMenu Component
export function NavigationMenu({
  orientation = 'horizontal',
  delayDuration = 200,
  children,
  style,
}: NavigationMenuProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <NavigationMenuContext.Provider
      value={{ activeItem, setActiveItem, delayDuration, orientation }}
    >
      <View style={[styles.navigationMenu, style]}>
        {children}
      </View>
    </NavigationMenuContext.Provider>
  );
}

const styles = StyleSheet.create({
  navigationMenu: {},
  list: {
    flexDirection: 'row',
    gap: spacing[1],
  },
  listVertical: {
    flexDirection: 'column',
  },
  item: {
    position: 'relative',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: radius.md,
    gap: spacing[1],
    // Ensure minimum touch target on native platforms
    minHeight: isNative ? TOUCH_TARGET : undefined,
  },
  triggerActive: {
    backgroundColor: colors.bg.elevated,
  },
  triggerPressed: {
    backgroundColor: colors.bg.surface,
  },
  triggerText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  chevron: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronLine1: {
    position: 'absolute',
    width: 6,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }, { translateX: -1.5 }],
  },
  chevronLine2: {
    position: 'absolute',
    width: 6,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateX: 1.5 }],
  },
  content: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[3],
    minWidth: 220,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  link: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    borderRadius: radius.sm,
    // Ensure minimum touch target on native platforms
    minHeight: isNative ? TOUCH_TARGET : undefined,
  },
  linkActive: {
    backgroundColor: colors.bg.surface,
  },
  linkPressed: {
    backgroundColor: colors.bg.surface,
  },
  linkText: {
    color: colors.text.primary,
    fontSize: 14,
  },
  linkTextActive: {
    fontWeight: '500',
  },
});
