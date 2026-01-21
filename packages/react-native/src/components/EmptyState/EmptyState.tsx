import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { fontFamilies, fontSizes, fontWeights } from '../../tokens/typography';
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

export type EmptyStateVariant = 'default' | 'compact';
export type EmptyStateIconType = 'no-data' | 'error' | 'search' | 'permission' | 'folder';

export interface EmptyStateProps {
  /** Layout variant */
  variant?: EmptyStateVariant;
  /** Children components */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

export interface EmptyStateIconProps {
  /** Icon type or custom icon */
  icon?: EmptyStateIconType | React.ReactNode;
  /** Icon size */
  size?: number;
  /** Additional styles */
  style?: ViewStyle;
}

export interface EmptyStateTitleProps {
  /** Title text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface EmptyStateDescriptionProps {
  /** Description text */
  children: React.ReactNode;
  /** Additional styles */
  style?: TextStyle;
}

export interface EmptyStateActionProps {
  /** Action button label */
  children: React.ReactNode;
  /** Called when action is pressed */
  onPress?: () => void;
  /** Primary or secondary action */
  variant?: 'primary' | 'secondary';
  /** Additional styles */
  style?: ViewStyle;
}

// ============================================================================
// Root Component
// ============================================================================

export function EmptyState({ variant = 'default', children, style }: EmptyStateProps) {
  const themeContext = useThemeOptional();
  const isGlass = themeContext?.isGlass ?? false;

  // Glass mode rendering
  if (isGlass) {
    return (
      <GlassSurface
        intensity={16}
        borderRadius={radius.lg}
        shadow="md"
        bordered
        style={[
          styles.glassContainer,
          variant === 'compact' && styles.containerCompact,
          style as ViewStyle,
        ]}
      >
        {children}
      </GlassSurface>
    );
  }

  // Default non-glass rendering
  return (
    <View style={[styles.container, variant === 'compact' && styles.containerCompact, style]}>
      {children}
    </View>
  );
}

// ============================================================================
// Icon Component
// ============================================================================

export function EmptyStateIcon({ icon = 'no-data', size = 64, style }: EmptyStateIconProps) {
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return icon;
    }

    switch (icon) {
      case 'no-data':
        return <NoDataIcon size={size} />;
      case 'error':
        return <ErrorIcon size={size} />;
      case 'search':
        return <SearchIcon size={size} />;
      case 'permission':
        return <PermissionIcon size={size} />;
      case 'folder':
        return <FolderIcon size={size} />;
      default:
        return <NoDataIcon size={size} />;
    }
  };

  return (
    <View style={[styles.iconContainer, style]}>
      {renderIcon()}
    </View>
  );
}

// ============================================================================
// Title Component
// ============================================================================

export function EmptyStateTitle({ children, style }: EmptyStateTitleProps) {
  return (
    <Text style={[styles.title, style]}>{children}</Text>
  );
}

// ============================================================================
// Description Component
// ============================================================================

export function EmptyStateDescription({ children, style }: EmptyStateDescriptionProps) {
  return (
    <Text style={[styles.description, style]}>{children}</Text>
  );
}

// ============================================================================
// Action Component
// ============================================================================

export function EmptyStateAction({
  children,
  onPress,
  variant = 'primary',
  style,
}: EmptyStateActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[
        styles.action,
        variant === 'primary' ? styles.actionPrimary : styles.actionSecondary,
        style,
      ]}
    >
      <Text
        style={[
          styles.actionText,
          variant === 'primary' ? styles.actionTextPrimary : styles.actionTextSecondary,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

// ============================================================================
// Icons
// ============================================================================

function NoDataIcon({ size }: { size: number }) {
  const scale = size / 64;
  return (
    <View style={[iconStyles.container, { width: size, height: size }]}>
      <View style={[iconStyles.circle, { width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4 }]}>
        <View style={[iconStyles.inbox, { width: size * 0.4, height: size * 0.25, borderRadius: scale * 4 }]} />
        <View style={[iconStyles.inboxLine, { width: size * 0.25, height: scale * 2, top: size * 0.35 }]} />
      </View>
    </View>
  );
}

function ErrorIcon({ size }: { size: number }) {
  const scale = size / 64;
  return (
    <View style={[iconStyles.container, { width: size, height: size }]}>
      <View style={[iconStyles.errorCircle, { width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4 }]}>
        <View style={[iconStyles.errorX1, { width: size * 0.3, height: scale * 4 }]} />
        <View style={[iconStyles.errorX2, { width: size * 0.3, height: scale * 4 }]} />
      </View>
    </View>
  );
}

function SearchIcon({ size }: { size: number }) {
  const scale = size / 64;
  return (
    <View style={[iconStyles.container, { width: size, height: size }]}>
      <View style={[iconStyles.circle, { width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4 }]}>
        <View style={[iconStyles.searchCircle, { width: size * 0.3, height: size * 0.3, borderRadius: size * 0.15, borderWidth: scale * 3 }]} />
        <View style={[iconStyles.searchHandle, { width: size * 0.15, height: scale * 4, bottom: size * 0.2, right: size * 0.22 }]} />
      </View>
    </View>
  );
}

function PermissionIcon({ size }: { size: number }) {
  const scale = size / 64;
  return (
    <View style={[iconStyles.container, { width: size, height: size }]}>
      <View style={[iconStyles.circle, { width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4 }]}>
        <View style={[iconStyles.lock, { width: size * 0.25, height: size * 0.2, borderRadius: scale * 2, borderWidth: scale * 3 }]} />
        <View style={[iconStyles.lockBody, { width: size * 0.3, height: size * 0.2, borderRadius: scale * 3 }]} />
      </View>
    </View>
  );
}

function FolderIcon({ size }: { size: number }) {
  const scale = size / 64;
  return (
    <View style={[iconStyles.container, { width: size, height: size }]}>
      <View style={[iconStyles.circle, { width: size * 0.8, height: size * 0.8, borderRadius: size * 0.4 }]}>
        <View style={[iconStyles.folderTab, { width: size * 0.2, height: size * 0.08, borderRadius: scale * 2 }]} />
        <View style={[iconStyles.folderBody, { width: size * 0.4, height: size * 0.25, borderRadius: scale * 3 }]} />
      </View>
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[8],
  },
  containerCompact: {
    padding: spacing[4],
  },
  // Glass mode styles
  glassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[8],
  },
  iconContainer: {
    marginBottom: spacing[4],
  },
  title: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  description: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
    marginBottom: spacing[4],
  },
  action: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: radius.md,
    marginTop: spacing[2],
  },
  actionPrimary: {
    backgroundColor: colors.text.primary,
  },
  actionSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  actionText: {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
  },
  actionTextPrimary: {
    color: colors.text.inverse,
  },
  actionTextSecondary: {
    color: colors.text.primary,
  },
});

const iconStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: colors.bg.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inbox: {
    backgroundColor: colors.text.muted,
    marginBottom: -4,
  },
  inboxLine: {
    backgroundColor: colors.text.muted,
    position: 'absolute',
  },
  errorCircle: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorX1: {
    position: 'absolute',
    backgroundColor: colors.accent.red.DEFAULT,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  errorX2: {
    position: 'absolute',
    backgroundColor: colors.accent.red.DEFAULT,
    borderRadius: 2,
    transform: [{ rotate: '-45deg' }],
  },
  searchCircle: {
    borderColor: colors.text.muted,
    marginBottom: -4,
    marginRight: -4,
  },
  searchHandle: {
    position: 'absolute',
    backgroundColor: colors.text.muted,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  lock: {
    borderColor: colors.text.muted,
    borderBottomWidth: 0,
    marginBottom: -2,
  },
  lockBody: {
    backgroundColor: colors.text.muted,
  },
  folderTab: {
    backgroundColor: colors.text.muted,
    marginBottom: -2,
    marginRight: 8,
  },
  folderBody: {
    backgroundColor: colors.text.muted,
  },
});
