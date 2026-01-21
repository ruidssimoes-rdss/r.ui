import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useFileUpload } from './FileUploadContext';
import { TOUCH_TARGET } from '../../utils/platform';

// ============================================================================
// Types
// ============================================================================

export interface FileUploadTriggerProps {
  /** Button content */
  children?: React.ReactNode;
  /** Additional button styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function FileUploadTrigger({ children, style, textStyle }: FileUploadTriggerProps) {
  const { openPicker, disabled, multiple } = useFileUpload();

  return (
    <Pressable
      onPress={openPicker}
      disabled={disabled}
      style={({ pressed }) => [
        styles.trigger,
        pressed && styles.triggerPressed,
        disabled && styles.triggerDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={multiple ? 'Upload files' : 'Upload file'}
    >
      {children || (
        <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>
          {multiple ? 'Choose Files' : 'Choose File'}
        </Text>
      )}
    </Pressable>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.md,
    minHeight: TOUCH_TARGET,
  },
  triggerPressed: {
    backgroundColor: colors.bg.elevated,
  },
  triggerDisabled: {
    opacity: 0.5,
    backgroundColor: colors.bg.elevated,
  },
  text: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
  },
  textDisabled: {
    color: colors.text.muted,
  },
});
