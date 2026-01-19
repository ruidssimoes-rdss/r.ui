import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useDateRangePicker } from './DateRangePickerContext';
import { isSameDay } from './utils';

export interface DateRangePickerPresetsProps {
  /** Additional styles */
  style?: ViewStyle;
}

export function DateRangePickerPresets({ style }: DateRangePickerPresetsProps) {
  const {
    presets,
    value,
    onValueChange,
    setSelectionMode,
    setViewDate,
  } = useDateRangePicker();

  if (!presets || presets.length === 0) return null;

  const isPresetSelected = (presetStart: Date | null, presetEnd: Date | null) => {
    if (!value.start || !value.end || !presetStart || !presetEnd) return false;
    return isSameDay(value.start, presetStart) && isSameDay(value.end, presetEnd);
  };

  const handlePresetSelect = (presetStart: Date | null, presetEnd: Date | null) => {
    onValueChange({ start: presetStart, end: presetEnd });
    // Update view date to show the start of the range
    if (presetStart) {
      setViewDate(presetStart);
    }
    // Reset selection mode
    setSelectionMode('start');
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Presets</Text>
      <View style={styles.presetsGrid}>
        {presets.map((preset, index) => {
          const isSelected = isPresetSelected(preset.value.start, preset.value.end);

          return (
            <Pressable
              key={index}
              onPress={() => handlePresetSelect(preset.value.start, preset.value.end)}
              style={({ pressed }) => [
                styles.preset,
                isSelected && styles.presetSelected,
                pressed && !isSelected && styles.presetPressed,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.presetText,
                  isSelected && styles.presetTextSelected,
                ]}
              >
                {preset.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing[3],
    borderLeftWidth: 1,
    borderLeftColor: colors.border.muted,
    minWidth: 140,
  },
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.text.muted,
    marginBottom: spacing[2],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  presetsGrid: {
    flexDirection: 'column',
    gap: spacing[1],
  },
  preset: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.md,
  },
  presetSelected: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  presetPressed: {
    backgroundColor: colors.bg.surface,
  },
  presetText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
  presetTextSelected: {
    color: colors.white,
    fontWeight: fontWeights.medium,
  },
});
