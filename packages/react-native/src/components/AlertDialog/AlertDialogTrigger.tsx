import React, { cloneElement, isValidElement } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { useAlertDialog } from './AlertDialogContext';

export interface AlertDialogTriggerProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Render as child element instead of wrapping in Pressable */
  asChild?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

export function AlertDialogTrigger({
  children,
  asChild = false,
  style,
}: AlertDialogTriggerProps) {
  const { onOpenChange } = useAlertDialog();

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
