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
 * Premium Raycast-inspired command palette with heavy glassmorphism:
 * - Heavily blurred backdrop for immersive focus
 * - Glass-panel-strong search container with depth
 * - Glass-hover effects on results
 * - Glow effect on selected/active item
 * - Smooth animations and transitions
 */
export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Get all items and filter based on query
  const allItems = getAllNavigationItems();
  const filteredResults: SearchResult[] = query.trim()
    ? allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  // Flatten for index navigation
  const flatResults = Object.values(groupedResults).flat();

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  // Handle escape key
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

  // Scroll selected item into view
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
      {/* Backdrop - Heavy blur for Raycast-like immersive feel */}
      <div
        className="absolute inset-0
                   bg-[var(--bg-base)]/70 backdrop-blur-xl saturate-150
                   animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative flex items-start justify-center pt-[12vh] px-4">
        {/* Search Panel - glass-panel-strong styling */}
        <div
          className="w-full max-w-xl overflow-hidden rounded-2xl
                     /* Premium glass panel strong */
                     bg-[var(--glass-bg-strong)] backdrop-blur-2xl saturate-[200%]
                     border border-[var(--glass-border)]
                     /* Deep shadow for floating effect */
                     shadow-[var(--glass-shadow-lg)]
                     /* Animation */
                     animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
        >
          {/* Top shine effect */}
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r
                       from-transparent via-[var(--glass-shine-strong)] to-transparent opacity-60"
            aria-hidden="true"
          />

          {/* Search input area */}
          <div className="flex items-center gap-3 px-5 border-b border-[var(--glass-border)]">
            <SearchIcon className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="flex-1 h-16 bg-transparent text-[var(--text-primary)]
                         placeholder:text-[var(--text-muted)] text-base
                         focus:outline-none"
              aria-label="Search"
            />
            <kbd
              className="hidden sm:inline-flex px-2 py-1 rounded-lg
                         bg-[var(--glass-bg)] border border-[var(--glass-border)]
                         text-[10px] font-medium text-[var(--text-muted)]
                         shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]"
            >
              ESC
            </kbd>
          </div>

          {/* Results area */}
          <div ref={resultsRef} className="max-h-[55vh] overflow-y-auto p-2">
            {flatResults.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl
                               bg-[var(--glass-bg)] border border-[var(--glass-border)]
                               flex items-center justify-center">
                  <SearchIcon className="w-6 h-6 text-[var(--text-muted)]" />
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  No results found for &quot;{query}&quot;
                </p>
              </div>
            ) : (
              Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="mb-3 last:mb-0">
                  {/* Category header */}
                  <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
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
                            className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl
                                       text-left transition-all duration-150
                                       /* Selected state: glass glow effect */
                                       ${isSelected
                                         ? `bg-[var(--accent-blue)] text-white
                                            shadow-[var(--glow-blue)]
                                            border border-[var(--accent-blue)]/50`
                                         : `text-[var(--text-primary)]
                                            bg-transparent hover:bg-[var(--glass-bg-hover)]
                                            border border-transparent hover:border-[var(--glass-border)]`
                                       }`}
                          >
                            {/* File icon */}
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                                         transition-colors duration-150
                                         ${isSelected
                                           ? 'bg-white/20'
                                           : 'bg-[var(--glass-bg)] border border-[var(--glass-border)]'
                                         }`}
                            >
                              <FileIcon
                                className={`w-4 h-4 ${
                                  isSelected ? 'text-white/90' : 'text-[var(--text-muted)]'
                                }`}
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{item.name}</div>
                              {item.description && (
                                <div
                                  className={`text-xs truncate mt-0.5 ${
                                    isSelected ? 'text-white/70' : 'text-[var(--text-muted)]'
                                  }`}
                                >
                                  {item.description}
                                </div>
                              )}
                            </div>

                            {/* Return icon for selected */}
                            {isSelected && (
                              <div className="flex items-center gap-1.5 flex-shrink-0">
                                <span className="text-[10px] text-white/60 font-medium">Jump to</span>
                                <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                                  <ReturnIcon className="w-3.5 h-3.5 text-white/90" />
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

          {/* Footer - glass panel with keyboard hints */}
          <div
            className="flex items-center gap-5 px-5 py-3
                       border-t border-[var(--glass-border)]
                       bg-[var(--glass-bg-subtle)]"
          >
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[10px] font-medium">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[10px] font-medium">↓</kbd>
              </div>
              <span>navigate</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <kbd className="px-2 py-0.5 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[10px] font-medium">↵</kbd>
              <span>select</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <kbd className="px-2 py-0.5 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[10px] font-medium">esc</kbd>
              <span>close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
