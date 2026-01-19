'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePlayground, DeviceMode, ViewMode } from './PlaygroundContext';
import { navigation, type NavigationSection } from '../../lib/navigation';

// ========================================
// Icons
// ========================================

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// Toolbar Icons
function MobileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function SplitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <line x1="12" x2="12" y1="3" y2="21" />
    </svg>
  );
}

// Toolbar button component
interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function ToolbarButton({ icon, label, active, onClick }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        p-1.5 rounded-md transition-colors
        ${active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
        }
      `}
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );
}

// ========================================
// Dropdown Component
// ========================================

interface DropdownOption {
  id: string;
  label: string;
  href?: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange?: (value: string) => void;
  renderOption?: (option: DropdownOption) => React.ReactNode;
}

function Dropdown({ label, options, value, onChange, renderOption }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const selectedOption = options.find(o => o.id === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-1 px-2 py-1.5 text-sm font-medium rounded-md
          transition-colors
          ${open ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}
        `}
      >
        <span>{selectedOption?.label || label}</span>
        <ChevronDownIcon className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[200px] max-h-[300px] overflow-auto rounded-lg bg-white border border-gray-200 shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="py-1">
            {options.map((option) => {
              const isSelected = option.id === value;
              const content = renderOption ? renderOption(option) : (
                <span className={isSelected ? 'font-medium' : ''}>{option.label}</span>
              );

              if (option.href) {
                return (
                  <Link
                    key={option.id}
                    href={option.href}
                    onClick={() => {
                      onChange?.(option.id);
                      setOpen(false);
                    }}
                    className={`
                      block w-full px-3 py-2 text-sm text-left
                      ${isSelected ? 'bg-gray-50 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}
                    `}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    onChange?.(option.id);
                    setOpen(false);
                  }}
                  className={`
                    block w-full px-3 py-2 text-sm text-left
                    ${isSelected ? 'bg-gray-50 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ========================================
// Navigation Helpers
// ========================================

// Get all component categories (excluding Guides)
function getComponentCategories(): { id: string; label: string }[] {
  return navigation
    .filter(section => section.title !== 'Guides')
    .map(section => ({
      id: section.title.toLowerCase().replace(/\s+/g, '-'),
      label: section.title,
    }));
}

// Get components in a category
function getComponentsInCategory(categoryLabel: string): DropdownOption[] {
  const section = navigation.find(s => s.title === categoryLabel);
  if (!section) return [];

  return section.items.map(item => ({
    id: item.href.split('/').pop() || '',
    label: item.name,
    href: item.href,
  }));
}

// Find which category a component belongs to
function findComponentCategory(componentSlug: string): NavigationSection | undefined {
  return navigation.find(section =>
    section.items.some(item => item.href.endsWith(`/${componentSlug}`))
  );
}

// ========================================
// Main Component
// ========================================

export function PlaygroundNav() {
  const {
    componentData,
    activeVariantId,
    setActiveVariantId,
    goToPrevVariant,
    goToNextVariant,
    variantIndex,
    totalVariants,
    deviceMode,
    setDeviceMode,
    viewMode,
    setViewMode,
    previewTheme,
    setPreviewTheme,
  } = usePlayground();

  if (!componentData) return null;

  // Find current category
  const currentCategory = findComponentCategory(componentData.slug);
  const categories = getComponentCategories();

  // Get category options with href to first component
  const categoryOptions = categories.map(cat => {
    const section = navigation.find(s => s.title === cat.label);
    const firstComponent = section?.items[0];
    return {
      id: cat.id,
      label: cat.label,
      href: firstComponent?.href,
    };
  });

  // Get components in current category
  const componentsInCategory = currentCategory
    ? getComponentsInCategory(currentCategory.title)
    : [];

  // Variant options
  const variantOptions = componentData.variants.map(v => ({
    id: v.id,
    label: v.label,
  }));

  const currentCategoryId = currentCategory?.title.toLowerCase().replace(/\s+/g, '-') || '';

  const deviceModes: { mode: DeviceMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'mobile', icon: <MobileIcon />, label: 'Mobile' },
    { mode: 'tablet', icon: <TabletIcon />, label: 'Tablet' },
    { mode: 'desktop', icon: <DesktopIcon />, label: 'Desktop' },
  ];

  const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'preview', icon: <EyeIcon />, label: 'Preview' },
    { mode: 'code', icon: <CodeIcon />, label: 'Code' },
    { mode: 'split', icon: <SplitIcon />, label: 'Split' },
  ];

  return (
    <div className="flex items-center justify-between py-2">
      {/* Left: Toolbar controls */}
      <div className="flex items-center gap-1">
        {/* Device mode */}
        {deviceModes.map(({ mode, icon, label }) => (
          <ToolbarButton
            key={mode}
            icon={icon}
            label={label}
            active={deviceMode === mode}
            onClick={() => setDeviceMode(mode)}
          />
        ))}

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Theme toggle */}
        <ToolbarButton
          icon={previewTheme === 'light' ? <SunIcon /> : <MoonIcon />}
          label={`Theme: ${previewTheme}`}
          onClick={() => setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light')}
        />

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* View mode */}
        {viewModes.map(({ mode, icon, label }) => (
          <ToolbarButton
            key={mode}
            icon={icon}
            label={label}
            active={viewMode === mode}
            onClick={() => setViewMode(mode)}
          />
        ))}
      </div>

      {/* Right: Navigation dropdowns */}
      <div className="flex items-center gap-1">
        {/* Category dropdown */}
        <Dropdown
          label="Category"
          options={categoryOptions}
          value={currentCategoryId}
        />

        <span className="text-gray-300">/</span>

        {/* Component dropdown */}
        <Dropdown
          label="Component"
          options={componentsInCategory}
          value={componentData.slug}
        />

        <span className="text-gray-300">/</span>

        {/* Variant dropdown */}
        <Dropdown
          label="Variant"
          options={variantOptions}
          value={activeVariantId}
          onChange={setActiveVariantId}
        />

        {/* Prev/Next arrows */}
        <div className="flex items-center gap-0.5 ml-2">
          <button
            onClick={goToPrevVariant}
            disabled={variantIndex <= 0}
            className={`
              p-1.5 rounded-md transition-colors
              ${variantIndex <= 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }
            `}
            title="Previous variant"
            aria-label="Previous variant"
          >
            <ChevronLeftIcon />
          </button>

          <span className="text-xs text-gray-400 min-w-[40px] text-center">
            {variantIndex + 1} / {totalVariants}
          </span>

          <button
            onClick={goToNextVariant}
            disabled={variantIndex >= totalVariants - 1}
            className={`
              p-1.5 rounded-md transition-colors
              ${variantIndex >= totalVariants - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }
            `}
            title="Next variant"
            aria-label="Next variant"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ========================================
// Mobile Nav (Compact)
// ========================================

export function PlaygroundNavMobile() {
  const {
    componentData,
    activeVariantId,
    setActiveVariantId,
    goToPrevVariant,
    goToNextVariant,
    variantIndex,
    totalVariants,
  } = usePlayground();

  if (!componentData) return null;

  const variantOptions = componentData.variants.map(v => ({
    id: v.id,
    label: v.label,
  }));

  const currentVariant = componentData.variants.find(v => v.id === activeVariantId);

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200">
      {/* Component name + variant dropdown combined */}
      <Dropdown
        label={`${componentData.name} / ${currentVariant?.label || ''}`}
        options={variantOptions}
        value={activeVariantId}
        onChange={setActiveVariantId}
      />

      {/* Prev/Next arrows */}
      <div className="flex items-center gap-1">
        <button
          onClick={goToPrevVariant}
          disabled={variantIndex <= 0}
          className={`
            p-2 rounded-md transition-colors
            ${variantIndex <= 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }
          `}
          title="Previous variant"
          aria-label="Previous variant"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={goToNextVariant}
          disabled={variantIndex >= totalVariants - 1}
          className={`
            p-2 rounded-md transition-colors
            ${variantIndex >= totalVariants - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }
          `}
          title="Next variant"
          aria-label="Next variant"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
