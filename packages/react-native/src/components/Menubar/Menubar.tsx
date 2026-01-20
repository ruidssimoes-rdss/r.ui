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
  Modal,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

// Types
export type MenubarOrientation = 'horizontal' | 'vertical';

export interface MenubarProps {
  orientation?: MenubarOrientation;
  children?: ReactNode;
  style?: ViewStyle;
}

export interface MenubarMenuProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface MenubarTriggerProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface MenubarContentProps {
  children?: ReactNode;
  style?: ViewStyle;
  align?: 'start' | 'center' | 'end';
}

export interface MenubarItemProps {
  children?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  shortcut?: string;
  style?: ViewStyle;
}

export interface MenubarSeparatorProps {
  style?: ViewStyle;
}

export interface MenubarCheckboxItemProps {
  children?: ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  shortcut?: string;
  style?: ViewStyle;
}

export interface MenubarRadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}

export interface MenubarRadioItemProps {
  value: string;
  children?: ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

// Contexts
interface MenubarContextValue {
  activeMenu: string | null;
  setActiveMenu: (id: string | null) => void;
}

const MenubarContext = createContext<MenubarContextValue | undefined>(undefined);

interface MenubarMenuContextValue {
  menuId: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const MenubarMenuContext = createContext<MenubarMenuContextValue | undefined>(undefined);

interface MenubarRadioGroupContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

const MenubarRadioGroupContext = createContext<MenubarRadioGroupContextValue | undefined>(undefined);

// Generate unique IDs
let menuIdCounter = 0;
const generateMenuId = () => `menubar-menu-${++menuIdCounter}`;

// MenubarTrigger
export function MenubarTrigger({ children, style }: MenubarTriggerProps) {
  const context = useContext(MenubarMenuContext);

  if (!context) {
    throw new Error('MenubarTrigger must be used within MenubarMenu');
  }

  const { isOpen, open, close } = context;

  const handlePress = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.trigger,
        isOpen && styles.triggerActive,
        pressed && styles.triggerPressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen }}
    >
      {typeof children === 'string' ? (
        <Text style={styles.triggerText}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

// MenubarContent
export function MenubarContent({
  children,
  style,
  align = 'start',
}: MenubarContentProps) {
  const context = useContext(MenubarMenuContext);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  if (!context) {
    throw new Error('MenubarContent must be used within MenubarMenu');
  }

  const { isOpen, close } = context;

  React.useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 300,
          friction: 20,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacityAnim.setValue(0);
      scaleAnim.setValue(0.95);
    }
  }, [isOpen, opacityAnim, scaleAnim]);

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={close}
    >
      <Pressable accessibilityRole="button" style={styles.overlay} onPress={close}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
            style,
          ]}
        >
          <Pressable accessibilityRole="button" onPress={(e) => e.stopPropagation()}>
            {children}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

// MenubarItem
export function MenubarItem({
  children,
  onPress,
  disabled = false,
  shortcut,
  style,
}: MenubarItemProps) {
  const context = useContext(MenubarMenuContext);

  const handlePress = useCallback(() => {
    if (!disabled && onPress) {
      onPress();
      context?.close();
    }
  }, [disabled, onPress, context]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.item,
        pressed && !disabled && styles.itemPressed,
        disabled && styles.itemDisabled,
        style,
      ]}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled }}
    >
      <View style={styles.itemContent}>
        {typeof children === 'string' ? (
          <Text style={[styles.itemText, disabled && styles.itemTextDisabled]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      {shortcut && (
        <Text style={styles.shortcut}>{shortcut}</Text>
      )}
    </Pressable>
  );
}

// MenubarSeparator
export function MenubarSeparator({ style }: MenubarSeparatorProps) {
  return <View style={[styles.separator, style]} />;
}

// MenubarCheckboxItem
export function MenubarCheckboxItem({
  children,
  checked = false,
  onCheckedChange,
  disabled = false,
  shortcut,
  style,
}: MenubarCheckboxItemProps) {
  const context = useContext(MenubarMenuContext);

  const handlePress = useCallback(() => {
    if (!disabled) {
      onCheckedChange?.(!checked);
      context?.close();
    }
  }, [disabled, checked, onCheckedChange, context]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.item,
        pressed && !disabled && styles.itemPressed,
        disabled && styles.itemDisabled,
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <View style={styles.checkboxIndicator}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <View style={styles.itemContent}>
        {typeof children === 'string' ? (
          <Text style={[styles.itemText, disabled && styles.itemTextDisabled]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      {shortcut && (
        <Text style={styles.shortcut}>{shortcut}</Text>
      )}
    </Pressable>
  );
}

// MenubarRadioGroup
export function MenubarRadioGroup({
  value,
  onValueChange,
  children,
}: MenubarRadioGroupProps) {
  const handleValueChange = useCallback(
    (newValue: string) => {
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  return (
    <MenubarRadioGroupContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View accessibilityRole="radiogroup">
        {children}
      </View>
    </MenubarRadioGroupContext.Provider>
  );
}

// MenubarRadioItem
export function MenubarRadioItem({
  value,
  children,
  disabled = false,
  style,
}: MenubarRadioItemProps) {
  const context = useContext(MenubarMenuContext);
  const radioContext = useContext(MenubarRadioGroupContext);

  if (!radioContext) {
    throw new Error('MenubarRadioItem must be used within MenubarRadioGroup');
  }

  const isSelected = radioContext.value === value;

  const handlePress = useCallback(() => {
    if (!disabled) {
      radioContext.onValueChange(value);
      context?.close();
    }
  }, [disabled, value, radioContext, context]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.item,
        pressed && !disabled && styles.itemPressed,
        disabled && styles.itemDisabled,
        style,
      ]}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled }}
    >
      <View style={styles.radioIndicator}>
        {isSelected && <View style={styles.radioDot} />}
      </View>
      <View style={styles.itemContent}>
        {typeof children === 'string' ? (
          <Text style={[styles.itemText, disabled && styles.itemTextDisabled]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </Pressable>
  );
}

// MenubarMenu
export function MenubarMenu({ children, style }: MenubarMenuProps) {
  const context = useContext(MenubarContext);
  const [menuId] = useState(generateMenuId);

  if (!context) {
    throw new Error('MenubarMenu must be used within Menubar');
  }

  const { activeMenu, setActiveMenu } = context;
  const isOpen = activeMenu === menuId;

  const open = useCallback(() => {
    setActiveMenu(menuId);
  }, [menuId, setActiveMenu]);

  const close = useCallback(() => {
    setActiveMenu(null);
  }, [setActiveMenu]);

  return (
    <MenubarMenuContext.Provider value={{ menuId, isOpen, open, close }}>
      <View style={[styles.menu, style]}>
        {children}
      </View>
    </MenubarMenuContext.Provider>
  );
}

// Main Menubar Component
export function Menubar({
  orientation = 'horizontal',
  children,
  style,
}: MenubarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
      <View
        style={[
          styles.menubar,
          orientation === 'vertical' && styles.menubarVertical,
          style,
        ]}
        accessibilityRole="menubar"
      >
        {children}
      </View>
    </MenubarContext.Provider>
  );
}

const styles = StyleSheet.create({
  menubar: {
    flexDirection: 'row',
    backgroundColor: colors.bg.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[1],
  },
  menubarVertical: {
    flexDirection: 'column',
  },
  menu: {
    position: 'relative',
  },
  trigger: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.sm,
  },
  triggerActive: {
    backgroundColor: colors.bg.elevated,
  },
  triggerPressed: {
    backgroundColor: colors.bg.elevated,
  },
  triggerText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  overlay: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: spacing[4],
  },
  content: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[1],
    minWidth: 200,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[2],
    borderRadius: radius.sm,
    gap: spacing[2],
  },
  itemPressed: {
    backgroundColor: colors.bg.surface,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    color: colors.text.primary,
    fontSize: 14,
  },
  itemTextDisabled: {
    color: colors.text.muted,
  },
  shortcut: {
    color: colors.text.muted,
    fontSize: 12,
    marginLeft: spacing[4],
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.default,
    marginVertical: spacing[1],
    marginHorizontal: spacing[2],
  },
  checkboxIndicator: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: colors.text.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  radioIndicator: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent.blue.DEFAULT,
  },
});
