import React, { useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useCommand } from './CommandContext';
import { TOUCH_TARGET, getHitSlop, platformSpacing } from '../../utils/platform';

export interface CommandInputProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'style'> {
  /** Placeholder text */
  placeholder?: string;
  /** Auto-focus when mounted */
  autoFocus?: boolean;
  /** Show clear button */
  showClear?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

export function CommandInput({
  placeholder = 'Search...',
  autoFocus = true,
  showClear = true,
  style,
  ...props
}: CommandInputProps) {
  const { search, setSearch } = useCommand();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      // Small delay to ensure component is mounted
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const handleClear = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>⌘</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        {...props}
      />
      {showClear && search.length > 0 && (
        <Pressable
          onPress={handleClear}
          style={styles.clearButton}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={getHitSlop(TOUCH_TARGET)}
        >
          <Text style={styles.clearIcon}>×</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    minHeight: TOUCH_TARGET,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  icon: {
    fontSize: fontSizes.sm,
    color: colors.text.muted,
    marginRight: spacing[2],
  },
  input: {
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    color: colors.text.primary,
    paddingVertical: platformSpacing.inputPaddingVertical,
  },
  clearButton: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing[1],
  },
  clearIcon: {
    fontSize: fontSizes.lg,
    color: colors.text.muted,
    fontWeight: '300',
  },
});
