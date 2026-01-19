import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useNavbar } from './Navbar';

// ============================================================================
// Types
// ============================================================================

export interface NavbarMenuItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Whether this item is active */
  active?: boolean;
  /** Called when pressed */
  onPress?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Close menu when pressed */
  closeOnPress?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function NavbarMenuItem({
  children,
  active = false,
  onPress,
  disabled = false,
  closeOnPress = true,
  style,
  textStyle,
}: NavbarMenuItemProps) {
  const { setMenuOpen } = useNavbar();
  const isTextChild = typeof children === 'string';

  const handlePress = () => {
    if (closeOnPress) {
      setMenuOpen(false);
    }
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
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
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.md,
    marginVertical: spacing[0.5] || 2,
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
    fontSize: fontSizes.base,
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
