// ============================================
// COLOR TOKENS
// ============================================

export interface ColorValue {
  light: string;
  dark: string;
}

export interface ColorToken {
  id: string;
  name: string;
  value: ColorValue;
  description?: string;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ColorTokens {
  brand: ColorToken[];
  semantic: ColorToken[];
  neutral: {
    baseColor: string;
    scale: ColorScale;
  };
  surface: {
    background: ColorValue;
    foreground: ColorValue;
    card: ColorValue;
    muted: ColorValue;
    mutedForeground: ColorValue;
    border: ColorValue;
  };
}

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

export interface FontFamily {
  id: string;
  name: string;
  value: string;
}

export interface FontSizeToken {
  name: string;
  size: number;
  lineHeight: number;
}

export interface FontWeightToken {
  name: string;
  value: number;
}

export interface TypographyTokens {
  families: FontFamily[];
  sizes: FontSizeToken[];
  weights: FontWeightToken[];
}

// ============================================
// SPACING TOKENS
// ============================================

export interface SpacingTokens {
  baseUnit: number;
  scale: number[];
}

// ============================================
// RADIUS TOKENS
// ============================================

export interface RadiusToken {
  name: string;
  value: number;
}

export interface RadiusTokens {
  base: number;
  scale: RadiusToken[];
}

// ============================================
// SHADOW TOKENS
// ============================================

export interface ShadowToken {
  name: string;
  value: string;
}

export interface ShadowTokens {
  scale: ShadowToken[];
}

// ============================================
// ANIMATION TOKENS
// ============================================

export interface DurationToken {
  name: string;
  value: number;
}

export interface EasingToken {
  name: string;
  value: string;
}

export interface AnimationTokens {
  durations: DurationToken[];
  easings: EasingToken[];
}

// ============================================
// COMPLETE TOKEN SYSTEM
// ============================================

export interface TokenSystem {
  name: string;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  animations: AnimationTokens;
}

// ============================================
// UI STATE
// ============================================

export type TokenTab =
  | 'colors'
  | 'typography'
  | 'spacing'
  | 'radius'
  | 'shadows'
  | 'animations';
export type PreviewMode = 'light' | 'dark';
export type PreviewDevice = 'mobile' | 'tablet' | 'desktop';
export type ExportFormat = 'css' | 'tailwind' | 'rui' | 'json' | 'react-native' | 'hyena-rn';
export type ViewMode = 'preview' | 'code';

export interface StudioState {
  tokens: TokenSystem;
  activeTab: TokenTab;
  previewMode: PreviewMode;
  previewDevice: PreviewDevice;
  exportFormat: ExportFormat;
  viewMode: ViewMode;
  validationErrors: ValidationError[];
  zoomLevel: number;
}

export interface ValidationError {
  type: 'error' | 'warning';
  category: string;
  message: string;
  suggestion?: string;
}

// ============================================
// SAVED SYSTEMS (Multiple token systems)
// ============================================

export interface SavedSystem {
  id: string;
  name: string;
  tokens: TokenSystem;
  createdAt: string;
  updatedAt: string;
}

export interface StudioStorage {
  version: 1;
  currentSystemId: string | null;
  systems: Record<string, SavedSystem>;
}

// Helper to generate unique IDs
export function generateSystemId(): string {
  return `sys_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ============================================
// EXTENDED VALIDATION
// ============================================

export type ValidationSeverity = 'error' | 'warning' | 'info';
export type ValidationCategory =
  | 'contrast'
  | 'typography'
  | 'spacing'
  | 'touch-target'
  | 'general';

export interface ValidationIssue {
  id: string;
  severity: ValidationSeverity;
  category: ValidationCategory;
  title: string;
  description: string;
  affectedTokens?: string[];
  suggestion?: string;
}
