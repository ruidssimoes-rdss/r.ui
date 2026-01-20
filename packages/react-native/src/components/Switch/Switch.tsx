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

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 24;
const THUMB_SIZE = 20;
const THUMB_OFFSET = 2;

export interface SwitchProps {
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onCheckedChange?: (checked: boolean) => void;
  /** Disable the switch */
  disabled?: boolean;
  /** Switch label */
  label?: string;
  /** Label description */
  description?: string;
  /** Additional container styles */
  style?: ViewStyle;
}

export function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  label,
  description,
  style,
}: SwitchProps) {
  const translateX = useRef(
    new Animated.Value(checked ? TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET * 2 : 0)
  ).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: checked ? TRACK_WIDTH - THUMB_SIZE - THUMB_OFFSET * 2 : 0,
      useNativeDriver: true,
      tension: 300,
      friction: 15,
    }).start();
  }, [checked, translateX]);

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
      accessibilityRole="switch"
      accessibilityState={{ checked }}
    >
      <View
        style={[
          styles.track,
          checked && styles.trackChecked,
          disabled && styles.trackDisabled,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            disabled && styles.thumbDisabled,
            {
              transform: [{ translateX }],
            },
          ]}
        />
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: THUMB_OFFSET,
    justifyContent: 'center',
  },
  trackChecked: {
    backgroundColor: colors.accent.blue.DEFAULT,
    borderColor: colors.accent.blue.DEFAULT,
  },
  trackDisabled: {
    backgroundColor: colors.bg.surface,
    borderColor: colors.border.muted,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbDisabled: {
    backgroundColor: colors.text.muted,
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
