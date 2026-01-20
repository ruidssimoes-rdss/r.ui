import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  /** Current value */
  value?: string;
  /** Change handler */
  onValueChange?: (value: string) => void;
  /** Available options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Disable the select */
  disabled?: boolean;
  /** Select label */
  label?: string;
  /** Error or helper text */
  helperText?: string;
  /** Show error state */
  error?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  disabled = false,
  label,
  helperText,
  error = false,
  style,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        style={[
          styles.trigger,
          error && styles.triggerError,
          disabled && styles.triggerDisabled,
        ]}
      >
        <Text
          style={[
            styles.triggerText,
            !selectedOption && styles.triggerPlaceholder,
            disabled && styles.triggerTextDisabled,
          ]}
          numberOfLines={1}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <ChevronIcon />
      </Pressable>
      {helperText && (
        <Text style={[styles.helperText, error && styles.helperTextError]}>
          {helperText}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close dropdown"
          style={styles.overlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  accessibilityRole="menuitem"
                  onPress={() => handleSelect(item.value)}
                  style={[
                    styles.option,
                    item.value === value && styles.optionSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && <CheckIcon />}
                </Pressable>
              )}
              style={styles.optionsList}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

function ChevronIcon() {
  return (
    <View style={styles.chevron}>
      <View style={styles.chevronLine1} />
      <View style={styles.chevronLine2} />
    </View>
  );
}

function CheckIcon() {
  return (
    <View style={styles.checkIcon}>
      <View style={styles.checkIconShort} />
      <View style={styles.checkIconLong} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  labelDisabled: {
    color: colors.text.muted,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.md,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    minHeight: 44,
  },
  triggerError: {
    borderColor: colors.accent.red.DEFAULT,
  },
  triggerDisabled: {
    backgroundColor: colors.bg.elevated,
    borderColor: colors.border.muted,
  },
  triggerText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    color: colors.text.primary,
    flex: 1,
  },
  triggerPlaceholder: {
    color: colors.text.muted,
  },
  triggerTextDisabled: {
    color: colors.text.muted,
  },
  helperText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  helperTextError: {
    color: colors.accent.red.DEFAULT,
  },
  chevron: {
    width: 10,
    height: 6,
    marginLeft: spacing[2],
    position: 'relative',
  },
  chevronLine1: {
    position: 'absolute',
    width: 7,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    left: 0,
    top: 2,
    transform: [{ rotate: '45deg' }],
  },
  chevronLine2: {
    position: 'absolute',
    width: 7,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    right: 0,
    top: 2,
    transform: [{ rotate: '-45deg' }],
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.bg.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  dropdown: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    width: '100%',
    maxWidth: 320,
    maxHeight: 300,
    overflow: 'hidden',
  },
  optionsList: {
    padding: spacing[2],
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.md,
  },
  optionSelected: {
    backgroundColor: colors.bg.surface,
  },
  optionText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    color: colors.text.primary,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.accent.blue.DEFAULT,
    fontWeight: fontWeights.medium,
  },
  checkIcon: {
    width: 12,
    height: 10,
    position: 'relative',
    marginLeft: spacing[2],
  },
  checkIconShort: {
    position: 'absolute',
    width: 2,
    height: 6,
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: 1,
    bottom: 0,
    left: 1,
    transform: [{ rotate: '-45deg' }],
  },
  checkIconLong: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: 1,
    bottom: 0,
    right: 2,
    transform: [{ rotate: '45deg' }],
  },
});
