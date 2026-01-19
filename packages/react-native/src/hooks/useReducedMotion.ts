import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

/**
 * Hook to detect if the user prefers reduced motion.
 *
 * Returns `true` when:
 * - iOS/Android: "Reduce Motion" accessibility setting is enabled
 * - Web: `prefers-reduced-motion: reduce` media query matches
 *
 * When reduced motion is preferred, animations should be:
 * - Disabled entirely (duration: 0)
 * - Replaced with simple opacity fades
 * - Looping animations should stop
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const reducedMotion = useReducedMotion();
 *
 *   const animationDuration = reducedMotion ? 0 : 200;
 *
 *   // Use animationDuration in your Animated.timing calls
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Check CSS media query for web
      if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => {
          setReducedMotion(event.matches);
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handler);
          return () => mediaQuery.removeEventListener('change', handler);
        }
        // Fallback for older browsers
        mediaQuery.addListener(handler);
        return () => mediaQuery.removeListener(handler);
      }
    } else {
      // React Native accessibility check for iOS/Android
      AccessibilityInfo.isReduceMotionEnabled().then(setReducedMotion);

      const subscription = AccessibilityInfo.addEventListener(
        'reduceMotionChanged',
        setReducedMotion
      );

      return () => subscription.remove();
    }
  }, []);

  return reducedMotion;
}
