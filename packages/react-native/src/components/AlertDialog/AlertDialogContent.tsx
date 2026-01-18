import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { shadows } from '../../tokens/shadows';
import { useAlertDialog } from './AlertDialogContext';
import { AlertDialogPortal } from './AlertDialogPortal';
import { AlertDialogOverlay } from './AlertDialogOverlay';

export interface AlertDialogContentProps {
  /** Content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export function AlertDialogContent({ children, style }: AlertDialogContentProps) {
  const { open } = useAlertDialog();
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
    }
  }, [open, scaleAnim, opacityAnim]);

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <View style={styles.centeredView} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </AlertDialogPortal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  content: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.xl,
    padding: spacing[6],
    width: '100%',
    maxWidth: 400,
    ...shadows.xl,
  },
});
