import React, { useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { fontFamilies, fontSizes } from '../../tokens/typography';
import { useCombobox } from './ComboboxContext';

export interface ComboboxInputProps
  extends Omit<TextInputProps, 'value' | 'onChangeText' | 'style'> {
  /** Placeholder text */
  placeholder?: string;
  /** Auto-focus when mounted */
  autoFocus?: boolean;
  /** Show clear button */
  showClear?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

export function ComboboxInput({
  placeholder = 'Search...',
  autoFocus = true,
  showClear = true,
  style,
  ...props
}: ComboboxInputProps) {
  const {
    search,
    setSearch,
    items,
    filter,
    highlightedIndex,
    setHighlightedIndex,
    onValueChange,
    setOpen,
  } = useCombobox();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const filteredItems = items.filter(
    (item) =>
      !item.disabled && (filter ? filter(item.label, search, item.keywords) : true)
  );

  const handleClear = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    const key = e.nativeEvent.key;

    if (key === 'ArrowDown') {
      setHighlightedIndex(
        Math.min(highlightedIndex + 1, filteredItems.length - 1)
      );
    } else if (key === 'ArrowUp') {
      setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
    } else if (key === 'Enter' && highlightedIndex >= 0) {
      const item = filteredItems[highlightedIndex];
      if (item) {
        onValueChange(item.value);
      }
    } else if (key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          setHighlightedIndex(0);
        }}
        onKeyPress={handleKeyPress}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        {...props}
      />
      {showClear && search.length > 0 && (
        <Pressable
          onPress={handleClear}
          style={styles.clearButton}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
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
    paddingVertical: spacing[3],
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
    fontSize: fontSizes.sm,
    color: colors.text.primary,
    padding: 0,
  },
  clearButton: {
    padding: spacing[1],
    marginLeft: spacing[2],
  },
  clearIcon: {
    fontSize: fontSizes.lg,
    color: colors.text.muted,
    fontWeight: '300',
  },
});
