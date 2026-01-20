'use client';

import { useTokens } from '@/lib/studio/context';
import { TokenTab } from '@/lib/studio/types';
import { cn } from '@/lib/utils';

// Icons for each tab
function PaletteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" stroke="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" stroke="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" stroke="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" stroke="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function TypeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  );
}

function RadiusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="4" />
    </svg>
  );
}

function SpacingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}

function ShadowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </svg>
  );
}

function MotionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </svg>
  );
}

interface TabConfig {
  id: TokenTab;
  icon: React.ReactNode;
  label: string;
}

const tabs: TabConfig[] = [
  { id: 'colors', icon: <PaletteIcon />, label: 'Colors' },
  { id: 'typography', icon: <TypeIcon />, label: 'Typography' },
  { id: 'radius', icon: <RadiusIcon />, label: 'Radius' },
  { id: 'spacing', icon: <SpacingIcon />, label: 'Spacing' },
  { id: 'shadows', icon: <ShadowIcon />, label: 'Shadows' },
  { id: 'animations', icon: <MotionIcon />, label: 'Motion' },
];

export function TokenEditorTabs() {
  const { state, setActiveTab } = useTokens();

  return (
    <div className="flex items-center gap-0.5 px-3 py-2 border-b border-[#E5E7EB] bg-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            'p-2 rounded-md transition-colors',
            state.activeTab === tab.id
              ? 'bg-[#F3F4F6] text-[#111827]'
              : 'text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F9FAFB]'
          )}
          title={tab.label}
        >
          {tab.icon}
        </button>
      ))}
    </div>
  );
}
