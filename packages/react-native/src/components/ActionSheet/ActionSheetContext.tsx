import { createContext, useContext } from 'react';

export interface ActionSheetContextValue {
  /** Whether the action sheet is open */
  open: boolean;
  /** Callback to change open state */
  onOpenChange: (open: boolean) => void;
}

const ActionSheetContext = createContext<ActionSheetContextValue | null>(null);

export function useActionSheet() {
  const context = useContext(ActionSheetContext);
  if (!context) {
    throw new Error('ActionSheet components must be used within an ActionSheet');
  }
  return context;
}

export function useActionSheetContext() {
  return useContext(ActionSheetContext);
}

export { ActionSheetContext };
