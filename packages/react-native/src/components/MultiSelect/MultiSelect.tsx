import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { TOUCH_TARGET, getHitSlop } from '../../utils/platform';

// ============================================================================
// Types
// ============================================================================

export interface MultiSelectOption {
  /** Unique value for the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Optional group name for grouped options */
  group?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface MultiSelectContextValue {
  /** Currently selected values */
  value: string[];
  /** Update selected values */
  onValueChange: (value: string[]) => void;
  /** Available options */
  options: MultiSelectOption[];
  /** Search/filter query */
  searchQuery: string;
  /** Update search query */
  setSearchQuery: (query: string) => void;
  /** Whether dropdown is open */
  isOpen: boolean;
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Toggle selection of a value */
  toggleValue: (val: string) => void;
  /** Remove a value */
  removeValue: (val: string) => void;
  /** Maximum number of items that can be selected */
  maxItems?: number;
  /** Whether new items can be created */
  creatable: boolean;
  /** Whether the component is disabled */
  disabled: boolean;
  /** Placeholder text */
  placeholder: string;
  /** Filtered options based on search */
  filteredOptions: MultiSelectOption[];
  /** Grouped options */
  groupedOptions: Map<string, MultiSelectOption[]>;
}

export interface MultiSelectProps {
  /** Currently selected values */
  value?: string[];
  /** Called when selection changes */
  onValueChange?: (value: string[]) => void;
  /** Available options */
  options: MultiSelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Maximum number of items that can be selected */
  maxItems?: number;
  /** Allow creating new items */
  creatable?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Children components */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

export interface MultiSelectTriggerProps {
  /** Additional styles */
  style?: ViewStyle;
}

export interface MultiSelectContentProps {
  /** Children components */
  children?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface MultiSelectInputProps {
  /** Placeholder text */
  placeholder?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface MultiSelectOptionProps {
  /** Option value */
  value: string;
  /** Children (label) */
  children: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

export interface MultiSelectTagProps {
  /** Tag value */
  value: string;
  /** Display label */
  label: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface MultiSelectEmptyProps {
  /** Children to display when no options */
  children?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

const MultiSelectContext = createContext<MultiSelectContextValue | null>(null);

export function useMultiSelect() {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error('useMultiSelect must be used within a MultiSelect provider');
  }
  return context;
}

// ============================================================================
// Root Component
// ============================================================================

export function MultiSelect({
  value = [],
  onValueChange,
  options,
  placeholder = 'Select items...',
  maxItems,
  creatable = false,
  disabled = false,
  children,
  style,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const open = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
  }, []);

  const toggleValue = useCallback((val: string) => {
    if (disabled) return;

    const isSelected = value.includes(val);
    if (isSelected) {
      onValueChange?.(value.filter((v) => v !== val));
    } else {
      if (maxItems && value.length >= maxItems) return;
      onValueChange?.([...value, val]);
    }
  }, [value, onValueChange, disabled, maxItems]);

  const removeValue = useCallback((val: string) => {
    if (disabled) return;
    onValueChange?.(value.filter((v) => v !== val));
  }, [value, onValueChange, disabled]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query) ||
      opt.value.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  const groupedOptions = useMemo(() => {
    const groups = new Map<string, MultiSelectOption[]>();
    filteredOptions.forEach((opt) => {
      const groupName = opt.group || '';
      const group = groups.get(groupName) || [];
      group.push(opt);
      groups.set(groupName, group);
    });
    return groups;
  }, [filteredOptions]);

  const contextValue: MultiSelectContextValue = {
    value,
    onValueChange: onValueChange || (() => {}),
    options,
    searchQuery,
    setSearchQuery,
    isOpen,
    open,
    close,
    toggleValue,
    removeValue,
    maxItems,
    creatable,
    disabled,
    placeholder,
    filteredOptions,
    groupedOptions,
  };

  return (
    <MultiSelectContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </MultiSelectContext.Provider>
  );
}

// ============================================================================
// Trigger Component
// ============================================================================

export function MultiSelectTrigger({ style }: MultiSelectTriggerProps) {
  const { value, options, open, disabled, placeholder } = useMultiSelect();

  const selectedOptions = options.filter((opt) => value.includes(opt.value));
  const hasSelection = selectedOptions.length > 0;

  return (
    <Pressable
      onPress={open}
      disabled={disabled}
      accessibilityRole="button"
      style={[
        styles.trigger,
        disabled && styles.triggerDisabled,
        style,
      ]}
    >
      <View style={styles.triggerContent}>
        {hasSelection ? (
          <View style={styles.tagsContainer}>
            {selectedOptions.slice(0, 3).map((opt) => (
              <MultiSelectTag key={opt.value} value={opt.value} label={opt.label} />
            ))}
            {selectedOptions.length > 3 && (
              <Text style={styles.moreText}>+{selectedOptions.length - 3}</Text>
            )}
          </View>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
      </View>
      <ChevronIcon />
    </Pressable>
  );
}

// ============================================================================
// Content Component
// ============================================================================

export function MultiSelectContent({ children, style }: MultiSelectContentProps) {
  const { isOpen, close } = useMultiSelect();

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={close}
    >
      <Pressable style={styles.overlay} onPress={close} accessibilityRole="button" accessibilityLabel="Close dropdown">
        <View style={[styles.dropdown, style]}>
          <Pressable>
            {children}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

// ============================================================================
// Input Component
// ============================================================================

export function MultiSelectInput({ placeholder = 'Search...', style }: MultiSelectInputProps) {
  const { searchQuery, setSearchQuery, creatable, filteredOptions, toggleValue, value, maxItems } = useMultiSelect();

  const handleSubmit = () => {
    if (creatable && searchQuery && !filteredOptions.some((opt) => opt.value === searchQuery)) {
      if (maxItems && value.length >= maxItems) return;
      toggleValue(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <SearchIcon />
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        style={styles.input}
        onSubmitEditing={handleSubmit}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

// ============================================================================
// Option Component
// ============================================================================

export function MultiSelectOption({ value: optionValue, children, disabled, style }: MultiSelectOptionProps) {
  const { value, toggleValue, maxItems } = useMultiSelect();

  const isSelected = value.includes(optionValue);
  const isAtLimit = maxItems !== undefined && value.length >= maxItems && !isSelected;
  const isDisabled = disabled || isAtLimit;

  return (
    <Pressable
      onPress={() => !isDisabled && toggleValue(optionValue)}
      disabled={isDisabled}
      accessibilityRole="button"
      style={[
        styles.option,
        isSelected && styles.optionSelected,
        isDisabled && styles.optionDisabled,
        style,
      ]}
    >
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <CheckIcon />}
      </View>
      <Text style={[styles.optionText, isDisabled && styles.optionTextDisabled]}>
        {children}
      </Text>
    </Pressable>
  );
}

// ============================================================================
// Tag Component
// ============================================================================

export function MultiSelectTag({ value: tagValue, label, style }: MultiSelectTagProps) {
  const { removeValue, disabled } = useMultiSelect();

  return (
    <View style={[styles.tag, style]}>
      <Text style={styles.tagText} numberOfLines={1}>{label}</Text>
      {!disabled && (
        <Pressable
          onPress={() => removeValue(tagValue)}
          style={styles.tagRemove}
          hitSlop={getHitSlop(24)}
          accessibilityLabel={`Remove ${label}`}
          accessibilityRole="button"
        >
          <CloseIcon size={10} />
        </Pressable>
      )}
    </View>
  );
}

// ============================================================================
// Empty Component
// ============================================================================

export function MultiSelectEmpty({ children, style }: MultiSelectEmptyProps) {
  const { filteredOptions, searchQuery, creatable } = useMultiSelect();

  if (filteredOptions.length > 0) return null;

  return (
    <View style={[styles.empty, style]}>
      {children || (
        <Text style={styles.emptyText}>
          {searchQuery && creatable
            ? `Press enter to create "${searchQuery}"`
            : 'No options found'
          }
        </Text>
      )}
    </View>
  );
}

// ============================================================================
// List Component (renders grouped or flat options)
// ============================================================================

export function MultiSelectList() {
  const { groupedOptions, filteredOptions } = useMultiSelect();

  const hasGroups = Array.from(groupedOptions.keys()).some((key) => key !== '');

  if (hasGroups) {
    return (
      <ScrollView style={styles.list}>
        {Array.from(groupedOptions.entries()).map(([groupName, options]) => (
          <View key={groupName || 'ungrouped'}>
            {groupName && (
              <Text style={styles.groupLabel}>{groupName}</Text>
            )}
            {options.map((opt) => (
              <MultiSelectOption key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </MultiSelectOption>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.list}>
      {filteredOptions.map((opt) => (
        <MultiSelectOption key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </MultiSelectOption>
      ))}
    </ScrollView>
  );
}

// ============================================================================
// Icons
// ============================================================================

function ChevronIcon() {
  return (
    <View style={iconStyles.chevron}>
      <View style={iconStyles.chevronLine1} />
      <View style={iconStyles.chevronLine2} />
    </View>
  );
}

function SearchIcon() {
  return (
    <View style={iconStyles.searchContainer}>
      <View style={iconStyles.searchCircle} />
      <View style={iconStyles.searchHandle} />
    </View>
  );
}

function CheckIcon() {
  return (
    <View style={iconStyles.check}>
      <View style={iconStyles.checkShort} />
      <View style={iconStyles.checkLong} />
    </View>
  );
}

function CloseIcon({ size = 12 }: { size?: number }) {
  return (
    <View style={[iconStyles.closeContainer, { width: size, height: size }]}>
      <View style={[iconStyles.closeX1, { width: size - 2 }]} />
      <View style={[iconStyles.closeX2, { width: size - 2 }]} />
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.md,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    minHeight: TOUCH_TARGET,
  },
  triggerDisabled: {
    backgroundColor: colors.bg.elevated,
    borderColor: colors.border.muted,
    opacity: 0.6,
  },
  triggerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[1],
    alignItems: 'center',
  },
  placeholder: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    color: colors.text.muted,
  },
  moreText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing[1],
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.bg.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  dropdown: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    width: '100%',
    maxWidth: 320,
    maxHeight: 400,
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  input: {
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    color: colors.text.primary,
    marginLeft: spacing[2],
    paddingVertical: spacing[1],
  },
  list: {
    padding: spacing[2],
    maxHeight: 300,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.md,
    marginBottom: spacing[1],
    minHeight: TOUCH_TARGET,
  },
  optionSelected: {
    backgroundColor: colors.bg.surface,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border.strong,
    marginRight: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.accent.blue.DEFAULT,
    borderColor: colors.accent.blue.DEFAULT,
  },
  optionText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    color: colors.text.primary,
    flex: 1,
  },
  optionTextDisabled: {
    color: colors.text.muted,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: radius.sm,
    paddingVertical: spacing[1],
    paddingLeft: spacing[2],
    paddingRight: spacing[1],
    maxWidth: 100,
  },
  tagText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.white,
    marginRight: spacing[1],
  },
  tagRemove: {
    padding: spacing[1],
    minWidth: 24,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupLabel: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: spacing[3],
    paddingTop: spacing[3],
    paddingBottom: spacing[1],
  },
  empty: {
    padding: spacing[4],
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.muted,
  },
});

const iconStyles = StyleSheet.create({
  chevron: {
    width: 10,
    height: 6,
    marginLeft: spacing[2],
    position: 'relative',
  },
  chevronLine1: {
    position: 'absolute',
    width: 7,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    left: 0,
    top: 2,
    transform: [{ rotate: '45deg' }],
  },
  chevronLine2: {
    position: 'absolute',
    width: 7,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    right: 0,
    top: 2,
    transform: [{ rotate: '-45deg' }],
  },
  searchContainer: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  searchCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.text.muted,
  },
  searchHandle: {
    position: 'absolute',
    width: 5,
    height: 2,
    backgroundColor: colors.text.muted,
    borderRadius: 1,
    bottom: 1,
    right: 1,
    transform: [{ rotate: '45deg' }],
  },
  check: {
    width: 10,
    height: 8,
    position: 'relative',
  },
  checkShort: {
    position: 'absolute',
    width: 2,
    height: 5,
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    left: 1,
    transform: [{ rotate: '-45deg' }],
  },
  checkLong: {
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: colors.white,
    borderRadius: 1,
    bottom: 0,
    right: 1,
    transform: [{ rotate: '45deg' }],
  },
  closeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeX1: {
    position: 'absolute',
    height: 1.5,
    backgroundColor: colors.white,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  closeX2: {
    position: 'absolute',
    height: 1.5,
    backgroundColor: colors.white,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
});
