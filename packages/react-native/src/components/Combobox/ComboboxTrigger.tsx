import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useCombobox } from './ComboboxContext';
import { TOUCH_TARGET } from '../../utils/platform';

export interface ComboboxTriggerProps {
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export function ComboboxTrigger({
  placeholder = 'Select...',
  style,
}: ComboboxTriggerProps) {
  const { open, setOpen, value, items, disabled, setTriggerLayout } =
    useCombobox();
  const triggerRef = useRef<View>(null);

  const selectedItem = items.find((item) => item.value === value);
  const displayText = selectedItem?.label || placeholder;
  const isPlaceholder = !selectedItem;

  const handlePress = () => {
    if (disabled) return;

    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
      setOpen(!open);
    });
  };

  return (
    <Pressable
      ref={triggerRef}
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        open && styles.containerOpen,
        pressed && !disabled && styles.containerPressed,
        disabled && styles.containerDisabled,
        style,
      ]}
      accessibilityRole="combobox"
      accessibilityState={{ expanded: open, disabled }}
      accessibilityLabel={displayText}
    >
      <Text
        style={[styles.text, isPlaceholder && styles.textPlaceholder]}
        numberOfLines={1}
      >
        {displayText}
      </Text>

      {/* Chevron */}
      <View style={[styles.chevron, open && styles.chevronOpen]}>
        <Text style={styles.chevronText}>▼</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.bg.surface,
    minHeight: TOUCH_TARGET,
  },
  containerOpen: {
    borderColor: colors.border.strong,
  },
  containerPressed: {
    backgroundColor: colors.bg.elevated,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  text: {
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
  textPlaceholder: {
    color: colors.text.muted,
  },
  chevron: {
    marginLeft: spacing[2],
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
  chevronText: {
    fontSize: 10,
    color: colors.text.muted,
  },
});
