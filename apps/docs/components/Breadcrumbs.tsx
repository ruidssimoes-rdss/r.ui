'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getBreadcrumbs } from '@/lib/navigation';

/**
 * Breadcrumbs Component
 *
 * Editorial design - simple text-based breadcrumbs.
 * Format: Home / Docs / Components / Card
 * Subtle separators, muted text color.
 * Current page not linked, slightly bolder.
 */
export function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  // Don't show breadcrumbs on home page or if only one item
  if (pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-[var(--docs-text-muted)]" aria-hidden="true">/</span>
              )}
              {isLast ? (
                <span
                  className="text-[var(--docs-text)] font-medium"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-[var(--docs-text-muted)] hover:text-[var(--docs-text-secondary)]
                             transition-colors duration-150"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
