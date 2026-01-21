import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  Platform,
  Animated,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontSizes, fontWeights } from '../../tokens/typography';
import { storage } from '../../utils/storage';
import { GlassSurface } from '../GlassSurface';
import { useTheme, ThemeContextValue } from '../../themes/ThemeProvider';

// Safe hook that returns null if ThemeProvider is not present
function useThemeOptional(): ThemeContextValue | null {
  try {
    return useTheme();
  } catch {
    return null;
  }
}

// ============================================================================
// Types
// ============================================================================

export type AnnouncementVariant = 'info' | 'warning' | 'success' | 'promo';

export interface AnnouncementProps {
  /** Visual variant */
  variant?: AnnouncementVariant;
  /** Whether the announcement can be dismissed */
  dismissible?: boolean;
  /** Whether the announcement is sticky at top */
  sticky?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Storage key for persisting dismiss state */
  storageKey?: string;
  /** Children content */
  children: React.ReactNode;
  /** Additional styles */
  style?: ViewStyle;
}

export interface AnnouncementContentProps {
  /** Content text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface AnnouncementActionProps {
  /** Action text */
  children: React.ReactNode;
  /** Link URL */
  href?: string;
  /** Press handler */
  onPress?: () => void;
  /** Additional styles */
  style?: TextStyle;
}

export interface AnnouncementCloseProps {
  /** Additional styles */
  style?: ViewStyle;
}

export interface AnnouncementCountdownProps {
  /** Target date */
  targetDate: Date;
  /** Prefix text */
  prefix?: string;
  /** Callback when countdown ends */
  onEnd?: () => void;
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Context
// ============================================================================

interface AnnouncementContextValue {
  variant: AnnouncementVariant;
  dismiss: () => void;
  isGlass: boolean;
}

const AnnouncementContext = createContext<AnnouncementContextValue>({
  variant: 'info',
  dismiss: () => {},
  isGlass: false,
});

export function useAnnouncement() {
  return useContext(AnnouncementContext);
}

// ============================================================================
// Variant Colors
// ============================================================================

const variantColors = {
  info: {
    bg: colors.accent.blue.DEFAULT,
    text: colors.white,
    action: colors.white,
    glassTint: 'rgba(59, 130, 246, 0.15)', // blue tint
  },
  warning: {
    bg: colors.accent.amber.DEFAULT,
    text: colors.text.inverse,
    action: colors.text.inverse,
    glassTint: 'rgba(245, 158, 11, 0.15)', // amber tint
  },
  success: {
    bg: colors.accent.green.DEFAULT,
    text: colors.white,
    action: colors.white,
    glassTint: 'rgba(34, 197, 94, 0.15)', // green tint
  },
  promo: {
    bg: `linear-gradient(90deg, ${colors.accent.blue.DEFAULT}, ${colors.accent.purple.DEFAULT})`,
    bgFallback: colors.accent.purple.DEFAULT,
    text: colors.white,
    action: colors.white,
    glassTint: 'rgba(139, 92, 246, 0.15)', // purple tint
  },
};

// ============================================================================
// Root Component
// ============================================================================

export function Announcement({
  variant = 'info',
  dismissible = false,
  sticky = false,
  onDismiss,
  storageKey,
  children,
  style,
}: AnnouncementProps) {
  const themeContext = useThemeOptional();
  const isGlass = themeContext?.isGlass ?? false;
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(!!storageKey);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Check storage for dismiss state (works on both web and native)
  useEffect(() => {
    if (storageKey) {
      storage.getItem(`announcement-${storageKey}`).then((dismissed) => {
        if (dismissed === 'true') {
          setIsVisible(false);
        }
        setIsLoading(false);
      });
    }
  }, [storageKey]);

  const dismiss = async () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(async () => {
      setIsVisible(false);
      if (storageKey) {
        await storage.setItem(`announcement-${storageKey}`, 'true');
      }
      onDismiss?.();
    });
  };

  // Don't render while checking storage
  if (isLoading) return null;

  if (!isVisible) return null;

  const variantStyle = variantColors[variant];
  const isPromo = variant === 'promo';

  const containerStyle: ViewStyle[] = [
    styles.container,
    sticky && styles.sticky,
    !isPromo && !isGlass && { backgroundColor: variantStyle.bg },
    style,
  ];

  const content = (
    <AnnouncementContext.Provider value={{ variant, dismiss, isGlass }}>
      <View style={styles.inner}>{children}</View>
    </AnnouncementContext.Provider>
  );

  // Glass mode rendering - use GlassSurface with accent tint
  if (isGlass) {
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <GlassSurface
          intensity={12}
          borderRadius={radius.md}
          shadow="sm"
          bordered
          style={[
            styles.glassContainer,
            sticky && styles.sticky,
            { backgroundColor: variantStyle.glassTint },
            style as ViewStyle,
          ]}
        >
          {content}
        </GlassSurface>
      </Animated.View>
    );
  }

  // Handle gradient for promo variant on web
  if (isPromo && Platform.OS === 'web') {
    return (
      <Animated.View
        style={[
          containerStyle,
          {
            opacity: fadeAnim,
            // @ts-ignore - web-only style
            background: variantStyle.bg,
          },
        ]}
      >
        {content}
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        containerStyle,
        isPromo && { backgroundColor: variantStyle.bgFallback },
        { opacity: fadeAnim },
      ]}
    >
      {content}
    </Animated.View>
  );
}

// ============================================================================
// Content Component
// ============================================================================

export function AnnouncementContent({ children, style }: AnnouncementContentProps) {
  const { variant, isGlass } = useAnnouncement();
  const variantStyle = variantColors[variant];

  // In glass mode, use primary text color for readability
  const textColor = isGlass ? colors.text.primary : variantStyle.text;

  return (
    <Text style={[styles.content, { color: textColor }, style]}>
      {children}
    </Text>
  );
}

// ============================================================================
// Action Component
// ============================================================================

export function AnnouncementAction({
  children,
  href,
  onPress,
  style,
}: AnnouncementActionProps) {
  const { variant, isGlass } = useAnnouncement();
  const variantStyle = variantColors[variant];

  // In glass mode, use accent color for actions
  const actionColor = isGlass ? colors.accent.blue.DEFAULT : variantStyle.action;

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
      <Text style={[styles.action, { color: actionColor }, style]}>
        {children} →
      </Text>
    </Pressable>
  );
}

// ============================================================================
// Close Component
// ============================================================================

export function AnnouncementClose({ style }: AnnouncementCloseProps) {
  const { variant, dismiss, isGlass } = useAnnouncement();
  const variantStyle = variantColors[variant];

  // In glass mode, use muted text for close icon
  const iconColor = isGlass ? colors.text.muted : variantStyle.text;

  return (
    <Pressable
      onPress={dismiss}
      style={({ pressed }) => [
        styles.close,
        { opacity: pressed ? 0.7 : 1 },
        style,
      ]}
      accessibilityLabel="Dismiss announcement"
      accessibilityRole="button"
    >
      <Text style={[styles.closeIcon, { color: iconColor }]}>×</Text>
    </Pressable>
  );
}

// ============================================================================
// Countdown Component
// ============================================================================

export function AnnouncementCountdown({
  targetDate,
  prefix = 'Ends in',
  onEnd,
  style,
}: AnnouncementCountdownProps) {
  const { variant } = useAnnouncement();
  const variantStyle = variantColors[variant];
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate);
      setTimeLeft(remaining);

      if (remaining.total <= 0) {
        clearInterval(timer);
        onEnd?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onEnd]);

  if (timeLeft.total <= 0) return null;

  return (
    <View style={[styles.countdown, style]}>
      <Text style={[styles.countdownPrefix, { color: variantStyle.text }]}>
        {prefix}
      </Text>
      <View style={styles.countdownUnits}>
        {timeLeft.days > 0 && (
          <CountdownUnit value={timeLeft.days} unit="d" variant={variant} />
        )}
        <CountdownUnit value={timeLeft.hours} unit="h" variant={variant} />
        <CountdownUnit value={timeLeft.minutes} unit="m" variant={variant} />
        <CountdownUnit value={timeLeft.seconds} unit="s" variant={variant} />
      </View>
    </View>
  );
}

function CountdownUnit({
  value,
  unit,
  variant,
}: {
  value: number;
  unit: string;
  variant: AnnouncementVariant;
}) {
  const variantStyle = variantColors[variant];

  return (
    <View style={styles.countdownUnit}>
      <Text style={[styles.countdownValue, { color: variantStyle.text }]}>
        {value.toString().padStart(2, '0')}
      </Text>
      <Text style={[styles.countdownLabel, { color: variantStyle.text }]}>
        {unit}
      </Text>
    </View>
  );
}

function calculateTimeLeft(targetDate: Date) {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const total = target - now;

  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
  },
  sticky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[3],
    flexWrap: 'wrap',
  },
  content: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium as TextStyle['fontWeight'],
    textAlign: 'center',
  },
  action: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold as TextStyle['fontWeight'],
    textDecorationLine: 'underline',
  },
  close: {
    position: 'absolute',
    right: spacing[3],
    top: '50%',
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: fontWeights.bold as TextStyle['fontWeight'],
    lineHeight: 24,
  },
  countdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  countdownPrefix: {
    fontSize: fontSizes.sm,
  },
  countdownUnits: {
    flexDirection: 'row',
    gap: spacing[1],
  },
  countdownUnit: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  countdownValue: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold as TextStyle['fontWeight'],
    fontVariant: ['tabular-nums'],
  },
  countdownLabel: {
    fontSize: fontSizes.xs,
    marginLeft: 1,
  },
  // Glass mode styles
  glassContainer: {
    width: '100%',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
  },
});
