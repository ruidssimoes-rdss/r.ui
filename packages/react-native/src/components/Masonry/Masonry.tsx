import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// ============================================================================
// Types
// ============================================================================

export type ResponsiveColumns = number | { sm?: number; md?: number; lg?: number };

export interface MasonryProps {
  /** Number of columns (or responsive object) */
  columns?: ResponsiveColumns;
  /** Gap between items */
  gap?: number;
  /** Children items */
  children: React.ReactNode;
  /** Called when scroll reaches end */
  onEndReached?: () => void;
  /** Threshold for triggering onEndReached (0-1) */
  onEndReachedThreshold?: number;
  /** Additional container styles */
  style?: ViewStyle;
  /** Content container styles */
  contentContainerStyle?: ViewStyle;
}

export interface MasonryItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Index for staggered animation */
  index?: number;
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Helper Functions
// ============================================================================

function resolveColumns(columns: ResponsiveColumns, containerWidth: number): number {
  if (typeof columns === 'number') {
    return columns;
  }

  // Simple responsive breakpoints
  if (containerWidth >= 1024 && columns.lg !== undefined) {
    return columns.lg;
  }
  if (containerWidth >= 768 && columns.md !== undefined) {
    return columns.md;
  }
  if (columns.sm !== undefined) {
    return columns.sm;
  }

  // Default fallbacks
  return columns.md || columns.lg || columns.sm || 3;
}

function distributeItemsToColumns<T>(items: T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);

  // Simple round-robin distribution
  items.forEach((item, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(item);
  });

  return columns;
}

// ============================================================================
// Masonry
// ============================================================================

export function Masonry({
  columns = 3,
  gap = spacing[4],
  children,
  onEndReached,
  onEndReachedThreshold = 0.1,
  style,
  contentContainerStyle,
}: MasonryProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const hasTriggeredEndReached = useRef(false);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!onEndReached) return;

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
    const threshold = contentSize.height * onEndReachedThreshold;

    if (paddingToBottom <= threshold && !hasTriggeredEndReached.current) {
      hasTriggeredEndReached.current = true;
      onEndReached();
    } else if (paddingToBottom > threshold) {
      hasTriggeredEndReached.current = false;
    }
  }, [onEndReached, onEndReachedThreshold]);

  const columnCount = useMemo(() =>
    resolveColumns(columns, containerWidth),
    [columns, containerWidth]
  );

  // Convert children to array
  const childArray = React.Children.toArray(children);

  // Distribute items across columns
  const columnItems = useMemo(() =>
    distributeItemsToColumns(childArray, columnCount),
    [childArray, columnCount]
  );

  // Calculate column width
  const columnWidth = containerWidth > 0
    ? (containerWidth - (gap * (columnCount - 1))) / columnCount
    : 'auto';

  // Use CSS Grid on web for better performance
  if (Platform.OS === 'web') {
    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={contentContainerStyle}
        onLayout={handleLayout}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View
          style={[
            styles.webGrid,
            {
              display: 'grid' as any,
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
              gap: gap,
            } as any,
          ]}
        >
          {childArray.map((child, index) => (
            <View key={index} style={styles.webGridItem}>
              {child}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  // Flexbox fallback for native
  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={contentContainerStyle}
      onLayout={handleLayout}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={[styles.columnsContainer, { gap }]}>
        {columnItems.map((columnChildren, columnIndex) => (
          <View
            key={columnIndex}
            style={[
              styles.column,
              { width: columnWidth, gap },
            ]}
          >
            {columnChildren}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ============================================================================
// MasonryItem
// ============================================================================

export function MasonryItem({
  children,
  index = 0,
  style,
}: MasonryItemProps) {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const baseStyles = {
  container: {
    flex: 1,
  },
  columnsContainer: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
  },
  column: {
    flexDirection: 'column' as const,
  },
  item: {
    overflow: 'hidden' as const,
  },
  webGrid: {
    width: '100%',
  },
  webGridItem: {
    breakInside: 'avoid',
  },
};

const styles = StyleSheet.create(baseStyles as any);
