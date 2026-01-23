import chroma from 'chroma-js';
import {
  TokenSystem,
  ValidationIssue,
  ValidationSeverity,
  ValidationCategory,
} from '../types';

// ============================================
// WCAG CONTRAST CALCULATIONS
// ============================================

/**
 * Calculate WCAG contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  try {
    return chroma.contrast(color1, color2);
  } catch {
    return 0;
  }
}

// WCAG thresholds
const WCAG_AA_NORMAL = 4.5;
const WCAG_AA_LARGE = 3;
const WCAG_AAA_NORMAL = 7;

// Minimum recommended values
const MIN_BODY_FONT_SIZE = 14;
const MIN_SMALL_FONT_SIZE = 12;
const MIN_TOUCH_TARGET_IOS = 44;
const MIN_TOUCH_TARGET_ANDROID = 48;

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate color contrast for WCAG compliance
 */
function validateContrast(tokens: TokenSystem): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Get primary brand color (first one)
  const primaryBrand = tokens.colors.brand[0]?.value;

  // Check foreground on background (light mode)
  const fgOnBgLight = getContrastRatio(
    tokens.colors.surface.foreground.light,
    tokens.colors.surface.background.light
  );
  if (fgOnBgLight < WCAG_AA_NORMAL) {
    issues.push({
      id: 'contrast-fg-bg-light',
      severity: fgOnBgLight < WCAG_AA_LARGE ? 'error' : 'warning',
      category: 'contrast',
      title: 'Low contrast: Text on light background',
      description: `Foreground text has ${fgOnBgLight.toFixed(2)}:1 contrast on light background. WCAG AA requires 4.5:1.`,
      affectedTokens: ['surface.foreground.light', 'surface.background.light'],
      suggestion: 'Darken the text color or lighten the background.',
    });
  }

  // Check foreground on background (dark mode)
  const fgOnBgDark = getContrastRatio(
    tokens.colors.surface.foreground.dark,
    tokens.colors.surface.background.dark
  );
  if (fgOnBgDark < WCAG_AA_NORMAL) {
    issues.push({
      id: 'contrast-fg-bg-dark',
      severity: fgOnBgDark < WCAG_AA_LARGE ? 'error' : 'warning',
      category: 'contrast',
      title: 'Low contrast: Text on dark background',
      description: `Foreground text has ${fgOnBgDark.toFixed(2)}:1 contrast on dark background. WCAG AA requires 4.5:1.`,
      affectedTokens: ['surface.foreground.dark', 'surface.background.dark'],
      suggestion: 'Lighten the text color or darken the background.',
    });
  }

  // Check muted foreground on muted (light mode)
  const mutedLight = getContrastRatio(
    tokens.colors.surface.mutedForeground.light,
    tokens.colors.surface.muted.light
  );
  if (mutedLight < WCAG_AA_NORMAL) {
    issues.push({
      id: 'contrast-muted-light',
      severity: 'warning',
      category: 'contrast',
      title: 'Low contrast: Muted text (light mode)',
      description: `Muted text has ${mutedLight.toFixed(2)}:1 contrast. May be hard to read.`,
      affectedTokens: ['surface.mutedForeground.light', 'surface.muted.light'],
      suggestion: 'Increase contrast for muted text.',
    });
  }

  // Check muted foreground on muted (dark mode)
  const mutedDark = getContrastRatio(
    tokens.colors.surface.mutedForeground.dark,
    tokens.colors.surface.muted.dark
  );
  if (mutedDark < WCAG_AA_NORMAL) {
    issues.push({
      id: 'contrast-muted-dark',
      severity: 'warning',
      category: 'contrast',
      title: 'Low contrast: Muted text (dark mode)',
      description: `Muted text has ${mutedDark.toFixed(2)}:1 contrast. May be hard to read.`,
      affectedTokens: ['surface.mutedForeground.dark', 'surface.muted.dark'],
      suggestion: 'Increase contrast for muted text.',
    });
  }

  // Check primary brand color on background (light)
  if (primaryBrand) {
    const primaryOnLight = getContrastRatio(
      primaryBrand.light,
      tokens.colors.surface.background.light
    );
    if (primaryOnLight < WCAG_AA_NORMAL) {
      issues.push({
        id: 'contrast-primary-light',
        severity: primaryOnLight < WCAG_AA_LARGE ? 'warning' : 'info',
        category: 'contrast',
        title: 'Primary color may lack contrast (light)',
        description: `Primary brand color has ${primaryOnLight.toFixed(2)}:1 contrast on light background.`,
        affectedTokens: ['brand.primary.light', 'surface.background.light'],
        suggestion: 'Use a darker shade when displaying as text.',
      });
    }

    const primaryOnDark = getContrastRatio(
      primaryBrand.dark,
      tokens.colors.surface.background.dark
    );
    if (primaryOnDark < WCAG_AA_NORMAL) {
      issues.push({
        id: 'contrast-primary-dark',
        severity: primaryOnDark < WCAG_AA_LARGE ? 'warning' : 'info',
        category: 'contrast',
        title: 'Primary color may lack contrast (dark)',
        description: `Primary brand color has ${primaryOnDark.toFixed(2)}:1 contrast on dark background.`,
        affectedTokens: ['brand.primary.dark', 'surface.background.dark'],
        suggestion: 'Use a lighter shade when displaying as text.',
      });
    }
  }

  // Check semantic colors
  tokens.colors.semantic.forEach((semantic) => {
    const lightRatio = getContrastRatio(
      semantic.value.light,
      tokens.colors.surface.background.light
    );
    if (lightRatio < WCAG_AA_LARGE) {
      issues.push({
        id: `contrast-semantic-${semantic.name}-light`,
        severity: 'warning',
        category: 'contrast',
        title: `Semantic "${semantic.name}" may be hard to see`,
        description: `${semantic.name} color has ${lightRatio.toFixed(2)}:1 contrast on light background.`,
        affectedTokens: [`semantic.${semantic.name}.light`],
        suggestion: 'Ensure status indicators are visible.',
      });
    }
  });

  return issues;
}

/**
 * Validate typography settings
 */
function validateTypography(tokens: TokenSystem): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Find base font size
  const baseSize = tokens.typography.sizes.find((s) => s.name === 'base');
  if (baseSize && baseSize.size < MIN_BODY_FONT_SIZE) {
    issues.push({
      id: 'typography-base-size',
      severity: 'warning',
      category: 'typography',
      title: 'Small base font size',
      description: `Base font size (${baseSize.size}px) is below the recommended ${MIN_BODY_FONT_SIZE}px for comfortable reading.`,
      affectedTokens: ['typography.sizes.base'],
      suggestion: 'Increase base font size to at least 14px, preferably 16px.',
    });
  }

  // Find small font size
  const smallSize = tokens.typography.sizes.find(
    (s) => s.name === 'sm' || s.name === 'small'
  );
  if (smallSize && smallSize.size < MIN_SMALL_FONT_SIZE) {
    issues.push({
      id: 'typography-small-size',
      severity: 'warning',
      category: 'typography',
      title: 'Very small text',
      description: `Small text size (${smallSize.size}px) may be difficult to read for many users.`,
      affectedTokens: ['typography.sizes.sm'],
      suggestion: 'Keep small text at least 12px for readability.',
    });
  }

  // Check line height ratio
  if (baseSize) {
    const lineHeightValue = baseSize.lineHeight;

    // If lineHeight is > 3, it's probably absolute (e.g., 24px); otherwise it's a ratio
    const actualRatio =
      lineHeightValue > 3 ? lineHeightValue / baseSize.size : lineHeightValue;

    if (actualRatio < 1.4) {
      issues.push({
        id: 'typography-line-height',
        severity: 'info',
        category: 'typography',
        title: 'Tight line height',
        description: `Base line height ratio (${actualRatio.toFixed(2)}) is below 1.4. This may affect readability.`,
        affectedTokens: ['typography.sizes.base'],
        suggestion: 'Consider a line height of at least 1.5x for body text.',
      });
    }
  }

  // Check font weight variety
  if (tokens.typography.weights.length < 3) {
    issues.push({
      id: 'typography-weight-variety',
      severity: 'info',
      category: 'typography',
      title: 'Limited font weight variety',
      description: `Only ${tokens.typography.weights.length} font weights defined. This may limit typographic hierarchy.`,
      affectedTokens: ['typography.weights'],
      suggestion: 'Consider adding more weight variations for hierarchy.',
    });
  }

  // Check for missing font families
  if (tokens.typography.families.length < 2) {
    issues.push({
      id: 'typography-font-variety',
      severity: 'info',
      category: 'typography',
      title: 'Single font family',
      description:
        'Only one font family defined. Consider adding a monospace font for code.',
      affectedTokens: ['typography.families'],
      suggestion: 'Add a monospace font for code blocks and technical content.',
    });
  }

  return issues;
}

/**
 * Validate spacing settings
 */
function validateSpacing(tokens: TokenSystem): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check base unit
  if (tokens.spacing.baseUnit !== 4 && tokens.spacing.baseUnit !== 8) {
    issues.push({
      id: 'spacing-base-unit',
      severity: 'info',
      category: 'spacing',
      title: 'Non-standard spacing unit',
      description: `Base spacing unit (${tokens.spacing.baseUnit}px) is not 4px or 8px.`,
      affectedTokens: ['spacing.baseUnit'],
      suggestion: 'Consider 4px or 8px for better compatibility with other systems.',
    });
  }

  // Check if scale is consistent
  const scale = tokens.spacing.scale;
  if (scale.length < 8) {
    issues.push({
      id: 'spacing-scale-variety',
      severity: 'info',
      category: 'spacing',
      title: 'Limited spacing scale',
      description: `Only ${scale.length} spacing values. Consider adding more for flexibility.`,
      affectedTokens: ['spacing.scale'],
      suggestion: 'Add more spacing values for finer control.',
    });
  }

  // Check for 0 in scale
  if (!scale.includes(0)) {
    issues.push({
      id: 'spacing-zero',
      severity: 'info',
      category: 'spacing',
      title: 'No zero spacing',
      description: 'Scale does not include 0. This is often useful for removing margins/padding.',
      affectedTokens: ['spacing.scale'],
      suggestion: 'Consider adding 0 to your spacing scale.',
    });
  }

  return issues;
}

/**
 * Validate touch target sizes
 */
function validateTouchTargets(tokens: TokenSystem): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const scale = tokens.spacing.scale;

  // Check if there are values suitable for touch targets
  const hasIOSTouchTarget = scale.some((s) => s >= MIN_TOUCH_TARGET_IOS);
  const hasAndroidTouchTarget = scale.some((s) => s >= MIN_TOUCH_TARGET_ANDROID);

  if (!hasIOSTouchTarget) {
    issues.push({
      id: 'touch-target-ios',
      severity: 'warning',
      category: 'touch-target',
      title: 'No iOS touch target size',
      description: `Spacing scale lacks values >= ${MIN_TOUCH_TARGET_IOS}px for iOS touch targets.`,
      affectedTokens: ['spacing.scale'],
      suggestion: 'Add spacing value of at least 44px for touch targets.',
    });
  }

  if (!hasAndroidTouchTarget) {
    issues.push({
      id: 'touch-target-android',
      severity: 'info',
      category: 'touch-target',
      title: 'No Android touch target size',
      description: `Spacing scale lacks values >= ${MIN_TOUCH_TARGET_ANDROID}px for Material Design touch targets.`,
      affectedTokens: ['spacing.scale'],
      suggestion: 'Add spacing value of at least 48px for Android touch targets.',
    });
  }

  return issues;
}

/**
 * Validate general design system properties
 */
function validateGeneral(tokens: TokenSystem): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check radius values
  const radiusScale = tokens.radius.scale;
  const mdRadius = radiusScale.find((r) => r.name === 'md');
  if (mdRadius && mdRadius.value > 16) {
    issues.push({
      id: 'radius-large',
      severity: 'info',
      category: 'general',
      title: 'Large default radius',
      description: `Medium radius (${mdRadius.value}px) is quite large. May not suit all UI elements.`,
      affectedTokens: ['radius.md'],
      suggestion: 'Consider if very rounded corners work for all components.',
    });
  }

  // Check animation durations
  const fastDuration = tokens.animations.durations.find(
    (d) => d.name === 'fast'
  );
  if (fastDuration && fastDuration.value < 50) {
    issues.push({
      id: 'animation-too-fast',
      severity: 'info',
      category: 'general',
      title: 'Very fast animation',
      description: `Fast animation (${fastDuration.value}ms) may be imperceptible to users.`,
      affectedTokens: ['animations.durations.fast'],
      suggestion: 'Consider at least 100ms for noticeable animations.',
    });
  }

  const slowDuration = tokens.animations.durations.find(
    (d) => d.name === 'slow'
  );
  if (slowDuration && slowDuration.value > 500) {
    issues.push({
      id: 'animation-too-slow',
      severity: 'info',
      category: 'general',
      title: 'Slow animation',
      description: `Slow animation (${slowDuration.value}ms) may feel sluggish.`,
      affectedTokens: ['animations.durations.slow'],
      suggestion: 'Consider keeping animations under 500ms for responsiveness.',
    });
  }

  // Check name
  if (!tokens.name || tokens.name.trim() === '') {
    issues.push({
      id: 'general-no-name',
      severity: 'info',
      category: 'general',
      title: 'No system name',
      description: 'Token system has no name assigned.',
      suggestion: 'Give your design system a memorable name.',
    });
  }

  return issues;
}

// ============================================
// MAIN VALIDATION FUNCTION
// ============================================

/**
 * Validate entire token system
 */
export function validateTokenSystem(tokens: TokenSystem): ValidationIssue[] {
  const issues: ValidationIssue[] = [
    ...validateContrast(tokens),
    ...validateTypography(tokens),
    ...validateSpacing(tokens),
    ...validateTouchTargets(tokens),
    ...validateGeneral(tokens),
  ];

  return issues;
}

// ============================================
// SUMMARY HELPERS
// ============================================

/**
 * Get validation summary counts
 */
export function getValidationSummary(issues: ValidationIssue[]) {
  return {
    total: issues.length,
    errors: issues.filter((i) => i.severity === 'error').length,
    warnings: issues.filter((i) => i.severity === 'warning').length,
    info: issues.filter((i) => i.severity === 'info').length,
  };
}

/**
 * Get issues grouped by category
 */
export function getIssuesByCategory(issues: ValidationIssue[]) {
  return {
    contrast: issues.filter((i) => i.category === 'contrast'),
    typography: issues.filter((i) => i.category === 'typography'),
    spacing: issues.filter((i) => i.category === 'spacing'),
    touchTarget: issues.filter((i) => i.category === 'touch-target'),
    general: issues.filter((i) => i.category === 'general'),
  };
}

/**
 * Get issues filtered by severity
 */
export function getIssuesBySeverity(
  issues: ValidationIssue[],
  severity: ValidationSeverity
) {
  return issues.filter((i) => i.severity === severity);
}
