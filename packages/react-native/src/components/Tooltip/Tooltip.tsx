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
  Platform,
  LayoutChangeEvent,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { GlassSurface } from '../GlassSurface';
import { useTheme, ThemeContextValue } from '../../themes/ThemeProvider';
import { Arrow } from '../_internal/Arrow';
import { TOUCH_TARGET, getHitSlopRect, isNative } from '../../utils/platform';

// Safe hook that returns null if ThemeProvider is not present
function useThemeOptional(): ThemeContextValue | null {
  try {
    return useTheme();
  } catch {
    return null;
  }
}

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

interface TooltipContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: (layout: { x: number; y: number; width: number; height: number }) => void;
  side: TooltipSide;
  content: string;
  showArrow: boolean;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip components must be used within a Tooltip');
  }
  return context;
}

export interface TooltipProps {
  /** Tooltip content */
  children: React.ReactNode;
  /** Tooltip text content */
  content: string;
  /** Side to show tooltip */
  side?: TooltipSide;
  /** Delay before showing (ms) */
  delay?: number;
  /** Show arrow indicator */
  showArrow?: boolean;
}

export interface TooltipTriggerProps {
  /** Trigger element */
  children: React.ReactElement;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TooltipContentProps {
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function Tooltip({
  children,
  content,
  side = 'top',
  delay = 300,
  showArrow = false,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (newOpen) {
      timeoutRef.current = setTimeout(() => {
        setOpen(true);
      }, delay);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <TooltipContext.Provider
      value={{ open, onOpenChange: handleOpenChange, triggerLayout, setTriggerLayout, side, content, showArrow }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children, style }: TooltipTriggerProps) {
  const { onOpenChange, setTriggerLayout } = useTooltipContext();
  const triggerRef = useRef<View>(null);
  const [triggerSize, setTriggerSize] = useState({ width: 0, height: 0 });

  const measureAndOpen = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      onOpenChange(true);
    });
  };

  // On mobile, use tap-to-show (more reliable than long press for info icons)
  // On web, use hover
  const handlePress = () => {
    if (isNative) {
      measureAndOpen();
    }
  };

  const handlePressOut = () => {
    if (isNative) {
      onOpenChange(false);
    }
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setTriggerSize({ width, height });
  };

  // For web hover support
  const webProps = Platform.select({
    web: {
      onMouseEnter: measureAndOpen,
      onMouseLeave: () => onOpenChange(false),
    },
    default: {},
  });

  return (
    <Pressable
      ref={triggerRef}
      onPress={handlePress}
      onPressOut={handlePressOut}
      onLayout={handleLayout}
      style={[styles.trigger, style]}
      accessibilityRole="button"
      accessibilityHint="Tap to show tooltip"
      hitSlop={getHitSlopRect(triggerSize.width, triggerSize.height)}
      {...webProps}
    >
      {children}
    </Pressable>
  );
}

// Map tooltip side to arrow side (arrow points opposite direction)
const oppositeSide: Record<TooltipSide, TooltipSide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export function TooltipContent({ style, textStyle }: TooltipContentProps) {
  const { open, onOpenChange, triggerLayout, side, content, showArrow } = useTooltipContext();
  const themeContext = useThemeOptional();
  const isGlass = themeContext?.isGlass ?? false;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (open) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      opacityAnim.setValue(0);
    }
  }, [open]);

  if (!triggerLayout || !open) return null;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const arrowSize = 6;
  const gap = showArrow ? spacing[1] : spacing[2];

  let top = 0;
  let left = 0;

  // Calculate position based on side
  switch (side) {
    case 'top':
      top = triggerLayout.y - contentSize.height - gap - (showArrow ? arrowSize : 0);
      left = triggerLayout.x + triggerLayout.width / 2 - contentSize.width / 2;
      break;
    case 'bottom':
      top = triggerLayout.y + triggerLayout.height + gap + (showArrow ? arrowSize : 0);
      left = triggerLayout.x + triggerLayout.width / 2 - contentSize.width / 2;
      break;
    case 'left':
      left = triggerLayout.x - contentSize.width - gap - (showArrow ? arrowSize : 0);
      top = triggerLayout.y + triggerLayout.height / 2 - contentSize.height / 2;
      break;
    case 'right':
      left = triggerLayout.x + triggerLayout.width + gap + (showArrow ? arrowSize : 0);
      top = triggerLayout.y + triggerLayout.height / 2 - contentSize.height / 2;
      break;
  }

  // Keep within screen bounds
  left = Math.max(spacing[2], Math.min(left, screenWidth - contentSize.width - spacing[2]));
  top = Math.max(spacing[2], Math.min(top, screenHeight - contentSize.height - spacing[2]));

  // Calculate arrow position
  const arrowStyle: ViewStyle = {};
  if (side === 'top' || side === 'bottom') {
    arrowStyle.position = 'absolute';
    arrowStyle.left = contentSize.width / 2 - arrowSize;
    if (side === 'top') {
      arrowStyle.bottom = -arrowSize;
    } else {
      arrowStyle.top = -arrowSize;
    }
  } else {
    arrowStyle.position = 'absolute';
    arrowStyle.top = contentSize.height / 2 - arrowSize;
    if (side === 'left') {
      arrowStyle.right = -arrowSize;
    } else {
      arrowStyle.left = -arrowSize;
    }
  }

  // Glass mode arrow color (darker for visibility on translucent surface)
  const arrowColor = isGlass ? 'rgba(255, 255, 255, 0.85)' : colors.text.primary;

  // Glass mode rendering
  if (isGlass) {
    return (
      <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
        <View style={styles.backdrop} pointerEvents="none" />
        <Animated.View
          onLayout={(e) => {
            const { width, height } = e.nativeEvent.layout;
            setContentSize({ width, height });
          }}
          style={{
            position: 'absolute',
            top,
            left,
            opacity: opacityAnim,
          }}
        >
          <GlassSurface
            intensity={12}
            borderRadius={radius.sm}
            shadow="sm"
            bordered
            style={[styles.glassContent, style as ViewStyle]}
          >
            <Text style={[styles.glassText, textStyle]}>{content}</Text>
            {showArrow && (
              <Arrow
                side={oppositeSide[side]}
                color={arrowColor}
                size={arrowSize}
                style={arrowStyle}
              />
            )}
          </GlassSurface>
        </Animated.View>
      </Modal>
    );
  }

  // Default non-glass rendering
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={() => onOpenChange(false)}>
      <View style={styles.backdrop} pointerEvents="none" />
      <Animated.View
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setContentSize({ width, height });
        }}
        style={[
          styles.content,
          {
            position: 'absolute',
            top,
            left,
            opacity: opacityAnim,
          },
          style,
        ]}
      >
        <Text style={[styles.text, textStyle]}>{content}</Text>
        {showArrow && (
          <Arrow
            side={oppositeSide[side]}
            color={arrowColor}
            size={arrowSize}
            style={arrowStyle}
          />
        )}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  trigger: {
    minWidth: TOUCH_TARGET,
    minHeight: TOUCH_TARGET,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    backgroundColor: colors.text.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    maxWidth: 200,
  },
  text: {
    fontSize: 12,
    color: colors.text.inverse,
    textAlign: 'center',
  },
  glassContent: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    maxWidth: 200,
  },
  glassText: {
    fontSize: 12,
    color: colors.text.primary,
    textAlign: 'center',
  },
});
