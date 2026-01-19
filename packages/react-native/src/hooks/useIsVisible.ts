import { useEffect, useRef, useState, RefObject } from 'react';
import { Platform, View } from 'react-native';

/**
 * Hook to detect if an element is visible in the viewport.
 *
 * On web, uses IntersectionObserver to detect visibility.
 * On native, defaults to `true` (always visible) since React Native
 * doesn't render off-screen components the same way as web.
 *
 * Use this hook to pause looping animations when off-screen to save
 * battery and CPU resources.
 *
 * @example
 * ```tsx
 * function Spinner() {
 *   const { ref, isVisible } = useIsVisible<View>();
 *
 *   useEffect(() => {
 *     if (isVisible) {
 *       // Start animation
 *     } else {
 *       // Stop animation
 *     }
 *   }, [isVisible]);
 *
 *   return <Animated.View ref={ref}>...</Animated.View>;
 * }
 * ```
 */
export function useIsVisible<T extends View = View>(): {
  ref: RefObject<T>;
  isVisible: boolean;
} {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // On native platforms, components are generally only rendered when visible
    // so we default to true. For more precise control, you could integrate
    // with navigation focus state or app state.
    if (Platform.OS !== 'web') {
      return;
    }

    // Web: use IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const element = ref.current as unknown as Element | null;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when at least 10% is visible
        rootMargin: '50px', // Start observing slightly before entering viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
}
