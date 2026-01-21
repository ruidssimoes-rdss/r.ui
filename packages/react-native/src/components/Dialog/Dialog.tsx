import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  cloneElement,
  isValidElement,
  Children,
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line } from 'react-native-svg';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows } from '../../tokens/shadows';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TOUCH_TARGET, getHitSlop, isNative } from '../../utils/platform';

// Built-in X icon for close button
function CloseIcon({ size = 20, color = colors.text.secondary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
}

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog');
  }
  return context;
}

export interface DialogProps {
  /** Dialog content */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Block interactions outside the dialog */
  modal?: boolean;
}

export interface DialogTriggerProps {
  /** Trigger element */
  children: React.ReactElement;
  /** Additional styles */
  style?: ViewStyle;
  /** Render as child element (polymorphic rendering) */
  asChild?: boolean;
}

export interface DialogContentProps {
  /** Content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Show a built-in close button (X) in the top-right corner */
  showCloseButton?: boolean;
  /** Display as fullscreen dialog (uses SafeArea on native) */
  fullscreen?: boolean;
}

export interface DialogHeaderProps {
  /** Header content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DialogFooterProps {
  /** Footer content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DialogTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface DialogDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface DialogCloseProps {
  /** Close button content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Render as child element (polymorphic rendering) */
  asChild?: boolean;
}

export function Dialog({
  children,
  open: controlledOpen,
  onOpenChange,
  modal = true,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, style, asChild = false }: DialogTriggerProps) {
  const { onOpenChange } = useDialogContext();

  if (asChild) {
    const child = Children.only(children);
    if (isValidElement(child)) {
      const childProps = child.props as Record<string, unknown>;
      return cloneElement(child, {
        ...childProps,
        onPress: () => {
          onOpenChange(true);
          if (typeof childProps.onPress === 'function') {
            childProps.onPress();
          }
        },
        style: style ? [style, childProps.style] : childProps.style,
        accessibilityRole: 'button',
      } as Record<string, unknown>);
    }
  }

  return (
    <Pressable
      onPress={() => onOpenChange(true)}
      style={style}
      accessibilityRole="button"
    >
      {children}
    </Pressable>
  );
}

// Close button size meets platform touch targets (iOS: 44pt, Android: 48dp)
const CLOSE_BUTTON_SIZE = TOUCH_TARGET;
const CLOSE_ICON_SIZE = 20;

export function DialogContent({ children, style, showCloseButton = false, fullscreen = false }: DialogContentProps) {
  const { open, onOpenChange } = useDialogContext();
  const reducedMotion = useReducedMotion();
  const scaleAnim = useRef(new Animated.Value(reducedMotion ? 1 : 0.9)).current;
  const opacityAnim = useRef(new Animated.Value(reducedMotion ? 1 : 0)).current;

  useEffect(() => {
    if (open) {
      if (reducedMotion) {
        // Instant appearance for reduced motion
        scaleAnim.setValue(1);
        opacityAnim.setValue(1);
      } else {
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 65,
            friction: 8,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      }
    } else {
      scaleAnim.setValue(reducedMotion ? 1 : 0.9);
      opacityAnim.setValue(0);
    }
  }, [open, reducedMotion]);

  // Wrap content with SafeAreaView for fullscreen dialogs on native
  const contentWrapper = (content: React.ReactNode) => {
    if (fullscreen && isNative) {
      return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          {content}
        </SafeAreaView>
      );
    }
    return content;
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable
        style={styles.backdrop}
        onPress={() => onOpenChange(false)}
        accessibilityRole="button"
        accessibilityLabel="Close dialog"
      >
        <Animated.View
          style={[
            styles.overlay,
            { opacity: opacityAnim },
          ]}
        />
      </Pressable>
      <View style={[styles.centeredView, fullscreen && styles.fullscreenView]} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.content,
            fullscreen && styles.fullscreenContent,
            {
              transform: fullscreen ? [] : [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
            style,
          ]}
        >
          {contentWrapper(
            <>
              {showCloseButton && (
                <Pressable
                  onPress={() => onOpenChange(false)}
                  style={({ pressed }) => [
                    styles.closeButton,
                    pressed && styles.closeButtonPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Close dialog"
                  hitSlop={getHitSlop(CLOSE_BUTTON_SIZE)}
                >
                  <CloseIcon size={CLOSE_ICON_SIZE} color={colors.text.secondary} />
                </Pressable>
              )}
              {children}
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

export function DialogHeader({ children, style }: DialogHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function DialogFooter({ children, style }: DialogFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

export function DialogTitle({ children, style }: DialogTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function DialogDescription({ children, style }: DialogDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

export function DialogClose({ children, style, asChild = false }: DialogCloseProps) {
  const { onOpenChange } = useDialogContext();

  if (asChild) {
    const child = Children.only(children);
    if (isValidElement(child)) {
      const childProps = child.props as Record<string, unknown>;
      return cloneElement(child, {
        ...childProps,
        onPress: () => {
          onOpenChange(false);
          if (typeof childProps.onPress === 'function') {
            childProps.onPress();
          }
        },
        style: style ? [style, childProps.style] : childProps.style,
        accessibilityRole: 'button',
        accessibilityLabel: 'Close dialog',
      } as Record<string, unknown>);
    }
  }

  return (
    <Pressable
      onPress={() => onOpenChange(false)}
      style={style}
      accessibilityRole="button"
      accessibilityLabel="Close dialog"
    >
      {children}
    </Pressable>
  );
}

/**
 * Slot component for polymorphic rendering (asChild pattern)
 * Merges props and styles from parent onto the child element
 */
function Slot({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
} & Record<string, unknown>) {
  if (isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>;
    return cloneElement(children, {
      ...props,
      ...childProps,
      style: Array.isArray(style)
        ? [...style, childProps.style]
        : [style, childProps.style],
    } as Record<string, unknown>);
  }
  return null;
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg.overlay,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  fullscreenView: {
    padding: 0,
  },
  content: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.xl,
    padding: spacing[6],
    width: '100%',
    maxWidth: 400,
    ...shadows.xl,
  },
  fullscreenContent: {
    flex: 1,
    maxWidth: '100%',
    borderRadius: 0,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing[2],
    marginTop: spacing[6],
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  closeButton: {
    position: 'absolute',
    top: spacing[2],
    right: spacing[2],
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  closeButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
