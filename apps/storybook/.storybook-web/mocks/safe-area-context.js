// Mock for react-native-safe-area-context for web
// Provides all the needed exports for components to work

const React = require('react');

// Default insets for web (no notch/safe area needed)
const defaultInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const defaultFrame = {
  x: 0,
  y: 0,
  width: typeof window !== 'undefined' ? window.innerWidth : 375,
  height: typeof window !== 'undefined' ? window.innerHeight : 812,
};

// Context for safe area
const SafeAreaContext = React.createContext({
  insets: defaultInsets,
  frame: defaultFrame,
});

// Provider component
function SafeAreaProvider(props) {
  const { children, initialMetrics } = props;
  const value = React.useMemo(() => ({
    insets: initialMetrics?.insets || defaultInsets,
    frame: initialMetrics?.frame || defaultFrame,
  }), [initialMetrics]);

  return React.createElement(
    SafeAreaContext.Provider,
    { value },
    children
  );
}

// SafeAreaView component - just renders children in a View
function SafeAreaView(props) {
  const { children, style, edges, mode, ...rest } = props;
  const insets = useSafeAreaInsets();
  const ReactNativeWeb = require('react-native-web');

  // Apply padding based on edges if specified
  let paddingStyle = {};
  if (edges) {
    const edgeArray = Array.isArray(edges) ? edges : [edges];
    if (edgeArray.includes('top')) paddingStyle.paddingTop = insets.top;
    if (edgeArray.includes('right')) paddingStyle.paddingRight = insets.right;
    if (edgeArray.includes('bottom')) paddingStyle.paddingBottom = insets.bottom;
    if (edgeArray.includes('left')) paddingStyle.paddingLeft = insets.left;
  }

  return React.createElement(
    ReactNativeWeb.View,
    { style: [paddingStyle, style], ...rest },
    children
  );
}

// Hooks
function useSafeAreaInsets() {
  const context = React.useContext(SafeAreaContext);
  return context?.insets || defaultInsets;
}

function useSafeAreaFrame() {
  const context = React.useContext(SafeAreaContext);
  return context?.frame || defaultFrame;
}

// Initial window metrics
const initialWindowMetrics = {
  insets: defaultInsets,
  frame: defaultFrame,
};

// Exports
module.exports = {
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaContext,
  useSafeAreaInsets,
  useSafeAreaFrame,
  initialWindowMetrics,
  // Also export as default properties
  default: {
    SafeAreaProvider,
    SafeAreaView,
    SafeAreaContext,
    useSafeAreaInsets,
    useSafeAreaFrame,
    initialWindowMetrics,
  },
};
