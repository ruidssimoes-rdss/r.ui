import React, { createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontSizes, fontWeights } from '../../tokens/typography';

// ============================================================================
// Types
// ============================================================================

export type FooterVariant = 'simple' | 'columns' | 'centered';

export interface FooterProps {
  /** Layout variant */
  variant?: FooterVariant;
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface FooterContentProps {
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface FooterBrandProps {
  /** Logo image source or React element */
  logo?: React.ReactNode;
  /** Brand name */
  name?: string;
  /** Tagline text */
  tagline?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface FooterLinksProps {
  /** Link group children */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface FooterLinkGroupProps {
  /** Group title */
  title: string;
  /** Link items */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface FooterLinkProps {
  /** Link text */
  children: React.ReactNode;
  /** Link URL */
  href?: string;
  /** Press handler */
  onPress?: () => void;
  /** Additional styles */
  style?: TextStyle;
}

export interface FooterSocialProps {
  /** Social links */
  links: {
    icon: React.ReactNode;
    href?: string;
    onPress?: () => void;
    label?: string;
  }[];
  /** Additional styles */
  style?: ViewStyle;
}

export interface FooterCopyrightProps {
  /** Copyright text (auto-generates year if not provided) */
  children?: React.ReactNode;
  /** Company name */
  companyName?: string;
  /** Additional styles */
  style?: TextStyle;
}

export interface FooterNewsletterProps {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Button text */
  buttonText?: string;
  /** Submit handler */
  onSubmit?: (email: string) => void;
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

interface FooterContextValue {
  variant: FooterVariant;
}

const FooterContext = createContext<FooterContextValue>({
  variant: 'simple',
});

export function useFooter() {
  return useContext(FooterContext);
}

// ============================================================================
// Root Component
// ============================================================================

export function Footer({
  variant = 'simple',
  children,
  style,
}: FooterProps) {
  const variantStyles: ViewStyle = {
    simple: styles.simple,
    columns: styles.columns,
    centered: styles.centered,
  }[variant];

  return (
    <FooterContext.Provider value={{ variant }}>
      <View style={[styles.container, variantStyles, style]}>
        {children}
      </View>
    </FooterContext.Provider>
  );
}

// ============================================================================
// Content Component
// ============================================================================

export function FooterContent({ children, style }: FooterContentProps) {
  const { variant } = useFooter();

  return (
    <View
      style={[
        styles.content,
        variant === 'columns' && styles.contentColumns,
        variant === 'centered' && styles.contentCentered,
        style,
      ]}
    >
      {children}
    </View>
  );
}

// ============================================================================
// Brand Component
// ============================================================================

export function FooterBrand({
  logo,
  name,
  tagline,
  style,
}: FooterBrandProps) {
  const { variant } = useFooter();

  return (
    <View
      style={[
        styles.brand,
        variant === 'centered' && styles.brandCentered,
        style,
      ]}
    >
      {logo && <View style={styles.logo}>{logo}</View>}
      {name && <Text style={styles.brandName}>{name}</Text>}
      {tagline && <Text style={styles.tagline}>{tagline}</Text>}
    </View>
  );
}

// ============================================================================
// Links Component
// ============================================================================

export function FooterLinks({ children, style }: FooterLinksProps) {
  const { variant } = useFooter();

  // On web, use CSS Grid for columns
  if (Platform.OS === 'web' && variant === 'columns') {
    return (
      <View
        style={[
          styles.links,
          {
            // @ts-ignore - web-only style
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: spacing[8],
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.links,
        variant === 'simple' && styles.linksSimple,
        variant === 'centered' && styles.linksCentered,
        style,
      ]}
    >
      {children}
    </View>
  );
}

// ============================================================================
// Link Group Component
// ============================================================================

export function FooterLinkGroup({
  title,
  children,
  style,
}: FooterLinkGroupProps) {
  return (
    <View style={[styles.linkGroup, style]}>
      <Text style={styles.linkGroupTitle}>{title}</Text>
      <View style={styles.linkGroupItems}>{children}</View>
    </View>
  );
}

// ============================================================================
// Link Component
// ============================================================================

export function FooterLink({
  children,
  href,
  onPress,
  style,
}: FooterLinkProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
        Platform.OS === 'web' && {
          // @ts-ignore - web-only style
          cursor: 'pointer',
        },
      ]}
      accessibilityRole="link"
    >
      <Text style={[styles.link, style]}>{children}</Text>
    </Pressable>
  );
}

// ============================================================================
// Social Component
// ============================================================================

export function FooterSocial({ links, style }: FooterSocialProps) {
  return (
    <View style={[styles.social, style]}>
      {links.map((link, index) => (
        <Pressable
          key={index}
          onPress={link.onPress}
          style={({ pressed }) => [
            styles.socialButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          accessibilityLabel={link.label}
          accessibilityRole="link"
        >
          {link.icon}
        </Pressable>
      ))}
    </View>
  );
}

// ============================================================================
// Copyright Component
// ============================================================================

export function FooterCopyright({
  children,
  companyName,
  style,
}: FooterCopyrightProps) {
  const year = new Date().getFullYear();

  return (
    <Text style={[styles.copyright, style]}>
      {children || `© ${year} ${companyName || 'Company'}. All rights reserved.`}
    </Text>
  );
}

// ============================================================================
// Newsletter Component
// ============================================================================

export function FooterNewsletter({
  title = 'Subscribe to our newsletter',
  description,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  onSubmit,
  style,
}: FooterNewsletterProps) {
  const [email, setEmail] = React.useState('');

  const handleSubmit = () => {
    if (email && onSubmit) {
      onSubmit(email);
      setEmail('');
    }
  };

  return (
    <View style={[styles.newsletter, style]}>
      <Text style={styles.newsletterTitle}>{title}</Text>
      {description && (
        <Text style={styles.newsletterDescription}>{description}</Text>
      )}
      <View style={styles.newsletterForm}>
        <TextInput
          style={styles.newsletterInput}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.newsletterButton,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.newsletterButtonText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.bg.base,
    paddingVertical: spacing[8],
    paddingHorizontal: spacing[6],
  },
  simple: {
    gap: spacing[6],
  },
  columns: {
    gap: spacing[8],
  },
  centered: {
    alignItems: 'center',
    gap: spacing[6],
  },
  content: {
    width: '100%',
    gap: spacing[6],
  },
  contentColumns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing[8],
  },
  contentCentered: {
    alignItems: 'center',
  },
  brand: {
    gap: spacing[2],
    maxWidth: 280,
  },
  brandCentered: {
    alignItems: 'center',
    maxWidth: 400,
  },
  logo: {
    marginBottom: spacing[1],
  },
  brandName: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  tagline: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    lineHeight: fontSizes.sm * 1.5,
  },
  links: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[8],
  },
  linksSimple: {
    gap: spacing[6],
  },
  linksCentered: {
    justifyContent: 'center',
  },
  linkGroup: {
    gap: spacing[3],
    minWidth: 120,
  },
  linkGroupTitle: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  linkGroupItems: {
    gap: spacing[2],
  },
  link: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    lineHeight: fontSizes.sm * 1.6,
  },
  social: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: colors.bg.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyright: {
    fontSize: fontSizes.sm,
    color: colors.text.muted,
    textAlign: 'center',
  },
  newsletter: {
    gap: spacing[3],
    maxWidth: 320,
  },
  newsletterTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  newsletterDescription: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
  newsletterForm: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  newsletterInput: {
    flex: 1,
    height: 40,
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.md,
    paddingHorizontal: spacing[3],
    fontSize: fontSizes.sm,
    color: colors.text.primary,
  },
  newsletterButton: {
    height: 40,
    paddingHorizontal: spacing[4],
    backgroundColor: colors.accent.blue.DEFAULT,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsletterButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as TextStyle['fontWeight'],
    color: colors.white,
  },
});
