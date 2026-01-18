'use client';

/**
 * Table Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

const invoices = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
];

const statusStyles: Record<string, string> = {
  Paid: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Unpaid: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export function TableBasicPreview() {
  return (
    <div className="rounded-lg border border-[var(--component-border)] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--component-bg-elevated)] border-b border-[var(--component-border)]">
            <th className="text-left px-4 py-3 font-medium text-[var(--component-text)]">Invoice</th>
            <th className="text-left px-4 py-3 font-medium text-[var(--component-text)]">Status</th>
            <th className="text-left px-4 py-3 font-medium text-[var(--component-text)]">Method</th>
            <th className="text-right px-4 py-3 font-medium text-[var(--component-text)]">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-[var(--component-border)] last:border-b-0">
              <td className="px-4 py-3 font-medium text-[var(--component-text)]">{invoice.id}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[invoice.status]}`}>
                  {invoice.status}
                </span>
              </td>
              <td className="px-4 py-3 text-[var(--component-text-muted)]">{invoice.method}</td>
              <td className="px-4 py-3 text-right text-[var(--component-text)]">{invoice.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TableStripedPreview() {
  return (
    <div className="rounded-lg border border-[var(--component-border)] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--component-bg-elevated)] border-b border-[var(--component-border)]">
            <th className="text-left px-4 py-3 font-medium text-[var(--component-text)]">Name</th>
            <th className="text-left px-4 py-3 font-medium text-[var(--component-text)]">Email</th>
            <th className="text-left px-4 py-3 font-medium text-[var(--component-text)]">Role</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
            { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
            { name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
            { name: 'Alice Brown', email: 'alice@example.com', role: 'Editor' },
          ].map((user, i) => (
            <tr
              key={user.email}
              className={`border-b border-[var(--component-border)] last:border-b-0 ${i % 2 === 1 ? 'bg-[var(--component-bg-elevated)]/50' : ''}`}
            >
              <td className="px-4 py-3 font-medium text-[var(--component-text)]">{user.name}</td>
              <td className="px-4 py-3 text-[var(--component-text-muted)]">{user.email}</td>
              <td className="px-4 py-3 text-[var(--component-text-muted)]">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TableWithActionsPreview() {
  return (
    <div className="rounded-lg border border-[var(--component-border)] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--component-bg-elevated)] border-b border-[var(--component-border)]">
            <th className="text-left px-4 py-3 font-medium text-[var(--component-text)]">Project</th>
            <th className="text-left px-4 py-3 font-medium text-[var(--component-text)]">Status</th>
            <th className="text-left px-4 py-3 font-medium text-[var(--component-text)]">Progress</th>
            <th className="text-right px-4 py-3 font-medium text-[var(--component-text)]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Website Redesign', status: 'In Progress', progress: 65 },
            { name: 'Mobile App', status: 'Planning', progress: 20 },
            { name: 'API Integration', status: 'Completed', progress: 100 },
          ].map((project) => (
            <tr key={project.name} className="border-b border-[var(--component-border)] last:border-b-0 hover:bg-[var(--component-bg-elevated)]/50 transition-colors">
              <td className="px-4 py-3 font-medium text-[var(--component-text)]">{project.name}</td>
              <td className="px-4 py-3 text-[var(--component-text-muted)]">{project.status}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[var(--track-bg)] rounded-full overflow-hidden max-w-[100px]">
                    <div
                      className="h-full bg-[var(--track-fill)] rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-[var(--component-text-muted)]">{project.progress}%</span>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-sm text-[var(--track-fill)] hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
