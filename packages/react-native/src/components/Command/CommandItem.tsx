import React, { useEffect } from 'react';
import { Pressable, Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useCommand } from './CommandContext';

export interface CommandItemProps {
  /** Unique value for the item */
  value: string;
  /** Item content */
  children: React.ReactNode;
  /** Callback when item is selected */
  onSelect?: () => void;
  /** Disable the item */
  disabled?: boolean;
  /** Additional keywords for search matching */
  keywords?: string[];
  /** Icon to display before the text */
  icon?: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function CommandItem({
  value,
  children,
  onSelect,
  disabled = false,
  keywords,
  icon,
  style,
  textStyle,
}: CommandItemProps) {
  const {
    search,
    selectedValue,
    setSelectedValue,
    registerItem,
    unregisterItem,
    filter,
    onSelect: contextOnSelect,
  } = useCommand();

  // Register item on mount
  useEffect(() => {
    registerItem({ value, keywords, disabled });
    return () => unregisterItem(value);
  }, [value, keywords, disabled, registerItem, unregisterItem]);

  // Check if item matches search
  const isVisible = filter ? filter(value, search, keywords) : true;
  const isSelected = selectedValue === value;

  if (!isVisible) {
    return null;
  }

  const handlePress = () => {
    if (disabled) return;
    setSelectedValue(value);
    onSelect?.();
    contextOnSelect?.(value);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        isSelected && styles.selected,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.text,
          isSelected && styles.textSelected,
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    marginHorizontal: spacing[2],
    borderRadius: radius.md,
  },
  selected: {
    backgroundColor: colors.bg.surface,
  },
  pressed: {
    backgroundColor: colors.bg.surface,
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: spacing[3],
  },
  text: {
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
  textSelected: {
    color: colors.text.primary,
  },
  textDisabled: {
    color: colors.text.muted,
  },
});
