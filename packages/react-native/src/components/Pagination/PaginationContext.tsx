import { ViewStyle, TextStyle } from 'react-native';

// ============================================================================
// Types
// ============================================================================

export interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PaginationContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface PaginationItemProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface PaginationLinkProps {
  /** Page number */
  page: number;
  /** Whether this is the current page */
  isActive?: boolean;
  /** Click handler */
  onPress?: (page: number) => void;
  /** Disable the link */
  disabled?: boolean;
  /** Additional styles */
  style?: ViewStyle;
  /** Additional text styles */
  textStyle?: TextStyle;
}

export interface PaginationPreviousProps {
  /** Click handler */
  onPress?: () => void;
  /** Disable the button */
  disabled?: boolean;
  /** Custom label */
  label?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PaginationNextProps {
  /** Click handler */
  onPress?: () => void;
  /** Disable the button */
  disabled?: boolean;
  /** Custom label */
  label?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PaginationEllipsisProps {
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Calculate which page numbers to display, with ellipsis for large ranges.
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const showEllipsisThreshold = 7;

  if (totalPages <= showEllipsisThreshold) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }

    pages.push(totalPages);
  }

  return pages;
}
