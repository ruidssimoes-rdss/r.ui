import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
  swc: () => ({
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
      },
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  webpackFinal: async (config) => {
    const storybookDir = path.resolve(__dirname, '..');
    const monorepoRoot = path.resolve(storybookDir, '../..');
    const hyenaSourceDir = path.resolve(monorepoRoot, 'packages/react-native/src');

    // Add react-native-web aliases
    config.resolve = config.resolve || {};
    const mocksDir = path.resolve(storybookDir, '.storybook-web/mocks');

    // CRITICAL: Force single React instance to prevent context isolation issues
    // The monorepo has both react@18.2.0 and react@18.3.1 in pnpm store
    const reactPath = path.resolve(storybookDir, 'node_modules/react');
    const reactDomPath = path.resolve(storybookDir, 'node_modules/react-dom');

    config.resolve.alias = {
      ...config.resolve.alias,
      // Force single React instance (must be first to take precedence)
      'react': reactPath,
      'react-dom': reactDomPath,
      // IMPORTANT: Use source files instead of pre-built dist to avoid __require polyfill issues
      '@hyena-studio/react-native': hyenaSourceDir,
      // Core React Native -> React Native Web
      'react-native$': 'react-native-web',
      // SVG support
      'react-native-svg': 'react-native-svg-web',
      // Mock NativeWind and CSS interop (these have JSX that won't compile)
      'nativewind': path.resolve(mocksDir, 'nativewind.js'),
      'react-native-css-interop': path.resolve(mocksDir, 'react-native-css-interop.js'),
      'nativewind/preset': path.resolve(mocksDir, 'nativewind.js'),
      // Mock expo packages for web
      'expo-blur': path.resolve(mocksDir, 'expo-blur.js'),
      'expo-haptics': path.resolve(mocksDir, 'expo-haptics.js'),
      // Mock safe area context for web
      'react-native-safe-area-context': path.resolve(mocksDir, 'safe-area-context.js'),
      // Mock async storage for web
      '@react-native-async-storage/async-storage': path.resolve(mocksDir, 'async-storage.js'),
    };

    // Handle .web.tsx extensions first
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.js',
      '.tsx',
      '.ts',
      '.js',
      '.jsx',
      '.json',
    ];

    // Configure module rules
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Process TypeScript/JavaScript files with swc-loader
    // Include stories, storybook-web config, and hyena source directory
    config.module.rules.unshift({
      test: /\.(ts|tsx)$/,
      include: [
        path.resolve(storybookDir, 'stories'),
        path.resolve(storybookDir, '.storybook-web'),
        hyenaSourceDir,
      ],
      use: {
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      },
    });

    // Handle react-native-svg-web and other RN packages
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: [
        /node_modules\/react-native-svg-web/,
        /node_modules\/react-native-web/,
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { modules: false }],
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
    });

    // Add plugins
    config.plugins = config.plugins || [];

    // Define __DEV__ global for React Native compatibility
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      })
    );

    // Use NormalModuleReplacementPlugin to replace dynamic requires
    // This handles the __require() calls in the pre-built @hyena-studio/react-native dist
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^expo-blur$/,
        path.resolve(mocksDir, 'expo-blur.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /^expo-haptics$/,
        path.resolve(mocksDir, 'expo-haptics.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /^@react-native-async-storage\/async-storage$/,
        path.resolve(mocksDir, 'async-storage.js')
      )
    );

    // Ignore warnings about missing exports (some are stale references in index.ts)
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /export .* was not found in/,
    ];

    return config;
  },
};

export default config;
