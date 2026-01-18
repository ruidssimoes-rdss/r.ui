import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  getPageNumbers,
} from '@r-ui/react-native';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentPage: {
      control: 'number',
    },
    totalPages: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ============================================================================
// Story: Default
// ============================================================================
function DefaultPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <View style={styles.container}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
                  onPress={() => setCurrentPage(page)}
                />
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Text style={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: () => <DefaultPagination />,
};

// ============================================================================
// Story: WithEllipsis
// ============================================================================
function EllipsisPagination() {
  const [currentPage, setCurrentPage] = useState(5);
  const totalPages = 20;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Navigate to see ellipsis appear and move</Text>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
                  onPress={() => setCurrentPage(page)}
                />
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Text style={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </Text>
    </View>
  );
}

export const WithEllipsis: Story = {
  render: () => <EllipsisPagination />,
};

// ============================================================================
// Story: FirstLast
// ============================================================================
function FirstLastPagination() {
  const [currentPage, setCurrentPage] = useState(5);
  const totalPages = 15;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <View style={styles.container}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      >
        <PaginationContent>
          <PaginationItem>
            <Pressable
              style={[styles.navButton, currentPage === 1 && styles.navButtonDisabled]}
              onPress={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <Text style={[styles.navButtonText, currentPage === 1 && styles.navButtonTextDisabled]}>
                ⟨⟨ First
              </Text>
            </Pressable>
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious
              onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
                  onPress={() => setCurrentPage(page)}
                />
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>

          <PaginationItem>
            <Pressable
              style={[styles.navButton, currentPage === totalPages && styles.navButtonDisabled]}
              onPress={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <Text style={[styles.navButtonText, currentPage === totalPages && styles.navButtonTextDisabled]}>
                Last ⟩⟩
              </Text>
            </Pressable>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Text style={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </Text>
    </View>
  );
}

export const FirstLast: Story = {
  render: () => <FirstLastPagination />,
};

// ============================================================================
// Story: Compact
// ============================================================================
function CompactPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 25;

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Minimal navigation with prev/next only</Text>
      <View style={styles.compactContainer}>
        <Pressable
          style={[styles.compactButton, currentPage === 1 && styles.compactButtonDisabled]}
          onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <Text style={[styles.compactButtonText, currentPage === 1 && styles.compactButtonTextDisabled]}>
            ← Previous
          </Text>
        </Pressable>

        <Text style={styles.compactPageInfo}>
          {currentPage} / {totalPages}
        </Text>

        <Pressable
          style={[styles.compactButton, currentPage === totalPages && styles.compactButtonDisabled]}
          onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          <Text style={[styles.compactButtonText, currentPage === totalPages && styles.compactButtonTextDisabled]}>
            Next →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export const Compact: Story = {
  render: () => <CompactPagination />,
};

// ============================================================================
// Story: WithPageSize
// ============================================================================
function PageSizePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 150;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageSizeRow}>
        <Text style={styles.pageSizeLabel}>Items per page:</Text>
        <View style={styles.pageSizeOptions}>
          {[10, 25, 50, 100].map((size) => (
            <Pressable
              key={size}
              style={[styles.pageSizeButton, pageSize === size && styles.pageSizeButtonActive]}
              onPress={() => handlePageSizeChange(size)}
            >
              <Text style={[styles.pageSizeButtonText, pageSize === size && styles.pageSizeButtonTextActive]}>
                {size}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
                  onPress={() => setCurrentPage(page)}
                />
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Text style={styles.pageInfo}>
        Showing {(currentPage - 1) * pageSize + 1}-
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
      </Text>
    </View>
  );
}

export const WithPageSize: Story = {
  render: () => <PageSizePagination />,
};

// ============================================================================
// Story: Controlled
// ============================================================================
function ControlledPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <View style={styles.container}>
      <View style={styles.jumpToRow}>
        <Text style={styles.jumpToLabel}>Jump to page:</Text>
        <View style={styles.jumpToButtons}>
          {[1, 3, 5, 7, 10].map((page) => (
            <Pressable
              key={page}
              style={[styles.jumpToButton, currentPage === page && styles.jumpToButtonActive]}
              onPress={() => setCurrentPage(page)}
            >
              <Text style={[styles.jumpToButtonText, currentPage === page && styles.jumpToButtonTextActive]}>
                {page}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
                  onPress={() => setCurrentPage(page)}
                />
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Text style={styles.pageInfo}>Current page: {currentPage}</Text>
    </View>
  );
}

export const Controlled: Story = {
  render: () => <ControlledPagination />,
};

// ============================================================================
// Story: ManyPages
// ============================================================================
function ManyPagesPagination() {
  const [currentPage, setCurrentPage] = useState(50);
  const totalPages = 100;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>100 pages - ellipsis shows on both sides when in middle</Text>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
                  onPress={() => setCurrentPage(page)}
                />
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Text style={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </Text>
    </View>
  );
}

export const ManyPages: Story = {
  render: () => <ManyPagesPagination />,
};

// ============================================================================
// Story: FewPages
// ============================================================================
function FewPagesPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Only 4 pages - no ellipsis needed</Text>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
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
                  onPress={() => setCurrentPage(page)}
                />
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Text style={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </Text>
    </View>
  );
}

export const FewPages: Story = {
  render: () => <FewPagesPagination />,
};

// ============================================================================
// Story: TablePagination
// ============================================================================
function TablePaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalItems = 23;
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const data = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'User' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor' },
    { id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'User' },
    { id: 6, name: 'Frank Garcia', email: 'frank@example.com', role: 'Admin' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'User' },
    { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Editor' },
    { id: 9, name: 'Ivy Chen', email: 'ivy@example.com', role: 'User' },
    { id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'User' },
    { id: 11, name: 'Kate Anderson', email: 'kate@example.com', role: 'Admin' },
    { id: 12, name: 'Liam Thomas', email: 'liam@example.com', role: 'User' },
    { id: 13, name: 'Mia Jackson', email: 'mia@example.com', role: 'Editor' },
    { id: 14, name: 'Noah White', email: 'noah@example.com', role: 'User' },
    { id: 15, name: 'Olivia Harris', email: 'olivia@example.com', role: 'User' },
    { id: 16, name: 'Paul Martin', email: 'paul@example.com', role: 'Admin' },
    { id: 17, name: 'Quinn Robinson', email: 'quinn@example.com', role: 'User' },
    { id: 18, name: 'Rachel Clark', email: 'rachel@example.com', role: 'Editor' },
    { id: 19, name: 'Sam Lewis', email: 'sam@example.com', role: 'User' },
    { id: 20, name: 'Tina Walker', email: 'tina@example.com', role: 'User' },
    { id: 21, name: 'Uma Hall', email: 'uma@example.com', role: 'Admin' },
    { id: 22, name: 'Victor Young', email: 'victor@example.com', role: 'User' },
    { id: 23, name: 'Wendy King', email: 'wendy@example.com', role: 'Editor' },
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const visibleData = data.slice(startIndex, startIndex + pageSize);

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>Users</Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.tableCellId]}>ID</Text>
          <Text style={[styles.tableCell, styles.tableCellName]}>Name</Text>
          <Text style={[styles.tableCell, styles.tableCellEmail]}>Email</Text>
          <Text style={[styles.tableCell, styles.tableCellRole]}>Role</Text>
        </View>

        {visibleData.map((row) => (
          <View key={row.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableCellId]}>{row.id}</Text>
            <Text style={[styles.tableCell, styles.tableCellName]}>{row.name}</Text>
            <Text style={[styles.tableCell, styles.tableCellEmail]}>{row.email}</Text>
            <View style={[styles.tableCell, styles.tableCellRole]}>
              <View style={[styles.roleBadge, styles[`role${row.role}` as keyof typeof styles] || {}]}>
                <Text style={styles.roleBadgeText}>{row.role}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tableFooter}>
        <Text style={styles.tableFooterText}>
          Showing {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)} of {totalItems}
        </Text>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        >
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onPress={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
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
                    onPress={() => setCurrentPage(page)}
                  />
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onPress={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </View>
    </View>
  );
}

export const TablePagination: Story = {
  render: () => <TablePaginationDemo />,
};

// ============================================================================
// Story: InfiniteScroll
// ============================================================================
function InfiniteScrollDemo() {
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [loading, setLoading] = useState(false);
  const totalItems = 50;

  const handleLoadMore = () => {
    if (items.length >= totalItems) return;

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const nextItems = Array.from({ length: 10 }, (_, i) => items.length + i + 1);
      setItems([...items, ...nextItems]);
      setLoading(false);
    }, 800);
  };

  return (
    <View style={styles.infiniteContainer}>
      <Text style={styles.infiniteTitle}>News Feed</Text>

      <ScrollView style={styles.infiniteScroll} contentContainerStyle={styles.infiniteScrollContent}>
        {items.map((item) => (
          <View key={item} style={styles.feedItem}>
            <View style={styles.feedAvatar}>
              <Text style={styles.feedAvatarText}>{item}</Text>
            </View>
            <View style={styles.feedContent}>
              <Text style={styles.feedAuthor}>User {item}</Text>
              <Text style={styles.feedText}>
                This is post #{item}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
              <Text style={styles.feedTime}>{item}h ago</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.loadMoreContainer}>
        {items.length < totalItems ? (
          <Pressable
            style={[styles.loadMoreButton, loading && styles.loadMoreButtonDisabled]}
            onPress={handleLoadMore}
            disabled={loading}
          >
            <Text style={styles.loadMoreButtonText}>
              {loading ? 'Loading...' : 'Load More'}
            </Text>
          </Pressable>
        ) : (
          <Text style={styles.endText}>You've reached the end!</Text>
        )}

        <Text style={styles.loadMoreInfo}>
          Showing {items.length} of {totalItems} posts
        </Text>
      </View>
    </View>
  );
}

export const InfiniteScroll: Story = {
  render: () => <InfiniteScrollDemo />,
};

// ============================================================================
// Styles
// ============================================================================
const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  pageInfo: {
    fontSize: 14,
    color: '#666',
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  navButtonDisabled: {
    backgroundColor: '#fafafa',
    borderColor: '#eee',
  },
  navButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  navButtonTextDisabled: {
    color: '#ccc',
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  compactButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  compactButtonDisabled: {
    backgroundColor: '#fafafa',
    borderColor: '#eee',
  },
  compactButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  compactButtonTextDisabled: {
    color: '#ccc',
  },
  compactPageInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 60,
    textAlign: 'center',
  },
  pageSizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  pageSizeLabel: {
    fontSize: 14,
    color: '#666',
  },
  pageSizeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  pageSizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pageSizeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  pageSizeButtonText: {
    fontSize: 13,
    color: '#333',
  },
  pageSizeButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  jumpToRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  jumpToLabel: {
    fontSize: 14,
    color: '#666',
  },
  jumpToButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  jumpToButton: {
    width: 36,
    height: 36,
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  jumpToButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  jumpToButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  jumpToButtonTextActive: {
    color: '#fff',
  },
  tableContainer: {
    width: 600,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
  },
  tableCellId: {
    width: 50,
    fontWeight: '600',
  },
  tableCellName: {
    width: 150,
  },
  tableCellEmail: {
    flex: 1,
    color: '#666',
  },
  tableCellRole: {
    width: 80,
    alignItems: 'flex-end',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  roleAdmin: {
    backgroundColor: '#e3f2fd',
  },
  roleEditor: {
    backgroundColor: '#fff3e0',
  },
  roleUser: {
    backgroundColor: '#e8f5e9',
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  tableFooterText: {
    fontSize: 13,
    color: '#666',
  },
  infiniteContainer: {
    width: 400,
    height: 500,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  infiniteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infiniteScroll: {
    flex: 1,
  },
  infiniteScrollContent: {
    padding: 16,
    gap: 12,
  },
  feedItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  feedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  feedContent: {
    flex: 1,
  },
  feedAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  feedText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4,
  },
  feedTime: {
    fontSize: 12,
    color: '#999',
  },
  loadMoreContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
    gap: 8,
  },
  loadMoreButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  loadMoreButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loadMoreButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  loadMoreInfo: {
    fontSize: 12,
    color: '#999',
  },
  endText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
