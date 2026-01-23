'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  TokenSystem,
  SavedSystem,
  StudioStorage,
  generateSystemId,
} from '../types';

const STORAGE_KEY = 'hyena-studio-systems';
const LEGACY_STORAGE_KEY = 'hyena-studio-tokens';
const MAX_SYSTEMS = 20;

// Default storage structure
function createDefaultStorage(): StudioStorage {
  return {
    version: 1,
    currentSystemId: null,
    systems: {},
  };
}

// Migrate from old single-system storage if exists
function migrateFromLegacy(): StudioStorage | null {
  try {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);

    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (parsed.tokens) {
        const id = generateSystemId();
        const now = new Date().toISOString();
        const storage: StudioStorage = {
          version: 1,
          currentSystemId: id,
          systems: {
            [id]: {
              id,
              name: parsed.tokens.name || 'Migrated System',
              tokens: parsed.tokens,
              createdAt: now,
              updatedAt: now,
            },
          },
        };
        // Remove legacy storage after migration
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        return storage;
      }
    }
  } catch (e) {
    console.warn('Failed to migrate legacy storage:', e);
  }
  return null;
}

export function useSavedSystems(defaultTokens: TokenSystem) {
  const [storage, setStorage] = useState<StudioStorage | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        setStorage(JSON.parse(saved));
      } else {
        // Check for legacy migration
        const migrated = migrateFromLegacy();
        if (migrated) {
          setStorage(migrated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        } else {
          setStorage(createDefaultStorage());
        }
      }
    } catch (e) {
      console.warn('Failed to load saved systems:', e);
      setStorage(createDefaultStorage());
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage whenever storage changes
  useEffect(() => {
    if (storage && isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
      } catch (e) {
        console.warn('Failed to save systems:', e);
      }
    }
  }, [storage, isLoaded]);

  // Get current system
  const currentSystem =
    storage?.currentSystemId ? storage.systems[storage.currentSystemId] : null;

  // Get all systems as array (sorted by updatedAt desc)
  const allSystems = storage
    ? Object.values(storage.systems).sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    : [];

  // Save current tokens as a new system
  const saveAsNew = useCallback(
    (tokens: TokenSystem, name?: string): SavedSystem | null => {
      if (!storage) return null;

      if (Object.keys(storage.systems).length >= MAX_SYSTEMS) {
        throw new Error(
          `Maximum of ${MAX_SYSTEMS} saved systems reached. Please delete some first.`
        );
      }

      const id = generateSystemId();
      const now = new Date().toISOString();

      const newSystem: SavedSystem = {
        id,
        name:
          name || tokens.name || `System ${Object.keys(storage.systems).length + 1}`,
        tokens,
        createdAt: now,
        updatedAt: now,
      };

      setStorage((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentSystemId: id,
          systems: {
            ...prev.systems,
            [id]: newSystem,
          },
        };
      });

      return newSystem;
    },
    [storage]
  );

  // Update current system with new tokens
  const updateCurrent = useCallback(
    (tokens: TokenSystem) => {
      if (!storage?.currentSystemId) return;

      setStorage((prev) => {
        if (!prev || !prev.currentSystemId) return prev;

        const existing = prev.systems[prev.currentSystemId];
        if (!existing) return prev;

        return {
          ...prev,
          systems: {
            ...prev.systems,
            [prev.currentSystemId]: {
              ...existing,
              tokens,
              name: tokens.name || existing.name,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    [storage?.currentSystemId]
  );

  // Switch to a different system
  const switchTo = useCallback(
    (systemId: string): TokenSystem | null => {
      if (!storage?.systems[systemId]) return null;

      setStorage((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentSystemId: systemId,
        };
      });

      return storage.systems[systemId].tokens;
    },
    [storage]
  );

  // Rename a system
  const rename = useCallback((systemId: string, newName: string) => {
    setStorage((prev) => {
      if (!prev || !prev.systems[systemId]) return prev;

      return {
        ...prev,
        systems: {
          ...prev.systems,
          [systemId]: {
            ...prev.systems[systemId],
            name: newName,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  }, []);

  // Delete a system
  const deleteSystem = useCallback((systemId: string) => {
    setStorage((prev) => {
      if (!prev || !prev.systems[systemId]) return prev;

      const { [systemId]: _deleted, ...remainingSystems } = prev.systems;

      // If deleting current, switch to most recent or null
      let newCurrentId = prev.currentSystemId;
      if (prev.currentSystemId === systemId) {
        const remaining = Object.values(remainingSystems).sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        newCurrentId = remaining[0]?.id || null;
      }

      return {
        ...prev,
        currentSystemId: newCurrentId,
        systems: remainingSystems,
      };
    });
  }, []);

  // Duplicate a system
  const duplicate = useCallback(
    (systemId: string): SavedSystem | null => {
      if (!storage?.systems[systemId]) return null;

      const original = storage.systems[systemId];
      const id = generateSystemId();
      const now = new Date().toISOString();

      const duplicated: SavedSystem = {
        id,
        name: `${original.name} (copy)`,
        tokens: { ...original.tokens },
        createdAt: now,
        updatedAt: now,
      };

      setStorage((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentSystemId: id,
          systems: {
            ...prev.systems,
            [id]: duplicated,
          },
        };
      });

      return duplicated;
    },
    [storage]
  );

  // Clear current (start fresh without saving)
  const clearCurrent = useCallback(() => {
    setStorage((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        currentSystemId: null,
      };
    });
  }, []);

  // Export a system as JSON
  const exportSystem = useCallback(
    (systemId: string): string | null => {
      if (!storage?.systems[systemId]) return null;
      return JSON.stringify(storage.systems[systemId], null, 2);
    },
    [storage]
  );

  // Import a system from JSON
  const importSystem = useCallback((json: string): SavedSystem | null => {
    try {
      const parsed = JSON.parse(json);

      // Validate it has required fields
      if (!parsed.tokens || typeof parsed.tokens !== 'object') {
        throw new Error('Invalid system format: missing tokens');
      }

      const id = generateSystemId();
      const now = new Date().toISOString();

      const imported: SavedSystem = {
        id,
        name: parsed.name || 'Imported System',
        tokens: parsed.tokens,
        createdAt: now,
        updatedAt: now,
      };

      setStorage((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          currentSystemId: id,
          systems: {
            ...prev.systems,
            [id]: imported,
          },
        };
      });

      return imported;
    } catch (e) {
      console.error('Failed to import system:', e);
      throw new Error('Invalid system file');
    }
  }, []);

  return {
    isLoaded,
    currentSystem,
    allSystems,
    systemCount: allSystems.length,
    maxSystems: MAX_SYSTEMS,
    saveAsNew,
    updateCurrent,
    switchTo,
    rename,
    deleteSystem,
    duplicate,
    clearCurrent,
    exportSystem,
    importSystem,
  };
}
