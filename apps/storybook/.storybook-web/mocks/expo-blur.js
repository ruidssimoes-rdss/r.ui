// Mock for expo-blur for web
// Uses CSS backdrop-filter for blur effects

const React = require('react');

function BlurView(props) {
  const { children, style, intensity = 50, tint = 'default', experimentalBlurMethod, blurReductionFactor, ...rest } = props;
  const ReactNativeWeb = require('react-native-web');

  const blurAmount = (intensity / 100) * 20;
  const backgroundColor = tint === 'light'
    ? 'rgba(255, 255, 255, 0.7)'
    : tint === 'dark'
      ? 'rgba(0, 0, 0, 0.7)'
      : tint === 'extraLight'
        ? 'rgba(255, 255, 255, 0.9)'
        : tint === 'chromeMaterial'
          ? 'rgba(128, 128, 128, 0.5)'
          : 'rgba(128, 128, 128, 0.7)';

  const blurStyle = {
    backgroundColor,
    backdropFilter: `blur(${blurAmount}px)`,
    WebkitBackdropFilter: `blur(${blurAmount}px)`,
  };

  return React.createElement(
    ReactNativeWeb.View,
    {
      style: Array.isArray(style) ? [...style, blurStyle] : [style, blurStyle].filter(Boolean),
      ...rest
    },
    children
  );
}

// Named and default exports
module.exports = {
  BlurView,
  default: { BlurView },
};
