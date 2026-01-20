'use client';

import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ========================================
// Types
// ========================================

export interface GuideTab {
  id: string;
  label: string;
}

export interface GuideLayoutProps {
  title: string;
  description: string;
  icon?: ReactNode;
  tabs?: GuideTab[];
  children: ReactNode;
}

// ========================================
// Icons
// ========================================

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function HelpCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function LayoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function SlidersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

// Map page slugs to icons
const pageIcons: Record<string, ReactNode> = {
  installation: <DownloadIcon className="w-6 h-6" />,
  customization: <SlidersIcon className="w-6 h-6" />,
  theming: <PaletteIcon className="w-6 h-6" />,
  'dark-mode': <MoonIcon className="w-6 h-6" />,
  help: <HelpCircleIcon className="w-6 h-6" />,
  patterns: <LayoutIcon className="w-6 h-6" />,
  principles: <CompassIcon className="w-6 h-6" />,
};

// ========================================
// Breadcrumbs
// ========================================

function GuideBreadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-sm">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
        </li>
        <li className="flex items-center gap-1.5">
          <span className="text-gray-300" aria-hidden="true">/</span>
          <Link
            href="/docs"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            Docs
          </Link>
        </li>
        <li className="flex items-center gap-1.5">
          <span className="text-gray-300" aria-hidden="true">/</span>
          <span className="text-gray-900 font-semibold">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}

// ========================================
// Hero Section
// ========================================

interface HeroSectionProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

function HeroSection({ title, description, icon }: HeroSectionProps) {
  const pathname = usePathname();
  const slug = pathname.split('/').pop() || '';
  const defaultIcon = pageIcons[slug];
  const displayIcon = icon || defaultIcon;

  return (
    <div className="mb-8 pb-8 border-b border-gray-100">
      <GuideBreadcrumbs title={title} />
      <div className="flex items-start gap-4">
        {displayIcon && (
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600">
            {displayIcon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Tab Navigation
// ========================================

interface TabNavigationProps {
  tabs: GuideTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="mb-8 border-b border-gray-100">
      <div className="flex overflow-x-auto scrollbar-hide gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative
              ${activeTab === tab.id
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ========================================
// Table of Contents (Improved)
// ========================================

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function GuideTableOfContents() {
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
    const mainElement = document.querySelector('[data-guide-content]');
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

    const mainElement = document.querySelector('[data-guide-content]');
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
      className="hidden xl:block w-56 flex-shrink-0 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto"
      aria-label="Table of contents"
    >
      <div className="py-4 pr-4">
        <h4 className="mb-4 text-xs font-semibold text-gray-900 uppercase tracking-wider">
          On this page
        </h4>

        <ul className="space-y-1">
          {headings.map((heading) => {
            const isActive = heading.id === activeId;
            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`
                    block py-1.5 text-[13px] leading-5 transition-colors border-l-2
                    ${heading.level === 3 ? 'pl-4' : 'pl-3'}
                    ${isActive
                      ? 'text-gray-900 font-medium border-gray-900'
                      : 'text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300'
                    }
                  `}
                >
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

// ========================================
// Main Component
// ========================================

export function GuideLayout({
  title,
  description,
  icon,
  tabs,
  children,
}: GuideLayoutProps) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Scroll to the section if it exists
    const element = document.getElementById(tabId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex gap-12">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <HeroSection title={title} description={description} icon={icon} />

        {tabs && tabs.length > 0 && (
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}

        <div data-guide-content className="guide-content">
          {children}
        </div>
      </div>

      {/* Table of Contents */}
      <GuideTableOfContents />
    </div>
  );
}

// ========================================
// Callout/Card Components for visual interest
// ========================================

interface QuickStartCardProps {
  title?: string;
  command: string;
  description?: string;
}

export function QuickStartCard({ title = 'Quick Start', command, description }: QuickStartCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <button
          onClick={handleCopy}
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {description && (
        <p className="text-sm text-gray-600 mb-3">{description}</p>
      )}
      <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm text-gray-800">
        {command}
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'info' | 'warning';
}

export function InfoCard({ title, children, variant = 'default' }: InfoCardProps) {
  const variantStyles = {
    default: 'bg-gray-50 border-gray-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-amber-50 border-amber-200',
  };

  return (
    <div className={`my-6 p-5 rounded-xl border ${variantStyles[variant]}`}>
      <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}</h4>
      <div className="text-sm text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface FeatureGridProps {
  children: ReactNode;
}

export function FeatureGrid({ children }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {children}
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
      {icon && (
        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 mb-3">
          {icon}
        </div>
      )}
      <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

// ========================================
// Export helper for getting page metadata
// ========================================

export interface GuideMetadata {
  title: string;
  description: string;
  tabs?: GuideTab[];
}

export const guideMetadata: Record<string, GuideMetadata> = {
  installation: {
    title: 'Installation',
    description: 'Get started with r/ui in your React Native or Expo project.',
    tabs: [
      { id: 'quick-start', label: 'Quick Start' },
      { id: 'usage', label: 'Usage' },
      { id: 'theme-setup', label: 'Theme Setup' },
      { id: 'platforms', label: 'Platforms' },
    ],
  },
  customization: {
    title: 'Customization',
    description: 'Learn how to customize r/ui components to match your design system.',
    tabs: [
      { id: 'style-overrides', label: 'Style Overrides' },
      { id: 'extending-components', label: 'Extending' },
      { id: 'adding-custom-variants', label: 'Custom Variants' },
      { id: 'global-style-overrides', label: 'Global Styles' },
    ],
  },
  theming: {
    title: 'Theming',
    description: 'Comprehensive design token system with three built-in themes.',
    tabs: [
      { id: 'built-in-themes', label: 'Built-in Themes' },
      { id: 'design-tokens', label: 'Design Tokens' },
      { id: 'customizing-tokens', label: 'Customization' },
      { id: 'token-reference', label: 'Reference' },
    ],
  },
  'dark-mode': {
    title: 'Dark Mode',
    description: 'Implement theme switching with automatic system preference detection.',
  },
  help: {
    title: 'Help',
    description: 'Get support and learn how to contribute to r/ui.',
  },
  patterns: {
    title: 'Patterns',
    description: 'Common patterns and best practices for building with r/ui.',
  },
  principles: {
    title: 'Principles',
    description: 'The design philosophy and principles behind r/ui.',
  },
};
