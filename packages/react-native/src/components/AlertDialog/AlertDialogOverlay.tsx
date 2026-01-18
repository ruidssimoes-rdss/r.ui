import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { useAlertDialog } from './AlertDialogContext';

export interface AlertDialogOverlayProps {
  /** Additional styles */
  style?: ViewStyle;
}

export function AlertDialogOverlay({ style }: AlertDialogOverlayProps) {
  const { open } = useAlertDialog();
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      opacityAnim.setValue(0);
    }
  }, [open, opacityAnim]);

  // NOTE: AlertDialog overlay does NOT close on tap - this is intentional
  // Users must explicitly choose an action (Cancel or Action button)
  return (
    <Animated.View
      style={[
        styles.overlay,
        { opacity: opacityAnim },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg.overlay,
  },
});
