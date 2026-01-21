import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { useActionSheet } from './ActionSheetContext';
import { TOUCH_TARGET } from '../../utils/platform';

export interface ActionSheetItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Disable the item */
  disabled?: boolean;
  /** Destructive styling (red) */
  destructive?: boolean;
  /** Icon element */
  icon?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function ActionSheetItem({
  children,
  onPress,
  disabled = false,
  destructive = false,
  icon,
  style,
  textStyle,
}: ActionSheetItemProps) {
  const { onOpenChange } = useActionSheet();

  const handlePress = () => {
    if (!disabled) {
      onPress?.();
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
      accessibilityRole="button"
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.text,
          destructive && styles.textDestructive,
          disabled && styles.textDisabled,
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
    justifyContent: 'center',
    minHeight: TOUCH_TARGET, // Platform-aware: 44pt iOS, 48dp Android, 36px Web
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  itemPressed: {
    backgroundColor: colors.bg.surface,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  icon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
  },
  text: {
    fontSize: 18,
    color: colors.accent.blue.DEFAULT,
    textAlign: 'center',
  },
  textDestructive: {
    color: colors.accent.red.DEFAULT,
  },
  textDisabled: {
    color: colors.text.muted,
  },
});
