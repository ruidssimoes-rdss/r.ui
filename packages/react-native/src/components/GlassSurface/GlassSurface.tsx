import React from 'react';
import { Platform, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

// Conditional import for native blur
let BlurView: React.ComponentType<{
  intensity: number;
  tint: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}> | null = null;

if (Platform.OS !== 'web') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    BlurView = require('expo-blur').BlurView;
  } catch {
    // expo-blur not installed, will use fallback
    console.warn('Hyena: expo-blur not found. GlassSurface will use solid fallback on native.');
  }
}

export interface GlassSurfaceProps {
  /** Blur intensity (0-100). Default: 24 */
  intensity?: number;
  /** Tint color for native blur. Default: 'light' */
  tint?: 'light' | 'dark' | 'default';
  /** Surface opacity (0-1). Default: 0.65 */
  opacity?: number;
  /** Background color override */
  backgroundColor?: string;
  /** Border radius */
  borderRadius?: number;
  /** Show border */
  bordered?: boolean;
  /** Shadow size */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
  /** Children */
  children: React.ReactNode;
  /** Test ID for testing */
  testID?: string;
}

export const GlassSurface = React.forwardRef<View, GlassSurfaceProps>(
  (
    {
      intensity = 24,
      tint = 'light',
      opacity = 0.65,
      backgroundColor,
      borderRadius = 20,
      bordered = true,
      shadow = 'md',
      style,
      children,
      testID,
    },
    ref
  ) => {
    const bgColor = backgroundColor || `rgba(255, 255, 255, ${opacity})`;

    // Shadow styles
    const shadowStyles = React.useMemo(() => {
      if (shadow === 'none') return {};

      if (Platform.OS === 'web') {
        const shadows = {
          sm: '0 2px 8px rgba(0, 0, 0, 0.04)',
          md: '0 4px 24px rgba(0, 0, 0, 0.06)',
          lg: '0 8px 40px rgba(0, 0, 0, 0.08)',
        };
        return { boxShadow: shadows[shadow] };
      }

      // Native shadows
      const nativeShadows = {
        sm: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 2,
        },
        md: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.06,
          shadowRadius: 24,
          elevation: 4,
        },
        lg: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 40,
          elevation: 8,
        },
      };
      return nativeShadows[shadow];
    }, [shadow]);

    // Border styles
    const borderStyles = bordered
      ? {
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.8)',
        }
      : {};

    // Web implementation with CSS backdrop-filter
    if (Platform.OS === 'web') {
      return (
        <View
          ref={ref}
          testID={testID}
          style={[
            {
              backgroundColor: bgColor,
              borderRadius,
              overflow: 'hidden',
              backdropFilter: `blur(${intensity}px)`,
              WebkitBackdropFilter: `blur(${intensity}px)`,
            } as any,
            borderStyles,
            shadowStyles,
            style,
          ]}
        >
          {children}
        </View>
      );
    }

    // Native implementation with expo-blur (if available)
    if (BlurView) {
      return (
        <View
          ref={ref}
          testID={testID}
          style={[
            {
              borderRadius,
              overflow: 'hidden',
            },
            borderStyles,
            shadowStyles,
            style,
          ]}
        >
          <BlurView
            intensity={intensity}
            tint={tint}
            style={StyleSheet.absoluteFill}
          />
          <View style={{ backgroundColor: bgColor }}>{children}</View>
        </View>
      );
    }

    // Fallback: solid semi-transparent background (no blur)
    return (
      <View
        ref={ref}
        testID={testID}
        style={[
          {
            backgroundColor: bgColor,
            borderRadius,
            overflow: 'hidden',
          },
          borderStyles,
          shadowStyles,
          style,
        ]}
      >
        {children}
      </View>
    );
  }
);

GlassSurface.displayName = 'GlassSurface';
