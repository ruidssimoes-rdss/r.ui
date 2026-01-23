// Mock for nativewind for web
// NativeWind provides className support for React Native
// For web, we don't need it as react-native-web handles styles

// Re-export View as-is (no className processing needed)
const { View, Text, Pressable, Image, ScrollView, TextInput, FlatList } = require('react-native-web');

// Export the same components - web handles CSS natively
exports.styled = function styled(Component) {
  return Component;
};

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

exports.vars = function vars(obj) {
  return obj;
};

exports.withExpoSnack = function withExpoSnack(config) {
  return config;
};

// Default export
exports.default = exports;
