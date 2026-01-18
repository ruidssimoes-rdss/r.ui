import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { spacing } from '../../tokens/spacing';
import {
  CommandContext,
  CommandContextValue,
  CommandItemData,
  defaultFilter,
} from './CommandContext';

export interface CommandProps {
  /** Command content */
  children: React.ReactNode;
  /** Custom filter function */
  filter?: (value: string, search: string, keywords?: string[]) => boolean;
  /** Callback when an item is selected */
  onSelect?: (value: string) => void;
  /** Additional styles */
  style?: ViewStyle;
  /** Control whether Command is displayed as a standalone component */
  standalone?: boolean;
}

export function Command({
  children,
  filter = defaultFilter,
  onSelect,
  style,
  standalone = true,
}: CommandProps) {
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [items, setItems] = useState<CommandItemData[]>([]);

  const registerItem = useCallback((item: CommandItemData) => {
    setItems((prev) => {
      if (prev.some((i) => i.value === item.value)) {
        return prev;
      }
      return [...prev, item];
    });
  }, []);

  const unregisterItem = useCallback((value: string) => {
    setItems((prev) => prev.filter((i) => i.value !== value));
  }, []);

  const contextValue = useMemo<CommandContextValue>(
    () => ({
      search,
      setSearch,
      selectedValue,
      setSelectedValue,
      items,
      registerItem,
      unregisterItem,
      filter,
      onSelect,
    }),
    [search, selectedValue, items, filter, onSelect, registerItem, unregisterItem]
  );

  return (
    <CommandContext.Provider value={contextValue}>
      <View style={[standalone && styles.container, style]}>{children}</View>
    </CommandContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    overflow: 'hidden',
  },
});
