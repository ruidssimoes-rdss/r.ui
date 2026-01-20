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
 * Minimal TOC - clean text, no glass effects.
 * Active item indicated by red text and left border.
 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

  const generateSlug = useCallback((text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }, []);

  const extractHeadings = useCallback(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const elements = mainElement.querySelectorAll('h2, h3');
    const items: TOCItem[] = [];

    elements.forEach((el) => {
      const text = el.textContent?.trim() || '';
      if (!text) return;

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

  useEffect(() => {
    setHeadings([]);
    setActiveId('');

    const initialTimer = setTimeout(extractHeadings, 100);

    const mainElement = document.querySelector('main');
    if (mainElement) {
      const mutationObserver = new MutationObserver(() => {
        extractHeadings();
      });

      mutationObserver.observe(mainElement, {
        childList: true,
        subtree: true,
      });

      const secondTimer = setTimeout(extractHeadings, 500);

      return () => {
        clearTimeout(initialTimer);
        clearTimeout(secondTimer);
        mutationObserver.disconnect();
      };
    }

    return () => clearTimeout(initialTimer);
  }, [pathname, extractHeadings]);

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
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

  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <nav
      className="hidden xl:block w-48 flex-shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto"
      aria-label="Table of contents"
    >
      <div className="py-4">
        {/* Header */}
        <h4 className="px-2 mb-3 text-xs font-medium text-gray-400 uppercase tracking-wide">
          On this page
        </h4>

        {/* Navigation items */}
        <ul className="space-y-0.5">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block py-1.5 text-sm transition-colors relative
                             ${heading.level === 3 ? 'pl-4' : 'pl-2'}
                             ${isActive
                               ? 'text-gray-900 font-medium'
                               : 'text-gray-400 hover:text-gray-700'
                             }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-gray-900"
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
