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

export type CTAVariant = 'banner' | 'card' | 'inline';
export type CTABackground = 'gradient' | 'solid' | 'image';
export type CTAAlign = 'left' | 'center';

export interface CTAProps {
  /** Layout variant */
  variant?: CTAVariant;
  /** Background type */
  background?: CTABackground;
  /** Content alignment */
  align?: CTAAlign;
  /** Background image source (for image background) */
  backgroundImage?: ImageSourcePropType;
  /** Gradient colors (for gradient background) */
  gradientColors?: string[];
  /** Solid background color */
  backgroundColor?: string;
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface CTAContentProps {
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface CTATitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface CTADescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface CTAActionsProps {
  /** Action buttons */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

interface CTAContextValue {
  variant: CTAVariant;
  align: CTAAlign;
}

const CTAContext = createContext<CTAContextValue>({
  variant: 'banner',
  align: 'center',
});

export function useCTA() {
  return useContext(CTAContext);
}

// ============================================================================
// Root Component
// ============================================================================

export function CTA({
  variant = 'banner',
  background = 'gradient',
  align = 'center',
  backgroundImage,
  gradientColors = [colors.accent.blue.DEFAULT, colors.accent.purple.DEFAULT],
  backgroundColor = colors.bg.surface,
  children,
  style,
}: CTAProps) {
  const contextValue: CTAContextValue = { variant, align };

  const alignmentStyle: ViewStyle = {
    alignItems: align === 'left' ? 'flex-start' : 'center',
  };

  const variantStyles: ViewStyle = {
    banner: styles.banner,
    card: styles.card,
    inline: styles.inline,
  }[variant];

  const content = (
    <CTAContext.Provider value={contextValue}>
      <View
        style={[
          styles.container,
          variantStyles,
          alignmentStyle,
          background === 'solid' && { backgroundColor },
          style,
        ]}
      >
        {children}
      </View>
    </CTAContext.Provider>
  );

  // Handle background image
  if (background === 'image' && backgroundImage) {
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
  if (background === 'gradient' && gradientColors.length >= 2) {
    if (Platform.OS === 'web') {
      return (
        <View
          style={[
            styles.gradientWrapper,
            variantStyles,
            {
              // @ts-ignore - web-only style
              background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
            },
            style,
          ]}
        >
          <CTAContext.Provider value={contextValue}>
            <View style={[styles.container, alignmentStyle]}>{children}</View>
          </CTAContext.Provider>
        </View>
      );
    }
    // Native fallback
    return (
      <View
        style={[
          styles.gradientWrapper,
          variantStyles,
          { backgroundColor: gradientColors[0] },
          style,
        ]}
      >
        <CTAContext.Provider value={contextValue}>
          <View style={[styles.container, alignmentStyle]}>{children}</View>
        </CTAContext.Provider>
      </View>
    );
  }

  return content;
}

// ============================================================================
// Content Component
// ============================================================================

export function CTAContent({ children, style }: CTAContentProps) {
  const { variant, align } = useCTA();

  return (
    <View
      style={[
        styles.content,
        variant === 'inline' && styles.contentInline,
        { alignItems: align === 'left' ? 'flex-start' : 'center' },
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

export function CTATitle({ children, style }: CTATitleProps) {
  const { variant, align } = useCTA();

  return (
    <Text
      style={[
        styles.title,
        variant === 'inline' && styles.titleInline,
        { textAlign: align === 'left' ? 'left' : 'center' },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// ============================================================================
// Description Component
// ============================================================================

export function CTADescription({ children, style }: CTADescriptionProps) {
  const { variant, align } = useCTA();

  return (
    <Text
      style={[
        styles.description,
        variant === 'inline' && styles.descriptionInline,
        { textAlign: align === 'left' ? 'left' : 'center' },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// ============================================================================
// Actions Component
// ============================================================================

export function CTAActions({ children, style }: CTAActionsProps) {
  const { variant } = useCTA();

  return (
    <View
      style={[
        styles.actions,
        variant === 'inline' && styles.actionsInline,
        style,
      ]}
    >
      {children}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: spacing[4],
  },
  gradientWrapper: {
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
  },
  backgroundImageStyle: {
    borderRadius: radius.xl,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: radius.xl,
  },
  banner: {
    paddingVertical: spacing[12],
    paddingHorizontal: spacing[6],
    borderRadius: radius.xl,
  },
  card: {
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.xl,
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[6],
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.lg,
  },
  content: {
    maxWidth: 560,
    gap: spacing[2],
  },
  contentInline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  title: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  titleInline: {
    fontSize: fontSizes.lg,
  },
  description: {
    fontSize: fontSizes.base,
    color: colors.text.secondary,
    lineHeight: fontSizes.base * 1.5,
  },
  descriptionInline: {
    fontSize: fontSizes.sm,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing[3],
    marginTop: spacing[2],
  },
  actionsInline: {
    marginTop: 0,
    marginLeft: spacing[4],
  },
});
