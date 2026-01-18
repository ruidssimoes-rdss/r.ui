import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { Preview } from '@storybook/react';

// Import NativeWind CSS
import '../global.css';

/**
 * Decorator that wraps all stories with consistent styling and NativeWind context.
 */
const withThemeProvider = (Story: React.ComponentType) => (
  <View style={styles.container}>
    <Story />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0a0a0a',
  },
});

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
