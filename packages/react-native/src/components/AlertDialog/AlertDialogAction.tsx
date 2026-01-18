import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { useAlertDialog } from './AlertDialogContext';

export interface AlertDialogActionProps {
  /** Button content */
  children: React.ReactNode;
  /** Press handler - called before dialog closes */
  onPress?: () => void;
  /** Destructive styling (red) */
  destructive?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export function AlertDialogAction({
  children,
  onPress,
  destructive = false,
  style,
  textStyle,
}: AlertDialogActionProps) {
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
        destructive ? styles.buttonDestructive : styles.buttonDefault,
        pressed && (destructive ? styles.buttonDestructivePressed : styles.buttonDefaultPressed),
        style,
      ]}
    >
      <Text style={[styles.text, destructive && styles.textDestructive, textStyle]}>
        {children}
      </Text>
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
  },
  buttonDefault: {
    backgroundColor: colors.text.primary,
  },
  buttonDefaultPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  buttonDestructive: {
    backgroundColor: colors.accent.red.DEFAULT,
  },
  buttonDestructivePressed: {
    backgroundColor: colors.accent.red.hover,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.bg.primary,
  },
  textDestructive: {
    color: '#ffffff',
  },
});
