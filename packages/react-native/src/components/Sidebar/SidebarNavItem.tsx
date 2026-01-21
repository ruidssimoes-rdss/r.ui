import React from 'react';
import { Text, Pressable, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useSidebar } from './SidebarContext';
import { TOUCH_TARGET, isNative } from '../../utils/platform';

// ============================================================================
// Types
// ============================================================================

export interface SidebarNavItemProps {
  /** Item label */
  children: React.ReactNode;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Whether this item is currently active */
  active?: boolean;
  /** Called when pressed */
  onPress?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function SidebarNavItem({
  children,
  icon,
  active = false,
  onPress,
  disabled = false,
  style,
  textStyle,
}: SidebarNavItemProps) {
  const { collapsed } = useSidebar();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.item,
        active && styles.itemActive,
        pressed && !disabled && styles.itemPressed,
        disabled && styles.itemDisabled,
        collapsed && styles.itemCollapsed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected: active, disabled }}
    >
      {icon && (
        <View style={styles.icon}>
          {icon}
        </View>
      )}
      {!collapsed && (
        <Text
          style={[
            styles.text,
            active && styles.textActive,
            disabled && styles.textDisabled,
            textStyle,
          ]}
          numberOfLines={1}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    borderRadius: radius.md,
    marginVertical: spacing[0.5] || 2,
    // Ensure minimum touch target on native platforms
    minHeight: isNative ? TOUCH_TARGET : undefined,
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
  itemCollapsed: {
    justifyContent: 'center',
    paddingHorizontal: spacing[2],
  },
  icon: {
    marginRight: spacing[3],
  },
  text: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
    flex: 1,
  },
  textActive: {
    color: colors.text.primary,
  },
  textDisabled: {
    color: colors.text.muted,
  },
});
