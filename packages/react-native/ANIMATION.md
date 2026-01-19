# r/ui Animation Philosophy

r/ui includes subtle animations by default to create a premium, polished feel.
This is an intentional design choice that differentiates r/ui from minimal component libraries.

## Our Principles

1. **Motion adds meaning** - Animations clarify cause & effect relationships
2. **Respect user preferences** - All animations honor `prefers-reduced-motion`
3. **Performance first** - Only animate compositor properties (transform, opacity)
4. **Quick feedback** - Interaction animations ≤ 200ms
5. **Graceful entrances** - Modal/overlay animations 200-300ms with ease-out

## Duration Guidelines

| Animation Type | Duration | Easing | Example |
|----------------|----------|--------|---------|
| Button press | 100-150ms | ease-out | Button state change |
| Toggle/Switch | 150-200ms | ease-out | Switch, Checkbox |
| Dropdown open | 150-200ms | ease-out | Dropdown, Popover |
| Modal entrance | 200-300ms | spring | Dialog, AlertDialog |
| Modal exit | 150-200ms | ease-in | Dialog close |
| Toast slide | 200ms | spring | Toast notification |
| Sheet slide | 200ms | spring | Sheet overlay |

## Spring Configurations

r/ui uses React Native's `Animated.spring()` for natural-feeling animations:

| Use Case | Tension | Friction | Notes |
|----------|---------|----------|-------|
| Dialogs/Sheets | 65 | 8-10 | Bouncy, dramatic entrance |
| Menus/Popovers | 100 | 10 | Snappy, subtle |
| Tabs/Navigation | 300 | 20-30 | Fast, responsive |
| Toggles | 300 | 10-20 | Quick feedback |

## Reduced Motion

When `prefers-reduced-motion: reduce` is set:
- All animations complete instantly (duration: 0)
- Looping animations (Spinner, Skeleton) stop
- Opacity fades may still occur (less jarring than instant appear/disappear)

### Using the Hook

```tsx
import { useReducedMotion } from '@r-ui/react-native';

function MyComponent() {
  const reducedMotion = useReducedMotion();

  const animationDuration = reducedMotion ? 0 : 200;

  useEffect(() => {
    if (reducedMotion) {
      // Set final values instantly
      opacity.setValue(1);
      return;
    }

    // Run normal animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [reducedMotion]);
}
```

### Components with Reduced Motion Support

The following components automatically respect `prefers-reduced-motion`:

- ✅ Spinner - Stops rotation, shows static indicator
- ✅ Skeleton - Stops shimmer, shows static placeholder
- ✅ Toast - Instant appear/disappear
- ✅ Dialog - Instant scale/fade
- ✅ Sheet - Instant slide

## Animated Properties

### Compositor-Only (GPU Accelerated) ✅

These properties are safe to animate and perform well:

- `transform` (translateX, translateY, scale, rotate)
- `opacity`

### Avoid Animating ⚠️

These properties trigger layout recalculation and should be avoided:

- `width`, `height` (use scale transform instead)
- `top`, `left`, `right`, `bottom` (use translate transform)
- `margin`, `padding`
- `fontSize`
- `borderRadius` (small changes OK)

### Exception: Height Animations

Some components (Accordion, Collapsible) need to animate height for proper UX.
These use `useNativeDriver: false` and are limited to:
- Maximum 200ms duration
- Linear or ease-out easing
- Only when necessary for content reveal

## Looping Animations

Continuously running animations (Spinner, Skeleton) should:

1. **Stop when reduced motion is preferred**
2. **Pause when component is off-screen** (battery/CPU savings)

### Off-Screen Detection

```tsx
import { useIsVisible } from '@r-ui/react-native';

function LoopingComponent() {
  const { ref, isVisible } = useIsVisible();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !isVisible) {
      // Stop animation
      animation.stop();
      return;
    }

    // Start looping animation
    animation.start();
  }, [isVisible, reducedMotion]);

  return <Animated.View ref={ref}>...</Animated.View>;
}
```

## Animation Inventory

| Component | Animation Type | Properties | Duration |
|-----------|---------------|------------|----------|
| Checkbox | spring + timing | scale, opacity | 150ms |
| RadioGroup | spring + timing | scale, opacity | 150ms |
| Switch | spring | translateX | spring |
| Slider | timing | opacity, scale | 150ms |
| Tabs | spring | left, width | spring |
| Accordion | timing | height, opacity | 200ms |
| Collapsible | timing | height, opacity | 200ms |
| Dialog | spring + timing | scale, opacity | 150ms |
| AlertDialog | spring + timing | scale, opacity | 150ms |
| Sheet | spring + timing | translate, opacity | 200ms |
| Toast | spring + timing | translateY, opacity | 200ms |
| Dropdown | spring + timing | scale, opacity | 150ms |
| Popover | spring + timing | scale, opacity | 150ms |
| Tooltip | timing | opacity | 150ms |
| ContextMenu | spring + timing | scale, opacity | 150ms |
| HoverCard | spring + timing | scale, opacity | 150ms |
| NavigationMenu | timing + spring | rotate, opacity, translateY | 200ms |
| Menubar | spring + timing | scale, opacity | 150ms |
| Progress | timing | width | 300ms |
| Spinner | loop | rotate | 750ms/loop |
| Skeleton | loop | opacity | 2000ms/cycle |
| OTPInput | loop | opacity | 1000ms/cycle |
| ScrollArea | timing | opacity | 150-300ms |

## Testing Animations

### Enable Reduced Motion

**iOS Simulator:**
Settings → Accessibility → Motion → Reduce Motion

**Android Emulator:**
Settings → Accessibility → Remove animations

**Web (Chrome DevTools):**
1. Open DevTools → Rendering tab
2. Check "Emulate CSS media feature prefers-reduced-motion"

### Performance Profiling

Use React Native's Performance Monitor to ensure animations run at 60fps:

```bash
# iOS
npx react-native run-ios --configuration Release

# Android
npx react-native run-android --variant release
```
