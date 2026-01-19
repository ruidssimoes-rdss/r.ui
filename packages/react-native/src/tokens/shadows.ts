/**
 * r/ui Shadow Tokens
 * Elevation system for React Native
 *
 * Note: React Native shadows work differently on iOS vs Android
 * These are optimized for iOS. For Android, use elevation property.
 */

import { Platform, ViewStyle } from 'react-native';

// Shadow definitions for iOS
const iosShadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
} as const;

// Elevation values for Android
const androidElevations = {
  sm: 2,
  md: 4,
  lg: 8,
  xl: 16,
} as const;

// Cross-platform shadow helper
export const shadows: Record<'sm' | 'md' | 'lg' | 'xl', ViewStyle> = {
  sm: Platform.select({
    ios: iosShadows.sm,
    android: { elevation: androidElevations.sm },
    default: iosShadows.sm,
  }) as ViewStyle,
  md: Platform.select({
    ios: iosShadows.md,
    android: { elevation: androidElevations.md },
    default: iosShadows.md,
  }) as ViewStyle,
  lg: Platform.select({
    ios: iosShadows.lg,
    android: { elevation: androidElevations.lg },
    default: iosShadows.lg,
  }) as ViewStyle,
  xl: Platform.select({
    ios: iosShadows.xl,
    android: { elevation: androidElevations.xl },
    default: iosShadows.xl,
  }) as ViewStyle,
};

// Export individual platform-specific values for advanced use
export { iosShadows, androidElevations };

export type Shadows = typeof shadows;
export type ShadowSize = keyof typeof shadows;
