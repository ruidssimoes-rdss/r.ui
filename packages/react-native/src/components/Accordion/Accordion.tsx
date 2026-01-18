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
  LayoutChangeEvent,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// Types
export type AccordionType = 'single' | 'multiple';

export interface AccordionProps {
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
}

export interface AccordionItemProps {
  value: string;
  children?: ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

export interface AccordionTriggerProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface AccordionContentProps {
  children?: ReactNode;
  style?: ViewStyle;
}

// Context for Accordion
interface AccordionContextValue {
  type: AccordionType;
  expandedItems: string[];
  toggleItem: (value: string) => void;
  collapsible: boolean;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

// Context for AccordionItem
interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | undefined>(undefined);

// Chevron Icon Component
function ChevronIcon({ rotateAnim }: { rotateAnim: Animated.Value }) {
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <View style={styles.chevronContainer}>
        <View style={styles.chevronLine1} />
        <View style={styles.chevronLine2} />
      </View>
    </Animated.View>
  );
}

// AccordionTrigger
export function AccordionTrigger({ children, style }: AccordionTriggerProps) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error('AccordionTrigger must be used within AccordionItem');
  }

  const { toggleItem } = accordionContext;
  const { value, isExpanded, disabled } = itemContext;

  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotateAnim]);

  const handlePress = useCallback(() => {
    if (!disabled) {
      toggleItem(value);
    }
  }, [toggleItem, value, disabled]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.trigger,
        pressed && !disabled && styles.triggerPressed,
        disabled && styles.triggerDisabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded, disabled }}
    >
      <View style={styles.triggerContent}>
        {typeof children === 'string' ? (
          <Text style={[styles.triggerText, disabled && styles.triggerTextDisabled]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      <ChevronIcon rotateAnim={rotateAnim} />
    </Pressable>
  );
}

// AccordionContent
export function AccordionContent({ children, style }: AccordionContentProps) {
  const itemContext = useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error('AccordionContent must be used within AccordionItem');
  }

  const { isExpanded } = itemContext;
  const [contentHeight, setContentHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const opacityAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (height > 0) {
      setContentHeight(height);
    }
  }, []);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isExpanded, heightAnim, opacityAnim]);

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight || 1000],
  });

  return (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          height: contentHeight ? animatedHeight : 'auto',
          opacity: opacityAnim,
        },
      ]}
    >
      <View onLayout={onLayout} style={[styles.content, style]}>
        {typeof children === 'string' ? (
          <Text style={styles.contentText}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </Animated.View>
  );
}

// AccordionItem
export function AccordionItem({
  value,
  children,
  style,
  disabled = false,
}: AccordionItemProps) {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('AccordionItem must be used within Accordion');
  }

  const isExpanded = context.expandedItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isExpanded, disabled }}>
      <View style={[styles.item, style]}>
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
}

// Main Accordion Component
export function Accordion({
  type = 'single',
  defaultValue,
  value,
  onValueChange,
  collapsible = true,
  children,
  style,
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const expandedItems = value
    ? (Array.isArray(value) ? value : [value])
    : internalValue;

  const toggleItem = useCallback(
    (itemValue: string) => {
      let newValue: string[];

      if (type === 'single') {
        if (expandedItems.includes(itemValue)) {
          newValue = collapsible ? [] : expandedItems;
        } else {
          newValue = [itemValue];
        }
      } else {
        if (expandedItems.includes(itemValue)) {
          newValue = expandedItems.filter((v) => v !== itemValue);
        } else {
          newValue = [...expandedItems, itemValue];
        }
      }

      if (!value) {
        setInternalValue(newValue);
      }

      onValueChange?.(type === 'single' ? (newValue[0] || '') : newValue);
    },
    [type, expandedItems, collapsible, value, onValueChange]
  );

  return (
    <AccordionContext.Provider
      value={{ type, expandedItems, toggleItem, collapsible }}
    >
      <View style={[styles.accordion, style]}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}

const styles = StyleSheet.create({
  accordion: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    backgroundColor: colors.bg.surface,
  },
  triggerPressed: {
    backgroundColor: colors.bg.elevated,
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerContent: {
    flex: 1,
  },
  triggerText: {
    color: colors.text.primary,
    fontSize: 15,
    fontWeight: '500',
  },
  triggerTextDisabled: {
    color: colors.text.muted,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
    backgroundColor: colors.bg.surface,
  },
  contentText: {
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
  },
  chevronContainer: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronLine1: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }, { translateX: -2 }],
  },
  chevronLine2: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }, { translateX: 2 }],
  },
});
