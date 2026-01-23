import React, { Children, isValidElement, cloneElement } from 'react';
import { View, StyleSheet, ViewStyle, Platform, useWindowDimensions } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

// ============================================================================
// Types
// ============================================================================

export type ResponsiveValue<T> = T | { sm?: T; md?: T; lg?: T };

export interface BentoGridProps {
  /** Number of columns (or responsive object) */
  columns?: ResponsiveValue<number>;
  /** Gap between items (in spacing units) */
  gap?: number;
  /** Children (BentoGridItem components) */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

export interface BentoGridItemProps {
  /** Number of columns to span (or responsive object) */
  colSpan?: ResponsiveValue<number>;
  /** Number of rows to span */
  rowSpan?: number;
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
  /** Internal: grid columns for calculation */
  _gridColumns?: number;
  /** Internal: gap for calculation */
  _gap?: number;
}

// ============================================================================
// Helpers
// ============================================================================

function getBreakpoint(width: number): 'sm' | 'md' | 'lg' {
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  return 'sm';
}

function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  breakpoint: 'sm' | 'md' | 'lg',
  defaultValue: T
): T {
  if (value === undefined) return defaultValue;
  if (typeof value === 'object' && value !== null && ('sm' in value || 'md' in value || 'lg' in value)) {
    const responsive = value as { sm?: T; md?: T; lg?: T };
    // Fall through to smaller breakpoints if not defined
    if (breakpoint === 'lg') {
      return responsive.lg ?? responsive.md ?? responsive.sm ?? defaultValue;
    }
    if (breakpoint === 'md') {
      return responsive.md ?? responsive.sm ?? defaultValue;
    }
    return responsive.sm ?? defaultValue;
  }
  return value as T;
}

// ============================================================================
// Root Component
// ============================================================================

export function BentoGrid({
  columns = 3,
  gap = 4,
  children,
  style,
}: BentoGridProps) {
  const { width } = useWindowDimensions();
  const breakpoint = getBreakpoint(width);
  const resolvedColumns = resolveResponsiveValue(columns, breakpoint, 3);
  const gapValue = spacing[gap as keyof typeof spacing] || gap;

  // On web, use CSS Grid if available
  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          styles.gridWeb,
          {
            display: 'grid',
            gridTemplateColumns: `repeat(${resolvedColumns}, 1fr)`,
            gap: gapValue,
          } as any,
          style,
        ]}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child as React.ReactElement<BentoGridItemProps>, {
              _gridColumns: resolvedColumns,
              _gap: gapValue,
            });
          }
          return child;
        })}
      </View>
    );
  }

  // On native, use flexbox-based layout
  // Build rows based on column spans
  const rows: React.ReactNode[][] = [];
  let currentRow: React.ReactNode[] = [];
  let currentColCount = 0;

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const childProps = child.props as BentoGridItemProps;
      const colSpan = resolveResponsiveValue(childProps.colSpan, breakpoint, 1);

      if (currentColCount + colSpan > resolvedColumns) {
        // Start a new row
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentColCount = 0;
      }

      currentRow.push(
        cloneElement(child as React.ReactElement<BentoGridItemProps>, {
          _gridColumns: resolvedColumns,
          _gap: gapValue,
        })
      );
      currentColCount += colSpan;

      if (currentColCount >= resolvedColumns) {
        rows.push(currentRow);
        currentRow = [];
        currentColCount = 0;
      }
    }
  });

  // Push any remaining items
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return (
    <View style={[styles.gridNative, style]}>
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.row,
            { marginBottom: rowIndex < rows.length - 1 ? gapValue : 0 },
          ]}
        >
          {row.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              {itemIndex > 0 && <View style={{ width: gapValue }} />}
              {item}
            </React.Fragment>
          ))}
        </View>
      ))}
    </View>
  );
}

// ============================================================================
// Item Component
// ============================================================================

export function BentoGridItem({
  colSpan = 1,
  rowSpan = 1,
  children,
  style,
  _gridColumns = 3,
  _gap = 16,
}: BentoGridItemProps) {
  const { width } = useWindowDimensions();
  const breakpoint = getBreakpoint(width);
  const resolvedColSpan = resolveResponsiveValue(colSpan, breakpoint, 1);

  // On web, use CSS Grid properties
  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          styles.item,
          {
            // @ts-ignore - web-only style
            gridColumn: `span ${resolvedColSpan}`,
            gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  // On native, calculate flex basis
  // Account for gaps: totalGaps = (columns - 1) * gap
  // itemWidth = (totalWidth - totalGaps) / columns * colSpan + (colSpan - 1) * gap
  const flexBasis = `${(resolvedColSpan / _gridColumns) * 100}%`;

  return (
    <View
      style={[
        styles.item,
        {
          flex: resolvedColSpan,
          minHeight: rowSpan > 1 ? rowSpan * 100 : undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  gridWeb: {
    width: '100%',
  },
  gridNative: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    backgroundColor: colors.bg.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[4],
    overflow: 'hidden',
  },
});
