import React from 'react';
import {
  View,
  Text,
  Pressable,
  ViewProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { TOUCH_TARGET, getHitSlop } from '../../utils/platform';

export type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<ViewProps, 'style'> {
  /** Alert title */
  title?: string;
  /** Alert description */
  description?: string;
  /** Visual style variant */
  variant?: AlertVariant;
  /** Custom icon element */
  icon?: React.ReactNode;
  /** Show close button */
  closable?: boolean;
  /** Dismiss callback */
  onDismiss?: () => void;
  /** @deprecated Use onDismiss instead */
  onClose?: () => void;
  /** Alert content */
  children?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface AlertTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface AlertDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

const variantStyles: Record<
  AlertVariant,
  { container: ViewStyle; icon: string; title: TextStyle }
> = {
  default: {
    container: {
      backgroundColor: colors.bg.elevated,
      borderColor: colors.border.default,
    },
    icon: colors.text.primary,
    title: { color: colors.text.primary },
  },
  info: {
    container: {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: colors.accent.blue.DEFAULT,
    },
    icon: colors.accent.blue.DEFAULT,
    title: { color: colors.accent.blue.light },
  },
  success: {
    container: {
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderColor: colors.accent.green.DEFAULT,
    },
    icon: colors.accent.green.DEFAULT,
    title: { color: colors.accent.green.light },
  },
  warning: {
    container: {
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: colors.accent.amber.DEFAULT,
    },
    icon: colors.accent.amber.DEFAULT,
    title: { color: colors.accent.amber.light },
  },
  error: {
    container: {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: colors.accent.red.DEFAULT,
    },
    icon: colors.accent.red.DEFAULT,
    title: { color: colors.accent.red.light },
  },
};

// Close button dimensions
const CLOSE_ICON_SIZE = 16;
const CLOSE_BUTTON_SIZE = TOUCH_TARGET;

function CloseIcon() {
  return (
    <View style={iconStyles.closeIcon}>
      <View style={[iconStyles.closeLine, iconStyles.closeLine1]} />
      <View style={[iconStyles.closeLine, iconStyles.closeLine2]} />
    </View>
  );
}

const iconStyles = StyleSheet.create({
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

export function Alert({
  title,
  description,
  variant = 'default',
  icon,
  closable = false,
  onDismiss,
  onClose,
  children,
  style,
  ...props
}: AlertProps) {
  // Deprecation warning for onClose
  if (__DEV__ && onClose) {
    console.warn('Alert: onClose is deprecated. Use onDismiss instead.');
  }

  // Support both onDismiss and deprecated onClose
  const handleDismiss = onDismiss || onClose;
  const variantStyle = variantStyles[variant];

  return (
    <View
      style={[styles.container, variantStyle.container, style]}
      accessibilityRole="alert"
      {...props}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.content}>
        {title && <AlertTitle style={variantStyle.title}>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
        {children}
      </View>
      {closable && (
        <Pressable
          onPress={handleDismiss}
          style={styles.closeButton}
          accessibilityLabel="Dismiss alert"
          accessibilityRole="button"
          hitSlop={getHitSlop(CLOSE_BUTTON_SIZE)}
        >
          <CloseIcon />
        </Pressable>
      )}
    </View>
  );
}

export function AlertTitle({ children, style }: AlertTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function AlertDescription({ children, style }: AlertDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing[4],
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing[3],
  },
  iconContainer: {
    marginTop: 2,
  },
  content: {
    flex: 1,
    gap: spacing[1],
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -spacing[2],
    marginRight: -spacing[2],
  },
});
