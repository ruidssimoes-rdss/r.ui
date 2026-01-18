#!/usr/bin/env node

import { execSync } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'assets');

// Create SVG content for the images
const createIconSvg = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0a0a0a"/>
  <text
    x="50%"
    y="50%"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="${size * 0.15}"
    font-weight="bold"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
  >r.ui</text>
</svg>
`;

const createSplashSvg = () => `
<svg width="1284" height="2778" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#0a0a0a"/>
  <text
    x="50%"
    y="50%"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="120"
    font-weight="bold"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
  >r.ui</text>
</svg>
`;

// Generate assets using sharp-cli via npx
const assets = [
  { name: 'icon.png', svg: createIconSvg(1024), width: 1024, height: 1024 },
  { name: 'adaptive-icon.png', svg: createIconSvg(1024), width: 1024, height: 1024 },
  { name: 'splash.png', svg: createSplashSvg(), width: 1284, height: 2778 },
  { name: 'favicon.png', svg: createIconSvg(48), width: 48, height: 48 },
];

console.log('Generating Expo assets...\n');

for (const asset of assets) {
  const svgPath = join(assetsDir, `${asset.name}.svg`);
  const pngPath = join(assetsDir, asset.name);

  // Write SVG temporarily
  writeFileSync(svgPath, asset.svg.trim());

  // Convert SVG to PNG using sharp-cli
  try {
    execSync(`npx --yes sharp-cli -i "${svgPath}" -o "${pngPath}" resize ${asset.width} ${asset.height}`, {
      stdio: 'pipe'
    });
    console.log(`✓ Created ${asset.name} (${asset.width}x${asset.height})`);

    // Remove temporary SVG
    execSync(`rm "${svgPath}"`, { stdio: 'pipe' });
  } catch (error) {
    console.error(`✗ Failed to create ${asset.name}:`, error.message);
  }
}

console.log('\nDone! Assets created in apps/storybook/assets/');
