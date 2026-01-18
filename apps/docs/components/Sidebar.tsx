'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/lib/navigation';

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

/**
 * Sidebar Component
 *
 * coss.com-inspired clean navigation.
 * Transparent background, clean text links.
 * Category headers: small, muted
 * Links: regular weight, subtle hover
 * Active item: font-medium only
 */
export function Sidebar({ isMobileMenuOpen, onCloseMobileMenu }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/40"
          onClick={onCloseMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - transparent, minimal */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-56
                   transition-transform duration-300 ease-in-out
                   md:translate-x-0
                   ${isMobileMenuOpen ? 'translate-x-0 bg-[var(--page-bg)]' : '-translate-x-full md:bg-transparent'}`}
      >
        {/* Navigation */}
        <nav className="sticky top-20 h-[calc(100vh-8rem)] overflow-y-auto px-4 py-6">
          {navigation.map((section) => (
            <div key={section.title} className="mb-6">
              {/* Section header */}
              <h4 className="mb-2 text-sm font-medium text-[var(--docs-text)]">
                {section.title}
              </h4>

              {/* Nav items - clean text links */}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onCloseMobileMenu}
                        className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors
                          ${isActive
                            ? 'bg-[var(--docs-sidebar-active)] text-[var(--docs-text)] font-medium'
                            : 'text-[var(--docs-text-secondary)] hover:text-[var(--docs-text)] hover:bg-[var(--docs-sidebar-active)]'
                          }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
