'use client';

/**
 * ScrollArea Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 * This ensures proper theme support (Light/Dark/Oatmeal).
 */

export function ScrollAreaVerticalPreview() {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="space-y-2 w-full max-w-sm">
      <p className="text-xs text-[var(--component-text-muted)]">Vertical scrolling</p>
      <div className="h-48 overflow-y-auto rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)]">
        <div className="p-2 space-y-1">
          {items.map((item, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded-md hover:bg-[var(--component-bg-elevated)] text-sm text-[var(--component-text)] transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScrollAreaHorizontalPreview() {
  const tags = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Preact', 'Alpine', 'Lit', 'Ember', 'Backbone'];

  return (
    <div className="space-y-2 w-full max-w-sm">
      <p className="text-xs text-[var(--component-text-muted)]">Horizontal scrolling</p>
      <div className="overflow-x-auto rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)]">
        <div className="flex gap-2 p-3 min-w-max">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full bg-[var(--component-bg-elevated)] text-sm text-[var(--component-text)] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScrollAreaBothPreview() {
  return (
    <div className="space-y-2 w-full max-w-sm">
      <p className="text-xs text-[var(--component-text-muted)]">Both directions</p>
      <div className="h-48 overflow-auto rounded-lg border border-[var(--component-border)] bg-[var(--component-bg)]">
        <div className="min-w-[500px] p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--component-border)]">
                <th className="text-left p-2 text-[var(--component-text)]">ID</th>
                <th className="text-left p-2 text-[var(--component-text)]">Name</th>
                <th className="text-left p-2 text-[var(--component-text)]">Email</th>
                <th className="text-left p-2 text-[var(--component-text)]">Role</th>
                <th className="text-left p-2 text-[var(--component-text)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 15 }, (_, i) => (
                <tr key={i} className="border-b border-[var(--component-border)]">
                  <td className="p-2 text-[var(--component-text-muted)]">{i + 1}</td>
                  <td className="p-2 text-[var(--component-text)]">User {i + 1}</td>
                  <td className="p-2 text-[var(--component-text)]">user{i + 1}@example.com</td>
                  <td className="p-2 text-[var(--component-text)]">Member</td>
                  <td className="p-2 text-[var(--component-text)]">Active</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
