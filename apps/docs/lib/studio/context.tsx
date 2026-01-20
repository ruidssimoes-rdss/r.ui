'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  StudioState,
  TokenSystem,
  ColorToken,
  ColorValue,
  FontFamily,
  FontSizeToken,
  TokenTab,
  PreviewMode,
  PreviewDevice,
  ExportFormat,
  ValidationError,
} from './types';
import { generateColorScale } from './utils/color';
import { validateAllContrasts } from './utils/contrast';
import { generateRadiusScale } from './utils/scale';
import { defaultTokens } from './defaults';

interface TokenContextType {
  state: StudioState;

  // Color actions
  updateBrandColor: (id: string, value: Partial<ColorValue>) => void;
  addBrandColor: () => void;
  removeBrandColor: (id: string) => void;
  updateSemanticColor: (id: string, value: Partial<ColorValue>) => void;
  updateNeutralBase: (color: string) => void;
  updateSurfaceColor: (
    name: keyof TokenSystem['colors']['surface'],
    value: ColorValue
  ) => void;

  // Typography actions
  updateFontFamily: (id: string, value: string) => void;
  updateFontSize: (index: number, size: FontSizeToken) => void;
  addFontSize: () => void;
  removeFontSize: (index: number) => void;

  // Spacing actions
  updateSpacingBase: (value: number) => void;
  updateSpacingScale: (scale: number[]) => void;

  // Radius actions
  updateRadiusBase: (value: number) => void;
  updateRadiusValue: (index: number, value: number) => void;

  // Shadow actions
  updateShadow: (index: number, value: string) => void;

  // Animation actions
  updateDuration: (index: number, value: number) => void;
  updateEasing: (index: number, value: string) => void;

  // UI actions
  setActiveTab: (tab: TokenTab) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  setPreviewDevice: (device: PreviewDevice) => void;
  setExportFormat: (format: ExportFormat) => void;

  // Reset
  reset: () => void;

  // Validation
  validationErrors: ValidationError[];
}

const TokenContext = createContext<TokenContextType | null>(null);

export function useTokens() {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokens must be used within TokenProvider');
  }
  return context;
}

const initialState: StudioState = {
  tokens: defaultTokens,
  activeTab: 'colors',
  previewMode: 'light',
  previewDevice: 'desktop',
  exportFormat: 'css',
  validationErrors: [],
};

export function TokenProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudioState>(initialState);

  // Calculate validation errors whenever tokens change
  const validationErrors = useMemo(
    () => validateAllContrasts(state.tokens),
    [state.tokens]
  );

  // Brand color actions
  const updateBrandColor = useCallback(
    (id: string, value: Partial<ColorValue>) => {
      setState((prev) => ({
        ...prev,
        tokens: {
          ...prev.tokens,
          colors: {
            ...prev.tokens.colors,
            brand: prev.tokens.colors.brand.map((c) =>
              c.id === id ? { ...c, value: { ...c.value, ...value } } : c
            ),
          },
        },
      }));
    },
    []
  );

  const addBrandColor = useCallback(() => {
    const id = `brand-${Date.now()}`;
    const newColor: ColorToken = {
      id,
      name: 'new-color',
      value: { light: '#6366f1', dark: '#818cf8' },
    };
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        colors: {
          ...prev.tokens.colors,
          brand: [...prev.tokens.colors.brand, newColor],
        },
      },
    }));
  }, []);

  const removeBrandColor = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        colors: {
          ...prev.tokens.colors,
          brand: prev.tokens.colors.brand.filter((c) => c.id !== id),
        },
      },
    }));
  }, []);

  // Semantic color actions
  const updateSemanticColor = useCallback(
    (id: string, value: Partial<ColorValue>) => {
      setState((prev) => ({
        ...prev,
        tokens: {
          ...prev.tokens,
          colors: {
            ...prev.tokens.colors,
            semantic: prev.tokens.colors.semantic.map((c) =>
              c.id === id ? { ...c, value: { ...c.value, ...value } } : c
            ),
          },
        },
      }));
    },
    []
  );

  // Neutral color actions
  const updateNeutralBase = useCallback((color: string) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        colors: {
          ...prev.tokens.colors,
          neutral: {
            baseColor: color,
            scale: generateColorScale(color),
          },
        },
      },
    }));
  }, []);

  // Surface color actions
  const updateSurfaceColor = useCallback(
    (name: keyof TokenSystem['colors']['surface'], value: ColorValue) => {
      setState((prev) => ({
        ...prev,
        tokens: {
          ...prev.tokens,
          colors: {
            ...prev.tokens.colors,
            surface: {
              ...prev.tokens.colors.surface,
              [name]: value,
            },
          },
        },
      }));
    },
    []
  );

  // Typography actions
  const updateFontFamily = useCallback((id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        typography: {
          ...prev.tokens.typography,
          families: prev.tokens.typography.families.map((f) =>
            f.id === id ? { ...f, value } : f
          ),
        },
      },
    }));
  }, []);

  const updateFontSize = useCallback((index: number, size: FontSizeToken) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        typography: {
          ...prev.tokens.typography,
          sizes: prev.tokens.typography.sizes.map((s, i) =>
            i === index ? size : s
          ),
        },
      },
    }));
  }, []);

  const addFontSize = useCallback(() => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        typography: {
          ...prev.tokens.typography,
          sizes: [
            ...prev.tokens.typography.sizes,
            { name: '6xl', size: 60, lineHeight: 1.1 },
          ],
        },
      },
    }));
  }, []);

  const removeFontSize = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        typography: {
          ...prev.tokens.typography,
          sizes: prev.tokens.typography.sizes.filter((_, i) => i !== index),
        },
      },
    }));
  }, []);

  // Spacing actions
  const updateSpacingBase = useCallback((value: number) => {
    // Regenerate scale based on new base
    const multipliers = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];
    const newScale = multipliers.map((m) => m * value);
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        spacing: {
          baseUnit: value,
          scale: newScale,
        },
      },
    }));
  }, []);

  const updateSpacingScale = useCallback((scale: number[]) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        spacing: {
          ...prev.tokens.spacing,
          scale,
        },
      },
    }));
  }, []);

  // Radius actions
  const updateRadiusBase = useCallback((value: number) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        radius: {
          base: value,
          scale: generateRadiusScale(value),
        },
      },
    }));
  }, []);

  const updateRadiusValue = useCallback((index: number, value: number) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        radius: {
          ...prev.tokens.radius,
          scale: prev.tokens.radius.scale.map((r, i) =>
            i === index ? { ...r, value } : r
          ),
        },
      },
    }));
  }, []);

  // Shadow actions
  const updateShadow = useCallback((index: number, value: string) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        shadows: {
          scale: prev.tokens.shadows.scale.map((s, i) =>
            i === index ? { ...s, value } : s
          ),
        },
      },
    }));
  }, []);

  // Animation actions
  const updateDuration = useCallback((index: number, value: number) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        animations: {
          ...prev.tokens.animations,
          durations: prev.tokens.animations.durations.map((d, i) =>
            i === index ? { ...d, value } : d
          ),
        },
      },
    }));
  }, []);

  const updateEasing = useCallback((index: number, value: string) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        animations: {
          ...prev.tokens.animations,
          easings: prev.tokens.animations.easings.map((e, i) =>
            i === index ? { ...e, value } : e
          ),
        },
      },
    }));
  }, []);

  // UI actions
  const setActiveTab = useCallback((tab: TokenTab) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
  }, []);

  const setPreviewMode = useCallback((mode: PreviewMode) => {
    setState((prev) => ({ ...prev, previewMode: mode }));
  }, []);

  const setPreviewDevice = useCallback((device: PreviewDevice) => {
    setState((prev) => ({ ...prev, previewDevice: device }));
  }, []);

  const setExportFormat = useCallback((format: ExportFormat) => {
    setState((prev) => ({ ...prev, exportFormat: format }));
  }, []);

  // Reset
  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <TokenContext.Provider
      value={{
        state,
        updateBrandColor,
        addBrandColor,
        removeBrandColor,
        updateSemanticColor,
        updateNeutralBase,
        updateSurfaceColor,
        updateFontFamily,
        updateFontSize,
        addFontSize,
        removeFontSize,
        updateSpacingBase,
        updateSpacingScale,
        updateRadiusBase,
        updateRadiusValue,
        updateShadow,
        updateDuration,
        updateEasing,
        setActiveTab,
        setPreviewMode,
        setPreviewDevice,
        setExportFormat,
        reset,
        validationErrors,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}
