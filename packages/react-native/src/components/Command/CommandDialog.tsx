import React, { useRef, useEffect } from 'react';
import {
  View,
  Modal,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows } from '../../tokens/shadows';
import { Command, CommandProps } from './Command';

export interface CommandDialogProps extends Omit<CommandProps, 'standalone' | 'style'> {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional content styles */
  contentStyle?: ViewStyle;
}

export function CommandDialog({
  open,
  onOpenChange,
  children,
  style,
  contentStyle,
  ...commandProps
}: CommandDialogProps) {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
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
    } else {
      scaleAnim.setValue(0.95);
      opacityAnim.setValue(0);
    }
  }, [open, scaleAnim, opacityAnim]);

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={[styles.container, style]}>
        {/* Backdrop */}
        <Pressable
          style={styles.backdrop}
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Close command dialog"
        >
          <Animated.View
            style={[styles.backdropOverlay, { opacity: opacityAnim }]}
          />
        </Pressable>

        {/* Content */}
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
            contentStyle,
          ]}
        >
          <Command {...commandProps} standalone={false} style={styles.command}>
            {children}
          </Command>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Platform.select({ ios: 100, android: 80, default: 100 }),
    paddingHorizontal: spacing[4],
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg.overlay,
    // Glassmorphism effect hint (backdrop-blur handled by overlay opacity)
  },
  content: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '70%',
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.default,
    overflow: 'hidden',
    ...shadows.xl,
  },
  command: {
    flex: 1,
  },
});
