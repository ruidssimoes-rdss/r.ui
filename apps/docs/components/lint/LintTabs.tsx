'use client';

import { useLint, type LintTab } from './LintContext';

// ========================================
// Tab Data
// ========================================

const tabs: { id: LintTab; label: string }[] = [
  { id: 'issues', label: 'Issues' },
  { id: 'rules', label: 'Rules' },
  { id: 'learn', label: 'Learn' },
  { id: 'share', label: 'Share' },
];

// ========================================
// Main Component
// ========================================

export function LintTabs() {
  const { activeTab, setActiveTab } = useLint();

  return (
    <div className="flex overflow-x-auto scrollbar-hide gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors rounded-md leading-5
            ${activeTab === tab.id
              ? 'text-[#111827] bg-[#F3F4F6]'
              : 'text-[#6B7280] hover:text-[#374151] hover:bg-[#F9FAFB]'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ========================================
// Mobile Tabs (Compact)
// ========================================

export function LintTabsMobile() {
  const { activeTab, setActiveTab } = useLint();

  return (
    <div className="flex overflow-x-auto scrollbar-hide gap-1 px-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors rounded-md
            ${activeTab === tab.id
              ? 'text-gray-900 bg-gray-100'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
