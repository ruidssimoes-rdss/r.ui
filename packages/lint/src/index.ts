// Main entry point for @r-ui/lint

// Core exports
export { runLinter, getLintSummary } from './linter.js';
export { parseFile, parseSource, runRules } from './parser.js';
export { formatResults, printResults } from './reporter.js';

// Rules exports
export {
  allRules,
  rulesByCategory,
  rulesMap,
  getRulesByNames,
  getRuleDocumentation,
  // Individual rules
  missingAccessibilityLabel,
  missingAccessibilityRole,
  touchableMissingFeedback,
  imageMissingAlt,
  smallTouchTarget,
  hardcodedColor,
  hardcodedSpacing,
  inconsistentRadius,
  missingDarkMode,
  nonTokenFontSize,
} from './rules/index.js';

// Type exports
export type {
  Severity,
  LintIssue,
  LintResult,
  RuleContext,
  RuleVisitor,
  Rule,
  LinterOptions,
  LintSummary,
} from './types.js';

// Utility exports
export {
  SPACING_SCALE,
  RADIUS_SCALE,
  FONT_SIZE_SCALE,
  MIN_TOUCH_TARGET,
  TAILWIND_SPACING,
  LIGHT_MODE_COLORS,
  INTERACTIVE_COMPONENTS,
  ICON_COMPONENTS,
  isInteractiveComponent,
  isIconComponent,
  getJSXElementName,
  hasAttribute,
  getAttributeValue,
  hasOnPress,
  getStyleProperties,
  getNumericStyleValue,
  getStringStyleValue,
  isHexColor,
  isRgbColor,
  hasArbitraryColor,
  extractTailwindSize,
  findNearestSpacingToken,
  findNearestRadiusToken,
  findNearestFontSizeToken,
  spacingToTailwindClass,
  getJSXChildren,
  hasOnlyIconChildren,
  hasDarkModeVariant,
  extractLightModeColorClasses,
  calculateScore,
} from './utils.js';
