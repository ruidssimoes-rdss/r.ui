'use client';

import { useTokens } from '@/lib/studio/context';
import { TokenTab } from '@/lib/studio/types';
import { ColorsTab } from './tabs/ColorsTab';
import { TypographyTab } from './tabs/TypographyTab';
import { SpacingTab } from './tabs/SpacingTab';
import { RadiusTab } from './tabs/RadiusTab';
import { ShadowsTab } from './tabs/ShadowsTab';
import { AnimationsTab } from './tabs/AnimationsTab';
import { cn } from '@/lib/utils';

const tabs: { id: TokenTab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'colors',
    label: 'Colors',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" />
        <circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'typography',
    label: 'Type',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    id: 'spacing',
    label: 'Space',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    ),
  },
  {
    id: 'radius',
    label: 'Radius',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="6" />
      </svg>
    ),
  },
  {
    id: 'shadows',
    label: 'Shadows',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="12" height="12" rx="2" />
        <path d="M9 21h12a2 2 0 0 0 2-2V9" />
      </svg>
    ),
  },
  {
    id: 'animations',
    label: 'Motion',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export function TokenSidebar() {
  const { state, setActiveTab } = useTokens();

  const renderTabContent = () => {
    switch (state.activeTab) {
      case 'colors':
        return <ColorsTab />;
      case 'typography':
        return <TypographyTab />;
      case 'spacing':
        return <SpacingTab />;
      case 'radius':
        return <RadiusTab />;
      case 'shadows':
        return <ShadowsTab />;
      case 'animations':
        return <AnimationsTab />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-muted/30">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
              state.activeTab === id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">{renderTabContent()}</div>
    </div>
  );
}
