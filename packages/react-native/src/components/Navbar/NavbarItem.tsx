import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { TOUCH_TARGET } from '../../utils/platform';

// ============================================================================
// Types
// ============================================================================

export interface NavbarItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Whether this item is active */
  active?: boolean;
  /** Called when pressed */
  onPress?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles (when children is string) */
  textStyle?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function NavbarItem({
  children,
  active = false,
  onPress,
  disabled = false,
  style,
  textStyle,
}: NavbarItemProps) {
  const isTextChild = typeof children === 'string';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.item,
        active && styles.itemActive,
        pressed && !disabled && styles.itemPressed,
        disabled && styles.itemDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: active, disabled }}
    >
      {isTextChild ? (
        <Text
          style={[
            styles.text,
            active && styles.textActive,
            disabled && styles.textDisabled,
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  item: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.md,
    minHeight: TOUCH_TARGET,
    justifyContent: 'center',
  },
  itemActive: {
    backgroundColor: colors.bg.elevated,
  },
  itemPressed: {
    backgroundColor: colors.bg.elevated,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
  },
  textActive: {
    color: colors.text.primary,
  },
  textDisabled: {
    color: colors.text.muted,
  },
});
