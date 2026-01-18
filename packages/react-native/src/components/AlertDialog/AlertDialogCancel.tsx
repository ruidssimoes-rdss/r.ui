import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useAlertDialog } from './AlertDialogContext';

export interface AlertDialogCancelProps {
  /** Button content */
  children: React.ReactNode;
  /** Press handler - called before dialog closes */
  onPress?: () => void;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function AlertDialogCancel({
  children,
  onPress,
  style,
  textStyle,
}: AlertDialogCancelProps) {
  const { onOpenChange } = useAlertDialog();

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
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: radius.md,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    backgroundColor: colors.bg.surface,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
  },
});
