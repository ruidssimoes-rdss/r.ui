# r/ui React Native

A premium React Native component library built for iOS, Android, and Web.

## Features

- **45+ Components** — Forms, overlays, navigation, data display
- **3 Themes** — Dark, Light, Oatmeal (and customizable)
- **Universal** — iOS, Android, Web via React Native
- **Accessible** — WCAG 2.1 compliant, screen reader tested
- **Performant** — Compositor-only animations, reduced motion support
- **Composable** — Compound component patterns

## Installation

```bash
npm install @r-ui/react-native
# or
yarn add @r-ui/react-native
# or
pnpm add @r-ui/react-native
```

## Quick Start

```tsx
import { Button, Card, CardContent, Text } from '@r-ui/react-native';

function MyComponent() {
  return (
    <Card>
      <CardContent>
        <Text>Welcome to r/ui</Text>
        <Button onPress={() => console.log('pressed')}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Components

### Data Display
- Avatar, Badge, Card, Progress, Skeleton, Table, Accordion, Collapsible, Carousel

### Feedback
- Alert, Toast, Dialog, AlertDialog, Spinner

### Overlays
- Dropdown, Popover, Tooltip, HoverCard, ContextMenu, Sheet, ActionSheet

### Forms
- Input, Textarea, Checkbox, Switch, Select, RadioGroup, Slider, OTPInput, Command

### Navigation
- Tabs, Breadcrumb, Pagination, Link, Menubar, NavigationMenu

### Layout
- Container, Flex, Grid, Separator, Spacer, AspectRatio, ScrollArea

## Accessibility

r/ui is built with accessibility as a priority:

- All interactive elements meet WCAG 2.1 touch target requirements (44×44px minimum)
- Icon-only buttons include descriptive labels for screen readers
- Keyboard navigation support on all interactive components
- ARIA roles and states on form controls
- Focus management in overlays and modals
- Full `prefers-reduced-motion` support for users sensitive to animation

### Touch Target Compliance

All interactive components have touch targets of at least 44×44 pixels, either through:
- Direct sizing (`minWidth: 44, minHeight: 44`)
- Expanded hit areas using `hitSlop`

### Reduced Motion

All animations respect the system's reduced motion preference:

```tsx
import { useReducedMotion } from '@r-ui/react-native';

function MyAnimatedComponent() {
  const reducedMotion = useReducedMotion();

  // Animations will be disabled when reducedMotion is true
}
```

See [ANIMATION.md](./ANIMATION.md) for detailed animation guidelines.

## Hooks

### useReducedMotion

Detects if the user prefers reduced motion:

```tsx
import { useReducedMotion } from '@r-ui/react-native';

function MyComponent() {
  const reducedMotion = useReducedMotion();

  return reducedMotion ? <StaticView /> : <AnimatedView />;
}
```

### useIsVisible

Detects if an element is visible in the viewport (web only):

```tsx
import { useIsVisible } from '@r-ui/react-native';

function MyComponent() {
  const { ref, isVisible } = useIsVisible();

  return <View ref={ref}>{isVisible && <ExpensiveContent />}</View>;
}
```

## Tokens

Access design tokens directly:

```tsx
import { colors, spacing, radius, shadows } from '@r-ui/react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.elevated,
    padding: spacing[4],
    borderRadius: radius.lg,
    ...shadows.md,
  },
});
```

## Documentation

- [Animation Guidelines](./ANIMATION.md)
- [Review Checklist](./REVIEW_CHECKLIST.md)

## License

MIT
