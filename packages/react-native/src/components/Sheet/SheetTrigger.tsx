import React from 'react';
import { Pressable } from 'react-native';
import { useSheet, SheetTriggerProps, SheetCloseProps } from './SheetContext';

/**
 * SheetTrigger - Opens the sheet when pressed.
 */
export function SheetTrigger({ children, style }: SheetTriggerProps) {
  const { onOpenChange } = useSheet();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onOpenChange(true)}
      style={style}
    >
      {children}
    </Pressable>
  );
}

/**
 * SheetClose - Closes the sheet when pressed.
 */
export function SheetClose({ children, style }: SheetCloseProps) {
  const { onOpenChange } = useSheet();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onOpenChange(false)}
      style={style}
    >
      {children}
    </Pressable>
  );
}
