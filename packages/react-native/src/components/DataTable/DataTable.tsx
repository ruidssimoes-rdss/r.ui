import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { TOUCH_TARGET, getHitSlop, isNative, interactiveSize } from '../../utils/platform';

// Checkbox visual size for hitSlop calculation
const CHECKBOX_SIZE = 18;
const checkboxHitSlop = getHitSlop(CHECKBOX_SIZE);

// Pagination button size (visual)
const PAGINATION_BUTTON_SIZE = 28;
const paginationHitSlop = getHitSlop(PAGINATION_BUTTON_SIZE);

// Search clear button size
const SEARCH_CLEAR_SIZE = 24;
const searchClearHitSlop = getHitSlop(SEARCH_CLEAR_SIZE);

// ============================================================================
// Types
// ============================================================================

export interface ColumnDef<T> {
  /** Unique column identifier */
  id: string;
  /** Column header text or component */
  header: string | React.ReactNode;
  /** Key to access row data */
  accessorKey: keyof T;
  /** Custom cell renderer */
  cell?: (row: T) => React.ReactNode;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column is filterable */
  filterable?: boolean;
  /** Column width */
  width?: number | string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

export interface DataTableContextValue<T> {
  /** Table data */
  data: T[];
  /** Filtered/sorted data */
  processedData: T[];
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Current sort state */
  sortState: SortState;
  /** Set sort state */
  setSortState: (state: SortState) => void;
  /** Search query */
  searchQuery: string;
  /** Set search query */
  setSearchQuery: (query: string) => void;
  /** Selected row keys */
  selectedRows: Set<string>;
  /** Toggle row selection */
  toggleRowSelection: (key: string) => void;
  /** Toggle all rows */
  toggleAllRows: () => void;
  /** Selection mode */
  selectable: boolean | 'single' | 'multiple';
  /** Get row key */
  getRowKey: (row: T, index: number) => string;
  /** Current page (0-indexed) */
  currentPage: number;
  /** Set current page */
  setCurrentPage: (page: number) => void;
  /** Page size */
  pageSize: number;
  /** Set page size */
  setPageSize: (size: number) => void;
  /** Total pages */
  totalPages: number;
  /** Paginated data */
  paginatedData: T[];
  /** Loading state */
  loading: boolean;
}

export interface DataTableProps<T> {
  /** Table data */
  data: T[];
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Enable sorting */
  sortable?: boolean;
  /** Enable search */
  searchable?: boolean;
  /** Enable row selection */
  selectable?: boolean | 'single' | 'multiple';
  /** Enable pagination */
  paginated?: boolean;
  /** Items per page */
  pageSize?: number;
  /** Page size options */
  pageSizeOptions?: number[];
  /** Loading state */
  loading?: boolean;
  /** Empty state content */
  emptyState?: React.ReactNode;
  /** Function to get unique row key */
  getRowKey?: (row: T, index: number) => string;
  /** Called when rows are selected */
  onRowSelect?: (selectedRows: T[]) => void;
  /** Called when sort changes */
  onSort?: (column: string, direction: SortDirection) => void;
  /** Children (table parts) */
  children?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTableHeaderProps {
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTableHeaderCellProps {
  /** Column definition */
  column: ColumnDef<any>;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTableBodyProps {
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTableRowProps<T> {
  /** Row data */
  row: T;
  /** Row index */
  index: number;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTableCellProps {
  /** Cell content */
  children: React.ReactNode;
  /** Column width */
  width?: number | string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTableFooterProps {
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTablePaginationProps {
  /** Page size options */
  pageSizeOptions?: number[];
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTableSearchProps {
  /** Placeholder text */
  placeholder?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTableEmptyProps {
  /** Empty state content */
  children?: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface DataTableLoadingProps {
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

const DataTableContext = createContext<DataTableContextValue<any> | null>(null);

function useDataTable<T>() {
  const context = useContext(DataTableContext) as DataTableContextValue<T> | null;
  if (!context) {
    throw new Error('DataTable components must be used within DataTable');
  }
  return context;
}

// ============================================================================
// Sorting/Filtering Logic
// ============================================================================

function sortData<T>(data: T[], column: ColumnDef<T>, direction: SortDirection): T[] {
  if (!direction) return data;

  return [...data].sort((a, b) => {
    const aVal = a[column.accessorKey];
    const bVal = b[column.accessorKey];

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    const comparison = aVal < bVal ? -1 : 1;
    return direction === 'asc' ? comparison : -comparison;
  });
}

function filterData<T>(data: T[], columns: ColumnDef<T>[], query: string): T[] {
  if (!query.trim()) return data;

  const lowerQuery = query.toLowerCase();
  return data.filter((row) =>
    columns.some((col) => {
      const value = row[col.accessorKey];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(lowerQuery);
    })
  );
}

// ============================================================================
// DataTable (Root)
// ============================================================================

export function DataTable<T>({
  data,
  columns,
  sortable = false,
  searchable = false,
  selectable = false,
  paginated = false,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  loading = false,
  emptyState,
  getRowKey = (_, index) => String(index),
  onRowSelect,
  onSort,
  children,
  style,
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Process data (filter, sort)
  const processedData = useMemo(() => {
    let result = [...data];

    // Filter
    if (searchQuery) {
      result = filterData(result, columns, searchQuery);
    }

    // Sort
    if (sortState.column && sortState.direction) {
      const column = columns.find((c) => c.id === sortState.column);
      if (column) {
        result = sortData(result, column, sortState.direction);
      }
    }

    return result;
  }, [data, columns, searchQuery, sortState]);

  // Paginate data
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = useMemo(() => {
    if (!paginated) return processedData;
    const start = currentPage * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, paginated, currentPage, pageSize]);

  // Selection handlers
  const toggleRowSelection = useCallback((key: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (selectable === 'single') {
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.clear();
          next.add(key);
        }
      } else {
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
      }
      return next;
    });
  }, [selectable]);

  const toggleAllRows = useCallback(() => {
    setSelectedRows((prev) => {
      if (prev.size === paginatedData.length) {
        return new Set();
      }
      return new Set(paginatedData.map((row, i) => getRowKey(row, i)));
    });
  }, [paginatedData, getRowKey]);

  // Notify on selection change
  React.useEffect(() => {
    if (onRowSelect && selectedRows.size > 0) {
      const selected = data.filter((row, i) => selectedRows.has(getRowKey(row, i)));
      onRowSelect(selected);
    }
  }, [selectedRows, data, getRowKey, onRowSelect]);

  // Notify on sort change
  const handleSetSortState = useCallback((state: SortState) => {
    setSortState(state);
    if (onSort && state.column && state.direction) {
      onSort(state.column, state.direction);
    }
  }, [onSort]);

  const contextValue = useMemo<DataTableContextValue<T>>(() => ({
    data,
    processedData,
    columns,
    sortState,
    setSortState: handleSetSortState,
    searchQuery,
    setSearchQuery,
    selectedRows,
    toggleRowSelection,
    toggleAllRows,
    selectable,
    getRowKey,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedData,
    loading,
  }), [
    data, processedData, columns, sortState, handleSetSortState, searchQuery,
    selectedRows, toggleRowSelection, toggleAllRows, selectable, getRowKey,
    currentPage, pageSize, totalPages, paginatedData, loading,
  ]);

  // Default rendering if no children provided
  const defaultContent = (
    <>
      {searchable && <DataTableSearch />}
      <ScrollView horizontal style={styles.scrollContainer}>
        <View style={styles.tableContainer}>
          <DataTableHeader />
          {loading ? (
            <DataTableLoading />
          ) : paginatedData.length === 0 ? (
            <DataTableEmpty>{emptyState}</DataTableEmpty>
          ) : (
            <DataTableBody />
          )}
        </View>
      </ScrollView>
      {paginated && <DataTablePagination pageSizeOptions={pageSizeOptions} />}
    </>
  );

  return (
    <DataTableContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>
        {children || defaultContent}
      </View>
    </DataTableContext.Provider>
  );
}

// ============================================================================
// DataTableHeader
// ============================================================================

export function DataTableHeader({ style }: DataTableHeaderProps) {
  const { columns, selectable, selectedRows, paginatedData, toggleAllRows } = useDataTable();

  const allSelected = selectedRows.size === paginatedData.length && paginatedData.length > 0;

  return (
    <View style={[styles.header, style]}>
      {selectable === 'multiple' && (
        <Pressable
          onPress={toggleAllRows}
          style={styles.checkboxCell}
          hitSlop={checkboxHitSlop}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: allSelected }}
          accessibilityLabel="Select all rows"
        >
          <View style={[styles.checkbox, allSelected && styles.checkboxChecked]}>
            {allSelected && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </Pressable>
      )}
      {columns.map((column) => (
        <DataTableHeaderCell key={column.id} column={column} />
      ))}
    </View>
  );
}

// ============================================================================
// DataTableHeaderCell
// ============================================================================

export function DataTableHeaderCell({ column, style }: DataTableHeaderCellProps) {
  const { sortState, setSortState } = useDataTable();

  const handlePress = () => {
    if (!column.sortable) return;

    let newDirection: SortDirection = 'asc';
    if (sortState.column === column.id) {
      if (sortState.direction === 'asc') newDirection = 'desc';
      else if (sortState.direction === 'desc') newDirection = null;
    }

    setSortState({ column: column.id, direction: newDirection });
  };

  const isSorted = sortState.column === column.id;

  return (
    <Pressable
      onPress={column.sortable ? handlePress : undefined}
      style={[
        styles.headerCell,
        column.sortable && styles.headerCellSortable,
        column.width ? { width: column.width as any } : styles.flexCell,
        style,
      ]}
      accessibilityRole="button"
    >
      <Text style={styles.headerText}>
        {typeof column.header === 'string' ? column.header : column.header}
      </Text>
      {column.sortable && (
        <Text style={[styles.sortIndicator, isSorted && styles.sortIndicatorActive]}>
          {isSorted && sortState.direction === 'asc' ? '↑' : isSorted && sortState.direction === 'desc' ? '↓' : '↕'}
        </Text>
      )}
    </Pressable>
  );
}

// ============================================================================
// DataTableBody
// ============================================================================

export function DataTableBody({ style }: DataTableBodyProps) {
  const { paginatedData, getRowKey } = useDataTable();

  return (
    <View style={[styles.body, style]}>
      {paginatedData.map((row, index) => (
        <DataTableRow key={getRowKey(row, index)} row={row} index={index} />
      ))}
    </View>
  );
}

// ============================================================================
// DataTableRow
// ============================================================================

export function DataTableRow<T>({ row, index, style }: DataTableRowProps<T>) {
  const { columns, selectable, selectedRows, toggleRowSelection, getRowKey } = useDataTable<T>();

  const rowKey = getRowKey(row, index);
  const isSelected = selectedRows.has(rowKey);

  return (
    <View style={[styles.row, isSelected && styles.rowSelected, style]}>
      {(selectable === 'multiple' || selectable === 'single') && (
        <Pressable
          onPress={() => toggleRowSelection(rowKey)}
          style={styles.checkboxCell}
          hitSlop={checkboxHitSlop}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isSelected }}
          accessibilityLabel="Select row"
        >
          <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </Pressable>
      )}
      {columns.map((column) => (
        <DataTableCell key={column.id} width={column.width}>
          {column.cell
            ? column.cell(row)
            : String(row[column.accessorKey] ?? '')
          }
        </DataTableCell>
      ))}
    </View>
  );
}

// ============================================================================
// DataTableCell
// ============================================================================

export function DataTableCell({ children, width, style }: DataTableCellProps) {
  return (
    <View style={[styles.cell, width ? { width: width as any } : styles.flexCell, style]}>
      {typeof children === 'string' ? (
        <Text style={styles.cellText}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

// ============================================================================
// DataTableFooter
// ============================================================================

export function DataTableFooter({ style, children }: DataTableFooterProps & { children?: React.ReactNode }) {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// DataTablePagination
// ============================================================================

export function DataTablePagination({ pageSizeOptions = [10, 25, 50], style }: DataTablePaginationProps) {
  const { currentPage, setCurrentPage, pageSize, setPageSize, totalPages, processedData } = useDataTable();

  const start = currentPage * pageSize + 1;
  const end = Math.min((currentPage + 1) * pageSize, processedData.length);

  return (
    <View style={[styles.pagination, style]}>
      <Text style={styles.paginationInfo}>
        {start}-{end} of {processedData.length}
      </Text>
      <View style={styles.paginationControls}>
        <Pressable
          onPress={() => setCurrentPage(0)}
          disabled={currentPage === 0}
          style={[styles.paginationButton, currentPage === 0 && styles.paginationButtonDisabled]}
          hitSlop={paginationHitSlop}
          accessibilityRole="button"
          accessibilityLabel="First page"
        >
          <Text style={[styles.paginationButtonText, currentPage === 0 && styles.paginationButtonTextDisabled]}>
            ««
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          style={[styles.paginationButton, currentPage === 0 && styles.paginationButtonDisabled]}
          hitSlop={paginationHitSlop}
          accessibilityRole="button"
          accessibilityLabel="Previous page"
        >
          <Text style={[styles.paginationButtonText, currentPage === 0 && styles.paginationButtonTextDisabled]}>
            «
          </Text>
        </Pressable>
        <Text style={styles.paginationPageInfo}>
          {currentPage + 1} / {totalPages}
        </Text>
        <Pressable
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          style={[styles.paginationButton, currentPage >= totalPages - 1 && styles.paginationButtonDisabled]}
          hitSlop={paginationHitSlop}
          accessibilityRole="button"
          accessibilityLabel="Next page"
        >
          <Text style={[styles.paginationButtonText, currentPage >= totalPages - 1 && styles.paginationButtonTextDisabled]}>
            »
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setCurrentPage(totalPages - 1)}
          disabled={currentPage >= totalPages - 1}
          style={[styles.paginationButton, currentPage >= totalPages - 1 && styles.paginationButtonDisabled]}
          hitSlop={paginationHitSlop}
          accessibilityRole="button"
          accessibilityLabel="Last page"
        >
          <Text style={[styles.paginationButtonText, currentPage >= totalPages - 1 && styles.paginationButtonTextDisabled]}>
            »»
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// ============================================================================
// DataTableSearch
// ============================================================================

export function DataTableSearch({ placeholder = 'Search...', style }: DataTableSearchProps) {
  const { searchQuery, setSearchQuery } = useDataTable();

  return (
    <View style={[styles.searchContainer, style]}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        style={styles.searchInput}
      />
      {searchQuery.length > 0 && (
        <Pressable
          onPress={() => setSearchQuery('')}
          style={styles.searchClear}
          hitSlop={searchClearHitSlop}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
        >
          <Text style={styles.searchClearText}>×</Text>
        </Pressable>
      )}
    </View>
  );
}

// ============================================================================
// DataTableEmpty
// ============================================================================

export function DataTableEmpty({ children, style }: DataTableEmptyProps) {
  return (
    <View style={[styles.empty, style]}>
      {children || (
        <>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>No data</Text>
          <Text style={styles.emptyDescription}>No records to display</Text>
        </>
      )}
    </View>
  );
}

// ============================================================================
// DataTableLoading
// ============================================================================

export function DataTableLoading({ style }: DataTableLoadingProps) {
  return (
    <View style={[styles.loading, style]}>
      <ActivityIndicator size="large" color={colors.accent.blue.DEFAULT} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    overflow: 'hidden',
  },
  scrollContainer: {
    flexGrow: 0,
  },
  tableContainer: {
    minWidth: '100%',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.bg.elevated,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  headerCellSortable: {
    // Ensure sortable headers meet touch target on native
    minHeight: isNative ? TOUCH_TARGET : undefined,
  },
  headerText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.text.secondary,
  },
  sortIndicator: {
    marginLeft: spacing[1],
    fontSize: fontSizes.xs,
    color: colors.text.muted,
  },
  sortIndicatorActive: {
    color: colors.accent.blue.DEFAULT,
  },
  body: {},
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border.muted,
  },
  rowSelected: {
    backgroundColor: colors.accent.blue.dark + '20',
  },
  cell: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    justifyContent: 'center',
  },
  flexCell: {
    flex: 1,
    minWidth: 100,
  },
  cellText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
  checkboxCell: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[2],
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border.strong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.accent.blue.DEFAULT,
    borderColor: colors.accent.blue.DEFAULT,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: fontWeights.bold as TextStyle['fontWeight'],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.bg.elevated,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    backgroundColor: colors.bg.elevated,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
  paginationInfo: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  paginationButton: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.sm,
    backgroundColor: colors.bg.surface,
    // Improved touch area with better padding
    minWidth: isNative ? interactiveSize.sm : 32,
    minHeight: isNative ? interactiveSize.sm : 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationButtonDisabled: {
    opacity: 0.4,
  },
  paginationButtonText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
  paginationButtonTextDisabled: {
    color: colors.text.muted,
  },
  paginationPageInfo: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    marginHorizontal: spacing[2],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.primary,
    padding: spacing[2],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
    backgroundColor: colors.bg.raised,
  },
  searchClear: {
    marginLeft: spacing[2],
    padding: spacing[2],
    // Minimum touch target for clear button
    minWidth: isNative ? interactiveSize.sm : 32,
    minHeight: isNative ? interactiveSize.sm : 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchClearText: {
    fontSize: fontSizes.lg,
    color: colors.text.muted,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[12],
    paddingHorizontal: spacing[4],
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing[3],
  },
  emptyTitle: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  emptyDescription: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[12],
    paddingHorizontal: spacing[4],
  },
  loadingText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    marginTop: spacing[3],
  },
});

// ============================================================================
// Exports
// ============================================================================

export { useDataTable };
