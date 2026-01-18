import React from 'react';
import { Text, Pressable, Linking, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export type LinkVariant = 'default' | 'muted' | 'destructive';
export type LinkUnderline = 'always' | 'hover' | 'none';

export interface LinkProps {
  /** Link destination URL */
  href?: string;
  /** Whether this is an external link (opens in browser) */
  external?: boolean;
  /** Underline behavior */
  underline?: LinkUnderline;
  /** Visual variant */
  variant?: LinkVariant;
  /** Link content */
  children: React.ReactNode;
  /** Custom press handler (overrides href navigation) */
  onPress?: () => void;
  /** Disable the link */
  disabled?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function Link({
  href,
  external = false,
  underline = 'always',
  variant = 'default',
  children,
  onPress,
  disabled = false,
  style,
  textStyle,
}: LinkProps) {
  const handlePress = async () => {
    if (disabled) return;

    if (onPress) {
      onPress();
      return;
    }

    if (href) {
      if (external) {
        const canOpen = await Linking.canOpenURL(href);
        if (canOpen) {
          await Linking.openURL(href);
        }
      } else {
        await Linking.openURL(href);
      }
    }
  };

  const variantStyles: Record<LinkVariant, TextStyle> = {
    default: {
      color: colors.accent.blue.DEFAULT,
    },
    muted: {
      color: colors.text.secondary,
    },
    destructive: {
      color: colors.semantic.error,
    },
  };

  const getUnderlineStyle = (pressed: boolean): TextStyle => {
    switch (underline) {
      case 'always':
        return { textDecorationLine: 'underline' };
      case 'hover':
        return pressed ? { textDecorationLine: 'underline' } : {};
      case 'none':
        return {};
      default:
        return {};
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [pressed && !disabled && styles.pressed, style]}
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      accessibilityHint={external ? 'Opens in browser' : undefined}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.text,
            variantStyles[variant],
            getUnderlineStyle(pressed),
            disabled && styles.textDisabled,
            textStyle,
          ]}
        >
          {children}
          {external && <Text style={styles.externalIndicator}> ↗</Text>}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
  },
  textDisabled: {
    color: colors.text.muted,
    textDecorationLine: 'none',
  },
  externalIndicator: {
    fontSize: fontSizes.xs,
  },
});
