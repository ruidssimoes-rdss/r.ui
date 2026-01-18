import { view } from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  // Enable addons panel on device
  enableWebsockets: true,
  // Initial selection mode
  initialSelection: {
    kind: 'Button',
    name: 'Primary',
  },
});

export default StorybookUIRoot;
