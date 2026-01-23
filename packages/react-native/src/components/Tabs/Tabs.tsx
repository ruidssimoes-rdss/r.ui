import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  Platform,
  NativeSyntheticEvent,
  TargetedEvent,
  AccessibilityRole,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { GlassSurface } from '../GlassSurface';
import { useTheme, ThemeContextValue } from '../../themes/ThemeProvider';
import { TOUCH_TARGET } from '../../utils/platform';

// Safe hook that returns null if ThemeProvider is not present
function useThemeOptional(): ThemeContextValue | null {
  try {
    return useTheme();
  } catch {
    return null;
  }
}

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

interface TabRef {
  ref: View | null;
  value: string;
  disabled: boolean;
}

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: TabsVariant;
  registerTab: (value: string, layout: TabLayout) => void;
  tabLayouts: Record<string, TabLayout>;
  registerTabRef: (value: string, ref: View | null, disabled: boolean) => void;
  unregisterTabRef: (value: string) => void;
  tabRefs: React.MutableRefObject<Map<string, TabRef>>;
  tabOrder: React.MutableRefObject<string[]>;
  isGlass: boolean;
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
  const themeContext = useThemeOptional();
  const isGlass = themeContext?.isGlass ?? false;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [tabLayouts, setTabLayouts] = useState<Record<string, TabLayout>>({});
  const tabRefs = useRef<Map<string, TabRef>>(new Map());
  const tabOrder = useRef<string[]>([]);

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

  const registerTabRef = useCallback((tabValue: string, ref: View | null, disabled: boolean) => {
    tabRefs.current.set(tabValue, { ref, value: tabValue, disabled });
    // Maintain tab order based on registration
    if (!tabOrder.current.includes(tabValue)) {
      tabOrder.current.push(tabValue);
    }
  }, []);

  const unregisterTabRef = useCallback((tabValue: string) => {
    tabRefs.current.delete(tabValue);
    tabOrder.current = tabOrder.current.filter((v) => v !== tabValue);
  }, []);

  return (
    <TabsContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        variant,
        registerTab,
        tabLayouts,
        registerTabRef,
        unregisterTabRef,
        tabRefs,
        tabOrder,
        isGlass,
      }}
    >
      <View style={[styles.container, style]}>{children}</View>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, style }: TabsListProps) {
  const { value, tabLayouts, variant, isGlass } = useTabsContext();
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
  const glassListStyle = variant === 'pills' ? styles.glassListPills : styles.glassList;

  const indicatorStyle =
    variant === 'underline'
      ? [styles.indicatorUnderline, { left: indicatorX, width: indicatorWidth }]
      : variant === 'pills'
        ? [isGlass ? styles.glassIndicatorPill : styles.indicatorPill, { left: indicatorX, width: indicatorWidth }]
        : [isGlass ? styles.glassIndicator : styles.indicator, { left: indicatorX, width: indicatorWidth }];

  // Glass mode rendering
  if (isGlass && variant !== 'underline') {
    return (
      <GlassSurface
        intensity={16}
        opacity={0.5}
        borderRadius={variant === 'pills' ? 0 : radius.md}
        shadow="none"
        bordered={variant !== 'pills'}
        style={[glassListStyle, style as ViewStyle]}
      >
        {children}
        {isInitialized && <Animated.View style={indicatorStyle} />}
      </GlassSurface>
    );
  }

  // Default non-glass rendering
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
  const {
    value: selectedValue,
    onValueChange,
    variant,
    registerTab,
    registerTabRef,
    unregisterTabRef,
    tabRefs,
    tabOrder,
  } = useTabsContext();
  const isSelected = value === selectedValue;
  const triggerRef = useRef<View>(null);

  // Register/unregister tab ref for keyboard navigation
  useEffect(() => {
    registerTabRef(value, triggerRef.current, disabled);
    return () => unregisterTabRef(value);
  }, [value, disabled, registerTabRef, unregisterTabRef]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    registerTab(value, { x, width });
  };

  const handlePress = () => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  // Get next/previous non-disabled tab
  const getAdjacentTab = useCallback((direction: 'next' | 'prev') => {
    const order = tabOrder.current;
    const currentIndex = order.indexOf(value);
    if (currentIndex === -1) return null;

    const step = direction === 'next' ? 1 : -1;
    const length = order.length;

    // Loop through tabs to find next non-disabled one
    for (let i = 1; i <= length; i++) {
      const nextIndex = (currentIndex + i * step + length) % length;
      const nextValue = order[nextIndex];
      const tabRef = tabRefs.current.get(nextValue);
      if (tabRef && !tabRef.disabled) {
        return tabRef;
      }
    }
    return null;
  }, [value, tabRefs, tabOrder]);

  // Focus a tab and select it
  const focusTab = useCallback((tabRef: TabRef | null) => {
    if (tabRef?.ref && Platform.OS === 'web') {
      // @ts-ignore - focus exists on web
      tabRef.ref.focus?.();
      onValueChange(tabRef.value);
    }
  }, [onValueChange]);

  // Web-only keyboard handler
  const handleKeyDown = Platform.select({
    web: (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          focusTab(getAdjacentTab('prev'));
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          focusTab(getAdjacentTab('next'));
          break;
        case 'Home':
          event.preventDefault();
          // Focus first non-disabled tab
          for (const tabValue of tabOrder.current) {
            const tabRef = tabRefs.current.get(tabValue);
            if (tabRef && !tabRef.disabled) {
              focusTab(tabRef);
              break;
            }
          }
          break;
        case 'End':
          event.preventDefault();
          // Focus last non-disabled tab
          for (let i = tabOrder.current.length - 1; i >= 0; i--) {
            const tabValue = tabOrder.current[i];
            const tabRef = tabRefs.current.get(tabValue);
            if (tabRef && !tabRef.disabled) {
              focusTab(tabRef);
              break;
            }
          }
          break;
      }
    },
    default: undefined,
  });

  const webProps = Platform.select({
    web: {
      onKeyDown: handleKeyDown,
      tabIndex: (isSelected ? 0 : -1) as 0 | -1,
    },
    default: {},
  });

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
      ref={triggerRef}
      onPress={handlePress}
      onLayout={handleLayout}
      disabled={disabled}
      style={triggerStyle}
      accessibilityRole="tab"
      accessibilityState={{ selected: isSelected, disabled }}
      {...webProps}
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
    <View style={[styles.content, style]} accessibilityRole={'tabpanel' as AccessibilityRole}>
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
    minHeight: TOUCH_TARGET, // Platform-aware: 44pt iOS, 48dp Android, 36px Web
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    zIndex: 1,
  },
  triggerPill: {
    minHeight: TOUCH_TARGET, // Platform-aware: 44pt iOS, 48dp Android, 36px Web
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    zIndex: 1,
  },
  triggerUnderline: {
    minHeight: TOUCH_TARGET, // Platform-aware: 44pt iOS, 48dp Android, 36px Web
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
  // Glass mode styles
  glassList: {
    flexDirection: 'row',
    padding: spacing[1],
    position: 'relative',
  },
  glassListPills: {
    flexDirection: 'row',
    gap: spacing[1],
    position: 'relative',
  },
  glassIndicator: {
    position: 'absolute',
    top: spacing[1],
    bottom: spacing[1],
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: radius.sm,
  },
  glassIndicatorPill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});
