import { createContext, useContext } from 'react';
import { FormatState } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface EditorContextValue {
  /** Current content */
  value: string;
  /** Update content */
  setValue: (value: string) => void;
  /** Current format state */
  formatState: FormatState;
  /** Toggle a text format */
  toggleFormat: (format: keyof FormatState) => void;
  /** Whether the editor is read-only */
  readOnly: boolean;
  /** Placeholder text */
  placeholder: string;
  /** Whether the toolbar is shown */
  showToolbar: boolean;
  /** Undo last action */
  undo: () => void;
  /** Redo last undone action */
  redo: () => void;
  /** Whether undo is available */
  canUndo: boolean;
  /** Whether redo is available */
  canRedo: boolean;
}

// ============================================================================
// Context
// ============================================================================

export const EditorContext = createContext<EditorContextValue | null>(null);

// ============================================================================
// Hook
// ============================================================================

export function useEditor(): EditorContextValue {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(
      'Editor components must be used within an Editor. ' +
        'Wrap your component in <Editor> to fix this error.'
    );
  }
  return context;
}
