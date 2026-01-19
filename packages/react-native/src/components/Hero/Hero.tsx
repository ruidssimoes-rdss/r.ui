import React, { createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageBackground,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontSizes, fontWeights } from '../../tokens/typography';

// ============================================================================
// Types
// ============================================================================

export type HeroVariant = 'centered' | 'split' | 'image-background';
export type HeroAlign = 'left' | 'center' | 'right';

export interface HeroProps {
  /** Layout variant */
  variant?: HeroVariant;
  /** Content alignment */
  align?: HeroAlign;
  /** Background image source (for image-background variant) */
  backgroundImage?: ImageSourcePropType;
  /** Background gradient colors */
  gradientColors?: string[];
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface HeroContentProps {
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface HeroTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Enable gradient text effect */
  gradient?: boolean;
  /** Gradient colors for text */
  gradientColors?: string[];
  /** Additional styles */
  style?: TextStyle;
}

export interface HeroSubtitleProps {
  /** Subtitle text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface HeroActionsProps {
  /** Action buttons */
  children: React.ReactNode;
  /** Layout direction */
  direction?: 'row' | 'column';
  /** Additional styles */
  style?: ViewStyle;
}

export interface HeroImageProps {
  /** Image source */
  source: ImageSourcePropType;
  /** Image alt text (web only) */
  alt?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface HeroBadgeProps {
  /** Badge text */
  children: React.ReactNode;
  /** Badge variant */
  variant?: 'default' | 'success' | 'warning' | 'info';
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

interface HeroContextValue {
  variant: HeroVariant;
  align: HeroAlign;
}

const HeroContext = createContext<HeroContextValue>({
  variant: 'centered',
  align: 'center',
});

export function useHero() {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('Hero compound components must be used within a Hero');
  }
  return context;
}

// ============================================================================
// Root Component
// ============================================================================

export function Hero({
  variant = 'centered',
  align = 'center',
  backgroundImage,
  gradientColors,
  children,
  style,
}: HeroProps) {
  const contextValue: HeroContextValue = { variant, align };

  const alignmentStyle: ViewStyle = {
    alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
  };

  const content = (
    <HeroContext.Provider value={contextValue}>
      <View style={[styles.container, alignmentStyle, style]}>
        {variant === 'split' ? (
          <View style={styles.splitContainer}>{children}</View>
        ) : (
          children
        )}
      </View>
    </HeroContext.Provider>
  );

  // Handle background image
  if (variant === 'image-background' && backgroundImage) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay}>{content}</View>
      </ImageBackground>
    );
  }

  // Handle gradient background
  if (gradientColors && gradientColors.length >= 2) {
    // On web, use CSS gradient
    if (Platform.OS === 'web') {
      return (
        <View
          style={[
            styles.gradientContainer,
            {
              // @ts-ignore - web-only style
              background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
            },
          ]}
        >
          {content}
        </View>
      );
    }
    // On native, fall back to first color
    return (
      <View style={[styles.gradientContainer, { backgroundColor: gradientColors[0] }]}>
        {content}
      </View>
    );
  }

  return content;
}

// ============================================================================
// Content Component
// ============================================================================

export function HeroContent({ children, style }: HeroContentProps) {
  const { variant, align } = useHero();

  return (
    <View
      style={[
        styles.content,
        variant === 'split' && styles.splitContent,
        { alignItems: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center' },
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

export function HeroTitle({
  children,
  gradient = false,
  gradientColors = [colors.accent.blue.DEFAULT, colors.accent.purple.DEFAULT],
  style,
}: HeroTitleProps) {
  const { align } = useHero();

  const textAlign = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';

  // Gradient text on web
  if (gradient && Platform.OS === 'web') {
    return (
      <Text
        style={[
          styles.title,
          { textAlign },
          {
            // @ts-ignore - web-only styles
            backgroundImage: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          },
          style,
        ]}
      >
        {children}
      </Text>
    );
  }

  return (
    <Text
      style={[
        styles.title,
        { textAlign },
        gradient && { color: gradientColors[0] },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// ============================================================================
// Subtitle Component
// ============================================================================

export function HeroSubtitle({ children, style }: HeroSubtitleProps) {
  const { align } = useHero();

  const textAlign = align === 'left' ? 'left' : align === 'right' ? 'right' : 'center';

  return (
    <Text style={[styles.subtitle, { textAlign }, style]}>
      {children}
    </Text>
  );
}

// ============================================================================
// Actions Component
// ============================================================================

export function HeroActions({ children, direction = 'row', style }: HeroActionsProps) {
  return (
    <View
      style={[
        styles.actions,
        { flexDirection: direction },
        direction === 'column' && styles.actionsColumn,
        style,
      ]}
    >
      {children}
    </View>
  );
}

// ============================================================================
// Image Component
// ============================================================================

export function HeroImage({ source, alt, style }: HeroImageProps) {
  const { variant } = useHero();

  return (
    <View style={[styles.imageContainer, variant === 'split' && styles.splitImage, style]}>
      <ImageBackground
        source={source}
        style={styles.image}
        imageStyle={styles.imageStyle}
        accessibilityLabel={alt}
      />
    </View>
  );
}

// ============================================================================
// Badge Component
// ============================================================================

const badgeVariantColors = {
  default: { bg: 'rgba(255, 255, 255, 0.1)', text: colors.text.primary },
  success: { bg: 'rgba(34, 197, 94, 0.15)', text: colors.accent.green.DEFAULT },
  warning: { bg: 'rgba(245, 158, 11, 0.15)', text: colors.accent.amber.DEFAULT },
  info: { bg: 'rgba(59, 130, 246, 0.15)', text: colors.accent.blue.DEFAULT },
};

export function HeroBadge({ children, variant = 'default', style }: HeroBadgeProps) {
  const variantColors = badgeVariantColors[variant];

  return (
    <View style={[styles.badge, { backgroundColor: variantColors.bg }, style]}>
      <Text style={[styles.badgeText, { color: variantColors.text }]}>
        {children}
      </Text>
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: spacing[16],
    paddingHorizontal: spacing[6],
  },
  gradientContainer: {
    width: '100%',
    borderRadius: radius.xl,
  },
  backgroundImage: {
    width: '100%',
  },
  backgroundImageStyle: {
    borderRadius: radius.xl,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: radius.xl,
  },
  splitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[8],
    width: '100%',
  },
  content: {
    maxWidth: 720,
    gap: spacing[4],
  },
  splitContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
    lineHeight: fontSizes['4xl'] * 1.1,
  },
  subtitle: {
    fontSize: fontSizes.lg,
    color: colors.text.secondary,
    lineHeight: fontSizes.lg * 1.5,
  },
  actions: {
    gap: spacing[3],
    marginTop: spacing[4],
  },
  actionsColumn: {
    alignItems: 'stretch',
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    width: '100%',
    maxWidth: 400,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  splitImage: {
    flex: 1,
    maxWidth: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: radius.xl,
  },
  badge: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    borderRadius: radius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing[2],
  },
  badgeText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as TextStyle['fontWeight'],
  },
});
