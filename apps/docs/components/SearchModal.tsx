'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getAllNavigationItems } from '@/lib/navigation';

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

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function ReturnIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
}

interface SearchResult {
  name: string;
  href: string;
  category: string;
  description?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SearchModal Component
 *
 * Minimal command palette - clean white, no glass effects.
 */
export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const allItems = getAllNavigationItems();
  const filteredResults: SearchResult[] = query.trim()
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const flatResults = Object.values(groupedResults).flat();

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % flatResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
      } else if (e.key === 'Enter' && flatResults[selectedIndex]) {
        e.preventDefault();
        router.push(flatResults[selectedIndex].href);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, flatResults, selectedIndex, router]);

  useEffect(() => {
    if (resultsRef.current && flatResults.length > 0) {
      const selectedElement = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, flatResults.length]);

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose]
  );

  if (!isOpen) return null;

  let globalIndex = 0;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Search documentation">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative flex items-start justify-center pt-[12vh] px-4">
        {/* Search Panel */}
        <div className="w-full max-w-xl overflow-hidden rounded-lg bg-white border border-gray-200 shadow-lg">
          {/* Search input area */}
          <div className="flex items-center gap-3 px-4 border-b border-gray-200">
            <SearchIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="flex-1 h-14 bg-transparent text-gray-900 placeholder:text-gray-400 text-base focus:outline-none"
              aria-label="Search"
            />
            <kbd className="hidden sm:inline-flex px-2 py-1 rounded bg-gray-100 text-[10px] font-medium text-gray-500">
              ESC
            </kbd>
          </div>

          {/* Results area */}
          <div ref={resultsRef} className="max-h-[55vh] overflow-y-auto p-2">
            {flatResults.length === 0 ? (
              <div className="py-12 text-center">
                <SearchIcon className="w-8 h-8 mx-auto mb-3 text-gray-300" />
                <p className="text-sm text-gray-500">
                  No results found for &quot;{query}&quot;
                </p>
              </div>
            ) : (
              Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="mb-3 last:mb-0">
                  {/* Category header */}
                  <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {category}
                  </div>

                  {/* Category items */}
                  <ul className="space-y-0.5">
                    {items.map((item) => {
                      const currentIndex = globalIndex++;
                      const isSelected = currentIndex === selectedIndex;
                      return (
                        <li key={item.href}>
                          <button
                            data-index={currentIndex}
                            onClick={() => handleSelect(item.href)}
                            onMouseEnter={() => setSelectedIndex(currentIndex)}
                            className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                              ${isSelected
                                ? 'bg-red-500 text-white'
                                : 'text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            {/* File icon */}
                            <div
                              className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0
                                ${isSelected ? 'bg-white/20' : 'bg-gray-100'}`}
                            >
                              <FileIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{item.name}</div>
                              {item.description && (
                                <div className={`text-xs truncate mt-0.5 ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                                  {item.description}
                                </div>
                              )}
                            </div>

                            {/* Return icon for selected */}
                            {isSelected && (
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <span className="text-[10px] text-white/70 font-medium">Jump to</span>
                                <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                                  <ReturnIcon className="w-3 h-3 text-white" />
                                </div>
                              </div>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-5 px-4 py-2.5 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-medium">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-medium">↓</kbd>
              </div>
              <span>navigate</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <kbd className="px-2 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-medium">↵</kbd>
              <span>select</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <kbd className="px-2 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-medium">esc</kbd>
              <span>close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
