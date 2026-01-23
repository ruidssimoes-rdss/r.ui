import fs from 'fs/promises';

export interface HyenaConfig {
  url: string;
  output: string;
  format: string;
  lastPull?: string;
}

const DEFAULT_CONFIG_NAME = 'hyena.config.json';

/**
 * Load config from file
 */
export async function loadConfig(
  configPath?: string
): Promise<HyenaConfig | null> {
  const filePath = configPath || DEFAULT_CONFIG_NAME;

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Save config to file
 */
export async function saveConfig(
  config: HyenaConfig,
  configPath?: string
): Promise<void> {
  const filePath = configPath || DEFAULT_CONFIG_NAME;

  await fs.writeFile(
    filePath,
    JSON.stringify(
      {
        ...config,
        lastPull: new Date().toISOString(),
      },
      null,
      2
    )
  );
}
