'use client';

import Link from 'next/link';

// Icons
function PaletteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" stroke="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" stroke="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" stroke="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" stroke="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function SearchCodeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m13 13.5 2-2.5-2-2.5" />
      <path d="m9 10.5-2 2.5 2 2.5" />
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

function ToolCard({ title, description, href, icon, badge }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col p-6 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#18181B] hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 flex items-center justify-center bg-[#F3F4F6] rounded-lg text-[#374151] group-hover:bg-[#18181B] group-hover:text-white transition-colors">
          {icon}
        </div>
        {badge && (
          <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-[#EEF2FF] text-[#4F46E5] rounded-full">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[#18181B]">{title}</h3>
      <p className="mt-2 text-sm text-[#6B7280] leading-relaxed flex-1">{description}</p>
      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#18181B] group-hover:text-[#3B82F6] transition-colors">
        Open tool
        <ArrowRightIcon />
      </div>
    </Link>
  );
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-xl">
              <span className="font-space-mono font-normal text-[#111827]">r/</span>
              <span className="font-script text-[#111827]" style={{ fontSize: '1.15em' }}>
                ui
              </span>
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/docs" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                Docs
              </Link>
              <Link
                href="/docs/components"
                className="text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                Components
              </Link>
              <Link href="/tools" className="text-[#111827] font-medium">
                Tools
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#18181B]">Tools</h1>
          <p className="mt-2 text-lg text-[#6B7280]">
            Productivity tools for designers and developers working with r/ui
          </p>
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ToolCard
            title="Studio"
            description="Visual token builder for creating and customizing your design system. Define colors, typography, spacing, and more with an intuitive interface and live preview."
            href="/studio"
            icon={<PaletteIcon />}
            badge="New"
          />
          <ToolCard
            title="Lint"
            description="Automated design and accessibility linter for React Native. Paste your component code and get instant feedback on styling issues, accessibility problems, and best practices."
            href="/lint"
            icon={<SearchCodeIcon />}
          />
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-[#18181B] mb-4">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-dashed border-[#D1D5DB] rounded-xl bg-white/50">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F3F4F6] rounded-lg text-[#9CA3AF]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#9CA3AF]">Theme Generator</h3>
              <p className="mt-2 text-sm text-[#9CA3AF]">
                AI-powered theme generation from brand guidelines, images, or descriptions.
              </p>
            </div>
            <div className="p-6 border border-dashed border-[#D1D5DB] rounded-xl bg-white/50">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F3F4F6] rounded-lg text-[#9CA3AF]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" x2="16" y1="21" y2="21" />
                  <line x1="12" x2="12" y1="17" y2="21" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#9CA3AF]">Playground</h3>
              <p className="mt-2 text-sm text-[#9CA3AF]">
                Interactive component playground with live code editing and hot reload.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
