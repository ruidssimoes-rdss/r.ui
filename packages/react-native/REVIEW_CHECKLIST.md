# r.ui Component Review Checklist

Use this checklist when building new components or auditing existing ones.
Score: Count passing items. Target: 90%+ for production-ready components.

---

## Accessibility (Critical)

- [ ] All interactive elements have `accessibilityRole` set
- [ ] Icon-only buttons have `accessibilityLabel`
- [ ] Touch targets are ≥44×44px (use `hitSlop` if visual size must be smaller)
- [ ] Focus states are visible (`focus-visible:ring-2` or equivalent)
- [ ] Form inputs have associated labels (explicit or `accessibilityLabel`)
- [ ] State changes announced (e.g., `accessibilityState={{ checked }}`)
- [ ] Keyboard navigation works (Tab, Enter, Space, Arrows where appropriate)
- [ ] Color is not the only indicator of state (icons, text, borders too)

---

## Animation (Serious)

- [ ] Interaction feedback ≤200ms
- [ ] Entrance animations 200-300ms with ease-out
- [ ] Exit animations ≤ entrance duration
- [ ] Only compositor properties animated (transform, opacity) — or justified exception documented
- [ ] Uses `useReducedMotion` hook and respects preference
- [ ] Looping animations use `useIsVisible` to pause when off-screen
- [ ] No animation on initial render unless intentional

---

## Component API (Moderate)

- [ ] Props use consistent naming (`onValueChange` not `onChange` for controlled components)
- [ ] Supports both controlled and uncontrolled usage where applicable
- [ ] Compound components export all sub-components from index
- [ ] TypeScript types exported for all props
- [ ] Default values documented in JSDoc or prop types
- [ ] `style` prop available for style overrides
- [ ] `asChild` pattern used for composable triggers (where appropriate)

---

## Visual Design (Moderate)

- [ ] Uses design tokens (colors, spacing, radius from tokens/)
- [ ] Works in all three themes (Dark, Light, Oatmeal)
- [ ] Consistent with existing component styling
- [ ] Hover/active/disabled states all styled
- [ ] No hardcoded colors — uses tokens
- [ ] Respects safe-area-inset for fixed/absolute positioned elements

---

## Documentation (Required for Release)

- [ ] Component has JSDoc comments on main export
- [ ] All props have JSDoc descriptions
- [ ] Usage example in README or docs
- [ ] All variants demonstrated
- [ ] Props table complete with types and defaults

---

## Storybook (Recommended)

- [ ] Stories file exists
- [ ] Default story shows basic usage
- [ ] Stories for each variant/size
- [ ] Stories for interactive states (loading, disabled, error)
- [ ] Args/controls configured for key props

---

## Performance (For Complex Components)

- [ ] No unnecessary re-renders (check with React DevTools)
- [ ] Large lists virtualized
- [ ] Heavy computations memoized
- [ ] Images lazy-loaded where appropriate
- [ ] `useNativeDriver: true` where possible for animations

---

## Scoring

| Score | Rating | Action |
|-------|--------|--------|
| 95-100% | ✅ Production Ready | Ship it |
| 85-94% | ⚠️ Nearly Ready | Fix gaps before release |
| 70-84% | 🔶 Needs Work | Prioritize critical items |
| <70% | ❌ Not Ready | Major revision needed |

---

## Quick Reference: Common Fixes

### Missing touch target

```tsx
<Pressable hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
```

### Missing accessibility label

```tsx
<Pressable accessibilityLabel="Close dialog" accessibilityRole="button">
```

### Reduced motion support

```tsx
const reducedMotion = useReducedMotion();
const duration = reducedMotion ? 0 : 200;
```

### Theme-safe colors

```tsx
// Bad - Hardcoded
style={{ backgroundColor: '#1a1a1a' }}

// Good - Token-based
style={{ backgroundColor: colors.bg.elevated }}
```

### Controlled + Uncontrolled pattern

```tsx
export function MyComponent({ value: controlledValue, onValueChange }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (newValue) => {
    if (!isControlled) setInternalValue(newValue);
    onValueChange?.(newValue);
  };
}
```

### Spring configuration reference

| Use Case | Tension | Friction | Notes |
|----------|---------|----------|-------|
| Dialogs/Sheets | 65 | 8-10 | Bouncy, dramatic entrance |
| Menus/Popovers | 100 | 10 | Snappy, subtle |
| Tabs/Navigation | 300 | 20-30 | Fast, responsive |
| Toggles | 300 | 10-20 | Quick feedback |
