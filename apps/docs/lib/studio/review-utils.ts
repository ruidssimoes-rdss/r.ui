import chroma from 'chroma-js';
import { StudioTokens, ReviewResult, ReviewIssue } from './types';

export function reviewTheme(tokens: StudioTokens): ReviewResult {
  const issues: ReviewIssue[] = [];

  // Helper to find color by name
  const getColor = (name: string) =>
    tokens.colors.find((c) => c.name === name)?.value;

  const brandColor = getColor('brand');
  const textColor = getColor('text');
  const bgColor = getColor('background');
  const successColor = getColor('success');
  const errorColor = getColor('error');

  // Check brand color contrast on white
  if (brandColor) {
    try {
      const contrast = chroma.contrast(brandColor, '#ffffff');
      if (contrast < 4.5) {
        issues.push({
          type: 'warning',
          message: `Brand color on white has low contrast (${contrast.toFixed(2)}:1)`,
          suggestion: 'Consider darkening your brand color for better readability',
        });
      }
    } catch {
      // Invalid color, will be caught by other checks
    }
  }

  // Check text on background contrast
  if (textColor && bgColor) {
    try {
      const contrast = chroma.contrast(textColor, bgColor);
      if (contrast < 4.5) {
        issues.push({
          type: 'error',
          message: `Text on background fails WCAG AA (${contrast.toFixed(2)}:1 < 4.5:1)`,
          suggestion: 'Increase contrast between text and background colors',
        });
      } else if (contrast >= 7) {
        // This is good, no issue to add
      }
    } catch {
      issues.push({
        type: 'error',
        message: 'Invalid text or background color value',
        suggestion: 'Ensure colors are valid hex values',
      });
    }
  }

  // Check for missing essential colors
  const essentialColors = ['brand', 'text', 'background'];
  essentialColors.forEach((name) => {
    if (!tokens.colors.find((c) => c.name === name)) {
      issues.push({
        type: 'warning',
        message: `Missing recommended color: "${name}"`,
        suggestion: `Add a "${name}" color for better theme coverage`,
      });
    }
  });

  // Check for recommended semantic colors
  const semanticColors = ['success', 'error'];
  semanticColors.forEach((name) => {
    if (!tokens.colors.find((c) => c.name === name)) {
      issues.push({
        type: 'info',
        message: `Missing semantic color: "${name}"`,
        suggestion: `Consider adding a "${name}" color for status indicators`,
      });
    }
  });

  // Check success color is distinguishable from brand
  if (successColor && brandColor) {
    try {
      const deltaE = chroma.deltaE(successColor, brandColor);
      if (deltaE < 20) {
        issues.push({
          type: 'warning',
          message: 'Success and brand colors are very similar',
          suggestion: 'Use more distinct colors for better differentiation',
        });
      }
    } catch {
      // Invalid color
    }
  }

  // Check error color is distinguishable from brand
  if (errorColor && brandColor) {
    try {
      const deltaE = chroma.deltaE(errorColor, brandColor);
      if (deltaE < 20) {
        issues.push({
          type: 'warning',
          message: 'Error and brand colors are very similar',
          suggestion: 'Use more distinct colors for better differentiation',
        });
      }
    } catch {
      // Invalid color
    }
  }

  // Check success and error are distinguishable
  if (successColor && errorColor) {
    try {
      const deltaE = chroma.deltaE(successColor, errorColor);
      if (deltaE < 30) {
        issues.push({
          type: 'warning',
          message: 'Success and error colors are too similar',
          suggestion: 'Ensure success and error colors are easily distinguishable',
        });
      }
    } catch {
      // Invalid color
    }
  }

  // Check radius is reasonable
  if (tokens.radius.base > 24) {
    issues.push({
      type: 'info',
      message: 'Large base radius may cause visual issues',
      suggestion: 'Consider a base radius between 4-16px for most UIs',
    });
  }

  if (tokens.radius.base === 0) {
    issues.push({
      type: 'info',
      message: 'No border radius defined',
      suggestion: 'Consider adding some radius for a softer appearance',
    });
  }

  // Check minimum number of colors
  if (tokens.colors.length < 3) {
    issues.push({
      type: 'warning',
      message: 'Very few colors defined',
      suggestion: 'Consider adding more colors for a complete theme',
    });
  }

  // Check for duplicate color names
  const colorNames = tokens.colors.map((c) => c.name);
  const duplicates = colorNames.filter(
    (name, index) => colorNames.indexOf(name) !== index
  );
  if (duplicates.length > 0) {
    issues.push({
      type: 'error',
      message: `Duplicate color names: ${[...new Set(duplicates)].join(', ')}`,
      suggestion: 'Use unique names for each color',
    });
  }

  // Check spacing base is reasonable
  if (tokens.spacing.base < 2 || tokens.spacing.base > 8) {
    issues.push({
      type: 'info',
      message: `Unusual spacing base: ${tokens.spacing.base}px`,
      suggestion: 'Most design systems use 4px as a base unit',
    });
  }

  // Calculate score
  const errorCount = issues.filter((i) => i.type === 'error').length;
  const warningCount = issues.filter((i) => i.type === 'warning').length;
  const infoCount = issues.filter((i) => i.type === 'info').length;

  const score = Math.max(
    0,
    100 - errorCount * 20 - warningCount * 10 - infoCount * 2
  );

  return { score, issues };
}
