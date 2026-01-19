'use client';

import { useState, useMemo } from 'react';
import { navigation } from '../../../lib/navigation';
import { ComponentCard } from '../../../components/ComponentCard';

// ========================================
// Icons
// ========================================

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

// ========================================
// Types
// ========================================

interface ComponentItem {
  name: string;
  href: string;
  description?: string;
}

interface ComponentCategory {
  title: string;
  items: ComponentItem[];
}

// ========================================
// Category Section
// ========================================

function CategorySection({ title, items, count }: ComponentCategory & { count: number }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide">
          {title}
        </h2>
        <span className="text-xs text-[#9CA3AF]">({count})</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ComponentCard key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}

// ========================================
// Main Component
// ========================================

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Get only component categories (exclude Guides)
  const componentCategories = useMemo(() => {
    return navigation.filter((section) => section.title !== 'Guides');
  }, []);

  // Filter components based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return componentCategories;
    }

    const query = searchQuery.toLowerCase();
    return componentCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [componentCategories, searchQuery]);

  // Count total components
  const totalComponents = useMemo(() => {
    return componentCategories.reduce(
      (acc, category) => acc + category.items.length,
      0
    );
  }, [componentCategories]);

  // Count filtered components
  const filteredCount = useMemo(() => {
    return filteredCategories.reduce(
      (acc, category) => acc + category.items.length,
      0
    );
  }, [filteredCategories]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Header Section */}
      <div className="border-b border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">Components</h1>
          <p className="text-lg text-[#6B7280] mb-8">
            {totalComponents} production-ready components for React Native
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D1D5DB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all duration-150"
            />
          </div>
        </div>
      </div>

      {/* Component Grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-8 text-sm text-[#6B7280]">
            {filteredCount === 0 ? (
              <span>No components found for "{searchQuery}"</span>
            ) : (
              <span>
                Showing {filteredCount} {filteredCount === 1 ? 'component' : 'components'} for "{searchQuery}"
              </span>
            )}
          </div>
        )}

        {/* Categories */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <CategorySection
              key={category.title}
              title={category.title}
              items={category.items}
              count={category.items.length}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-[#6B7280] mb-4">
              No components found matching "{searchQuery}"
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors duration-150"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Bottom padding */}
      <div className="h-16" />
    </div>
  );
}
