import React, { createContext, useContext, useCallback, useMemo } from 'react';

export interface CommandItemData {
  /** Unique value for the item */
  value: string;
  /** Additional keywords for search matching */
  keywords?: string[];
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Group this item belongs to */
  group?: string;
}

export interface CommandContextValue {
  /** Current search query */
  search: string;
  /** Update search query */
  setSearch: (search: string) => void;
  /** Currently selected/highlighted value */
  selectedValue: string;
  /** Update selected value */
  setSelectedValue: (value: string) => void;
  /** All registered items */
  items: CommandItemData[];
  /** Register an item */
  registerItem: (item: CommandItemData) => void;
  /** Unregister an item */
  unregisterItem: (value: string) => void;
  /** Custom filter function */
  filter?: (value: string, search: string, keywords?: string[]) => boolean;
  /** Handle item selection */
  onSelect?: (value: string) => void;
}

const CommandContext = createContext<CommandContextValue | null>(null);

export function useCommand() {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('Command components must be used within a Command');
  }
  return context;
}

export function useCommandContext() {
  return useContext(CommandContext);
}

/** Default fuzzy search filter */
export function defaultFilter(
  value: string,
  search: string,
  keywords?: string[]
): boolean {
  if (!search) return true;

  const searchLower = search.toLowerCase();
  const valueLower = value.toLowerCase();

  // Check value
  if (valueLower.includes(searchLower)) return true;

  // Check keywords
  if (keywords?.some((k) => k.toLowerCase().includes(searchLower))) {
    return true;
  }

  // Simple fuzzy match: check if all search chars exist in order
  let searchIndex = 0;
  for (const char of valueLower) {
    if (char === searchLower[searchIndex]) {
      searchIndex++;
    }
    if (searchIndex === searchLower.length) return true;
  }

  return false;
}

export { CommandContext };
