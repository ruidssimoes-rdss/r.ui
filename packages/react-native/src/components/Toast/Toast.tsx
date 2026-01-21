import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  PanResponder,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows } from '../../tokens/shadows';
import { animations } from '../../tokens/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TOUCH_TARGET, getHitSlop, isNative, platformSpacing } from '../../utils/platform';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error';

export interface ToastAction {
  /** Action button label */
  label: string;
  /** Action callback */
  onPress: () => void;
}

export interface ToastOptions {
  /** Toast title */
  title: string;
  /** Toast description */
  description?: string;
  /** Visual style variant */
  variant?: ToastVariant;
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration?: number;
  /** Action button */
  action?: ToastAction;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

const variantStyles: Record<ToastVariant, { container: ViewStyle; title: TextStyle }> = {
  default: {
    container: {
      backgroundColor: colors.bg.elevated,
      borderColor: colors.border.default,
    },
    title: { color: colors.text.primary },
  },
  success: {
    container: {
      backgroundColor: colors.bg.elevated,
      borderColor: colors.accent.green.DEFAULT,
    },
    title: { color: colors.accent.green.light },
  },
  warning: {
    container: {
      backgroundColor: colors.bg.elevated,
      borderColor: colors.accent.amber.DEFAULT,
    },
    title: { color: colors.accent.amber.light },
  },
  error: {
    container: {
      backgroundColor: colors.bg.elevated,
      borderColor: colors.accent.red.DEFAULT,
    },
    title: { color: colors.accent.red.light },
  },
};

// Close button visual/touch dimensions
const CLOSE_ICON_SIZE = 16;
const CLOSE_BUTTON_SIZE = TOUCH_TARGET;
// Swipe-to-dismiss threshold
const SWIPE_THRESHOLD = 50;

interface ToastItemComponentProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

function ToastItemComponent({ item, onDismiss }: ToastItemComponentProps) {
  const reducedMotion = useReducedMotion();
  const translateY = useRef(new Animated.Value(reducedMotion ? 0 : -100)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(reducedMotion ? 1 : 0)).current;
  const variantStyle = variantStyles[item.variant || 'default'];

  const dismissWithAnimation = useCallback(() => {
    // Call the user's onDismiss callback if provided
    item.onDismiss?.();

    if (reducedMotion) {
      // Instant dismissal for reduced motion
      onDismiss(item.id);
      return;
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: animations.duration.fast,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: animations.duration.fast,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(item.id);
    });
  }, [item.id, item.onDismiss, onDismiss, reducedMotion, translateY, opacity]);

  // Swipe-to-dismiss gesture handler
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, { dx }) => Math.abs(dx) > 10,
      onPanResponderMove: (_, { dx }) => {
        translateX.setValue(dx);
      },
      onPanResponderRelease: (_, { dx, vx }) => {
        // Dismiss if swiped far enough or fast enough
        if (Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(vx) > 0.5) {
          const direction = dx > 0 ? 1 : -1;
          Animated.timing(translateX, {
            toValue: direction * 400,
            duration: animations.duration.fast,
            useNativeDriver: true,
          }).start(() => {
            item.onDismiss?.();
            onDismiss(item.id);
          });
        } else {
          // Snap back
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 10,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (reducedMotion) {
      // Instant appearance for reduced motion
      translateY.setValue(0);
      opacity.setValue(1);
    } else {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          ...animations.spring.gentle,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: animations.duration.normal,
          useNativeDriver: true,
        }),
      ]).start();
    }

    if (item.duration !== 0) {
      const timeout = setTimeout(() => {
        dismissWithAnimation();
      }, item.duration || 4000);
      return () => clearTimeout(timeout);
    }
  }, [reducedMotion, dismissWithAnimation, item.duration]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.toast,
        variantStyle.container,
        { transform: [{ translateY }, { translateX }], opacity },
      ]}
    >
      <View style={styles.toastContent}>
        <Text style={[styles.toastTitle, variantStyle.title]}>{item.title}</Text>
        {item.description && (
          <Text style={styles.toastDescription}>{item.description}</Text>
        )}
      </View>
      {item.action && (
        <Pressable
          onPress={() => {
            item.action?.onPress();
            dismissWithAnimation();
          }}
          style={styles.actionButton}
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>{item.action.label}</Text>
        </Pressable>
      )}
      <Pressable
        onPress={dismissWithAnimation}
        style={styles.closeButton}
        hitSlop={getHitSlop(CLOSE_BUTTON_SIZE)}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
      >
        <View style={styles.closeIcon}>
          <View style={[styles.closeLine, styles.closeLine1]} />
          <View style={[styles.closeLine, styles.closeLine2]} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idCounter = useRef(0);
  const insets = useSafeAreaInsets();

  const toast = useCallback((options: ToastOptions): string => {
    const id = `toast-${++idCounter.current}`;
    setToasts((prev) => [...prev, { ...options, id }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Calculate SafeArea-aware top padding for native devices
  const safeAreaTop = isNative ? Math.max(insets.top, spacing[4]) : spacing[16];

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      <View style={[styles.container, { paddingTop: safeAreaTop }]} pointerEvents="box-none">
        {toasts.map((item) => (
          <ToastItemComponent key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing[4],
    alignItems: 'center',
    gap: spacing[2],
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 1,
    maxWidth: 400,
    width: '100%',
    ...shadows.lg,
    gap: spacing[3],
  },
  toastContent: {
    flex: 1,
    gap: spacing[1],
  },
  toastTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  toastDescription: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  actionButton: {
    paddingVertical: platformSpacing.buttonPaddingVertical,
    paddingHorizontal: spacing[3],
    minHeight: TOUCH_TARGET,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
  },
  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: CLOSE_ICON_SIZE,
    height: CLOSE_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeLine: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
  },
  closeLine1: {
    transform: [{ rotate: '45deg' }],
  },
  closeLine2: {
    transform: [{ rotate: '-45deg' }],
  },
});
