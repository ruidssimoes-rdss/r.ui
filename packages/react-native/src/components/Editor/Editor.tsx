import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { EditorContext } from './EditorContext';
import { FormatState } from './utils';

// ============================================================================
// Types
// ============================================================================

export interface EditorProps {
  /** Current content (controlled) */
  value?: string;
  /** Called when content changes */
  onValueChange?: (value: string) => void;
  /** Default content (uncontrolled) */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Show toolbar */
  toolbar?: boolean;
  /** Editor content */
  children: React.ReactNode;
  /** Additional container styles */
  style?: ViewStyle;
}

// ============================================================================
// Component
// ============================================================================

export function Editor({
  value,
  onValueChange,
  defaultValue = '',
  placeholder = 'Start writing...',
  readOnly = false,
  toolbar = true,
  children,
  style,
}: EditorProps) {
  // Content state
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  const setValue = useCallback((newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);

    // Add to history
    setHistory((prev) => ({
      past: [...prev.past, currentValue],
      future: [],
    }));
  }, [value, currentValue, onValueChange]);

  // Format state
  const [formatState, setFormatState] = useState<FormatState>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    code: false,
    heading: null,
    list: null,
    quote: false,
  });

  const toggleFormat = useCallback((format: keyof FormatState) => {
    setFormatState((prev) => {
      if (format === 'heading') {
        // Cycle through h1 -> h2 -> h3 -> null
        const next = prev.heading === null ? 'h1' :
                    prev.heading === 'h1' ? 'h2' :
                    prev.heading === 'h2' ? 'h3' : null;
        return { ...prev, heading: next };
      }
      if (format === 'list') {
        const next = prev.list === null ? 'bullet' :
                    prev.list === 'bullet' ? 'numbered' : null;
        return { ...prev, list: next };
      }
      return {
        ...prev,
        [format]: !prev[format as keyof Omit<FormatState, 'heading' | 'list'>],
      };
    });
  }, []);

  // History for undo/redo
  const [history, setHistory] = useState<{
    past: string[];
    future: string[];
  }>({ past: [], future: [] });

  const undo = useCallback(() => {
    if (history.past.length === 0) return;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);

    setHistory({
      past: newPast,
      future: [currentValue, ...history.future],
    });

    if (value === undefined) {
      setInternalValue(previous);
    }
    onValueChange?.(previous);
  }, [history, currentValue, value, onValueChange]);

  const redo = useCallback(() => {
    if (history.future.length === 0) return;

    const next = history.future[0];
    const newFuture = history.future.slice(1);

    setHistory({
      past: [...history.past, currentValue],
      future: newFuture,
    });

    if (value === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  }, [history, currentValue, value, onValueChange]);

  const contextValue = useMemo(() => ({
    value: currentValue,
    setValue,
    formatState,
    toggleFormat,
    readOnly,
    placeholder,
    showToolbar: toolbar,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  }), [currentValue, setValue, formatState, toggleFormat, readOnly, placeholder, toolbar, undo, redo, history]);

  return (
    <EditorContext.Provider value={contextValue}>
      <View style={[styles.editor, style]}>
        {children}
      </View>
    </EditorContext.Provider>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  editor: {
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.md,
    backgroundColor: colors.bg.surface,
    overflow: 'hidden',
  },
});
