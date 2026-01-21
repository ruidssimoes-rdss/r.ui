import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useActionSheet } from './ActionSheetContext';
import { TOUCH_TARGET } from '../../utils/platform';

export interface ActionSheetCancelProps {
  /** Button content */
  children: React.ReactNode;
  /** Press handler (called before close) */
  onPress?: () => void;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function ActionSheetCancel({
  children,
  onPress,
  style,
  textStyle,
}: ActionSheetCancelProps) {
  const { onOpenChange } = useActionSheet();

  const handlePress = () => {
    onPress?.();
    onOpenChange(false);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
      accessibilityRole="button"
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TOUCH_TARGET, // Platform-aware: 44pt iOS, 48dp Android, 36px Web
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    marginTop: spacing[2],
    backgroundColor: colors.bg.surface,
    borderRadius: radius.lg,
  },
  buttonPressed: {
    backgroundColor: colors.bg.primary,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.accent.blue.DEFAULT,
    textAlign: 'center',
  },
});
