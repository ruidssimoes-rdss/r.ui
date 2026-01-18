import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PaginationProps, getPageNumbers } from './PaginationContext';
import { PaginationContent } from './PaginationContent';
import { PaginationItem } from './PaginationItem';
import { PaginationLink } from './PaginationLink';
import { PaginationPrevious, PaginationNext } from './PaginationNavigation';
import { PaginationEllipsis } from './PaginationEllipsis';

/**
 * Pagination - Page navigation controls with smart page number display.
 *
 * Automatically calculates which page numbers to show with ellipsis
 * for large page ranges.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={5}
 *   totalPages={20}
 *   onPageChange={(page) => setPage(page)}
 * />
 * ```
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  style,
}: PaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <View style={[styles.container, style]} accessible={true} accessibilityLabel="Pagination navigation">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onPress={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                page={page}
                isActive={page === currentPage}
                onPress={onPageChange}
              />
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onPress={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
