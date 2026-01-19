import React, { useState } from 'react';
import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

// ============================================================================
// Types
// ============================================================================

export type CalloutVariant = 'info' | 'warning' | 'error' | 'success' | 'tip';

export interface CalloutProps {
  /** Callout content */
  children: React.ReactNode;
  /** Visual variant */
  variant?: CalloutVariant;
  /** Custom icon (auto-selected if not provided) */
  icon?: React.ReactNode;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Called when dismiss button is pressed */
  onDismiss?: () => void;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Variant Styles
// ============================================================================

const variantStyles: Record<CalloutVariant, { container: ViewStyle; border: string }> = {
  info: {
    container: { backgroundColor: 'rgba(59, 130, 246, 0.1)' },
    border: colors.accent.blue.DEFAULT,
  },
  warning: {
    container: { backgroundColor: 'rgba(245, 158, 11, 0.1)' },
    border: colors.accent.yellow.DEFAULT,
  },
  error: {
    container: { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
    border: colors.accent.red.DEFAULT,
  },
  success: {
    container: { backgroundColor: 'rgba(34, 197, 94, 0.1)' },
    border: colors.accent.green.DEFAULT,
  },
  tip: {
    container: { backgroundColor: 'rgba(139, 92, 246, 0.1)' },
    border: colors.accent.purple.DEFAULT,
  },
};

// ============================================================================
// Default Icons
// ============================================================================

function InfoIcon() {
  return (
    <View style={[iconStyles.container, { backgroundColor: colors.accent.blue.DEFAULT }]}>
      <View style={iconStyles.infoI} />
      <View style={iconStyles.infoDot} />
    </View>
  );
}

function WarningIcon() {
  return (
    <View style={[iconStyles.container, { backgroundColor: colors.accent.yellow.DEFAULT }]}>
      <View style={iconStyles.warningExclaim} />
      <View style={iconStyles.warningDot} />
    </View>
  );
}

function ErrorIcon() {
  return (
    <View style={[iconStyles.container, { backgroundColor: colors.accent.red.DEFAULT }]}>
      <View style={iconStyles.errorX1} />
      <View style={iconStyles.errorX2} />
    </View>
  );
}

function SuccessIcon() {
  return (
    <View style={[iconStyles.container, { backgroundColor: colors.accent.green.DEFAULT }]}>
      <View style={iconStyles.checkmark} />
    </View>
  );
}

function TipIcon() {
  return (
    <View style={[iconStyles.container, { backgroundColor: colors.accent.purple.DEFAULT }]}>
      <View style={iconStyles.bulb} />
      <View style={iconStyles.bulbBase} />
    </View>
  );
}

function CloseIcon() {
  return (
    <View style={iconStyles.closeContainer}>
      <View style={iconStyles.closeX1} />
      <View style={iconStyles.closeX2} />
    </View>
  );
}

const defaultIcons: Record<CalloutVariant, React.ReactNode> = {
  info: <InfoIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  success: <SuccessIcon />,
  tip: <TipIcon />,
};

// ============================================================================
// Component
// ============================================================================

export function Callout({
  children,
  variant = 'info',
  icon,
  dismissible = false,
  onDismiss,
  style,
}: CalloutProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const variantStyle = variantStyles[variant];
  const displayIcon = icon ?? defaultIcons[variant];

  return (
    <View
      style={[
        styles.container,
        variantStyle.container,
        { borderLeftColor: variantStyle.border },
        style,
      ]}
      accessibilityRole="alert"
    >
      {displayIcon && (
        <View style={styles.iconContainer}>
          {displayIcon}
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
      {dismissible && (
        <Pressable
          onPress={handleDismiss}
          style={styles.dismissButton}
          accessibilityLabel="Dismiss"
          accessibilityRole="button"
        >
          <CloseIcon />
        </Pressable>
      )}
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: spacing[4],
    borderRadius: radius.md,
    borderLeftWidth: 4,
  },
  iconContainer: {
    marginRight: spacing[3],
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  dismissButton: {
    marginLeft: spacing[2],
    padding: spacing[1],
  },
});

const iconStyles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Info icon (i)
  infoI: {
    width: 2,
    height: 8,
    backgroundColor: 'white',
    borderRadius: 1,
    marginTop: 2,
  },
  infoDot: {
    position: 'absolute',
    top: 4,
    width: 2,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  // Warning icon (!)
  warningExclaim: {
    width: 2,
    height: 7,
    backgroundColor: 'white',
    borderRadius: 1,
    marginBottom: 1,
  },
  warningDot: {
    position: 'absolute',
    bottom: 3,
    width: 2,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  // Error icon (x)
  errorX1: {
    position: 'absolute',
    width: 10,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  errorX2: {
    position: 'absolute',
    width: 10,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
  // Success icon (checkmark)
  checkmark: {
    width: 6,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
    marginLeft: 1,
  },
  // Tip icon (lightbulb)
  bulb: {
    width: 8,
    height: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: -2,
  },
  bulbBase: {
    width: 4,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 1,
  },
  // Close icon
  closeContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeX1: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  closeX2: {
    position: 'absolute',
    width: 12,
    height: 2,
    backgroundColor: colors.text.secondary,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
});
