'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  StudioState,
  StudioColor,
  StudioTokens,
  ThemeMode,
  DeviceFrame,
  ViewMode,
  ExportFormat,
} from './types';
import { generateColorScale } from './color-utils';
import { defaultTokens } from './defaults';

interface StudioContextType {
  state: StudioState;

  // Color actions
  addColor: (name: string, value: string) => void;
  updateColor: (id: string, updates: Partial<StudioColor>) => void;
  removeColor: (id: string) => void;

  // Radius actions
  setRadiusBase: (value: number) => void;
  setRadiusScale: (scale: number[]) => void;

  // Spacing actions
  setSpacingBase: (value: number) => void;
  setSpacingScale: (scale: number[]) => void;

  // UI actions
  setPreviewMode: (mode: ThemeMode) => void;
  setPreviewDevice: (device: DeviceFrame) => void;
  setViewMode: (mode: ViewMode) => void;
  setExportFormat: (format: ExportFormat) => void;

  // Reset
  reset: () => void;
}

const StudioContext = createContext<StudioContextType | null>(null);

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within StudioProvider');
  }
  return context;
}

const initialState: StudioState = {
  tokens: defaultTokens,
  previewMode: 'light', // DEFAULT TO LIGHT
  previewDevice: 'desktop',
  viewMode: 'preview',
  exportFormat: 'css',
};

export function StudioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StudioState>(initialState);

  const addColor = useCallback((name: string, value: string) => {
    const id = `color-${Date.now()}`;
    const newColor: StudioColor = {
      id,
      name,
      value,
      scale: generateColorScale(value),
    };
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        colors: [...prev.tokens.colors, newColor],
      },
    }));
  }, []);

  const updateColor = useCallback((id: string, updates: Partial<StudioColor>) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        colors: prev.tokens.colors.map((c) =>
          c.id === id
            ? {
                ...c,
                ...updates,
                scale: updates.value
                  ? generateColorScale(updates.value)
                  : c.scale,
              }
            : c
        ),
      },
    }));
  }, []);

  const removeColor = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        colors: prev.tokens.colors.filter((c) => c.id !== id),
      },
    }));
  }, []);

  const setRadiusBase = useCallback((value: number) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        radius: {
          ...prev.tokens.radius,
          base: value,
        },
      },
    }));
  }, []);

  const setRadiusScale = useCallback((scale: number[]) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        radius: {
          ...prev.tokens.radius,
          scale,
        },
      },
    }));
  }, []);

  const setSpacingBase = useCallback((value: number) => {
    setState((prev) => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        spacing: {
          ...prev.tokens.spacing,
          base: value,
        },
      },
    }));
  }, []);

  const setSpacingScale = useCallback((scale: number[]) => {
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

  const setPreviewMode = useCallback((mode: ThemeMode) => {
    setState((prev) => ({ ...prev, previewMode: mode }));
  }, []);

  const setPreviewDevice = useCallback((device: DeviceFrame) => {
    setState((prev) => ({ ...prev, previewDevice: device }));
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setState((prev) => ({ ...prev, viewMode: mode }));
  }, []);

  const setExportFormat = useCallback((format: ExportFormat) => {
    setState((prev) => ({ ...prev, exportFormat: format }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <StudioContext.Provider
      value={{
        state,
        addColor,
        updateColor,
        removeColor,
        setRadiusBase,
        setRadiusScale,
        setSpacingBase,
        setSpacingScale,
        setPreviewMode,
        setPreviewDevice,
        setViewMode,
        setExportFormat,
        reset,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}
