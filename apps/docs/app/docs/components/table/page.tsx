'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlaygroundLayout } from '../../../../components/playground';
import { tableData } from '../../../../lib/componentRegistry';

// Placeholder previews for Table - these need to be created
function TableBasicPreview() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--component-border)]">
      <table className="w-full text-sm">
        <thead className="bg-[var(--component-bg-elevated)]">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)]">Name</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)]">Email</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)]">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--component-border)]">
          <tr className="bg-[var(--component-bg)]">
            <td className="px-4 py-3 text-[var(--component-text)]">John Doe</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">john@example.com</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">Admin</td>
          </tr>
          <tr className="bg-[var(--component-bg)]">
            <td className="px-4 py-3 text-[var(--component-text)]">Jane Smith</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">jane@example.com</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">User</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TableStripedPreview() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--component-border)]">
      <table className="w-full text-sm">
        <thead className="bg-[var(--component-bg-elevated)]">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)]">Product</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)]">Price</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)]">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[var(--component-bg)]">
            <td className="px-4 py-3 text-[var(--component-text)]">Widget A</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">$29.99</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">150</td>
          </tr>
          <tr className="bg-[var(--component-bg-elevated)]">
            <td className="px-4 py-3 text-[var(--component-text)]">Widget B</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">$49.99</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">89</td>
          </tr>
          <tr className="bg-[var(--component-bg)]">
            <td className="px-4 py-3 text-[var(--component-text)]">Widget C</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">$19.99</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">300</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TableWithActionsPreview() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--component-border)]">
      <table className="w-full text-sm">
        <thead className="bg-[var(--component-bg-elevated)]">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)]">Task</th>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)]">Status</th>
            <th className="px-4 py-3 text-right font-medium text-[var(--component-text)]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--component-border)]">
          <tr className="bg-[var(--component-bg)]">
            <td className="px-4 py-3 text-[var(--component-text)]">Design review</td>
            <td className="px-4 py-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Complete</span>
            </td>
            <td className="px-4 py-3 text-right">
              <button className="text-[var(--component-text-muted)] hover:text-[var(--component-text)]">Edit</button>
            </td>
          </tr>
          <tr className="bg-[var(--component-bg)]">
            <td className="px-4 py-3 text-[var(--component-text)]">Implementation</td>
            <td className="px-4 py-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">In Progress</span>
            </td>
            <td className="px-4 py-3 text-right">
              <button className="text-[var(--component-text-muted)] hover:text-[var(--component-text)]">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TableSortablePreview() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[var(--component-border)]">
      <table className="w-full text-sm">
        <thead className="bg-[var(--component-bg-elevated)]">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)] cursor-pointer hover:bg-[var(--component-bg)]">
              <span className="flex items-center gap-1">Name ↑</span>
            </th>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)] cursor-pointer hover:bg-[var(--component-bg)]">
              <span className="flex items-center gap-1">Date</span>
            </th>
            <th className="px-4 py-3 text-left font-medium text-[var(--component-text)] cursor-pointer hover:bg-[var(--component-bg)]">
              <span className="flex items-center gap-1">Amount</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--component-border)]">
          <tr className="bg-[var(--component-bg)]">
            <td className="px-4 py-3 text-[var(--component-text)]">Alice</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">Jan 15, 2024</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">$125.00</td>
          </tr>
          <tr className="bg-[var(--component-bg)]">
            <td className="px-4 py-3 text-[var(--component-text)]">Bob</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">Jan 12, 2024</td>
            <td className="px-4 py-3 text-[var(--component-text-muted)]">$89.50</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Map variant IDs to preview components
const previewComponents: Record<string, React.ComponentType> = {
  'basic': TableBasicPreview,
  'striped': TableStripedPreview,
  'with-actions': TableWithActionsPreview,
  'sortable': TableSortablePreview,
};

// Render preview based on variant ID
function renderPreview(variantId: string) {
  const PreviewComponent = previewComponents[variantId];
  if (!PreviewComponent) {
    return <div className="text-gray-500">Preview not found</div>;
  }
  return <PreviewComponent />;
}

function TablePageContent() {
  const searchParams = useSearchParams();
  const variantParam = searchParams.get('variant');

  return (
    <PlaygroundLayout
      componentData={tableData}
      initialVariantId={variantParam || 'basic'}
      renderPreview={renderPreview}
    />
  );
}

// Loading fallback
function PlaygroundSkeleton() {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-white">
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
        <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
        <div className="h-6 w-48 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="h-32 w-64 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function TablePage() {
  return (
    <Suspense fallback={<PlaygroundSkeleton />}>
      <TablePageContent />
    </Suspense>
  );
}
