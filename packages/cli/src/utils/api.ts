import { decompressFromEncodedURIComponent } from 'lz-string';
import type { TokenSystem, EncodedTokenData } from '../types.js';

/**
 * Decode tokens from a share URL
 */
export function decodeTokensFromUrl(url: string): TokenSystem | null {
  try {
    const urlObj = new URL(url);
    const param = urlObj.searchParams.get('t');

    if (!param) {
      throw new Error('No token parameter found in URL');
    }

    const json = decompressFromEncodedURIComponent(param);
    if (!json) {
      throw new Error('Failed to decompress token data');
    }

    const data = JSON.parse(json) as EncodedTokenData;
    return data.tokens || (data as unknown as TokenSystem);
  } catch (error) {
    throw new Error(`Failed to decode URL: ${error}`);
  }
}

/**
 * Fetch tokens from a Hyena Studio API endpoint
 * (For future: when we add API endpoints for saved systems)
 */
export async function fetchTokensFromUrl(
  url: string
): Promise<TokenSystem | null> {
  // First try to decode from share URL
  if (url.includes('?t=')) {
    return decodeTokensFromUrl(url);
  }

  // Try to fetch from API endpoint
  try {
    // Extract the token ID from the URL path
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const tokenId = pathParts[pathParts.length - 1];

    if (tokenId) {
      const apiUrl = `${urlObj.origin}/api/tokens/${tokenId}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = (await response.json()) as { tokens: TokenSystem };
        return data.tokens;
      }
    }
  } catch {
    // Fall through to error
  }

  throw new Error('Could not fetch tokens. Use a share URL with the ?t= parameter.');
}
