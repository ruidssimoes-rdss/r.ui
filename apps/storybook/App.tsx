import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StorybookUIRoot from './.storybook';

// Import global styles for NativeWind
import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <StorybookUIRoot />
    </SafeAreaProvider>
  );
}
