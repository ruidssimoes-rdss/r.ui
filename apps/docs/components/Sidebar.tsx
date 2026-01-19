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
 * Minimal sidebar with flat list, no indentation.
 * Selected item uses accent color text only (no background).
 * All components sorted alphabetically within sections.
 */
export function Sidebar({ isMobileMenuOpen, onCloseMobileMenu }: SidebarProps) {
  const pathname = usePathname();

  // Sort items alphabetically within each section
  const sortedNavigation = navigation.map(section => ({
    ...section,
    items: [...section.items].sort((a, b) => a.name.localeCompare(b.name))
  }));

  const NavContent = () => (
    <>
      {sortedNavigation.map((section) => (
        <div key={section.title} className="mb-6">
          {/* Section header - small, muted */}
          <h4 className="mb-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
            {section.title}
          </h4>

          {/* Nav items - flat list, no indentation */}
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onCloseMobileMenu}
                    className={`block py-1 text-sm transition-colors
                      ${isActive
                        ? 'text-red-500 font-medium'
                        : 'text-gray-600 hover:text-gray-900'
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
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/20"
          onClick={onCloseMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-48 flex-shrink-0">
        <nav className="sticky top-20 h-[calc(100vh-8rem)] overflow-y-auto py-4 pr-4">
          <NavContent />
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-56 bg-white border-r border-gray-200
                   transition-transform duration-300 ease-in-out md:hidden
                   ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="h-full overflow-y-auto px-4 py-6">
          <NavContent />
        </nav>
      </aside>
    </>
  );
}
