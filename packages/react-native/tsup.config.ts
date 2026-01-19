import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'tokens/index': 'src/tokens/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false, // Disabled due to Platform.select typing issues
  external: ['react', 'react-native', 'nativewind', 'react-native-svg'],
  clean: true,
  sourcemap: true,
});
