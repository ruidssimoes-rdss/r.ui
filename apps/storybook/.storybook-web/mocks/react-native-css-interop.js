// Mock for react-native-css-interop for web
// This module is used by NativeWind internally

exports.cssInterop = function cssInterop(Component) {
  return Component;
};

exports.remapProps = function remapProps(Component) {
  return Component;
};

exports.useColorScheme = function useColorScheme() {
  return {
    colorScheme: 'dark',
    setColorScheme: function() {},
    toggleColorScheme: function() {},
  };
};

exports.useUnstableNativeVariable = function useUnstableNativeVariable() {
  return undefined;
};

exports.vars = function vars(obj) {
  return obj;
};

exports.createInteropElement = function createInteropElement() {
  return null;
};

exports.StyleSheet = {
  create: function(styles) {
    return styles;
  },
  flatten: function(styles) {
    if (Array.isArray(styles)) {
      return Object.assign.apply(null, [{}].concat(styles.filter(Boolean)));
    }
    return styles || {};
  },
};

exports.default = exports;
