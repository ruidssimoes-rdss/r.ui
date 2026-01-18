import { createContext, useContext } from 'react';

export interface AlertDialogContextValue {
  /** Whether the alert dialog is open */
  open: boolean;
  /** Callback to change open state */
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

export function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('AlertDialog components must be used within an AlertDialog');
  }
  return context;
}

export function useAlertDialogContext() {
  return useContext(AlertDialogContext);
}

export { AlertDialogContext };
