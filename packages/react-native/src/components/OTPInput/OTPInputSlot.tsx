import React, { useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  Animated,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import { useOTPInput } from './OTPInputContext';

export interface OTPInputSlotProps {
  /** Slot index (0-based) */
  index: number;
  /** Additional styles */
  style?: ViewStyle;
}

/**
 * OTPInputSlot - Individual digit box with auto-advance and backspace handling.
 */
export function OTPInputSlot({ index, style }: OTPInputSlotProps) {
  const {
    values,
    focusedIndex,
    setFocusedIndex,
    handleInput,
    handleBackspace,
    disabled,
    error,
    inputRefs,
  } = useOTPInput();

  const value = values[index] || '';
  const isFocused = focusedIndex === index;
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  // Blinking cursor animation
  useEffect(() => {
    if (isFocused && !value) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(cursorOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    } else {
      cursorOpacity.setValue(1);
    }
  }, [isFocused, value, cursorOpacity]);

  const handleFocus = () => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    if (focusedIndex === index) {
      setFocusedIndex(-1);
    }
  };

  const handleChangeText = (text: string) => {
    handleInput(index, text);
  };

  const handleKeyPress = (e: { nativeEvent: { key: string } }) => {
    if (e.nativeEvent.key === 'Backspace') {
      handleBackspace(index);
    }
  };

  const getBorderColor = () => {
    if (error) return colors.semantic.error;
    if (isFocused) return colors.accent.blue.DEFAULT;
    return colors.border.default;
  };

  return (
    <View
      style={[
        styles.slot,
        { borderColor: getBorderColor() },
        isFocused && !error && styles.slotFocused,
        error && styles.slotError,
        disabled && styles.slotDisabled,
        style,
      ]}
    >
      <TextInput
        ref={(ref) => {
          if (inputRefs.current) {
            inputRefs.current[index] = ref;
          }
        }}
        style={styles.input}
        value={value}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        keyboardType="number-pad"
        maxLength={1}
        editable={!disabled}
        selectTextOnFocus
        caretHidden
        accessibilityLabel={`Digit ${index + 1}`}
        accessibilityHint={`Enter digit ${index + 1} of the verification code`}
      />
      {isFocused && !value && (
        <Animated.View style={[styles.cursor, { opacity: cursorOpacity }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderRadius: radius.md,
    backgroundColor: colors.bg.surface,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  slotFocused: {
    borderWidth: 2,
    shadowColor: colors.accent.blue.DEFAULT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    ...Platform.select({
      android: {
        elevation: 4,
      },
    }),
  },
  slotError: {
    borderColor: colors.semantic.error,
    borderWidth: 2,
  },
  slotDisabled: {
    backgroundColor: colors.bg.raised,
    opacity: 0.5,
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: colors.text.primary,
    padding: 0,
  },
  cursor: {
    position: 'absolute',
    width: 2,
    height: 24,
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: 1,
  },
});
