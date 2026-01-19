import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// Types
export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  orientation?: RadioGroupOrientation;
  children?: ReactNode;
  style?: ViewStyle;
}

export interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
}

export interface RadioGroupLabelProps {
  children?: ReactNode;
  style?: TextStyle;
}

// Context
interface RadioGroupContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

// Context for RadioGroupItem
interface RadioGroupItemContextValue {
  value: string;
  isSelected: boolean;
  disabled: boolean;
}

const RadioGroupItemContext = createContext<RadioGroupItemContextValue | undefined>(undefined);

// RadioGroupLabel
export function RadioGroupLabel({ children, style }: RadioGroupLabelProps) {
  const context = useContext(RadioGroupItemContext);

  if (!context) {
    throw new Error('RadioGroupLabel must be used within RadioGroupItem');
  }

  const { disabled } = context;

  return (
    <Text style={[styles.label, disabled && styles.labelDisabled, style]}>
      {children}
    </Text>
  );
}

// RadioGroupItem
export function RadioGroupItem({
  value,
  disabled: itemDisabled = false,
  children,
  style,
}: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error('RadioGroupItem must be used within RadioGroup');
  }

  const { value: selectedValue, onValueChange, disabled: groupDisabled } = context;
  const disabled = groupDisabled || itemDisabled;
  const isSelected = selectedValue === value;

  const scaleAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isSelected ? 1 : 0,
        useNativeDriver: true,
        tension: 300,
        friction: 20,
      }),
      Animated.timing(opacityAnim, {
        toValue: isSelected ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSelected, scaleAnim, opacityAnim]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onValueChange(value);
    }
  }, [disabled, onValueChange, value]);

  return (
    <RadioGroupItemContext.Provider value={{ value, isSelected, disabled }}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.item,
          pressed && !disabled && styles.itemPressed,
          style,
        ]}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="radio"
        accessibilityState={{ checked: isSelected, disabled }}
      >
        <View style={[styles.radio, disabled && styles.radioDisabled]}>
          <Animated.View
            style={[
              styles.radioInner,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          />
        </View>
        {children && (
          <View style={styles.content}>
            {typeof children === 'string' ? (
              <RadioGroupLabel>{children}</RadioGroupLabel>
            ) : (
              children
            )}
          </View>
        )}
      </Pressable>
    </RadioGroupItemContext.Provider>
  );
}

// Main RadioGroup Component
export function RadioGroup({
  value,
  onValueChange,
  defaultValue,
  disabled = false,
  orientation = 'vertical',
  children,
  style,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return (
    <RadioGroupContext.Provider
      value={{ value: currentValue, onValueChange: handleValueChange, disabled }}
    >
      <View
        style={[
          styles.group,
          orientation === 'horizontal' && styles.groupHorizontal,
          style,
        ]}
        accessibilityRole="radiogroup"
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: spacing[3],
  },
  groupHorizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  itemPressed: {
    opacity: 0.7,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border.strong,
    backgroundColor: colors.bg.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDisabled: {
    borderColor: colors.border.default,
    backgroundColor: colors.bg.raised,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  content: {
    flex: 1,
  },
  label: {
    color: colors.text.primary,
    fontSize: 15,
  },
  labelDisabled: {
    color: colors.text.muted,
  },
});
