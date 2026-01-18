import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { useContextMenu } from './ContextMenuContext';

export interface ContextMenuCheckboxItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Whether the item is checked */
  checked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Disable the item */
  disabled?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function ContextMenuCheckboxItem({
  children,
  checked = false,
  onCheckedChange,
  disabled = false,
  style,
  textStyle,
}: ContextMenuCheckboxItemProps) {
  const { onOpenChange } = useContextMenu();

  const handlePress = () => {
    if (!disabled) {
      onCheckedChange?.(!checked);
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
    >
      <View style={styles.checkboxContainer}>
        {checked && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
      <Text
        style={[
          styles.itemText,
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
  checkboxContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent.blue.DEFAULT,
  },
  itemText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  itemTextDisabled: {
    color: colors.text.muted,
  },
});
