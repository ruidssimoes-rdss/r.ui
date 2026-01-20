import { Platform } from 'react-native';

/**
 * Platform-aware storage utility that uses localStorage on web
 * and AsyncStorage on native platforms.
 *
 * Note: AsyncStorage must be installed as a peer dependency for native usage.
 * Install with: npm install @react-native-async-storage/async-storage
 */

// Lazy-load AsyncStorage to avoid import errors on web
let AsyncStorage: {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
} | null = null;

async function getAsyncStorage() {
  if (AsyncStorage) return AsyncStorage;

  try {
    // Dynamic import for native platforms
    const module = await import('@react-native-async-storage/async-storage');
    AsyncStorage = module.default;
    return AsyncStorage;
  } catch {
    console.warn(
      'AsyncStorage is not available. Install @react-native-async-storage/async-storage for native storage support.'
    );
    return null;
  }
}

export const storage = {
  /**
   * Get an item from storage
   */
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch {
        // localStorage not available (e.g., private browsing)
        return null;
      }
    }

    const asyncStorage = await getAsyncStorage();
    if (!asyncStorage) return null;
    return asyncStorage.getItem(key);
  },

  /**
   * Set an item in storage
   */
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
      } catch {
        // localStorage not available (e.g., private browsing, quota exceeded)
      }
      return;
    }

    const asyncStorage = await getAsyncStorage();
    if (!asyncStorage) return;
    return asyncStorage.setItem(key, value);
  },

  /**
   * Remove an item from storage
   */
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
      } catch {
        // localStorage not available
      }
      return;
    }

    const asyncStorage = await getAsyncStorage();
    if (!asyncStorage) return;
    return asyncStorage.removeItem(key);
  },
};

export default storage;
