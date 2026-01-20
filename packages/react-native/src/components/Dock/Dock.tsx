import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';

// ============================================================================
// Types
// ============================================================================

export interface DockContextValue {
  /** Position of the dock */
  position: 'bottom' | 'left' | 'right';
  /** Whether magnification is enabled */
  magnification: boolean;
  /** Magnification scale */
  magnificationScale: number;
  /** Currently hovered item index */
  hoveredIndex: number | null;
  /** Set hovered index */
  setHoveredIndex: (index: number | null) => void;
  /** Auto-hide enabled */
  autoHide: boolean;
  /** Whether dock is visible (for auto-hide) */
  isVisible: boolean;
  /** Show dock */
  showDock: () => void;
  /** Hide dock */
  hideDock: () => void;
}

export interface DockProps {
  /** Position of the dock */
  position?: 'bottom' | 'left' | 'right';
  /** Enable magnification effect */
  magnification?: boolean;
  /** Magnification scale (default: 1.5) */
  magnificationScale?: number;
  /** Auto-hide the dock */
  autoHide?: boolean;
  /** Dock items */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DockItemProps {
  /** Icon to display */
  icon: React.ReactNode;
  /** Label for tooltip */
  label: string;
  /** Badge count or text */
  badge?: number | string;
  /** Active state */
  active?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DockSeparatorProps {
  /** Additional styles */
  style?: ViewStyle;
}

export interface DockTooltipProps {
  /** Label to display */
  label: string;
  /** Whether tooltip is visible */
  visible: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

const DockContext = createContext<DockContextValue | null>(null);

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('Dock components must be used within Dock');
  }
  return context;
}

// ============================================================================
// Dock (Root)
// ============================================================================

export function Dock({
  position = 'bottom',
  magnification = true,
  magnificationScale = 1.5,
  autoHide = false,
  children,
  style,
}: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(!autoHide);

  const showDock = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideDock = useCallback(() => {
    if (autoHide) {
      setIsVisible(false);
    }
  }, [autoHide]);

  const contextValue = useMemo<DockContextValue>(() => ({
    position,
    magnification,
    magnificationScale,
    hoveredIndex,
    setHoveredIndex,
    autoHide,
    isVisible,
    showDock,
    hideDock,
  }), [position, magnification, magnificationScale, hoveredIndex, autoHide, isVisible, showDock, hideDock]);

  // Index items
  let itemIndex = 0;
  const indexedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === DockItem) {
      const currentIndex = itemIndex++;
      return React.cloneElement(child as React.ReactElement<any>, {
        _index: currentIndex,
      });
    }
    return child;
  });

  const positionStyle = getPositionStyle(position);

  if (autoHide && !isVisible) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Show dock"
        style={[styles.autoHideTrigger, positionStyle.trigger]}
        onPressIn={showDock}
      />
    );
  }

  return (
    <DockContext.Provider value={contextValue}>
      <View
        style={[
          styles.container,
          positionStyle.container,
          style,
        ]}
        onPointerLeave={() => {
          setHoveredIndex(null);
          hideDock();
        }}
      >
        <View style={[styles.dock, positionStyle.dock]}>
          {indexedChildren}
        </View>
      </View>
    </DockContext.Provider>
  );
}

// ============================================================================
// DockItem
// ============================================================================

interface DockItemInternalProps extends DockItemProps {
  _index?: number;
}

export function DockItem({
  icon,
  label,
  badge,
  active = false,
  onPress,
  style,
  _index = 0,
}: DockItemInternalProps) {
  const { position, magnification, magnificationScale, hoveredIndex, setHoveredIndex } = useDock();
  const [showTooltip, setShowTooltip] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Calculate scale based on distance from hovered item
  const getScale = () => {
    if (!magnification || hoveredIndex === null) return 1;
    const distance = Math.abs(_index - hoveredIndex);
    if (distance === 0) return magnificationScale;
    if (distance === 1) return 1 + (magnificationScale - 1) * 0.5;
    if (distance === 2) return 1 + (magnificationScale - 1) * 0.2;
    return 1;
  };

  const scale = getScale();

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: scale,
      useNativeDriver: true,
      tension: 300,
      friction: 15,
    }).start();
  }, [scale, scaleAnim]);

  const handlePointerEnter = () => {
    setHoveredIndex(_index);
    setShowTooltip(true);
  };

  const handlePointerLeave = () => {
    setShowTooltip(false);
  };

  const isVertical = position === 'left' || position === 'right';

  return (
    <View style={styles.itemWrapper}>
      {showTooltip && (
        <DockTooltip
          label={label}
          visible={showTooltip}
          style={getTooltipPosition(position)}
        />
      )}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={[styles.itemContainer, style]}
      >
        <Animated.View
          style={[
            styles.item,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          {icon}
          {badge !== undefined && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {typeof badge === 'number' && badge > 99 ? '99+' : badge}
              </Text>
            </View>
          )}
        </Animated.View>
        {active && (
          <View style={[
            styles.activeIndicator,
            isVertical ? styles.activeIndicatorVertical : styles.activeIndicatorHorizontal,
          ]} />
        )}
      </Pressable>
    </View>
  );
}

// ============================================================================
// DockSeparator
// ============================================================================

export function DockSeparator({ style }: DockSeparatorProps) {
  const { position } = useDock();
  const isVertical = position === 'left' || position === 'right';

  return (
    <View
      style={[
        styles.separator,
        isVertical ? styles.separatorVertical : styles.separatorHorizontal,
        style,
      ]}
    />
  );
}

// ============================================================================
// DockTooltip
// ============================================================================

export function DockTooltip({ label, visible, style }: DockTooltipProps) {
  if (!visible) return null;

  return (
    <View style={[styles.tooltip, style]}>
      <Text style={styles.tooltipText}>{label}</Text>
    </View>
  );
}

// ============================================================================
// Helper Functions
// ============================================================================

function getPositionStyle(position: 'bottom' | 'left' | 'right') {
  switch (position) {
    case 'left':
      return {
        container: styles.containerLeft,
        dock: styles.dockVertical,
        trigger: styles.triggerLeft,
      };
    case 'right':
      return {
        container: styles.containerRight,
        dock: styles.dockVertical,
        trigger: styles.triggerRight,
      };
    default:
      return {
        container: styles.containerBottom,
        dock: styles.dockHorizontal,
        trigger: styles.triggerBottom,
      };
  }
}

function getTooltipPosition(position: 'bottom' | 'left' | 'right'): ViewStyle {
  switch (position) {
    case 'left':
      return { right: '100%', marginRight: spacing[2] };
    case 'right':
      return { left: '100%', marginLeft: spacing[2] };
    default:
      return { bottom: '100%', marginBottom: spacing[2] };
  }
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBottom: {
    bottom: spacing[4],
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  containerLeft: {
    left: spacing[4],
    top: 0,
    bottom: 0,
    flexDirection: 'column',
  },
  containerRight: {
    right: spacing[4],
    top: 0,
    bottom: 0,
    flexDirection: 'column',
  },
  dock: {
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[2],
    gap: spacing[1],
    ...(Platform.OS === 'web' ? {
      backdropFilter: 'blur(20px)',
    } : {}),
  },
  dockHorizontal: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dockVertical: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemWrapper: {
    position: 'relative',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.bg.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.semantic.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontFamily: fontFamilies.mono,
    fontSize: 10,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.white,
  },
  activeIndicator: {
    backgroundColor: colors.text.primary,
    borderRadius: 2,
  },
  activeIndicatorHorizontal: {
    width: 4,
    height: 4,
    marginTop: spacing[1],
  },
  activeIndicatorVertical: {
    width: 4,
    height: 4,
    marginLeft: spacing[1],
  },
  separator: {
    backgroundColor: colors.border.default,
  },
  separatorHorizontal: {
    width: 1,
    height: 32,
    marginHorizontal: spacing[1],
  },
  separatorVertical: {
    height: 1,
    width: 32,
    marginVertical: spacing[1],
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.md,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    borderWidth: 1,
    borderColor: colors.border.default,
    zIndex: 100,
  },
  tooltipText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as TextStyle['fontWeight'],
    color: colors.text.primary,
    whiteSpace: 'nowrap' as any,
  },
  autoHideTrigger: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  triggerBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 8,
  },
  triggerLeft: {
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
  },
  triggerRight: {
    right: 0,
    top: 0,
    bottom: 0,
    width: 8,
  },
});

// ============================================================================
// Exports
// ============================================================================

export { useDock };
