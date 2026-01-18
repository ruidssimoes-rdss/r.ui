'use client';

import { useState } from 'react';

/**
 * Tabs Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

interface TabsProps {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  defaultTab?: string;
}

function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="w-full">
      {/* Tab List */}
      <div role="tablist" className="flex border-b border-[var(--component-border)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium transition-colors
              border-b-2 -mb-px
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--track-fill)] focus-visible:ring-offset-2
              ${activeTab === tab.id
                ? 'border-[var(--track-fill)] text-[var(--component-text)]'
                : 'border-transparent text-[var(--component-text-muted)] hover:text-[var(--component-text)] hover:border-[var(--component-border)]'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="p-4"
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export function TabsBasicPreview() {
  return (
    <Tabs
      tabs={[
        {
          id: 'account',
          label: 'Account',
          content: (
            <div className="text-sm text-[var(--component-text)]">
              <p>Make changes to your account here. Click save when you're done.</p>
            </div>
          ),
        },
        {
          id: 'password',
          label: 'Password',
          content: (
            <div className="text-sm text-[var(--component-text)]">
              <p>Change your password here. After saving, you'll be logged out.</p>
            </div>
          ),
        },
        {
          id: 'settings',
          label: 'Settings',
          content: (
            <div className="text-sm text-[var(--component-text)]">
              <p>Configure your application settings and preferences.</p>
            </div>
          ),
        },
      ]}
    />
  );
}

export function TabsWithContentPreview() {
  return (
    <Tabs
      tabs={[
        {
          id: 'overview',
          label: 'Overview',
          content: (
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--component-text)]">Dashboard Overview</h4>
              <p className="text-sm text-[var(--component-text-muted)]">
                View your key metrics and recent activity at a glance.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[var(--component-bg-elevated)]">
                  <div className="text-2xl font-bold text-[var(--component-text)]">2,543</div>
                  <div className="text-xs text-[var(--component-text-muted)]">Total Users</div>
                </div>
                <div className="p-3 rounded-lg bg-[var(--component-bg-elevated)]">
                  <div className="text-2xl font-bold text-[var(--component-text)]">$12,430</div>
                  <div className="text-xs text-[var(--component-text-muted)]">Revenue</div>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'analytics',
          label: 'Analytics',
          content: (
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--component-text)]">Analytics Data</h4>
              <p className="text-sm text-[var(--component-text-muted)]">
                Detailed analytics and performance metrics.
              </p>
            </div>
          ),
        },
        {
          id: 'reports',
          label: 'Reports',
          content: (
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--component-text)]">Reports</h4>
              <p className="text-sm text-[var(--component-text-muted)]">
                Generate and download custom reports.
              </p>
            </div>
          ),
        },
      ]}
    />
  );
}

function PillTabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="w-full">
      {/* Pill Tab List */}
      <div role="tablist" className="inline-flex p-1 rounded-lg bg-[var(--component-bg-elevated)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`pill-tabpanel-${tab.id}`}
            id={`pill-tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-md transition-all
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--track-fill)] focus-visible:ring-offset-2
              ${activeTab === tab.id
                ? 'bg-[var(--component-bg)] text-[var(--component-text)] shadow-sm'
                : 'text-[var(--component-text-muted)] hover:text-[var(--component-text)]'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div
        role="tabpanel"
        id={`pill-tabpanel-${activeTab}`}
        aria-labelledby={`pill-tab-${activeTab}`}
        className="mt-4"
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export function TabsPillVariantPreview() {
  return (
    <PillTabs
      tabs={[
        {
          id: 'all',
          label: 'All',
          content: <p className="text-sm text-[var(--component-text-muted)]">Showing all items</p>,
        },
        {
          id: 'active',
          label: 'Active',
          content: <p className="text-sm text-[var(--component-text-muted)]">Showing active items only</p>,
        },
        {
          id: 'archived',
          label: 'Archived',
          content: <p className="text-sm text-[var(--component-text-muted)]">Showing archived items</p>,
        },
      ]}
    />
  );
}
