'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

/**
 * TableOfContents Component
 *
 * Editorial design - clean, professional, readable.
 * Uses MutationObserver to detect when MDX content loads.
 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

  // Generate a slug from text
  const generateSlug = useCallback((text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }, []);

  // Extract headings from the page
  const extractHeadings = useCallback(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const elements = mainElement.querySelectorAll('h2, h3');
    const items: TOCItem[] = [];

    elements.forEach((el) => {
      const text = el.textContent?.trim() || '';
      if (!text) return;

      // Generate an ID if one doesn't exist
      if (!el.id) {
        el.id = generateSlug(text);
      }

      if (el.id) {
        items.push({
          id: el.id,
          text: text,
          level: el.tagName === 'H2' ? 2 : 3,
        });
      }
    });

    setHeadings(items);
  }, [generateSlug]);

  // Extract headings on mount and when pathname changes
  useEffect(() => {
    // Reset headings when pathname changes
    setHeadings([]);
    setActiveId('');

    // Initial extraction with delay for MDX hydration
    const initialTimer = setTimeout(extractHeadings, 100);

    // Set up MutationObserver to detect when content changes
    const mainElement = document.querySelector('main');
    if (mainElement) {
      const mutationObserver = new MutationObserver(() => {
        extractHeadings();
      });

      mutationObserver.observe(mainElement, {
        childList: true,
        subtree: true,
      });

      // Additional extraction after longer delay for slow-loading MDX
      const secondTimer = setTimeout(extractHeadings, 500);

      return () => {
        clearTimeout(initialTimer);
        clearTimeout(secondTimer);
        mutationObserver.disconnect();
      };
    }

    return () => clearTimeout(initialTimer);
  }, [pathname, extractHeadings]);

  // Set up intersection observer for active heading
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      // Find the first visible heading
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Sort by position and take the one closest to top
        const sortedEntries = visibleEntries.sort((a, b) => {
          const aTop = a.boundingClientRect.top;
          const bTop = b.boundingClientRect.top;
          return aTop - bTop;
        });

        setActiveId(sortedEntries[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0,
    });

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  // Don't render if no headings
  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <nav
      className="hidden xl:block w-56 flex-shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto"
      aria-label="Table of contents"
    >
      {/* Theme-aware container with subtle glass effect */}
      <div
        className="py-4 px-3 mr-4 rounded-xl backdrop-blur-sm transition-colors duration-200"
        style={{
          background: 'var(--toc-bg)',
          border: '1px solid var(--toc-border)',
        }}
      >
        {/* Header */}
        <h4 className="px-2 mb-3 editorial-section-header">
          On this page
        </h4>

        {/* Navigation items - clean typography, subtle hover */}
        <ul className="space-y-0.5">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block py-1.5 px-2 text-sm rounded-md transition-colors duration-150 relative
                             ${heading.level === 3 ? 'pl-4' : ''}
                             ${isActive
                               ? 'text-[var(--docs-text)] font-medium'
                               : 'text-[var(--docs-text-muted)] hover:text-[var(--docs-text-secondary)]'
                             }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full
                                 bg-[var(--docs-accent)]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="line-clamp-2">{heading.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
