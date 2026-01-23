import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { Preview } from '@storybook/react';
// Import providers from source
import { ThemeProvider, ToastProvider } from '@hyena-studio/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Decorator that wraps all stories with required providers and consistent styling.
 */
const withProviders = (Story: React.ComponentType) => (
  <SafeAreaProvider>
    <ThemeProvider defaultTheme="dark">
      <ToastProvider>
        <View style={styles.container}>
          <Story />
        </View>
      </ToastProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0a0a0a',
  },
});

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
};

export default preview;
