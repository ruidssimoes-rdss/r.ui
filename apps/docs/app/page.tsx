'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

/**
 * Hyena Landing Page v3 - "build better, faster."
 *
 * Design Requirements:
 * - 4px/8px grid spacing (no arbitrary values)
 * - ONLY hy-* palette colors (no hardcoded hex)
 * - Flat button system, NO neumorphic shadows
 * - Centered nav layout
 * - Complete ARIA support
 */

// ============================================================================
// Code Examples for Hero Rotation
// ============================================================================

const codeExamples = [
  {
    filename: 'button.tsx',
    code: `// yours now. no strings attached.
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  return (
    <div className="flex gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}`,
  },
  {
    filename: 'datatable.tsx',
    code: `// powerful data handling, zero config
import { DataTable } from '@/components/ui/datatable'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
]

export default function Users() {
  return <DataTable columns={columns} data={users} />
}`,
  },
  {
    filename: 'command.tsx',
    code: `// keyboard-first navigation
import { Command, CommandInput } from '@/components/ui/command'

export default function Palette() {
  return (
    <Command>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandItem>New File</CommandItem>
        <CommandItem>Settings</CommandItem>
      </CommandList>
    </Command>
  )
}`,
  },
  {
    filename: 'toast.tsx',
    code: `// instant feedback, beautiful defaults
import { toast } from '@/components/ui/toast'

export default function SaveButton() {
  const handleSave = async () => {
    await save()
    toast.success('Changes saved!')
  }

  return <Button onClick={handleSave}>Save</Button>
}`,
  },
  {
    filename: 'dialog.tsx',
    code: `// accessible modals, done right
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

export default function ConfirmDelete() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>Are you sure?</DialogContent>
    </Dialog>
  )
}`,
  },
  {
    filename: 'tabs.tsx',
    code: `// simple state, smooth transitions
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Settings() {
  return (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="general">...</TabsContent>
    </Tabs>
  )
}`,
  },
];

// ============================================================================
// Sample Data for DataTable
// ============================================================================

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  role: string;
  revenue: string;
}

const sampleUsers: User[] = [
  { id: 1, name: 'olivia martin', email: 'olivia@acme.com', status: 'active', role: 'admin', revenue: '$24,500' },
  { id: 2, name: 'jackson lee', email: 'jackson@acme.com', status: 'active', role: 'member', revenue: '$18,200' },
  { id: 3, name: 'isabella nguyen', email: 'isabella@acme.com', status: 'pending', role: 'member', revenue: '$12,800' },
  { id: 4, name: 'william kim', email: 'william@acme.com', status: 'inactive', role: 'viewer', revenue: '$8,400' },
];

// ============================================================================
// Chart Data
// ============================================================================

const chartData = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 1800 },
  { month: 'Apr', revenue: 2780, expenses: 1908 },
  { month: 'May', revenue: 1890, expenses: 2800 },
  { month: 'Jun', revenue: 2390, expenses: 2200 },
  { month: 'Jul', revenue: 3490, expenses: 2100 },
  { month: 'Aug', revenue: 4200, expenses: 2400 },
  { month: 'Sep', revenue: 3800, expenses: 2100 },
  { month: 'Oct', revenue: 4500, expenses: 2800 },
  { month: 'Nov', revenue: 5200, expenses: 3000 },
  { month: 'Dec', revenue: 6100, expenses: 3200 },
];

// ============================================================================
// Icons
// ============================================================================

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.33" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ComponentIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
    </svg>
  );
}

function ToolsIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.4" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.4" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SortIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M8 15l4 4 4-4M8 9l4-4 4 4" />
    </svg>
  );
}

function ColumnsIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.33" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M15 3v18" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.33" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.33" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M12 18v-6M9 15h6" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.33" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  );
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.33" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.33" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function SidebarIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.33" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.67" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.67" aria-hidden="true">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.67" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SwatchIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.67" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

// ============================================================================
// Hero Section
// ============================================================================

function HeroSection() {
  return (
    <section className="flex flex-col items-center px-8 py-16 gap-8">
      {/* Pills */}
      <div className="flex flex-row flex-wrap justify-center items-center gap-3">
        <span className="landing-pill">
          <ComponentIcon className="text-hy-900" />
          70+ components
        </span>
        <span className="landing-pill">
          <ToolsIcon className="text-hy-900" />
          suite of dev tools
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-5xl font-semibold leading-none tracking-tight text-center text-hy-900">
        build better, faster.
      </h1>

      {/* Subtext */}
      <p className="text-lg leading-7 text-center text-hy-500 max-w-lg">
        copy. paste. ship. no npm drama, no version headache.
        <br />
        just clean code that becomes yours the moment you use it.
      </p>

      {/* CTA */}
      <Link href="#components" className="landing-btn-primary landing-focus-ring">
        browse playground
      </Link>
    </section>
  );
}

// ============================================================================
// Code Preview with Rotation
// ============================================================================

function CodePreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % codeExamples.length);
        setIsVisible(true);
      }, 300);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const currentExample = codeExamples[currentIndex];

  const copyCode = () => {
    navigator.clipboard.writeText(currentExample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyNpx = () => {
    navigator.clipboard.writeText('npx hyena-studio init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex flex-col items-center gap-8 max-w-3xl mx-auto px-6 pb-24">
      <p className="font-mono text-sm leading-5 text-center text-hy-400">
        built for react native · ios · android · web
      </p>

      {/* Code Block */}
      <div className="landing-code-wrapper w-full rounded-xl overflow-hidden bg-hy-800 border border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3 mx-auto">
            <div className="flex gap-2" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
            </div>
            <span className="font-mono text-xs leading-4 text-white">{currentExample.filename}</span>
          </div>
          <button
            className="landing-copy-btn p-2 rounded text-white/50 hover:text-white transition-all landing-focus-ring"
            onClick={copyCode}
            aria-label="Copy code to clipboard"
          >
            <CopyIcon />
          </button>
        </div>

        <pre
          className={`px-6 pb-6 pt-2 font-mono text-sm leading-6 text-white overflow-x-auto transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <code>{currentExample.code}</code>
        </pre>
      </div>

      {/* NPX Button - FLAT style */}
      <button
        className="landing-code-copy-btn landing-focus-ring"
        onClick={copyNpx}
        aria-label="Copy install command: npx hyena-studio init"
      >
        <span>npx hyena-studio init</span>
        <CopyIcon className="text-hy-400" />
      </button>

      {/* Code rotation indicator */}
      <div className="flex gap-2" aria-label="Code examples">
        {codeExamples.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-hy-900' : 'bg-hy-200'}`}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                setCurrentIndex(idx);
                setIsVisible(true);
              }, 300);
            }}
            aria-label={`View code example ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// DataTable Showcase
// ============================================================================

function DataTableShowcase() {
  const [selected, setSelected] = useState<Set<number>>(new Set([1]));
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return sampleUsers;
    return sampleUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="rounded-xl p-6 mb-12 border border-hy-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs leading-4 tracking-wider text-hy-400">01</span>
          <h3 className="text-lg font-semibold leading-7 text-hy-800">datatable</h3>
          <span className="text-xs leading-4 text-hy-400">sorting · filtering · selection · pagination</span>
        </div>
        <button className="landing-btn-ghost text-xs landing-focus-ring" aria-label="View datatable source code">
          view code
          <ExternalLinkIcon />
        </button>
      </div>

      <div className="rounded-xl overflow-hidden bg-white/50 border border-hy-200 backdrop-blur-sm">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-hy-300" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search table"
                className="pl-10 pr-4 py-2 text-sm bg-white rounded-lg w-64 border border-hy-200 h-10 text-hy-900 placeholder:text-hy-400 focus:outline-none focus:border-hy-400"
              />
            </div>
            <select
              aria-label="Filter by status"
              className="text-sm bg-white rounded-lg px-3 py-2 border border-hy-200 h-10 w-32 text-hy-800"
            >
              <option>All statuses</option>
              <option>active</option>
              <option>pending</option>
              <option>inactive</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-hy-100 transition-colors landing-focus-ring" aria-label="Toggle column visibility">
              <ColumnsIcon className="text-hy-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-hy-100 transition-colors landing-focus-ring" aria-label="Export table data">
              <DownloadIcon className="text-hy-400" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-72">
          <table className="landing-data-table w-full" role="grid" aria-label="User data table">
            <thead>
              <tr>
                <th scope="col" className="text-left py-3 px-6 w-12">
                  <input
                    type="checkbox"
                    className="landing-checkbox"
                    checked={selected.size === filteredUsers.length}
                    onChange={() => {
                      if (selected.size === filteredUsers.length) {
                        setSelected(new Set());
                      } else {
                        setSelected(new Set(filteredUsers.map((u) => u.id)));
                      }
                    }}
                    aria-label="Select all rows"
                  />
                </th>
                <th scope="col" className="text-left py-3 px-6 sortable">
                  <span className="font-medium text-xs tracking-wider text-hy-500">name</span>
                  <SortIcon className="inline ml-1 text-hy-500" />
                </th>
                <th scope="col" className="text-left py-3 px-6">
                  <span className="font-medium text-xs tracking-wider text-hy-500">email</span>
                </th>
                <th scope="col" className="text-left py-3 px-6">
                  <span className="font-medium text-xs tracking-wider text-hy-500">status</span>
                </th>
                <th scope="col" className="text-left py-3 px-6">
                  <span className="font-medium text-xs tracking-wider text-hy-500">role</span>
                </th>
                <th scope="col" className="text-right py-3 px-6">
                  <span className="font-medium text-xs tracking-wider text-hy-500">revenue</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={selected.has(user.id) ? 'row-selected' : ''}>
                  <td className="py-3 px-6">
                    <input
                      type="checkbox"
                      className="landing-checkbox"
                      checked={selected.has(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </td>
                  <td className="py-3 px-6 font-medium text-sm text-hy-800">{user.name}</td>
                  <td className="py-3 px-6 text-sm text-hy-800">{user.email}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'landing-status-active'
                          : user.status === 'pending'
                          ? 'landing-status-pending'
                          : 'landing-status-inactive'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current opacity-60" aria-hidden="true" />
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-sm text-hy-800">{user.role}</td>
                  <td className="py-3 px-6 text-right font-mono text-sm text-hy-800">{user.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-hy-200">
          <span className="text-xs text-hy-500">{selected.size} of {filteredUsers.length} row(s) selected</span>
          <div className="flex items-center gap-2">
            <button className="landing-pagination-btn" disabled aria-label="Go to previous page">
              Previous
            </button>
            <button className="landing-pagination-btn" aria-label="Go to next page">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Command Palette Showcase
// ============================================================================

function CommandShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { icon: FileIcon, label: 'create new document', shortcut: '⌘ N', group: 'suggestions' },
    { icon: FolderIcon, label: 'create new folder', shortcut: '⌘ ⇧ N', group: 'suggestions' },
    { icon: TeamIcon, label: 'create new team', shortcut: '⌘ T', group: 'suggestions' },
    { icon: SettingsIcon, label: 'open settings', shortcut: '⌘ ,', group: 'actions' },
    { icon: SidebarIcon, label: 'toggle sidebar', shortcut: '⌘ B', group: 'actions' },
  ];

  const suggestions = items.filter((i) => i.group === 'suggestions');
  const actions = items.filter((i) => i.group === 'actions');

  return (
    <div className="rounded-xl p-6 mb-12 border border-hy-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs leading-4 tracking-wider text-hy-400">02</span>
          <h3 className="text-lg font-semibold leading-7 text-hy-800">command</h3>
          <span className="text-xs leading-4 text-hy-400">fuzzy search · keyboard nav · sections · shortcuts</span>
        </div>
        <button className="landing-btn-ghost text-xs landing-focus-ring" aria-label="View command palette source code">
          view code
          <ExternalLinkIcon />
        </button>
      </div>

      <div className="flex justify-center">
        <div
          className="rounded-xl w-full max-w-lg overflow-hidden bg-white/50 border border-hy-200"
          role="dialog"
          aria-label="Command palette"
          aria-modal="true"
        >
          {/* Search */}
          <div className="flex items-center gap-3 px-4 py-3">
            <SearchIcon className="text-hy-300 w-[18px] h-[18px]" />
            <div className="flex-1">
              <span className="text-base leading-6 text-hy-800">create new</span>
              <span className="landing-cursor-blink text-hy-800" aria-hidden="true">|</span>
            </div>
            <span className="font-mono text-xs text-hy-300">esc to close</span>
          </div>

          {/* Results */}
          <div className="py-2 overflow-y-auto max-h-72" role="listbox" aria-label="Command suggestions">
            <div className="px-4 pt-4 pb-2">
              <p className="font-medium text-xs tracking-wider text-hy-300">suggestions</p>
            </div>

            {suggestions.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.label}
                  className={`landing-cmd-item flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer ${isActive ? 'active' : ''}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <Icon className={isActive ? 'opacity-60 text-white' : 'text-hy-500'} />
                  <span className={`flex-1 text-sm leading-5 ${isActive ? 'text-white' : 'text-hy-800'}`}>{item.label}</span>
                  <span className={`landing-cmd-shortcut ${isActive ? '' : ''}`}>{item.shortcut}</span>
                </div>
              );
            })}

            <div className="px-4 pt-4 pb-2">
              <p className="font-medium text-xs tracking-wider text-hy-300">actions</p>
            </div>

            {actions.map((item, idx) => {
              const Icon = item.icon;
              const actualIndex = suggestions.length + idx;
              const isActive = actualIndex === activeIndex;
              return (
                <div
                  key={item.label}
                  className={`landing-cmd-item flex items-center gap-3 px-4 py-2 mx-2 rounded-lg cursor-pointer ${isActive ? 'active' : ''}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseEnter={() => setActiveIndex(actualIndex)}
                >
                  <Icon className={isActive ? 'opacity-60 text-white' : 'text-hy-500'} />
                  <span className={`flex-1 text-sm leading-5 ${isActive ? 'text-white' : 'text-hy-800'}`}>{item.label}</span>
                  <span className={`landing-cmd-shortcut ${isActive ? '' : ''}`}>{item.shortcut}</span>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 px-4 py-2 bg-hy-100 border-t border-hy-200">
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white rounded font-mono text-xs border border-hy-200 text-hy-400">↑</kbd>
              <kbd className="px-2 py-1 bg-white rounded font-mono text-xs border border-hy-200 text-hy-400">↓</kbd>
              <span className="text-xs text-hy-400">navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white rounded font-mono text-xs border border-hy-200 text-hy-400">↵</kbd>
              <span className="text-xs text-hy-400">select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white rounded font-mono text-xs border border-hy-200 text-hy-400">esc</kbd>
              <span className="text-xs text-hy-400">close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Chart Showcase
// ============================================================================

function ChartShowcase() {
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));
  const svgWidth = 600;
  const svgHeight = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 50 };
  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  const xScale = (idx: number) => padding.left + (idx / (chartData.length - 1)) * chartWidth;
  const yScale = (val: number) => padding.top + chartHeight - (val / maxRevenue) * chartHeight;

  const revenuePoints = chartData.map((d, i) => `${xScale(i)},${yScale(d.revenue)}`).join(' ');
  const expensePoints = chartData.map((d, i) => `${xScale(i)},${yScale(d.expenses)}`).join(' ');

  return (
    <div className="rounded-xl p-6 mb-8 border border-hy-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs leading-4 tracking-wider text-hy-400">03</span>
          <h3 className="text-lg font-semibold leading-7 text-hy-800">chart</h3>
          <span className="text-xs leading-4 text-hy-400">tooltips · legends · responsive · animations</span>
        </div>
        <button className="landing-btn-ghost text-xs landing-focus-ring" aria-label="View chart source code">
          view code
          <ExternalLinkIcon />
        </button>
      </div>

      <div className="rounded-xl overflow-hidden bg-white/50 border border-hy-200 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h4 className="font-medium text-sm leading-5 text-hy-800">revenue over time</h4>
            <p className="text-xs leading-4 text-hy-400">monthly revenue for 2024</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-hy-800" aria-hidden="true" />
              <span className="text-xs text-hy-500">revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-hy-300" aria-hidden="true" />
              <span className="text-xs text-hy-500">expenses</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-72 relative">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full"
              aria-label="Line chart showing monthly revenue and expenses for 2024"
              role="img"
            >
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
                const y = padding.top + chartHeight * (1 - pct);
                return (
                  <line
                    key={pct}
                    x1={padding.left}
                    y1={y}
                    x2={svgWidth - padding.right}
                    y2={y}
                    stroke="var(--hy-200)"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                );
              })}

              {/* Expense line */}
              <polyline
                points={expensePoints}
                fill="none"
                stroke="var(--hy-300)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Revenue line */}
              <polyline
                points={revenuePoints}
                fill="none"
                stroke="var(--hy-900)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Revenue dots */}
              {chartData.map((d, i) => (
                <circle key={`revenue-${i}`} cx={xScale(i)} cy={yScale(d.revenue)} r="4" fill="var(--hy-900)" />
              ))}

              {/* Expense dots */}
              {chartData.map((d, i) => (
                <circle key={`expense-${i}`} cx={xScale(i)} cy={yScale(d.expenses)} r="4" fill="var(--hy-300)" />
              ))}

              {/* X axis labels */}
              {chartData.map((d, i) => (
                <text
                  key={`label-${i}`}
                  x={xScale(i)}
                  y={svgHeight - 5}
                  textAnchor="middle"
                  className="text-xs fill-hy-400"
                  style={{ fontSize: '10px' }}
                >
                  {d.month}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Components Showcase Section
// ============================================================================

function ComponentsShowcase() {
  return (
    <section id="components" className="border-y border-hy-100 bg-hy-50/50">
      <div className="mx-auto px-8 py-24 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 gap-4">
          <p className="font-mono text-sm leading-5 text-hy-400">showcase</p>
          <h2 className="text-3xl font-semibold leading-9 tracking-tight text-hy-800">
            built as the sweet spot in development.
          </h2>
          <p className="text-base leading-6 text-hy-500">
            Tools that land exactly where you need them. Fast to grab. Easy to own. Powerful enough for real work.
          </p>
        </div>

        {/* DataTable */}
        <DataTableShowcase />

        {/* Command Palette */}
        <CommandShowcase />

        {/* Chart */}
        <ChartShowcase />

        {/* CTA */}
        <div className="text-center pt-4">
          <Link href="/docs/components" className="landing-btn-primary landing-focus-ring">
            explore all components
            <ArrowRightIcon className="text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Tools Section
// ============================================================================

function ToolsSection() {
  return (
    <section id="tools" className="flex flex-col items-center py-24 px-8 gap-12">
      <div className="flex flex-col items-center text-center gap-4">
        <p className="font-mono text-sm leading-5 text-hy-400">tools</p>
        <h2 className="text-3xl font-semibold leading-9 tracking-tight text-hy-900">ship faster with dev tools</h2>
        <p className="text-base leading-6 text-hy-500">
          beyond components - productivity tools that fit into your workflow.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {/* Studio - Active/Dark */}
        <article className="flex flex-col p-6 gap-6 rounded-xl bg-hy-900 border border-white/20">
          <div className="flex items-start gap-3">
            <PaletteIcon className="text-white" />
            <span className="text-sm font-bold leading-6 text-white">studio</span>
          </div>
          <div className="flex flex-col justify-between flex-1 gap-6">
            <p className="text-sm leading-6 text-white/90">
              Define colors, fonts, spacing, radius, gaps in one place. See it live. Download everything. Plug it in whenever.
            </p>
            <a href="https://hyena.studio/tools" className="text-sm font-medium leading-6 text-white hover:underline">
              open tool →
            </a>
          </div>
        </article>

        {/* Lint - Active/Dark */}
        <article className="flex flex-col p-6 gap-6 rounded-xl bg-hy-900 border border-white/20">
          <div className="flex items-start gap-3">
            <CheckIcon className="text-white" />
            <span className="text-sm font-bold leading-6 text-white">lint</span>
          </div>
          <div className="flex flex-col justify-between flex-1 gap-6">
            <p className="text-sm leading-6 text-white/90">
              Automated design and accessibility linter. Paste code, get instant feedback on issues and best practices.
            </p>
            <a href="https://hyena.studio/tools" className="text-sm font-medium leading-6 text-white hover:underline">
              open tool →
            </a>
          </div>
        </article>

        {/* Icon - Coming Soon/Light */}
        <article className="flex flex-col p-6 gap-6 rounded-xl bg-hy-50 border border-hy-200 transition-all hover:border-hy-300 hover:shadow-sm">
          <div className="flex items-start gap-3">
            <StarIcon className="text-hy-400" />
            <span className="text-sm font-bold leading-6 text-hy-400">icon</span>
          </div>
          <div className="flex flex-col justify-between flex-1 gap-6">
            <p className="text-sm leading-6 text-hy-400">
              Search, preview and copy icons. Multiple styles, clean exports. Built for speed.
            </p>
            <span className="text-sm font-medium leading-6 text-hy-300">coming soon</span>
          </div>
        </article>

        {/* Theme - Coming Soon/Light */}
        <article className="flex flex-col p-6 gap-6 rounded-xl bg-hy-50 border border-hy-200 transition-all hover:border-hy-300 hover:shadow-sm">
          <div className="flex items-start gap-3">
            <SwatchIcon className="text-hy-400" />
            <span className="text-sm font-bold leading-6 text-hy-400">theme</span>
          </div>
          <div className="flex flex-col justify-between flex-1 gap-6">
            <p className="text-sm leading-6 text-hy-400">
              Live theme generator. Pick a base, tweak, export. Dark mode, light mode, any mode you want.
            </p>
            <span className="text-sm font-medium leading-6 text-hy-300">coming soon</span>
          </div>
        </article>
      </div>
    </section>
  );
}

// ============================================================================
// Footer
// ============================================================================

function Footer() {
  return (
    <footer className="border-t border-hy-100">
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <span className="font-pixelify text-sm text-hy-800">hyena</span>
            <span className="text-xs text-hy-400">© 2024 hyena studio. all rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-sm text-hy-500 hover:text-hy-900 transition-colors">
              docs
            </Link>
            <Link href="#components" className="text-sm text-hy-500 hover:text-hy-900 transition-colors">
              components
            </Link>
            <a
              href="https://github.com/ruidssimoes-rdss/hyena"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-hy-500 hover:text-hy-900 transition-colors"
            >
              github
            </a>
            <a
              href="https://twitter.com/hyenastudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-hy-500 hover:text-hy-900 transition-colors"
            >
              twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function HomePage() {
  return (
    <div className="bg-white text-hy-900 font-sans min-h-screen">
      {/* Page vertical lines */}
      <div className="landing-page-line landing-page-line-left" aria-hidden="true" />
      <div className="landing-page-line landing-page-line-right" aria-hidden="true" />

      {/* Hero */}
      <HeroSection />

      {/* Code Preview */}
      <CodePreview />

      {/* Components Showcase */}
      <ComponentsShowcase />

      {/* Tools Section */}
      <ToolsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
