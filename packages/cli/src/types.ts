/**
 * Token System types - matches the Hyena Studio TokenSystem interface
 */

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

export interface SpacingTokens {
  baseUnit: number;
  scale: number[];
}

export interface RadiusToken {
  name: string;
  value: number;
}

export interface RadiusTokens {
  base: number;
  scale: RadiusToken[];
}

export interface ShadowToken {
  name: string;
  value: string;
}

export interface ShadowTokens {
  scale: ShadowToken[];
}

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

export interface TokenSystem {
  name: string;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  animations: AnimationTokens;
}

export interface EncodedTokenData {
  tokens: TokenSystem;
  presetId?: string;
}

export type OutputFormat = 'css' | 'tailwind' | 'json' | 'rn' | 'hyena';
