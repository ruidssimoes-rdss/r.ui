import React, { cloneElement, isValidElement } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { useActionSheet } from './ActionSheetContext';

export interface ActionSheetTriggerProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Render as child element instead of wrapping in Pressable */
  asChild?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

export function ActionSheetTrigger({
  children,
  asChild = false,
  style,
}: ActionSheetTriggerProps) {
  const { onOpenChange } = useActionSheet();

  const handlePress = () => {
    onOpenChange(true);
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<any>, {
      onPress: handlePress,
    });
  }

  return (
    <Pressable onPress={handlePress} style={style}>
      {children}
    </Pressable>
  );
}
