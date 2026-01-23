// Mock for @react-native-async-storage/async-storage for web
// Uses localStorage as the backing store

const storage = typeof window !== 'undefined' ? window.localStorage : new Map();

const AsyncStorage = {
  getItem: async (key) => {
    try {
      if (typeof storage.get === 'function') {
        return storage.get(key) || null;
      }
      return storage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem: async (key, value) => {
    try {
      if (typeof storage.set === 'function') {
        storage.set(key, value);
      } else {
        storage.setItem(key, value);
      }
    } catch {
      // Ignore storage errors
    }
  },

  removeItem: async (key) => {
    try {
      if (typeof storage.delete === 'function') {
        storage.delete(key);
      } else {
        storage.removeItem(key);
      }
    } catch {
      // Ignore storage errors
    }
  },

  getAllKeys: async () => {
    try {
      if (typeof storage.keys === 'function') {
        return Array.from(storage.keys());
      }
      return Object.keys(storage);
    } catch {
      return [];
    }
  },

  multiGet: async (keys) => {
    const results = [];
    for (const key of keys) {
      const value = await AsyncStorage.getItem(key);
      results.push([key, value]);
    }
    return results;
  },

  multiSet: async (keyValuePairs) => {
    for (const [key, value] of keyValuePairs) {
      await AsyncStorage.setItem(key, value);
    }
  },

  multiRemove: async (keys) => {
    for (const key of keys) {
      await AsyncStorage.removeItem(key);
    }
  },

  clear: async () => {
    try {
      if (typeof storage.clear === 'function') {
        storage.clear();
      }
    } catch {
      // Ignore storage errors
    }
  },
};

export default AsyncStorage;
