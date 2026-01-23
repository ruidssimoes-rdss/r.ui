'use client';

import { useEffect, useCallback, useRef } from 'react';
import { TokenSystem } from '../types';

const STORAGE_KEY = 'hyena-studio-tokens';
const DEBOUNCE_MS = 500;

export interface PersistedData {
  tokens: TokenSystem;
  presetId?: string;
  savedAt: string;
}

export function useTokenPersistence(
  tokens: TokenSystem,
  presetId: string | undefined,
  enabled: boolean = true
) {
  const isInitialMount = useRef(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save to localStorage (debounced)
  useEffect(() => {
    if (!enabled) return;

    // Don't save on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Clear any pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      const data: PersistedData = {
        tokens,
        presetId,
        savedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('Failed to save tokens to localStorage:', e);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [tokens, presetId, enabled]);

  // Load from localStorage
  const loadSaved = useCallback((): PersistedData | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as PersistedData;
      }
    } catch (e) {
      console.warn('Failed to load tokens from localStorage:', e);
    }
    return null;
  }, []);

  // Clear saved data
  const clearSaved = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear localStorage:', e);
    }
  }, []);

  // Check if saved data exists
  const hasSavedData = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  }, []);

  // Get saved timestamp
  const getSavedTimestamp = useCallback((): Date | null => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data: PersistedData = JSON.parse(saved);
        return new Date(data.savedAt);
      }
    } catch {
      // Ignore
    }
    return null;
  }, []);

  return {
    loadSaved,
    clearSaved,
    hasSavedData,
    getSavedTimestamp,
  };
}
