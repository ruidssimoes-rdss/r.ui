import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { animations } from '../../tokens/animations';
import { GlassSurface } from '../GlassSurface';
import { useTheme, ThemeContextValue } from '../../themes/ThemeProvider';
import { TOUCH_TARGET, isNative } from '../../utils/platform';

// Safe hook that returns null if ThemeProvider is not present
function useThemeOptional(): ThemeContextValue | null {
  try {
    return useTheme();
  } catch {
    return null;
  }
}

// Types
export interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
}

export interface CollapsibleTriggerProps {
  children?: ReactNode;
  style?: ViewStyle;
  asChild?: boolean;
}

export interface CollapsibleContentProps {
  children?: ReactNode;
  style?: ViewStyle;
}

// Context
interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isGlass: boolean;
}

const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(undefined);

// CollapsibleTrigger
export function CollapsibleTrigger({
  children,
  style,
  asChild = false,
}: CollapsibleTriggerProps) {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error('CollapsibleTrigger must be used within Collapsible');
  }

  const { open, onOpenChange } = context;

  const handlePress = useCallback(() => {
    onOpenChange(!open);
  }, [open, onOpenChange]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: handlePress,
      accessibilityRole: 'button',
      accessibilityState: { expanded: open },
    });
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.trigger,
        pressed && styles.triggerPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
    >
      {children}
    </Pressable>
  );
}

// CollapsibleContent
export function CollapsibleContent({ children, style }: CollapsibleContentProps) {
  const context = useContext(CollapsibleContext);

  if (!context) {
    throw new Error('CollapsibleContent must be used within Collapsible');
  }

  const { open, isGlass } = context;
  const [contentHeight, setContentHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(open ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(open ? 1 : 0)).current;

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (height > 0) {
      setContentHeight(height);
    }
  }, []);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: open ? 1 : 0,
        duration: animations.duration.normal,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: open ? 1 : 0,
        duration: animations.duration.normal,
        useNativeDriver: false,
      }),
    ]).start();
  }, [open, heightAnim, opacityAnim]);

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight || 1000],
  });

  // Glass mode rendering
  if (isGlass) {
    return (
      <Animated.View
        style={[
          styles.contentContainer,
          {
            height: contentHeight ? animatedHeight : 'auto',
            opacity: opacityAnim,
          },
        ]}
      >
        <View onLayout={onLayout}>
          <GlassSurface
            intensity={12}
            opacity={0.5}
            borderRadius={radius.md}
            shadow="sm"
            bordered
            style={[styles.glassContent, style as ViewStyle]}
          >
            {children}
          </GlassSurface>
        </View>
      </Animated.View>
    );
  }

  // Default non-glass rendering
  return (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          height: contentHeight ? animatedHeight : 'auto',
          opacity: opacityAnim,
        },
      ]}
    >
      <View onLayout={onLayout} style={[styles.content, style]}>
        {children}
      </View>
    </Animated.View>
  );
}

// Main Collapsible Component
export function Collapsible({
  open,
  onOpenChange,
  defaultOpen = false,
  children,
  style,
}: CollapsibleProps) {
  const themeContext = useThemeOptional();
  const isGlass = themeContext?.isGlass ?? false;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <CollapsibleContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange, isGlass }}>
      <View style={[styles.collapsible, style]}>
        {children}
      </View>
    </CollapsibleContext.Provider>
  );
}

const styles = StyleSheet.create({
  collapsible: {},
  trigger: {
    backgroundColor: 'transparent',
    // Ensure minimum touch target on native platforms
    minHeight: isNative ? TOUCH_TARGET : undefined,
    justifyContent: 'center',
  },
  triggerPressed: {
    opacity: 0.7,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  content: {},
  glassContent: {
    padding: spacing[3],
    marginTop: spacing[2],
  },
});
