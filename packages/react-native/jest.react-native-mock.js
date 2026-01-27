// Comprehensive React Native mock for Jest
const React = require('react');

// Create mock components that properly render children
const createMockComponent = (name) => {
  const Component = React.forwardRef((props, ref) => {
    const { children, testID, accessibilityLabel, accessibilityHint, accessibilityRole, accessibilityState, ...otherProps } = props;
    return React.createElement(
      name,
      {
        ...otherProps,
        ref,
        testID,
        'aria-label': accessibilityLabel,
        'aria-describedby': accessibilityHint,
        role: accessibilityRole,
        accessibilityState,
      },
      children
    );
  });
  Component.displayName = name;
  return Component;
};

// Special Text component that properly renders string children
const Text = React.forwardRef((props, ref) => {
  const { children, testID, accessibilityLabel, accessibilityHint, accessibilityRole, style, ...otherProps } = props;
  return React.createElement(
    'Text',
    {
      ...otherProps,
      ref,
      testID,
      'aria-label': accessibilityLabel,
      'aria-describedby': accessibilityHint,
      role: accessibilityRole,
      style,
    },
    children
  );
});
Text.displayName = 'Text';

const View = createMockComponent('View');
const TouchableOpacity = createMockComponent('TouchableOpacity');
const TouchableHighlight = createMockComponent('TouchableHighlight');
const TouchableWithoutFeedback = createMockComponent('TouchableWithoutFeedback');
const Pressable = createMockComponent('Pressable');
const ScrollView = createMockComponent('ScrollView');
const FlatList = createMockComponent('FlatList');
const SectionList = createMockComponent('SectionList');
const TextInput = createMockComponent('TextInput');
const Image = createMockComponent('Image');
const ImageBackground = createMockComponent('ImageBackground');
const Modal = createMockComponent('Modal');
const ActivityIndicator = createMockComponent('ActivityIndicator');
const Switch = createMockComponent('Switch');
const SafeAreaView = createMockComponent('SafeAreaView');
const KeyboardAvoidingView = createMockComponent('KeyboardAvoidingView');
const StatusBar = createMockComponent('StatusBar');

// Animated mock
const Animated = {
  View: createMockComponent('Animated.View'),
  Text: Text,
  Image: createMockComponent('Animated.Image'),
  ScrollView: createMockComponent('Animated.ScrollView'),
  FlatList: createMockComponent('Animated.FlatList'),
  Value: class Value {
    constructor(value) {
      this._value = value;
    }
    setValue(value) {
      this._value = value;
    }
    interpolate() {
      return this;
    }
  },
  timing: (value, config) => ({
    start: (callback) => callback && callback({ finished: true }),
    stop: () => {},
  }),
  spring: (value, config) => ({
    start: (callback) => callback && callback({ finished: true }),
    stop: () => {},
  }),
  decay: (value, config) => ({
    start: (callback) => callback && callback({ finished: true }),
    stop: () => {},
  }),
  sequence: (animations) => ({
    start: (callback) => callback && callback({ finished: true }),
    stop: () => {},
  }),
  parallel: (animations) => ({
    start: (callback) => callback && callback({ finished: true }),
    stop: () => {},
  }),
  loop: (animation) => ({
    start: (callback) => {},
    stop: () => {},
  }),
  event: () => () => {},
  createAnimatedComponent: (component) => component,
};

// StyleSheet mock
const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => {
    if (Array.isArray(style)) {
      return Object.assign({}, ...style.filter(Boolean));
    }
    return style || {};
  },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  absoluteFillObject: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  hairlineWidth: 1,
};

// Platform mock
const Platform = {
  OS: 'ios',
  Version: '14.0',
  isTV: false,
  isTesting: true,
  select: (obj) => obj.ios ?? obj.default ?? obj.native,
};

// Dimensions mock
const Dimensions = {
  get: (dim) => {
    if (dim === 'window') {
      return { width: 375, height: 812, scale: 2, fontScale: 1 };
    }
    if (dim === 'screen') {
      return { width: 375, height: 812, scale: 2, fontScale: 1 };
    }
    return { width: 375, height: 812, scale: 2, fontScale: 1 };
  },
  addEventListener: () => ({ remove: () => {} }),
  removeEventListener: () => {},
};

// PixelRatio mock
const PixelRatio = {
  get: () => 2,
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (size) => size * 2,
  roundToNearestPixel: (size) => Math.round(size),
};

// Appearance mock
const Appearance = {
  getColorScheme: () => 'light',
  addChangeListener: () => ({ remove: () => {} }),
  removeChangeListener: () => {},
};

// Keyboard mock
const Keyboard = {
  addListener: () => ({ remove: () => {} }),
  removeListener: () => {},
  dismiss: () => {},
  scheduleLayoutAnimation: () => {},
};

// Linking mock
const Linking = {
  openURL: jest.fn(() => Promise.resolve()),
  canOpenURL: jest.fn(() => Promise.resolve(true)),
  getInitialURL: jest.fn(() => Promise.resolve(null)),
  addEventListener: () => ({ remove: () => {} }),
  removeEventListener: () => {},
};

// Alert mock
const Alert = {
  alert: jest.fn(),
  prompt: jest.fn(),
};

// NativeModules mock
const NativeModules = {
  UIManager: {
    RCTView: () => {},
    blur: jest.fn(),
    focus: jest.fn(),
    measure: jest.fn(),
    measureInWindow: jest.fn(),
    measureLayout: jest.fn(),
    setChildren: jest.fn(),
    manageChildren: jest.fn(),
    createView: jest.fn(),
    removeRootView: jest.fn(),
    replaceExistingNonRootView: jest.fn(),
    configureNextLayoutAnimation: jest.fn(),
    dispatchViewManagerCommand: jest.fn(),
  },
  PlatformConstants: {
    forceTouchAvailable: false,
  },
  StatusBarManager: {
    HEIGHT: 44,
    setColor: jest.fn(),
    setStyle: jest.fn(),
    setHidden: jest.fn(),
    setNetworkActivityIndicatorVisible: jest.fn(),
  },
};

// useColorScheme hook mock
const useColorScheme = () => 'light';

// useWindowDimensions hook mock
const useWindowDimensions = () => ({
  width: 375,
  height: 812,
  scale: 2,
  fontScale: 1,
});

module.exports = {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Image,
  ImageBackground,
  Modal,
  ActivityIndicator,
  Switch,
  SafeAreaView,
  KeyboardAvoidingView,
  StatusBar,
  Animated,
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
  Appearance,
  Keyboard,
  Linking,
  Alert,
  NativeModules,
  useColorScheme,
  useWindowDimensions,
};
