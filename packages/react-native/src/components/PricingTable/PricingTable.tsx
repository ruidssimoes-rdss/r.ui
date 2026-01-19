import React, { createContext, useContext, useState } from 'react';
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

export type BillingPeriod = 'monthly' | 'yearly';

export interface PricingTableProps {
  /** Current billing period */
  billingPeriod?: BillingPeriod;
  /** Callback when billing period changes */
  onBillingChange?: (period: BillingPeriod) => void;
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PricingCardProps {
  /** Plan name */
  name: string;
  /** Plan description */
  description?: string;
  /** Price object with monthly and yearly */
  price: { monthly: number; yearly: number };
  /** Currency symbol */
  currency?: string;
  /** Whether this plan is highlighted as popular */
  popular?: boolean;
  /** Whether this plan is disabled */
  disabled?: boolean;
  /** Optional badge text */
  badge?: string;
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PricingHeaderProps {
  /** Plan name */
  name: string;
  /** Optional badge text */
  badge?: string;
  /** Plan description */
  description?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PricingPriceProps {
  /** Price amount for monthly */
  monthly: number;
  /** Price amount for yearly */
  yearly: number;
  /** Currency symbol */
  currency?: string;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PricingFeaturesProps {
  /** Feature items */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PricingFeatureProps {
  /** Whether feature is included */
  included?: boolean;
  /** Feature text */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PricingActionProps {
  /** Button text */
  children: React.ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Whether button is primary style */
  primary?: boolean;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Additional styles */
  style?: ViewStyle;
}

export interface PricingToggleProps {
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

export interface PricingTableContextValue {
  billingPeriod: BillingPeriod;
  setBillingPeriod: (period: BillingPeriod) => void;
}

const PricingTableContext = createContext<PricingTableContextValue>({
  billingPeriod: 'monthly',
  setBillingPeriod: () => {},
});

export function usePricingTable() {
  return useContext(PricingTableContext);
}

// ============================================================================
// Root Component
// ============================================================================

export function PricingTable({
  billingPeriod: controlledBillingPeriod,
  onBillingChange,
  children,
  style,
}: PricingTableProps) {
  const [internalBillingPeriod, setInternalBillingPeriod] = useState<BillingPeriod>('monthly');

  const billingPeriod = controlledBillingPeriod ?? internalBillingPeriod;
  const setBillingPeriod = (period: BillingPeriod) => {
    setInternalBillingPeriod(period);
    onBillingChange?.(period);
  };

  return (
    <PricingTableContext.Provider value={{ billingPeriod, setBillingPeriod }}>
      <View style={[styles.container, style]}>{children}</View>
    </PricingTableContext.Provider>
  );
}

// ============================================================================
// Toggle Component
// ============================================================================

export function PricingToggle({ style }: PricingToggleProps) {
  const { billingPeriod, setBillingPeriod } = usePricingTable();

  return (
    <View style={[styles.toggleContainer, style]}>
      <Pressable
        onPress={() => setBillingPeriod('monthly')}
        style={[
          styles.toggleButton,
          billingPeriod === 'monthly' && styles.toggleButtonActive,
        ]}
      >
        <Text
          style={[
            styles.toggleText,
            billingPeriod === 'monthly' && styles.toggleTextActive,
          ]}
        >
          Monthly
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setBillingPeriod('yearly')}
        style={[
          styles.toggleButton,
          billingPeriod === 'yearly' && styles.toggleButtonActive,
        ]}
      >
        <Text
          style={[
            styles.toggleText,
            billingPeriod === 'yearly' && styles.toggleTextActive,
          ]}
        >
          Yearly
        </Text>
        <View style={styles.saveBadge}>
          <Text style={styles.saveBadgeText}>Save 20%</Text>
        </View>
      </Pressable>
    </View>
  );
}

// ============================================================================
// Card Component
// ============================================================================

export function PricingCard({
  name,
  description,
  price,
  currency = '$',
  popular = false,
  disabled = false,
  badge,
  children,
  style,
}: PricingCardProps) {
  const { billingPeriod } = usePricingTable();
  const currentPrice = billingPeriod === 'yearly' ? price.yearly : price.monthly;

  return (
    <View
      style={[
        styles.card,
        popular && styles.cardPopular,
        disabled && styles.cardDisabled,
        style,
      ]}
    >
      {(popular || badge) && (
        <View style={[styles.cardBadge, popular && styles.cardBadgePopular]}>
          <Text style={[styles.cardBadgeText, popular && styles.cardBadgeTextPopular]}>
            {badge || 'Most Popular'}
          </Text>
        </View>
      )}
      <View style={styles.cardHeader}>
        <Text style={styles.cardName}>{name}</Text>
        {description && <Text style={styles.cardDescription}>{description}</Text>}
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.currency}>{currency}</Text>
        <Text style={styles.priceAmount}>{currentPrice}</Text>
        <Text style={styles.pricePeriod}>
          /{billingPeriod === 'yearly' ? 'year' : 'month'}
        </Text>
      </View>
      {children}
    </View>
  );
}

// ============================================================================
// Header Component
// ============================================================================

export function PricingHeader({ name, badge, description, style }: PricingHeaderProps) {
  return (
    <View style={[styles.cardHeader, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.cardName}>{name}</Text>
        {badge && (
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
      {description && <Text style={styles.cardDescription}>{description}</Text>}
    </View>
  );
}

// ============================================================================
// Price Component
// ============================================================================

export function PricingPrice({
  monthly,
  yearly,
  currency = '$',
  style,
}: PricingPriceProps) {
  const { billingPeriod } = usePricingTable();
  const currentPrice = billingPeriod === 'yearly' ? yearly : monthly;

  return (
    <View style={[styles.priceContainer, style]}>
      <Text style={styles.currency}>{currency}</Text>
      <Text style={styles.priceAmount}>{currentPrice}</Text>
      <Text style={styles.pricePeriod}>
        /{billingPeriod === 'yearly' ? 'year' : 'month'}
      </Text>
    </View>
  );
}

// ============================================================================
// Features Component
// ============================================================================

export function PricingFeatures({ children, style }: PricingFeaturesProps) {
  return <View style={[styles.features, style]}>{children}</View>;
}

// ============================================================================
// Feature Component
// ============================================================================

export function PricingFeature({
  included = true,
  children,
  style,
}: PricingFeatureProps) {
  return (
    <View style={[styles.feature, style]}>
      <View
        style={[
          styles.featureIcon,
          included ? styles.featureIconIncluded : styles.featureIconExcluded,
        ]}
      >
        <Text style={styles.featureIconText}>{included ? '✓' : '×'}</Text>
      </View>
      <Text
        style={[
          styles.featureText,
          !included && styles.featureTextExcluded,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

// ============================================================================
// Action Component
// ============================================================================

export function PricingAction({
  children,
  onPress,
  primary = false,
  disabled = false,
  style,
}: PricingActionProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.action,
        primary && styles.actionPrimary,
        disabled && styles.actionDisabled,
        pressed && !disabled && { opacity: 0.8 },
        style,
      ]}
    >
      <Text
        style={[
          styles.actionText,
          primary && styles.actionTextPrimary,
          disabled && styles.actionTextDisabled,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: spacing[6],
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.bg.surface,
    borderRadius: radius.lg,
    padding: spacing[1],
    gap: spacing[1],
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: radius.md,
    gap: spacing[2],
  },
  toggleButtonActive: {
    backgroundColor: colors.bg.elevated,
  },
  toggleText: {
    fontSize: fontSizes.sm,
    color: colors.text.muted,
  },
  toggleTextActive: {
    color: colors.text.primary,
    fontWeight: fontWeights.medium as TextStyle['fontWeight'],
  },
  saveBadge: {
    backgroundColor: colors.accent.green.DEFAULT + '20',
    paddingVertical: spacing[0.5] || 2,
    paddingHorizontal: spacing[2],
    borderRadius: radius.full,
  },
  saveBadgeText: {
    fontSize: fontSizes.xs,
    color: colors.accent.green.DEFAULT,
    fontWeight: fontWeights.medium as TextStyle['fontWeight'],
  },
  card: {
    backgroundColor: colors.bg.surface,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.xl,
    padding: spacing[6],
    minWidth: 280,
    position: 'relative',
  },
  cardPopular: {
    borderColor: colors.accent.blue.DEFAULT,
    borderWidth: 2,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  cardBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: colors.bg.elevated,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  cardBadgePopular: {
    backgroundColor: colors.accent.blue.DEFAULT,
    borderColor: colors.accent.blue.DEFAULT,
  },
  cardBadgeText: {
    fontSize: fontSizes.xs,
    color: colors.text.secondary,
    fontWeight: fontWeights.medium as TextStyle['fontWeight'],
  },
  cardBadgeTextPopular: {
    color: colors.white,
  },
  cardHeader: {
    gap: spacing[1],
    marginBottom: spacing[4],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  headerBadge: {
    backgroundColor: colors.accent.amber.DEFAULT + '20',
    paddingVertical: spacing[0.5] || 2,
    paddingHorizontal: spacing[2],
    borderRadius: radius.full,
  },
  headerBadgeText: {
    fontSize: fontSizes.xs,
    color: colors.accent.amber.DEFAULT,
    fontWeight: fontWeights.medium as TextStyle['fontWeight'],
  },
  cardName: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  cardDescription: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing[6],
  },
  currency: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  priceAmount: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
    lineHeight: fontSizes['4xl'],
  },
  pricePeriod: {
    fontSize: fontSizes.sm,
    color: colors.text.muted,
    marginLeft: spacing[1],
  },
  features: {
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  featureIcon: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIconIncluded: {
    backgroundColor: colors.accent.green.DEFAULT + '20',
  },
  featureIconExcluded: {
    backgroundColor: colors.border.default,
  },
  featureIconText: {
    fontSize: fontSizes.xs,
    color: colors.accent.green.DEFAULT,
    fontWeight: fontWeights.bold as TextStyle['fontWeight'],
  },
  featureText: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    flex: 1,
  },
  featureTextExcluded: {
    color: colors.text.muted,
    textDecorationLine: 'line-through',
  },
  action: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    borderRadius: radius.lg,
    backgroundColor: colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  actionPrimary: {
    backgroundColor: colors.accent.blue.DEFAULT,
    borderColor: colors.accent.blue.DEFAULT,
  },
  actionDisabled: {
    opacity: 0.5,
  },
  actionText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
  actionTextPrimary: {
    color: colors.white,
  },
  actionTextDisabled: {
    color: colors.text.muted,
  },
});
