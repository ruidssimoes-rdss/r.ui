import React, { useState } from 'react';
import {
  ContextMenuContext,
  ContextMenuAlign,
  ContextMenuPosition,
  TriggerLayout,
} from './ContextMenuContext';

export interface ContextMenuProps {
  /** Context menu content */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Content alignment relative to press position */
  align?: ContextMenuAlign;
  /** Offset from the press position */
  sideOffset?: number;
}

export function ContextMenu({
  children,
  open: controlledOpen,
  onOpenChange,
  align = 'start',
  sideOffset = 4,
}: ContextMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [pressPosition, setPressPosition] = useState<ContextMenuPosition | null>(null);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);

    if (!newOpen) {
      setPressPosition(null);
    }
  };

  return (
    <ContextMenuContext.Provider
      value={{
        open,
        onOpenChange: handleOpenChange,
        pressPosition,
        setPressPosition,
        triggerLayout,
        setTriggerLayout,
        align,
        sideOffset,
      }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
}
