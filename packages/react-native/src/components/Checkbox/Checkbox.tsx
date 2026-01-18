import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export interface CheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Disable the checkbox */
  disabled?: boolean;
  /** Checkbox label */
  label?: string;
  /** Label description */
  description?: string;
  /** Additional container styles */
  style?: ViewStyle;
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  disabled = false,
  label,
  description,
  style,
}: CheckboxProps) {
  const scaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: checked ? 1 : 0,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: checked ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [checked, scaleAnim, opacityAnim]);

  const handlePress = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.checkbox,
          checked && styles.checkboxChecked,
          disabled && styles.checkboxDisabled,
        ]}
      >
        <Animated.View
          style={[
            styles.checkmark,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <CheckIcon />
        </Animated.View>
      </View>
      {(label || description) && (
        <View style={styles.labelContainer}>
          {label && (
            <Text style={[styles.label, disabled && styles.labelDisabled]}>
              {label}
            </Text>
          )}
          {description && (
            <Text style={[styles.description, disabled && styles.descriptionDisabled]}>
              {description}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

function CheckIcon() {
  return (
    <View style={styles.checkIcon}>
      <View style={styles.checkIconShort} />
      <View style={styles.checkIconLong} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border.strong,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.accent.blue.DEFAULT,
    borderColor: colors.accent.blue.DEFAULT,
  },
  checkboxDisabled: {
    backgroundColor: colors.bg.elevated,
    borderColor: colors.border.muted,
  },
  checkmark: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 10,
    height: 8,
    position: 'relative',
  },
  checkIconShort: {
    position: 'absolute',
    width: 2,
    height: 5,
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    left: 1,
    transform: [{ rotate: '-45deg' }],
  },
  checkIconLong: {
    position: 'absolute',
    width: 2,
    height: 9,
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    right: 1,
    transform: [{ rotate: '45deg' }],
  },
  labelContainer: {
    marginLeft: spacing[3],
    flex: 1,
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
  },
  labelDisabled: {
    color: colors.text.muted,
  },
  description: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    marginTop: spacing[1],
  },
  descriptionDisabled: {
    color: colors.text.muted,
  },
});
