import React, { createContext, useContext } from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { spacing } from '../../tokens/spacing';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

export interface GridProps extends Omit<ViewProps, 'style'> {
  /** Grid content */
  children: React.ReactNode;
  /** Number of columns */
  columns?: GridColumns;
  /** Gap between all items */
  gap?: GridGap;
  /** Gap between rows */
  rowGap?: GridGap;
  /** Gap between columns */
  columnGap?: GridGap;
  /** Additional styles */
  style?: ViewStyle;
}

export interface GridItemProps extends Omit<ViewProps, 'style'> {
  /** Item content */
  children: React.ReactNode;
  /** Number of columns to span */
  colSpan?: number;
  /** Additional styles */
  style?: ViewStyle;
}

interface GridContextValue {
  columns: GridColumns;
  columnGap: number;
}

const GridContext = createContext<GridContextValue | null>(null);

function useGridContext() {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('GridItem must be used within a Grid component');
  }
  return context;
}

export function Grid({
  children,
  columns = 2,
  gap = 4,
  rowGap,
  columnGap,
  style,
  ...props
}: GridProps) {
  const resolvedRowGap = rowGap !== undefined ? spacing[rowGap] : spacing[gap];
  const resolvedColumnGap = columnGap !== undefined ? spacing[columnGap] : spacing[gap];

  return (
    <GridContext.Provider value={{ columns, columnGap: resolvedColumnGap }}>
      <View
        style={[
          styles.grid,
          {
            rowGap: resolvedRowGap,
            columnGap: resolvedColumnGap,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </GridContext.Provider>
  );
}

export function GridItem({
  children,
  colSpan = 1,
  style,
  ...props
}: GridItemProps) {
  const { columns, columnGap } = useGridContext();

  const clampedSpan = Math.min(colSpan, columns);
  const totalGapWidth = columnGap * (columns - 1);
  const itemBaseWidth = (100 - (totalGapWidth / 3.5)) / columns;
  const widthPercentage = itemBaseWidth * clampedSpan + (columnGap / 3.5) * (clampedSpan - 1);

  return (
    <View
      style={[
        styles.item,
        {
          width: `${widthPercentage}%`,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {},
});
