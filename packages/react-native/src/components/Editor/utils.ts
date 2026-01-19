/**
 * Editor utility functions
 */

// ============================================================================
// Types
// ============================================================================

export type TextFormat = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code';
export type BlockFormat = 'h1' | 'h2' | 'h3' | 'bullet' | 'numbered' | 'quote';

export interface FormatState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  code: boolean;
  heading: 'h1' | 'h2' | 'h3' | null;
  list: 'bullet' | 'numbered' | null;
  quote: boolean;
}

// ============================================================================
// Markdown Conversion
// ============================================================================

/**
 * Convert markdown to simple HTML
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;

  return html;
}

/**
 * Convert HTML to markdown
 */
export function htmlToMarkdown(html: string): string {
  let markdown = html;

  // Remove wrapper tags
  markdown = markdown.replace(/<\/?p>/g, '\n');

  // Headers
  markdown = markdown.replace(/<h1>(.+?)<\/h1>/g, '# $1');
  markdown = markdown.replace(/<h2>(.+?)<\/h2>/g, '## $1');
  markdown = markdown.replace(/<h3>(.+?)<\/h3>/g, '### $1');

  // Bold and italic
  markdown = markdown.replace(/<strong><em>(.+?)<\/em><\/strong>/g, '***$1***');
  markdown = markdown.replace(/<strong>(.+?)<\/strong>/g, '**$1**');
  markdown = markdown.replace(/<em>(.+?)<\/em>/g, '*$1*');
  markdown = markdown.replace(/<del>(.+?)<\/del>/g, '~~$1~~');
  markdown = markdown.replace(/<code>(.+?)<\/code>/g, '`$1`');

  // Lists
  markdown = markdown.replace(/<li>(.+?)<\/li>/g, '- $1');

  // Blockquotes
  markdown = markdown.replace(/<blockquote>(.+?)<\/blockquote>/g, '> $1');

  // Links
  markdown = markdown.replace(/<a href="(.+?)">(.+?)<\/a>/g, '[$2]($1)');

  // Clean up
  markdown = markdown.replace(/<[^>]+>/g, '');
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  return markdown.trim();
}

/**
 * Strip HTML tags
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

/**
 * Get plain text character count
 */
export function getCharacterCount(content: string, isHtml: boolean = false): number {
  const text = isHtml ? stripHtml(content) : content;
  return text.length;
}

/**
 * Get word count
 */
export function getWordCount(content: string, isHtml: boolean = false): number {
  const text = isHtml ? stripHtml(content) : content;
  const words = text.trim().split(/\s+/);
  return words.filter((word) => word.length > 0).length;
}
