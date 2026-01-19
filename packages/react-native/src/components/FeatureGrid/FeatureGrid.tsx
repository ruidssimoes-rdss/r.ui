import React, { createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontSizes, fontWeights } from '../../tokens/typography';

// ============================================================================
// Types
// ============================================================================

export type FeatureCardVariant = 'default' | 'glass' | 'bordered';
export type FeatureGridColumns = 1 | 2 | 3 | 4;
export type FeatureGridGap = 'sm' | 'md' | 'lg';

export interface FeatureGridProps {
  /** Number of columns */
  columns?: FeatureGridColumns;
  /** Gap between items */
  gap?: FeatureGridGap;
  /** Children content (FeatureCard components) */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface FeatureCardProps {
  /** Icon element */
  icon?: React.ReactNode;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Optional link href */
  href?: string;
  /** Press handler */
  onPress?: () => void;
  /** Card variant */
  variant?: FeatureCardVariant;
  /** Icon position */
  iconPosition?: 'top' | 'left';
  /** Additional styles */
  style?: ViewStyle;
}

export interface FeatureIconProps {
  /** Icon content */
  children: React.ReactNode;
  /** Icon background color */
  color?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface FeatureTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface FeatureDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

// ============================================================================
// Context
// ============================================================================

interface FeatureGridContextValue {
  columns: FeatureGridColumns;
  gap: FeatureGridGap;
}

const FeatureGridContext = createContext<FeatureGridContextValue>({
  columns: 3,
  gap: 'md',
});

export function useFeatureGrid() {
  return useContext(FeatureGridContext);
}

// ============================================================================
// Helpers
// ============================================================================

const gapValues: Record<FeatureGridGap, number> = {
  sm: spacing[3],
  md: spacing[4],
  lg: spacing[6],
};

// ============================================================================
// Root Component
// ============================================================================

export function FeatureGrid({
  columns = 3,
  gap = 'md',
  children,
  style,
}: FeatureGridProps) {
  const gapValue = gapValues[gap];

  // On web, use CSS Grid
  if (Platform.OS === 'web') {
    return (
      <FeatureGridContext.Provider value={{ columns, gap }}>
        <View
          style={[
            styles.grid,
            {
              // @ts-ignore - web-only style
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: gapValue,
            },
            style,
          ]}
        >
          {children}
        </View>
      </FeatureGridContext.Provider>
    );
  }

  // On native, use flexWrap
  return (
    <FeatureGridContext.Provider value={{ columns, gap }}>
      <View style={[styles.gridNative, { gap: gapValue }, style]}>
        {React.Children.map(children, (child, index) => (
          <View
            style={{
              width: `${100 / columns - (columns - 1) * gapValue / columns}%`,
              flexBasis: `${100 / columns}%`,
            }}
          >
            {child}
          </View>
        ))}
      </View>
    </FeatureGridContext.Provider>
  );
}

// ============================================================================
// Card Component
// ============================================================================

export function FeatureCard({
  icon,
  title,
  description,
  href,
  onPress,
  variant = 'default',
  iconPosition = 'top',
  style,
}: FeatureCardProps) {
  const isInteractive = !!href || !!onPress;

  const variantStyles: ViewStyle = {
    default: {
      backgroundColor: colors.bg.surface,
      borderWidth: 1,
      borderColor: colors.border.default,
    },
    glass: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      ...(Platform.OS === 'web' && {
        // @ts-ignore - web-only style
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }),
    },
    bordered: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.border.strong,
    },
  }[variant];

  const content = (
    <View
      style={[
        styles.card,
        variantStyles,
        iconPosition === 'left' && styles.cardHorizontal,
        style,
      ]}
    >
      {icon && (
        <View style={[styles.iconWrapper, iconPosition === 'left' && styles.iconLeft]}>
          {icon}
        </View>
      )}
      <View style={iconPosition === 'left' && styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );

  if (isInteractive) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          { opacity: pressed ? 0.8 : 1 },
          Platform.OS === 'web' && {
            // @ts-ignore - web-only style
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          },
        ]}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

// ============================================================================
// Icon Component
// ============================================================================

export function FeatureIcon({
  children,
  color = colors.accent.blue.DEFAULT,
  style,
}: FeatureIconProps) {
  return (
    <View
      style={[
        styles.icon,
        { backgroundColor: `${color}15` },
        style,
      ]}
    >
      <View style={{ opacity: 1 }}>{children}</View>
    </View>
  );
}

// ============================================================================
// Title Component
// ============================================================================

export function FeatureTitle({ children, style }: FeatureTitleProps) {
  return <Text style={[styles.cardTitle, style]}>{children}</Text>;
}

// ============================================================================
// Description Component
// ============================================================================

export function FeatureDescription({ children, style }: FeatureDescriptionProps) {
  return <Text style={[styles.cardDescription, style]}>{children}</Text>;
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  grid: {
    width: '100%',
  },
  gridNative: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  card: {
    padding: spacing[5],
    borderRadius: radius.xl,
    gap: spacing[3],
  },
  cardHorizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardContent: {
    flex: 1,
    gap: spacing[2],
  },
  iconWrapper: {
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: spacing[4],
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  cardDescription: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    lineHeight: fontSizes.sm * 1.5,
  },
});
