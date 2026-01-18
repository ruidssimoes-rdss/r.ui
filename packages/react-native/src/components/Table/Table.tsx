import React, { createContext, useContext, ReactNode } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';

// Types
export interface Column<T = any> {
  key: string;
  header: string;
  width?: number;
  render?: (value: any, row: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  data?: T[];
  columns?: Column<T>[];
  children?: ReactNode;
  style?: ViewStyle;
  stickyHeader?: boolean;
}

export interface TableHeaderProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface TableBodyProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export interface TableRowProps {
  children?: ReactNode;
  style?: ViewStyle;
  selected?: boolean;
}

export interface TableHeadProps {
  children?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  align?: 'left' | 'center' | 'right';
  width?: number;
}

export interface TableCellProps {
  children?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  align?: 'left' | 'center' | 'right';
  width?: number;
}

// Context for sharing table state
interface TableContextValue {
  columnWidths: number[];
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

// Table Header
export function TableHeader({ children, style }: TableHeaderProps) {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
}

// Table Body
export function TableBody({ children, style }: TableBodyProps) {
  return (
    <View style={[styles.body, style]}>
      {children}
    </View>
  );
}

// Table Row
export function TableRow({ children, style, selected }: TableRowProps) {
  return (
    <View style={[styles.row, selected && styles.rowSelected, style]}>
      {children}
    </View>
  );
}

// Table Head Cell
export function TableHead({
  children,
  style,
  textStyle,
  align = 'left',
  width,
}: TableHeadProps) {
  return (
    <View
      style={[
        styles.cell,
        styles.headCell,
        width ? { width } : { flex: 1 },
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text
          style={[
            styles.headText,
            align === 'center' && styles.textCenter,
            align === 'right' && styles.textRight,
            textStyle,
          ]}
          numberOfLines={1}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

// Table Cell
export function TableCell({
  children,
  style,
  textStyle,
  align = 'left',
  width,
}: TableCellProps) {
  return (
    <View
      style={[
        styles.cell,
        width ? { width } : { flex: 1 },
        style,
      ]}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text
          style={[
            styles.cellText,
            align === 'center' && styles.textCenter,
            align === 'right' && styles.textRight,
            textStyle,
          ]}
          numberOfLines={1}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

// Main Table Component
export function Table<T = any>({
  data,
  columns,
  children,
  style,
  stickyHeader = false,
}: TableProps<T>) {
  // If using declarative children approach
  if (children) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={[styles.scrollContainer, style]}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.table}>
          {children}
        </View>
      </ScrollView>
    );
  }

  // If using data/columns approach
  if (!data || !columns) {
    return null;
  }

  const columnWidths = columns.map((col) => col.width || 0);

  return (
    <TableContext.Provider value={{ columnWidths }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={[styles.scrollContainer, style]}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.table}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  width={column.width}
                  align={column.align}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    width={column.width}
                    align={column.align}
                  >
                    {column.render
                      ? column.render(row[column.key as keyof T], row, rowIndex)
                      : String(row[column.key as keyof T] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </View>
      </ScrollView>
    </TableContext.Provider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    minWidth: '100%',
  },
  table: {
    minWidth: '100%',
    backgroundColor: colors.bg.surface,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  header: {
    backgroundColor: colors.bg.elevated,
  },
  body: {},
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
    minHeight: 48,
  },
  rowSelected: {
    backgroundColor: colors.bg.elevated,
  },
  cell: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    justifyContent: 'center',
  },
  headCell: {
    paddingVertical: spacing[3],
  },
  headText: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cellText: {
    color: colors.text.primary,
    fontSize: 14,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
});
