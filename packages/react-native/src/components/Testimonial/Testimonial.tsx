import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Image,
  ScrollView,
  Dimensions,
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

export type TestimonialVariant = 'card' | 'inline' | 'large';

export interface TestimonialProps {
  /** Layout variant */
  variant?: TestimonialVariant;
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TestimonialContentProps {
  /** Quote text */
  children: React.ReactNode;
  /** Show decorative quote marks */
  showQuotes?: boolean;
  /** Additional styles */
  style?: TextStyle;
}

export interface TestimonialAuthorProps {
  /** Author name */
  name: string;
  /** Author role/title */
  role?: string;
  /** Company name */
  company?: string;
  /** Avatar image URL */
  avatar?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TestimonialAvatarProps {
  /** Image source URL */
  source: string;
  /** Size of avatar */
  size?: 'sm' | 'md' | 'lg';
  /** Fallback initials */
  fallback?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TestimonialNameProps {
  /** Author name */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface TestimonialRoleProps {
  /** Role text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface TestimonialRatingProps {
  /** Rating value (0-5) */
  value: number;
  /** Max rating */
  max?: number;
  /** Additional styles */
  style?: ViewStyle;
}

export interface TestimonialCarouselProps {
  /** Testimonial items */
  children: React.ReactNode;
  /** Auto-play interval in ms */
  autoPlay?: number;
  /** Show navigation dots */
  showDots?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

interface TestimonialContextValue {
  variant: TestimonialVariant;
}

const TestimonialContext = createContext<TestimonialContextValue>({
  variant: 'card',
});

export function useTestimonial() {
  return useContext(TestimonialContext);
}

// ============================================================================
// Root Component
// ============================================================================

export function Testimonial({
  variant = 'card',
  children,
  style,
}: TestimonialProps) {
  const variantStyles: ViewStyle = {
    card: styles.cardVariant,
    inline: styles.inlineVariant,
    large: styles.largeVariant,
  }[variant];

  return (
    <TestimonialContext.Provider value={{ variant }}>
      <View style={[styles.container, variantStyles, style]}>
        {children}
      </View>
    </TestimonialContext.Provider>
  );
}

// ============================================================================
// Content Component
// ============================================================================

export function TestimonialContent({
  children,
  showQuotes = true,
  style,
}: TestimonialContentProps) {
  const { variant } = useTestimonial();

  return (
    <View style={styles.contentWrapper}>
      {showQuotes && (
        <Text style={[styles.quoteDecoration, variant === 'large' && styles.quoteDecorationLarge]}>
          "
        </Text>
      )}
      <Text
        style={[
          styles.content,
          variant === 'large' && styles.contentLarge,
          variant === 'inline' && styles.contentInline,
          style,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

// ============================================================================
// Author Component
// ============================================================================

export function TestimonialAuthor({
  name,
  role,
  company,
  avatar,
  style,
}: TestimonialAuthorProps) {
  const { variant } = useTestimonial();

  return (
    <View style={[styles.author, variant === 'inline' && styles.authorInline, style]}>
      {avatar && (
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
            accessible
            accessibilityLabel={`${name}'s avatar`}
          />
        </View>
      )}
      <View style={styles.authorInfo}>
        <Text style={styles.authorName}>{name}</Text>
        {(role || company) && (
          <Text style={styles.authorRole}>
            {role}
            {role && company && ' at '}
            {company}
          </Text>
        )}
      </View>
    </View>
  );
}

// ============================================================================
// Avatar Component
// ============================================================================

const avatarSizes = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function TestimonialAvatar({
  source,
  size = 'md',
  fallback,
  style,
}: TestimonialAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const sizeValue = avatarSizes[size];

  if (imageError && fallback) {
    return (
      <View
        style={[
          styles.avatarFallback,
          { width: sizeValue, height: sizeValue, borderRadius: sizeValue / 2 },
          style,
        ]}
      >
        <Text style={styles.avatarFallbackText}>{fallback}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: source }}
      style={[
        styles.avatar as ImageStyle,
        { width: sizeValue, height: sizeValue, borderRadius: sizeValue / 2 },
        style as ImageStyle,
      ]}
      onError={() => setImageError(true)}
      accessible
      accessibilityLabel="Testimonial author avatar"
    />
  );
}

// ============================================================================
// Name Component
// ============================================================================

export function TestimonialName({ children, style }: TestimonialNameProps) {
  return <Text style={[styles.authorName, style]}>{children}</Text>;
}

// ============================================================================
// Role Component
// ============================================================================

export function TestimonialRole({ children, style }: TestimonialRoleProps) {
  return <Text style={[styles.authorRole, style]}>{children}</Text>;
}

// ============================================================================
// Rating Component
// ============================================================================

export function TestimonialRating({ value, max = 5, style }: TestimonialRatingProps) {
  return (
    <View style={[styles.rating, style]}>
      {Array.from({ length: max }).map((_, index) => (
        <Text
          key={index}
          style={[
            styles.star,
            index < value ? styles.starFilled : styles.starEmpty,
          ]}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

// ============================================================================
// Carousel Component
// ============================================================================

export function TestimonialCarousel({
  children,
  autoPlay,
  showDots = true,
  style,
}: TestimonialCarouselProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const childCount = React.Children.count(children);

  useEffect(() => {
    if (autoPlay && autoPlay > 0) {
      const interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % childCount;
        scrollRef.current?.scrollTo({ x: nextIndex * containerWidth, animated: true });
        setActiveIndex(nextIndex);
      }, autoPlay);

      return () => clearInterval(interval);
    }
  }, [autoPlay, activeIndex, childCount, containerWidth]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / containerWidth);
    setActiveIndex(index);
  };

  return (
    <View
      style={[styles.carousel, style]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {React.Children.map(children, (child, index) => (
          <View style={{ width: containerWidth }} key={index}>
            {child}
          </View>
        ))}
      </ScrollView>
      {showDots && childCount > 1 && (
        <View style={styles.dots}>
          {Array.from({ length: childCount }).map((_, index) => (
            <Pressable
              key={index}
              onPress={() => {
                scrollRef.current?.scrollTo({ x: index * containerWidth, animated: true });
                setActiveIndex(index);
              }}
              accessibilityRole="button"
            >
              <View
                style={[
                  styles.dot,
                  index === activeIndex && styles.dotActive,
                ]}
              />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    gap: spacing[4],
  },
  cardVariant: {
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.xl,
    padding: spacing[6],
  },
  inlineVariant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  largeVariant: {
    alignItems: 'center',
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[6],
  },
  contentWrapper: {
    position: 'relative',
  },
  quoteDecoration: {
    position: 'absolute',
    top: -20,
    left: -8,
    fontSize: 64,
    lineHeight: 64,
    color: colors.text.muted,
    opacity: 0.3,
    fontWeight: fontWeights.bold as TextStyle['fontWeight'],
  },
  quoteDecorationLarge: {
    fontSize: 96,
    lineHeight: 96,
    top: -40,
    left: -16,
  },
  content: {
    fontSize: fontSizes.base,
    color: colors.text.secondary,
    lineHeight: fontSizes.base * 1.6,
    fontStyle: 'italic',
  },
  contentLarge: {
    fontSize: fontSizes.xl,
    lineHeight: fontSizes.xl * 1.5,
    textAlign: 'center',
  },
  contentInline: {
    flex: 1,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    marginTop: spacing[2],
  },
  authorInline: {
    marginTop: 0,
    flexShrink: 0,
  },
  avatarContainer: {
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarFallback: {
    backgroundColor: colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as TextStyle['fontWeight'],
    color: colors.text.secondary,
  },
  authorInfo: {
    gap: spacing[0.5] || 2,
  },
  authorName: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  authorRole: {
    fontSize: fontSizes.xs,
    color: colors.text.muted,
  },
  rating: {
    flexDirection: 'row',
    gap: spacing[0.5] || 2,
  },
  star: {
    fontSize: fontSizes.base,
  },
  starFilled: {
    color: colors.accent.amber.DEFAULT,
  },
  starEmpty: {
    color: colors.border.default,
  },
  carousel: {
    width: '100%',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[2],
    marginTop: spacing[4],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border.default,
  },
  dotActive: {
    backgroundColor: colors.accent.blue.DEFAULT,
    width: 24,
  },
});
