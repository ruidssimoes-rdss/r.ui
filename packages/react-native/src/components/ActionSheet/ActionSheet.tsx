import React, { useState } from 'react';
import { ActionSheetContext } from './ActionSheetContext';

export interface ActionSheetProps {
  /** Action sheet content */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

export function ActionSheet({
  children,
  open: controlledOpen,
  onOpenChange,
}: ActionSheetProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <ActionSheetContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </ActionSheetContext.Provider>
  );
}
