import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

export type TabsVariant = 'default' | 'pills' | 'underline';

export interface TabsProps {
  /** Currently selected tab value */
  value?: string;
  /** Callback when tab changes */
  onValueChange?: (value: string) => void;
  /** Default selected tab (uncontrolled) */
  defaultValue?: string;
  /** Tab children (TabsList, TabsContent) */
  children: React.ReactNode;
  /** Visual variant */
  variant?: TabsVariant;
  /** Additional container styles */
  style?: ViewStyle;
}

export interface TabsListProps {
  /** TabsTrigger children */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TabsTriggerProps {
  /** Tab value identifier */
  value: string;
  /** Trigger content */
  children: React.ReactNode;
  /** Disable this tab */
  disabled?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export interface TabsContentProps {
  /** Tab value this content belongs to */
  value: string;
  /** Content to display */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

interface TabLayout {
  x: number;
  width: number;
}

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: TabsVariant;
  registerTab: (value: string, layout: TabLayout) => void;
  tabLayouts: Record<string, TabLayout>;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs component');
  }
  return context;
}

export function Tabs({
  value: controlledValue,
  onValueChange,
  defaultValue = '',
  children,
  variant = 'default',
  style,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [tabLayouts, setTabLayouts] = useState<Record<string, TabLayout>>({});

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const registerTab = (tabValue: string, layout: TabLayout) => {
    setTabLayouts((prev) => ({
      ...prev,
      [tabValue]: layout,
    }));
  };

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        variant,
        registerTab,
        tabLayouts,
      }}
    >
      <View style={[styles.container, style]}>{children}</View>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, style }: TabsListProps) {
  const { value, tabLayouts, variant } = useTabsContext();
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const currentLayout = tabLayouts[value];
    if (currentLayout) {
      if (!isInitialized) {
        indicatorX.setValue(currentLayout.x);
        indicatorWidth.setValue(currentLayout.width);
        setIsInitialized(true);
      } else {
        Animated.parallel([
          Animated.spring(indicatorX, {
            toValue: currentLayout.x,
            useNativeDriver: false,
            tension: 300,
            friction: 30,
          }),
          Animated.spring(indicatorWidth, {
            toValue: currentLayout.width,
            useNativeDriver: false,
            tension: 300,
            friction: 30,
          }),
        ]).start();
      }
    }
  }, [value, tabLayouts, isInitialized]);

  const listStyle = variant === 'pills' ? styles.listPills : styles.list;
  const indicatorStyle =
    variant === 'underline'
      ? [styles.indicatorUnderline, { left: indicatorX, width: indicatorWidth }]
      : variant === 'pills'
        ? [styles.indicatorPill, { left: indicatorX, width: indicatorWidth }]
        : [styles.indicator, { left: indicatorX, width: indicatorWidth }];

  return (
    <View style={[listStyle, style]}>
      {children}
      {isInitialized && <Animated.View style={indicatorStyle} />}
    </View>
  );
}

export function TabsTrigger({
  value,
  children,
  disabled = false,
  style,
  textStyle,
}: TabsTriggerProps) {
  const { value: selectedValue, onValueChange, variant, registerTab } = useTabsContext();
  const isSelected = value === selectedValue;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    registerTab(value, { x, width });
  };

  const handlePress = () => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  const triggerStyle =
    variant === 'pills'
      ? [styles.triggerPill, disabled && styles.triggerDisabled, style]
      : variant === 'underline'
        ? [styles.triggerUnderline, disabled && styles.triggerDisabled, style]
        : [styles.trigger, disabled && styles.triggerDisabled, style];

  const triggerTextStyle =
    variant === 'pills'
      ? [
          styles.triggerTextPill,
          isSelected && styles.triggerTextSelected,
          disabled && styles.triggerTextDisabled,
          textStyle,
        ]
      : [
          styles.triggerText,
          isSelected && styles.triggerTextSelected,
          disabled && styles.triggerTextDisabled,
          textStyle,
        ];

  return (
    <Pressable
      onPress={handlePress}
      onLayout={handleLayout}
      disabled={disabled}
      style={triggerStyle}
      accessibilityRole="tab"
      accessibilityState={{ selected: isSelected, disabled }}
    >
      <Text style={triggerTextStyle}>{children}</Text>
    </Pressable>
  );
}

export function TabsContent({ value, children, style }: TabsContentProps) {
  const { value: selectedValue } = useTabsContext();

  if (value !== selectedValue) {
    return null;
  }

  return (
    <View style={[styles.content, style]} accessibilityRole="tabpanel">
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {
    flexDirection: 'row',
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    padding: spacing[1],
    position: 'relative',
  },
  listPills: {
    flexDirection: 'row',
    gap: spacing[1],
    position: 'relative',
  },
  trigger: {
    flex: 1,
    minHeight: 44,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    zIndex: 1,
  },
  triggerPill: {
    minHeight: 44,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    zIndex: 1,
  },
  triggerUnderline: {
    minHeight: 44,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
  },
  triggerTextPill: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
  },
  triggerTextSelected: {
    color: colors.text.primary,
  },
  triggerTextDisabled: {
    color: colors.text.muted,
  },
  indicator: {
    position: 'absolute',
    top: spacing[1],
    bottom: spacing[1],
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.sm,
  },
  indicatorPill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  indicatorUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: 1,
  },
  content: {
    paddingTop: spacing[4],
  },
});
