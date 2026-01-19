import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useTimePicker } from './TimePickerContext';
import { formatTime } from './utils';

export interface TimePickerTriggerProps {
  /** Override placeholder text */
  placeholder?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export function TimePickerTrigger({
  placeholder: propPlaceholder,
  style,
}: TimePickerTriggerProps) {
  const {
    open,
    setOpen,
    value,
    disabled,
    placeholder: contextPlaceholder,
    format,
    use24Hour,
    setTriggerLayout,
  } = useTimePicker();
  const triggerRef = useRef<View>(null);

  const placeholder = propPlaceholder || contextPlaceholder;
  const displayText = value ? formatTime(value, format, use24Hour) : placeholder;
  const isPlaceholder = !value;

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
      accessibilityRole="button"
      accessibilityState={{ expanded: open, disabled }}
      accessibilityLabel={displayText}
      accessibilityHint="Opens time picker"
    >
      {/* Clock Icon */}
      <Text style={styles.icon}>🕐</Text>

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
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.bg.surface,
    minHeight: 48,
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
  icon: {
    fontSize: fontSizes.base,
    marginRight: spacing[2],
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
