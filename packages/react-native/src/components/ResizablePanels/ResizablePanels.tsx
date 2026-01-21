import React, { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Pressable,
  PanResponder,
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { isNative } from '../../utils/platform';

// Handle visual width (can be small) vs touch area (hitSlop provides the touch target)
const HANDLE_VISUAL_WIDTH = 8;
// Padding for native touch area on each side of the handle
const HANDLE_HIT_PADDING = Platform.select({ ios: 18, android: 20, default: 0 }) as number;

// ============================================================================
// Types
// ============================================================================

export interface ResizablePanelsContextValue {
  /** Direction of the panels */
  direction: 'horizontal' | 'vertical';
  /** Current sizes of all panels (percentages) */
  sizes: number[];
  /** Update a panel size */
  updateSize: (index: number, delta: number) => void;
  /** Total container dimension */
  containerDimension: number;
  /** Set container dimension */
  setContainerDimension: (dimension: number) => void;
  /** Collapsed panels */
  collapsedPanels: Set<number>;
  /** Toggle panel collapse */
  toggleCollapse: (index: number) => void;
}

export interface ResizablePanelsProps {
  /** Direction of the panels */
  direction?: 'horizontal' | 'vertical';
  /** Panel children */
  children: React.ReactNode;
  /** Called when layout changes */
  onLayoutChange?: (sizes: number[]) => void;
  /** Additional container styles */
  style?: ViewStyle;
}

export interface ResizablePanelProps {
  /** Default size (percentage) */
  defaultSize?: number;
  /** Minimum size (percentage) */
  minSize?: number;
  /** Maximum size (percentage) */
  maxSize?: number;
  /** Whether panel can be collapsed */
  collapsible?: boolean;
  /** Panel content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface ResizableHandleProps {
  /** Show visible grip indicator */
  withHandle?: boolean;
  /** Disable resizing */
  disabled?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

const ResizablePanelsContext = createContext<ResizablePanelsContextValue | null>(null);

function useResizablePanels() {
  const context = useContext(ResizablePanelsContext);
  if (!context) {
    throw new Error('ResizablePanel components must be used within ResizablePanels');
  }
  return context;
}

// ============================================================================
// Internal State Management
// ============================================================================

interface PanelConfig {
  defaultSize: number;
  minSize: number;
  maxSize: number;
  collapsible: boolean;
}

// ============================================================================
// ResizablePanels (Root)
// ============================================================================

export function ResizablePanels({
  direction = 'horizontal',
  children,
  onLayoutChange,
  style,
}: ResizablePanelsProps) {
  const [containerDimension, setContainerDimension] = useState(0);
  const [collapsedPanels, setCollapsedPanels] = useState<Set<number>>(new Set());
  const panelConfigsRef = useRef<PanelConfig[]>([]);

  // Extract panel configs from children
  const childArray = React.Children.toArray(children);
  const panelChildren = childArray.filter(
    (child) => React.isValidElement(child) && (child.type === ResizablePanel || child.type === ResizableHandle)
  );

  // Count panels (not handles)
  const panelCount = panelChildren.filter(
    (child) => React.isValidElement(child) && child.type === ResizablePanel
  ).length;

  // Initialize sizes based on panel configs
  const [sizes, setSizes] = useState<number[]>(() => {
    const defaultSize = 100 / panelCount;
    return Array(panelCount).fill(defaultSize);
  });

  const updateSize = useCallback((handleIndex: number, delta: number) => {
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      const deltaPercent = (delta / containerDimension) * 100;

      // Get the two panels on either side of the handle
      const leftIndex = handleIndex;
      const rightIndex = handleIndex + 1;

      if (leftIndex < 0 || rightIndex >= newSizes.length) return prevSizes;

      const leftConfig = panelConfigsRef.current[leftIndex] || { minSize: 10, maxSize: 90 };
      const rightConfig = panelConfigsRef.current[rightIndex] || { minSize: 10, maxSize: 90 };

      // Calculate new sizes
      let newLeftSize = newSizes[leftIndex] + deltaPercent;
      let newRightSize = newSizes[rightIndex] - deltaPercent;

      // Apply constraints
      if (newLeftSize < leftConfig.minSize) {
        newLeftSize = leftConfig.minSize;
        newRightSize = newSizes[leftIndex] + newSizes[rightIndex] - leftConfig.minSize;
      }
      if (newLeftSize > leftConfig.maxSize) {
        newLeftSize = leftConfig.maxSize;
        newRightSize = newSizes[leftIndex] + newSizes[rightIndex] - leftConfig.maxSize;
      }
      if (newRightSize < rightConfig.minSize) {
        newRightSize = rightConfig.minSize;
        newLeftSize = newSizes[leftIndex] + newSizes[rightIndex] - rightConfig.minSize;
      }
      if (newRightSize > rightConfig.maxSize) {
        newRightSize = rightConfig.maxSize;
        newLeftSize = newSizes[leftIndex] + newSizes[rightIndex] - rightConfig.maxSize;
      }

      newSizes[leftIndex] = newLeftSize;
      newSizes[rightIndex] = newRightSize;

      return newSizes;
    });
  }, [containerDimension]);

  const toggleCollapse = useCallback((index: number) => {
    setCollapsedPanels((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  // Notify on layout change
  React.useEffect(() => {
    onLayoutChange?.(sizes);
  }, [sizes, onLayoutChange]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerDimension(direction === 'horizontal' ? width : height);
  }, [direction]);

  const contextValue = useMemo<ResizablePanelsContextValue>(() => ({
    direction,
    sizes,
    updateSize,
    containerDimension,
    setContainerDimension,
    collapsedPanels,
    toggleCollapse,
  }), [direction, sizes, updateSize, containerDimension, collapsedPanels, toggleCollapse]);

  // Register panel config
  const registerPanelConfig = useCallback((index: number, config: PanelConfig) => {
    panelConfigsRef.current[index] = config;
  }, []);

  // Clone children to inject props
  let panelIndex = 0;
  let handleIndex = 0;
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (child.type === ResizablePanel) {
      const currentIndex = panelIndex++;
      return React.cloneElement(child as React.ReactElement<any>, {
        _index: currentIndex,
        _registerConfig: registerPanelConfig,
      });
    }

    if (child.type === ResizableHandle) {
      const currentIndex = handleIndex++;
      return React.cloneElement(child as React.ReactElement<any>, {
        _index: currentIndex,
      });
    }

    return child;
  });

  return (
    <ResizablePanelsContext.Provider value={contextValue}>
      <View
        style={[
          styles.container,
          direction === 'horizontal' ? styles.horizontal : styles.vertical,
          style,
        ]}
        onLayout={handleLayout}
      >
        {enhancedChildren}
      </View>
    </ResizablePanelsContext.Provider>
  );
}

// ============================================================================
// ResizablePanel
// ============================================================================

interface ResizablePanelInternalProps extends ResizablePanelProps {
  _index?: number;
  _registerConfig?: (index: number, config: PanelConfig) => void;
}

export function ResizablePanel({
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  collapsible = false,
  children,
  style,
  _index = 0,
  _registerConfig,
}: ResizablePanelInternalProps) {
  const { direction, sizes, collapsedPanels } = useResizablePanels();

  // Register config on mount
  React.useEffect(() => {
    _registerConfig?.(_index, { defaultSize, minSize, maxSize, collapsible });
  }, [_index, defaultSize, minSize, maxSize, collapsible, _registerConfig]);

  const isCollapsed = collapsedPanels.has(_index);
  const size = isCollapsed ? 0 : (sizes[_index] || defaultSize);

  const panelStyle: ViewStyle = direction === 'horizontal'
    ? { width: `${size}%` as any, height: '100%' }
    : { height: `${size}%` as any, width: '100%' };

  if (isCollapsed) {
    return null;
  }

  return (
    <View style={[styles.panel, panelStyle, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// ResizableHandle
// ============================================================================

interface ResizableHandleInternalProps extends ResizableHandleProps {
  _index?: number;
}

export function ResizableHandle({
  withHandle = true,
  disabled = false,
  style,
  _index = 0,
}: ResizableHandleInternalProps) {
  const { direction, updateSize } = useResizablePanels();
  const [isDragging, setIsDragging] = useState(false);
  const lastPositionRef = useRef(0);

  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    onPanResponderGrant: (evt) => {
      setIsDragging(true);
      lastPositionRef.current = direction === 'horizontal'
        ? evt.nativeEvent.pageX
        : evt.nativeEvent.pageY;
    },
    onPanResponderMove: (evt) => {
      const currentPosition = direction === 'horizontal'
        ? evt.nativeEvent.pageX
        : evt.nativeEvent.pageY;
      const delta = currentPosition - lastPositionRef.current;
      updateSize(_index, delta);
      lastPositionRef.current = currentPosition;
    },
    onPanResponderRelease: () => {
      setIsDragging(false);
    },
    onPanResponderTerminate: () => {
      setIsDragging(false);
    },
  }), [direction, disabled, updateSize, _index]);

  const handleStyle: ViewStyle = direction === 'horizontal'
    ? styles.handleHorizontal
    : styles.handleVertical;

  const gripStyle: ViewStyle = direction === 'horizontal'
    ? styles.gripHorizontal
    : styles.gripVertical;

  // For native, use hitSlop to expand touch area without changing visual size
  const hitSlop = isNative
    ? direction === 'horizontal'
      ? { top: 0, bottom: 0, left: HANDLE_HIT_PADDING, right: HANDLE_HIT_PADDING }
      : { top: HANDLE_HIT_PADDING, bottom: HANDLE_HIT_PADDING, left: 0, right: 0 }
    : undefined;

  return (
    <View
      {...panResponder.panHandlers}
      hitSlop={hitSlop}
      style={[
        styles.handle,
        handleStyle,
        isDragging && styles.handleDragging,
        disabled && styles.handleDisabled,
        style,
      ]}
    >
      {withHandle && (
        <View style={[styles.grip, gripStyle]}>
          <View style={[styles.gripDot, direction === 'horizontal' ? styles.gripDotHorizontal : styles.gripDotVertical]} />
          <View style={[styles.gripDot, direction === 'horizontal' ? styles.gripDotHorizontal : styles.gripDotVertical]} />
          <View style={[styles.gripDot, direction === 'horizontal' ? styles.gripDotHorizontal : styles.gripDotVertical]} />
        </View>
      )}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  panel: {
    overflow: 'hidden',
  },
  handle: {
    backgroundColor: colors.border.default,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  handleHorizontal: {
    width: 8,
    height: '100%',
    cursor: 'col-resize' as any,
  },
  handleVertical: {
    height: 8,
    width: '100%',
    cursor: 'row-resize' as any,
  },
  handleDragging: {
    backgroundColor: colors.accent.blue.DEFAULT,
  },
  handleDisabled: {
    opacity: 0.4,
    cursor: 'default' as any,
  },
  grip: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gripHorizontal: {
    flexDirection: 'column',
    gap: 2,
  },
  gripVertical: {
    flexDirection: 'row',
    gap: 2,
  },
  gripDot: {
    backgroundColor: colors.text.muted,
    borderRadius: 1,
  },
  gripDotHorizontal: {
    width: 3,
    height: 3,
  },
  gripDotVertical: {
    width: 3,
    height: 3,
  },
});

// ============================================================================
// Exports
// ============================================================================

export { useResizablePanels };
