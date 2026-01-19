export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const navigation: NavigationSection[] = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', href: '/docs', description: 'Get started with r/ui' },
      { name: 'Installation', href: '/docs/installation', description: 'Install r/ui in your project' },
    ],
  },
  {
    title: 'Components',
    items: [
      { name: 'Button', href: '/docs/components/button', description: 'Clickable button component' },
      { name: 'Text', href: '/docs/components/text', description: 'Typography and text styling' },
    ],
  },
  {
    title: 'Data Display',
    items: [
      { name: 'Card', href: '/docs/components/card', description: 'Container for content' },
      { name: 'Badge', href: '/docs/components/badge', description: 'Status indicators and labels' },
      { name: 'Avatar', href: '/docs/components/avatar', description: 'User profile images' },
      { name: 'Progress', href: '/docs/components/progress', description: 'Progress indicators' },
      { name: 'Skeleton', href: '/docs/components/skeleton', description: 'Loading placeholders' },
      { name: 'Table', href: '/docs/components/table', description: 'Data table component' },
      { name: 'Accordion', href: '/docs/components/accordion', description: 'Expandable sections' },
      { name: 'Collapsible', href: '/docs/components/collapsible', description: 'Single expand/collapse' },
      { name: 'Carousel', href: '/docs/components/carousel', description: 'Horizontal scrolling carousel' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { name: 'Alert', href: '/docs/components/alert', description: 'Contextual feedback messages' },
      { name: 'AlertDialog', href: '/docs/components/alert-dialog', description: 'Confirmation dialogs' },
      { name: 'Toast', href: '/docs/components/toast', description: 'Temporary notifications' },
      { name: 'Dialog', href: '/docs/components/dialog', description: 'Modal dialogs' },
      { name: 'Spinner', href: '/docs/components/spinner', description: 'Loading spinners' },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { name: 'ActionSheet', href: '/docs/components/action-sheet', description: 'iOS-style action menu' },
      { name: 'Command', href: '/docs/components/command', description: 'Command palette / combobox' },
      { name: 'ContextMenu', href: '/docs/components/context-menu', description: 'Long-press triggered menu' },
      { name: 'Dropdown', href: '/docs/components/dropdown', description: 'Dropdown menus' },
      { name: 'HoverCard', href: '/docs/components/hover-card', description: 'Hover preview cards' },
      { name: 'Popover', href: '/docs/components/popover', description: 'Floating content' },
      { name: 'Tooltip', href: '/docs/components/tooltip', description: 'Helpful hints' },
      { name: 'Sheet', href: '/docs/components/sheet', description: 'Bottom sheets' },
    ],
  },
  {
    title: 'Form',
    items: [
      { name: 'Checkbox', href: '/docs/components/checkbox', description: 'Checkbox controls' },
      { name: 'Input', href: '/docs/components/input', description: 'Text input fields' },
      { name: 'OTPInput', href: '/docs/components/otp-input', description: 'Verification code input' },
      { name: 'RadioGroup', href: '/docs/components/radio-group', description: 'Radio button group' },
      { name: 'Select', href: '/docs/components/select', description: 'Selection dropdowns' },
      { name: 'Slider', href: '/docs/components/slider', description: 'Range slider input' },
      { name: 'Switch', href: '/docs/components/switch', description: 'Toggle switches' },
      { name: 'Textarea', href: '/docs/components/textarea', description: 'Multi-line text input' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { name: 'Tabs', href: '/docs/components/tabs', description: 'Tabbed content navigation' },
      { name: 'Breadcrumb', href: '/docs/components/breadcrumb', description: 'Navigation path display' },
      { name: 'Pagination', href: '/docs/components/pagination', description: 'Page navigation controls' },
      { name: 'Link', href: '/docs/components/link', description: 'Styled navigation links' },
      { name: 'Menubar', href: '/docs/components/menubar', description: 'Horizontal menu bar' },
      { name: 'NavigationMenu', href: '/docs/components/navigation-menu', description: 'Site navigation dropdowns' },
    ],
  },
  {
    title: 'Layout',
    items: [
      { name: 'AspectRatio', href: '/docs/components/aspect-ratio', description: 'Maintain aspect ratio' },
      { name: 'Container', href: '/docs/components/container', description: 'Centered max-width wrapper' },
      { name: 'Flex', href: '/docs/components/flex', description: 'Flexbox container' },
      { name: 'Grid', href: '/docs/components/grid', description: 'Grid layout system' },
      { name: 'ScrollArea', href: '/docs/components/scroll-area', description: 'Custom scrollable container' },
      { name: 'Separator', href: '/docs/components/separator', description: 'Visual divider line' },
      { name: 'Spacer', href: '/docs/components/spacer', description: 'Empty space utility' },
    ],
  },
];

// Flatten navigation for search
export function getAllNavigationItems(): (NavigationItem & { category: string })[] {
  return navigation.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      category: section.title,
    }))
  );
}

// Get breadcrumb trail for a given path
export function getBreadcrumbs(pathname: string): { name: string; href: string }[] {
  const breadcrumbs: { name: string; href: string }[] = [{ name: 'Home', href: '/' }];

  if (pathname === '/') {
    return breadcrumbs;
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === 'docs') {
    breadcrumbs.push({ name: 'Docs', href: '/docs' });

    if (segments.length === 1) {
      // /docs - Introduction page
      return breadcrumbs;
    } else if (segments[1] === 'components' && segments[2]) {
      breadcrumbs.push({ name: 'Components', href: '/docs/components/button' });

      // Find the component name
      const allItems = getAllNavigationItems();
      const item = allItems.find((i) => i.href === pathname);
      if (item) {
        breadcrumbs.push({ name: item.name, href: pathname });
      }
    } else if (segments[1] === 'installation') {
      breadcrumbs.push({ name: 'Installation', href: '/docs/installation' });
    }
  }

  return breadcrumbs;
}

// Find current page info
export function getCurrentPageInfo(pathname: string): NavigationItem & { category: string } | undefined {
  return getAllNavigationItems().find((item) => item.href === pathname);
}
