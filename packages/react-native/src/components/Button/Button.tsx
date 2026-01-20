import React, { cloneElement, isValidElement, Children } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  PressableProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'outline'
  | 'link'
  | 'success';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /** Button content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable the button */
  disabled?: boolean;
  /** Render as child element (polymorphic rendering) */
  asChild?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle; iconSize: number }> = {
  sm: {
    container: { paddingVertical: spacing[2], paddingHorizontal: spacing[3] },
    text: { fontSize: 13 },
    iconSize: 16,
  },
  md: {
    container: { paddingVertical: spacing[3], paddingHorizontal: spacing[5] },
    text: { fontSize: 14 },
    iconSize: 18,
  },
  lg: {
    container: { paddingVertical: spacing[4], paddingHorizontal: spacing[6] },
    text: { fontSize: 16 },
    iconSize: 20,
  },
  'icon-sm': {
    container: { width: 32, height: 32, padding: 0 },
    text: { fontSize: 16 },
    iconSize: 16,
  },
  icon: {
    container: { width: 40, height: 40, padding: 0 },
    text: { fontSize: 20 },
    iconSize: 20,
  },
  'icon-lg': {
    container: { width: 48, height: 48, padding: 0 },
    text: { fontSize: 24 },
    iconSize: 24,
  },
};

const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle; pressedText?: TextStyle }> = {
  primary: {
    container: {
      backgroundColor: colors.text.primary,
    },
    text: {
      color: colors.text.inverse,
    },
  },
  secondary: {
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderWidth: 1,
      borderColor: colors.border.default,
    },
    text: {
      color: colors.text.primary,
    },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border.strong,
    },
    text: {
      color: colors.text.primary,
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
    },
    text: {
      color: colors.text.secondary,
    },
  },
  destructive: {
    container: {
      backgroundColor: colors.accent.red.DEFAULT,
    },
    text: {
      color: colors.text.primary,
    },
  },
  link: {
    container: {
      backgroundColor: 'transparent',
      paddingHorizontal: spacing[1],
      paddingVertical: 0,
    },
    text: {
      color: colors.accent.blue.DEFAULT,
    },
    pressedText: {
      textDecorationLine: 'underline',
    },
  },
  success: {
    container: {
      backgroundColor: colors.semantic.success,
    },
    text: {
      color: colors.text.primary,
    },
  },
};

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

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  asChild = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const isIconSize = size.startsWith('icon');

  // For link variant, override size padding
  const containerStyle =
    variant === 'link'
      ? { ...sizeStyle.container, ...variantStyle.container }
      : { ...variantStyle.container, ...sizeStyle.container };

  const getButtonStyle = (pressed: boolean): ViewStyle[] => [
    styles.base,
    containerStyle,
    pressed && styles.pressed,
    pressed && variant === 'link' && styles.linkPressed,
    isDisabled && styles.disabled,
    style,
  ].filter(Boolean) as ViewStyle[];

  const getTextStyle = (pressed: boolean): TextStyle[] => [
    styles.text,
    sizeStyle.text,
    variantStyle.text,
    pressed && variantStyle.pressedText,
    textStyle,
  ].filter(Boolean) as TextStyle[];

  const spinnerColor =
    variant === 'primary' || variant === 'success' || variant === 'destructive'
      ? colors.text.inverse
      : variant === 'link'
      ? colors.accent.blue.DEFAULT
      : colors.text.primary;

  const renderContent = (pressed: boolean) => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={spinnerColor}
        />
      );
    }

    // For icon sizes, render children directly (expecting icon elements)
    if (isIconSize) {
      return children;
    }

    // For text content, wrap in Text component
    if (typeof children === 'string' || typeof children === 'number') {
      return (
        <Text style={getTextStyle(pressed)}>
          {children}
        </Text>
      );
    }

    // For other React elements, pass through (allows icons + text composition)
    return children;
  };

  if (asChild) {
    const child = Children.only(children);
    return (
      <Slot
        style={getButtonStyle(false)}
        disabled={isDisabled}
        {...props}
      >
        {child}
      </Slot>
    );
  }

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => getButtonStyle(pressed)}
      {...props}
    >
      {({ pressed }) => renderContent(pressed)}
    </Pressable>
  );
}

/**
 * ButtonGroup - Groups multiple buttons together
 */
export interface ButtonGroupProps {
  /** Button elements to group */
  children: React.ReactNode;
  /** Connect buttons with shared borders (removes inner border radius and collapses borders) */
  attached?: boolean;
  /** Stack buttons vertically instead of horizontally */
  vertical?: boolean;
  /** Apply size to all child buttons */
  size?: ButtonSize;
  /** Additional styles */
  style?: ViewStyle;
}

export function ButtonGroup({
  children,
  attached = false,
  vertical = false,
  size,
  style,
}: ButtonGroupProps) {
  const childArray = Children.toArray(children);
  const count = childArray.length;

  const processedChildren = childArray.map((child, index) => {
    if (!isValidElement(child)) return child;

    const isFirst = index === 0;
    const isLast = index === count - 1;
    const childProps = child.props as ButtonProps;

    // Calculate border radius overrides for attached mode
    let attachedStyle: ViewStyle = {};
    if (attached) {
      if (vertical) {
        // Vertical layout: remove top/bottom radius for middle items
        attachedStyle = {
          borderTopLeftRadius: isFirst ? radius.md : 0,
          borderTopRightRadius: isFirst ? radius.md : 0,
          borderBottomLeftRadius: isLast ? radius.md : 0,
          borderBottomRightRadius: isLast ? radius.md : 0,
          // Collapse borders
          marginTop: isFirst ? 0 : -1,
        };
      } else {
        // Horizontal layout: remove left/right radius for middle items
        attachedStyle = {
          borderTopLeftRadius: isFirst ? radius.md : 0,
          borderBottomLeftRadius: isFirst ? radius.md : 0,
          borderTopRightRadius: isLast ? radius.md : 0,
          borderBottomRightRadius: isLast ? radius.md : 0,
          // Collapse borders
          marginLeft: isFirst ? 0 : -1,
        };
      }
    }

    return cloneElement(child, {
      ...childProps,
      size: size ?? childProps.size,
      style: {
        ...childProps.style,
        ...attachedStyle,
      },
    } as ButtonProps);
  });

  return (
    <View
      style={[
        styles.buttonGroup,
        vertical && styles.buttonGroupVertical,
        !attached && (vertical ? styles.buttonGroupGapVertical : styles.buttonGroupGap),
        style,
      ]}
    >
      {processedChildren}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    gap: spacing[2],
  },
  text: {
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  linkPressed: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  disabled: {
    opacity: 0.5,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGroupVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  buttonGroupGap: {
    gap: spacing[2],
  },
  buttonGroupGapVertical: {
    gap: spacing[2],
  },
});
