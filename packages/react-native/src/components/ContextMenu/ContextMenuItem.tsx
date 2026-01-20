import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { useContextMenu } from './ContextMenuContext';

export interface ContextMenuItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Selection callback */
  onSelect?: () => void;
  /** Disable the item */
  disabled?: boolean;
  /** Destructive styling */
  destructive?: boolean;
  /** Icon element */
  icon?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function ContextMenuItem({
  children,
  onSelect,
  disabled = false,
  destructive = false,
  icon,
  style,
  textStyle,
}: ContextMenuItemProps) {
  const { onOpenChange } = useContextMenu();

  const handlePress = () => {
    if (!disabled) {
      onSelect?.();
      onOpenChange(false);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
        disabled && styles.itemDisabled,
        style,
      ]}
      accessibilityRole="menuitem"
    >
      {icon && <View style={styles.itemIcon}>{icon}</View>}
      <Text
        style={[
          styles.itemText,
          destructive && styles.itemTextDestructive,
          disabled && styles.itemTextDisabled,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    gap: spacing[2],
  },
  itemPressed: {
    backgroundColor: colors.bg.surface,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  itemTextDestructive: {
    color: colors.accent.red.DEFAULT,
  },
  itemTextDisabled: {
    color: colors.text.muted,
  },
});
