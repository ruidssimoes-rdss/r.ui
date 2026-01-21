import React, { useEffect } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useCombobox } from './ComboboxContext';
import { TOUCH_TARGET } from '../../utils/platform';

export interface ComboboxItemProps {
  /** Unique value for the item */
  value: string;
  /** Item content (usually text) */
  children: React.ReactNode;
  /** Disable the item */
  disabled?: boolean;
  /** Additional keywords for search matching */
  keywords?: string[];
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function ComboboxItem({
  value: itemValue,
  children,
  disabled = false,
  keywords,
  style,
  textStyle,
}: ComboboxItemProps) {
  const {
    value,
    onValueChange,
    search,
    registerItem,
    unregisterItem,
    items,
    filter,
    highlightedIndex,
  } = useCombobox();

  const label = typeof children === 'string' ? children : itemValue;

  // Register item on mount
  useEffect(() => {
    registerItem({ value: itemValue, label, keywords, disabled });
    return () => unregisterItem(itemValue);
  }, [itemValue, label, keywords, disabled, registerItem, unregisterItem]);

  // Check if item matches search
  const isVisible = filter ? filter(label, search, keywords) : true;
  if (!isVisible) return null;

  const isSelected = value === itemValue;

  // Calculate highlighted state
  const filteredItems = items.filter(
    (item) =>
      !item.disabled && (filter ? filter(item.label, search, item.keywords) : true)
  );
  const itemIndex = filteredItems.findIndex((item) => item.value === itemValue);
  const isHighlighted = itemIndex === highlightedIndex;

  const handlePress = () => {
    if (disabled) return;
    onValueChange(itemValue);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        isHighlighted && styles.highlighted,
        isSelected && styles.selected,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      accessibilityRole="option"
      accessibilityState={{ selected: isSelected, disabled }}
    >
      {/* Checkmark */}
      <View style={styles.checkmark}>
        {isSelected && (
          <Text style={[styles.checkmarkText, isSelected && styles.checkmarkSelected]}>
            ✓
          </Text>
        )}
      </View>

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
    marginHorizontal: spacing[1],
    borderRadius: radius.md,
    minHeight: TOUCH_TARGET,
  },
  highlighted: {
    backgroundColor: colors.bg.surface,
  },
  selected: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  pressed: {
    backgroundColor: colors.bg.surface,
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  checkmark: {
    width: 20,
    marginRight: spacing[2],
  },
  checkmarkText: {
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
  checkmarkSelected: {
    color: colors.white,
  },
  text: {
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
  textSelected: {
    color: colors.white,
    fontWeight: '500',
  },
  textDisabled: {
    color: colors.text.muted,
  },
});
