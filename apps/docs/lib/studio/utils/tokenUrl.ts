import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import { TokenSystem } from '../types';

const URL_PARAM = 't';
const MAX_URL_LENGTH = 2000;

export interface EncodedTokenData {
  tokens: TokenSystem;
  presetId?: string;
}

/**
 * Encode tokens to a shareable URL
 * Returns null if the URL would be too long
 */
export function encodeTokensToUrl(data: EncodedTokenData): string | null {
  try {
    const json = JSON.stringify(data);
    const compressed = compressToEncodedURIComponent(json);

    // Check if we're running in a browser
    if (typeof window === 'undefined') {
      return null;
    }

    const url = new URL(window.location.href);
    // Remove any existing token param
    url.searchParams.delete(URL_PARAM);
    url.searchParams.set(URL_PARAM, compressed);

    const urlString = url.toString();

    // Check URL length
    if (urlString.length > MAX_URL_LENGTH) {
      return null;
    }

    return urlString;
  } catch (e) {
    console.error('Failed to encode tokens to URL:', e);
    return null;
  }
}

/**
 * Decode tokens from URL parameter
 */
export function decodeTokensFromUrl(): EncodedTokenData | null {
  try {
    if (typeof window === 'undefined') {
      return null;
    }

    const url = new URL(window.location.href);
    const param = url.searchParams.get(URL_PARAM);

    if (!param) return null;

    const json = decompressFromEncodedURIComponent(param);
    if (!json) return null;

    return JSON.parse(json) as EncodedTokenData;
  } catch (e) {
    console.warn('Failed to decode tokens from URL:', e);
    return null;
  }
}

/**
 * Remove token parameter from URL (for clean state)
 */
export function clearTokensFromUrl(): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.delete(URL_PARAM);
  window.history.replaceState({}, '', url.toString());
}

/**
 * Check if URL has encoded tokens
 */
export function hasTokensInUrl(): boolean {
  if (typeof window === 'undefined') return false;

  const url = new URL(window.location.href);
  return url.searchParams.has(URL_PARAM);
}

/**
 * Get the compressed size of tokens (for display)
 */
export function getTokensUrlSize(data: EncodedTokenData): number {
  try {
    const json = JSON.stringify(data);
    const compressed = compressToEncodedURIComponent(json);
    return compressed.length;
  } catch {
    return 0;
  }
}
