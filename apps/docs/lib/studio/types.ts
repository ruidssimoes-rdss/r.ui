export interface StudioColor {
  id: string;
  name: string; // User-defined name (e.g., "brand", "accent", "cta")
  value: string; // Hex value
  scale?: ColorScale; // Auto-generated 50-950 scale
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

export interface StudioTokens {
  colors: StudioColor[];
  radius: {
    base: number; // e.g., 8
    scale: number[]; // Multipliers: [0.5, 1, 1.5, 2, 4] → [4, 8, 12, 16, 32]
  };
  spacing: {
    base: number; // e.g., 4
    scale: number[]; // Values: [4, 8, 12, 16, 20, 24, 32, 48, 64]
  };
}

export interface StudioState {
  tokens: StudioTokens;
  previewMode: 'light' | 'dark';
  previewDevice: 'mobile' | 'tablet' | 'desktop';
  viewMode: 'preview' | 'code';
  exportFormat: 'css' | 'theme' | 'tailwind' | 'json';
}

export interface ReviewResult {
  score: number; // 0-100
  issues: ReviewIssue[];
}

export interface ReviewIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  suggestion?: string;
}

export type ThemeMode = 'light' | 'dark';
export type DeviceFrame = 'mobile' | 'tablet' | 'desktop';
export type ViewMode = 'preview' | 'code';
export type ExportFormat = 'css' | 'theme' | 'tailwind' | 'json';
