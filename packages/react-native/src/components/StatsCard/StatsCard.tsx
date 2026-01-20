import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Animated } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
import { Skeleton } from '../Skeleton';

// ============================================================================
// Types
// ============================================================================

export type StatsCardVariant = 'default' | 'compact';

export interface StatsCardProps {
  /** Layout variant */
  variant?: StatsCardVariant;
  /** Children components */
  children: React.ReactNode;
  /** Show loading skeleton state */
  loading?: boolean;
  /** Additional container styles */
  style?: ViewStyle;
}

export interface StatsCardIconProps {
  /** Icon to display (custom ReactNode) */
  children: React.ReactNode;
  /** Background color */
  color?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface StatsCardTitleProps {
  /** Title/label text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface StatsCardValueProps {
  /** The main value to display (number for animation, string for static) */
  children: React.ReactNode;
  /** Animate the value counting up */
  animate?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Format function for the number */
  formatValue?: (value: number) => string;
  /** Additional styles */
  style?: TextStyle;
}

export interface StatsCardTrendProps {
  /** Trend value (positive = up, negative = down) */
  value: number;
  /** Suffix for the trend (default: '%') */
  suffix?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface StatsCardDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

// ============================================================================
// Root Component
// ============================================================================

export function StatsCard({ variant = 'default', children, loading = false, style }: StatsCardProps) {
  if (loading) {
    return (
      <View style={[styles.container, variant === 'compact' && styles.containerCompact, style]}>
        <Skeleton variant="rectangular" width={40} height={40} style={{ borderRadius: radius.md, marginBottom: spacing[3] }} />
        <Skeleton variant="text" width={80} height={14} style={{ marginBottom: spacing[1] }} />
        <Skeleton variant="text" width={120} height={32} style={{ marginBottom: spacing[2] }} />
        <Skeleton variant="text" width={100} height={14} />
      </View>
    );
  }

  return (
    <View style={[styles.container, variant === 'compact' && styles.containerCompact, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// Icon Component
// ============================================================================

export function StatsCardIcon({ children, color, style }: StatsCardIconProps) {
  return (
    <View
      style={[
        styles.iconContainer,
        color ? { backgroundColor: `${color}20` } : {},
        style,
      ]}
    >
      {children}
    </View>
  );
}

// ============================================================================
// Title Component
// ============================================================================

export function StatsCardTitle({ children, style }: StatsCardTitleProps) {
  return (
    <Text style={[styles.title, style]}>{children}</Text>
  );
}

// ============================================================================
// Animated Number Hook
// ============================================================================

function useAnimatedNumber(
  target: number,
  duration: number,
  enabled: boolean
): number {
  const [current, setCurrent] = useState(enabled ? 0 : target);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const startValueRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      setCurrent(target);
      return;
    }

    // Reset animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    startTimeRef.current = Date.now();
    startValueRef.current = current;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      const newValue = Math.round(
        startValueRef.current + (target - startValueRef.current) * eased
      );
      setCurrent(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, enabled]);

  return current;
}

// ============================================================================
// Value Component
// ============================================================================

export function StatsCardValue({
  children,
  animate = false,
  animationDuration = 1000,
  formatValue,
  style,
}: StatsCardValueProps) {
  const numericValue = typeof children === 'number' ? children : 0;
  const animatedValue = useAnimatedNumber(numericValue, animationDuration, animate && typeof children === 'number');

  // Determine what to display
  let displayValue: React.ReactNode;
  if (animate && typeof children === 'number') {
    displayValue = formatValue ? formatValue(animatedValue) : animatedValue;
  } else {
    displayValue = children;
  }

  return (
    <Text style={[styles.value, style]}>{displayValue}</Text>
  );
}

// ============================================================================
// Trend Component
// ============================================================================

export function StatsCardTrend({ value, suffix = '%', style }: StatsCardTrendProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;
  const displayValue = Math.abs(value);

  const trendColor = isPositive
    ? colors.accent.green.DEFAULT
    : isNegative
    ? colors.accent.red.DEFAULT
    : colors.text.muted;

  return (
    <View style={[styles.trendContainer, style]}>
      <View style={styles.trendIconContainer}>
        {isPositive && <TrendUpIcon color={trendColor} size={16} />}
        {isNegative && <TrendDownIcon color={trendColor} size={16} />}
        {isNeutral && <TrendNeutralIcon color={trendColor} size={16} />}
      </View>
      <Text
        style={[
          styles.trendText,
          isPositive && styles.trendTextPositive,
          isNegative && styles.trendTextNegative,
          isNeutral && styles.trendTextNeutral,
        ]}
      >
        {displayValue}{suffix}
      </Text>
    </View>
  );
}

// ============================================================================
// Description Component
// ============================================================================

export function StatsCardDescription({ children, style }: StatsCardDescriptionProps) {
  return (
    <Text style={[styles.description, style]}>{children}</Text>
  );
}

// ============================================================================
// Trend Icons (SVG-style implementation)
// ============================================================================

interface TrendIconProps {
  color: string;
  size?: number;
}

function TrendUpIcon({ color, size = 16 }: TrendIconProps) {
  // Proper trending up icon using Views positioned to look like an arrow
  return (
    <View style={[iconStyles.trendIcon, { width: size, height: size }]}>
      {/* Arrow pointing up-right */}
      <View
        style={[
          iconStyles.trendLine,
          {
            backgroundColor: color,
            width: size * 0.65,
            height: 2,
            transform: [{ rotate: '-45deg' }],
            position: 'absolute',
            left: size * 0.1,
            top: size * 0.45,
          },
        ]}
      />
      {/* Arrow head - horizontal part */}
      <View
        style={[
          iconStyles.trendLine,
          {
            backgroundColor: color,
            width: size * 0.35,
            height: 2,
            position: 'absolute',
            right: size * 0.1,
            top: size * 0.25,
          },
        ]}
      />
      {/* Arrow head - vertical part */}
      <View
        style={[
          iconStyles.trendLine,
          {
            backgroundColor: color,
            width: 2,
            height: size * 0.35,
            position: 'absolute',
            right: size * 0.1,
            top: size * 0.25,
          },
        ]}
      />
    </View>
  );
}

function TrendDownIcon({ color, size = 16 }: TrendIconProps) {
  // Proper trending down icon using Views positioned to look like an arrow
  return (
    <View style={[iconStyles.trendIcon, { width: size, height: size }]}>
      {/* Arrow pointing down-right */}
      <View
        style={[
          iconStyles.trendLine,
          {
            backgroundColor: color,
            width: size * 0.65,
            height: 2,
            transform: [{ rotate: '45deg' }],
            position: 'absolute',
            left: size * 0.1,
            top: size * 0.45,
          },
        ]}
      />
      {/* Arrow head - horizontal part */}
      <View
        style={[
          iconStyles.trendLine,
          {
            backgroundColor: color,
            width: size * 0.35,
            height: 2,
            position: 'absolute',
            right: size * 0.1,
            bottom: size * 0.25,
          },
        ]}
      />
      {/* Arrow head - vertical part */}
      <View
        style={[
          iconStyles.trendLine,
          {
            backgroundColor: color,
            width: 2,
            height: size * 0.35,
            position: 'absolute',
            right: size * 0.1,
            bottom: size * 0.25,
          },
        ]}
      />
    </View>
  );
}

function TrendNeutralIcon({ color, size = 16 }: TrendIconProps) {
  // Horizontal line for neutral trend
  return (
    <View style={[iconStyles.trendIcon, { width: size, height: size }]}>
      <View
        style={[
          iconStyles.trendLine,
          {
            backgroundColor: color,
            width: size * 0.7,
            height: 2,
            position: 'absolute',
            left: size * 0.15,
            top: size * 0.5 - 1,
          },
        ]}
      />
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing[5],
  },
  containerCompact: {
    padding: spacing[3],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[3],
  },
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.text.secondary,
    marginBottom: spacing[1],
  },
  value: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing[2],
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIconContainer: {
    marginRight: spacing[1],
  },
  trendText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
  trendTextPositive: {
    color: colors.accent.green.DEFAULT,
  },
  trendTextNegative: {
    color: colors.accent.red.DEFAULT,
  },
  trendTextNeutral: {
    color: colors.text.muted,
  },
  description: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.xs,
    color: colors.text.muted,
    marginTop: spacing[1],
  },
});

const iconStyles = StyleSheet.create({
  trendIcon: {
    position: 'relative',
  },
  trendLine: {
    borderRadius: 1,
  },
});
