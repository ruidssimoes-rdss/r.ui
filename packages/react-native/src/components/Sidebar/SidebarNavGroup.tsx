import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { useSidebar } from './SidebarContext';
import { TOUCH_TARGET, isNative } from '../../utils/platform';

// ============================================================================
// Types
// ============================================================================

export interface SidebarNavGroupProps {
  /** Group label */
  label: string;
  /** Leading icon */
  icon?: React.ReactNode;
  /** Group items */
  children: React.ReactNode;
  /** Whether the group is expanded by default */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Called when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  /** Additional container styles */
  style?: ViewStyle;
  /** Additional label styles */
  labelStyle?: TextStyle;
}

// ============================================================================
// Component
// ============================================================================

export function SidebarNavGroup({
  label,
  icon,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  style,
  labelStyle,
}: SidebarNavGroupProps) {
  const { collapsed } = useSidebar();
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    onExpandedChange?.(newExpanded);
  };

  // When collapsed, just show the icon
  if (collapsed) {
    return (
      <View style={[styles.group, style]}>
        {icon && (
          <Pressable
            style={styles.triggerCollapsed}
            accessibilityRole="button"
            accessibilityLabel={label}
          >
            {icon}
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.group, style]}>
      <Pressable
        onPress={toggleExpanded}
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.triggerPressed,
        ]}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.label, labelStyle]} numberOfLines={1}>
          {label}
        </Text>
        <ChevronIcon expanded={isExpanded} />
      </Pressable>

      {isExpanded && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

// ============================================================================
// Chevron Icon
// ============================================================================

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <View style={[iconStyles.chevron, expanded && iconStyles.chevronExpanded]} />
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  group: {
    marginVertical: spacing[1],
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    borderRadius: radius.md,
    // Ensure minimum touch target on native platforms
    minHeight: isNative ? TOUCH_TARGET : undefined,
  },
  triggerPressed: {
    backgroundColor: colors.bg.elevated,
  },
  triggerCollapsed: {
    padding: spacing[2],
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    // Ensure minimum touch target when collapsed
    minWidth: isNative ? TOUCH_TARGET : undefined,
    minHeight: isNative ? TOUCH_TARGET : undefined,
  },
  icon: {
    marginRight: spacing[3],
  },
  label: {
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
  },
  content: {
    paddingLeft: spacing[6],
    marginTop: spacing[1],
  },
});

const iconStyles = StyleSheet.create({
  chevron: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.text.muted,
    transform: [{ rotate: '45deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '-135deg' }, { translateY: 2 }],
  },
});
